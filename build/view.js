/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Frontend countdown timer functionality.
 *
 * Handles real-time countdown/countup updates on the frontend.
 * Updates all countdown timer blocks on the page every second.
 *
 * @package TelexCountdownTimer
 */

(function () {
  'use strict';

  /**
   * Calculate time difference with cascading based on selected segments.
   *
   * @param {string} targetDateTime - The target date/time in ISO format.
   * @param {Object} segments - Object indicating which segments are shown.
   * @return {Object} Object containing calculated time values.
   */
  function calculateTimeDifference(targetDateTime, segments) {
    const now = new Date().getTime();
    const target = new Date(targetDateTime).getTime();
    const difference = target - now;
    const absDifference = Math.abs(difference);

    // Calculate remaining time in seconds
    let remainingSeconds = Math.floor(absDifference / 1000);

    // Initialize result object
    const result = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: difference
    };

    // Calculate each segment, subtracting from remainingSeconds as we go
    if (segments.showYears) {
      const secondsPerYear = 365.25 * 24 * 60 * 60;
      result.years = Math.floor(remainingSeconds / secondsPerYear);
      remainingSeconds -= result.years * secondsPerYear;
    }
    if (segments.showMonths) {
      const secondsPerMonth = 30.44 * 24 * 60 * 60;
      result.months = Math.floor(remainingSeconds / secondsPerMonth);
      remainingSeconds -= result.months * secondsPerMonth;
    }
    if (segments.showWeeks) {
      const secondsPerWeek = 7 * 24 * 60 * 60;
      result.weeks = Math.floor(remainingSeconds / secondsPerWeek);
      remainingSeconds -= result.weeks * secondsPerWeek;
    }
    if (segments.showDays) {
      const secondsPerDay = 24 * 60 * 60;
      result.days = Math.floor(remainingSeconds / secondsPerDay);
      remainingSeconds -= result.days * secondsPerDay;
    }
    if (segments.showHours) {
      const secondsPerHour = 60 * 60;
      result.hours = Math.floor(remainingSeconds / secondsPerHour);
      remainingSeconds -= result.hours * secondsPerHour;
    }
    if (segments.showMinutes) {
      const secondsPerMinute = 60;
      result.minutes = Math.floor(remainingSeconds / secondsPerMinute);
      remainingSeconds -= result.minutes * secondsPerMinute;
    }
    if (segments.showSeconds) {
      result.seconds = Math.floor(remainingSeconds);
    }
    return result;
  }

  /**
   * Format number with leading zero.
   *
   * @param {number} num - The number to format.
   * @return {string} Formatted number string.
   */
  function formatNumber(num) {
    return num.toString().padStart(2, '0');
  }

  /**
   * Update a single countdown timer element.
   *
   * @param {HTMLElement} timerElement - The countdown timer DOM element.
   * @return {void}
   */
  function updateTimer(timerElement) {
    const targetDateTime = timerElement.dataset.target;
    if (!targetDateTime) {
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
    const timeLeft = calculateTimeDifference(targetDateTime, segments);
    const segmentElements = timerElement.querySelectorAll('.gatherpress-countdown-segment');
    if (segmentElements.length === 0) {
      return;
    }
    const values = [];
    const segmentTypes = [];
    if (segments.showYears) {
      values.push(timeLeft.years);
      segmentTypes.push('years');
    }
    if (segments.showMonths) {
      values.push(timeLeft.months);
      segmentTypes.push('months');
    }
    if (segments.showWeeks) {
      values.push(timeLeft.weeks);
      segmentTypes.push('weeks');
    }
    if (segments.showDays) {
      values.push(timeLeft.days);
      segmentTypes.push('days');
    }
    if (segments.showHours) {
      values.push(timeLeft.hours);
      segmentTypes.push('hours');
    }
    if (segments.showMinutes) {
      values.push(timeLeft.minutes);
      segmentTypes.push('minutes');
    }
    if (segments.showSeconds) {
      values.push(timeLeft.seconds);
      segmentTypes.push('seconds');
    }

    // Find the first non-zero segment from the start
    let firstNonZeroIndex = -1;
    for (let i = 0; i < values.length; i++) {
      if (values[i] > 0) {
        firstNonZeroIndex = i;
        break;
      }
    }
    segmentElements.forEach((segment, index) => {
      if (index >= values.length) {
        return;
      }
      const value = values[index];
      const numberElement = segment.querySelector('.gatherpress-countdown-number');
      if (numberElement) {
        numberElement.textContent = formatNumber(value);
      }

      // Only hide segments that come BEFORE the first non-zero segment
      // This ensures in-between zero values are never hidden
      if (firstNonZeroIndex !== -1 && index < firstNonZeroIndex && value === 0) {
        segment.style.display = 'none';
      } else {
        segment.style.display = '';
      }
    });

    // Update mode attribute if needed.
    const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
    if (timerElement.dataset.mode !== newMode) {
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
    const timers = document.querySelectorAll('.gatherpress-countdown');
    if (timers.length === 0) {
      return;
    }

    // Initial update.
    timers.forEach(updateTimer);

    // Update every second.
    setInterval(function () {
      timers.forEach(updateTimer);
    }, 1000);
  }

  // Initialize when DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdownTimers);
  } else {
    initCountdownTimers();
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map