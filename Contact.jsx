import React from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function Contact() {
  const { t, fontClass } = useLanguage();

  const cards = [
    {
      icon: '📍',
      label: t.contact.permanent,
      value: t.contact.permanentAddr,
      href: null,
    },
    {
      icon: '🏠',
      label: t.contact.current,
      value: t.contact.currentAddr,
      href: null,
    },
    {
      icon: '📞',
      label: t.contact.phone,
      value: '९८४४७१२४८६ / 9844712486',
      href: 'tel:+9779844712486',
    },
    {
      icon: '✉️',
      label: t.contact.email,
      value: 'sagargyalan@gmail.com',
      href: 'mailto:sagargyalan@gmail.com',
    },
  ];

  return (
    <section id="contact" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.contact.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t.contact.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${fontClass}`}>
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="text-4xl mb-4">{c.icon}</div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">{c.label}</p>
              {c.href ? (
                <a
                  href={c.href}
                  className="text-primary font-semibold text-sm hover:underline break-all"
                >
                  {c.value}
                </a>
              ) : (
                <p className="text-foreground font-semibold text-sm leading-relaxed">{c.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Social / extra */}
        <div className="mt-12 text-center">
          <a
            href="mailto:sagargyalan@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            ✉️ sagargyalan@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
