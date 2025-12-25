<?php
/**
 * Render callback for the countdown timer block.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @package GatherPressCountdown
 */

namespace GatherPress\Countdown;

use WP_Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Countdown Timer Block Renderer Singleton Class
 *
 * Handles rendering of countdown timer blocks on the frontend.
 *
 * @since 0.1.0
 */
if ( ! class_exists( Block_Renderer::class ) ) {
	final class Block_Renderer {
		/**
		 * Single instance of the class.
		 *
		 * @var Block_Renderer|null
		 */
		private static $instance = null;

		/**
		 * Time unit conversion constants in seconds.
		 *
		 * @var array<string, float>
		 */
		private const TIME_UNITS = array(
			'years'   => 365.25 * 24 * 60 * 60,
			'months'  => 30.44 * 24 * 60 * 60,
			'weeks'   => 7 * 24 * 60 * 60,
			'days'    => 24 * 60 * 60,
			'hours'   => 60 * 60,
			'minutes' => 60,
			'seconds' => 1,
		);

		/**
		 * Order of time segments from largest to smallest.
		 *
		 * @var string[]
		 */
		private const SEGMENT_ORDER = array( 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds' );

		/**
		 * Get the singleton instance.
		 *
		 * @return Block_Renderer The singleton instance.
		 */
		public static function get_instance(): Block_Renderer {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor - private to enforce singleton.
		 */
		private function __construct() {}

		/**
		 * Render the countdown timer block.
		 *
		 * @param array    $attributes Block attributes.
		 * @param string   $content    Block default content.
		 * @param WP_Block $block      Block instance.
		 * @return string Rendered block HTML.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			// Get target date from various sources
			$target_date_time = $this->get_target_date( $attributes, $block );

			// Validate target date
			if ( empty( $target_date_time ) ) {
				return $this->render_placeholder(
					__( 'Please configure the countdown timer in the editor.', 'gatherpress-countdown' )
				);
			}

			// Get display settings
			$show_labels   = $this->get_attr( $attributes, 'showLabels', true );
			$show_segments = $this->get_show_segments( $attributes );

			// Calculate segments
			$segment_values = $this->calculate_segments( $target_date_time, $show_segments );

			// Build enabled segments list
			$enabled_segments = $this->build_enabled_segments( $show_segments, $segment_values );

			// Validate segments
			if ( empty( $enabled_segments ) ) {
				return $this->render_placeholder(
					__( 'Please select at least one time segment to display.', 'gatherpress-countdown' )
				);
			}

			// Determine mode
			$actual_mode = $this->determine_mode( $attributes, $target_date_time );

			// Render the timer
			return $this->render_timer(
				$target_date_time,
				$actual_mode,
				$show_segments,
				$enabled_segments,
				$show_labels
			);
		}

		/**
		 * Get attribute with default fallback.
		 *
		 * @param array  $attributes Attributes array.
		 * @param string $key        Attribute key.
		 * @param mixed  $default    Default value.
		 * @return mixed Attribute value or default.
		 */
		private function get_attr( array $attributes, string $key, $default ) {
			return $attributes[ $key ] ?? $default;
		}

		/**
		 * Get target date from various sources.
		 *
		 * @param array    $attributes Block attributes.
		 * @param WP_Block $block      Block instance.
		 * @return string Target date time or empty string.
		 */
		private function get_target_date( array $attributes, WP_Block $block ): string {
			$target_date_time     = $this->get_attr( $attributes, 'targetDateTime', '' );
			$gatherpress_event_id = $this->get_attr( $attributes, 'gatherPressEventId', 0 );
			$gatherpress_taxonomy = $this->get_attr( $attributes, 'gatherPressTaxonomy', '' );
			$gatherpress_term_id  = $this->get_attr( $attributes, 'gatherPressTermId', 0 );

			// Check context date
			$context_date = $this->get_context_date( $block, $target_date_time, $gatherpress_event_id, $gatherpress_term_id );
			if ( ! empty( $context_date ) ) {
				return $context_date;
			}

			// Check term event
			if ( $gatherpress_term_id > 0 && ! empty( $gatherpress_taxonomy ) ) {
				$taxonomy_mode = $this->get_attr( $attributes, 'taxonomyMode', 'countdown' );
				$term_event_date = $this->get_next_event_from_term( $gatherpress_taxonomy, $gatherpress_term_id, $taxonomy_mode );
				if ( ! empty( $term_event_date ) ) {
					return $term_event_date;
				}
			}

			// Check explicit event
			if ( $gatherpress_event_id > 0 ) {
				$event_date = get_post_meta( $gatherpress_event_id, 'gatherpress_datetime_start', true );
				if ( ! empty( $event_date ) ) {
					return $event_date;
				}
			}

			return $target_date_time;
		}

		/**
		 * Get date from block context.
		 *
		 * @param WP_Block $block                Block instance.
		 * @param string   $target_date_time     Current target date.
		 * @param int      $gatherpress_event_id Event ID.
		 * @param int      $gatherpress_term_id  Term ID.
		 * @return string Context date or empty string.
		 */
		private function get_context_date( WP_Block $block, string $target_date_time, int $gatherpress_event_id, int $gatherpress_term_id ): string {
			$context_post_id   = $block->context['postId'] ?? get_the_ID();
			$context_post_type = $block->context['postType'] ?? get_post_type( $context_post_id );

			if ( $context_post_type === 'gatherpress_event' && 
				empty( $target_date_time ) && 
				empty( $gatherpress_event_id ) && 
				empty( $gatherpress_term_id ) ) {
				$context_event_date = get_post_meta( $context_post_id, 'gatherpress_datetime_start', true );
				if ( ! empty( $context_event_date ) ) {
					return $context_event_date;
				}
			}

			return '';
		}

		/**
		 * Get next event date from taxonomy term.
		 *
		 * @param string $taxonomy Taxonomy slug.
		 * @param int    $term_id  Term ID.
		 * @param string $mode     Display mode ('countdown' or 'countup').
		 * @return string Event date or empty string.
		 */
		private function get_next_event_from_term( string $taxonomy, int $term_id, string $mode ): string {
			$meta_compare = $mode === 'countup' ? '<=' : '>=';
			$order = $mode === 'countup' ? 'DESC' : 'ASC';

			$next_event_args = array(
				'post_type'      => 'gatherpress_event',
				'post_status'    => 'publish',
				'gatherpress_event_query' => $mode === 'countup' ? 'past' : 'upcoming',
				'posts_per_page' => 1,
				'orderby'        => 'event_date',
				// 'meta_key'       => 'gatherpress_datetime_start',
				'order'          => $order,
				'tax_query'      => array(
					array(
						'taxonomy' => $taxonomy,
						'field'    => 'term_id',
						'terms'    => $term_id,
					),
				),
				// 'meta_query'     => array(
				// 	array(
				// 		'key'     => 'gatherpress_datetime_start',
				// 		'value'   => current_time( 'mysql' ),
				// 		'compare' => $meta_compare,
				// 		'type'    => 'DATETIME',
				// 	),
				// ),
			);

			$next_events = get_posts( $next_event_args );

			if ( ! empty( $next_events ) ) {
				$event_date = get_post_meta( $next_events[0]->ID, 'gatherpress_datetime_start', true );
				if ( ! empty( $event_date ) ) {
					return $event_date;
				}
			}

			return '';
		}

		/**
		 * Get show segments configuration.
		 *
		 * @param array $attributes Block attributes.
		 * @return array<string, bool> Show segments configuration.
		 */
		private function get_show_segments( array $attributes ): array {
			$show_segments = array();
			foreach ( self::SEGMENT_ORDER as $segment ) {
				$attr_key                  = 'show' . ucfirst( $segment );
				$default                   = in_array( $segment, array( 'days', 'hours', 'minutes', 'seconds' ), true );
				$show_segments[ $segment ] = $this->get_attr( $attributes, $attr_key, $default );
			}
			return $show_segments;
		}

		/**
		 * Calculate time segments.
		 *
		 * @param string $target_date_time Target date time.
		 * @param array  $show_segments    Show segments configuration.
		 * @return array<string, int> Calculated segments.
		 */
		private function calculate_segments( string $target_date_time, array $show_segments ): array {
			$now               = time();
			$target            = strtotime( $target_date_time );
			$difference        = $target - $now;
			$abs_diff          = abs( $difference );
			$remaining_seconds = floor( $abs_diff );

			$result = array();

			foreach ( self::SEGMENT_ORDER as $segment ) {
				if ( $show_segments[ $segment ] ) {
					$result[ $segment ] = (int) floor( $remaining_seconds / self::TIME_UNITS[ $segment ] );
					$remaining_seconds -= $result[ $segment ] * self::TIME_UNITS[ $segment ];
				} else {
					$result[ $segment ] = 0;
				}
			}

			return $result;
		}

		/**
		 * Build enabled segments list.
		 *
		 * @param array $show_segments  Show segments configuration.
		 * @param array $segment_values Calculated segment values.
		 * @return array Array of enabled segments with values and labels.
		 */
		private function build_enabled_segments( array $show_segments, array $segment_values ): array {
			$enabled_segments = array();
			foreach ( self::SEGMENT_ORDER as $segment ) {
				if ( $show_segments[ $segment ] ) {
					$enabled_segments[] = array(
						'value' => $segment_values[ $segment ],
						'label' => $this->get_segment_label( $segment, $segment_values[ $segment ] ),
					);
				}
			}
			return $enabled_segments;
		}

		/**
		 * Get label for time segment.
		 *
		 * @param string $type  Segment type.
		 * @param int    $value Segment value.
		 * @return string Translated label.
		 */
		private function get_segment_label( string $type, int $value ): string {
			$labels = array(
				'years'   => $value === 1 ? __( 'Year' ) : __( 'Years' ),
				'months'  => $value === 1 ? __( 'Month' ) : __( 'Months' ),
				'weeks'   => $value === 1 ? __( 'Week' ) : __( 'Weeks' ),
				'days'    => $value === 1 ? __( 'Day' ) : __( 'Days' ),
				'hours'   => $value === 1 ? __( 'Hour' ) : __( 'Hours' ),
				'minutes' => $value === 1 ? __( 'Minute' ) : __( 'Minutes' ),
				'seconds' => $value === 1 ? __( 'Second' ) : __( 'Seconds' ),
			);
			return $labels[ $type ] ?? '';
		}

		/**
		 * Determine countdown mode.
		 *
		 * @param array  $attributes       Block attributes.
		 * @param string $target_date_time Target date time.
		 * @return string Mode ('countdown' or 'countup').
		 */
		private function determine_mode( array $attributes, string $target_date_time ): string {
			$auto_mode      = $this->get_attr( $attributes, 'autoMode', true );
			$event_mode     = $this->get_attr( $attributes, 'eventMode', 'countdown' );
			$taxonomy_mode  = $this->get_attr( $attributes, 'taxonomyMode', 'countdown' );
			$event_id       = $this->get_attr( $attributes, 'gatherPressEventId', 0 );
			$term_id        = $this->get_attr( $attributes, 'gatherPressTermId', 0 );
			$explicit_mode  = $this->get_attr( $attributes, 'mode', 'countdown' );

			// If using event mode, use the explicitly set event mode
			if ( $event_id > 0 ) {
				return $event_mode;
			}

			// If using taxonomy mode, use the explicitly set taxonomy mode
			if ( $term_id > 0 ) {
				return $taxonomy_mode;
			}

			// If auto mode is disabled, use the current explicit mode
			if ( ! $auto_mode ) {
				return $explicit_mode;
			}

			// Auto mode is enabled - determine based on target date
			$now    = time();
			$target = strtotime( $target_date_time );
			return ( $target - $now ) < 0 ? 'countup' : 'countdown';
		}

		/**
		 * Render placeholder.
		 *
		 * @param string $message Placeholder message.
		 * @return string HTML output.
		 */
		private function render_placeholder( string $message ): string {
			$wrapper_attributes = get_block_wrapper_attributes(
				array( 'class' => 'gatherpress-countdown-wrapper' )
			);

			return sprintf(
				'<div %1$s><div class="gatherpress-countdown-placeholder"><p>%2$s</p></div></div>',
				$wrapper_attributes,
				esc_html( $message )
			);
		}

		/**
		 * Render the countdown timer.
		 *
		 * @param string $target_date_time Target date time.
		 * @param string $mode             Display mode.
		 * @param array  $show_segments    Show segments configuration.
		 * @param array  $enabled_segments Enabled segments list.
		 * @param bool   $show_labels      Whether to show labels.
		 * @return string HTML output.
		 */
		private function render_timer(
			string $target_date_time,
			string $mode,
			array $show_segments,
			array $enabled_segments,
			bool $show_labels
		): string {
			// Build wrapper attributes
			$wrapper_attributes = get_block_wrapper_attributes(
				array( 'class' => 'gatherpress-countdown-wrapper' )
			);

			// Build data attributes
			$data_attrs = $this->build_data_attributes( $target_date_time, $mode, $show_segments );

			// Build timer HTML
			$timer_html = sprintf(
				'<div class="gatherpress-countdown" %s>',
				$data_attrs
			);

			foreach ( $enabled_segments as $segment ) {
				$timer_html .= $this->render_segment( $segment, $show_labels );
			}

			$timer_html .= '</div>';

			return sprintf(
				'<div %s>%s</div>',
				$wrapper_attributes,
				$timer_html
			);
		}

		/**
		 * Build data attributes string.
		 *
		 * @param string $target_date_time Target date time.
		 * @param string $mode             Display mode.
		 * @param array  $show_segments    Show segments configuration.
		 * @return string Data attributes string.
		 */
		private function build_data_attributes( string $target_date_time, string $mode, array $show_segments ): string {
			$data_attrs = array(
				'data-target' => esc_attr( $target_date_time ),
				'data-mode'   => esc_attr( $mode ),
			);

			foreach ( self::SEGMENT_ORDER as $segment ) {
				$data_key               = 'data-show-' . $segment;
				$data_attrs[ $data_key ] = esc_attr( $show_segments[ $segment ] ? '1' : '0' );
			}

			return implode(
				' ',
				array_map(
					function ( $key, $value ) {
						return sprintf( '%s="%s"', $key, $value );
					},
					array_keys( $data_attrs ),
					$data_attrs
				)
			);
		}

		/**
		 * Render a single time segment.
		 *
		 * @param array $segment     Segment data.
		 * @param bool  $show_labels Whether to show labels.
		 * @return string HTML output.
		 */
		private function render_segment( array $segment, bool $show_labels ): string {
			$html  = '<div class="gatherpress-countdown-segment">';
			$html .= sprintf(
				'<span class="gatherpress-countdown-number">%s</span>',
				esc_html( str_pad( (string) $segment['value'], 2, '0', STR_PAD_LEFT ) )
			);

			if ( $show_labels ) {
				$html .= sprintf(
					'<span class="gatherpress-countdown-label">%s</span>',
					esc_html( $segment['label'] )
				);
			}

			$html .= '</div>';

			return $html;
		}
	}
}

// Render the block using the singleton instance
echo Block_Renderer::get_instance()->render( $attributes, $content, $block );