export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category_id: number;
  category: string;
  branches: Branch[];
}

interface Branch {
  branch_id: number;
}