<?php
/**
 * Render callback for the countdown timer block.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Rendered block HTML.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$target_date_time       = $attributes['targetDateTime'] ?? '';
$gatherpress_event_id   = $attributes['gatherPressEventId'] ?? 0;
$gatherpress_taxonomy   = $attributes['gatherPressTaxonomy'] ?? '';
$gatherpress_term_id    = $attributes['gatherPressTermId'] ?? 0;
$show_labels            = $attributes['showLabels'] ?? true;
$show_years             = $attributes['showYears'] ?? false;
$show_months            = $attributes['showMonths'] ?? false;
$show_weeks             = $attributes['showWeeks'] ?? false;
$show_days              = $attributes['showDays'] ?? true;
$show_hours             = $attributes['showHours'] ?? true;
$show_minutes           = $attributes['showMinutes'] ?? true;
$show_seconds           = $attributes['showSeconds'] ?? true;
$mode                   = $attributes['mode'] ?? 'countdown';

// Check if we have context (from Query Loop or single post)
$context_post_id = $block->context['postId'] ?? get_the_ID();
$context_post_type = $block->context['postType'] ?? get_post_type( $context_post_id );

// If we're in a GatherPress event context and no date is manually set
if ( $context_post_type === 'gatherpress_event' && empty( $target_date_time ) && empty( $gatherpress_event_id ) && empty( $gatherpress_term_id ) ) {
	$context_event_date = get_post_meta( $context_post_id, 'gatherpress_datetime_start', true );
	if ( ! empty( $context_event_date ) ) {
		$target_date_time = $context_event_date;
	}
}

// If a taxonomy term is selected, fetch the next event from that term
if ( $gatherpress_term_id > 0 && ! empty( $gatherpress_taxonomy ) ) {
	$next_event_args = array(
		'post_type'      => 'gatherpress_event',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'orderby'        => 'meta_value',
		'meta_key'       => 'gatherpress_datetime_start',
		'order'          => 'ASC',
		'tax_query'      => array(
			array(
				'taxonomy' => $gatherpress_taxonomy,
				'field'    => 'term_id',
				'terms'    => $gatherpress_term_id,
			),
		),
		'meta_query'     => array(
			array(
				'key'     => 'gatherpress_datetime_start',
				'value'   => current_time( 'mysql' ),
				'compare' => '>=',
				'type'    => 'DATETIME',
			),
		),
	);
	
	$next_events = get_posts( $next_event_args );
	
	if ( ! empty( $next_events ) ) {
		$next_event = $next_events[0];
		$event_date = get_post_meta( $next_event->ID, 'gatherpress_datetime_start', true );
		if ( ! empty( $event_date ) ) {
			$target_date_time = $event_date;
		}
	}
}

// If a GatherPress event is explicitly selected, fetch its date (overrides context and taxonomy)
if ( $gatherpress_event_id > 0 ) {
	$event_date = get_post_meta( $gatherpress_event_id, 'gatherpress_datetime_start', true );
	if ( ! empty( $event_date ) ) {
		$target_date_time = $event_date;
	}
}

/**
 * Get label for time segment.
 *
 * @param string $type  Segment type.
 * @param int    $value Segment value.
 * @return string Translated label.
 */
