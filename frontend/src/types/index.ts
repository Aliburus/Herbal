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
  category: string | Category;
  plants?: string[] | Plant[];
  recipes?: string[] | Recipe[];
  relatedPlantCount?: number;
}

export interface Recipe {
  id: string;
  title: string;
  content: string;
  usage: string;
  diseases: string[];
  ingredients: string[];
}

export interface Category {
  id: string;
  name: string;
  type: "main" | "sub";
  parent_id?: string;
}

export interface SearchResult {
  plants: Plant[];
  diseases: Disease[];
  recipes: Recipe[];
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "user";
}
