import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const EVENTS = [
  {
    year: '2050 BS / 1993',
    titleEn: 'Born in Betini, Andheri',
    titleNe: 'बेतिनी, अँधेरीमा जन्म',
    descEn: 'Born on 1st Baisakh 2050 BS (1993 AD) in the beautiful village of Betini, Andheri, Makwanpur, Nepal.',
    descNe: 'वि.सं. २०५० साल बैशाख १ गते नेपालको मकवानपुर, अँधेरीको बेतिनी गाउँमा जन्म।',
    icon: '🌱',
    category: 'life',
  },
  {
    year: '2068 BS / 2011',
    titleEn: 'Completed SLC Exam',
    titleNe: 'एसएलसी परीक्षा उत्तीर्ण',
    descEn: 'Successfully completed the School Leaving Certificate examination.',
    descNe: 'विद्यालय छोड्ने प्रमाणपत्र परीक्षा सफलतापूर्वक उत्तीर्ण गरियो।',
    icon: '🎓',
    category: 'education',
  },
  {
    year: '2073 BS / 2016',
    titleEn: 'Started Working Abroad',
    titleNe: 'विदेशमा काम सुरु',
    descEn: 'Began working abroad to support the family and explore new horizons.',
    descNe: 'परिवारको सहयोगका लागि विदेशमा काम सुरु गरियो।',
    icon: '✈️',
    category: 'work',
  },
  {
    year: '2075 BS / 2018',
    titleEn: 'Village Road Construction',
    titleNe: 'गाउँमा सडक निर्माण',
    descEn: 'Witnessed the historic construction of the road connecting Andheri village.',
    descNe: 'अँधेरी गाउँलाई जोड्ने ऐतिहासिक सडक निर्माण भएको साक्षी।',
    icon: '🏗️',
    category: 'village',
  },
  {
    year: '2077 BS / 2020',
    titleEn: 'COVID Pandemic — Return Home',
    titleNe: 'कोभिड महामारी — घर फर्किनु',
    descEn: 'Returned home during the COVID-19 pandemic, reconnecting with family and roots.',
    descNe: 'कोभिड-१९ महामारीका क्रममा घर फर्किइयो, परिवार र जरासँग पुनर्मिलन।',
    icon: '🏠',
    category: 'life',
  },
  {
    year: '2079 BS / 2022',
    titleEn: 'Dashain Celebration with Family',
    titleNe: 'परिवारसँग दशैं मनाइयो',
    descEn: 'Celebrated a memorable Dashain festival with the entire family in the village.',
    descNe: 'गाउँमा सम्पूर्ण परिवारसँग यादगार दशैं पर्व मनाइयो।',
    icon: '🎉',
    category: 'culture',
  },
  {
    year: '2081 BS / 2024',
    titleEn: 'Personal Website Launched',
    titleNe: 'व्यक्तिगत वेबसाइट सुरु',
    descEn: 'Launched this personal website to share stories, memories and culture with the world.',
    descNe: 'संसारसँग कथाहरू, सम्झनाहरू र संस्कृति साझा गर्न यो व्यक्तिगत वेबसाइट सुरु गरियो।',
    icon: '🌐',
    category: 'life',
  },
];

const CAT_COLORS = {
  life: 'bg-blue-100 text-blue-700 border-blue-200',
  education: 'bg-green-100 text-green-700 border-green-200',
  work: 'bg-purple-100 text-purple-700 border-purple-200',
  village: 'bg-amber-100 text-amber-700 border-amber-200',
  culture: 'bg-red-100 text-red-700 border-red-200',
};

export default function Timeline() {
  const { lang, fontClass } = useLanguage();
  const [expanded, setExpanded] = useState(null);

  const labels = {
    en: { eyebrow: 'My Journey', title: 'Life Timeline', subtitle: 'Key moments and milestones from my life story.' },
    ne: { eyebrow: 'मेरो यात्रा', title: 'जीवन टाइमलाइन', subtitle: 'मेरो जीवन कथाका प्रमुख क्षणहरू र मील ढुङ्गाहरू।' },
    ko: { eyebrow: '나의 여정', title: '인생 타임라인', subtitle: '내 인생 이야기의 주요 순간들.' },
  };
  const t = labels[lang] || labels.en;

  return (
    <section id="timeline" className="py-28 bg-secondary/20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
          <p className={`text-muted-foreground text-lg ${fontClass}`}>{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {EVENTS.map((ev, i) => {
              const title = lang === 'ne' ? ev.titleNe : ev.titleEn;
              const desc = lang === 'ne' ? ev.descNe : ev.descEn;
              const isOpen = expanded === i;

              return (
                <div key={i} className="relative flex gap-6 items-start">
                  {/* Icon circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                    {ev.icon}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                            {ev.year}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CAT_COLORS[ev.category]}`}>
                            {ev.category}
                          </span>
                        </div>
                        <h3 className={`font-serif text-lg font-bold text-foreground leading-snug ${fontClass}`}>{title}</h3>
                      </div>
                      <span className="text-muted-foreground text-lg flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {isOpen && (
                      <p className={`text-sm text-foreground/70 mt-3 leading-relaxed border-t border-border pt-3 ${fontClass}`}>
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
