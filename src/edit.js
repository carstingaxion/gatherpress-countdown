/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';

import { 
	PanelBody, 
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
	DateTimePicker,
	Notice,
	ComboboxControl,
	Spinner,
	MenuGroup,
	MenuItem,
	Button,
	RadioControl
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { dateI18n, getSettings } from '@wordpress/date';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

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
 * @param {string}        targetDateTime - The target date/time in ISO format.
 * @param {SegmentConfig} segments       - Object indicating which segments are shown.
 * @return {TimeDifference} Object containing calculated time values.
 */
function calculateTimeDifference( targetDateTime, segments ) {
	if ( ! targetDateTime ) {
		return SEGMENT_ORDER.reduce( ( acc, key ) => ({ ...acc, [key]: 0 }), { total: 0 } );
	}

	const now = new Date().getTime();
	const target = new Date( targetDateTime ).getTime();
	const difference = target - now;
	const absDifference = Math.abs( difference );

	let remainingSeconds = Math.floor( absDifference / 1000 );
	const result = { total: difference };

	// Calculate each segment in order, subtracting from remainingSeconds
	SEGMENT_ORDER.forEach( ( segment ) => {
		const showKey = `show${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
		
		if ( segments[showKey] ) {
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
 * Get label for time segment.
 *
 * @param {string} type  - Segment type (years, months, etc).
 * @param {number} value - Segment value.
 * @return {string} Translated label.
 */
function getSegmentLabel( type, value ) {
	const labels = {
		years: value === 1 ? __( 'Year' ) : __( 'Years' ),
		months: value === 1 ? __( 'Month' ) : __( 'Months' ),
		weeks: value === 1 ? __( 'Week' ) : __( 'Weeks' ),
		days: value === 1 ? __( 'Day' ) : __( 'Days' ),
		hours: value === 1 ? __( 'Hour' ) : __( 'Hours' ),
		minutes: value === 1 ? __( 'Minute' ) : __( 'Minutes' ),
		seconds: value === 1 ? __( 'Second' ) : __( 'Seconds' ),
	};
	return labels[ type ] || '';
}

/**
 * Custom hook to fetch GatherPress events.
 *
 * @param {string} mode - Display mode to filter events ('countdown' for upcoming, 'countup' for past).
 * @return {Object} Events data and loading state.
 */
function useGatherPressEvents( mode ) {
	return useSelect( ( select ) => {
		const { getEntityRecords, isResolving } = select( coreStore );
		const queryArgs = {
			per_page: 100,
			status: 'publish',
			order: mode === 'countup' ? 'desc' : 'asc',
			gatherpress_event_query: mode === 'countup' ? 'past' : 'upcoming',
		};
		
		return {
			events: getEntityRecords( 'postType', 'gatherpress_event', queryArgs ) || [],
			isLoadingEvents: isResolving( 'getEntityRecords', [
				'postType',
				'gatherpress_event',
				queryArgs,
			] ),
		};
	}, [ mode ] );
}

/**
 * Custom hook to fetch GatherPress taxonomies.
 *
 * @return {Object} Taxonomies data and loading state.
 */
function useGatherPressTaxonomies() {
	return useSelect( ( select ) => {
		const { getTaxonomies, isResolving } = select( coreStore );
		const queryArgs = { per_page: -1 };
		
		const allTaxonomies = getTaxonomies( queryArgs ) || [];
		const eventTaxonomies = allTaxonomies.filter( 
			tax => tax.types && tax.types.includes( 'gatherpress_event' )
		);
		
		return {
			taxonomies: eventTaxonomies,
			isLoadingTaxonomies: isResolving( 'getTaxonomies', [ queryArgs ] ),
		};
	}, [] );
}

/**
 * Custom hook to fetch terms for a taxonomy.
 *
 * @param {string} taxonomy - Taxonomy slug.
 * @return {Object} Terms data and loading state.
 */
function useTaxonomyTerms( taxonomy ) {
	return useSelect( 
		( select ) => {
			if ( ! taxonomy ) {
				return { terms: [], isLoadingTerms: false };
			}
			
			const { getEntityRecords, isResolving } = select( coreStore );
			const queryArgs = { per_page: 100 };
			
			return {
				terms: getEntityRecords( 'taxonomy', taxonomy, queryArgs ) || [],
				isLoadingTerms: isResolving( 'getEntityRecords', [
					'taxonomy',
					taxonomy,
					queryArgs,
				] ),
			};
		},
		[ taxonomy ]
	);
}

/**
 * Custom hook to fetch next event from a term.
 *
 * @param {string} taxonomy - Taxonomy slug.
 * @param {number} termId   - Term ID.
 * @param {string} mode     - Display mode to filter events ('countdown' for upcoming, 'countup' for past).
 * @return {Object} Next event data and loading state.
 */
function useNextEventFromTerm( taxonomy, termId, mode ) {
	return useSelect(
		( select ) => {
			if ( ! taxonomy || ! termId ) {
				return { nextEventFromTerm: null, isLoadingNextEvent: false };
			}
			
			const { getEntityRecords, isResolving } = select( coreStore );
			const queryArgs = {
				per_page: 1,
				status: 'publish',
				[taxonomy]: termId,
				gatherpress_event_query: mode === 'countup' ? 'past' : 'upcoming',
				order: mode === 'countup' ? 'desc' : 'asc',
			};
			
			const events = getEntityRecords( 'postType', 'gatherpress_event', queryArgs ) || [];
			
			return {
				nextEventFromTerm: events.length > 0 ? events[0] : null,
				isLoadingNextEvent: isResolving( 'getEntityRecords', [
					'postType',
					'gatherpress_event',
					queryArgs,
				] ),
			};
		},
		[ taxonomy, termId, mode ]
	);
}

/**
 * Custom hook to fetch a specific GatherPress event.
 *
 * @param {number} eventId - Event post ID.
 * @return {Object|null} Event post object or null.
 */
function useGatherPressEvent( eventId ) {
	return useSelect(
		( select ) => {
			if ( ! eventId ) {
				return null;
			}
			
			const { getEntityRecord } = select( coreStore );
			return getEntityRecord( 'postType', 'gatherpress_event', eventId );
		},
		[ eventId ]
	);
}

/**
 * Custom hook to get context event date.
 *
 * @param {number}  contextPostId   - Context post ID.
 * @param {string}  contextPostType - Context post type.
 * @param {boolean} isEventContext  - Whether in event context.
 * @return {string|null} Event date or null.
 */
function useContextEventDate( contextPostId, contextPostType, isEventContext ) {
	return useSelect(
		( select ) => {
			if ( ! isEventContext || ! contextPostId ) {
				return null;
			}
			
			const { getEntityRecord } = select( coreStore );
			const post = getEntityRecord( 'postType', 'gatherpress_event', contextPostId );
			return post?.meta?.gatherpress_datetime_start || null;
		},
		[ isEventContext, contextPostId ]
	);
}

/**
 * Render a loading state component.
 *
 * @param {string} message - Loading message.
 * @return {Element} Loading component.
 */
function LoadingState( { message } ) {
	return (
		<div className="gatherpress-countdown-loading">
			<Spinner />
			<p>{ message }</p>
		</div>
	);
}

/**
 * Render an empty state component.
 *
 * @param {string}  message - Empty state message.
 * @param {Element} action  - Optional action button.
 * @return {Element} Empty state component.
 */
function EmptyState( { message, action } ) {
	return (
		<div className="gatherpress-countdown-no-events">
			<p>{ message }</p>
			{ action }
		</div>
	);
}

/**
 * Render a sync notice component.
 *
 * @param {string} message - Notice message.
 * @return {Element} Notice component.
 */
function SyncNotice( { message } ) {
	return (
		<p className="gatherpress-countdown-event-sync-note">
			{ message }
		</p>
	);
}

/**
 * Render an event indicator badge.
 *
 * @param {string} emoji   - Badge emoji.
 * @param {string} message - Badge message.
 * @param {string} variant - Badge variant class.
 * @return {Element} Badge component.
 */
function EventIndicator( { emoji, message, variant = '' } ) {
	return (
		<div className={`gatherpress-countdown-event-indicator ${variant}`}>
			<span className="gatherpress-countdown-event-badge">{ emoji }</span>
			<span>{ message }</span>
		</div>
	);
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
export default function Edit( { attributes, setAttributes, clientId, context } ) {
	const { 
		targetDateTime, 
		gatherPressEventId,
		gatherPressTaxonomy,
		gatherPressTermId,
		mode,
		autoMode,
		eventMode,
		taxonomyMode,
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
	
	const [ timeLeft, setTimeLeft ] = useState( calculateTimeDifference( targetDateTime, segmentConfig ) );
	const [ openDropdown, setOpenDropdown ] = useState( null );
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// Get WordPress date and time format settings
	const dateSettings = getSettings();
	const dateFormat = dateSettings.formats.date;
	const timeFormat = dateSettings.formats.time;
	const dateTimeFormat = `${dateFormat} ${timeFormat}`;

	// Get context post ID and type
	const contextPostId = context?.postId;
	const contextPostType = context?.postType;
	const isEventContext = contextPostType === 'gatherpress_event';

	// Fetch all data using custom hooks
	const contextEventDate = useContextEventDate( contextPostId, contextPostType, isEventContext );
	const { events, isLoadingEvents } = useGatherPressEvents( eventMode );
	const { taxonomies, isLoadingTaxonomies } = useGatherPressTaxonomies();
	const { terms, isLoadingTerms } = useTaxonomyTerms( gatherPressTaxonomy );
	const { nextEventFromTerm, isLoadingNextEvent } = useNextEventFromTerm( gatherPressTaxonomy, gatherPressTermId, taxonomyMode );
	const selectedEvent = useGatherPressEvent( gatherPressEventId );

	// Determine which source is active
	const isManualDate = targetDateTime && ! gatherPressEventId && ! gatherPressTermId && ! isEventContext;
	const isSyncedEvent = gatherPressEventId > 0;
	const isSyncedTerm = gatherPressTermId > 0;
	const isContextDate = isEventContext && contextEventDate && ! gatherPressEventId && ! gatherPressTermId && targetDateTime === contextEventDate;

	// Auto-sync with context event date when in event context
	useEffect( () => {
		if ( isEventContext && contextEventDate ) {
			if ( ! targetDateTime && ! gatherPressEventId && ! gatherPressTermId ) {
				setAttributes( { targetDateTime: contextEventDate } );
			}
		}
	}, [ isEventContext, contextEventDate, targetDateTime, gatherPressEventId, gatherPressTermId ] );

	// Update target date when synced sources change
	useEffect( () => {
		const eventDate = nextEventFromTerm?.meta?.gatherpress_datetime_start;
		if ( eventDate && eventDate !== targetDateTime ) {
			setAttributes( { targetDateTime: eventDate } );
		}
	}, [ nextEventFromTerm ] );

	useEffect( () => {
		const eventDate = selectedEvent?.meta?.gatherpress_datetime_start;
		if ( eventDate && eventDate !== targetDateTime ) {
			setAttributes( { targetDateTime: eventDate } );
		}
	}, [ selectedEvent ] );

	// Update countdown every second
	useEffect( () => {
		if ( ! targetDateTime ) {
			return;
		}

		const interval = setInterval( () => {
			setTimeLeft( calculateTimeDifference( targetDateTime, segmentConfig ) );
		}, 1000 );

		return () => clearInterval( interval );
	}, [ targetDateTime, showYears, showMonths, showWeeks, showDays, showHours, showMinutes, showSeconds ] );

	// Auto-detect mode based on target date (only if autoMode is enabled and using manual date)
	useEffect( () => {
		if ( targetDateTime && autoMode && isManualDate ) {
			const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
			if ( newMode !== mode ) {
				setAttributes( { mode: newMode } );
			}
		}
	}, [ targetDateTime, timeLeft.total, mode, autoMode, isManualDate, setAttributes ] );

	// Update block name with target date and current mode
	useEffect( () => {
		if ( targetDateTime && updateBlockAttributes ) {
			const formattedDate = dateI18n( dateTimeFormat, targetDateTime );
			const blockName = mode === 'countdown' 
				? __( 'Countdown to', 'gatherpress-countdown' ) + ' ' + formattedDate
				: __( 'Count up from', 'gatherpress-countdown' ) + ' ' + formattedDate;
			
			updateBlockAttributes( clientId, {
				metadata: {
					name: blockName
				}
			} );
		}
	}, [ targetDateTime, mode, clientId, updateBlockAttributes, dateTimeFormat ] );

	const blockProps = useBlockProps( {
		className: 'gatherpress-countdown-wrapper',
	} );

	// Build segments array
	const segments = SEGMENT_ORDER
		.filter( type => {
			const showKey = `show${type.charAt(0).toUpperCase() + type.slice(1)}`;
			return segmentConfig[showKey];
		} )
		.map( type => ({
			type,
			value: timeLeft[type],
			label: getSegmentLabel( type, timeLeft[type] )
		}) );

	// Prepare event options for ComboboxControl
	const eventOptions = events.map( event => ({
		value: event.id,
		label: event.title.rendered
	}) );

	// Prepare term options for ComboboxControl
	const termOptions = terms.map( term => ({
		value: term.id,
		label: term.name
	}) );

	/**
	 * Handle event selection change.
	 *
	 * @param {number|string} value - Selected event ID.
	 */
	const handleEventChange = ( value ) => {
		if ( ! value ) {
			setAttributes( { 
				gatherPressEventId: 0,
				gatherPressTaxonomy: '',
				gatherPressTermId: 0
			} );
			return;
		}

		const eventId = parseInt( value, 10 );
		setAttributes( { 
			gatherPressEventId: eventId,
			gatherPressTaxonomy: '',
			gatherPressTermId: 0
		} );
	};

	/**
	 * Handle term selection change.
	 *
	 * @param {number|string} value - Selected term ID.
	 */
	const handleTermChange = ( value ) => {
		if ( ! value ) {
			setAttributes( { 
				gatherPressTermId: 0,
				gatherPressEventId: 0
			} );
			return;
		}

		const termId = parseInt( value, 10 );
		setAttributes( { 
			gatherPressTermId: termId,
			gatherPressEventId: 0
		} );
	};

	/**
	 * Render event selector dropdown content.
	 *
	 * @return {Element} Dropdown content.
	 */
	const renderEventSelector = () => {
		if ( isLoadingEvents ) {
			return <LoadingState message={ __( 'Loading events...', 'gatherpress-countdown' ) } />;
		}
		
		if ( events.length === 0 ) {
			return <EmptyState message={ __( 'No GatherPress events found.', 'gatherpress-countdown' ) } />;
		}
		
		return (
			<>
				<RadioControl
					label={ __( 'Display mode', 'gatherpress-countdown' ) }
					selected={ eventMode }
					options={ [
						{ label: __( 'Countdown (time until event)', 'gatherpress-countdown' ), value: 'countdown' },
						{ label: __( 'Count up (time since event)', 'gatherpress-countdown' ), value: 'countup' },
					] }
					onChange={ ( value ) => setAttributes( { eventMode: value, mode: value } ) }
				/>
				<ComboboxControl
					label={ __( 'Select an event', 'gatherpress-countdown' ) }
					value={ gatherPressEventId || null }
					onChange={ handleEventChange }
					options={ eventOptions }
					allowReset
					help={ gatherPressEventId > 0 && selectedEvent ? 
						__( 'Synced with event: ', 'gatherpress-countdown' ) + selectedEvent.title.rendered : 
						''
					}
				/>
				{ gatherPressEventId > 0 && eventMode === 'countdown' && (
					<ToggleControl
						label={ __( 'Automatic mode switching', 'gatherpress-countdown' ) }
						checked={ autoMode }
						onChange={ ( value ) => setAttributes( { autoMode: value } ) }
						help={ __( 'Automatically switch from countdown to count-up when the event date is reached.', 'gatherpress-countdown' ) }
					/>
				) }
			</>
		);
	};

	/**
	 * Render taxonomy selector dropdown content.
	 *
	 * @return {Element} Dropdown content.
	 */
	const renderTaxonomySelector = () => {
		if ( isLoadingTaxonomies ) {
			return <LoadingState message={ __( 'Loading taxonomies...', 'gatherpress-countdown' ) } />;
		}
		
		if ( taxonomies.length === 0 ) {
			return <EmptyState message={ __( 'No taxonomies found for GatherPress events.', 'gatherpress-countdown' ) } />;
		}
		
		if ( ! gatherPressTaxonomy ) {
			return (
				<>
					<p className="gatherpress-countdown-taxonomy-label">{ __( 'Select a taxonomy:', 'gatherpress-countdown' ) }</p>
					<MenuGroup>
						{ taxonomies.map( ( tax ) => (
							<MenuItem
								key={ tax.slug }
								onClick={ () => setAttributes( {
									gatherPressTaxonomy: tax.slug,
									gatherPressTermId: 0,
									gatherPressEventId: 0
								} ) }
							>
								{ tax.name }
							</MenuItem>
						) ) }
					</MenuGroup>
				</>
			);
		}
		
		return renderTermSelector();
	};

	/**
	 * Render term selector content.
	 *
	 * @return {Element} Term selector content.
	 */
	const renderTermSelector = () => {
		if ( isLoadingTerms ) {
			return <LoadingState message={ __( 'Loading terms...', 'gatherpress-countdown' ) } />;
		}
		
		if ( terms.length === 0 ) {
			return (
				<EmptyState 
					message={ __( 'No terms found.', 'gatherpress-countdown' ) }
					action={
						<Button
							isSecondary
							isSmall
							onClick={ () => setAttributes( { gatherPressTaxonomy: '' } ) }
						>
							{ __( 'Back to taxonomies', 'gatherpress-countdown' ) }
						</Button>
					}
				/>
			);
		}
		
		return (
			<>
				<div className="gatherpress-countdown-taxonomy-header">
					<Button
						isSmall
						icon="arrow-left-alt2"
						onClick={ () => {
							setAttributes( { 
								gatherPressTaxonomy: '',
								gatherPressTermId: 0
							} );
						} }
						label={ __( 'Back', 'gatherpress-countdown' ) }
					/>
					<span className="gatherpress-countdown-taxonomy-name">
						{ taxonomies.find( t => t.slug === gatherPressTaxonomy )?.name }
					</span>
				</div>
				<RadioControl
					label={ __( 'Display mode', 'gatherpress-countdown' ) }
					selected={ taxonomyMode }
					options={ [
						{ label: __( 'Countdown (time until event)', 'gatherpress-countdown' ), value: 'countdown' },
						{ label: __( 'Count up (time since event)', 'gatherpress-countdown' ), value: 'countup' },
					] }
					onChange={ ( value ) => setAttributes( { taxonomyMode: value, mode: value } ) }
				/>
				<ComboboxControl
					label={ __( 'Select a term', 'gatherpress-countdown' ) }
					value={ gatherPressTermId || null }
					onChange={ handleTermChange }
					options={ termOptions }
					allowReset
				/>
				{ gatherPressTermId > 0 && (
					<>
						{ isLoadingNextEvent ? (
							<LoadingState message={ __( 'Finding next event...', 'gatherpress-countdown' ) } />
						) : nextEventFromTerm ? (
							<>
								<SyncNotice 
									message={ 
										taxonomyMode === 'countdown' 
											? __( 'Using next event: ', 'gatherpress-countdown' ) + nextEventFromTerm.title.rendered
											: __( 'Using last event: ', 'gatherpress-countdown' ) + nextEventFromTerm.title.rendered
									} 
								/>
								{ taxonomyMode === 'countdown' && (
									<ToggleControl
										label={ __( 'Automatic mode switching', 'gatherpress-countdown' ) }
										checked={ autoMode }
										onChange={ ( value ) => setAttributes( { autoMode: value } ) }
										help={ __( 'Automatically switch from countdown to count-up when the event date is reached.', 'gatherpress-countdown' ) }
									/>
								) }
							</>
						) : (
							<Notice status="warning" isDismissible={ false }>
								<p>
									{ taxonomyMode === 'countdown' 
										? __( 'No upcoming events found in this term.', 'gatherpress-countdown' )
										: __( 'No past events found in this term.', 'gatherpress-countdown' )
									}
								</p>
							</Notice>
						) }
					</>
				) }
			</>
		);
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						contentClassName="gatherpress-countdown-datetime-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="calendar-alt"
								label={ __( 'Select date and time', 'gatherpress-countdown' ) }
								onClick={ () => {
									setOpenDropdown( isOpen ? null : 'datetime' );
									onToggle();
								} }
								aria-expanded={ isOpen }
								isPressed={ isManualDate }
							/>
						) }
						renderContent={ () => (
							<>
								<DateTimePicker
									currentDate={ targetDateTime || null }
									onChange={ ( newDateTime ) => {
										setAttributes( { 
											targetDateTime: newDateTime,
											gatherPressEventId: 0,
											gatherPressTaxonomy: '',
											gatherPressTermId: 0
										} );
										setOpenDropdown( null );
									} }
									is12Hour={ false }
								/>
								{ targetDateTime && isManualDate && (
									<div style={{ padding: '16px', borderTop: '1px solid #ddd' }}>
										<ToggleControl
											label={ __( 'Automatic mode switching', 'gatherpress-countdown' ) }
											checked={ autoMode }
											onChange={ ( value ) => setAttributes( { autoMode: value } ) }
											help={ __( 'Automatically switch from countdown to count-up when the target date is reached.', 'gatherpress-countdown' ) }
										/>
									</div>
								) }
							</>
						) }
					/>
					<Dropdown
						contentClassName="gatherpress-countdown-gatherpress-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="awards"
								label={ __( 'Select GatherPress event', 'gatherpress-countdown' ) }
								onClick={ () => {
									setOpenDropdown( isOpen ? null : 'event' );
									onToggle();
								} }
								aria-expanded={ isOpen }
								isPressed={ isSyncedEvent }
							/>
						) }
						renderContent={ () => (
							<div className="gatherpress-countdown-gatherpress-selector">
								{ renderEventSelector() }
							</div>
						) }
					/>
					<Dropdown
						contentClassName="gatherpress-countdown-taxonomy-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="tag"
								label={ __( 'Select from taxonomy', 'gatherpress-countdown' ) }
								onClick={ () => {
									setOpenDropdown( isOpen ? null : 'taxonomy' );
									onToggle();
								} }
								aria-expanded={ isOpen }
								isPressed={ isSyncedTerm }
							/>
						) }
						renderContent={ () => (
							<div className="gatherpress-countdown-taxonomy-selector">
								{ renderTaxonomySelector() }
							</div>
						) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Display Settings', 'gatherpress-countdown' ) }>
					<ToggleControl
						label={ __( 'Show labels', 'gatherpress-countdown' ) }
						checked={ showLabels }
						onChange={ ( value ) => setAttributes( { showLabels: value } ) }
						help={ __( 'Display labels for time segments.', 'gatherpress-countdown' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Time Segments', 'gatherpress-countdown' ) } initialOpen={ false }>
					{ SEGMENT_ORDER.map( segment => {
						const attrKey = `show${segment.charAt(0).toUpperCase() + segment.slice(1)}`;
						const label = segment.charAt(0).toUpperCase() + segment.slice(1);
						
						return (
							<ToggleControl
								key={ segment }
								label={ __( `Show ${segment}`, 'gatherpress-countdown' ) }
								checked={ attributes[attrKey] }
								onChange={ ( value ) => setAttributes( { [attrKey]: value } ) }
							/>
						);
					} ) }
					<Notice status="info" isDismissible={ false } className="gatherpress-countdown-info-notice">
						<p>
							{ __( 'Time segments cascade from largest to smallest. For example, a 40-day countdown with "months" and "days" selected displays "1 month, 10 days". Deselecting "months" updates it to "40 days".' ) }
						</p>
						<p>
							{ __( 'On the frontend, segments automatically hide when they reach zero and all larger segments are already hidden.' ) }
						</p>
					</Notice>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isContextDate && (
					<EventIndicator 
						emoji="📅" 
						message={ __( 'Using event date from context', 'gatherpress-countdown' ) }
						variant="gatherpress-countdown-context-indicator"
					/>
				) }
				{ isSyncedEvent && selectedEvent && (
					<EventIndicator 
						emoji="🎟️" 
						message={ __( 'Synced with event: ', 'gatherpress-countdown' ) + selectedEvent.title.rendered }
					/>
				) }
				{ isSyncedTerm && nextEventFromTerm && (
					<EventIndicator 
						emoji="🏷️" 
						message={ 
							taxonomyMode === 'countdown'
								? __( 'Using next event: ', 'gatherpress-countdown' ) + nextEventFromTerm.title.rendered
								: __( 'Using last event: ', 'gatherpress-countdown' ) + nextEventFromTerm.title.rendered
						}
					/>
				) }
				{ ! targetDateTime ? (
					<div className="gatherpress-countdown__placeholder">
						<p>{ __( 'Select a date and time using the toolbar buttons above.', 'gatherpress-countdown' ) }</p>
					</div>
				) : segments.length === 0 ? (
					<div className="gatherpress-countdown__placeholder">
						<p>{ __( 'Please select at least one time segment to display.', 'gatherpress-countdown' ) }</p>
					</div>
				) : (
					<div className="gatherpress-countdown" data-mode={ mode }>
						<div className="gatherpress-countdown__display">
							{ segments.map( ( segment, index ) => (
								<div key={ index } className="gatherpress-countdown__segment">
									<span className="gatherpress-countdown__number">{ formatNumber( segment.value ) }</span>
									{ showLabels && (
										<span className="gatherpress-countdown__label">{ segment.label }</span>
									) }
								</div>
							) ) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}