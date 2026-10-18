export interface TechnicalSpecs {
  reference: string;
  year: string | number;
  caseMaterial: string;
  dimensions: string;
  caliber: string;
  movementType: 'Manual' | 'Automático' | 'Quartzo';
  glass: string;
  lugWidth: string;
  waterResistance?: string;
}

export interface Watch {
  id: string;
  isEditorialCard?: boolean; // Para os blocos de texto como na referência
  editorialTitle?: string;
  brand: string;
  model: string;
  nickname?: string;
  era: string;
  coverImage: string;
  summary: string;
  history: string[];
  specs: TechnicalSpecs;
}

export const WATCHES_CATALOG: Watch[] = [
  {
    id: 'rolex-submariner-5513',
    brand: 'Rolex',
    model: 'Oyster Perpetual Submariner',
    nickname: 'Maxi Dial',
    era: 'Anos 70',
    coverImage: 'https://imageapi.cambiaste.com/api/lotto/immagine/192296.jpg',
    summary: 'A essência do relógio de mergulho utilitário sem data com índices de trítio patinados.',
    history: [
      'A referência 5513 é reverenciada pelos colecionadores pela pureza absoluta do seu mostrador simétrico, dispensando a lente de aumento Cyclops.',
      'A tonalidade âmbar adquirida pelos marcadores luminescentes confere uma personalidade inconfundível a cada peça preservada.'
    ],
    specs: {
      reference: 'Ref. 5513',
      year: '1974',
      caseMaterial: 'Aço inoxidável Oystersteel',
      dimensions: '40mm',
      caliber: 'Rolex Calibre 1520',
      movementType: 'Automático',
      glass: 'Acrílico Super Dome',
      lugWidth: '20mm'
    }
  },
  {
    id: 'rolex-datejust-mickey',
    brand: 'Rolex',
    model: 'Datejust "Mickey Mouse"',
    nickname: 'Silver Dial Custom Art',
    era: 'Anos 80',
    coverImage: 'https://img.chrono24.com/images/catalog-content/Rolex-Datejust-Mickey-Mouse-oc6a8gs0xgly84mue262dy4r-Width800.jpg',
    summary: 'Mostrador prateado com clássica ilustração vintage e bracelete Oyster em aço.',
    history: [
      'As versões com o mostrador personalizado de personagens clássicos tornaram-se itens de culto entre celebridades e colecionadores de design avant-garde.',
      'Combina a rigidez mecânica do calibre certificado com um toque lúdico e colecionável.'
    ],
    specs: {
      reference: 'Ref. 16030',
      year: 'c. 1982',
      caseMaterial: 'Aço cirúrgico',
      dimensions: '36mm',
      caliber: 'Rolex Calibre 3035',
      movementType: 'Automático',
      glass: 'Cristal Acrílico',
      lugWidth: '20mm'
    }
  },
  {
    id: 'editorial-curadoria',
    isEditorialCard: true,
    editorialTitle: 'MUSEU & ACERVO',
    brand: 'EDITORIAL',
    model: 'Curadoria Exclusiva',
    era: 'Vintag',
    coverImage: '',
    summary: '',
    history: [
      'Cada relógio do nosso catálogo passa por rigorosa autenticação mecânica, preservação de pátina original e revisão histórica.'
    ],
    specs: {
      reference: 'Acervo Oficial',
      year: '2026',
      caseMaterial: 'Património Horológico',
      dimensions: 'Genebra • Lisboa',
      caliber: 'Manufatura Suíça',
      movementType: 'Manual',
      glass: 'Histórico',
      lugWidth: 'Universal'
    }
  },
  {
    id: 'tudor-oyster-prince-submariner',
    brand: 'Tudor',
    model: 'Oyster Prince Submariner',
    nickname: 'Snowflake Date',
    era: 'Anos 70',
    coverImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85',
    summary: 'Os lendários ponteiros geométricos desenhados para a Marinha Nacional Francesa.',
    history: [
      'Adotado por mergulhadores de elite da Marine Nationale, os ponteiros em formato de floco de neve foram desenhados para garantir legibilidade instantânea em águas turvas e profundas.'
    ],
    specs: {
      reference: 'Ref. 9411/0',
      year: '1976',
      caseMaterial: 'Aço inoxidável',
      dimensions: '39.5mm',
      caliber: 'ETA Calibre 2784 modificado',
      movementType: 'Automático',
      glass: 'Plexiglass com lente de data',
      lugWidth: '20mm'
    }
  },
  {
    id: 'omega-speedmaster-vintage',
    brand: 'Omega',
    model: 'Speedmaster Professional',
    nickname: 'Moonwatch Chronograph',
    era: 'Anos 60',
    coverImage: 'https://www.omegawatches.com/media/catalog/product/o/m/omega-vintage-speedmaster-reduced-DA1750032-138808.jpg?w=1024',
    summary: 'O cronógrafo oficial das missões espaciais Gemini e Apollo.',
    history: [
      'Testado contra variações térmicas extremas e vácuo orbital, tornou-se o único instrumento mecânico homologado pela agência espacial norte-americana para passeios extraveiculares na Lua.'
    ],
    specs: {
      reference: 'Ref. 105.012',
      year: '1967',
      caseMaterial: 'Aço Staybrite',
      dimensions: '42mm',
      caliber: 'Omega / Lemania Calibre 321',
      movementType: 'Manual',
      glass: 'Hesalite abaulado',
      lugWidth: '20mm'
    }
  },
  {
    id: 'editorial-trabalho',
    isEditorialCard: true,
    editorialTitle: 'COMO TRABALHAMOS',
    brand: 'SERVIÇOS',
    model: 'Autenticidade Garantida',
    era: 'Vintag',
    coverImage: '',
    summary: '',
    history: [
      'Garantia de originalidade em todas as peças, rastreabilidade de procedência e serviço técnico especializado de relojoaria.'
    ],
    specs: {
      reference: 'Protocolo Suíço',
      year: '100% Original',
      caseMaterial: 'Certificado de Origem',
      dimensions: 'Internacional',
      caliber: 'Mecânica Certificada',
      movementType: 'Automático',
      glass: 'Original',
      lugWidth: 'Vintage'
    }
  },
  {
    id: 'patek-philippe-calatrava-black',
    brand: 'Patek Philippe',
    model: 'Calatrava Dress Watch',
    nickname: 'Gilt Black Dial',
    era: 'Anos 50',
    coverImage: 'https://sothebys-md.brightspotcdn.com/dims4/default/c8f5005/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fwebnative%2Fimages%2F74%2F17%2Fe40f1b0149bd9ddfb067301e5d02%2Fge2601-djmgk-t2-01.jpg',
    summary: 'Elegância clássica em ouro amarelo de 18 quilates com bracelete em couro de crocodilo.',
    history: [
      'Inspirada na escola alemã Bauhaus com o mote "a forma segue a função", a linha Calatrava definiu o arquétipo definitivo do relógio de vestuário refinado desde 1932.'
    ],
    specs: {
      reference: 'Ref. 2526',
      year: '1958',
      caseMaterial: 'Ouro amarelo 18k',
      dimensions: '35mm',
      caliber: 'Patek Calibre 12-600 AT',
      movementType: 'Automático',
      glass: 'Cristal mineral convexo',
      lugWidth: '18mm'
    }
  },
  {
    id: 'rolex-explorer-gilt',
    brand: 'Rolex',
    model: 'Oyster Perpetual Explorer',
    nickname: 'Gilt Tropical Dial',
    era: 'Anos 60',
    coverImage: 'https://media.rolex.com/image/upload/q_auto/f_auto/t_v7-cover-majesty-landscape/c_limit,w_1920/v1/a677b2c664f6/catalogue/2026/upright-c/m126610ln-0001',
    summary: 'Mostrador tropical com numerais 3-6-9 icónicos e pátina chocolate natural.',
    history: [
      'Concebido para montanhistas e expedições polares na sequência da conquista do Monte Evereste em 1953, combinando resistência térmica com legibilidade absoluta no mostrador.'
    ],
    specs: {
      reference: 'Ref. 1016',
      year: '1966',
      caseMaterial: 'Aço Oystersteel',
      dimensions: '36mm',
      caliber: 'Rolex Calibre 1560',
      movementType: 'Automático',
      glass: 'Acrílico Tropic 22',
      lugWidth: '20mm'
    }
  }
];

// Adicione no final de src/data/watches.ts:

const STORAGE_KEY = 'horology_custom_watches';

export function getCustomWatches(): Watch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getAllWatches(): Watch[] {
  const custom = getCustomWatches();
  return [...custom, ...WATCHES_CATALOG];
}

export function saveCustomWatch(watch: Watch): void {
  const current = getCustomWatches();
  const updated = [watch, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteCustomWatch(id: string): void {
  const current = getCustomWatches();
  const filtered = current.filter((w) => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}