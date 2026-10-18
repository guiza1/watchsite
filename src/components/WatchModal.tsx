import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, BookOpen, ShieldCheck } from 'lucide-react';
import type { Watch } from '../data/watches';

interface WatchModalProps {
  watch: Watch | null;
  onClose: () => void;
}

export const WatchModal: React.FC<WatchModalProps> = ({ watch, onClose }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'specs'>('history');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (watch) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [watch, onClose]);

  if (!watch) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#0A0A0B] overflow-y-auto overscroll-contain text-text-primary selection:bg-text-primary selection:text-museum-dark"
      >
        {/* Barra Superior Fixa Minimalista */}
        <header className="sticky top-0 z-30 w-full bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-5 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-widest-xl uppercase text-text-muted hover:text-text-primary transition-colors py-2"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 duration-300" />
            <span>Voltar ao Acervo</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-accent-gold uppercase">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Dossiê de Procedência</span>
            <span className="sm:hidden">Dossiê</span>
          </div>
        </header>

        {/* Conteúdo Principal com Formatação de Revista de Arte */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 py-8 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Coluna Visual (Fotografia da Peça) */}
            <div className="lg:col-span-6 w-full flex flex-col items-center">
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-2xl relative flex items-center justify-center p-6 sm:p-12 overflow-hidden shadow-2xl">
                {/* Iluminação de Estúdio Suave */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,transparent_70%)] pointer-events-none" />
                
                <img
                  src={watch.coverImage}
                  alt={`${watch.brand} ${watch.model}`}
                  className="w-full h-full object-contain filter contrast-[1.04] drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] relative z-10"
                />

                <span className="absolute bottom-4 left-5 text-[9px] font-mono tracking-widest uppercase text-white/30">
                  {watch.specs.reference}
                </span>
              </div>
            </div>

            {/* Coluna Editorial & Ficha Técnica */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              
              {/* Metadados Superiores */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] sm:text-xs font-sans tracking-widest-2xl uppercase text-accent-gold font-semibold">
                  {watch.brand}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-text-muted">
                  {watch.specs.year}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-primary leading-tight font-normal mb-2">
                {watch.model}
              </h1>

              {watch.nickname && (
                <p className="text-sm sm:text-base font-serif italic text-accent-gold/80 mb-6">
                  "{watch.nickname}"
                </p>
              )}

              {/* Seletor de Abas Minimalista */}
              <div className="flex items-center gap-8 border-b border-white/10 mt-2 mb-8">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`pb-3 text-xs uppercase tracking-widest-xl font-sans transition-all relative ${
                    activeTab === 'history'
                      ? 'text-white font-medium'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen size={14} strokeWidth={1.5} />
                    História & Legado
                  </span>
                  {activeTab === 'history' && (
                    <motion.div
                      layoutId="tab-underline-editorial"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold"
                    />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-xs uppercase tracking-widest-xl font-sans transition-all relative ${
                    activeTab === 'specs'
                      ? 'text-white font-medium'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Compass size={14} strokeWidth={1.5} />
                    Ficha Técnica
                  </span>
                  {activeTab === 'specs' && (
                    <motion.div
                      layoutId="tab-underline-editorial"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold"
                    />
                  )}
                </button>
              </div>

              {/* Aba: Narrativa Histórica */}
              {activeTab === 'history' ? (
                <div className="space-y-5 text-sm sm:text-base font-serif leading-relaxed text-text-primary/85">
                  {watch.history.map((paragraph, idx) => (
                    <p key={idx} className="first-letter:text-2xl first-letter:font-sans first-letter:text-accent-gold">
                      {paragraph}
                    </p>
                  ))}
                  
                  {watch.summary && (
                    <div className="pt-6 border-t border-white/5 text-xs font-mono text-text-muted leading-normal">
                      <span className="text-accent-gold uppercase tracking-widest text-[10px] block mb-1">
                        Resumo Curatorial:
                      </span>
                      {watch.summary}
                    </div>
                  )}
                </div>
              ) : (
                /* Aba: Ficha Técnica em Tabela Limpa */
                <div className="divide-y divide-white/5 text-xs sm:text-sm font-mono">
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Referência</span>
                    <span className="text-text-primary font-medium">{watch.specs.reference}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Ano / Época</span>
                    <span className="text-text-primary">{watch.specs.year}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Material da Caixa</span>
                    <span className="text-text-primary text-right pl-4">{watch.specs.caseMaterial}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Dimensões</span>
                    <span className="text-text-primary">{watch.specs.dimensions}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Calibre</span>
                    <span className="text-text-primary">{watch.specs.caliber}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Movimento</span>
                    <span className="text-text-primary">{watch.specs.movementType}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Vidro</span>
                    <span className="text-text-primary">{watch.specs.glass}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-text-muted uppercase tracking-widest text-[10px] sm:text-xs">Distância de Garras</span>
                    <span className="text-text-primary">{watch.specs.lugWidth}</span>
                  </div>
                </div>
              )}

              {/* Botão de Rodapé da Página Editorial */}
              <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted">
                  Genebra • Paris • Lisboa
                </span>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-sans tracking-widest-xl uppercase text-text-primary hover:bg-white/5 transition-all"
                >
                  Fechar Dossiê
                </button>
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};