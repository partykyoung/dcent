import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fetchDappList, fetchDappListInDev } from "./apis/dapp-list/api";
import type { DappItem as DappItemType } from "./apis/dapp-list/schema";
import { filterDappList } from "./utils/filter-dapp-list";
import {
  currentDeviceAtom,
  currentLanguageAtom,
} from "../../../app/stores/environment";
import DetailBottomSheet from "./uis/detail-bottom-sheet";
import type {
  Language,
  Device,
  Environment,
} from "../../../shared/types/common";

const isDev = import.meta.env.DEV;

interface DappItemProps {
  dapp: DappItemType;
  onItemClick?: (dapp: DappItemType) => void;
  language?: Language;
}

function DappItem({ dapp, onItemClick, language = "ko" }: DappItemProps) {
  const handleClick = () => {
    onItemClick?.(dapp);
  };

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-200 last:border-b-0"
      onClick={handleClick}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div className="flex items-center mr-4">
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
          <h3 className="font-medium text-base text-gray-900 truncate">
            {dapp.name}
          </h3>
          <p className="text-sm text-gray-600 truncate mt-1">
            {dapp.description[language]}
          </p>
        </div>
      </div>
    </div>
  );
}

function DappList() {
  const { t } = useTranslation();
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
        currentDevice: currentDevice as Device,
        currentLanguage: currentLanguage as Language,
        currentEnvironment: import.meta.env.MODE as Environment,
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
    <div className="w-full">
      <h2 className="p-4 text-lg font-semibold text-gray-900">
        {t("dapp_list_title")}
      </h2>
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">{t("loading_list")}</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-red-600">{t("error_load_list")}</p>
        </div>
      )}
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
                    language={currentLanguage as Language}
                  />
                ))}
              </li>
            </ul>
          )}
        </>
      )}
      {isBottomSheetOpen && selectedDapp && (
        <DetailBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleBottomSheetClose}
          dappInfo={selectedDapp}
          language={currentLanguage as Language}
        />
      )}
    </div>
  );
}

export { DappList };
