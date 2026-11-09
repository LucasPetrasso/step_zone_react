"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import type { ProductCategory } from "@/types/product";

const categories: ("Todos" | ProductCategory)[] = [
  "Todos",
  "Running",
  "Casual",
  "Skate",
  "Lifestyle",
];

export function ProductCatalog() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <div className="catalog-tools">
        <div className="category-tabs" aria-label="Filtrar por categoria">
          {categories.map((option) => (
            <button
              type="button"
              key={option}
              className={`category-tab${category === option ? " active" : ""}`}
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tênis..."
            aria-label="Buscar produto pelo nome"
          />
        </label>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <Link
              className="product-image-wrap"
              href={`/product/${product.id}`}
              aria-label={`Ver detalhes de ${product.name}`}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 680px) 48vw, (max-width: 900px) 30vw, 23vw"
                className="product-image"
              />
              {product.badge && (
                <span className={`product-badge${product.badge === "Oferta" ? " sale" : ""}`}>
                  {product.badge}
                </span>
              )}
              <span className="product-link-icon"><ArrowUpRight size={17} /></span>
            </Link>
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              <span role="img" aria-label="Avaliação: 5 de 5">★★★★★</span>
            </div>
            <Link href={`/product/${product.id}`} className="product-name">{product.name}</Link>
            <div className="product-price">
              <span>{formatCurrency(product.price)}</span>
              {product.originalPrice && <del>{formatCurrency(product.originalPrice)}</del>}
            </div>
          </article>
        ))}
        {filteredProducts.length === 0 && (
          <p className="empty-results" role="status">
            Nenhum produto encontrado. Tente outro nome ou categoria.
          </p>
        )}
      </div>
    </>
  );
}
