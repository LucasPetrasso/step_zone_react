import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-symbol">SZ</span>stepzone<sup>®</sup>
          </Link>
          <p className="footer-note">Encontre seu ritmo. Vá mais longe.</p>
        </div>
        <nav className="footer-links" aria-label="Links do rodapé">
          <Link href="/#colecao">Coleção</Link>
          <Link href="/cart">Sacola</Link>
          <Link href="/#stepzone-plus">StepZone+</Link>
        </nav>
        <span className="footer-copy">© 2026 StepZone. Feito para ir mais longe.</span>
      </div>
    </footer>
  );
}
