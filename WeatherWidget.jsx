import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../lib/LanguageContext';

const WEATHER_ICONS = {
  Clear: '☀️', Sunny: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️',
  Fog: '🌫️', Haze: '🌫️',
};

export default function WeatherWidget() {
  const { lang, fontClass } = useLanguage();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const labels = {
    en: { eyebrow: 'Live Weather', title: 'Andheri, Makwanpur', subtitle: 'Current weather conditions in my village', humidity: 'Humidity', wind: 'Wind', feels: 'Feels like', updated: 'Live data' },
    ne: { eyebrow: 'लाइभ मौसम', title: 'अँधेरी, मकवानपुर', subtitle: 'मेरो गाउँको हालको मौसम अवस्था', humidity: 'आर्द्रता', wind: 'हावा', feels: 'महसुस', updated: 'लाइभ डेटा' },
    ko: { eyebrow: '실시간 날씨', title: '안데리, 마크완푸르', subtitle: '내 마을의 현재 날씨', humidity: '습도', wind: '바람', feels: '체감온도', updated: '실시간 데이터' },
  };
  const t = labels[lang] || labels.en;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Get current weather for Andheri, Makwanpur, Nepal (coordinates approximately 27.41°N, 85.06°E). Return current temperature in Celsius, weather condition (one word like Clear/Clouds/Rain/Drizzle/Thunderstorm/Mist/Fog), humidity percentage, wind speed in km/h, and feels-like temperature.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            temp: { type: 'number' },
            feels_like: { type: 'number' },
            condition: { type: 'string' },
            description: { type: 'string' },
            humidity: { type: 'number' },
            wind_speed: { type: 'number' },
          },
        },
      });
      setWeather(result);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  const icon = weather ? (WEATHER_ICONS[weather.condition] || '🌤️') : '🌤️';

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-sky-400/10 border border-blue-200/50 dark:border-blue-800/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-0.5">{t.eyebrow}</p>
          <h3 className={`font-serif text-lg font-bold text-foreground ${fontClass}`}>📍 {t.title}</h3>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-4">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading weather...</span>
        </div>
      ) : weather ? (
        <>
          <div className="flex items-end gap-3 mb-4">
            <span className="font-serif text-5xl font-bold text-foreground">{Math.round(weather.temp)}°</span>
            <span className="text-muted-foreground text-sm mb-2">C</span>
            <span className={`text-foreground/70 text-sm mb-2 capitalize ${fontClass}`}>{weather.description || weather.condition}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/40 dark:bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">💧 {t.humidity}</p>
              <p className="font-semibold text-foreground text-sm">{weather.humidity}%</p>
            </div>
            <div className="bg-white/40 dark:bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">💨 {t.wind}</p>
              <p className="font-semibold text-foreground text-sm">{weather.wind_speed} km/h</p>
            </div>
            <div className="bg-white/40 dark:bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">🌡️ {t.feels}</p>
              <p className="font-semibold text-foreground text-sm">{Math.round(weather.feels_like)}°C</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-right">🔄 {t.updated}</p>
        </>
      ) : null}
    </div>
  );
}
