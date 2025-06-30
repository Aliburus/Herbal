export interface Plant {
  id: string;
  name: string;
  description: string;
  usage: string;
  image: string;
  diseases?: string[] | Disease[];
  recipes?: string[] | Recipe[];
  diseaseCount?: number;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  plants?: string[] | Plant[];
  plantIds?: string[];
  recipes?: string[] | Recipe[];
  relatedPlantCount?: number;
}

export interface Recipe {
  id: string;
  title: string;
  content: string;
  usage: string;
  diseases?: string[] | Disease[];
  diseaseIds?: string[];
  diseaseCount?: number;
}

export interface SearchResult {
  plants: Plant[];
  diseases: Disease[];
  recipes: Recipe[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt?: string;
}
