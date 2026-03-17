export interface ApiListResponse<T> {
  data: T[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface CatalogProductDto {
  id: number;
  title: string;
  slug: string;
  category_id?: number | null;
  brand_id?: number | null;
  category: string | null;
  subcategory: string | null;
  category_slug: string | null;
  brand: string | null;
  brand_slug: string | null;
  origin: string | null;
  condition: 'Nueva' | 'Usada';
  description: string | null;
  short_description: string | null;
  image: string | null;
  gallery_images: string[];
  available: boolean;
  capacity: string | null;
  voltage: string | null;
  power: string | null;
  tags: string[];
  published_at: string | null;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  products_count?: number;
}

export interface BrandDto {
  id: number;
  name: string;
  slug: string;
  country: string | null;
  products_count?: number;
}

export interface WebContentDto {
  id: number;
  section: string;
  key: string;
  name: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  banner_url: string | null;
  cta_text: string | null;
  cta_url: string | null;
  meta: Record<string, string>;
  sort_order: number;
  is_active: boolean;
}
