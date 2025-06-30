import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  fetchFavoritesList,
  fetchFavoritesListInDev,
  deleteFavorite,
  deleteFavoriteInDev,
} from "./apis/favorites-list/api";
import type { FavoriteItem } from "./apis/favorites-list/schema";
import { DeleteModal } from "./uis/delete-modal";

const isDev = import.meta.env.DEV;

interface FavoriteItemProps {
  favorite: FavoriteItem;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function FavoriteItem({ favorite, onDelete, isDeleting }: FavoriteItemProps) {
  const handleItemClick = () => {
    window.open(favorite.url, "_blank");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(favorite.id);
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-base-200 cursor-pointer transition-colors border-b border-base-300 last:border-b-0">
      <div
        className="flex items-center flex-1 min-w-0"
        onClick={handleItemClick}
      >
        <div className="avatar mr-4">
          <div className="w-12 h-12 rounded-xl">
            <img
              src={favorite.icon}
              alt={favorite.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-icon.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base text-base-content truncate">
            {favorite.name}
          </h3>
          <p className="text-sm text-base-content/70 truncate mt-1">
            {favorite.url}
          </p>
        </div>
      </div>

      <button
        className="btn btn-ghost btn-sm ml-2 text-error hover:bg-error/10"
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

function FavoritesList() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    itemId: string | null;
    itemName: string | null;
  }>({
    isOpen: false,
    itemId: null,
    itemName: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["favoritesList"],
    queryFn: isDev ? fetchFavoritesListInDev : fetchFavoritesList,
  });

  const deletingId = useRef<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: isDev ? deleteFavoriteInDev : deleteFavorite,
    onMutate: (id: string) => {
      deletingId.current = id;
    },
    onSuccess: () => {
      if (!isDev) {
        queryClient.invalidateQueries({ queryKey: ["favoritesList"] });
      }
    },
    onSettled: () => {
      deletingId.current = null;
    },
  });

  const handleDelete = (id: string) => {
    const item = data?.find((favorite: FavoriteItem) => favorite.id === id);
    setDeleteModalState({
      isOpen: true,
      itemId: id,
      itemName: item?.name || null,
    });
  };

  const confirmDelete = () => {
    if (deleteModalState.itemId) {
      deleteMutation.mutate(deleteModalState.itemId);
      setDeleteModalState({ isOpen: false, itemId: null, itemName: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModalState({ isOpen: false, itemId: null, itemName: null });
  };

  return (
    <div className="w-full">
      <div className="mb-4 px-4">
        <h2 className="text-lg font-semibold text-base-content">
          {t("favorites")}
        </h2>
      </div>
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <span className="loading loading-spinner loading-lg" />
          <p className="mt-4 text-base-content/70">{t("loading_favorites")}</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-error">{t("error_load_favorites")}</p>
        </div>
      )}
      {data && (
        <>
          {data.length === 0 && (
            <>
              <div className="flex flex-col items-center justify-center p-12">
                <p className="text-base-content/70 text-center">
                  {t("no_favorites")}
                  <br />
                  {t("no_favorites_description")}
                </p>
              </div>
            </>
          )}
          {data.length > 0 && (
            <ul className="w-full">
              {data.map((favorite) => (
                <FavoriteItem
                  key={favorite.id}
                  favorite={favorite}
                  onDelete={handleDelete}
                  isDeleting={deletingId.current === favorite.id}
                />
              ))}
            </ul>
          )}
        </>
      )}
      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        siteName={deleteModalState.itemName || undefined}
      />
    </div>
  );
}

export { FavoritesList };
