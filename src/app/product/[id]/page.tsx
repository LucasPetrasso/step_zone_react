import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((entry) => entry.id === id);

  if (!product) notFound();

  return (
    <div className="page-container">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/#colecao">Coleção</Link><span>/</span><span>{product.name}</span></div>
      <ProductDetails product={product} />
    </div>
  );
}
