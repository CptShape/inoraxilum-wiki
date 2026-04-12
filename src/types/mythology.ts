// Mythology module type definitions

export interface GodManifestation {
  animal?: string;
  monster?: string;
  colors?: string[];
}

export interface GodRelationship {
  id: string;
  label?: string;
}

export interface GodCustomField {
  key: string;
  label: string;
  value: string | string[] | number | boolean;
  type?: 'text' | 'list' | 'number' | 'boolean';
}

export interface God {
  id: string;
  image?: string;
  name: string;
  mainTitle: string;
  titles: string[];
  aliases: string[];
  alignment: string;
  symbol: string;
  domains: string[];
  worshipers: string;
  manifestation: GodManifestation;
  parents: GodRelationship[];
  children: GodRelationship[];
  descriptionFile: string; // path to .md file
  customFields?: GodCustomField[];
  [key: string]: unknown; // Allow arbitrary custom fields
}

export type MythologyViewMode = 'tree' | 'grid' | 'category';

export interface MythologyChapterData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gods: God[];
}
