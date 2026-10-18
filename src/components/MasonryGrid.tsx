import React from 'react';
import { Plus } from 'lucide-react';
import type { Watch } from '../data/watches';

interface MasonryGridProps {
  watches: Watch[];
  onSelectWatch: (watch: Watch) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ watches, onSelectWatch }) => {
  const getAspectRatio = (index: number) => {
    const ratios = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square'];
    return ratios[index % ratios.length];
  };

  const renderCard = (watch: Watch, index: number) => {
    // 1. CARTÃO EDITORIAL (COMO TRABALHAMOS / SERVIÇOS)
    if (watch.isEditorialCard) {
      return (
        <div
          key={watch.id || `editorial-${index}`}
          onClick={() => onSelectWatch(watch)}
          className="w-full mb-3 sm:mb-6 md:mb-8 cursor-pointer select-none"
        >
          <div className="w-full min-h-[190px] aspect-[4/5] sm:aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center p-4 sm:p-8 relative overflow-hidden group border border-white/10 bg-[#141415] backdrop-blur-md shadow-lg">
            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest-2xl uppercase text-accent-gold mb-2 sm:mb-4 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
              {watch.brand || 'CURADORIA'}
            </span>

            <h2 className="text-sm sm:text-2xl font-serif text-text-primary leading-tight relative z-10">
              {watch.editorialTitle || watch.model}
            </h2>

            <div className="w-6 h-[1px] bg-accent-gold/40 mt-3 sm:mt-5 relative z-10" />
          </div>
        </div>
      );
    }

    // 2. CARTÕES DE RELÓGIOS
    const aspectRatio = getAspectRatio(index);

    return (
      <div
        key={watch.id || `watch-${index}`}
        onClick={() => onSelectWatch(watch)}
        className="w-full mb-3 sm:mb-6 md:mb-8 cursor-pointer group relative select-none"
      >
        <div
          className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#141415] shadow-lg border border-white/5 group-hover:border-white/10 ${aspectRatio} min-h-[200px]`}
        >
          {/* Imagem com Fallback Seguro */}
          {watch.coverImage ? (
            <img
              src={watch.coverImage}
              alt={`${watch.brand} ${watch.model}`}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/[0.02] text-[10px] font-mono text-text-muted">
              ARQUIVO
            </div>
          )}

          {/* Vinheta Escura */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent opacity-85 sm:opacity-50 sm:group-hover:opacity-80 transition-opacity duration-500" />

          {/* Botão no canto */}
          <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 z-20">
            <Plus size={13} className="text-white" strokeWidth={1.5} />
          </div>

          {/* Legenda e Dados */}
          <div className="absolute bottom-0 left-0 w-full p-3 sm:p-5 flex flex-col justify-end z-20">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[8px] sm:text-[9px] font-sans tracking-widest-2xl uppercase text-accent-gold font-medium">
                {watch.brand}
              </span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-text-primary">
                {watch.specs?.year || ''}
              </span>
            </div>
            <h3 className="text-xs sm:text-base font-serif text-text-primary font-normal leading-tight line-clamp-1">
              {watch.model}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 items-start">
      {watches.map((watch, index) => renderCard(watch, index))}
    </div>
  );
};