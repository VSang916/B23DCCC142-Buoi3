import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { deleteProduct } from "../redux/productsReducer";
import AddProductForm from "./AddProductForm";
import Button from "./Button";
import EditProductForm from "./EditProductForm";
import Tooltip from "./Tooltip";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Column<T> {
  label: string;
  field?: keyof T;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
  width?: number;
}

const ProductList: React.FC = () => {
  const products = useSelector((state: { products: Product[] }) => state.products);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSanPham, setIdSanPham] = useState<number | undefined>(undefined);

  const columns: Column<Product>[] = [
    {
      label: "Tên",
      field: "name",
      render: (val, row) => (
        <div style={{ fontWeight: val === "Tổng số" ? "bold" : undefined }}>
          {val}
        </div>
      ),
    },
    {
      label: "Giá",
      field: "price",
      render: (val, row) => (
        <div style={{ fontWeight: row.name === "Tổng số" ? "bold" : undefined }}>
          {val}
        </div>
      ),
    },
    {
      label: "Thao tác",
      render: (_, row) => {
        if (row.name === "Tổng số") {
          return null;
        }
        return (
          <>
            <Button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setIdSanPham(row.id);
              }}
              size="small"
              className="primary"
            >
              Chỉnh sửa
            </Button>

            <Tooltip
              content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"}
              position="left"
            >
              <Button
                onClick={() => dispatch(deleteProduct(row.id))}
                style={{ marginLeft: 8 }}
                size="small"
                className="danger"
              >
                Xóa
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const sumTable = useMemo(() => {
    return products.reduce((pre, cur) => pre + cur.price, 0);
  }, [products]);

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditProductForm
            idSanPham={idSanPham!}
            setVisibleForm={setVisibleForm}
          />
        ) : (
          <AddProductForm setVisibleForm={setVisibleForm} />
        )}
      </Modal>

      <h1>Thông Tin Hàng Hóa</h1>

      <Button
        style={{ marginBottom: 8 }}
        size="medium"
        onClick={() => {
          setVisibleForm(true);
          setIsEdit(false);
        }}
      >
        Thêm Hàng Hóa
      </Button>

      <Table
        columns={columns}
        data={[
          ...products,
          { id: 0, name: "Tổng số", price: sumTable },
        ]}
      />
    </div>
  );
};

export default ProductList;
