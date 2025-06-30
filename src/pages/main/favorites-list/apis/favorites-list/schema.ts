export interface FavoriteItem {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface DeleteFavoriteResponse {
  success: boolean;
  message: string;
  deletedId?: string;
}
