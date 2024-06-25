<?php
/**
 * Plugin Name: SiteBy.fi WhatsApp Floating Plugin
 * Description: A plugin to integrate WhatsApp floating chat using react-floating-whatsapp.
 * Version: 1.0
 * Author: Lennart Takanen
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class WhatsAppFloatingPlugin {
    public function __construct() {
        add_action('admin_menu', array($this, 'create_admin_page'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
        add_action('wp_footer', array($this, 'add_whatsapp_floating_div'));
        add_action('rest_api_init', array($this, 'register_settings_api'));
    }

    public function create_admin_page() {
        add_menu_page(
            'WhatsApp Floating',
            'WhatsApp Floating',
            'manage_options',
            'whatsapp-floating-plugin',
            array($this, 'admin_page_template'),
            'dashicons-format-chat',
            100
        );
    }

    public function admin_page_template() {
        include plugin_dir_path(__FILE__) . 'templates/admin-page.php';
    }

    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'toplevel_page_whatsapp-floating-plugin') {
            return;
        }
        wp_enqueue_style('whatsapp-floating-admin-style', plugin_dir_url(__FILE__) . 'css/admin-style.css');
        wp_enqueue_script('whatsapp-floating-admin-script', plugin_dir_url(__FILE__) . 'js/admin.js', array('wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch'), true);
    }

    public function enqueue_frontend_scripts() {
        wp_enqueue_script('whatsapp-floating', plugin_dir_url(__FILE__) . 'js/frontend.js', array(), '1.0', true);
        $settings = array(
            'phoneNumber' => get_option('whatsapp_floating_phoneNumber', '1234567890'),
            'accountName' => get_option('whatsapp_floating_accountName', 'Account Name'),
            'avatar' => get_option('whatsapp_floating_avatar', ''),
            'chatMessage' => get_option('whatsapp_floating_chatMessage', 'Hi there! How can we help you?'),
            'statusMessage' => get_option('whatsapp_floating_statusMessage', 'Typically replies within 5 minutes'),
        );
        wp_localize_script('whatsapp-floating', 'whatsappFloatingSettings', $settings);
    }

    public function add_whatsapp_floating_div() {
        echo '<div id="whatsapp-floating-root" data-props="' . esc_attr(json_encode(get_option('whatsapp_floating_settings', array()))) . '"></div>';
    }

    public function register_settings_api() {
        register_rest_route('whatsapp-floating-plugin/v1', '/settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_settings'),
        ));

        register_rest_route('whatsapp-floating-plugin/v1', '/settings', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_settings'),
        ));
    }

    public function get_settings() {
        return array(
            'phoneNumber' => get_option('whatsapp_floating_phoneNumber', '1234567890'),
            'accountName' => get_option('whatsapp_floating_accountName', 'Account Name'),
            'avatar' => get_option('whatsapp_floating_avatar', ''),
            'chatMessage' => get_option('whatsapp_floating_chatMessage', 'Hi there! How can we help you?'),
            'statusMessage' => get_option('whatsapp_floating_statusMessage', 'Typically replies within 5 minutes'),
        );
    }

    public function update_settings($request) {
        update_option('whatsapp_floating_phoneNumber', sanitize_text_field($request->get_param('phoneNumber')));
        update_option('whatsapp_floating_accountName', sanitize_text_field($request->get_param('accountName')));
        update_option('whatsapp_floating_avatar', sanitize_text_field($request->get_param('avatar')));
        update_option('whatsapp_floating_chatMessage', sanitize_text_field($request->get_param('chatMessage')));
        update_option('whatsapp_floating_statusMessage', sanitize_text_field($request->get_param('statusMessage')));

        return $this->get_settings();
    }
}

new WhatsAppFloatingPlugin();
?>
