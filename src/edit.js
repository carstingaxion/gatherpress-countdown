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
	Spinner
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
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { 
		targetDateTime, 
		gatherPressEventId,
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
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// Get WordPress date and time format settings
	const dateSettings = getSettings();
	const dateFormat = dateSettings.formats.date;
	const timeFormat = dateSettings.formats.time;
	const dateTimeFormat = `${dateFormat} ${timeFormat}`;

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
				? __( 'Countdown to', 'countdown-timer' ) + ' ' + formattedDate
				: __( 'Count up from', 'countdown-timer' ) + ' ' + formattedDate;
			
			updateBlockAttributes( clientId, {
				metadata: {
					name: blockName
				}
			} );
		}
	}, [ targetDateTime, mode, clientId, updateBlockAttributes, dateTimeFormat ] );

	const blockProps = useBlockProps( {
		className: 'countdown-timer-wrapper',
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
			setAttributes( { gatherPressEventId: event.id } );
		}
	};

	// Prepare event suggestions for FormTokenField
	const eventSuggestions = events.map( event => event.title.rendered );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						className="countdown-timer-datetime-dropdown"
						contentClassName="countdown-timer-datetime-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="calendar-alt"
								label={ __( 'Select date and time', 'countdown-timer' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ !! targetDateTime && ! gatherPressEventId }
							/>
						) }
						renderContent={ () => (
							<DateTimePicker
								currentDate={ targetDateTime || null }
								onChange={ ( newDateTime ) => {
									setAttributes( { 
										targetDateTime: newDateTime,
										gatherPressEventId: 0 
									} );
									setSelectedEventTokens( [] );
								} }
								is12Hour={ false }
							/>
						) }
					/>
					<Dropdown
						className="countdown-timer-gatherpress-dropdown"
						contentClassName="countdown-timer-gatherpress-popover"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="awards"
								label={ __( 'Select GatherPress event', 'countdown-timer' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ !! gatherPressEventId }
							/>
						) }
						renderContent={ ( { onClose } ) => (
							<div className="countdown-timer-gatherpress-selector">
								{ isLoadingEvents ? (
									<div className="countdown-timer-loading">
										<Spinner />
										<p>{ __( 'Loading events...', 'countdown-timer' ) }</p>
									</div>
								) : events.length === 0 ? (
									<div className="countdown-timer-no-events">
										<p>{ __( 'No GatherPress events found.', 'countdown-timer' ) }</p>
									</div>
								) : (
									<>
										<FormTokenField
											label={ __( 'Select an event', 'countdown-timer' ) }
											value={ selectedEventTokens }
											suggestions={ eventSuggestions }
											onChange={ handleEventChange }
											maxSuggestions={ 10 }
											__experimentalExpandOnFocus
											__experimentalShowHowTo={ false }
										/>
										{ gatherPressEventId > 0 && (
											<p className="countdown-timer-event-sync-note">
												{ __( 'Date synced with event', 'countdown-timer' ) }
											</p>
										) }
									</>
								) }
							</div>
						) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Display Settings', 'countdown-timer' ) }>
					<ToggleControl
						label={ __( 'Show labels', 'countdown-timer' ) }
						checked={ showLabels }
						onChange={ ( value ) => setAttributes( { showLabels: value } ) }
						help={ __( 'Display labels for time segments.', 'countdown-timer' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Time Segments', 'countdown-timer' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show years', 'countdown-timer' ) }
						checked={ showYears }
						onChange={ ( value ) => setAttributes( { showYears: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show months', 'countdown-timer' ) }
						checked={ showMonths }
						onChange={ ( value ) => setAttributes( { showMonths: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show weeks', 'countdown-timer' ) }
						checked={ showWeeks }
						onChange={ ( value ) => setAttributes( { showWeeks: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show days', 'countdown-timer' ) }
						checked={ showDays }
						onChange={ ( value ) => setAttributes( { showDays: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show hours', 'countdown-timer' ) }
						checked={ showHours }
						onChange={ ( value ) => setAttributes( { showHours: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show minutes', 'countdown-timer' ) }
						checked={ showMinutes }
						onChange={ ( value ) => setAttributes( { showMinutes: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show seconds', 'countdown-timer' ) }
						checked={ showSeconds }
						onChange={ ( value ) => setAttributes( { showSeconds: value } ) }
					/>
					<Notice status="info" isDismissible={ false } className="countdown-timer-info-notice">
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
				{ gatherPressEventId > 0 && (
					<div className="countdown-timer-event-indicator">
						<span className="countdown-timer-event-badge">🎟️</span>
						<span>{ __( 'Synced with event', 'countdown-timer' ) }</span>
					</div>
				) }
				{ ! targetDateTime ? (
					<div className="countdown-timer-placeholder">
						<p>{ __( 'Select a date and time using the toolbar buttons above.', 'countdown-timer' ) }</p>
					</div>
				) : segments.length === 0 ? (
					<div className="countdown-timer-placeholder">
						<p>{ __( 'Please select at least one time segment to display.', 'countdown-timer' ) }</p>
					</div>
				) : (
					<div className="countdown-timer" data-mode={ mode }>
						{ segments.map( ( segment, index ) => (
							<div key={ index } className="countdown-timer-segment">
								<span className="countdown-timer-number">{ formatNumber( segment.value ) }</span>
								{ showLabels && (
									<span className="countdown-timer-label">{ segment.label }</span>
								) }
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
