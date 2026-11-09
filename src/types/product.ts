export type ProductCategory = "Running" | "Casual" | "Skate" | "Lifestyle";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: number[];
  badge?: "Novo" | "Oferta";
};
