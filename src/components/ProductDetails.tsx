"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus, Minus, Truck } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { addItem } = useCart();

  function handleAdd() {
    if (size === null) {
      setMessage("Selecione um tamanho para continuar.");
      return;
    }
    addItem(product.id, size, quantity);
    setMessage("Adicionado à sua sacola.");
  }

  return (
    <div className="detail-layout">
      <div className="detail-image">
        <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 680px) 100vw, 52vw" />
        {product.badge && <span className={`product-badge${product.badge === "Oferta" ? " sale" : ""}`}>{product.badge}</span>}
      </div>
      <div className="detail-copy">
        <span className="detail-category">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="detail-price">
          {formatCurrency(product.price)}
          {product.originalPrice && <del>{formatCurrency(product.originalPrice)}</del>}
        </div>
        <p className="detail-description">{product.description}</p>
        <span className="field-label">Escolha seu tamanho (BR)</span>
        <div className="size-list" aria-label="Tamanhos disponíveis">
          {product.sizes.map((option) => (
            <button
              type="button"
              key={option}
              className={`size-button${size === option ? " selected" : ""}`}
              aria-pressed={size === option}
              onClick={() => {
                setSize(option);
                setMessage("");
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <span className="field-label">Quantidade</span>
        <div className="qty-control">
          <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14} /></button>
          <span>{quantity}</span>
          <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => value + 1)}><Plus size={14} /></button>
        </div>
        <div className="detail-actions">
          <button type="button" className="button button-dark" onClick={handleAdd}>
            Adicionar à sacola
          </button>
        </div>
        {message && (
          <p className={size === null ? "inline-error" : "inline-error success-message"} role="status">
            {size !== null && <Check size={14} />} {message}
          </p>
        )}
        <div className="detail-policies">
          <p className="detail-policy"><Truck size={15} /> <strong>Entrega grátis</strong> em compras a partir de R$ 399</p>
          <p className="detail-policy"><strong>Troca fácil</strong> — primeira troca grátis em até 30 dias</p>
          <p className="detail-policy"><strong>Pagamento seguro</strong> com seus dados protegidos</p>
        </div>
      </div>
    </div>
  );
}
