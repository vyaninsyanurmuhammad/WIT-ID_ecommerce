"use client";

import queryClient from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const QueryProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
