import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../lib/LanguageContext';

const EMOJIS = ['🙏', '❤️', '🌸', '😊', '🏔️', '🇳🇵', '✨', '🌿', '🎉', '💙'];

export default function Guestbook() {
  const { lang, fontClass } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '', from_location: '', emoji: '🙏' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Guestbook', eyebrow: 'Leave a Message',
      subtitle: 'Friends and family — drop a note, share a memory, or just say hello.',
      name: 'Your Name', message: 'Your Message', location: 'Where are you from? (optional)',
      submit: 'Sign Guestbook', submitting: 'Sending…',
      successMsg: 'Thank you! Your message will appear after approval.',
      placeholderMsg: 'Share a thought, a memory, or just say hello...',
      noEntries: 'Be the first to sign the guestbook!',
    },
    ne: {
      title: 'अतिथि पुस्तिका', eyebrow: 'सन्देश छाड्नुहोस्',
      subtitle: 'साथीहरू र परिवार — एउटा नोट छाड्नुहोस्, सम्झना साझा गर्नुहोस्।',
      name: 'तपाईंको नाम', message: 'तपाईंको सन्देश', location: 'तपाईं कहाँबाट हुनुहुन्छ? (वैकल्पिक)',
      submit: 'दस्तखत गर्नुहोस्', submitting: 'पठाउँदै…',
      successMsg: 'धन्यवाद! स्वीकृति पछि तपाईंको सन्देश देखिनेछ।',
      placeholderMsg: 'एउटा विचार, सम्झना वा नमस्कार साझा गर्नुहोस्...',
      noEntries: 'अतिथि पुस्तिकामा पहिलो हुनुहोस्!',
    },
    ko: {
      title: '방명록', eyebrow: '메시지 남기기',
      subtitle: '친구와 가족 여러분 — 메모를 남기거나 추억을 공유하거나 인사를 건네세요.',
      name: '이름', message: '메시지', location: '어디서 오셨나요? (선택)',
      submit: '방명록 서명', submitting: '전송 중…',
      successMsg: '감사합니다! 승인 후 메시지가 표시됩니다.',
      placeholderMsg: '생각, 추억 또는 인사를 공유하세요...',
      noEntries: '방명록에 첫 번째로 서명하세요!',
    },
  };
  const t = labels[lang] || labels.en;

  const load = () => {
    base44.entities.GuestbookEntry.filter({ approved: true }, '-created_date', 30).then(setEntries);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);
    setError('');
    await base44.entities.GuestbookEntry.create({ ...form, approved: false });
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', message: '', from_location: '', emoji: '🙏' });
  };

  return (
    <section id="guestbook" className="py-28 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto ${fontClass}`}>{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="text-5xl">🙏</div>
                <p className={`text-foreground font-semibold text-lg ${fontClass}`}>{t.successMsg}</p>
                <button onClick={() => setSubmitted(false)} className="text-primary text-sm hover:underline mt-2">
                  {lang === 'ne' ? 'अर्को सन्देश पठाउनुहोस्' : lang === 'ko' ? '다른 메시지 보내기' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className={`space-y-4 ${fontClass}`}>
                {/* Emoji picker */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Pick an emoji</p>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map(e => (
                      <button
                        type="button" key={e}
                        onClick={() => setForm(f => ({...f, emoji: e}))}
                        className={`text-xl p-1.5 rounded-lg transition-all ${form.emoji === e ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-secondary'}`}
                      >{e}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t.name} *</label>
                  <input
                    required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="Sita Magar..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t.location}</label>
                  <input
                    value={form.from_location} onChange={e => setForm(f => ({...f, from_location: e.target.value}))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="Kathmandu, Seoul, Tokyo..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t.message} *</label>
                  <textarea
                    required rows={4} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground resize-none"
                    placeholder={t.placeholderMsg}
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button
                  type="submit" disabled={submitting || !form.name.trim() || !form.message.trim()}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? t.submitting : t.submit}
                </button>
              </form>
            )}
          </div>

          {/* Entries */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <p className="text-4xl mb-3">📖</p>
                <p className={fontClass}>{t.noEntries}</p>
              </div>
            ) : (
              entries.map(entry => (
                <div key={entry.id} className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                      {entry.emoji || '🙏'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground">{entry.name}</p>
                        {entry.from_location && (
                          <span className="text-xs text-muted-foreground">📍 {entry.from_location}</span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(entry.created_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm text-foreground/80 mt-1 italic leading-relaxed ${fontClass}`}>"{entry.message}"</p>
                      {/* Family reply */}
                      {entry.reply && (
                        <div className="mt-3 pl-3 border-l-2 border-primary/40 bg-primary/5 rounded-r-lg py-2 pr-2">
                          <p className="text-xs font-semibold text-primary mb-0.5">💬 Sagar replied:</p>
                          <p className={`text-xs text-foreground/70 leading-relaxed ${fontClass}`}>{entry.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
