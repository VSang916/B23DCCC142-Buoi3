import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
}

const loadProductsFromLocalStorage = (): Product[] => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productsSlice = createSlice({
  name: "products",
  initialState: loadProductsFromLocalStorage(),
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const updatedState = [...state, action.payload];
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((product) => product.id !== action.payload);
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { id, name, price } = action.payload;
      const updatedState = state.map((product) =>
        product.id === id ? { ...product, name, price } : product
      );
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
