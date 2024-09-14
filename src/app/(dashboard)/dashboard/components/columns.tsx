"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, GalleryHorizontal, MoreHorizontal } from "lucide-react";

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
import { useState } from "react";
import DeleteConfirmDialog from "./delete-confirm.dialog";

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

      return (
        <div className="max-w-sm overflow-clip truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>Hover Here to See Images Link</span>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col">
                {images.map((data, index) => (
                  <span key={index}>{data}</span>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
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
