import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Plus, Trash2, Eye, ShieldCheck, Upload } from 'lucide-react';
import { getCustomWatches, saveCustomWatch, deleteCustomWatch, type Watch } from '../data/watches';

// Palavra-passe de acesso ao painel
const ADMIN_SECRET = 'horology2026';

export const AdminCuradoria: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('horology_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Lista de peças cadastradas manualmente
  const [customList, setCustomList] = useState<Watch[]>([]);

  // Formulário de Cadastro
  const [brand, setBrand] = useState('ROLEX');
  const [model, setModel] = useState('');
  const [nickname, setNickname] = useState('');
  const [reference, setReference] = useState('');
  const [year, setYear] = useState('');
  const [era, setEra] = useState('Vintage (Anos 70)');
  const [caseMaterial, setCaseMaterial] = useState('Aço inoxidável Oystersteel');
  const [dimensions, setDimensions] = useState('36mm');
  const [lugWidth, setLugWidth] = useState('20mm');
  const [caliber, setCalibre] = useState('');
  const [movementType, setMovementType] = useState<'Manual' | 'Automático' | 'Quartzo'>('Automático');
  const [glass, setGlass] = useState('Cristal de Safira');
  const [summary, setSummary] = useState('');
  const [historyText, setHistoryText] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setCustomList(getCustomWatches());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_SECRET) {
      sessionStorage.setItem('horology_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model || !coverImage) {
      alert('Preencha ao menos o Modelo e selecione uma Imagem.');
      return;
    }

    const generatedSlug = `${brand.toLowerCase()}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

    const newWatch: Watch = {
      id: generatedSlug,
      brand: brand.toUpperCase(),
      model,
      nickname: nickname || undefined,
      era: era || 'Vintage',
      summary: summary || `${brand} ${model} preservado sob curadoria técnica.`,
      coverImage,
      history: historyText ? historyText.split('\n\n').filter(Boolean) : ['Peça adicionada ao acervo sob curadoria privada.'],
      specs: {
        reference: reference || 'N/A',
        year: year || 'N/A',
        caseMaterial: caseMaterial || 'Aço',
        dimensions: dimensions || '40mm',
        lugWidth: lugWidth || '20mm',
        caliber: caliber || 'Mecânico',
        movementType: movementType,
        glass: glass || 'Safira',
      },
    };

    saveCustomWatch(newWatch);
    setCustomList(getCustomWatches());

    // Reset aos campos principais
    setModel('');
    setNickname('');
    setReference('');
    setCalibre('');
    setSummary('');
    setHistoryText('');
    setCoverImage('');
    alert('Relógio catalogado com sucesso no acervo!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta peça do catálogo?')) {
      deleteCustomWatch(id);
      setCustomList(getCustomWatches());
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-text-primary flex items-center justify-center p-6 selection:bg-text-primary selection:text-museum-dark">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-[#121214] border border-white/10 rounded-2xl p-8 shadow-2xl text-center"
        >
          <div className="w-12 h-12 rounded-full border border-accent-gold/30 bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 text-accent-gold">
            <Lock size={20} />
          </div>

          <h1 className="text-xl font-serif text-white mb-2">Curadoria & Arquivo</h1>
          <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-6">
            Acesso Restrito ao Painel
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Palavra-passe de acesso"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-[#18181A] border border-white/10 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder-text-muted/60 focus:outline-none focus:border-accent-gold"
            />

            {authError && (
              <p className="text-[10px] font-mono text-red-400">Palavra-passe incorreta.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-museum-dark text-xs font-sans tracking-widest-xl uppercase font-semibold transition-all active:scale-95"
            >
              Aceder ao Painel
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-[10px] font-mono tracking-widest uppercase text-text-muted hover:text-white transition-colors"
          >
            ← Voltar ao Acervo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-text-primary selection:bg-text-primary selection:text-museum-dark pb-24">
      <header className="w-full px-6 sm:px-12 h-20 flex items-center justify-between border-b border-white/5 bg-[#0A0A0B]/85 backdrop-blur-md sticky top-0 z-40">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-xs font-sans tracking-widest-xl uppercase text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao Acervo</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-accent-gold tracking-widest uppercase">
          <ShieldCheck size={15} />
          <span>Sessão de Curadoria Ativa</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-serif mb-2">Cadastrar Nova Peça</h1>
          <p className="text-xs font-mono text-text-muted tracking-widest uppercase">
            Adicione um relógio diretamente ao catálogo sem alterar código
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#121214] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Seção 1: Fotografia */}
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-text-muted mb-3">
              Fotografia do Relógio
            </label>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-40 h-40 bg-[#18181A] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden relative">
                {coverImage ? (
                  <img src={coverImage} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-[10px] font-mono text-text-muted text-center p-3">Sem imagem</span>
                )}
              </div>
              <div className="flex-1 w-full space-y-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 hover:border-accent-gold text-xs font-mono text-white transition-all bg-white/[0.03]">
                  <Upload size={14} /> Carregar Imagem Local
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <div className="text-[10px] font-mono text-text-muted">Ou cole o link direto de uma imagem online:</div>
                <input
                  type="text"
                  placeholder="https://exemplo.com/relogio.png"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
                />
              </div>
            </div>
          </div>

          {/* Seção 2: Identificação */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Marca</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value.toUpperCase())}
                placeholder="Ex: ROLEX, PATEK PHILIPPE"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Modelo</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: Submariner Date"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Nickname (Opcional)</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder='Ex: "Kermit"'
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Época / Era</label>
              <input
                type="text"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                placeholder="Ex: Anos 70, Vintage"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          {/* Seção 3: Especificações */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Referência</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ex: Ref. 16610"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Ano</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ex: c. 1998"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Material</label>
              <input
                type="text"
                value={caseMaterial}
                onChange={(e) => setCaseMaterial(e.target.value)}
                placeholder="Ex: Ouro 18k / Aço"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Dimensões</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="Ex: 40mm"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Entre Asas (Lug)</label>
              <input
                type="text"
                value={lugWidth}
                onChange={(e) => setLugWidth(e.target.value)}
                placeholder="Ex: 20mm"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Calibre</label>
              <input
                type="text"
                value={caliber}
                onChange={(e) => setCalibre(e.target.value)}
                placeholder="Ex: Calibre 3135"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Movimento</label>
              <select
                value={movementType}
                onChange={(e) => setMovementType(e.target.value as 'Manual' | 'Automático' | 'Quartzo')}
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              >
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
                <option value="Quartzo">Quartzo</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">Vidro</label>
              <input
                type="text"
                value={glass}
                onChange={(e) => setGlass(e.target.value)}
                placeholder="Ex: Cristal de Safira"
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          {/* Seção 4: Síntese e História */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">
                Resumo Curatorial Curto (1 frase)
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Ex: Mostrador tropical preservado com mostrador uniforme em tons chocolate."
                className="w-full bg-[#18181A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-text-muted mb-2">
                Narrativa e Proveniência (Separe parágrafos com linha em branco)
              </label>
              <textarea
                rows={4}
                value={historyText}
                onChange={(e) => setHistoryText(e.target.value)}
                placeholder="Escreva sobre a importância histórica, patine ou procedência..."
                className="w-full bg-[#18181A] border border-white/10 rounded-lg p-3 text-xs font-serif text-white focus:outline-none focus:border-accent-gold leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-accent-gold hover:bg-accent-gold/90 text-museum-dark font-sans tracking-widest-xl uppercase text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg"
          >
            <Plus size={16} /> Publicar Peça no Acervo
          </button>
        </form>

        {/* Lista de Peças Cadastradas */}
        <div className="mt-16">
          <h2 className="text-xl font-serif mb-4">Peças Adicionadas Manualmente ({customList.length})</h2>
          {customList.length === 0 ? (
            <p className="text-xs font-mono text-text-muted border border-dashed border-white/10 p-8 rounded-xl text-center">
              Nenhuma peça customizada adicionada ainda.
            </p>
          ) : (
            <div className="divide-y divide-white/5 border-y border-white/5">
              {customList.map((w) => (
                <div key={w.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={w.coverImage} alt={w.model} className="w-12 h-12 object-contain bg-[#18181A] rounded p-1" />
                    <div>
                      <div className="text-[10px] font-mono text-accent-gold uppercase">{w.brand} • {w.specs.year}</div>
                      <div className="text-sm font-serif text-white">{w.model}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/relogio/${w.id}`)}
                      className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      title="Ver página"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="p-2 text-red-400/80 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
                      title="Remover"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};