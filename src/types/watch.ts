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
  brand: string;
  model: string;
  nickname?: string;
  era: string;
  coverImage: string;
  galleryImages?: string[];
  aspectRatio?: 'tall' | 'classic' | 'square';
  summary: string;
  history: string[];
  provenanceNotes?: string;
  specs: TechnicalSpecs;
  featured?: boolean;
}