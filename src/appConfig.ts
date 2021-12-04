const appConfig = {
  list: {
    //same structure things are kept under list
    sortBy: [
      { label: "Price", value: "price" },
      { label: "Order", value: "order" },
    ],
    categories: [
      { label: "Flip Flops", value: "flip-flops" },
      { label: "Sneakers", value: "sneakers" },
      { label: "Lace-Up Shoes", value: "lace-up" },
      { label: "Shoe Accessories", value: "shoe-accessories" },
    ],
  },
  availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  rangeSliderStep: 1,
  uiConfigs: {
    sidebarPadding: "3rem",
  },
};

export { appConfig };
