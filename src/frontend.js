import React from 'react';
import { createRoot } from 'react-dom/client';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const App = () => {
    const settings = window.whatsappFloatingSettings;
    return (
        <FloatingWhatsApp
            phoneNumber={settings.phoneNumber}
            accountName={settings.accountName}
            avatar={settings.avatar} // Vaihda tarvittaessa avatar-polku
        />
    );
};

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('whatsapp-floating-root'));
    root.render(<App />);
});
