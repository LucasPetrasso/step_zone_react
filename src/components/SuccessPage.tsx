"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, PackageCheck } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { CompletedOrder } from "@/types/order";

const ORDER_STORAGE_KEY = "stepzone_last_order";
const ORDER_CHANGE_EVENT = "stepzone-order-change";

function getOrderSnapshot() {
  try {
    return window.localStorage.getItem(ORDER_STORAGE_KEY);
  } catch (error) {
    console.error("Não foi possível recuperar os dados do pedido.", error);
    return null;
  }
}

function subscribeToOrder(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(ORDER_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(ORDER_CHANGE_EVENT, onChange);
  };
}

function subscribeToReadiness() {
  return () => {};
}

function isCompletedOrder(value: unknown): value is CompletedOrder {
  if (!value || typeof value !== "object") return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.number === "string" &&
    typeof order.customerName === "string" &&
    typeof order.createdAt === "string" &&
    typeof order.subtotal === "number" &&
    typeof order.discounts === "number" &&
    typeof order.total === "number" &&
    Array.isArray(order.items) &&
    order.items.every((item: unknown) => {
      if (!item || typeof item !== "object") return false;
      const line = item as Record<string, unknown>;
      return (
        typeof line.name === "string" &&
        typeof line.size === "number" &&
        typeof line.quantity === "number" &&
        typeof line.unitPrice === "number"
      );
    })
  );
}

export function SuccessPage() {
  const snapshot = useSyncExternalStore(
    subscribeToOrder,
    getOrderSnapshot,
    () => null,
  );
  const isReady = useSyncExternalStore(
    subscribeToReadiness,
    () => true,
    () => false,
  );
  let order: CompletedOrder | null = null;
  if (snapshot) {
    try {
      const parsed: unknown = JSON.parse(snapshot);
      if (isCompletedOrder(parsed)) {
        order = parsed;
      } else {
        console.error("Os dados do pedido salvo têm um formato inválido.");
      }
    } catch (error) {
      console.error("Não foi possível interpretar os dados do pedido.", error);
    }
  }

  if (!isReady) {
    return <div className="success-wrap" role="status">Carregando os dados do pedido...</div>;
  }

  if (!order) {
    return (
      <div className="success-wrap">
        <div className="success-mark"><PackageCheck size={30} /></div>
        <h1>Nenhum pedido por aqui.</h1>
        <p>Esta página aparece depois da confirmação de uma compra. Sua sacola continua disponível para você.</p>
        <Link href="/#colecao" className="button button-dark">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="success-wrap">
      <div className="success-mark"><Check size={32} /></div>
      <p className="eyebrow">PEDIDO CONFIRMADO</p>
      <h1>Um novo caminho começa agora.</h1>
      <p>Obrigado, {order.customerName}. Seu pedido foi registrado com sucesso. Esta é uma confirmação de demonstração; nenhum pagamento real foi processado.</p>
      <div className="order-number">PEDIDO {order.number}</div>
      <section className="success-summary">
        <h2>Resumo da compra</h2>
        {order.items.map((item, index) => (
          <div className="success-summary-line" key={`${item.name}-${item.size}-${index}`}>
            <span>{item.quantity}× {item.name} · tamanho {item.size}</span>
            <strong>{formatCurrency(item.unitPrice * item.quantity)}</strong>
          </div>
        ))}
        <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
        {order.discounts > 0 && <div className="summary-line discount"><span>Descontos</span><span>− {formatCurrency(order.discounts)}</span></div>}
        <div className="success-total"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
      </section>
      <Link href="/" className="button button-dark">Continuar explorando</Link>
    </div>
  );
}
