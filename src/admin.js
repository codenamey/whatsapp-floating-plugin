import React from 'react';
import { render } from 'react-dom';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, PanelBody, PanelRow } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const App = () => {
    const [settings, setSettings] = React.useState({
        phoneNumber: '',
        accountName: ''
    });

    React.useEffect(() => {
        apiFetch({ path: '/wp-json/whatsapp-floating-plugin/v1/settings' }).then((data) => {
            setSettings(data);
        });
    }, []);

    const updateSetting = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    const saveSettings = () => {
        apiFetch({
            path: '/wp-json/whatsapp-floating-plugin/v1/settings',
            method: 'POST',
            data: settings,
        }).then(() => {
            alert(__('Settings saved!', 'whatsapp-floating-plugin'));
        });
    };

    return (
        <div className="whatsapp-floating-admin">
            <PanelBody title={__('WhatsApp Floating Settings', 'whatsapp-floating-plugin')}>
                <PanelRow>
                    <TextControl
                        label={__('Phone Number', 'whatsapp-floating-plugin')}
                        value={settings.phoneNumber}
                        onChange={(value) => updateSetting('phoneNumber', value)}
                    />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        label={__('Account Name', 'whatsapp-floating-plugin')}
                        value={settings.accountName}
                        onChange={(value) => updateSetting('accountName', value)}
                    />
                </PanelRow>
                {/* Lisää muut asetukset tähän */}
            </PanelBody>
            <Button isPrimary onClick={saveSettings}>
                {__('Save Settings', 'whatsapp-floating-plugin')}
            </Button>
        </div>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.getElementById('whatsapp-floating-admin-root'));
});
