"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  GalleryHorizontal,
  MoreHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseImages } from "@/lib/parse";
import AddProductSheet from "./add-product.sheet";
import { useRef, useState } from "react";
import DeleteConfirmDialog from "./delete-confirm.dialog";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import PreviewImage from "./preview-image";
import { useRouter } from "next/navigation";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: Category;
  stock: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

const Actions = ({ product }: { product: Product }) => {
  const router = useRouter()

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleIsSheetOpen = (open: boolean) => setIsSheetOpen(open);

  const handleIsDialogOpen = (open: boolean) => setIsDialogOpen(open);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id.toString())}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            router.push(`/${product.id}`)
          }}>
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleIsSheetOpen(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleIsDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddProductSheet
        mode="UPDATE"
        productId={product.id}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={handleIsSheetOpen}
      />
      <DeleteConfirmDialog
        productId={product.id}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleIsDialogOpen}
      />
    </div>
  );
};

const ImagesDialogView = ({title,  images }: { title:string; images: string[] }) => {
  const swiperRef = useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="max-w-sm overflow-clip truncate">
      <TooltipProvider>
        <Tooltip>
          <Dialog>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <span className="hover:underline cursor-pointer">Click to See Images</span>
              </TooltipTrigger>
            </DialogTrigger>
            <DialogContent className="dark:bg-zinc-900">
            <DialogHeader>
                <DialogTitle>View {title} Gallery</DialogTitle>
                <DialogDescription>
                  Browse through the gallery by swiping left or right. Click the buttons below to navigate between images.
                </DialogDescription>
              </DialogHeader>

              <div className="group relative overflow-hidden">
                <Swiper
                  ref={swiperRef}
                  className={cn(
                    "!h-[500px] w-auto sm:!h-[400px]",
                    "[&_.swiper-pagination]:!bottom-5",
                    "[&_.swiper-pagination-bullet-active-main]:bg-white",
                    "[&_.swiper-pagination-bullet-active-prev]:bg-white",
                    "[&_.swiper-pagination-bullet-active-next]:bg-white",
                  )}
                  spaceBetween={16}
                  slidesPerView={"auto"}
                  centeredSlides
                  modules={[Pagination, Navigation]}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  onSlideChange={() => {}}
                  onSwiper={(swiper) => {}}
                >
                  {images.map((data, index) => (
                    <SwiperSlide key={index} className="!w-full">
                      <PreviewImage image={data} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute left-3 top-1/2 z-50 -translate-y-1/2 transition-all ease-in-out group-hover:left-3 group-hover:opacity-100 lg:left-0 lg:opacity-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="aspect-square w-fit rounded-full bg-[#1e1e1e] p-2 text-white"
                    onClick={() => {
                      handlePrev();
                    }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="absolute right-3 top-1/2 z-50 -translate-y-1/2 transition-all ease-in-out group-hover:right-3 group-hover:opacity-100 lg:right-0 lg:opacity-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="aspect-square w-fit rounded-full bg-[#1e1e1e] p-2 text-white"
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <TooltipContent className="flex flex-col">
            {images.map((data, index) => (
              <span key={index}>{data}</span>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Nama Produk</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi ",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <p className="max-w-sm overflow-clip truncate">{product.description}</p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Harga</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Gambar Produk",
    cell: ({ row }) => {
      const product = row.original;

      const images = parseImages(product.images);

      return <ImagesDialogView title={product.title} images={images} />;
    },
  },
  {
    accessorKey: "category",
    header: "Kategori Produk",
    cell: ({ row }) => {
      const product = row.original;

      return product.category.name;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Stok Produk</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return <Actions product={product} />;
    },
  },
];
