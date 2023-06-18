interface category {
  id: string
  title: string
}

interface record {
  id: string
  purchaseDate: Date
  boughtPrice: number
}


interface product {
  id: string
  name: string
  price: number
  description: string
  img: string
  categories: category[]
  isAvailable: boolean
  sales: record[]
}

const dummyProducts: product[] = [
  {
    id: "prod1",
    name: "empanadas de jamon y queso reeeeeeeeeeee largaaaaaaaaa",
    price: 500,
    description: "empanadas de jamon y queso, riqui riqui",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }
    ],
    isAvailable: true,
    sales: [
      {
        id: "s-1",
        purchaseDate: new Date("2023-03-20"),
        boughtPrice: 480,
      },
      {
        id: "s-1",
        purchaseDate: new Date("2023-04-05"),
        boughtPrice: 500,
      }
    ]
  },
  {
    id: "prod2",
    name: "empanadas de carne bro",
    price: 500,
    description: "empanadas de carnoscaaa",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod3",
    name: "pizza de muzza",
    price: 1600,
    description: "piza de muza, muy rica bro aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod4",
    name: "hamburgesa con queso",
    price: 2500,
    description: "paty con queso bro",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod5",
    name: "fideos con solo tuco",
    price: 1500,
    description: "fideos con SOLO TUCO >:(",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
  {
    id: "prod6",
    name: "agua",
    price: 100,
    description: "aguita refrescante :D",
    img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg",
    categories: [{
      id: "c-1",
      title: "Food"
    }, {
      id: "c-2",
      title: "Snacks"
    }],
    isAvailable: true,
    sales: []
  },
];

export { dummyProducts };