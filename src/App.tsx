import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { getAllWatches, type Watch } from './data/watches';
import { AdminCuradoria } from './pages/AdminCuradoria';
import { MasonryGrid } from './components/MasonryGrid';
import { WatchPage } from './pages/WatchPage';

function CatalogHome() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>('ACERVO');
  const [catalog, setCatalog] = useState<Watch[]>(() => getAllWatches());

  // Atualiza a lista caso o usuário retorne ao catálogo
  useEffect(() => {
    setCatalog(getAllWatches());
  }, []);

  // Inicializa a rolagem suave do Lenis na galeria
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Lista única de marcas dinamicamente extraída de todo o catálogo
  const brands = useMemo(() => {
    const list = Array.from(
      new Set(catalog.filter((w) => !w.isEditorialCard).map((w) => w.brand))
    );
    return ['ACERVO', ...list];
  }, [catalog]);

  // Filtra as peças mantendo os cartões editoriais quando em 'ACERVO'
  const filteredWatches = useMemo(() => {
    return catalog.filter((watch) => {
      if (selectedBrand === 'ACERVO') return true;
      return watch.brand === selectedBrand;
    });
  }, [catalog, selectedBrand]);

  const handleSelectWatch = (watch: Watch) => {
    if (!watch.isEditorialCard) {
      navigate(`/relogio/${watch.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-text-primary selection:text-museum-dark pb-28 relative">
      {/* Cabeçalho */}
      <header className="pt-12 pb-8 px-6 sm:px-12 flex justify-between items-start">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-text-primary">
            HOROLOGY ARCHIVE
          </h1>
          <p className="text-[9px] font-sans tracking-widest-2xl uppercase text-text-muted mt-1">
            Curadoria Privada & Património
          </p>
        </div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-text-muted text-right hidden sm:block">
          <p>Exibindo {filteredWatches.length} Peças</p>
          <p className="mt-1">Genebra — Lisboa</p>
        </div>
      </header>

      {/* Grelha de Relógios */}
      <main className="px-4 sm:px-8 md:px-12 flex-1 w-full max-w-[1600px] mx-auto">
        <MasonryGrid
          watches={filteredWatches}
          onSelectWatch={handleSelectWatch}
        />
      </main>

      {/* Dock Flutuante Inferior */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] sm:w-auto max-w-full px-4 pointer-events-none flex justify-center">
        <nav className="pointer-events-auto bg-museum-card/60 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`text-[9px] sm:text-[10px] font-sans tracking-widest-xl uppercase whitespace-nowrap px-4 py-2.5 rounded-full transition-all duration-300 ${
                selectedBrand === brand
                  ? 'bg-white/10 text-text-primary font-semibold shadow-inner'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {brand}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogHome />} />
      <Route path="/relogio/:id" element={<WatchPage />} />
      <Route path="/curadoria" element={<AdminCuradoria />} />
    </Routes>
  );
}