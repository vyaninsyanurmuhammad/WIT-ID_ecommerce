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
      <Navbar />

      <div className="container mx-auto px-5 pt-40">
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading || isFetching}
          error={error}
        />
      </div>
    </div>
  );
};

export default Dashboard;
