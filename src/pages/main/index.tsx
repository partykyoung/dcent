import { BannerList } from "./bannder-list";
import { DappList } from "./dapp-list";
import { FavoritesList } from "./favorites-list";

function MainPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <BannerList />
      <FavoritesList />
      <DappList />
    </div>
  );
}

export { MainPage };
