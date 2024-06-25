import React from 'react';
import { createRoot } from 'react-dom/client';
import {FloatingWhatsApp} from 'react-floating-whatsapp';

const WhatsAppChat = () => {
  return (
    <FloatingWhatsApp
      phoneNumber={whatsappFloatingSettings.phoneNumber}
      accountName={whatsappFloatingSettings.accountName}
      avatar={whatsappFloatingSettings.avatar}
      chatMessage={whatsappFloatingSettings.chatMessage}
      statusMessage={whatsappFloatingSettings.statusMessage}
    />
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('whatsapp-floating-root'));
  root.render(<WhatsAppChat />);
});
