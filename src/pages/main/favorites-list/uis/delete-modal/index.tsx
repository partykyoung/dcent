import { Modal } from "../../../../../shared/components/ui/modal";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  siteName?: string;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  siteName,
}: DeleteModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Body className="text-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("dapp_favorite_delete")}
          </h2>
          <div className="border-t border-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            {siteName 
              ? t("dapp_favorite_delete_confirm") 
              : t("dapp_favorite_delete_confirm")
            }
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            {t("button_cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {t("button_confirm")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
