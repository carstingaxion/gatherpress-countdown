/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/* eslint-env browser */
/**
 * Frontend countdown timer functionality with performance optimizations.
 *
 * Handles real-time countdown/countup updates on the frontend using:
 * - IntersectionObserver to pause timers when off-screen
 * - RequestAnimationFrame for optimal rendering
 * - will-change CSS for GPU acceleration
 *
 * @package
 */

(function () {
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
    seconds: 1
  };

  /**
   * Order of time segments from largest to smallest.
   *
   * @type {string[]}
   */
  const SEGMENT_ORDER = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

  /**
   * Timer state manager.
   *
   * @type {Object}
   */
  const timerState = {
    intervalId: null,
    visibleTimers: new Set(),
    allTimers: new Set(),
    observer: null
  };

  /**
   * Get label for time segment with singular/plural support.
   *
   * @param {string} type  - Segment type (years, months, etc).
   * @param {number} value - Segment value.
   * @return {string} Translated label.
   */
  function getSegmentLabel(type, value) {
    const labelMap = {
      years: {
        singular: 'Year',
        plural: 'Years'
      },
      months: {
        singular: 'Month',
        plural: 'Months'
      },
      weeks: {
        singular: 'Week',
        plural: 'Weeks'
      },
      days: {
        singular: 'Day',
        plural: 'Days'
      },
      hours: {
        singular: 'Hour',
        plural: 'Hours'
      },
      minutes: {
        singular: 'Minute',
        plural: 'Minutes'
      },
      seconds: {
        singular: 'Second',
        plural: 'Seconds'
      }
    };
    if (!labelMap[type]) {
      return '';
    }
    if (value === 1) {
      return labelMap[type].singular;
    }
    return labelMap[type].plural;
  }

  /**
   * Calculate time difference with cascading based on selected segments.
   *
   * @param {string} targetDateTime - The target date/time in ISO format.
   * @param {Object} segments       - Object indicating which segments are shown.
   * @return {Object} Object containing calculated time values.
   */
  function calculateTimeDifference(targetDateTime, segments) {
    const now = new Date().getTime();
    const target = new Date(targetDateTime).getTime();
    const difference = target - now;
    const absDifference = Math.abs(difference);
    let remainingSeconds = Math.floor(absDifference / 1000);
    const result = {
      total: difference
    };

    // Calculate each segment in order, subtracting from remainingSeconds
    SEGMENT_ORDER.forEach(function (segment) {
      if (segments[segment]) {
        result[segment] = Math.floor(remainingSeconds / TIME_UNITS[segment]);
        remainingSeconds -= result[segment] * TIME_UNITS[segment];
      } else {
        result[segment] = 0;
      }
    });
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
   * Get segment configuration from timer element dataset.
   *
   * @param {HTMLElement} timerElement - The countdown timer DOM element.
   * @return {Object} Segment configuration object.
   */
  function getSegmentConfig(timerElement) {
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
  function getEnabledSegments(segmentConfig) {
    return SEGMENT_ORDER.filter(function (segment) {
      return segmentConfig[segment];
    });
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
    const segmentElements = timerElement.querySelectorAll('.gatherpress-countdown__segment');
    if (segmentElements.length === 0) {
      return;
    }
    const segmentConfig = getSegmentConfig(timerElement);
    const enabledSegments = getEnabledSegments(segmentConfig);
    const timeLeft = calculateTimeDifference(targetDateTime, segmentConfig);
    const values = enabledSegments.map(function (segment) {
      return timeLeft[segment];
    });

    // Find the first non-zero segment from the start
    let firstNonZeroIndex = -1;
    for (let i = 0; i < values.length; i++) {
      if (values[i] > 0) {
        firstNonZeroIndex = i;
        break;
      }
    }

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(function () {
      segmentElements.forEach(function (segment, index) {
        if (index >= values.length) {
          return;
        }
        const segmentType = enabledSegments[index];
        const value = values[index];
        const numberElement = segment.querySelector('.gatherpress-countdown__number');
        const labelElement = segment.querySelector('.gatherpress-countdown__label');

        // Update number
        if (numberElement) {
          const newValue = formatNumber(value);
          if (numberElement.textContent !== newValue) {
            numberElement.textContent = newValue;
          }
        }

        // Update label with singular/plural form
        if (labelElement) {
          const newLabel = getSegmentLabel(segmentType, value);
          if (labelElement.textContent !== newLabel) {
            labelElement.textContent = newLabel;
          }
        }

        // Handle visibility
        const shouldHide = firstNonZeroIndex !== -1 && index < firstNonZeroIndex && value === 0;
        const isCurrentlyHidden = segment.style.display === 'none';
        if (shouldHide && !isCurrentlyHidden) {
          segment.style.display = 'none';
        } else if (!shouldHide && isCurrentlyHidden) {
          segment.style.display = '';
        }
      });
    });

    // Update mode attribute if needed
    const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
    if (timerElement.dataset.mode !== newMode) {
      timerElement.dataset.mode = newMode;
    }
  }

  /**
   * Update all visible timers.
   *
   * Only updates timers that are currently in the viewport.
   *
   * @return {void}
   */
  function updateVisibleTimers() {
    if (timerState.visibleTimers.size === 0) {
      return;
    }
    timerState.visibleTimers.forEach(function (timer) {
      updateTimer(timer);
    });
  }

  /**
   * Start the update interval.
   *
   * @return {void}
   */
  function startInterval() {
    if (timerState.intervalId) {
      return;
    }
    updateVisibleTimers();
    timerState.intervalId = setInterval(updateVisibleTimers, 1000);
  }

  /**
   * Stop the update interval.
   *
   * @return {void}
   */
  function stopInterval() {
    if (timerState.intervalId) {
      clearInterval(timerState.intervalId);
      timerState.intervalId = null;
    }
  }

  /**
   * Handle intersection observer entries.
   *
   * @param {IntersectionObserverEntry[]} entries - Observer entries.
   * @return {void}
   */
  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Timer entered viewport
        timerState.visibleTimers.add(entry.target);
        // Immediately update the timer
        updateTimer(entry.target);

        // Start interval if this is the first visible timer
        if (timerState.visibleTimers.size === 1) {
          startInterval();
        }
      } else {
        // Timer left viewport
        timerState.visibleTimers.delete(entry.target);

        // Stop interval if no timers are visible
        if (timerState.visibleTimers.size === 0) {
          stopInterval();
        }
      }
    });
  }

  /**
   * Initialize IntersectionObserver for performance optimization.
   *
   * @return {void}
   */
  function initIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: observe all timers
      timerState.allTimers.forEach(function (timer) {
        timerState.visibleTimers.add(timer);
      });
      startInterval();
      return;
    }

    // Create observer with a small root margin to preload timers slightly before they enter viewport
    timerState.observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px',
      threshold: 0
    });

    // Observe all timers
    timerState.allTimers.forEach(function (timer) {
      timerState.observer.observe(timer);
    });
  }

  /**
   * Initialize countdown timers on the page.
   *
   * Sets up IntersectionObserver and interval to update countdown timers.
   *
   * @return {void}
   */
  function initCountdownTimers() {
    const timers = document.querySelectorAll('.gatherpress-countdown');
    if (timers.length === 0) {
      return;
    }

    // Store all timers
    timers.forEach(function (timer) {
      timerState.allTimers.add(timer);
    });

    // Initialize intersection observer for performance
    initIntersectionObserver();
  }

  /**
   * Clean up resources on page unload.
   *
   * @return {void}
   */
  function cleanup() {
    stopInterval();
    if (timerState.observer) {
      timerState.observer.disconnect();
      timerState.observer = null;
    }
    timerState.visibleTimers.clear();
    timerState.allTimers.clear();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdownTimers);
  } else {
    initCountdownTimers();
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', cleanup);

  // Handle visibility change to pause/resume timers
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopInterval();
    } else if (timerState.visibleTimers.size > 0) {
      startInterval();
    }
  });
})();
/******/ })()
;
//# sourceMappingURL=view.js.map