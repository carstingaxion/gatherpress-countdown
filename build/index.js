/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"telex/block-gatherpress-countdown","version":"0.1.0","title":"Countdown Timer","category":"widgets","icon":"clock","description":"Display a countdown timer to a target date or count up from a past date with real-time updates.","keywords":["countdown","timer","event","date","time"],"example":{"attributes":{"targetDateTime":"2025-12-31T23:59:59","mode":"countdown"}},"attributes":{"targetDateTime":{"type":"string","default":""},"gatherPressEventId":{"type":"number","default":0},"gatherPressTaxonomy":{"type":"string","default":""},"gatherPressTermId":{"type":"number","default":0},"mode":{"type":"string","enum":["countdown","countup"],"default":"countdown"},"showLabels":{"type":"boolean","default":true},"showYears":{"type":"boolean","default":false},"showMonths":{"type":"boolean","default":false},"showWeeks":{"type":"boolean","default":false},"showDays":{"type":"boolean","default":true},"showHours":{"type":"boolean","default":true},"showMinutes":{"type":"boolean","default":true},"showSeconds":{"type":"boolean","default":true}},"usesContext":["postId","postType","queryId"],"supports":{"html":false,"align":["wide","full"],"color":{"text":true,"background":true,"gradients":true},"typography":{"fontSize":true,"lineHeight":true,"fontFamily":true,"fontWeight":true},"spacing":{"margin":true,"padding":true,"blockGap":true}},"textdomain":"gatherpress-countdown","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

/***/ },

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */







/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Calculate time difference with cascading based on selected segments.
 *
 * @param {string} targetDateTime - The target date/time in ISO format.
 * @param {Object} segments - Object indicating which segments are shown.
 * @return {Object} Object containing calculated time values.
 */

function calculateTimeDifference(targetDateTime, segments) {
  if (!targetDateTime) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0
    };
  }
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
 * Get label for time segment.
 *
 * @param {string} type - Segment type (years, months, etc).
 * @param {number} value - Segment value.
 * @return {string} Translated label.
 */
