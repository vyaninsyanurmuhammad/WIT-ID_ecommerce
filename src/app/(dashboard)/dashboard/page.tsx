"use client";

import Navbar from "@/components/navbar";
import React, { useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns, Product } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/query/product.query";
import AddProductSheet from "./components/add-product.sheet";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />

      <div className="container mx-auto pt-40">
        <DataTable
          columns={columns}
          data={
            data
              ? data.sort((a, b) => {
                  const aDate = new Date(a.updatedAt).getTime();
                  const bDate = new Date(b.updatedAt).getTime();

                  return bDate - aDate;
                })
              : []
          }
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Dashboard;
