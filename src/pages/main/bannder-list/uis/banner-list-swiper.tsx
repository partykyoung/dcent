import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import { fetchBannerListInDev } from "../apis/banner-list/api";
import type { BannerData } from "../apis/banner-list/schema";
import { useAtomValue } from "jotai";
import { currentLanguageAtom } from "../../../../app/stores/environment";
import type { Language } from "../../../../shared/types/common";
import { Button } from "../../../../shared/components/ui/button";

import "./banner-list-swiper.css";

interface BannerListSwiperProps {
  language?: Language;
}

function BannerListSwiper({ language }: BannerListSwiperProps) {
  const currentLanguage = useAtomValue(currentLanguageAtom);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bannerList"],
    queryFn: fetchBannerListInDev,
  });

  const handleBannerClick = (banner: BannerData) => {
    const link = banner.link[language || (currentLanguage as Language)];
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full h-48">
      {isLoading && (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <span className="text-gray-500">배너 로딩 중...</span>
        </div>
      )}
      {error && (
        <div className="w-full h-48 bg-red-50 rounded-lg flex items-center justify-center">
          <span className="text-red-500">
            {error.message || "배너를 불러오는데 실패했습니다."}
          </span>
        </div>
      )}
      {data && (
        <>
          {data.length === 0 && (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">표시할 배너가 없습니다.</span>
            </div>
          )}
          {data.length > 0 && (
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop
              modules={[Autoplay]}
              slidesPerView={1}
              className="banner-swiper h-full"
            >
              {data.map((banner) => (
                <SwiperSlide key={banner.id} className="w-full h-full">
                  <div
                    className="banner-item cursor-pointer"
                    style={{
                      backgroundImage: `url(${
                        banner.image[currentLanguage as Language]
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => handleBannerClick(banner)}
                  >
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        {banner.title[currentLanguage as Language]}
                      </h3>
                      <p className="text-sm mb-4 opacity-90">
                        {banner.description[currentLanguage as Language]}
                      </p>
                      <Button
                        variant="outline"
                        color="secondary"
                        size="small"
                        className="self-start bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-opacity-30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBannerClick(banner);
                        }}
                      >
                        {banner.buttonText[currentLanguage as Language]}
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </div>
  );
}

export { BannerListSwiper };
