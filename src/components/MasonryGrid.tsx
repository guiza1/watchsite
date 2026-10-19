import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Watch } from '../data/watches';

interface MasonryGridProps {
  watches: Watch[];
  onSelectWatch: (watch: Watch) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ watches, onSelectWatch }) => {
  // Embaralhamento seguro mantendo o cartão editorial nas primeiras posições
  const displayWatches = useMemo(() => {
    const editorials = watches.filter((w) => w.isEditorialCard);
    const regular = watches.filter((w) => !w.isEditorialCard);
    
    const shuffled = [...regular].sort(() => Math.random() - 0.5);

    if (editorials.length > 0 && shuffled.length >= 2) {
      shuffled.splice(2, 0, ...editorials);
      return shuffled;
    }
    return [...editorials, ...shuffled];
  }, [watches]);

  const getAspectRatio = (index: number) => {
    return index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]';
  };

  const renderCard = (watch: Watch, index: number) => {
    // ==========================================
    // 1. CARTÃO EDITORIAL (Vidro Espelhado / Glassmorphism de Luxo)
    // ==========================================
    if (watch.isEditorialCard) {
      return (
        <motion.div
          key={watch.id || `editorial-${index}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectWatch(watch)}
          className="w-full mb-3 sm:mb-6 cursor-pointer select-none transform-gpu"
        >
          <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center p-5 sm:p-8 relative overflow-hidden group border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-white/20 active:scale-[0.98]">
            {/* Brilho de aura dourada que acende no fundo */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_#C5A880_0%,_transparent_70%)] blur-2xl scale-50 group-hover:scale-150 pointer-events-none" />

            {/* Linhas de bisel/reflexo de vidro */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest-2xl uppercase text-[#C5A880] mb-2 sm:mb-4 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
              {watch.brand || 'EDITORIAL'}
            </span>

            <h2 className="text-base sm:text-2xl font-serif text-[#F4F2EC] leading-tight relative z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-out">
              {watch.editorialTitle || watch.model}
            </h2>

            {/* Traço dourado elegante */}
            <div className="w-8 h-[1px] bg-[#C5A880]/50 mt-4 relative z-10 group-hover:w-16 group-hover:bg-[#C5A880] transition-all duration-700 ease-out" />
          </div>
        </motion.div>
      );
    }

    // ==========================================
    // 2. CARTÕES DE RELÓGIO (Com Animação Suave dos Textos no Scroll)
    // ==========================================
    const aspectRatio = getAspectRatio(index);

    return (
      <div
        key={watch.id || `watch-${index}`}
        onClick={() => onSelectWatch(watch)}
        className="w-full mb-3 sm:mb-6 cursor-pointer group relative select-none transform-gpu active:scale-[0.98] transition-transform duration-300"
      >
        <div className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#141415] shadow-lg border border-white/5 group-hover:border-white/15 transition-all duration-700 ${aspectRatio}`}>
          {/* Fotografia com Zoom Gradual */}
          <img
            src={watch.coverImage}
            alt={`${watch.brand} ${watch.model}`}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-110 brightness-90 group-hover:brightness-100"
          />

          {/* Gradiente de Vinheta */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/95 via-[#0A0A0B]/35 to-transparent opacity-85 sm:opacity-50 sm:group-hover:opacity-85 transition-opacity duration-700" />

          {/* Marca Tipográfica Gigante em Segundo Plano (Desktop) */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[6rem] lg:text-[8rem] font-serif uppercase leading-none text-white/5 mix-blend-plus-lighter whitespace-nowrap scale-125 group-hover:scale-100 transition-transform duration-1000 ease-[0.19,1,0.22,1]">
              {watch.brand}
            </span>
          </div>

          {/* Botão Ícone no Canto */}
          <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#C5A880] group-hover:border-[#C5A880] transition-all duration-500 z-20">
            <Plus size={13} className="text-white group-hover:text-[#0A0A0B] group-hover:rotate-90 transition-all duration-500" strokeWidth={1.5} />
          </div>

          {/* REVELAÇÃO SUAVE DOS TEXTOS DURANTE O SCROLL */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-0 left-0 w-full p-3.5 sm:p-6 flex flex-col justify-end z-20 sm:opacity-0 sm:translate-y-3 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:transition-all sm:duration-500"
          >
            <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
              <span className="text-[8px] sm:text-[9px] font-sans tracking-widest-2xl uppercase text-[#C5A880] font-medium">
                {watch.brand}
              </span>
              {watch.specs?.year && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#F4F2EC]">
                    {watch.specs.year}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-xs sm:text-lg font-serif text-[#F4F2EC] font-normal leading-snug line-clamp-1">
              {watch.model}
            </h3>
          </motion.div>
        </div>
      </div>
    );
  };

  const colLeft = displayWatches.filter((_, idx) => idx % 2 === 0);
  const colRight = displayWatches.filter((_, idx) => idx % 2 !== 0);

  const colDesk1 = displayWatches.filter((_, idx) => idx % 3 === 0);
  const colDesk2 = displayWatches.filter((_, idx) => idx % 3 === 1);
  const colDesk3 = displayWatches.filter((_, idx) => idx % 3 === 2);

  return (
    <div className="w-full pb-32">
      {/* Mobile: 2 colunas naturais e fluídas */}
      <div className="grid grid-cols-2 gap-3 md:hidden items-start">
        <div className="flex flex-col">
          {colLeft.map((watch, i) => renderCard(watch, i * 2))}
        </div>
        <div className="flex flex-col">
          {colRight.map((watch, i) => renderCard(watch, i * 2 + 1))}
        </div>
      </div>

      {/* Desktop: 3 colunas com alinhamento perfeito */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-start">
        <div className="flex flex-col">
          {colDesk1.map((watch, i) => renderCard(watch, i * 3))}
        </div>
        <div className="flex flex-col">
          {colDesk2.map((watch, i) => renderCard(watch, i * 3 + 1))}
        </div>
        <div className="flex flex-col">
          {colDesk3.map((watch, i) => renderCard(watch, i * 3 + 2))}
        </div>
      </div>
    </div>
  );
};