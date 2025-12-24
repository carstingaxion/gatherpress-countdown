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

$target_date_time      = $attributes['targetDateTime'] ?? '';
$gatherpress_event_id = $attributes['gatherPressEventId'] ?? 0;
$show_labels           = $attributes['showLabels'] ?? true;
$show_years            = $attributes['showYears'] ?? false;
$show_months           = $attributes['showMonths'] ?? false;
$show_weeks            = $attributes['showWeeks'] ?? false;
$show_days             = $attributes['showDays'] ?? true;
$show_hours            = $attributes['showHours'] ?? true;
$show_minutes          = $attributes['showMinutes'] ?? true;
$show_seconds          = $attributes['showSeconds'] ?? true;
$mode                  = $attributes['mode'] ?? 'countdown';

// If a GatherPress event is selected, fetch its date
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
			'class' => 'countdown-timer-wrapper',
		) 
	);
	
	echo sprintf(
		'<div %1$s><div class="countdown-timer-placeholder"><p>%2$s</p></div></div>',
		$wrapper_attributes,
		esc_html__( 'Please configure the countdown timer in the editor.', 'countdown-timer' )
	);
	return;
}

// Calculate initial time difference.
$now        = time();
$target     = strtotime( $target_date_time );
$difference = $target - $now;
$abs_diff   = abs( $difference );

// Calculate total units.
$total_seconds = floor( $abs_diff );
$total_minutes = floor( $total_seconds / 60 );
$total_hours   = floor( $total_minutes / 60 );
$total_days    = floor( $total_hours / 24 );
$total_weeks   = floor( $total_days / 7 );
$total_months  = floor( $total_days / 30.44 );
$total_years   = floor( $total_days / 365.25 );

// Calculate cascading values.
$remaining_seconds = $total_seconds;

$years = 0;
if ( $show_years ) {
	$years = $total_years;
	$remaining_seconds -= $total_years * 365.25 * 24 * 60 * 60;
}

$months = 0;
if ( $show_months ) {
	$months = $show_years 
		? floor( $remaining_seconds / ( 30.44 * 24 * 60 * 60 ) ) % 12
		: $total_months;
	if ( $show_years ) {
		$remaining_seconds -= $months * 30.44 * 24 * 60 * 60;
	} else {
		$remaining_seconds -= $total_months * 30.44 * 24 * 60 * 60;
	}
}

$weeks = 0;
if ( $show_weeks ) {
	$weeks = ( $show_years || $show_months )
		? floor( $remaining_seconds / ( 7 * 24 * 60 * 60 ) ) % 4
		: $total_weeks;
	if ( $show_years || $show_months ) {
		$remaining_seconds -= $weeks * 7 * 24 * 60 * 60;
	} else {
		$remaining_seconds -= $total_weeks * 7 * 24 * 60 * 60;
	}
}

$days = 0;
if ( $show_days ) {
	$days = ( $show_years || $show_months || $show_weeks )
		? floor( $remaining_seconds / ( 24 * 60 * 60 ) ) % 7
		: $total_days;
	if ( $show_years || $show_months || $show_weeks ) {
		$remaining_seconds -= $days * 24 * 60 * 60;
	} else {
		$remaining_seconds -= $total_days * 24 * 60 * 60;
	}
}

$hours = 0;
if ( $show_hours ) {
	$hours = ( $show_years || $show_months || $show_weeks || $show_days )
		? floor( $remaining_seconds / ( 60 * 60 ) ) % 24
		: $total_hours;
	if ( $show_years || $show_months || $show_weeks || $show_days ) {
		$remaining_seconds -= $hours * 60 * 60;
	} else {
		$remaining_seconds -= $total_hours * 60 * 60;
	}
}

$minutes = 0;
if ( $show_minutes ) {
	$minutes = ( $show_years || $show_months || $show_weeks || $show_days || $show_hours )
		? floor( $remaining_seconds / 60 ) % 60
		: $total_minutes;
	if ( $show_years || $show_months || $show_weeks || $show_days || $show_hours ) {
		$remaining_seconds -= $minutes * 60;
	} else {
		$remaining_seconds -= $total_minutes * 60;
	}
}

$seconds = 0;
if ( $show_seconds ) {
	$seconds = ( $show_years || $show_months || $show_weeks || $show_days || $show_hours || $show_minutes )
		? floor( $remaining_seconds ) % 60
		: $total_seconds;
}

// Determine mode based on whether target is in past or future.
$actual_mode = $difference < 0 ? 'countup' : 'countdown';

$wrapper_attributes = get_block_wrapper_attributes( 
	array( 
		'class' => 'countdown-timer-wrapper',
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
		'<div %1$s><div class="countdown-timer-placeholder"><p>%2$s</p></div></div>',
		$wrapper_attributes,
		esc_html__( 'Please select at least one time segment to display.', 'countdown-timer' )
	);
	return;
}

// Build timer HTML.
$timer_html = sprintf(
	'<div class="countdown-timer" data-target="%s" data-mode="%s" data-show-years="%s" data-show-months="%s" data-show-weeks="%s" data-show-days="%s" data-show-hours="%s" data-show-minutes="%s" data-show-seconds="%s">',
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
	$timer_html .= '<div class="countdown-timer-segment">';
	$timer_html .= sprintf(
		'<span class="countdown-timer-number">%s</span>',
		esc_html( str_pad( (string) $segment['value'], 2, '0', STR_PAD_LEFT ) )
	);
	
	if ( $show_labels ) {
		$timer_html .= sprintf(
			'<span class="countdown-timer-label">%s</span>',
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