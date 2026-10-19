import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import type { Watch } from '../data/watches';

interface MasonryGridProps {
  watches: Watch[];
  onSelectWatch: (watch: Watch) => void;
}

// Algoritmo de Fisher-Yates para embaralhamento uniforme e rápido
function shuffleWatches(array: Watch[]): Watch[] {
  const items = [...array];

  // Separa os cartões editoriais dos relógios para controle de posicionamento
  const editorialCards = items.filter((w) => w.isEditorialCard);
  const watchCards = items.filter((w) => !w.isEditorialCard);

  // Embaralha apenas os relógios
  for (let i = watchCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [watchCards[i], watchCards[j]] = [watchCards[j], watchCards[i]];
  }

  // Se houver cartão editorial, insere-o estrategicamente entre a 2ª e a 3ª posição
  if (editorialCards.length > 0 && watchCards.length >= 2) {
    const insertIndex = Math.min(2, watchCards.length);
    watchCards.splice(insertIndex, 0, ...editorialCards);
    return watchCards;
  }

  return [...editorialCards, ...watchCards];
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ watches, onSelectWatch }) => {
  // O useMemo garante que só embaralha na carga da página ou se a lista base mudar (filtro de marca)
  const randomizedWatches = useMemo(() => {
    return shuffleWatches(watches);
  }, [watches]);

  const getAspectRatio = (index: number) => {
    const ratios = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]'];
    return ratios[index % ratios.length];
  };

  const renderCard = (watch: Watch, index: number) => {
    // 1. CARTÃO EDITORIAL (COMO TRABALHAMOS / SERVIÇOS)
    if (watch.isEditorialCard) {
      return (
        <div
          key={watch.id || `editorial-${index}`}
          onClick={() => onSelectWatch(watch)}
          className="w-full mb-3 sm:mb-6 cursor-pointer select-none"
        >
          <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center p-5 sm:p-8 relative overflow-hidden group border border-white/10 bg-[#141415] backdrop-blur-md shadow-lg transition-transform duration-500 active:scale-[0.98]">
            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest-2xl uppercase text-accent-gold mb-2 sm:mb-4 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
              {watch.brand || 'EDITORIAL'}
            </span>

            <h2 className="text-base sm:text-2xl font-serif text-text-primary leading-tight relative z-10">
              {watch.editorialTitle || watch.model}
            </h2>

            <div className="w-8 h-[1px] bg-accent-gold/40 mt-4 relative z-10 group-hover:w-16 group-hover:bg-accent-gold transition-all duration-500" />
          </div>
        </div>
      );
    }

    // 2. CARTÃO DE RELÓGIO
    const aspectRatio = getAspectRatio(index);

    return (
      <div
        key={watch.id || `watch-${index}`}
        onClick={() => onSelectWatch(watch)}
        className="w-full mb-3 sm:mb-6 cursor-pointer group relative select-none active:scale-[0.98] transition-transform duration-300"
      >
        <div
          className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#141415] shadow-lg border border-white/5 group-hover:border-white/15 ${aspectRatio}`}
        >
          {watch.coverImage ? (
            <img
              src={watch.coverImage}
              alt={`${watch.brand} ${watch.model}`}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/[0.02] text-[10px] font-mono text-text-muted">
              ACERVO
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-[#0A0A0B]/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

          <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-accent-gold group-hover:border-accent-gold transition-all duration-300 z-20">
            <Plus size={13} className="text-white group-hover:text-museum-dark transition-colors duration-300" strokeWidth={1.5} />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-3 sm:p-5 flex flex-col justify-end z-20">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[8px] sm:text-[9px] font-sans tracking-widest-2xl uppercase text-accent-gold font-medium">
                {watch.brand}
              </span>
              {watch.specs?.year && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-text-primary">
                    {watch.specs.year}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-xs sm:text-base font-serif text-text-primary font-normal leading-tight line-clamp-1">
              {watch.model}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  // Separação em colunas equilibradas
  const colLeft = randomizedWatches.filter((_, idx) => idx % 2 === 0);
  const colRight = randomizedWatches.filter((_, idx) => idx % 2 !== 0);

  const colDesk1 = randomizedWatches.filter((_, idx) => idx % 3 === 0);
  const colDesk2 = randomizedWatches.filter((_, idx) => idx % 3 === 1);
  const colDesk3 = randomizedWatches.filter((_, idx) => idx % 3 === 2);

  return (
    <div className="w-full pb-32">
      {/* Mobile: 2 Colunas */}
      <div className="grid grid-cols-2 gap-3 md:hidden items-start">
        <div className="flex flex-col">
          {colLeft.map((watch, i) => renderCard(watch, i * 2))}
        </div>
        <div className="flex flex-col">
          {colRight.map((watch, i) => renderCard(watch, i * 2 + 1))}
        </div>
      </div>

      {/* Desktop: 3 Colunas */}
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