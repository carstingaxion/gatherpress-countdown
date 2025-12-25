/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gatherpress/countdown","version":"0.1.0","title":"GatherPress Countdown","category":"gatherpress","icon":"clock","description":"Display a countdown timer to a target date or count up from a past date with real-time updates.","keywords":["countdown","timer","event","date","time"],"example":{"attributes":{"targetDateTime":"2025-12-31T23:59:59","mode":"countdown"}},"attributes":{"targetDateTime":{"type":"string","default":""},"gatherPressEventId":{"type":"number","default":0},"gatherPressTaxonomy":{"type":"string","default":""},"gatherPressTermId":{"type":"number","default":0},"mode":{"type":"string","enum":["countdown","countup"],"default":"countdown"},"showLabels":{"type":"boolean","default":true},"showYears":{"type":"boolean","default":false},"showMonths":{"type":"boolean","default":false},"showWeeks":{"type":"boolean","default":false},"showDays":{"type":"boolean","default":true},"showHours":{"type":"boolean","default":true},"showMinutes":{"type":"boolean","default":true},"showSeconds":{"type":"boolean","default":true}},"usesContext":["postId","postType","queryId"],"supports":{"html":false,"align":["wide","full"],"color":{"text":true,"background":true,"gradients":true},"typography":{"fontSize":true,"lineHeight":true,"fontFamily":true,"fontWeight":true},"spacing":{"margin":true,"padding":true,"blockGap":true}},"textdomain":"gatherpress-countdown","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

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
 * Time segment configuration type.
 *
 * @typedef {Object} SegmentConfig
 * @property {boolean} showYears   - Whether to show years.
 * @property {boolean} showMonths  - Whether to show months.
 * @property {boolean} showWeeks   - Whether to show weeks.
 * @property {boolean} showDays    - Whether to show days.
 * @property {boolean} showHours   - Whether to show hours.
 * @property {boolean} showMinutes - Whether to show minutes.
 * @property {boolean} showSeconds - Whether to show seconds.
 */

/**
 * Time difference result type.
 *
 * @typedef {Object} TimeDifference
 * @property {number} years   - Years remaining.
 * @property {number} months  - Months remaining.
 * @property {number} weeks   - Weeks remaining.
 * @property {number} days    - Days remaining.
 * @property {number} hours   - Hours remaining.
 * @property {number} minutes - Minutes remaining.
 * @property {number} seconds - Seconds remaining.
 * @property {number} total   - Total difference in milliseconds.
 */

/**
 * Time segment type.
 *
 * @typedef {Object} Segment
 * @property {string} type  - Segment type (years, months, etc).
 * @property {number} value - Segment value.
 * @property {string} label - Translated label.
 */

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
 * Calculate time difference with cascading based on selected segments.
 *
 * @param {string}        targetDateTime - The target date/time in ISO format.
 * @param {SegmentConfig} segments       - Object indicating which segments are shown.
 * @return {TimeDifference} Object containing calculated time values.
 */
