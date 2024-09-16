import { axiosAPI } from "@/lib/axios";

export const fetchPublicProducts = async ({
  offset = 0,
  limit = 8,
  title = "",
  minPrice,
  maxPrice,
  category,
}: {
  offset: number;
  limit: number;
  title: string;
  minPrice?: string | "";
  maxPrice?: string | "";
  category?: string;
}) => {
  const priceParams: string[] = [];

  if (minPrice !== undefined && minPrice !== "") {
    priceParams.push(`price_min=${minPrice}`);
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    priceParams.push(`price_max=${maxPrice}`);
  }

  const res = await axiosAPI.get(
    `/api/v1/products?offset=${offset}&limit=${limit}&title=${encodeURIComponent(
      title,
    )}${priceParams.length ? `&${priceParams.join("&")}` : ""}${category ? `&categoryId=${encodeURIComponent(category)}` : ""}`,
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
