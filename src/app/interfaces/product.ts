export interface Product {
  state: string;
  id: number;
  name: string;
  price: number;
  img: string;
  category_id: number;
  category: string;
  branches: Branch[];
}

interface Branch {
  id: number;
  city_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}