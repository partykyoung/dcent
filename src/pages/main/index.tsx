import { BannerList } from "./bannder-list";
import { DappList } from "./dapp-list";
import { FavoritesList } from "./favorites-list";
import { LanguageToggle } from "./language-toggle";

function MainPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <LanguageToggle />
      <BannerList />
      <FavoritesList />
      <DappList />
    </div>
  );
}

export { MainPage };
