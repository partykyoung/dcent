import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { fetchDappList, fetchDappListInDev } from "./apis/dapp-list/api";
import type { DappItem as DappItemType } from "./apis/dapp-list/schema";
import { filterDappList } from "./utils/filter-dapp-list";
import {
  currentDeviceAtom,
  currentLanguageAtom,
} from "../../../app/stores/environment";
import DetailBottomSheet from "./uis/detail-bottom-sheet";

const isDev = import.meta.env.DEV;

interface DappItemProps {
  dapp: DappItemType;
  onItemClick?: (dapp: DappItemType) => void;
  language?: "en" | "ko";
}

function DappItem({ dapp, onItemClick, language = "ko" }: DappItemProps) {
  const handleClick = () => {
    onItemClick?.(dapp);
  };

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-base-200 cursor-pointer transition-colors border-b border-base-300 last:border-b-0"
      onClick={handleClick}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div className="avatar mr-4">
          <div className="w-12 h-12 rounded-xl">
            <img
              src={dapp.icon}
              alt={dapp.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-icon.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base text-base-content truncate">
            {dapp.name}
          </h3>
          <p className="text-sm text-base-content/70 truncate mt-1">
            {dapp.description[language]}
          </p>
        </div>
      </div>
    </div>
  );
}

function DappList() {
  const currentDevice = useAtomValue(currentDeviceAtom);
  const currentLanguage = useAtomValue(currentLanguageAtom);
  const [selectedDapp, setSelectedDapp] = useState<DappItemType | undefined>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dappList"],
    queryFn: isDev ? fetchDappListInDev : fetchDappList,
    select: (data) => {
      return filterDappList({
        dappList: data,
        currentDevice: currentDevice as "android" | "ios",
        currentLanguage: currentLanguage as "en" | "ko",
        currentEnvironment: import.meta.env.MODE as "dev" | "stage" | "prod",
      });
    },
  });

  const handleDappClick = (dapp: DappItemType) => {
    setSelectedDapp(dapp);
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
    setSelectedDapp(undefined);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <span className="loading loading-spinner loading-lg" />
          <p className="mt-4 text-base-content/70">목록을 불러오는 중...</p>
        </div>
      )}
      {error && <div>목록을 불러올 수 없습니다.</div>}
      {data && (
        <>
          {data.length === 0 && <></>}
          {data.length > 0 && (
            <ul>
              <li className="mb-[16px">
                {data.map((dapp) => (
                  <DappItem
                    key={dapp.id}
                    dapp={dapp}
                    onItemClick={handleDappClick}
                    language={currentLanguage as "en" | "ko"}
                  />
                ))}
              </li>
            </ul>
          )}
        </>
      )}
      <DetailBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        dappInfo={selectedDapp}
        language={currentLanguage as "en" | "ko"}
      />
    </div>
  );
}

export { DappList };
