<?php
/**
 * Plugin Name:       GatherPress Countdown
 * Description:       Countdown timer block with real-time updates, GatherPress event integration, and context-aware date synchronization.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            cb + WordPress Telex
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-countdown
 *
 * @package GatherPressCountdown
 */

namespace GatherPress\Countdown;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Countdown Timer Block Singleton Class
 *
 * Manages the countdown timer block registration, styles, and assets.
 *
 * @since 0.1.0
 */
final class Plugin {
	/**
	 * Single instance of the class.
	 *
	 * @var Plugin|null
	 */
	private static $instance = null;

	/**
	 * Block name.
	 *
	 * @var string
	 */
	private const BLOCK_NAME = 'gatherpress/countdown';

	/**
	 * Plugin directory path.
	 *
	 * @var string
	 */
	private string $plugin_dir;

	/**
	 * Plugin directory URL.
	 *
	 * @var string
	 */
	private string $plugin_url;

	/**
	 * Get the singleton instance.
	 *
	 * @return Plugin The singleton instance.
	 */
	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor - private to enforce singleton.
	 */
	private function __construct() {
		$this->plugin_dir = plugin_dir_path( __FILE__ );
		$this->plugin_url = plugin_dir_url( __FILE__ );
		
		add_action( 'init', array( $this, 'register_block' ) );
	}


	/**
	 * Register the countdown timer block.
	 *
	 * Registers the block type and its associated styles.
	 *
	 * @return void
	 */
	public function register_block(): void {
		// Register the block type.
		register_block_type( $this->plugin_dir . 'build/' );

		// Register block styles.
		$this->register_block_styles();
	}

	/**
	 * Register block style variations.
	 *
	 * Registers multiple visual styles for the countdown timer block.
	 *
	 * @return void
	 */
	private function register_block_styles(): void {
		$styles = array(
			array(
				'name'  => 'classic',
				'label' => __( 'Classic', 'gatherpress-countdown' ),
			),
			array(
				'name'  => 'modern',
				'label' => __( 'Modern', 'gatherpress-countdown' ),
			),
			array(
				'name'  => 'minimal',
				'label' => __( 'Minimal', 'gatherpress-countdown' ),
			),
			array(
				'name'  => 'bold',
				'label' => __( 'Bold', 'gatherpress-countdown' ),
			),
		);

		foreach ( $styles as $style ) {
			register_block_style(
				self::BLOCK_NAME,
				$style
			);
		}
	}
}
Plugin::get_instance();
