import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Share2, Check } from 'lucide-react';
import { getAllWatches } from '../data/watches';

export const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  // Lê todos os relógios (estáticos + cadastrados no painel de curadoria)
  const pieceWatches = useMemo(() => {
    return getAllWatches().filter((w) => !w.isEditorialCard);
  }, []);

  const currentIndex = pieceWatches.findIndex((item) => item.id === id);
  const watch = pieceWatches[currentIndex];

  const prevWatch = currentIndex > 0 ? pieceWatches[currentIndex - 1] : pieceWatches[pieceWatches.length - 1];
  const nextWatch = currentIndex < pieceWatches.length - 1 ? pieceWatches[currentIndex + 1] : pieceWatches[0];

  // Atalhos de teclado: Setas e Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/');
      if (e.key === 'ArrowLeft' && prevWatch) navigate(`/relogio/${prevWatch.id}`);
      if (e.key === 'ArrowRight' && nextWatch) navigate(`/relogio/${nextWatch.id}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevWatch, nextWatch, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!watch) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-text-primary flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-serif mb-3">Item não catalogado</h1>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-mono tracking-widest uppercase text-accent-gold border border-accent-gold/20 px-6 py-2.5 rounded-full hover:bg-accent-gold/10"
        >
          Voltar ao Acervo
        </button>
      </div>
    );
  }

  const catalogNumber = String(currentIndex + 1).padStart(2, '0');
  const totalCatalog = String(pieceWatches.length).padStart(2, '0');

  return (
    <motion.div
      key={watch.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0A0A0B] text-text-primary flex flex-col justify-between selection:bg-text-primary selection:text-museum-dark pb-20"
    >
      {/* 1. Header Minimalista */}
      <header className="w-full px-6 sm:px-12 h-16 sm:h-20 flex items-center justify-between border-b border-white/5 bg-[#0A0A0B]/85 backdrop-blur-md sticky top-0 z-40">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-xs font-sans tracking-widest-xl uppercase text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao Acervo</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-white transition-all active:scale-95"
          >
            {copied ? <Check size={12} className="text-accent-gold" /> : <Share2 size={12} />}
            <span className="hidden sm:inline">{copied ? 'Link Copiado' : 'Partilhar'}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-white/30 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* 2. SPLIT SCREEN 50/50 EDITORIAL */}
      <main className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
        
        {/* COLUNA ESQUERDA: FOTOGRAFIA HERO (Fixa no Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex items-center justify-center p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          {/* Luz pontual de estúdio */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md aspect-[3/4] flex items-center justify-center relative z-10"
          >
            <img
              src={watch.coverImage}
              alt={`${watch.brand} ${watch.model}`}
              className="w-full h-full object-contain filter contrast-[1.03] drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] select-none"
            />
          </motion.div>

          <div className="absolute bottom-6 left-8 hidden lg:block text-[10px] font-mono tracking-widest text-white/30 uppercase">
            REGISTO • {watch.specs.reference}
          </div>
        </div>

        {/* COLUNA DIREITA: FOLHA EDITORIAL (Rolagem Fluida) */}
        <div className="lg:col-span-6 p-6 sm:p-12 lg:p-16 flex flex-col justify-start">
          
          {/* Número de Catálogo Gigante e Metadados */}
          <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-8">
            <span className="text-4xl sm:text-5xl font-mono text-white/15 tracking-tight">
              //{catalogNumber}
            </span>
            <div className="text-right">
              <span className="text-[10px] font-sans tracking-widest-2xl uppercase text-accent-gold font-semibold block">
                {watch.brand}
              </span>
              <span className="text-xs font-mono text-text-muted tracking-widest">
                {watch.specs.year}
              </span>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-primary leading-tight font-normal mb-3">
            {watch.model}
          </h1>

          {watch.nickname && (
            <p className="text-sm sm:text-base font-serif italic text-accent-gold/80 mb-8">
              "{watch.nickname}"
            </p>
          )}

          {/* Ficha Técnica: Grelha Limpa de Relatório de Curador */}
          <section className="mb-12">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4 pb-2 border-b border-white/5">
              Especificações Técnicas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 font-sans text-xs">
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Referência</span>
    <span className="text-white font-medium">{watch.specs.reference}</span>
  </div>
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Material</span>
    <span className="text-white font-light text-[13px]">{watch.specs.caseMaterial}</span>
  </div>
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Dimensões</span>
    <span className="text-white font-medium">{watch.specs.dimensions}</span>
  </div>
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Calibre</span>
    <span className="text-white font-light text-[13px]">{watch.specs.caliber}</span>
  </div>
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Mecanismo</span>
    <span className="text-white font-light text-[13px]">{watch.specs.movementType}</span>
  </div>
  <div>
    <span className="text-white/40 uppercase text-[9px] font-mono tracking-widest block mb-1">Vidro</span>
    <span className="text-white font-light text-[13px]">{watch.specs.glass}</span>
  </div>
</div>
          </section>

          {/* Dossiê Histórico */}
          <section className="space-y-4 mb-12">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4 pb-2 border-b border-white/5">
              Narrativa & Proveniência
            </h2>
            {watch.history.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-serif text-sm sm:text-base text-text-primary/80 leading-relaxed first-letter:text-2xl first-letter:text-accent-gold first-letter:font-sans"
              >
                {paragraph}
              </p>
            ))}
            {watch.summary && (
              <p className="font-mono text-xs text-text-muted pt-4 border-t border-white/5">
                {watch.summary}
              </p>
            )}
          </section>

          {/* Autenticação */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span>Arquivo Suíço • Procedência Verificada</span>
            <span>{catalogNumber} / {totalCatalog}</span>
          </div>

        </div>

      </main>

      {/* 3. BARRA INFERIOR DE LEILÃO SUÍÇO */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-[#0A0A0B]/90 backdrop-blur-xl border-t border-white/5 px-6 sm:px-12 flex items-center justify-between z-30 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        <button
          onClick={() => navigate(`/relogio/${prevWatch.id}`)}
          className="group flex items-center gap-2 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Anterior</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="hover:text-accent-gold transition-colors text-[10px] tracking-widest-xl hidden sm:block"
        >
          // ACERVO
        </button>

        <button
          onClick={() => navigate(`/relogio/${nextWatch.id}`)}
          className="group flex items-center gap-2 hover:text-white transition-colors"
        >
          <span>Seguinte</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </motion.div>
  );
};