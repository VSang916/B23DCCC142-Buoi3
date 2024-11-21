import React from "react";
import EditProductForm from "../components/EditProductForm";

const EditProductPage: React.FC = () => {
  return (
    <div>
      <EditProductForm setVisibleForm={() => {}} idSanPham={0} />
    </div>
  );
};

export default EditProductPage;
