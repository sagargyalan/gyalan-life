import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Play, X } from 'lucide-react';

// Village life videos — YouTube embeds showcasing Nepal/Magar culture
const VIDEOS = [
  {
    id: 'KDpYgkJLT-8',
    titleEn: 'Makwanpur Village Life',
    titleNe: 'मकवानपुरको गाउँ जीवन',
    titleKo: '마크완푸르 마을 생활',
    descEn: 'A glimpse into the daily rhythms and beauty of village life in the hills of Makwanpur.',
    descNe: 'मकवानपुरको पहाडमा गाउँको दैनिक जीवनको एक झलक।',
    descKo: '마크완푸르 언덕의 마을 일상을 엿보다.',
    category: 'village',
    emoji: '🏡',
  },
  {
    id: 'xF5VROlv7eM',
    titleEn: 'Magar Culture & Dance',
    titleNe: 'मगर संस्कृति र नृत्य',
    titleKo: '마가르 문화와 춤',
    descEn: 'Celebrating the rich cultural heritage of the Magar people — traditional dances and festivals.',
    descNe: 'मगर समुदायको समृद्ध सांस्कृतिक सम्पदा — परम्परागत नृत्य र चाडपर्वहरू।',
    descKo: '마가르 민족의 풍부한 문화유산 — 전통 춤과 축제.',
    category: 'culture',
    emoji: '🎭',
  },
  {
    id: 'ZRtdQ81jPUQ',
    titleEn: 'Nepal Festival Season',
    titleNe: 'नेपाल चाडपर्वको मौसम',
    titleKo: '네팔 축제 시즌',
    descEn: 'The colors and joy of Nepal\'s festival season — Dashain, Tihar, and village celebrations.',
    descNe: 'नेपालको चाडपर्वको मौसमका रंग र खुसी — दशैं, तिहार र गाउँका उत्सवहरू।',
    descKo: '네팔 축제 시즌의 색깔과 기쁨 — 다샤인, 티하르, 마을 축제.',
    category: 'festival',
    emoji: '🎉',
  },
  {
    id: 'E7MknL2e1bg',
    titleEn: 'Terraced Fields of Nepal',
    titleNe: 'नेपालका सिँढी खेत',
    titleKo: '네팔의 계단식 논밭',
    descEn: 'The breathtaking terraced landscapes of rural Nepal — where every step tells a story.',
    descNe: 'ग्रामीण नेपालका मनमोहक सिँढी परिदृश्यहरू — जहाँ प्रत्येक पाइलाले एउटा कथा सुनाउँछ।',
    descKo: '네팔 농촌의 숨막히는 계단식 풍경 — 한 걸음 한 걸음이 이야기를 담고 있다.',
    category: 'nature',
    emoji: '🌿',
  },
];

const CAT_COLORS = {
  village: 'bg-green-100 text-green-700',
  culture: 'bg-amber-100 text-amber-700',
  festival: 'bg-red-100 text-red-700',
  nature: 'bg-emerald-100 text-emerald-700',
};

export default function VideoSection() {
  const { lang, fontClass } = useLanguage();
  const [playing, setPlaying] = useState(null);

  const labels = {
    en: { eyebrow: 'Village Life', title: 'Watch & Experience', subtitle: 'Festivals, culture, and the living spirit of Andheri village — through video.' },
    ne: { eyebrow: 'गाउँको जीवन', title: 'हेर्नुहोस् र अनुभव गर्नुहोस्', subtitle: 'चाडपर्व, संस्कृति र अँधेरी गाउँको जीवन्त भावना — भिडियोमा।' },
    ko: { eyebrow: '마을 생활', title: '보고 경험하세요', subtitle: '축제, 문화, 안데리 마을의 살아있는 정신 — 영상으로.' },
  };
  const t = labels[lang] || labels.en;

  const getTitle = (v) => lang === 'ne' ? v.titleNe : lang === 'ko' ? v.titleKo : v.titleEn;
  const getDesc = (v) => lang === 'ne' ? v.descNe : lang === 'ko' ? v.descKo : v.descEn;

  return (
    <section id="videos" className="py-28 bg-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-white ${fontClass}`}>{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
          <p className={`text-white/60 text-lg max-w-xl mx-auto ${fontClass}`}>{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              onClick={() => setPlaying(v.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={getTitle(v)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/90 group-hover:bg-primary rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CAT_COLORS[v.category]}`}>
                    {v.emoji} {v.category}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className={`font-serif text-lg font-bold text-white mb-2 leading-snug ${fontClass}`}>{getTitle(v)}</h3>
                <p className={`text-white/60 text-sm leading-relaxed ${fontClass}`}>{getDesc(v)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {playing && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPlaying(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-2 text-sm"
            >
              <X className="w-5 h-5" /> Close
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
                title="Village Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
