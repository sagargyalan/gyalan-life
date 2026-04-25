import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../lib/LanguageContext';

export default function ContactForm() {
  const { lang, fontClass } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    en: {
      eyebrow: 'Contact', title: 'Get in Touch',
      permanent: 'Permanent Address', current: 'Current Address',
      permanentAddr: 'Betini 6, Andheri, Makwanpur',
      currentAddr: 'Bagmati 9, Andheri, Makwanpur, Nepal',
      phone: 'Phone', email: 'Email',
      name: 'Your Name', emailField: 'Your Email', subject: 'Subject', message: 'Message',
      send: 'Send Message', sending: 'Sending…',
      successTitle: 'Message Sent!',
      successMsg: 'Thank you for reaching out. I\'ll get back to you soon.',
      sendAnother: 'Send another message',
      errorMsg: 'Failed to send. Please try again or email directly.',
      placeholderSubject: 'Hello from a friend...',
      placeholderMessage: 'Write your message here...',
    },
    ne: {
      eyebrow: 'सम्पर्क', title: 'सम्पर्क गर्नुहोस्',
      permanent: 'स्थायी ठेगाना', current: 'हालको ठेगाना',
      permanentAddr: 'बेतिनी ६, अँधेरी, मकवानपुर',
      currentAddr: 'बागमति ९, अँधेरी, मकवानपुर, नेपाल',
      phone: 'फोन', email: 'इमेल',
      name: 'तपाईंको नाम', emailField: 'तपाईंको इमेल', subject: 'विषय', message: 'सन्देश',
      send: 'सन्देश पठाउनुहोस्', sending: 'पठाउँदै…',
      successTitle: 'सन्देश पठाइयो!',
      successMsg: 'सम्पर्क गर्नुभएकोमा धन्यवाद। म चाँडै जवाफ दिनेछु।',
      sendAnother: 'अर्को सन्देश पठाउनुहोस्',
      errorMsg: 'पठाउन सकिएन। कृपया पुनः प्रयास गर्नुहोस्।',
      placeholderSubject: 'एक साथीबाट नमस्कार...',
      placeholderMessage: 'यहाँ आफ्नो सन्देश लेख्नुहोस्...',
    },
    ko: {
      eyebrow: '연락', title: '연락하기',
      permanent: '본적 주소', current: '현재 주소',
      permanentAddr: '베티니 6, 안데리, 마크완푸르',
      currentAddr: '바그마티 9, 안데리, 마크완푸르, 네팔',
      phone: '전화', email: '이메일',
      name: '이름', emailField: '이메일', subject: '제목', message: '메시지',
      send: '메시지 보내기', sending: '전송 중…',
      successTitle: '전송 완료!',
      successMsg: '연락해 주셔서 감사합니다. 곧 답장 드리겠습니다.',
      sendAnother: '다른 메시지 보내기',
      errorMsg: '전송 실패. 다시 시도하거나 직접 이메일을 보내세요.',
      placeholderSubject: '친구로부터 안녕하세요...',
      placeholderMessage: '메시지를 여기에 작성하세요...',
    },
  };
  const t = labels[lang] || labels.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const body = `
New message from your personal website:

Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}

---
Sent from sagargyalan.com personal website
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: 'sagargyalan@gmail.com',
      subject: `[Website] ${form.subject} — from ${form.name}`,
      body,
    });

    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const infoCards = [
    { icon: '📍', label: t.permanent, value: t.permanentAddr },
    { icon: '🏠', label: t.current, value: t.currentAddr },
    { icon: '📞', label: t.phone, value: '9844712486', href: 'tel:+9779844712486' },
    { icon: '✉️', label: t.email, value: 'sagargyalan@gmail.com', href: 'mailto:sagargyalan@gmail.com' },
    { icon: '📘', label: 'Facebook', value: 'Facebook Profile', href: 'https://www.facebook.com/share/1GwGwRdQMM/' },
    { icon: '🐦', label: 'Twitter / X', value: '@gyalan_sagar', href: 'https://x.com/gyalan_sagar' },
    { icon: '📸', label: 'Instagram', value: '@sagarmagar.sagarmagar.5', href: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=il3cunr' },
    { icon: '🎵', label: 'TikTok', value: '@sagar.gyalan.maga', href: 'https://www.tiktok.com/@sagar.gyalan.maga?_r=1&_t=ZS-95ff5H6Wlt7' },
    { icon: '💬', label: 'WhatsApp', value: 'Video Call', href: 'https://call.whatsapp.com/video/kgTF3bYX9cGBxBOkiIvP6l' },
  ];

  return (
    <section id="contact" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
        </div>

        <div className={`grid lg:grid-cols-2 gap-10 ${fontClass}`}>
          {/* Left: Info + map */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {infoCards.map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 shadow-sm text-center">
                  <div className="text-3xl mb-2">{c.icon}</div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-primary font-semibold text-sm hover:underline break-all">{c.value}</a>
                  ) : (
                    <p className="text-foreground font-semibold text-sm leading-snug">{c.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Nepal flag + tagline */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-5 text-center">
              <p className="text-4xl mb-2">🇳🇵</p>
              <p className="font-serif text-lg font-semibold text-foreground">Makwanpur, Nepal</p>
              <p className="text-sm text-muted-foreground mt-1">Always happy to connect with friends near and far.</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <div className="text-5xl">✅</div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{t.successTitle}</h3>
                <p className="text-muted-foreground">{t.successMsg}</p>
                <button onClick={() => setSent(false)} className="mt-4 text-primary text-sm hover:underline">{t.sendAnother}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">{t.name} *</label>
                    <input
                      required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">{t.emailField} *</label>
                    <input
                      required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t.subject} *</label>
                  <input
                    required value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder={t.placeholderSubject}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t.message} *</label>
                  <textarea
                    required rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder={t.placeholderMessage}
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {sending ? t.sending : `✉️ ${t.send}`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
