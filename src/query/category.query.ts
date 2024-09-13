import { axiosAPI } from "@/lib/axios";

export const fetchCategorys = async () => {
  const res = await axiosAPI.get("/api/v1/categories");
  if (res.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};
