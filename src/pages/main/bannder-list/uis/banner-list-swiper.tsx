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
        // autoplay
        loop
        modules={[Autoplay]}
        slidesPerView={1}
        className="banner-swiper h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="w-full h-full">
            <div
              className="banner-item"
              style={{
                backgroundImage: `url(${banner.image[currentLanguage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              ㅎㅇ
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { BannerListSwiper };
