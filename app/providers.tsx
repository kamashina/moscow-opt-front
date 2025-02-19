"use client";
import { getQueryClient } from "@/src/api/api";
import { createIDBPersister } from "@/src/api/persister";
import ErrorSnackbar from "@/src/components/Snackbars/ErrorSnackbar";
import SuccessSnackbar from "@/src/components/Snackbars/SuccessSnackbar";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SnackbarProvider } from "notistack";
import { NuqsAdapter } from "nuqs/adapters/next";
import { FC, PropsWithChildren, useEffect } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();

  useEffect(() => {
    const persister = createSyncStoragePersister({
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });

    persistQueryClient({
      queryClient,
      persister: createIDBPersister(),
      maxAge: 24 * 60 * 60 * 1000,
    });
  }, []);

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        maxSnack={1}
        Components={{ success: SuccessSnackbar, error: ErrorSnackbar }}
        autoHideDuration={2000}
      >
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NuqsAdapter>
      </SnackbarProvider>
    </>
  );
};

export default Providers;
