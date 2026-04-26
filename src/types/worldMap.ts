export interface WorldMapHotspot {
  id: string;
  label: string;
  targetMapId: string;
  x: number; // percent from left, 0-100
  y: number; // percent from top, 0-100
  w: number; // percent width, 0-100
  h: number; // percent height, 0-100
  color?: string;
  description?: string;
}

export interface WorldMapNode {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  description?: string;
  hotspots: WorldMapHotspot[];
}

export interface WorldMapAtlas {
  rootMapId: string;
  maps: Record<string, WorldMapNode>;
}