<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gatherpress/countdown',
		'version' => '0.1.0',
		'title' => 'GatherPress Countdown',
		'category' => 'gatherpress',
		'icon' => 'clock',
		'description' => 'Display a countdown timer to a target date or count up from a past date with real-time updates.',
		'keywords' => array(
			'countdown',
			'timer',
			'event',
			'date',
			'time'
		),
		'example' => array(
			'attributes' => array(
				'targetDateTime' => '2025-12-31T23:59:59',
				'mode' => 'countdown'
			)
		),
		'attributes' => array(
			'targetDateTime' => array(
				'type' => 'string',
				'default' => ''
			),
			'gatherPressEventId' => array(
				'type' => 'number',
				'default' => 0
			),
			'gatherPressTaxonomy' => array(
				'type' => 'string',
				'default' => ''
			),
			'gatherPressTermId' => array(
				'type' => 'number',
				'default' => 0
			),
			'mode' => array(
				'type' => 'string',
				'enum' => array(
					'countdown',
					'countup'
				),
				'default' => 'countdown'
			),
			'autoMode' => array(
				'type' => 'boolean',
				'default' => true
			),
			'eventMode' => array(
				'type' => 'string',
				'enum' => array(
					'countdown',
					'countup'
				),
				'default' => 'countdown'
			),
			'taxonomyMode' => array(
				'type' => 'string',
				'enum' => array(
					'countdown',
					'countup'
				),
				'default' => 'countdown'
			),
			'showLabels' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showYears' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showMonths' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showWeeks' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showDays' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showHours' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showMinutes' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showSeconds' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'usesContext' => array(
			'postId',
			'postType',
			'queryId'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'fontFamily' => true,
				'fontWeight' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'gatherpress-countdown',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	)
);
