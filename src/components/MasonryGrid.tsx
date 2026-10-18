import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Watch } from '../data/watches';

interface MasonryGridProps {
  watches: Watch[];
  onSelectWatch: (watch: Watch) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ watches, onSelectWatch }) => {
  const getAspectRatio = (index: number) => {
    const ratios = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/5]', 'aspect-square'];
    return ratios[index % ratios.length];
  };

  const renderCard = (watch: Watch, index: number) => {
    // ==========================================
    // 1. CARTÃO EDITORIAL
    // ==========================================
    if (watch.isEditorialCard) {
      return (
        <div
          key={watch.id}
          onClick={() => onSelectWatch(watch)}
          className="mb-3 sm:mb-6 md:mb-8 cursor-pointer transform-gpu"
        >
          <div className="w-full aspect-[4/5] sm:aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center p-4 sm:p-8 relative overflow-hidden group border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--color-accent-gold)_0%,_transparent_70%)] blur-2xl scale-50 group-hover:scale-150" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest-2xl uppercase text-accent-gold mb-2 sm:mb-4 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {watch.brand}
            </span>

            <h2 className="text-lg sm:text-2xl md:text-3xl font-serif text-text-primary leading-tight relative z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-out">
              {watch.editorialTitle}
            </h2>

            <div className="w-6 h-[1px] bg-accent-gold/40 mt-4 sm:mt-6 group-hover:w-16 group-hover:bg-accent-gold transition-all duration-700 ease-out relative z-10" />
          </div>
        </div>
      );
    }

    // ==========================================
    // 2. CARTÃO DE RELÓGIO
    // ==========================================
    const aspectRatio = getAspectRatio(index);

    return (
      <div
        key={watch.id}
        onClick={() => onSelectWatch(watch)}
        className="mb-3 sm:mb-6 md:mb-8 cursor-pointer group relative transform-gpu"
      >
        <div
          className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-museum-card shadow-lg transition-all duration-700 ${aspectRatio} group-hover:shadow-[0_0_40px_-10px_rgba(197,168,128,0.15)] border border-white/5 group-hover:border-white/10`}
        >
          {/* Fotografia */}
          <img
            src={watch.coverImage}
            alt={`${watch.brand} ${watch.model}`}
            decoding="async"
            className="w-full h-full object-cover transition-all duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-110 brightness-90 group-hover:brightness-100"
          />

          {/* Vinheta Escura */}
          <div className="absolute inset-0 bg-gradient-to-t from-museum-dark via-museum-dark/30 to-transparent opacity-80 sm:opacity-50 sm:group-hover:opacity-85 transition-opacity duration-700" />

          {/* Marca no fundo (Desktop) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700">
            <span className="text-[3.5rem] sm:text-[7rem] lg:text-[9rem] font-serif uppercase leading-none text-white/5 mix-blend-plus-lighter whitespace-nowrap scale-150 group-hover:scale-100 transition-transform duration-1000 ease-[0.19,1,0.22,1]">
              {watch.brand}
            </span>
          </div>

          {/* Botão Ícone */}
          <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-accent-gold group-hover:border-accent-gold transition-all duration-500 z-20">
            <Plus
              size={14}
              className="text-text-primary group-hover:text-museum-dark transition-all duration-500 group-hover:rotate-90"
              strokeWidth={1.5}
            />
          </div>

          {/* Dados do Relógio */}
          <div className="absolute bottom-0 left-0 w-full p-3.5 sm:p-6 lg:p-8 flex flex-col justify-end z-20 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:transition-all sm:duration-700">
            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
              <span className="text-[8px] sm:text-[9px] font-sans tracking-widest-2xl uppercase text-accent-gold">
                {watch.brand}
              </span>
              <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/30" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-text-primary">
                {watch.specs.year}
              </span>
            </div>
            <h3 className="text-xs sm:text-xl font-serif text-text-primary font-medium tracking-tight leading-snug line-clamp-1">
              {watch.model}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  // Separação em duas colunas fixas para Mobile (evita o bug de quebra do Safari/Chrome iOS)
  const colLeft = watches.filter((_, idx) => idx % 2 === 0);
  const colRight = watches.filter((_, idx) => idx % 2 !== 0);

  return (
    <div>
      {/* 1. VISÃO MOBILE (< 768px): Duas colunas físicas perfeitas sem risco de colapso */}
      <div className="grid grid-cols-2 gap-3 md:hidden items-start">
        <div className="flex flex-col">
          {colLeft.map((watch, i) => renderCard(watch, i * 2))}
        </div>
        <div className="flex flex-col">
          {colRight.map((watch, i) => renderCard(watch, i * 2 + 1))}
        </div>
      </div>

      {/* 2. VISÃO DESKTOP / TABLET (>= 768px): Columns nativo fluido */}
      <div className="hidden md:block md:columns-3 lg:columns-4 gap-6 md:gap-8 [column-fill:_balance]">
        {watches.map((watch, index) => renderCard(watch, index))}
      </div>
    </div>
  );
};