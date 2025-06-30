import { get, del } from "../../../../../shared/libs/api";
import type { FavoriteItem, DeleteFavoriteResponse } from "./schema";

const FAVORITES_LIST: FavoriteItem[] = [
  {
    id: "opensea",
    name: "OpenSea",
    icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_opensea.png",
    url: "https://opensea.io",
  },
  {
    id: "moonpay",
    name: "MoonPay",
    icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_moonpay.png",
    url: "https://buy.moonpay.com/v2/buy",
  },
  {
    id: "rarible",
    name: "Rarible",
    icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_rarible.png",
    url: "https://rarible.com/",
  },
];

/**
 * Mock 즐겨찾기 리스트를 반환하는 함수
 * @returns Promise<FavoriteItem[]> 즐겨찾기 리스트
 */
export const fetchFavoritesListInDev = (): Promise<FavoriteItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAVORITES_LIST);
    }, 1500);
  });
};

/**
 * Mock 즐겨찾기 삭제 함수 (개발용)
 * @param id 삭제할 즐겨찾기 ID
 * @returns Promise<DeleteFavoriteResponse> 삭제 결과
 */
export const deleteFavoriteInDev = (
  id: string
): Promise<DeleteFavoriteResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = FAVORITES_LIST.findIndex((item) => item.id === id);

      if (index === -1) {
        reject({
          success: false,
          message: `Favorite item with id '${id}' not found`,
        });
        return;
      }

      // Mock에서는 실제로 삭제하지 않고 성공 응답만 반환
      resolve({
        success: true,
        message: "Favorite item deleted successfully",
        deletedId: id,
      });
    }, 800);
  });
};

/**
 * 즐겨찾기 리스트를 서버에서 가져오는 API 함수
 * @returns Promise<FavoriteItem[]> 즐겨찾기 리스트
 */
export const fetchFavoritesList = async (): Promise<FavoriteItem[]> => {
  return get<FavoriteItem[]>("/favorites-list");
};

/**
 * 즐겨찾기를 서버에서 삭제하는 API 함수
 * @param id 삭제할 즐겨찾기 ID
 * @returns Promise<DeleteFavoriteResponse> 삭제 결과
 */
export const deleteFavorite = async (
  id: string
): Promise<DeleteFavoriteResponse> => {
  return del<DeleteFavoriteResponse>(`/favorites-list/${id}`);
};
