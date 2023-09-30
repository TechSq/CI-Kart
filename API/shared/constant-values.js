const categoryList = [
  {
    id: 1,
    categoryName: "Fashion",
    subCategory: [
      {
        name: "top wear",
        gender: "Men",
        products: ["all top wears", "shirts", "Tshirts"],
      },
      {
        name: "bottom wear",
        gender: "Men",
        products: [
          "jeans",
          "casual trousers",
          "formal trousers",
          "track pants",
          "shorts",
          "cargos",
          "threeforth",
        ],
      },
      {
        name: "women western&maternity wear",
        gender: "Women",
        products: [
          "topwear",
          "dresses",
          "jeans",
          "skirts",
          "shorts",
          "leggings&tights",
          "trousers and capris",
          "pallazos",
        ],
      },
    ],
  },
  {
    id: 2,
    categoryName: "Home&Living",
  },
  {
    id: 3,
    categoryName: "Nature Foods",
  },
];

const OrderStatus = {
  InCart: "InCart",
  Placed: "Placed",
};

module.exports = { categoryList, OrderStatus };
