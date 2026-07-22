import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  badge: string | null;
  original_price: string | null;
};
