import { useAtomValue } from "jotai";
import { BannerListSwiper } from "./uis/banner-list-swiper";
import { currentLanguageAtom } from "../../../app/stores/environment";

function BannerList() {
  const currentLanguage = useAtomValue(currentLanguageAtom);
  
  return (
    <div className="w-full">
      <BannerListSwiper language={currentLanguage as "en" | "ko"} />
    </div>
  );
}

export { BannerList };
