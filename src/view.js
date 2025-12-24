/**
 * Frontend countdown timer functionality.
 *
 * Handles real-time countdown/countup updates on the frontend.
 * Updates all countdown timer blocks on the page every second.
 *
 * @package GatherPressCountdown
 */

( function() {
	'use strict';

	/**
	 * Time unit conversion constants in seconds.
	 *
	 * @type {Object.<string, number>}
	 */
	const TIME_UNITS = {
		years: 365.25 * 24 * 60 * 60,
		months: 30.44 * 24 * 60 * 60,
		weeks: 7 * 24 * 60 * 60,
		days: 24 * 60 * 60,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1,
	};

	/**
	 * Order of time segments from largest to smallest.
	 *
	 * @type {string[]}
	 */
	const SEGMENT_ORDER = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

	/**
	 * Calculate time difference with cascading based on selected segments.
	 *
	 * @param {string} targetDateTime - The target date/time in ISO format.
	 * @param {Object} segments       - Object indicating which segments are shown.
	 * @return {Object} Object containing calculated time values.
	 */
	function calculateTimeDifference( targetDateTime, segments ) {
		const now = new Date().getTime();
		const target = new Date( targetDateTime ).getTime();
		const difference = target - now;
		const absDifference = Math.abs( difference );

		let remainingSeconds = Math.floor( absDifference / 1000 );
		const result = { total: difference };

		// Calculate each segment in order, subtracting from remainingSeconds
		SEGMENT_ORDER.forEach( function( segment ) {
			if ( segments[segment] ) {
				result[segment] = Math.floor( remainingSeconds / TIME_UNITS[segment] );
				remainingSeconds -= result[segment] * TIME_UNITS[segment];
			} else {
				result[segment] = 0;
			}
		} );

		return result;
	}

	/**
	 * Format number with leading zero.
	 *
	 * @param {number} num - The number to format.
	 * @return {string} Formatted number string.
	 */
	function formatNumber( num ) {
		return num.toString().padStart( 2, '0' );
	}

	/**
	 * Get segment configuration from timer element dataset.
	 *
	 * @param {HTMLElement} timerElement - The countdown timer DOM element.
	 * @return {Object} Segment configuration object.
	 */
	function getSegmentConfig( timerElement ) {
		return {
			years: timerElement.dataset.showYears === '1',
			months: timerElement.dataset.showMonths === '1',
			weeks: timerElement.dataset.showWeeks === '1',
			days: timerElement.dataset.showDays === '1',
			hours: timerElement.dataset.showHours === '1',
			minutes: timerElement.dataset.showMinutes === '1',
			seconds: timerElement.dataset.showSeconds === '1'
		};
	}

	/**
	 * Get enabled segments in order.
	 *
	 * @param {Object} segmentConfig - Segment configuration object.
	 * @return {string[]} Array of enabled segment names.
	 */
	function getEnabledSegments( segmentConfig ) {
		return SEGMENT_ORDER.filter( function( segment ) {
			return segmentConfig[segment];
		} );
	}

	/**
	 * Update a single countdown timer element.
	 *
	 * @param {HTMLElement} timerElement - The countdown timer DOM element.
	 * @return {void}
	 */
	function updateTimer( timerElement ) {
		const targetDateTime = timerElement.dataset.target;
		if ( ! targetDateTime ) {
			return;
		}

		const segmentConfig = getSegmentConfig( timerElement );
		const timeLeft = calculateTimeDifference( targetDateTime, segmentConfig );
		const segmentElements = timerElement.querySelectorAll( '.gatherpress-countdown-segment' );

		if ( segmentElements.length === 0 ) {
			return;
		}

		const enabledSegments = getEnabledSegments( segmentConfig );
		const values = enabledSegments.map( function( segment ) {
			return timeLeft[segment];
		} );
		
		// Find the first non-zero segment from the start
		let firstNonZeroIndex = -1;
		for ( let i = 0; i < values.length; i++ ) {
			if ( values[ i ] > 0 ) {
				firstNonZeroIndex = i;
				break;
			}
		}
		
		segmentElements.forEach( function( segment, index ) {
			if ( index >= values.length ) {
				return;
			}
			
			const value = values[ index ];
			const numberElement = segment.querySelector( '.gatherpress-countdown-number' );
			
			if ( numberElement ) {
				numberElement.textContent = formatNumber( value );
			}
			
			// Only hide segments that come BEFORE the first non-zero segment
			// This ensures in-between zero values are never hidden
			if ( firstNonZeroIndex !== -1 && index < firstNonZeroIndex && value === 0 ) {
				segment.style.display = 'none';
			} else {
				segment.style.display = '';
			}
		} );

		// Update mode attribute if needed.
		const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
		if ( timerElement.dataset.mode !== newMode ) {
			timerElement.dataset.mode = newMode;
		}
	}

	/**
	 * Initialize countdown timers on the page.
	 *
	 * Sets up interval to update all countdown timers every second.
	 *
	 * @return {void}
	 */
	function initCountdownTimers() {
		const timers = document.querySelectorAll( '.gatherpress-countdown' );
		
		if ( timers.length === 0 ) {
			return;
		}

		// Initial update.
		timers.forEach( updateTimer );

		// Update every second.
		setInterval( function() {
			timers.forEach( updateTimer );
		}, 1000 );
	}

	// Initialize when DOM is ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCountdownTimers );
	} else {
		initCountdownTimers();
	}
}() );
