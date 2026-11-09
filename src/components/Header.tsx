"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">FRETE GRÁTIS A PARTIR DE R$ 399 · PARCELE EM ATÉ 6X</div>
      <header className="site-header">
        <div className="header-inner">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link href="/" className="brand" aria-label="StepZone - início" onClick={closeMenu}>
            <span className="brand-symbol">SZ</span>stepzone<sup>®</sup>
          </Link>
          <nav className={`primary-nav${menuOpen ? " open" : ""}`} aria-label="Navegação principal">
            <Link href="/#colecao" onClick={closeMenu}>Novidades</Link>
            <Link href="/#colecao" onClick={closeMenu}>Masculino</Link>
            <Link href="/#colecao" onClick={closeMenu}>Feminino</Link>
            <Link href="/#stepzone-plus" onClick={closeMenu}>StepZone+</Link>
          </nav>
          <div className="header-actions">
            <Link href="/cart" className="cart-link" aria-label={`Sacola, ${itemCount} itens`}>
              <ShoppingBag size={17} />
              <span className="cart-label">Sacola</span>
              <span className="cart-count">{itemCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