function getSegmentLabel(type, value) {
  const labels = {
    years: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Year') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Years'),
    months: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Month') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Months'),
    weeks: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Week') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Weeks'),
    days: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Day') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Days'),
    hours: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hour') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hours'),
    minutes: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Minute') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Minutes'),
    seconds: value === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Second') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Seconds')
  };
  return labels[type] || '';
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               - Block props.
 * @param {Object}   props.attributes    - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes.
 * @param {string}   props.clientId      - Block client ID.
 * @param {Object}   props.context       - Block context.
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes,
  clientId,
  context
}) {
  const {
    targetDateTime,
    gatherPressEventId,
    gatherPressTaxonomy,
    gatherPressTermId,
    mode,
    showLabels,
    showYears,
    showMonths,
    showWeeks,
    showDays,
    showHours,
    showMinutes,
    showSeconds
  } = attributes;
  const segmentConfig = {
    showYears,
    showMonths,
    showWeeks,
    showDays,
    showHours,
    showMinutes,
    showSeconds
  };
  const [timeLeft, setTimeLeft] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(calculateTimeDifference(targetDateTime, segmentConfig));
  const [selectedEventTokens, setSelectedEventTokens] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [selectedTermTokens, setSelectedTermTokens] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');

  // Get WordPress date and time format settings
  const dateSettings = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.getSettings)();
  const dateFormat = dateSettings.formats.date;
  const timeFormat = dateSettings.formats.time;
  const dateTimeFormat = `${dateFormat} ${timeFormat}`;

  // Get context post ID and type
  const contextPostId = context?.postId;
  const contextPostType = context?.postType;

  // Check if we're in a GatherPress event context
  const isEventContext = contextPostType === 'gatherpress_event';

  // Get the current post's event date if in event context
  const contextEventDate = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!isEventContext || !contextPostId) {
      return null;
    }
    const {
      getEntityRecord
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const post = getEntityRecord('postType', 'gatherpress_event', contextPostId);
    return post?.meta?.gatherpress_datetime_start || null;
  }, [isEventContext, contextPostId]);

  // Fetch GatherPress taxonomies
  const {
    taxonomies,
    isLoadingTaxonomies
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getTaxonomies,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const allTaxonomies = getTaxonomies({
      per_page: -1
    }) || [];
    const eventTaxonomies = allTaxonomies.filter(tax => tax.types && tax.types.includes('gatherpress_event'));
    return {
      taxonomies: eventTaxonomies,
      isLoadingTaxonomies: isResolving('getTaxonomies', [{
        per_page: -1
      }])
    };
  }, []);

  // Fetch terms for the selected taxonomy
  const {
    terms,
    isLoadingTerms
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!gatherPressTaxonomy) {
      return {
        terms: [],
        isLoadingTerms: false
      };
    }
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    return {
      terms: getEntityRecords('taxonomy', gatherPressTaxonomy, {
        per_page: 100
      }) || [],
      isLoadingTerms: isResolving('getEntityRecords', ['taxonomy', gatherPressTaxonomy, {
        per_page: 100
      }])
    };
  }, [gatherPressTaxonomy]);

  // Fetch the next event from the selected term
  const {
    nextEventFromTerm,
    isLoadingNextEvent
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!gatherPressTaxonomy || !gatherPressTermId) {
      return {
        nextEventFromTerm: null,
        isLoadingNextEvent: false
      };
    }
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);

    // Build the query args object with the taxonomy filter
    const queryArgs = {
      per_page: 1,
      status: 'publish'
      // orderby: 'meta_value',
      // meta_key: 'gatherpress_datetime_start',
      // order: 'ASC',

      // Use the taxonomy slug as the key and term ID as the value
      // [ gatherPressTaxonomy ]: [[ gatherPressTermId ]],
    };

    // Add taxonomy filter
    queryArgs[gatherPressTaxonomy] = gatherPressTermId;
    const events = getEntityRecords('postType', 'gatherpress_event', queryArgs) || [];
    return {
      nextEventFromTerm: events.length > 0 ? events[0] : null,
      isLoadingNextEvent: isResolving('getEntityRecords', ['postType', 'gatherpress_event', queryArgs])
    };
  }, [gatherPressTaxonomy, gatherPressTermId]);

  // Fetch GatherPress events using core data store
  const {
    events,
    isLoadingEvents
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    return {
      events: getEntityRecords('postType', 'gatherpress_event', {
        per_page: 100,
        status: 'publish',
        orderby: 'date',
        order: 'desc'
      }) || [],
      isLoadingEvents: isResolving('getEntityRecords', ['postType', 'gatherpress_event', {
        per_page: 100,
        status: 'publish',
        orderby: 'date',
        order: 'desc'
      }])
    };
  }, []);

  // Get the selected event details
  const selectedEvent = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!gatherPressEventId) {
      return null;
    }
    const {
      getEntityRecord
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    return getEntityRecord('postType', 'gatherpress_event', gatherPressEventId);
  }, [gatherPressEventId]);

  // Auto-sync with context event date when in event context
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (isEventContext && contextEventDate) {
      // Only auto-sync if no manual date or event is selected
      if (!targetDateTime && !gatherPressEventId && !gatherPressTermId) {
        setAttributes({
          targetDateTime: contextEventDate
        });
      }
    }
  }, [isEventContext, contextEventDate, targetDateTime, gatherPressEventId, gatherPressTermId]);

  // Update selected tokens when gatherPressEventId changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (gatherPressEventId && events.length > 0) {
      const event = events.find(e => e.id === gatherPressEventId);
      if (event) {
        setSelectedEventTokens([event.title.rendered]);
      }
    } else {
      setSelectedEventTokens([]);
    }
  }, [gatherPressEventId, events]);

  // Update selected term tokens when gatherPressTermId changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (gatherPressTermId && terms.length > 0) {
      const term = terms.find(t => t.id === gatherPressTermId);
      if (term) {
        setSelectedTermTokens([term.name]);
      }
    } else {
      setSelectedTermTokens([]);
    }
  }, [gatherPressTermId, terms]);

  // Update target date when next event from term changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (nextEventFromTerm?.meta?.gatherpress_datetime_start) {
      const eventDate = nextEventFromTerm.meta.gatherpress_datetime_start;
      if (eventDate !== targetDateTime) {
        setAttributes({
          targetDateTime: eventDate
        });
      }
    }
  }, [nextEventFromTerm]);

  // Update target date when selected event changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (selectedEvent?.meta?.gatherpress_datetime_start) {
      const eventDate = selectedEvent.meta.gatherpress_datetime_start;
      if (eventDate !== targetDateTime) {
        setAttributes({
          targetDateTime: eventDate
        });
      }
    }
  }, [selectedEvent]);

  // Update countdown every second.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!targetDateTime) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeDifference(targetDateTime, segmentConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateTime, showYears, showMonths, showWeeks, showDays, showHours, showMinutes, showSeconds]);

  // Auto-detect mode based on target date.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (targetDateTime) {
      const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
      if (newMode !== mode) {
        setAttributes({
          mode: newMode
        });
      }
    }
  }, [targetDateTime, timeLeft.total, mode, setAttributes]);

  // Update block name with target date using WordPress core date/time format
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (targetDateTime && updateBlockAttributes) {
      const formattedDate = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)(dateTimeFormat, targetDateTime);
      const blockName = mode === 'countdown' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Countdown to', 'gatherpress-countdown') + ' ' + formattedDate : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Count up from', 'gatherpress-countdown') + ' ' + formattedDate;
      updateBlockAttributes(clientId, {
        metadata: {
          name: blockName
        }
      });
    }
  }, [targetDateTime, mode, clientId, updateBlockAttributes, dateTimeFormat]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: 'gatherpress-countdown-wrapper'
  });
  const segments = [];
  if (showYears) {
    segments.push({
      type: 'years',
      value: timeLeft.years,
      label: getSegmentLabel('years', timeLeft.years)
    });
  }
  if (showMonths) {
    segments.push({
      type: 'months',
      value: timeLeft.months,
      label: getSegmentLabel('months', timeLeft.months)
    });
  }
  if (showWeeks) {
    segments.push({
      type: 'weeks',
      value: timeLeft.weeks,
      label: getSegmentLabel('weeks', timeLeft.weeks)
    });
  }
  if (showDays) {
    segments.push({
      type: 'days',
      value: timeLeft.days,
      label: getSegmentLabel('days', timeLeft.days)
    });
  }
  if (showHours) {
    segments.push({
      type: 'hours',
      value: timeLeft.hours,
      label: getSegmentLabel('hours', timeLeft.hours)
    });
  }
  if (showMinutes) {
    segments.push({
      type: 'minutes',
      value: timeLeft.minutes,
      label: getSegmentLabel('minutes', timeLeft.minutes)
    });
  }
  if (showSeconds) {
    segments.push({
      type: 'seconds',
      value: timeLeft.seconds,
      label: getSegmentLabel('seconds', timeLeft.seconds)
    });
  }

  // Handle event selection from FormTokenField - only allow one selection
  const handleEventChange = tokens => {
    if (tokens.length === 0) {
      setSelectedEventTokens([]);
      setAttributes({
        gatherPressEventId: 0
      });
      return;
    }

    // Only use the most recent token (last in array)
    const selectedToken = tokens[tokens.length - 1];
    const event = events.find(e => e.title.rendered === selectedToken);
    if (event) {
      // Set only the selected token
      setSelectedEventTokens([event.title.rendered]);
      setAttributes({
        gatherPressEventId: event.id,
        gatherPressTaxonomy: '',
        gatherPressTermId: 0
      });
      setSelectedTermTokens([]);
    }
  };

  // Handle term selection from FormTokenField - only allow one selection
  const handleTermChange = tokens => {
    if (tokens.length === 0) {
      setSelectedTermTokens([]);
      setAttributes({
        gatherPressTermId: 0
      });
      return;
    }

    // Only use the most recent token (last in array)
    const selectedToken = tokens[tokens.length - 1];
    const term = terms.find(t => t.name === selectedToken);
    if (term) {
      // Set only the selected token
      setSelectedTermTokens([term.name]);
      setAttributes({
        gatherPressTermId: term.id,
        gatherPressEventId: 0
      });
      setSelectedEventTokens([]);
    }
  };

  // Handle taxonomy selection
  const handleTaxonomySelect = taxonomy => {
    setAttributes({
      gatherPressTaxonomy: taxonomy,
      gatherPressTermId: 0,
      gatherPressEventId: 0
    });
    setSelectedTermTokens([]);
    setSelectedEventTokens([]);
  };

  // Prepare event suggestions for FormTokenField
  const eventSuggestions = events.map(event => event.title.rendered);

  // Prepare term suggestions for FormTokenField
  const termSuggestions = terms.map(term => term.name);

  // Determine the source of the date
  const isContextDate = isEventContext && contextEventDate && !gatherPressEventId && !gatherPressTermId && targetDateTime === contextEventDate;
  const isManualDate = targetDateTime && !gatherPressEventId && !gatherPressTermId && !isContextDate;
  const isSyncedEvent = gatherPressEventId > 0;
  const isSyncedTerm = gatherPressTermId > 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          className: "gatherpress-countdown-datetime-dropdown",
          contentClassName: "gatherpress-countdown-datetime-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "calendar-alt",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select date and time', 'gatherpress-countdown'),
            onClick: onToggle,
            "aria-expanded": isOpen,
            isPressed: isManualDate
          }),
          renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DateTimePicker, {
            currentDate: targetDateTime || null,
            onChange: newDateTime => {
              setAttributes({
                targetDateTime: newDateTime,
                gatherPressEventId: 0,
                gatherPressTaxonomy: '',
                gatherPressTermId: 0
              });
              setSelectedEventTokens([]);
              setSelectedTermTokens([]);
            },
            is12Hour: false
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          className: "gatherpress-countdown-gatherpress-dropdown",
          contentClassName: "gatherpress-countdown-gatherpress-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "awards",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select GatherPress event', 'gatherpress-countdown'),
            onClick: onToggle,
            "aria-expanded": isOpen,
            isPressed: isSyncedEvent
          }),
          renderContent: ({
            onClose
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "gatherpress-countdown-gatherpress-selector",
            children: isLoadingEvents ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "gatherpress-countdown-loading",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading events...', 'gatherpress-countdown')
              })]
            }) : events.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "gatherpress-countdown-no-events",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No GatherPress events found.', 'gatherpress-countdown')
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select an event', 'gatherpress-countdown'),
                value: selectedEventTokens,
                suggestions: eventSuggestions,
                onChange: handleEventChange,
                maxSuggestions: 10,
                __experimentalExpandOnFocus: true,
                __experimentalShowHowTo: false
              }), gatherPressEventId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                className: "gatherpress-countdown-event-sync-note",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date synced with event', 'gatherpress-countdown')
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          className: "gatherpress-countdown-taxonomy-dropdown",
          contentClassName: "gatherpress-countdown-taxonomy-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "tag",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select from taxonomy', 'gatherpress-countdown'),
            onClick: onToggle,
            "aria-expanded": isOpen,
            isPressed: isSyncedTerm
          }),
          renderContent: ({
            onClose
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "gatherpress-countdown-taxonomy-selector",
            children: isLoadingTaxonomies ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "gatherpress-countdown-loading",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading taxonomies...', 'gatherpress-countdown')
              })]
            }) : taxonomies.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "gatherpress-countdown-no-events",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No taxonomies found for GatherPress events.', 'gatherpress-countdown')
              })
            }) : !gatherPressTaxonomy ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                className: "gatherpress-countdown-taxonomy-label",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy:', 'gatherpress-countdown')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuGroup, {
                children: taxonomies.map(tax => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
                  onClick: () => handleTaxonomySelect(tax.slug),
                  children: tax.name
                }, tax.slug))
              })]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: isLoadingTerms ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "gatherpress-countdown-loading",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading terms...', 'gatherpress-countdown')
                })]
              }) : terms.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "gatherpress-countdown-no-events",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No terms found.', 'gatherpress-countdown')
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
                  isSecondary: true,
                  onClick: () => setAttributes({
                    gatherPressTaxonomy: ''
                  }),
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back to taxonomies', 'gatherpress-countdown')
                })]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "gatherpress-countdown-taxonomy-header",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
                    icon: "arrow-left-alt2",
                    onClick: () => {
                      setAttributes({
                        gatherPressTaxonomy: '',
                        gatherPressTermId: 0
                      });
                      setSelectedTermTokens([]);
                    },
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back', 'gatherpress-countdown')
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    className: "gatherpress-countdown-taxonomy-name",
                    children: taxonomies.find(t => t.slug === gatherPressTaxonomy)?.name
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a term', 'gatherpress-countdown'),
                  value: selectedTermTokens,
                  suggestions: termSuggestions,
                  onChange: handleTermChange,
                  maxSuggestions: 10,
                  __experimentalExpandOnFocus: true,
                  __experimentalShowHowTo: false
                }), gatherPressTermId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                  children: isLoadingNextEvent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "gatherpress-countdown-loading",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Finding next event...', 'gatherpress-countdown')
                    })]
                  }) : nextEventFromTerm ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("p", {
                    className: "gatherpress-countdown-event-sync-note",
                    children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Using next event: ', 'gatherpress-countdown'), nextEventFromTerm.title.rendered]
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
                    status: "warning",
                    isDismissible: false,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No upcoming events found in this term.', 'gatherpress-countdown')
                    })
                  })
                })]
              })
            })
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Settings', 'gatherpress-countdown'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show labels', 'gatherpress-countdown'),
          checked: showLabels,
          onChange: value => setAttributes({
            showLabels: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display labels for time segments.', 'gatherpress-countdown')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Time Segments', 'gatherpress-countdown'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show years', 'gatherpress-countdown'),
          checked: showYears,
          onChange: value => setAttributes({
            showYears: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show months', 'gatherpress-countdown'),
          checked: showMonths,
          onChange: value => setAttributes({
            showMonths: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show weeks', 'gatherpress-countdown'),
          checked: showWeeks,
          onChange: value => setAttributes({
            showWeeks: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show days', 'gatherpress-countdown'),
          checked: showDays,
          onChange: value => setAttributes({
            showDays: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show hours', 'gatherpress-countdown'),
          checked: showHours,
          onChange: value => setAttributes({
            showHours: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show minutes', 'gatherpress-countdown'),
          checked: showMinutes,
          onChange: value => setAttributes({
            showMinutes: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show seconds', 'gatherpress-countdown'),
          checked: showSeconds,
          onChange: value => setAttributes({
            showSeconds: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
          status: "info",
          isDismissible: false,
          className: "gatherpress-countdown-info-notice",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Time segments cascade from largest to smallest. For example, a 40-day countdown with "months" and "days" selected displays "1 month, 10 days". Deselecting "months" updates it to "40 days".')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('On the frontend, segments automatically hide when they reach zero and all larger segments are already hidden.')
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: [isContextDate && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "gatherpress-countdown-event-indicator gatherpress-countdown-context-indicator",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "gatherpress-countdown-event-badge",
          children: "\uD83D\uDCC5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Using event date from context', 'gatherpress-countdown')
        })]
      }), isSyncedEvent && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "gatherpress-countdown-event-indicator",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "gatherpress-countdown-event-badge",
          children: "\uD83C\uDF9F\uFE0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced with event', 'gatherpress-countdown')
        })]
      }), isSyncedTerm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "gatherpress-countdown-event-indicator",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "gatherpress-countdown-event-badge",
          children: "\uD83C\uDFF7\uFE0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced with next event in: ', 'gatherpress-countdown'), terms.find(t => t.id === gatherPressTermId)?.name]
        })]
      }), !targetDateTime ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "gatherpress-countdown-placeholder",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a date and time using the toolbar buttons above.', 'gatherpress-countdown')
        })
      }) : segments.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "gatherpress-countdown-placeholder",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please select at least one time segment to display.', 'gatherpress-countdown')
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "gatherpress-countdown",
        "data-mode": mode,
        children: segments.map((segment, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "gatherpress-countdown-segment",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            className: "gatherpress-countdown-number",
            children: formatNumber(segment.value)
          }), showLabels && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            className: "gatherpress-countdown-label",
            children: segment.label
          })]
        }, index))
      })]
    })]
  });
}

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/core-data"
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["coreData"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/date"
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["date"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkblock_gatherpress_countdown"] = globalThis["webpackChunkblock_gatherpress_countdown"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map