export interface Modifier {
  id: number;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
  modifier_group: ModifierGroup[];
}

export interface ModifierGroup {
  id: number;
  name: string;
  selection_type: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}