function calculateTimeDifference(targetDateTime, segments) {
  if (!targetDateTime) {
    return SEGMENT_ORDER.reduce((acc, key) => ({
      ...acc,
      [key]: 0
    }), {
      total: 0
    });
  }
  const now = new Date().getTime();
  const target = new Date(targetDateTime).getTime();
  const difference = target - now;
  const absDifference = Math.abs(difference);
  let remainingSeconds = Math.floor(absDifference / 1000);
  const result = {
    total: difference
  };

  // Calculate each segment in order, subtracting from remainingSeconds
  SEGMENT_ORDER.forEach(segment => {
    const showKey = `show${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
    if (segments[showKey]) {
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
 * Get label for time segment.
 *
 * @param {string} type  - Segment type (years, months, etc).
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
 * Custom hook to fetch GatherPress events.
 *
 * @return {Object} Events data and loading state.
 */
function useGatherPressEvents() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const queryArgs = {
      per_page: 100,
      status: 'publish',
      orderby: 'date',
      order: 'desc'
    };
    return {
      events: getEntityRecords('postType', 'gatherpress_event', queryArgs) || [],
      isLoadingEvents: isResolving('getEntityRecords', ['postType', 'gatherpress_event', queryArgs])
    };
  }, []);
}

/**
 * Custom hook to fetch GatherPress taxonomies.
 *
 * @return {Object} Taxonomies data and loading state.
 */
function useGatherPressTaxonomies() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getTaxonomies,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const queryArgs = {
      per_page: -1
    };
    const allTaxonomies = getTaxonomies(queryArgs) || [];
    const eventTaxonomies = allTaxonomies.filter(tax => tax.types && tax.types.includes('gatherpress_event'));
    return {
      taxonomies: eventTaxonomies,
      isLoadingTaxonomies: isResolving('getTaxonomies', [queryArgs])
    };
  }, []);
}

/**
 * Custom hook to fetch terms for a taxonomy.
 *
 * @param {string} taxonomy - Taxonomy slug.
 * @return {Object} Terms data and loading state.
 */
function useTaxonomyTerms(taxonomy) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!taxonomy) {
      return {
        terms: [],
        isLoadingTerms: false
      };
    }
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const queryArgs = {
      per_page: 100
    };
    return {
      terms: getEntityRecords('taxonomy', taxonomy, queryArgs) || [],
      isLoadingTerms: isResolving('getEntityRecords', ['taxonomy', taxonomy, queryArgs])
    };
  }, [taxonomy]);
}

/**
 * Custom hook to fetch next event from a term.
 *
 * @param {string} taxonomy - Taxonomy slug.
 * @param {number} termId   - Term ID.
 * @return {Object} Next event data and loading state.
 */
function useNextEventFromTerm(taxonomy, termId) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!taxonomy || !termId) {
      return {
        nextEventFromTerm: null,
        isLoadingNextEvent: false
      };
    }
    const {
      getEntityRecords,
      isResolving
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const queryArgs = {
      per_page: 1,
      status: 'publish',
      [taxonomy]: termId
    };
    const events = getEntityRecords('postType', 'gatherpress_event', queryArgs) || [];
    return {
      nextEventFromTerm: events.length > 0 ? events[0] : null,
      isLoadingNextEvent: isResolving('getEntityRecords', ['postType', 'gatherpress_event', queryArgs])
    };
  }, [taxonomy, termId]);
}

/**
 * Custom hook to fetch a specific GatherPress event.
 *
 * @param {number} eventId - Event post ID.
 * @return {Object|null} Event post object or null.
 */
function useGatherPressEvent(eventId) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!eventId) {
      return null;
    }
    const {
      getEntityRecord
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    return getEntityRecord('postType', 'gatherpress_event', eventId);
  }, [eventId]);
}

/**
 * Custom hook to get context event date.
 *
 * @param {number}  contextPostId   - Context post ID.
 * @param {string}  contextPostType - Context post type.
 * @param {boolean} isEventContext  - Whether in event context.
 * @return {string|null} Event date or null.
 */
function useContextEventDate(contextPostId, contextPostType, isEventContext) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!isEventContext || !contextPostId) {
      return null;
    }
    const {
      getEntityRecord
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store);
    const post = getEntityRecord('postType', 'gatherpress_event', contextPostId);
    return post?.meta?.gatherpress_datetime_start || null;
  }, [isEventContext, contextPostId]);
}

/**
 * Render a loading state component.
 *
 * @param {string} message - Loading message.
 * @return {Element} Loading component.
 */
function LoadingState({
  message
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "gatherpress-countdown-loading",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      children: message
    })]
  });
}

/**
 * Render an empty state component.
 *
 * @param {string}  message - Empty state message.
 * @param {Element} action  - Optional action button.
 * @return {Element} Empty state component.
 */
function EmptyState({
  message,
  action
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "gatherpress-countdown-no-events",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      children: message
    }), action]
  });
}

/**
 * Render a sync notice component.
 *
 * @param {string} message - Notice message.
 * @return {Element} Notice component.
 */
function SyncNotice({
  message
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
    className: "gatherpress-countdown-event-sync-note",
    children: message
  });
}

/**
 * Render an event indicator badge.
 *
 * @param {string} emoji   - Badge emoji.
 * @param {string} message - Badge message.
 * @param {string} variant - Badge variant class.
 * @return {Element} Badge component.
 */
function EventIndicator({
  emoji,
  message,
  variant = ''
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: `gatherpress-countdown-event-indicator ${variant}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
      className: "gatherpress-countdown-event-badge",
      children: emoji
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
      children: message
    })]
  });
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
  const [openDropdown, setOpenDropdown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
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
  const isEventContext = contextPostType === 'gatherpress_event';

  // Fetch all data using custom hooks
  const contextEventDate = useContextEventDate(contextPostId, contextPostType, isEventContext);
  const {
    events,
    isLoadingEvents
  } = useGatherPressEvents();
  const {
    taxonomies,
    isLoadingTaxonomies
  } = useGatherPressTaxonomies();
  const {
    terms,
    isLoadingTerms
  } = useTaxonomyTerms(gatherPressTaxonomy);
  const {
    nextEventFromTerm,
    isLoadingNextEvent
  } = useNextEventFromTerm(gatherPressTaxonomy, gatherPressTermId);
  const selectedEvent = useGatherPressEvent(gatherPressEventId);

  // Auto-sync with context event date when in event context
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (isEventContext && contextEventDate) {
      if (!targetDateTime && !gatherPressEventId && !gatherPressTermId) {
        setAttributes({
          targetDateTime: contextEventDate
        });
      }
    }
  }, [isEventContext, contextEventDate, targetDateTime, gatherPressEventId, gatherPressTermId]);

  // Update target date when synced sources change
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const eventDate = nextEventFromTerm?.meta?.gatherpress_datetime_start;
    if (eventDate && eventDate !== targetDateTime) {
      setAttributes({
        targetDateTime: eventDate
      });
    }
  }, [nextEventFromTerm]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const eventDate = selectedEvent?.meta?.gatherpress_datetime_start;
    if (eventDate && eventDate !== targetDateTime) {
      setAttributes({
        targetDateTime: eventDate
      });
    }
  }, [selectedEvent]);

  // Update countdown every second
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!targetDateTime) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeDifference(targetDateTime, segmentConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateTime, showYears, showMonths, showWeeks, showDays, showHours, showMinutes, showSeconds]);

  // Auto-detect mode based on target date
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

  // Update block name with target date
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

  // Build segments array
  const segments = SEGMENT_ORDER.filter(type => {
    const showKey = `show${type.charAt(0).toUpperCase() + type.slice(1)}`;
    return segmentConfig[showKey];
  }).map(type => ({
    type,
    value: timeLeft[type],
    label: getSegmentLabel(type, timeLeft[type])
  }));

  // Prepare event options for ComboboxControl
  const eventOptions = events.map(event => ({
    value: event.id,
    label: event.title.rendered
  }));

  // Prepare term options for ComboboxControl
  const termOptions = terms.map(term => ({
    value: term.id,
    label: term.name
  }));

  // Determine date source
  const isContextDate = isEventContext && contextEventDate && !gatherPressEventId && !gatherPressTermId && targetDateTime === contextEventDate;
  const isManualDate = targetDateTime && !gatherPressEventId && !gatherPressTermId && !isContextDate;
  const isSyncedEvent = gatherPressEventId > 0;
  const isSyncedTerm = gatherPressTermId > 0;

  /**
   * Handle event selection change.
   *
   * @param {number|string} value - Selected event ID.
   */
  const handleEventChange = value => {
    if (!value) {
      setAttributes({
        gatherPressEventId: 0,
        gatherPressTaxonomy: '',
        gatherPressTermId: 0
      });
      return;
    }
    const eventId = parseInt(value, 10);
    setAttributes({
      gatherPressEventId: eventId,
      gatherPressTaxonomy: '',
      gatherPressTermId: 0
    });
  };

  /**
   * Handle term selection change.
   *
   * @param {number|string} value - Selected term ID.
   */
  const handleTermChange = value => {
    if (!value) {
      setAttributes({
        gatherPressTermId: 0,
        gatherPressEventId: 0
      });
      return;
    }
    const termId = parseInt(value, 10);
    setAttributes({
      gatherPressTermId: termId,
      gatherPressEventId: 0
    });
  };

  /**
   * Render event selector dropdown content.
   *
   * @return {Element} Dropdown content.
   */
  const renderEventSelector = () => {
    if (isLoadingEvents) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(LoadingState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading events...', 'gatherpress-countdown')
      });
    }
    if (events.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EmptyState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No GatherPress events found.', 'gatherpress-countdown')
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ComboboxControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select an event', 'gatherpress-countdown'),
      value: gatherPressEventId || null,
      onChange: handleEventChange,
      options: eventOptions,
      allowReset: true,
      help: gatherPressEventId > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date synced with selected event', 'gatherpress-countdown') : ''
    });
  };

  /**
   * Render taxonomy selector dropdown content.
   *
   * @return {Element} Dropdown content.
   */
  const renderTaxonomySelector = () => {
    if (isLoadingTaxonomies) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(LoadingState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading taxonomies...', 'gatherpress-countdown')
      });
    }
    if (taxonomies.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EmptyState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No taxonomies found for GatherPress events.', 'gatherpress-countdown')
      });
    }
    if (!gatherPressTaxonomy) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          className: "gatherpress-countdown-taxonomy-label",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy:', 'gatherpress-countdown')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuGroup, {
          children: taxonomies.map(tax => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
            onClick: () => setAttributes({
              gatherPressTaxonomy: tax.slug,
              gatherPressTermId: 0,
              gatherPressEventId: 0
            }),
            children: tax.name
          }, tax.slug))
        })]
      });
    }
    return renderTermSelector();
  };

  /**
   * Render term selector content.
   *
   * @return {Element} Term selector content.
   */
  const renderTermSelector = () => {
    if (isLoadingTerms) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(LoadingState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading terms...', 'gatherpress-countdown')
      });
    }
    if (terms.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EmptyState, {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No terms found.', 'gatherpress-countdown'),
        action: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isSecondary: true,
          isSmall: true,
          onClick: () => setAttributes({
            gatherPressTaxonomy: ''
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back to taxonomies', 'gatherpress-countdown')
        })
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "gatherpress-countdown-taxonomy-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isSmall: true,
          icon: "arrow-left-alt2",
          onClick: () => {
            setAttributes({
              gatherPressTaxonomy: '',
              gatherPressTermId: 0
            });
          },
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back', 'gatherpress-countdown')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "gatherpress-countdown-taxonomy-name",
          children: taxonomies.find(t => t.slug === gatherPressTaxonomy)?.name
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ComboboxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a term', 'gatherpress-countdown'),
        value: gatherPressTermId || null,
        onChange: handleTermChange,
        options: termOptions,
        allowReset: true
      }), gatherPressTermId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: isLoadingNextEvent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(LoadingState, {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Finding next event...', 'gatherpress-countdown')
        }) : nextEventFromTerm ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(SyncNotice, {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Using next event: ', 'gatherpress-countdown') + nextEventFromTerm.title.rendered
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
          status: "warning",
          isDismissible: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No upcoming events found in this term.', 'gatherpress-countdown')
          })
        })
      })]
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          contentClassName: "gatherpress-countdown-datetime-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "calendar-alt",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select date and time', 'gatherpress-countdown'),
            onClick: () => {
              setOpenDropdown(isOpen ? null : 'datetime');
              onToggle();
            },
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
              setOpenDropdown(null);
            },
            is12Hour: false
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          contentClassName: "gatherpress-countdown-gatherpress-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "awards",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select GatherPress event', 'gatherpress-countdown'),
            onClick: () => {
              setOpenDropdown(isOpen ? null : 'event');
              onToggle();
            },
            "aria-expanded": isOpen,
            isPressed: isSyncedEvent
          }),
          renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "gatherpress-countdown-gatherpress-selector",
            children: renderEventSelector()
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
          contentClassName: "gatherpress-countdown-taxonomy-popover",
          position: "bottom center",
          renderToggle: ({
            isOpen,
            onToggle
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
            icon: "tag",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select from taxonomy', 'gatherpress-countdown'),
            onClick: () => {
              setOpenDropdown(isOpen ? null : 'taxonomy');
              onToggle();
            },
            "aria-expanded": isOpen,
            isPressed: isSyncedTerm
          }),
          renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "gatherpress-countdown-taxonomy-selector",
            children: renderTaxonomySelector()
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
        children: [SEGMENT_ORDER.map(segment => {
          const attrKey = `show${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`Show ${segment}`, 'gatherpress-countdown'),
            checked: attributes[attrKey],
            onChange: value => setAttributes({
              [attrKey]: value
            })
          }, segment);
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
      children: [isContextDate && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EventIndicator, {
        emoji: "\uD83D\uDCC5",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Using event date from context', 'gatherpress-countdown'),
        variant: "gatherpress-countdown-context-indicator"
      }), isSyncedEvent && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EventIndicator, {
        emoji: "\uD83C\uDF9F\uFE0F",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced with event', 'gatherpress-countdown')
      }), isSyncedTerm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EventIndicator, {
        emoji: "\uD83C\uDFF7\uFE0F",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced with next event in: ', 'gatherpress-countdown') + terms.find(t => t.id === gatherPressTermId)?.name
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