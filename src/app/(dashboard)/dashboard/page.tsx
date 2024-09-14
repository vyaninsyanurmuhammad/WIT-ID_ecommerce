"use client";

import Navbar from "@/components/navbar";
import React, { useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns, Product } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/query/product.query";

const Dashboard = () => {
  const { data, error, isFetching, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect;

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar className="px-5 xl:px-0" />

      <div className="container mx-auto px-5 pt-40 xl:px-0">
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
          isLoading={isLoading || isFetching}
          error={error}
        />
      </div>
    </div>
  );
};

export default Dashboard;
