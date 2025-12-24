/**
 * Frontend countdown timer functionality.
 *
 * Handles real-time countdown/countup updates on the frontend.
 * Updates all countdown timer blocks on the page every second.
 *
 * @package TelexCountdownTimer
 */

( function() {
	'use strict';

	/**
	 * Calculate time difference with cascading based on selected segments.
	 *
	 * @param {string} targetDateTime - The target date/time in ISO format.
	 * @param {Object} segments - Object indicating which segments are shown.
	 * @return {Object} Object containing calculated time values.
	 */
	function calculateTimeDifference( targetDateTime, segments ) {
		const now = new Date().getTime();
		const target = new Date( targetDateTime ).getTime();
		const difference = target - now;
		const absDifference = Math.abs( difference );

		// Calculate total units
		const totalSeconds = Math.floor( absDifference / 1000 );
		const totalMinutes = Math.floor( totalSeconds / 60 );
		const totalHours = Math.floor( totalMinutes / 60 );
		const totalDays = Math.floor( totalHours / 24 );
		const totalWeeks = Math.floor( totalDays / 7 );
		const totalMonths = Math.floor( totalDays / 30.44 );
		const totalYears = Math.floor( totalDays / 365.25 );

		// Initialize result object
		const result = {
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			total: difference,
		};

		// Calculate cascading values based on selected segments
		let remainingSeconds = totalSeconds;

		if ( segments.showYears ) {
			result.years = totalYears;
			remainingSeconds -= totalYears * 365.25 * 24 * 60 * 60;
		}

		if ( segments.showMonths ) {
			const monthsToShow = segments.showYears 
				? Math.floor( remainingSeconds / ( 30.44 * 24 * 60 * 60 ) ) % 12
				: totalMonths;
			result.months = monthsToShow;
			if ( segments.showYears ) {
				remainingSeconds -= monthsToShow * 30.44 * 24 * 60 * 60;
			} else {
				remainingSeconds -= totalMonths * 30.44 * 24 * 60 * 60;
			}
		}

		if ( segments.showWeeks ) {
			const weeksToShow = ( segments.showYears || segments.showMonths )
				? Math.floor( remainingSeconds / ( 7 * 24 * 60 * 60 ) ) % 4
				: totalWeeks;
			result.weeks = weeksToShow;
			if ( segments.showYears || segments.showMonths ) {
				remainingSeconds -= weeksToShow * 7 * 24 * 60 * 60;
			} else {
				remainingSeconds -= totalWeeks * 7 * 24 * 60 * 60;
			}
		}

		if ( segments.showDays ) {
			const daysToShow = ( segments.showYears || segments.showMonths || segments.showWeeks )
				? Math.floor( remainingSeconds / ( 24 * 60 * 60 ) ) % 7
				: totalDays;
			result.days = daysToShow;
			if ( segments.showYears || segments.showMonths || segments.showWeeks ) {
				remainingSeconds -= daysToShow * 24 * 60 * 60;
			} else {
				remainingSeconds -= totalDays * 24 * 60 * 60;
			}
		}

		if ( segments.showHours ) {
			const hoursToShow = ( segments.showYears || segments.showMonths || segments.showWeeks || segments.showDays )
				? Math.floor( remainingSeconds / ( 60 * 60 ) ) % 24
				: totalHours;
			result.hours = hoursToShow;
			if ( segments.showYears || segments.showMonths || segments.showWeeks || segments.showDays ) {
				remainingSeconds -= hoursToShow * 60 * 60;
			} else {
				remainingSeconds -= totalHours * 60 * 60;
			}
		}

		if ( segments.showMinutes ) {
			const minutesToShow = ( segments.showYears || segments.showMonths || segments.showWeeks || segments.showDays || segments.showHours )
				? Math.floor( remainingSeconds / 60 ) % 60
				: totalMinutes;
			result.minutes = minutesToShow;
			if ( segments.showYears || segments.showMonths || segments.showWeeks || segments.showDays || segments.showHours ) {
				remainingSeconds -= minutesToShow * 60;
			} else {
				remainingSeconds -= totalMinutes * 60;
			}
		}

		if ( segments.showSeconds ) {
			const secondsToShow = ( segments.showYears || segments.showMonths || segments.showWeeks || segments.showDays || segments.showHours || segments.showMinutes )
				? Math.floor( remainingSeconds ) % 60
				: totalSeconds;
			result.seconds = secondsToShow;
		}

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

		const segments = {
			showYears: timerElement.dataset.showYears === '1',
			showMonths: timerElement.dataset.showMonths === '1',
			showWeeks: timerElement.dataset.showWeeks === '1',
			showDays: timerElement.dataset.showDays === '1',
			showHours: timerElement.dataset.showHours === '1',
			showMinutes: timerElement.dataset.showMinutes === '1',
			showSeconds: timerElement.dataset.showSeconds === '1'
		};

		const timeLeft = calculateTimeDifference( targetDateTime, segments );
		const segmentElements = timerElement.querySelectorAll( '.countdown-timer-segment' );

		if ( segmentElements.length === 0 ) {
			return;
		}

		const values = [];
		const segmentTypes = [];
		
		if ( segments.showYears ) {
			values.push( timeLeft.years );
			segmentTypes.push( 'years' );
		}
		if ( segments.showMonths ) {
			values.push( timeLeft.months );
			segmentTypes.push( 'months' );
		}
		if ( segments.showWeeks ) {
			values.push( timeLeft.weeks );
			segmentTypes.push( 'weeks' );
		}
		if ( segments.showDays ) {
			values.push( timeLeft.days );
			segmentTypes.push( 'days' );
		}
		if ( segments.showHours ) {
			values.push( timeLeft.hours );
			segmentTypes.push( 'hours' );
		}
		if ( segments.showMinutes ) {
			values.push( timeLeft.minutes );
			segmentTypes.push( 'minutes' );
		}
		if ( segments.showSeconds ) {
			values.push( timeLeft.seconds );
			segmentTypes.push( 'seconds' );
		}
		
		// Find the first non-zero segment from the start
		let firstNonZeroIndex = -1;
		for ( let i = 0; i < values.length; i++ ) {
			if ( values[ i ] > 0 ) {
				firstNonZeroIndex = i;
				break;
			}
		}
		
		segmentElements.forEach( ( segment, index ) => {
			if ( index >= values.length ) {
				return;
			}
			
			const value = values[ index ];
			const numberElement = segment.querySelector( '.countdown-timer-number' );
			
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
		const timers = document.querySelectorAll( '.countdown-timer' );
		
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
