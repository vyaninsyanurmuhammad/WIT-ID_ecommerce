import { axiosAPI } from "@/lib/axios";

export const fetchProducts = async () => {
  const res = await axiosAPI.get("/api/v1/products");
  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};

export const fetchProductById = async (productId: number) => {
  const res = await axiosAPI.get(`/api/v1/products/${productId}`);
  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};

export const postProduct = async (product: {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}) => {
  const res = await axiosAPI.post("/api/v1/products", product);
  if (res.status !== 201) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};

export const putProduct = async (product: {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}) => {
  const res = await axiosAPI.put(`/api/v1/products/${product.id}`, product);
  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};

export const deleteProduct = async (product: { id: number }) => {
  const res = await axiosAPI.delete(`/api/v1/products/${product.id}`);
  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};
