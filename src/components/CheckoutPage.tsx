"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import type { CompletedOrder } from "@/types/order";

type PaymentMethod = "pix" | "credit" | "debit";

export function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discounts, total, clearCart, isReady } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Sua sacola está vazia. Adicione um produto antes de finalizar.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") ?? "").trim();
    const cardNumber = String(formData.get("cardNumber") ?? "").replace(/\D/g, "");
    if (paymentMethod !== "pix" && cardNumber.length < 13) {
      setError("Confira o número do cartão informado.");
      return;
    }

    const orderNumber = `SZ-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const order: CompletedOrder = {
      number: orderNumber,
      customerName,
      createdAt: new Date().toISOString(),
      items: items.flatMap((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return product
          ? [{
              name: product.name,
              size: item.size,
              quantity: item.quantity,
              unitPrice: product.price,
            }]
          : [];
      }),
      subtotal,
      discounts,
      total,
    };

    try {
      window.localStorage.setItem("stepzone_last_order", JSON.stringify(order));
    } catch (storageError) {
      console.error("Não foi possível registrar o pedido neste dispositivo.", storageError);
      setError("Não foi possível confirmar o pedido agora. Tente novamente.");
      return;
    }

    clearCart();
    router.push("/success");
  }

  if (!isReady) {
    return <div className="page-container" role="status">Preparando seu checkout...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><span>Checkout</span></div>
        <div className="empty-state">
          <h2>Sua sacola está vazia</h2>
          <p>Adicione um produto para continuar com o checkout.</p>
          <Link href="/#colecao" className="button button-dark">Explorar coleção</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/cart">Sacola</Link><span>/</span><span>Checkout</span></div>
      <h1 className="page-title">Quase lá.</h1>
      <p className="page-intro">Preencha seus dados para finalizar seu pedido com segurança.</p>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Seus dados</h2>
            <div className="form-grid">
              <div className="form-field full">
                <label htmlFor="name">Nome completo</label>
                <input id="name" name="name" autoComplete="name" required minLength={3} />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="cpf">CPF</label>
                <input id="cpf" name="cpf" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" pattern="[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}-?[0-9]{2}" title="Informe um CPF válido, com 11 dígitos." required />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Telefone</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" required />
              </div>
              <div className="form-field">
                <label htmlFor="zip">CEP</label>
                <input id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" pattern="[0-9]{5}-?[0-9]{3}" title="Informe um CEP válido." required />
              </div>
              <div className="form-field full">
                <label htmlFor="street">Endereço</label>
                <input id="street" name="street" autoComplete="address-line1" required />
              </div>
              <div className="form-field">
                <label htmlFor="number">Número</label>
                <input id="number" name="number" required />
              </div>
              <div className="form-field">
                <label htmlFor="complement">Complemento</label>
                <input id="complement" name="complement" autoComplete="address-line2" />
              </div>
              <div className="form-field">
                <label htmlFor="city">Cidade</label>
                <input id="city" name="city" autoComplete="address-level2" required />
              </div>
              <div className="form-field">
                <label htmlFor="state">Estado</label>
                <select id="state" name="state" autoComplete="address-level1" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Forma de pagamento</h2>
            <div className="payment-options">
              {([
                ["pix", "Pix"],
                ["credit", "Crédito"],
                ["debit", "Débito"],
              ] as const).map(([method, label]) => (
                <label key={method} className={`payment-option${paymentMethod === method ? " selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {label}
                </label>
              ))}
            </div>
            {paymentMethod === "pix" ? (
              <div className="pix-note">
                <strong>Pagamento simulado via Pix.</strong> Ao confirmar, seu pedido será registrado como uma compra de demonstração. Nenhum pagamento real será realizado.
              </div>
            ) : (
              <div className="form-grid" style={{ marginTop: 16 }}>
                <div className="form-field full">
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input id="cardNumber" name="cardNumber" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" minLength={13} maxLength={23} required />
                </div>
                <div className="form-field">
                  <label htmlFor="cardName">Nome no cartão</label>
                  <input id="cardName" name="cardName" autoComplete="cc-name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="expiry">Validade</label>
                  <input id="expiry" name="expiry" autoComplete="cc-exp" placeholder="MM/AA" pattern="[0-9]{2}/[0-9]{2}" required />
                </div>
                <div className="form-field">
                  <label htmlFor="cvv">CVV</label>
                  <input id="cvv" name="cvv" inputMode="numeric" autoComplete="cc-csc" maxLength={4} pattern="[0-9]{3,4}" required />
                </div>
              </div>
            )}
          </section>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button button-dark">
            <CreditCard size={16} /> Confirmar pedido · {formatCurrency(total)}
          </button>
          <div className="secure-note"><ShieldCheck size={14} /> Checkout simulado · Nenhuma cobrança será feita</div>
        </form>

        <aside className="summary-card">
          <h2>Resumo do pedido</h2>
          <div className="order-mini-list">
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div className="order-mini-line" key={`${item.productId}-${item.size}`}>
                  <span>{item.quantity}× {product.name} · tam. {item.size}</span>
                  <strong>{formatCurrency(product.price * item.quantity)}</strong>
                </div>
              );
            })}
          </div>
          <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          {discounts > 0 && <div className="summary-line discount"><span>Descontos</span><span>− {formatCurrency(discounts)}</span></div>}
          <div className="summary-line"><span>Entrega</span><span>{total >= 399 ? "Grátis" : "Calculada"}</span></div>
          <div className="summary-total"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </aside>
      </div>
    </div>
  );
}