if ( ! function_exists('telex_countdown_get_segment_label') ) {
	function telex_countdown_get_segment_label( $type, $value ) {
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
}

// If no target date is set, show placeholder.
if ( empty( $target_date_time ) ) {
	$wrapper_attributes = get_block_wrapper_attributes( 
		array( 
			'class' => 'gatherpress-countdown-wrapper',
		) 
	);
	
	echo sprintf(
		'<div %1$s><div class="gatherpress-countdown-placeholder"><p>%2$s</p></div></div>',
		$wrapper_attributes,
		esc_html__( 'Please configure the countdown timer in the editor.', 'gatherpress-countdown' )
	);
	return;
}

// Calculate initial time difference.
$now        = time();
$target     = strtotime( $target_date_time );
$difference = $target - $now;
$abs_diff   = abs( $difference );

// Calculate remaining time in seconds
$remaining_seconds = floor( $abs_diff );

// Calculate each segment, subtracting from remainingSeconds as we go
$years = 0;
if ( $show_years ) {
	$seconds_per_year = 365.25 * 24 * 60 * 60;
	$years = floor( $remaining_seconds / $seconds_per_year );
	$remaining_seconds -= $years * $seconds_per_year;
}

$months = 0;
if ( $show_months ) {
	$seconds_per_month = 30.44 * 24 * 60 * 60;
	$months = floor( $remaining_seconds / $seconds_per_month );
	$remaining_seconds -= $months * $seconds_per_month;
}

$weeks = 0;
if ( $show_weeks ) {
	$seconds_per_week = 7 * 24 * 60 * 60;
	$weeks = floor( $remaining_seconds / $seconds_per_week );
	$remaining_seconds -= $weeks * $seconds_per_week;
}

$days = 0;
if ( $show_days ) {
	$seconds_per_day = 24 * 60 * 60;
	$days = floor( $remaining_seconds / $seconds_per_day );
	$remaining_seconds -= $days * $seconds_per_day;
}

$hours = 0;
if ( $show_hours ) {
	$seconds_per_hour = 60 * 60;
	$hours = floor( $remaining_seconds / $seconds_per_hour );
	$remaining_seconds -= $hours * $seconds_per_hour;
}

$minutes = 0;
if ( $show_minutes ) {
	$seconds_per_minute = 60;
	$minutes = floor( $remaining_seconds / $seconds_per_minute );
	$remaining_seconds -= $minutes * $seconds_per_minute;
}

$seconds = 0;
if ( $show_seconds ) {
	$seconds = floor( $remaining_seconds );
}

// Determine mode based on whether target is in past or future.
$actual_mode = $difference < 0 ? 'countup' : 'countdown';

$wrapper_attributes = get_block_wrapper_attributes( 
	array( 
		'class' => 'gatherpress-countdown-wrapper',
	) 
);

// Build segments array.
$segments = array();

if ( $show_years ) {
	$segments[] = array(
		'value' => $years,
		'label' => telex_countdown_get_segment_label( 'years', $years ),
	);
}

if ( $show_months ) {
	$segments[] = array(
		'value' => $months,
		'label' => telex_countdown_get_segment_label( 'months', $months ),
	);
}

if ( $show_weeks ) {
	$segments[] = array(
		'value' => $weeks,
		'label' => telex_countdown_get_segment_label( 'weeks', $weeks ),
	);
}

if ( $show_days ) {
	$segments[] = array(
		'value' => $days,
		'label' => telex_countdown_get_segment_label( 'days', $days ),
	);
}

if ( $show_hours ) {
	$segments[] = array(
		'value' => $hours,
		'label' => telex_countdown_get_segment_label( 'hours', $hours ),
	);
}

if ( $show_minutes ) {
	$segments[] = array(
		'value' => $minutes,
		'label' => telex_countdown_get_segment_label( 'minutes', $minutes ),
	);
}

if ( $show_seconds ) {
	$segments[] = array(
		'value' => $seconds,
		'label' => telex_countdown_get_segment_label( 'seconds', $seconds ),
	);
}

// If no segments are selected, show placeholder.
if ( empty( $segments ) ) {
	echo sprintf(
		'<div %1$s><div class="gatherpress-countdown-placeholder"><p>%2$s</p></div></div>',
		$wrapper_attributes,
		esc_html__( 'Please select at least one time segment to display.', 'gatherpress-countdown' )
	);
	return;
}

// Build timer HTML.
$timer_html = sprintf(
	'<div class="gatherpress-countdown" data-target="%s" data-mode="%s" data-show-years="%s" data-show-months="%s" data-show-weeks="%s" data-show-days="%s" data-show-hours="%s" data-show-minutes="%s" data-show-seconds="%s">',
	esc_attr( $target_date_time ),
	esc_attr( $actual_mode ),
	esc_attr( $show_years ? '1' : '0' ),
	esc_attr( $show_months ? '1' : '0' ),
	esc_attr( $show_weeks ? '1' : '0' ),
	esc_attr( $show_days ? '1' : '0' ),
	esc_attr( $show_hours ? '1' : '0' ),
	esc_attr( $show_minutes ? '1' : '0' ),
	esc_attr( $show_seconds ? '1' : '0' )
);

foreach ( $segments as $segment ) {
	$timer_html .= '<div class="gatherpress-countdown-segment">';
	$timer_html .= sprintf(
		'<span class="gatherpress-countdown-number">%s</span>',
		esc_html( str_pad( (string) $segment['value'], 2, '0', STR_PAD_LEFT ) )
	);
	
	if ( $show_labels ) {
		$timer_html .= sprintf(
			'<span class="gatherpress-countdown-label">%s</span>',
			esc_html( $segment['label'] )
		);
	}
	
	$timer_html .= '</div>';
}

$timer_html .= '</div>';

echo sprintf(
	'<div %s>%s</div>',
	$wrapper_attributes,
	$timer_html
);