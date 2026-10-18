export interface TechnicalSpecs {
  reference: string;
  year: string;
  caseMaterial: string;
  dimensions: string;
  lugWidth: string;
  caliber: string;
  movementType: 'Manual' | 'Automático' | 'Quartzo';
  glass: string;
}

export interface Watch {
  id: string;
  brand: string;
  model: string;
  nickname?: string;
  era: string;
  summary?: string;
  coverImage: string;
  history: string[];
  specs: TechnicalSpecs;
  isEditorialCard?: boolean;
  editorialTitle?: string;
}

export const WATCHES: Watch[] = [
  {
    id: 'rolex-submariner-5513',
    brand: 'ROLEX',
    model: 'Oyster Perpetual Submariner',
    nickname: 'Maxi Dial',
    era: 'Vintage (Anos 70)',
    summary: 'A essência do relógio de mergulho utilitário sem data com índices de trítio patinados.',
    coverImage: '/watches/rolex-5513.png',
    history: [
      'A referência 5513 é reverenciada pelos colecionadores pela pureza absoluta do seu mostrador simétrico, dispensando a lente de aumento Cyclops.',
      'A tonalidade âmbar adquirida pelos marcadores luminescentes confere uma personalidade inconfundível a cada peça preservada.'
    ],
    specs: {
      reference: 'Ref. 5513',
      year: '1974',
      caseMaterial: 'Aço inoxidável Oystersteel',
      dimensions: '40mm',
      lugWidth: '20mm',
      caliber: 'Rolex Calibre 1520',
      movementType: 'Automático',
      glass: 'Acrílico Super Dome'
    }
  },
  {
    id: 'editorial-servicos',
    brand: 'SERVIÇOS',
    model: 'Como Trabalhamos',
    isEditorialCard: true,
    editorialTitle: 'COMO TRABALHAMOS',
    era: 'Curadoria',
    summary: 'Processo editorial de preservação e autenticação de peças históricas.',
    coverImage: '',
    history: ['Critérios rigorosos de curadoria, conservação documental e procedência técnica.'],
    specs: {
      reference: 'HOROLOGY-SRV',
      year: '2026',
      caseMaterial: 'Arquivo',
      dimensions: 'N/A',
      lugWidth: 'N/A',
      caliber: 'Curadoria',
      movementType: 'Manual',
      glass: 'N/A'
    }
  },
  {
    id: 'rolex-datejust-mickey',
    brand: 'ROLEX',
    model: 'Datejust "Mickey Mouse"',
    nickname: 'Custom Dial',
    era: 'Anos 80',
    summary: 'A clássica caixa Oyster combinada com a irreverência gráfica do mostrador ilustrado.',
    coverImage: '/watches/rolex-mickey.png',
    history: [
      'Uma expressão rara e cobiçada dentro da relojoaria neo-vintage, onde mostradores clássicos receberam ilustrações encomendadas ou personalizadas de época.',
      'A combinação do bisel canelado em ouro branco com a pulseira Jubilee eleva a versatilidade deste ícone.'
    ],
    specs: {
      reference: 'Ref. 16014',
      year: 'c. 1982',
      caseMaterial: 'Aço e ouro branco',
      dimensions: '36mm',
      lugWidth: '20mm',
      caliber: 'Rolex Calibre 3035',
      movementType: 'Automático',
      glass: 'Plexiglass com lente Cyclops'
    }
  },
  {
    id: 'tudor-submariner-snowflake',
    brand: 'TUDOR',
    model: 'Submariner "Snowflake"',
    nickname: 'Marine Nationale',
    era: 'Anos 70',
    summary: 'Os lendários ponteiros geométricos desenhados para a Marinha Nacional Francesa.',
    coverImage: '/watches/tudor-snowflake.png',
    history: [
      'Adotado por mergulhadores de elite da Marine Nationale, os ponteiros em formato de floco de neve foram desenhados para garantir legibilidade instantânea em águas turvas e profundas.'
    ],
    specs: {
      reference: 'Ref. 9411/0',
      year: '1976',
      caseMaterial: 'Aço inoxidável',
      dimensions: '39.5mm',
      lugWidth: '20mm',
      caliber: 'ETA Calibre 2784 modificado',
      movementType: 'Automático',
      glass: 'Plexiglass com lente de data'
    }
  },
  {
    id: 'patek-philippe-calatrava-2526',
    brand: 'PATEK PHILIPPE',
    model: 'Calatrava',
    nickname: 'Gilt Black Dial',
    era: 'Anos 50',
    summary: 'Elegância clássica em ouro amarelo de 18 quilates com bracelete em couro de crocodilo.',
    coverImage: '/watches/patek-2526.png',
    history: [
      'Inspirada na escola alemã Bauhaus com o mote "a forma segue a função", a linha Calatrava definiu o arquétipo definitivo do relógio de vestuário refinado desde 1932.'
    ],
    specs: {
      reference: 'Ref. 2526',
      year: '1954',
      caseMaterial: 'Ouro amarelo 18k',
      dimensions: '35mm',
      lugWidth: '18mm',
      caliber: 'Patek Calibre 12-600 AT',
      movementType: 'Automático',
      glass: 'Cristal mineral convexo'
    }
  }
];

// Chave do localStorage para peças criadas no painel /curadoria
const CUSTOM_STORAGE_KEY = 'horology_custom_watches';

export const getCustomWatches = (): Watch[] => {
  try {
    const data = localStorage.getItem(CUSTOM_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCustomWatch = (watch: Watch): void => {
  const current = getCustomWatches();
  const updated = [watch, ...current.filter((w) => w.id !== watch.id)];
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteCustomWatch = (id: string): void => {
  const current = getCustomWatches();
  const updated = current.filter((w) => w.id !== id);
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(updated));
};

export const getAllWatches = (): Watch[] => {
  const customs = getCustomWatches();
  return [...customs, ...WATCHES];
};