<?php
/**
 * Plugin Name:       Countdown Timer
 * Description:       A powerful countdown timer block with real-time updates, multiple styles, and theme.json integration.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            WordPress Telex
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       countdown-timer
 *
 * @package TelexCountdownTimer
 */

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
final class Telex_Countdown_Timer_Block {
	/**
	 * Single instance of the class.
	 *
	 * @var Telex_Countdown_Timer_Block|null
	 */
	private static $instance = null;

	/**
	 * Block name.
	 *
	 * @var string
	 */
	private const BLOCK_NAME = 'telex/block-countdown-timer';

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
	 * @return Telex_Countdown_Timer_Block The singleton instance.
	 */
	public static function get_instance(): Telex_Countdown_Timer_Block {
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
	 * Prevent cloning of the instance.
	 *
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Prevent unserialization of the instance.
	 *
	 * @return void
	 */
	public function __wakeup() {
		throw new Exception( 'Cannot unserialize singleton' );
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
				'label' => __( 'Classic', 'countdown-timer' ),
			),
			array(
				'name'  => 'modern',
				'label' => __( 'Modern', 'countdown-timer' ),
			),
			array(
				'name'  => 'minimal',
				'label' => __( 'Minimal', 'countdown-timer' ),
			),
			array(
				'name'  => 'bold',
				'label' => __( 'Bold', 'countdown-timer' ),
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

/**
 * Initialize the countdown timer block singleton.
 *
 * @return void
 */
function telex_countdown_timer_init(): void {
	Telex_Countdown_Timer_Block::get_instance();
}
add_action( 'plugins_loaded', 'telex_countdown_timer_init' );
