import React from "react";
import { useTranslation } from "react-i18next";
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetBody,
} from "../../../../../shared/components/ui/bottom-sheet";
import { Button } from "../../../../../shared/components/ui/button";
import type { DappItem } from "../../apis/dapp-list/schema";
import type { Language } from "../../../../../shared/types/common";

interface DetailBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  dappInfo: DappItem;
  language?: Language;
}

function DetailBottomSheet({
  isOpen,
  onClose,
  dappInfo,
  language = "ko",
}: DetailBottomSheetProps): React.ReactElement {
  const { t } = useTranslation();

  const handleGoClick = () => {
    // DApp으로 이동하는 로직 (임시로 Google 검색)
    const searchQuery = encodeURIComponent(dappInfo.name);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    onClose();
  };

  const description = dappInfo?.description?.[language];

  return (
    <BottomSheet isOpen={isOpen}>
      <BottomSheetBackdrop onClick={onClose} />
      <BottomSheetBody>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {dappInfo.icon ? (
                <img
                  src={dappInfo.icon}
                  alt={dappInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {dappInfo.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {dappInfo.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{t("dapp_type")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("description")}
            </h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGoClick}
              variant="contained"
              color="success"
              size="large"
              className="w-full"
            >
              {t("go_to_dapp")}
            </Button>
          </div>
        </div>
      </BottomSheetBody>
    </BottomSheet>
  );
}

export default DetailBottomSheet;
