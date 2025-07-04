import { get } from "../../../../../shared/libs/api";
import type { BannerData } from "./schema";

// Mock data for banner list
const mockBannerData: BannerData[] = [
  {
    id: "map-protocol",
    image: {
      en: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_mapo_en.png",
      ko: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_mapo_kr.png",
    },
    title: {
      en: "MAP Protocol",
      ko: "MAP Protocol",
    },
    description: {
      en: "Tap that drop with MAP Protocol",
      ko: "MAP Protocol과 함께 드롭을 받아보세요",
    },
    link: {
      en: "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
      ko: "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
    },
    buttonText: {
      en: "Learn More",
      ko: "자세히 보기",
    },
  },
  {
    id: "dcent-wallet",
    image: {
      en: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_dcent.png",
      ko: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_dcent.png",
    },
    title: {
      en: "D'CENT Wallet",
      ko: "D'CENT Wallet",
    },
    description: {
      en: "Enhance your security with D'CENT biometric wallet",
      ko: "디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!",
    },
    link: {
      en: "https://store.dcentwallet.com",
      ko: "https://store-kr.dcentwallet.com",
    },
    buttonText: {
      en: "Buy Now",
      ko: "구매하기",
    },
  },
  {
    id: "dcent-blog",
    image: {
      en: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_blog.png",
      ko: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_blog.png",
    },
    title: {
      en: "D'CENT Blog",
      ko: "D'CENT Blog",
    },
    description: {
      en: "Visit the new D'CENT Blog to explore the latest updates first!",
      ko: "새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!",
    },
    link: {
      en: "https://store.dcentwallet.com/blogs/post",
      ko: "https://store-kr.dcentwallet.com/blogs/post",
    },
    buttonText: {
      en: "Explore",
      ko: "확인하기",
    },
  },
];

/**
 * Mock 배너 리스트를 반환하는 함수 (개발용)
 * @returns Promise<BannerData[]> 배너 리스트
 */
export const fetchBannerListInDev = (): Promise<BannerData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBannerData);
    }, 3000);
  });
};

/**
 * 배너 리스트를 서버에서 가져오는 API 함수
 * @returns Promise<BannerData[]> 배너 리스트
 */
export const fetchBannerList = async (): Promise<BannerData[]> => {
  return get<BannerData[]>("/banner-list");
};
