import type { Product } from "@/types/product";

const shoeImage = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

export const products: Product[] = [
  {
    id: "pulse-runner",
    name: "Pulse Runner",
    category: "Running",
    description:
      "Leveza para ir mais longe. O Pulse Runner combina amortecimento responsivo e cabedal respirável para acompanhar seu ritmo do primeiro ao último quilômetro.",
    price: 429.9,
    originalPrice: 549.9,
    image: shoeImage("photo-1542291026-7eec264c27ff"),
    sizes: [38, 39, 40, 41, 42, 43],
    badge: "Oferta",
  },
  {
    id: "street-low",
    name: "Street Low",
    category: "Casual",
    description:
      "Um clássico urbano com linhas limpas, interior macio e solado de alta aderência. Feito para acompanhar todos os seus planos.",
    price: 349.9,
    image: shoeImage("photo-1600185365483-26d7a4cc7519"),
    sizes: [37, 38, 39, 40, 41, 42],
    badge: "Novo",
  },
  {
    id: "court-classic",
    name: "Court Classic",
    category: "Lifestyle",
    description:
      "Inspiração retrô e versatilidade contemporânea em um tênis que combina com qualquer ocasião.",
    price: 389.9,
    image: shoeImage("photo-1600185365926-3a2ce3cdb9eb"),
    sizes: [37, 38, 39, 40, 41, 42, 43],
  },
  {
    id: "skate-pro",
    name: "Skate Pro",
    category: "Skate",
    description:
      "Construção reforçada, grip preciso e conforto para as sessões mais longas. Pronto para a próxima linha.",
    price: 379.9,
    image: shoeImage("photo-1605348532760-6753d2c43329"),
    sizes: [38, 39, 40, 41, 42, 43, 44],
    badge: "Novo",
  },
  {
    id: "trail-venture",
    name: "Trail Venture",
    category: "Running",
    description:
      "Aderência e estabilidade para sair do asfalto. Uma silhueta versátil para trilhas, parques e caminhos novos.",
    price: 489.9,
    originalPrice: 599.9,
    image: shoeImage("photo-1514989940723-e8e51635b782"),
    sizes: [38, 39, 40, 41, 42, 43],
    badge: "Oferta",
  },
  {
    id: "daily-knit",
    name: "Daily Knit",
    category: "Casual",
    description:
      "Cabedal knit flexível e toque leve para uma rotina sem pausas. O conforto que combina com o seu dia.",
    price: 319.9,
    image: shoeImage("photo-1495555961986-6d4c1ecb7be3"),
    sizes: [36, 37, 38, 39, 40, 41],
  },
  {
    id: "court-heritage",
    name: "Court Heritage",
    category: "Lifestyle",
    description:
      "Detalhes inspirados nas quadras e uma paleta fácil de combinar. Um essencial que nunca sai de cena.",
    price: 399.9,
    image: shoeImage("photo-1551107696-a4b0c5a0d9a2"),
    sizes: [38, 39, 40, 41, 42, 43],
    badge: "Novo",
  },
  {
    id: "urban-skate",
    name: "Urban Skate",
    category: "Skate",
    description:
      "Resistência onde importa e liberdade para se movimentar. Do skatepark para a rua sem trocar de tênis.",
    price: 359.9,
    image: shoeImage("photo-1525966222134-fcfa99b8ae77"),
    sizes: [37, 38, 39, 40, 41, 42, 43],
  },
  {
    id: "tempo-light",
    name: "Tempo Light",
    category: "Running",
    description:
      "Uma passada mais leve começa aqui. Amortecimento equilibrado para seus treinos e caminhadas diárias.",
    price: 459.9,
    image: shoeImage("photo-1552346154-21d32810aba3"),
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: "canvas-one",
    name: "Canvas One",
    category: "Casual",
    description:
      "Minimalista e confortável, com lona resistente e perfil atemporal para acompanhar seu estilo.",
    price: 279.9,
    originalPrice: 329.9,
    image: shoeImage("photo-1520256862855-398228c41684"),
    sizes: [36, 37, 38, 39, 40, 41, 42],
    badge: "Oferta",
  },
  {
    id: "retro-court",
    name: "Retro Court",
    category: "Lifestyle",
    description:
      "Uma leitura atual de um ícone esportivo: confortável, marcante e pronto para entrar na sua rotação.",
    price: 429.9,
    image: shoeImage("photo-1608231387042-66d1773070a5"),
    sizes: [37, 38, 39, 40, 41, 42, 43],
  },
  {
    id: "grip-skate",
    name: "Grip Skate",
    category: "Skate",
    description:
      "A base estável que sua sessão pede, com reforços duráveis e uma silhueta feita para a rua.",
    price: 339.9,
    image: shoeImage("photo-1495555961986-6d4c1ecb7be3"),
    sizes: [38, 39, 40, 41, 42, 43],
    badge: "Novo",
  },
];
