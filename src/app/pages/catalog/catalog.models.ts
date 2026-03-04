export interface CatalogProduct {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  brand: string;
  origin: string;
  condition: 'Nueva' | 'Usada';
  description: string;
  image: string;
  available: boolean;
  capacity?: string;
  voltage?: string;
  power?: string;
  tags: string[];
}
