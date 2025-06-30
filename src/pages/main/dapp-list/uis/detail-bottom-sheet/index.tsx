import React from "react";
import { useTranslation } from "react-i18next";
import { BottomSheet } from "../../../../../shared/components/ui/bottom-sheet";
import type { DappItem } from "../../apis/dapp-list/schema";

interface DetailBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  dappInfo?: DappItem;
  language?: "en" | "ko";
}

function DetailBottomSheet({
  isOpen,
  onClose,
  dappInfo,
  language = "ko",
}: DetailBottomSheetProps): React.ReactElement {
  const { t } = useTranslation();
  
  if (!dappInfo) {
    return <></>;
  }

  const handleGoClick = () => {
    // DApp으로 이동하는 로직 (임시로 Google 검색)
    const searchQuery = encodeURIComponent(dappInfo.name);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    onClose();
  };

  const description = dappInfo.description[language];

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      height="auto"
      className="z-50"
    >
      <div className="space-y-6">
        {/* DApp 정보 헤더 */}
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
            <h2 className="text-xl font-bold text-gray-900">{dappInfo.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{t('dapp_type')}</p>
          </div>
        </div>

        {/* Networks */}
        {dappInfo.supportedNetworks &&
          dappInfo.supportedNetworks.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-2">{t('supported_networks')}</p>
              <div className="flex flex-wrap gap-2">
                {dappInfo.supportedNetworks.map((network) => (
                  <span
                    key={network}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {network}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* 설명 섹션 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{t('description')}</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Go 버튼 */}
        <div className="pt-4">
          <button
            onClick={handleGoClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            {t('go_to_dapp')}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default DetailBottomSheet;
