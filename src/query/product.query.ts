import { axiosAPI } from "@/lib/axios";

export const fetchPublicProducts = async ({
  offset = 0,
  limit = 8,
  filterTitle = "",
  mode,
}: {
  offset: number;
  limit: number;
  filterTitle: string;
  mode?: string | null;
}) => {
  let price: string = "";

  if (mode) {
    if (mode === "0") {
      price = `&price=100`;
    } else if (mode === "1") {
      price = `&price_min=100&price_max=1000`;
    }
  }

  const res = await axiosAPI.get(
    `/api/v1/products?offset=${offset}&limit=${limit}&title=${encodeURIComponent(
      filterTitle,
    )}${price}`,
  );

  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};

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
