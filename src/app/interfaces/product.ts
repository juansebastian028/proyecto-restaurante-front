export interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  img: string;
  created_at: string;
  updated_at: string;
  category: Category;
  branches: Branch[];
}

interface Branch {
  id: number;
  city_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  product_id: number;
  branch_id: number;
  state: string;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}