import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "./banner-list-swiper.css";

import { fetchBannerListInDev, type BannerData } from "../apis/banner-list/api";
import { useAtomValue } from "jotai";
import { currentLanguageAtom } from "../../../../app/stores/environment";

interface BannerListSwiperProps {
  language?: "en" | "ko";
}

function BannerListSwiper({ language = "ko" }: BannerListSwiperProps) {
  const currentLanguage = useAtomValue(currentLanguageAtom);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const bannerData = await fetchBannerListInDev();
        setBanners(bannerData);
      } catch (err) {
        setError("배너를 불러오는데 실패했습니다.");
        console.error("Failed to load banners:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  const handleBannerClick = (banner: BannerData) => {
    const link = banner.link[language];
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">배너 로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-48 bg-red-50 rounded-lg flex items-center justify-center">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">표시할 배너가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[160px]">
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
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="w-full h-full">
            <div
              className="banner-item cursor-pointer"
              style={{
                backgroundImage: `url(${banner.image[currentLanguage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleBannerClick(banner)}
            >
              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {banner.title[currentLanguage]}
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  {banner.description[currentLanguage]}
                </p>
                <button
                  className="self-start bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBannerClick(banner);
                  }}
                >
                  {banner.buttonText[currentLanguage]}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { BannerListSwiper };
