import { DappList } from "./dapp-list";
import { FavoritesList } from "./favorites-list";

function MainPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <FavoritesList />
      <DappList />
    </div>
  );
}

export { MainPage };
