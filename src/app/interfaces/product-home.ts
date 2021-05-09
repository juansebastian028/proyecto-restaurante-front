export interface ProductHome {
  id: number;
  category_id: number;
  name: string;
  price: number;
  img: string;
  created_at: string;
  updated_at: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  modifier_groups: ModifierGroup[];
}

interface ModifierGroup {
  id: number;
  name: string;
  selection_type: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  modifier: Modifier[];
}

interface Modifier {
  id: number;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  modifier_group_id: number;
  modifier_id: number;
}