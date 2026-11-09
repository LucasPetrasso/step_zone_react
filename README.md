# StepZone

Loja virtual de sneakers desenvolvida com Next.js App Router, React, TypeScript e Tailwind CSS. A experiência inclui catálogo com busca e filtros, páginas de produto, carrinho persistido no navegador e checkout demonstrativo.

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Funcionalidades

- Catálogo responsivo com 12 produtos, pesquisa por nome e filtro por categoria.
- Seleção de tamanho e quantidade na página de cada produto.
- Sacola compartilhada entre páginas, com quantidades, remoção, descontos e persistência em `localStorage`.
- Checkout com dados de entrega e opções demonstrativas de Pix, crédito e débito; não há cobrança real.
- Confirmação e resumo do pedido, armazenados localmente para a página de sucesso.