import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MoveUpRight } from "lucide-react";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> SEU PRÓXIMO PASSO COMEÇA AQUI</p>
          <h1>O mundo é seu.<br /><span>Vá no seu ritmo.</span></h1>
          <p className="hero-description">
            Sneakers feitos para acompanhar cada versão de você. Encontre o par
            que transforma qualquer caminho em destino.
          </p>
          <div className="hero-actions">
            <Link href="#colecao" className="button button-dark">
              Explorar coleção <ArrowRight size={17} />
            </Link>
            <span className="hero-note">ESTILO QUE SE MOVE COM VOCÊ</span>
          </div>
          <div className="hero-index"><strong>01</strong><span /> 03</div>
        </div>
        <div className="hero-art">
          <div className="hero-image-frame">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90"
              alt="Tênis esportivo vermelho em destaque"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 55vw"
              className="hero-image"
            />
          </div>
          <div className="hero-caption"><span>STEP INTO YOUR NEXT</span><MoveUpRight size={17} /></div>
          <div className="hero-orbit" aria-hidden="true">SZ</div>
        </div>
        <a className="scroll-cue" href="#colecao" aria-label="Rolar para a coleção">
          <ArrowDown size={16} /> DESCUBRA
        </a>
      </section>

      <section className="promise-strip" aria-label="Benefícios StepZone">
        <span>FRETE GRÁTIS A PARTIR DE R$ 399</span><i />
        <span>ATÉ 6X SEM JUROS</span><i />
        <span>PRIMEIRA TROCA GRÁTIS</span>
      </section>

      <section id="colecao" className="collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOLHIDOS PARA VOCÊ</p>
            <h2>Encontre seu <span>próximo par.</span></h2>
          </div>
          <p className="section-aside">Novos caminhos pedem<br />novos passos.</p>
        </div>
        <ProductCatalog />
      </section>

      <section id="stepzone-plus" className="plus-section">
        <div className="plus-mark">STEPZONE<span>+</span></div>
        <div className="plus-copy">
          <p className="eyebrow">MAIS DO QUE UM CLUBE</p>
          <h2>Seu estilo merece<br />um passo <span>à frente.</span></h2>
          <p>Novidades primeiro, ofertas que fazem sentido e vantagens feitas para quem está sempre em movimento.</p>
          <Link href="#colecao" className="button button-light">
            Quero fazer parte <ArrowRight size={17} />
          </Link>
        </div>
        <div className="plus-perks">
          <div><span>01</span><p>Ofertas<br />exclusivas</p></div>
          <div><span>02</span><p>Lançamentos<br />antecipados</p></div>
          <div><span>03</span><p>Vantagens<br />para sua rotina</p></div>
        </div>
        <div className="plus-orbit" aria-hidden="true">+</div>
      </section>
    </>
  );
}
