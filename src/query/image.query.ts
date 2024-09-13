import { axiosAPI } from "@/lib/axios";

export const postImage = async (image: { file: File | null }) => {
  const res = await axiosAPI.post("/api/v1/files/upload", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 201) {
    throw new Error("Network response was not ok");
  }
  return res.data;
};
