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
	FormTokenField,
	Spinner,
	MenuGroup,
	MenuItem
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
 * Calculate time difference with cascading based on selected segments.
 *
 * @param {string} targetDateTime - The target date/time in ISO format.
 * @param {Object} segments - Object indicating which segments are shown.
 * @return {Object} Object containing calculated time values.
 */
function calculateTimeDifference( targetDateTime, segments ) {
	if ( ! targetDateTime ) {
		return {
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			total: 0,
		};
	}

	const now = new Date().getTime();
	const target = new Date( targetDateTime ).getTime();
	const difference = target - now;
	const absDifference = Math.abs( difference );

	// Calculate remaining time in seconds
	let remainingSeconds = Math.floor( absDifference / 1000 );

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

	// Calculate each segment, subtracting from remainingSeconds as we go
	if ( segments.showYears ) {
		const secondsPerYear = 365.25 * 24 * 60 * 60;
		result.years = Math.floor( remainingSeconds / secondsPerYear );
		remainingSeconds -= result.years * secondsPerYear;
	}

	if ( segments.showMonths ) {
		const secondsPerMonth = 30.44 * 24 * 60 * 60;
		result.months = Math.floor( remainingSeconds / secondsPerMonth );
		remainingSeconds -= result.months * secondsPerMonth;
	}

	if ( segments.showWeeks ) {
		const secondsPerWeek = 7 * 24 * 60 * 60;
		result.weeks = Math.floor( remainingSeconds / secondsPerWeek );
		remainingSeconds -= result.weeks * secondsPerWeek;
	}

	if ( segments.showDays ) {
		const secondsPerDay = 24 * 60 * 60;
		result.days = Math.floor( remainingSeconds / secondsPerDay );
		remainingSeconds -= result.days * secondsPerDay;
	}

	if ( segments.showHours ) {
		const secondsPerHour = 60 * 60;
		result.hours = Math.floor( remainingSeconds / secondsPerHour );
		remainingSeconds -= result.hours * secondsPerHour;
	}

	if ( segments.showMinutes ) {
		const secondsPerMinute = 60;
		result.minutes = Math.floor( remainingSeconds / secondsPerMinute );
		remainingSeconds -= result.minutes * secondsPerMinute;
	}

	if ( segments.showSeconds ) {
		result.seconds = Math.floor( remainingSeconds );
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
 * Get label for time segment.
 *
 * @param {string} type - Segment type (years, months, etc).
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
	const [ selectedEventTokens, setSelectedEventTokens ] = useState( [] );
	const [ selectedTermTokens, setSelectedTermTokens ] = useState( [] );
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// Get WordPress date and time format settings
	const dateSettings = getSettings();
	const dateFormat = dateSettings.formats.date;
	const timeFormat = dateSettings.formats.time;
	const dateTimeFormat = `${dateFormat} ${timeFormat}`;

	// Get context post ID and type
	const contextPostId = context?.postId;
	const contextPostType = context?.postType;

	// Check if we're in a GatherPress event context
	const isEventContext = contextPostType === 'gatherpress_event';

	// Get the current post's event date if in event context
	const contextEventDate = useSelect(
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

	// Fetch GatherPress taxonomies
	const { taxonomies, isLoadingTaxonomies } = useSelect( ( select ) => {
		const { getTaxonomies, isResolving } = select( coreStore );
		
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const eventTaxonomies = allTaxonomies.filter( 
			tax => tax.types && tax.types.includes( 'gatherpress_event' )
		);
		
		return {
			taxonomies: eventTaxonomies,
			isLoadingTaxonomies: isResolving( 'getTaxonomies', [ { per_page: -1 } ] ),
		};
	}, [] );

	// Fetch terms for the selected taxonomy
	const { terms, isLoadingTerms } = useSelect( 
		( select ) => {
			if ( ! gatherPressTaxonomy ) {
				return { terms: [], isLoadingTerms: false };
			}
			
			const { getEntityRecords, isResolving } = select( coreStore );
			
			return {
				terms: getEntityRecords( 'taxonomy', gatherPressTaxonomy, {
					per_page: 100,
				} ) || [],
				isLoadingTerms: isResolving( 'getEntityRecords', [
					'taxonomy',
					gatherPressTaxonomy,
					{ per_page: 100 },
				] ),
			};
		},
		[ gatherPressTaxonomy ]
	);

	// Fetch the next event from the selected term
	const { nextEventFromTerm, isLoadingNextEvent } = useSelect(
		( select ) => {
			if ( ! gatherPressTaxonomy || ! gatherPressTermId ) {
				return { nextEventFromTerm: null, isLoadingNextEvent: false };
			}
			
			const { getEntityRecords, isResolving } = select( coreStore );
			
			const queryArgs = {
				per_page: 1,
				status: 'publish',
				orderby: 'meta_value',
				meta_key: 'gatherpress_datetime_start',
				order: 'asc',
				meta_query: [
					{
						key: 'gatherpress_datetime_start',
						value: new Date().toISOString(),
						compare: '>=',
						type: 'DATETIME',
					},
				],
			};
			
			// Add taxonomy filter
			queryArgs[ gatherPressTaxonomy ] = gatherPressTermId;
			
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
		[ gatherPressTaxonomy, gatherPressTermId ]
	);

	// Fetch GatherPress events using core data store
	const { events, isLoadingEvents } = useSelect( ( select ) => {
		const { getEntityRecords, isResolving } = select( coreStore );
		
		return {
			events: getEntityRecords( 'postType', 'gatherpress_event', {
				per_page: 100,
				status: 'publish',
				orderby: 'date',
				order: 'desc',
			} ) || [],
			isLoadingEvents: isResolving( 'getEntityRecords', [
				'postType',
				'gatherpress_event',
				{
					per_page: 100,
					status: 'publish',
					orderby: 'date',
					order: 'desc',
				},
			] ),
		};
	}, [] );

	// Get the selected event details
	const selectedEvent = useSelect(
		( select ) => {
			if ( ! gatherPressEventId ) {
				return null;
			}
			
			const { getEntityRecord } = select( coreStore );
			return getEntityRecord( 'postType', 'gatherpress_event', gatherPressEventId );
		},
		[ gatherPressEventId ]
	);

	// Auto-sync with context event date when in event context
	useEffect( () => {
		if ( isEventContext && contextEventDate ) {
			// Only auto-sync if no manual date or event is selected
			if ( ! targetDateTime && ! gatherPressEventId && ! gatherPressTermId ) {
				setAttributes( { targetDateTime: contextEventDate } );
			}
		}
	}, [ isEventContext, contextEventDate, targetDateTime, gatherPressEventId, gatherPressTermId ] );

	// Update selected tokens when gatherPressEventId changes
	useEffect( () => {
		if ( gatherPressEventId && events.length > 0 ) {
			const event = events.find( e => e.id === gatherPressEventId );
			if ( event ) {
				setSelectedEventTokens( [ event.title.rendered ] );
			}
		} else {
			setSelectedEventTokens( [] );
		}
	}, [ gatherPressEventId, events ] );

	// Update selected term tokens when gatherPressTermId changes
	useEffect( () => {
		if ( gatherPressTermId && terms.length > 0 ) {
			const term = terms.find( t => t.id === gatherPressTermId );
			if ( term ) {
				setSelectedTermTokens( [ term.name ] );
			}
		} else {
			setSelectedTermTokens( [] );
		}
	}, [ gatherPressTermId, terms ] );

	// Update target date when next event from term changes
	useEffect( () => {
		if ( nextEventFromTerm?.meta?.gatherpress_datetime_start ) {
			const eventDate = nextEventFromTerm.meta.gatherpress_datetime_start;
			if ( eventDate !== targetDateTime ) {
				setAttributes( { targetDateTime: eventDate } );
			}
		}
	}, [ nextEventFromTerm ] );

	// Update target date when selected event changes
	useEffect( () => {
		if ( selectedEvent?.meta?.gatherpress_datetime_start ) {
			const eventDate = selectedEvent.meta.gatherpress_datetime_start;
			if ( eventDate !== targetDateTime ) {
				setAttributes( { targetDateTime: eventDate } );
			}
		}
	}, [ selectedEvent ] );

	// Update countdown every second.
	useEffect( () => {
		if ( ! targetDateTime ) {
			return;
		}

		const interval = setInterval( () => {
			setTimeLeft( calculateTimeDifference( targetDateTime, segmentConfig ) );
		}, 1000 );

		return () => clearInterval( interval );
	}, [ targetDateTime, showYears, showMonths, showWeeks, showDays, showHours, showMinutes, showSeconds ] );

	// Auto-detect mode based on target date.
	useEffect( () => {
		if ( targetDateTime ) {
			const newMode = timeLeft.total < 0 ? 'countup' : 'countdown';
			if ( newMode !== mode ) {
				setAttributes( { mode: newMode } );
			}
		}
	}, [ targetDateTime, timeLeft.total, mode, setAttributes ] );

	// Update block name with target date using WordPress core date/time format
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

	const segments = [];
	
	if ( showYears ) {
		segments.push( {
			type: 'years',
			value: timeLeft.years,
			label: getSegmentLabel( 'years', timeLeft.years )
		} );
	}
	
	if ( showMonths ) {
		segments.push( {
			type: 'months',
			value: timeLeft.months,
			label: getSegmentLabel( 'months', timeLeft.months )
		} );
	}
	
	if ( showWeeks ) {
		segments.push( {
			type: 'weeks',
			value: timeLeft.weeks,
			label: getSegmentLabel( 'weeks', timeLeft.weeks )
		} );
	}
	
	if ( showDays ) {
		segments.push( {
			type: 'days',
			value: timeLeft.days,
			label: getSegmentLabel( 'days', timeLeft.days )
		} );
	}
	
	if ( showHours ) {
		segments.push( {
			type: 'hours',
			value: timeLeft.hours,
			label: getSegmentLabel( 'hours', timeLeft.hours )
		} );
	}
	
	if ( showMinutes ) {
		segments.push( {
			type: 'minutes',
			value: timeLeft.minutes,
			label: getSegmentLabel( 'minutes', timeLeft.minutes )
		} );
	}
	
	if ( showSeconds ) {
		segments.push( {
			type: 'seconds',
			value: timeLeft.seconds,
			label: getSegmentLabel( 'seconds', timeLeft.seconds )
		} );
	}

	// Handle event selection from FormTokenField - only allow one selection
	const handleEventChange = ( tokens ) => {
		if ( tokens.length === 0 ) {
			setSelectedEventTokens( [] );
			setAttributes( { gatherPressEventId: 0 } );
			return;
		}

		// Only use the most recent token (last in array)
		const selectedToken = tokens[ tokens.length - 1 ];
		const event = events.find( e => e.title.rendered === selectedToken );
		
		if ( event ) {
			// Set only the selected token
			setSelectedEventTokens( [ event.title.rendered ] );
			setAttributes( { 
				gatherPressEventId: event.id,
				gatherPressTaxonomy: '',
				gatherPressTermId: 0
			} );
			setSelectedTermTokens( [] );
		}
	};

	// Handle term selection from FormTokenField - only allow one selection
	const handleTermChange = ( tokens ) => {
		if ( tokens.length === 0 ) {
			setSelectedTermTokens( [] );
			setAttributes( { gatherPressTermId: 0 } );
			return;
		}

		// Only use the most recent token (last in array)
		const selectedToken = tokens[ tokens.length - 1 ];
		const term = terms.find( t => t.name === selectedToken );
		
		if ( term ) {
			// Set only the selected token
			setSelectedTermTokens( [ term.name ] );
			setAttributes( { 
				gatherPressTermId: term.id,
				gatherPressEventId: 0
			} );
			setSelectedEventTokens( [] );
		}
	};

	// Handle taxonomy selection
	const handleTaxonomySelect = ( taxonomy ) => {
		setAttributes( {
			gatherPressTaxonomy: taxonomy,
			gatherPressTermId: 0,
			gatherPressEventId: 0
		} );
		setSelectedTermTokens( [] );
		setSelectedEventTokens( [] );
	};

	// Prepare event suggestions for FormTokenField
	const eventSuggestions = events.map( event => event.title.rendered );

	// Prepare term suggestions for FormTokenField
	const termSuggestions = terms.map( term => term.name );

	// Determine the source of the date
	const isContextDate = isEventContext && contextEventDate && ! gatherPressEventId && ! gatherPressTermId && targetDateTime === contextEventDate;
	const isManualDate = targetDateTime && ! gatherPressEventId && ! gatherPressTermId && ! isContextDate;
	const isSyncedEvent = gatherPressEventId > 0;
	const isSyncedTerm = gatherPressTermId > 0;

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						className="gatherpress-countdown-datetime-dropdown"
						contentClassName="gatherpress-countdown-datetime-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="calendar-alt"
								label={ __( 'Select date and time', 'gatherpress-countdown' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ isManualDate }
							/>
						) }
						renderContent={ () => (
							<DateTimePicker
								currentDate={ targetDateTime || null }
								onChange={ ( newDateTime ) => {
									setAttributes( { 
										targetDateTime: newDateTime,
										gatherPressEventId: 0,
										gatherPressTaxonomy: '',
										gatherPressTermId: 0
									} );
									setSelectedEventTokens( [] );
									setSelectedTermTokens( [] );
								} }
								is12Hour={ false }
							/>
						) }
					/>
					<Dropdown
						className="gatherpress-countdown-gatherpress-dropdown"
						contentClassName="gatherpress-countdown-gatherpress-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="awards"
								label={ __( 'Select GatherPress event', 'gatherpress-countdown' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ isSyncedEvent }
							/>
						) }
						renderContent={ ( { onClose } ) => (
							<div className="gatherpress-countdown-gatherpress-selector">
								{ isLoadingEvents ? (
									<div className="gatherpress-countdown-loading">
										<Spinner />
										<p>{ __( 'Loading events...', 'gatherpress-countdown' ) }</p>
									</div>
								) : events.length === 0 ? (
									<div className="gatherpress-countdown-no-events">
										<p>{ __( 'No GatherPress events found.', 'gatherpress-countdown' ) }</p>
									</div>
								) : (
									<>
										<FormTokenField
											label={ __( 'Select an event', 'gatherpress-countdown' ) }
											value={ selectedEventTokens }
											suggestions={ eventSuggestions }
											onChange={ handleEventChange }
											maxSuggestions={ 10 }
											__experimentalExpandOnFocus
											__experimentalShowHowTo={ false }
										/>
										{ gatherPressEventId > 0 && (
											<p className="gatherpress-countdown-event-sync-note">
												{ __( 'Date synced with event', 'gatherpress-countdown' ) }
											</p>
										) }
									</>
								) }
							</div>
						) }
					/>
					<Dropdown
						className="gatherpress-countdown-taxonomy-dropdown"
						contentClassName="gatherpress-countdown-taxonomy-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="tag"
								label={ __( 'Select from taxonomy', 'gatherpress-countdown' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ isSyncedTerm }
							/>
						) }
						renderContent={ ( { onClose } ) => (
							<div className="gatherpress-countdown-taxonomy-selector">
								{ isLoadingTaxonomies ? (
									<div className="gatherpress-countdown-loading">
										<Spinner />
										<p>{ __( 'Loading taxonomies...', 'gatherpress-countdown' ) }</p>
									</div>
								) : taxonomies.length === 0 ? (
									<div className="gatherpress-countdown-no-events">
										<p>{ __( 'No taxonomies found for GatherPress events.', 'gatherpress-countdown' ) }</p>
									</div>
								) : ! gatherPressTaxonomy ? (
									<>
										<p className="gatherpress-countdown-taxonomy-label">{ __( 'Select a taxonomy:', 'gatherpress-countdown' ) }</p>
										<MenuGroup>
											{ taxonomies.map( ( tax ) => (
												<MenuItem
													key={ tax.slug }
													onClick={ () => handleTaxonomySelect( tax.slug ) }
												>
													{ tax.name }
												</MenuItem>
											) ) }
										</MenuGroup>
									</>
								) : (
									<>
										{ isLoadingTerms ? (
											<div className="gatherpress-countdown-loading">
												<Spinner />
												<p>{ __( 'Loading terms...', 'gatherpress-countdown' ) }</p>
											</div>
										) : terms.length === 0 ? (
											<div className="gatherpress-countdown-no-events">
												<p>{ __( 'No terms found.', 'gatherpress-countdown' ) }</p>
												<ToolbarButton
													isSecondary
													onClick={ () => setAttributes( { gatherPressTaxonomy: '' } ) }
												>
													{ __( 'Back to taxonomies', 'gatherpress-countdown' ) }
												</ToolbarButton>
											</div>
										) : (
											<>
												<div className="gatherpress-countdown-taxonomy-header">
													<ToolbarButton
														icon="arrow-left-alt2"
														onClick={ () => {
															setAttributes( { 
																gatherPressTaxonomy: '',
																gatherPressTermId: 0
															} );
															setSelectedTermTokens( [] );
														} }
														label={ __( 'Back', 'gatherpress-countdown' ) }
													/>
													<span className="gatherpress-countdown-taxonomy-name">
														{ taxonomies.find( t => t.slug === gatherPressTaxonomy )?.name }
													</span>
												</div>
												<FormTokenField
													label={ __( 'Select a term', 'gatherpress-countdown' ) }
													value={ selectedTermTokens }
													suggestions={ termSuggestions }
													onChange={ handleTermChange }
													maxSuggestions={ 10 }
													__experimentalExpandOnFocus
													__experimentalShowHowTo={ false }
												/>
												{ gatherPressTermId > 0 && (
													<>
														{ isLoadingNextEvent ? (
															<div className="gatherpress-countdown-loading">
																<Spinner />
																<p>{ __( 'Finding next event...', 'gatherpress-countdown' ) }</p>
															</div>
														) : nextEventFromTerm ? (
															<p className="gatherpress-countdown-event-sync-note">
																{ __( 'Using next event: ', 'gatherpress-countdown' ) }{ nextEventFromTerm.title.rendered }
															</p>
														) : (
															<Notice status="warning" isDismissible={ false }>
																<p>{ __( 'No upcoming events found in this term.', 'gatherpress-countdown' ) }</p>
															</Notice>
														) }
													</>
												) }
											</>
										) }
									</>
								) }
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
					<ToggleControl
						label={ __( 'Show years', 'gatherpress-countdown' ) }
						checked={ showYears }
						onChange={ ( value ) => setAttributes( { showYears: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show months', 'gatherpress-countdown' ) }
						checked={ showMonths }
						onChange={ ( value ) => setAttributes( { showMonths: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show weeks', 'gatherpress-countdown' ) }
						checked={ showWeeks }
						onChange={ ( value ) => setAttributes( { showWeeks: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show days', 'gatherpress-countdown' ) }
						checked={ showDays }
						onChange={ ( value ) => setAttributes( { showDays: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show hours', 'gatherpress-countdown' ) }
						checked={ showHours }
						onChange={ ( value ) => setAttributes( { showHours: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show minutes', 'gatherpress-countdown' ) }
						checked={ showMinutes }
						onChange={ ( value ) => setAttributes( { showMinutes: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show seconds', 'gatherpress-countdown' ) }
						checked={ showSeconds }
						onChange={ ( value ) => setAttributes( { showSeconds: value } ) }
					/>
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
					<div className="gatherpress-countdown-event-indicator gatherpress-countdown-context-indicator">
						<span className="gatherpress-countdown-event-badge">📅</span>
						<span>{ __( 'Using event date from context', 'gatherpress-countdown' ) }</span>
					</div>
				) }
				{ isSyncedEvent && (
					<div className="gatherpress-countdown-event-indicator">
						<span className="gatherpress-countdown-event-badge">🎟️</span>
						<span>{ __( 'Synced with event', 'gatherpress-countdown' ) }</span>
					</div>
				) }
				{ isSyncedTerm && (
					<div className="gatherpress-countdown-event-indicator">
						<span className="gatherpress-countdown-event-badge">🏷️</span>
						<span>
							{ __( 'Synced with next event in: ', 'gatherpress-countdown' ) }
							{ terms.find( t => t.id === gatherPressTermId )?.name }
						</span>
					</div>
				) }
				{ ! targetDateTime ? (
					<div className="gatherpress-countdown-placeholder">
						<p>{ __( 'Select a date and time using the toolbar buttons above.', 'gatherpress-countdown' ) }</p>
					</div>
				) : segments.length === 0 ? (
					<div className="gatherpress-countdown-placeholder">
						<p>{ __( 'Please select at least one time segment to display.', 'gatherpress-countdown' ) }</p>
					</div>
				) : (
					<div className="gatherpress-countdown" data-mode={ mode }>
						{ segments.map( ( segment, index ) => (
							<div key={ index } className="gatherpress-countdown-segment">
								<span className="gatherpress-countdown-number">{ formatNumber( segment.value ) }</span>
								{ showLabels && (
									<span className="gatherpress-countdown-label">{ segment.label }</span>
								) }
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
