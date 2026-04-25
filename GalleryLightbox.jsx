import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GalleryLightbox({ photos, initialIndex, onClose, getCaption }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, onClose]);

  const photo = photos[current];

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-white/20 transition-all"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-white/20 transition-all"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-white/20 transition-all"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image */}
      <div className="relative max-w-4xl w-full mx-16" onClick={e => e.stopPropagation()}>
        <img
          key={current}
          src={photo.src}
          alt={getCaption(photo)}
          className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
        />
        <p className="text-white text-center mt-4 text-lg font-medium">{getCaption(photo)}</p>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 text-sm px-4 py-1.5 rounded-full">
        {current + 1} / {photos.length}
      </div>
    </div>
  );
}
