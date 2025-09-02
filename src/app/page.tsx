"use client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const fetch_: typeof fetch = async (input, init) => {
  const result = await fetch(input, init);
  if (result.ok) return result;
  throw Error("Failed to fetch");
};

const useSave = () => useMutation({ mutationFn: () => fetch_("/api/save", { method: "POST" }) });

const useCanSave = () =>
  useQuery({
    queryKey: ["canSave"],
    queryFn: () => fetch_("/api/can-save", { method: "GET" }).then((res) => res.json()).then((res) => res.canSave),
  });

const useLoad = () => useMutation({ mutationFn: () => fetch_("/api/load", { method: "POST" }) });

const useCanLoad = () =>
  useQuery({
    queryKey: ["canLoad"],
    queryFn: () => fetch_("/api/can-load", { method: "GET" }).then((res) => res.json()).then((res) => res.canLoad),
  });

function Home() {
  const { mutate: save, isPending: isSaving, isError: isSaveError } = useSave();
  const { mutate: load, isPending: isLoading, isError: isLoadError } = useLoad();
  const { data: canSave, isLoading: isLoadingCanSave } = useCanSave();
  const { data: canLoad, isLoading: isLoadingCanLoad } = useCanLoad();

  const handleSave = useCallback(() => {
    save();
  }, [save]);

  const handleLoad = useCallback(() => {
    load();
  }, [load]);

  console.log({ isSaveError, isLoadError });

  return (
    <div className="container m-auto flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Stoneshard Quicksave</p>
          <p className="text-sm">Save and load your game state</p>
          <div className="flex items-center gap-2">
            <button
              className="px-2 bg-sky-700 h-8 w-24 disabled:bg-gray-500"
              type="button"
              disabled={isSaving || !canSave}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              className="px-2 bg-sky-700 h-8 w-24 disabled:bg-gray-500"
              type="button"
              disabled={isLoading || !canLoad}
              onClick={handleLoad}
            >
              {isLoading ? "Loading..." : "Load"}
            </button>
          </div>
        </div>
        {isSaveError && (
          <p className="text-sm text-red-500">Something went wrong saving your game state. Please try again.</p>
        )}
        {isLoadError && (
          <p className="text-sm text-red-500">Something went wrong loading your game state. Please try again.</p>
        )}
        {isLoadingCanSave && <p className="text-sm">Checking if you can save...</p>}
        {isLoadingCanLoad && <p className="text-sm">Checking if you can load...</p>}
        {canSave === false && (
          <p className="text-sm text-red-500">You cannot save. Ensure you exit to main menu first.</p>
        )}
        {canLoad === false && <p className="text-sm text-red-500">You cannot load. Ensure you save first.</p>}
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
