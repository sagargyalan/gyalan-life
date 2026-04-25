import React from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif text-2xl font-bold">सागर<span className="text-primary">.</span></p>
          <p className="text-background/60 text-sm mt-1">Sagar Gyalan Magar</p>
        </div>
        <div className="text-center">
          <p className="text-background/70 text-sm">❤️ {t.footer.made}</p>
          <p className="text-background/40 text-xs mt-1">© {new Date().getFullYear()} · {t.footer.rights}</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="mailto:sagargyalan@gmail.com" className="text-background/60 hover:text-background text-sm transition-colors">✉️ Email</a>
          <span className="text-background/30">·</span>
          <a href="tel:+9779844712486" className="text-background/60 hover:text-background text-sm transition-colors">📞 Call</a>
          <span className="text-background/30">·</span>
          <a href="https://www.facebook.com/share/1GwGwRdQMM/" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors">📘 Facebook</a>
          <span className="text-background/30">·</span>
          <a href="https://x.com/gyalan_sagar" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors">🐦 Twitter</a>
          <span className="text-background/30">·</span>
          <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=il3cunr" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors">📸 Instagram</a>
          <span className="text-background/30">·</span>
          <a href="https://www.tiktok.com/@sagar.gyalan.maga?_r=1&_t=ZS-95ff5H6Wlt7" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors">🎵 TikTok</a>
          <span className="text-background/30">·</span>
          <a href="https://call.whatsapp.com/video/kgTF3bYX9cGBxBOkiIvP6l" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors">💬 WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
