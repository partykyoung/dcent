import { Modal } from "../../../../../shared/components/ui/modal";
import { Button } from "../../../../../shared/components/ui/button";
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
              : t("dapp_favorite_delete_confirm")}
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            color="secondary"
            className="flex-1"
          >
            {t("button_cancel")}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            className="flex-1"
          >
            {t("button_confirm")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
