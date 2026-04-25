import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../lib/LanguageContext';

const CAT_COLORS = {
  festival: 'bg-amber-100 text-amber-700 border-amber-200',
  mela: 'bg-green-100 text-green-700 border-green-200',
  meeting: 'bg-blue-100 text-blue-700 border-blue-200',
  cultural: 'bg-purple-100 text-purple-700 border-purple-200',
  other: 'bg-gray-100 text-gray-600 border-gray-200',
};

const CAT_EMOJI = { festival: '🎉', mela: '🎪', meeting: '🤝', cultural: '🏮', other: '📅' };

export default function EventCalendar() {
  const { lang, fontClass } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [updating, setUpdating] = useState({});

  const labels = {
    en: {
      eyebrow: 'Upcoming Events', title: 'Village Calendar',
      subtitle: 'Festivals, fairs, and community gatherings of Andheri village.',
      interested: 'Interested', attending: 'Attending',
      noEvents: 'No upcoming events yet.',
      interested_count: 'interested', attending_count: 'attending',
    },
    ne: {
      eyebrow: 'आगामी कार्यक्रमहरू', title: 'गाउँ क्यालेन्डर',
      subtitle: 'अँधेरी गाउँका चाडपर्व, मेला र सामुदायिक भेलाहरू।',
      interested: 'रुचि छ', attending: 'सहभागी हुन्छु',
      noEvents: 'अहिले कुनै कार्यक्रम छैन।',
      interested_count: 'रुचि', attending_count: 'सहभागी',
    },
    ko: {
      eyebrow: '다가오는 행사', title: '마을 캘린더',
      subtitle: '안데리 마을의 축제, 박람회, 커뮤니티 모임.',
      interested: '관심 있음', attending: '참석 예정',
      noEvents: '예정된 행사가 없습니다.',
      interested_count: '관심', attending_count: '참석',
    },
  };
  const t = labels[lang] || labels.en;

  useEffect(() => {
    base44.auth.me().then(u => setUserEmail(u?.email)).catch(() => {});
    base44.entities.Event.filter({ published: true }, 'date', 20)
      .then(setEvents).finally(() => setLoading(false));
  }, []);

  const toggle = async (event, type) => {
    if (!userEmail) return;
    const field = type === 'interested' ? 'interested_users' : 'attending_users';
    const current = event[field] || [];
    const updated = current.includes(userEmail)
      ? current.filter(e => e !== userEmail)
      : [...current, userEmail];
    setUpdating(u => ({ ...u, [event.id + type]: true }));
    await base44.entities.Event.update(event.id, { [field]: updated });
    setEvents(prev => prev.map(ev => ev.id === event.id ? { ...ev, [field]: updated } : ev));
    setUpdating(u => ({ ...u, [event.id + type]: false }));
  };

  const isMarked = (event, type) => {
    const field = type === 'interested' ? 'interested_users' : 'attending_users';
    return (event[field] || []).includes(userEmail);
  };

  return (
    <section id="events" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto ${fontClass}`}>{t.subtitle}</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="bg-card border border-border rounded-2xl h-48 animate-pulse" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-lg">{t.noEvents}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => {
              const title = (lang === 'ne' && ev.title_ne) ? ev.title_ne : ev.title;
              const desc = (lang === 'ne' && ev.description_ne) ? ev.description_ne : ev.description;
              const intCount = (ev.interested_users || []).length;
              const attCount = (ev.attending_users || []).length;
              const iInt = isMarked(ev, 'interested');
              const iAtt = isMarked(ev, 'attending');
              const evDate = new Date(ev.date);

              return (
                <div key={ev.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {ev.cover_image && (
                    <img src={ev.cover_image} alt={title} className="w-full h-36 object-cover" />
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CAT_COLORS[ev.category] || CAT_COLORS.other}`}>
                        {CAT_EMOJI[ev.category]} {ev.category}
                      </span>
                    </div>
                    <h3 className={`font-serif text-lg font-bold text-foreground mb-1 leading-snug ${fontClass}`}>{title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span>📅 {evDate.toLocaleDateString()}</span>
                      {ev.time && <span>🕐 {ev.time}</span>}
                      {ev.location && <span>📍 {ev.location}</span>}
                    </div>
                    {desc && <p className={`text-sm text-foreground/70 mb-4 line-clamp-2 ${fontClass}`}>{desc}</p>}

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggle(ev, 'interested')}
                        disabled={!userEmail || updating[ev.id + 'interested']}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                          iInt
                            ? 'bg-amber-100 text-amber-700 border-amber-300'
                            : 'bg-secondary text-muted-foreground border-border hover:border-amber-300 hover:text-amber-700'
                        } disabled:opacity-50`}
                      >
                        ⭐ {t.interested} {intCount > 0 && `(${intCount})`}
                      </button>
                      <button
                        onClick={() => toggle(ev, 'attending')}
                        disabled={!userEmail || updating[ev.id + 'attending']}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                          iAtt
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-secondary text-muted-foreground border-border hover:border-green-300 hover:text-green-700'
                        } disabled:opacity-50`}
                      >
                        ✅ {t.attending} {attCount > 0 && `(${attCount})`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
