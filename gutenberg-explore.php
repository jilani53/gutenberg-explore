<?php
/**
 * Plugin Name: Gutenberg Explore
 * Description: Explore how to use the Gutenberg editor
 * Version: 0.0.1
 * Author: Jilani Ahmed 
 * Author URI: https://wpninjadevs.com/
 * Text Domain: gutenberg-explore
 * Domain Path: /languages
 * 
 * @package gutenbergExplore 
 * 
 */

// namespace gutenbergExplore;

if ( ! defined( 'ABSPATH' ) ) {
    die;
}

class gutenbergExplore {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_settings_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'admin_init', [ $this, 'register_options' ] );
        add_action( 'rest_api_init', [ $this, 'register_options' ] );
    }

    /**
     * Register menu page.
     *
     * @return void
     */
    public function register_settings_page() {
        add_menu_page( 'Gutenberg Explore', 'Gutenberg Explore', 'manage_options', 'gutenberg-explore', [ $this, 'settings_page' ], 'dashicons-welcome-learn-more', 10 );
    }


    public function settings_page() {
        require_once __DIR__ . '/settings-page.php';
    }

    /**
     * Enqueue assets.
     *
     * @param [type] $hook
     * @return void
     */
    public function enqueue_assets( $hook ) {

        if ( 'toplevel_page_gutenberg-explore' !== $hook ) {
            return;
        }

        $assets_file_page = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
        if ( file_exists( $assets_file_page ) ) {
            $assets = require $assets_file_page;
            wp_enqueue_script( 'gutenberg-explore', plugin_dir_url( __FILE__ ) . 'build/index.js', $assets['dependencies'], $assets['version'], true );

            foreach ( $assets['dependencies'] as $style ) {
                wp_enqueue_style( $style );
            }
        }
    }

    public function register_options() {
        register_setting(
            'gutenberg-explore',
            'gutenberg-explore-general',
            array(
                'type'              => 'object',
                'default'           => array(
                    'title' => 'Main Title',
                    'desc'  => 'Description.',
                ),
                'show_in_rest'      => array(
                    'schema' => array(
                        'type' => 'object',
                        'properties' => array(
                            'title' => array(
                                'type' => 'string',
                            ),
                            'desc'  => array(
                                'type' => 'string',
                            ),
                        )
                    ),
                )
            )
        );
    }

}

new gutenbergExplore();



 