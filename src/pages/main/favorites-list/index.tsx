import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchFavoritesList,
  fetchFavoritesListInDev,
  deleteFavorite,
  deleteFavoriteInDev,
} from "./apis/favorites-list/api";
import type { FavoriteItem } from "./apis/favorites-list/schema";

const isDev = import.meta.env.DEV;

interface FavoriteItemProps {
  favorite: FavoriteItem;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function FavoriteItemComponent({
  favorite,
  onDelete,
  isDeleting,
}: FavoriteItemProps) {
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
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["favoritesList"],
    queryFn: isDev ? fetchFavoritesListInDev : fetchFavoritesList,
  });

  const deleteMutation = useMutation({
    mutationFn: isDev ? deleteFavoriteInDev : deleteFavorite,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      // 성공 시 리스트 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["favoritesList"] });
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      // 에러 토스트나 알림을 여기에 추가할 수 있습니다
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("즐겨찾기에서 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4 text-base-content/70">즐겨찾기를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-error">즐겨찾기를 불러올 수 없습니다.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="text-6xl mb-4">⭐</div>
        <p className="text-base-content/70 text-center">
          아직 즐겨찾기가 없습니다.
          <br />
          DApp을 즐겨찾기에 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 px-4">
        <h2 className="text-lg font-semibold text-base-content">
          즐겨찾기 ({data.length})
        </h2>
      </div>

      <div className="bg-base-100 rounded-lg overflow-hidden">
        {data.map((favorite) => (
          <FavoriteItemComponent
            key={favorite.id}
            favorite={favorite}
            onDelete={handleDelete}
            isDeleting={deletingId === favorite.id}
          />
        ))}
      </div>
    </div>
  );
}

export { FavoritesList };
