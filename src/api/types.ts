export interface Category {
  id: number;
  name: string;
}

export interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

export interface Cat {
  breeds: Breed[];
  categories?: Category[];
  id: string;
  url: string;
  width: number;
  height: number;
  favourite?: {
    id: number;
  };
}

export interface FavouriteCat {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}

export interface UploadedCat {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id: string;
  created_at: string;
  original_filename: string;
  breed_ids: null;
}
