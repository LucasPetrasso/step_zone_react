"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function CartPage() {
  const { items, subtotal, discounts, total, updateQuantity, removeItem, isReady } = useCart();

  if (!isReady) {
    return <div className="page-container" role="status">Carregando sua sacola...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><span>Sacola</span></div>
        <div className="empty-state">
          <div className="empty-state-icon"><ShoppingBag size={24} /></div>
          <h2>Sua sacola está esperando</h2>
          <p>Encontre seu próximo par e dê o primeiro passo.</p>
          <Link href="/#colecao" className="button button-dark">Explorar coleção</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><span>Sacola</span></div>
      <h1 className="page-title">Sua sacola.</h1>
      <p className="page-intro">{items.reduce((count, item) => count + item.quantity, 0)} itens selecionados</p>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) return null;
            return (
              <article className="cart-row" key={`${item.productId}-${item.size}`}>
                <Link href={`/product/${product.id}`} className="cart-thumb" aria-label={`Ver ${product.name}`}>
                  <Image src={product.image} alt="" fill sizes="108px" />
                </Link>
                <div>
                  <span className="cart-product-category">{product.category}</span>
                  <h2 className="cart-product-name">{product.name}</h2>
                  <span className="cart-product-detail">Tamanho {item.size}</span>
                  <div className="cart-qty">
                    <button type="button" aria-label={`Diminuir quantidade de ${product.name}`} onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}><Minus size={13} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Aumentar quantidade de ${product.name}`} onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}><Plus size={13} /></button>
                  </div>
                </div>
                <div className="cart-row-end">
                  <span className="cart-line-price">{formatCurrency(product.price * item.quantity)}</span>
                  <button type="button" className="remove-button" onClick={() => removeItem(item.productId, item.size)}>
                    <Trash2 size={13} /> Remover
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="summary-card">
          <h2>Resumo do pedido</h2>
          <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          {discounts > 0 && <div className="summary-line discount"><span>Descontos</span><span>− {formatCurrency(discounts)}</span></div>}
          <div className="summary-line"><span>Entrega</span><span>{total >= 399 ? "Grátis" : "Calculada no checkout"}</span></div>
          <div className="summary-total"><span>Total</span><span>{formatCurrency(total)}</span></div>
          <Link href="/checkout" className="button button-dark">Continuar para checkout</Link>
          <p className="summary-hint">Até 6x sem juros no cartão. Entrega grátis acima de R$ 399.</p>
          <div className="secure-note"><ShieldCheck size={14} /> Compra segura</div>
        </aside>
      </div>
    </div>
  );
}
