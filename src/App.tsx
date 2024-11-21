import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <div className="sidebar">
            <div>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Quản lý hàng hóa
              </NavLink>
            </div>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
