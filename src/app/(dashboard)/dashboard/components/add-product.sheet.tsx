import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NormalButton from "@/components/normal.button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "./columns";
import { fetchCategorys } from "@/query/category.query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadImageDialog from "./upload-image.dialog";
import UploadedImageCard from "./uploaded-image.card";
import {
  fetchProductById,
  postProduct,
  putProduct,
} from "@/query/product.query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { parseImages } from "@/lib/parse";

type AddProductSheetProps = {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  mode: "ADD" | "UPDATE";
  productId?: number;
};

const AddProductSheet = ({
  mode,
  isSheetOpen,
  setIsSheetOpen,
  productId,
}: AddProductSheetProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<string[]>([]);

  const { data, error, isLoading } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: fetchCategorys,
  });

  const {
    data: productData,
    isFetching: isFetchingProduct,
    error: errorProduct,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: mode === "UPDATE" && !!productId,
  });

  const addProductMutation = useMutation({
    mutationFn: postProduct,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Product added successfully!",
        description: `Response data: ${data.id}`,
      });

      form.reset();
      setImages([]);
      setIsSheetOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error adding product",
        description:
          error?.message || "An error occurred while adding the product.",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: putProduct,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Product updated successfully!",
        description: `Response data: ${data.id}`,
      });

      form.reset();
      setImages([]);
      setIsSheetOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error updating product",
        description:
          error?.message || "An error occurred while updating the product.",
      });
    },
  });

  const FormSchema = yup.object({
    title: yup
      .string()
      .min(2, "Nama Produk harus memiliki minimal 2 karakter.")
      .required("Nama Produk wajib diisi."),
    description: yup
      .string()
      .min(2, "Deskripsi harus memiliki minimal 2 karakter.")
      .required("Deskripsi wajib diisi."),
    price: yup
      .number()
      .typeError("Harga harus berupa angka.")
      .min(0, "Harga harus lebih besar dari atau sama dengan 0.")
      .required("Harga wajib diisi."),
    categoryId: yup.number().required("Kategori wajib diisi."),
    stock: yup
      .number()
      .typeError("Harga harus berupa angka.")
      .min(1, "Stok harus lebih besar dari atau sama dengan 1.")
      .required("Stok wajib diisi."),
    images: yup
      .array()
      .of(yup.string().required("Gambar tidak boleh kosong."))
      .min(1, "Harap tambahkan setidaknya satu gambar.")
      .required("Gambar wajib diisi."),
  });

  const form = useForm<yup.InferType<typeof FormSchema>>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryId: undefined,
      stock: 1,
      images: [],
    },
  });

  const onSubmit = (values: yup.InferType<typeof FormSchema>) => {
    if (mode === "ADD") {
      addProductMutation.mutate(values);
    } else if (mode === "UPDATE") {
      updateProductMutation.mutate({ id: productId!, ...values });
    }
  };

  useEffect(() => {
    if (mode === "UPDATE" && productData) {
      const imagesParse = parseImages(productData.images);

      form.reset({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        categoryId: productData.category.id,
        stock: productData.stock,
        images: imagesParse,
      });

      setImages(imagesParse);
    }
  }, [mode, productData, form]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent
        key={"product"}
        className="w-full overflow-y-auto font-rubik md:min-w-[768px]"
        aria-hidden="false"
        aria-label="product"
      >
        <SheetHeader>
          <SheetTitle>
            {mode === "ADD" ? "Add New Product" : "Edit Product"}
          </SheetTitle>
          <SheetDescription>
            {mode === "ADD"
              ? "Add a new product to the inventory."
              : "Edit the details of the selected product."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0.5">
                  <FormLabel className="flex items-center justify-end">
                    Nama Produk
                  </FormLabel>
                  <Input
                    className="col-span-3"
                    disabled={
                      addProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                    {...field}
                  />
                  <FormDescription className="col-span-3 col-start-2">
                    Deskripsikan nama produk yang akan ditambahkan. Pastikan
                    nama produk jelas dan mudah dipahami.
                  </FormDescription>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-x-4 gap-y-0.5">
                  <FormLabel className="mt-4 flex justify-end">
                    Deskripsi
                  </FormLabel>
                  <Textarea
                    className="col-span-3"
                    disabled={
                      addProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                    {...field}
                  />
                  <FormDescription className="col-span-3 col-start-2">
                    Berikan deskripsi rinci tentang produk, termasuk fitur
                    utama, manfaat, dan informasi relevan lainnya.
                  </FormDescription>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0.5">
                  <FormLabel className="flex justify-end">Harga</FormLabel>
                  <Input
                    className="col-span-3"
                    type="number"
                    disabled={
                      addProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                    {...field}
                  />
                  <FormDescription className="col-span-3 col-start-2">
                    Masukkan harga produk dalam satuan mata uang yang berlaku.
                    Pastikan harga akurat dan sesuai dengan harga jual produk.
                  </FormDescription>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0.5">
                  <FormLabel className="flex justify-end">Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={
                      addProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                  >
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder={"Select Category"} />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {isLoading ? (
                        <span>Loading...</span>
                      ) : error ? (
                        <span>{error.message}</span>
                      ) : data ? (
                        data.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={`${category.id}`}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <span>No Category</span>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-0.5">
                  <FormLabel className="flex justify-end">
                    Stock Produk
                  </FormLabel>
                  <Input
                    className="col-span-3"
                    type="number"
                    disabled={
                      addProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                    {...field}
                  />
                  <FormDescription className="col-span-3 col-start-2">
                    Masukkan jumlah stok produk yang tersedia. Informasi ini
                    penting untuk mengelola inventaris dan memastikan
                    ketersediaan produk.
                  </FormDescription>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-x-4 gap-y-0.5">
                  <FormLabel className="mt-4 flex justify-end">
                    Gambar Produk
                  </FormLabel>
                  <div className="col-span-3 flex w-full flex-col items-start gap-2">
                    <UploadImageDialog
                      onChange={(image) => {
                        setImages((prev) => [image.location, ...prev]);
                      }}
                      disabled={
                        addProductMutation.isPending ||
                        updateProductMutation.isPending
                      }
                    />
                    <div className="flex w-full flex-col gap-4 rounded-lg border border-input p-3">
                      {images.length ? (
                        images.map((image, index) => (
                          <UploadedImageCard
                            key={index}
                            image={image}
                            index={index}
                            onDeleteClick={() => {
                              setImages((prev) =>
                                prev.filter((data) => data !== image),
                              );
                            }}
                          />
                        ))
                      ) : (
                        <span className="text-sm">No results</span>
                      )}
                    </div>
                  </div>
                  <FormDescription className="col-span-3 col-start-2">
                    Unggah gambar produk yang akan ditambahkan. Pilih gambar
                    berkualitas tinggi yang jelas dan mewakili produk dengan
                    baik. Pastikan ukuran file gambar tidak melebihi 2 MB.
                  </FormDescription>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  addProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                Save changes{" "}
                {(addProductMutation.isPending ||
                  updateProductMutation.isPending) && (
                  <Loader2 className="h-4 w-5 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductSheet;
