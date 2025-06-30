import { useAtomValue } from "jotai";
import { BannerListSwiper } from "./uis/banner-list-swiper";
import { currentLanguageAtom } from "../../../app/stores/environment";
import type { Language } from "../../../shared/types/common";

function BannerList() {
  const currentLanguage = useAtomValue(currentLanguageAtom);

  return <BannerListSwiper language={currentLanguage as Language} />;
}

export { BannerList };
