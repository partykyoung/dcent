import React, { useEffect, forwardRef } from "react";

// Bottom Sheet 스타일의 모달
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
  backdrop?: boolean;
  className?: string;
  height?: "auto" | "half" | "full";
}

function BottomSheet(
  {
    isOpen,
    onClose,
    children,
    title,
    closable = true,
    backdrop = true,
    height = "auto",
    className = "",
  }: BottomSheetProps,
  ref: React.ForwardedRef<HTMLDialogElement>
): React.ReactElement {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  React.useImperativeHandle(ref, () => modalRef.current!);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && backdrop && closable) {
      onClose();
    }
  };

  const getHeightClass = () => {
    switch (height) {
      case "half":
        return "h-1/2";
      case "full":
        return "h-full";
      default:
        return "h-auto max-h-[80vh]";
    }
  };

  return (
    <dialog
      ref={modalRef}
      className={`modal modal-bottom ${
        isOpen ? "modal-open" : ""
      } ${className}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal-box w-full max-w-none rounded-t-2xl rounded-b-none ${getHeightClass()}`}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between mb-4 px-2">
            {title && <h3 className="font-bold text-lg">{title}</h3>}
            {closable && (
              <button
                className="btn btn-sm btn-circle btn-ghost ml-auto"
                onClick={onClose}
                aria-label="Close bottom sheet"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-2 pb-4 overflow-y-auto">{children}</div>
      </div>

      {/* Backdrop */}
      {backdrop && (
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose} aria-label="Close bottom sheet">
            close
          </button>
        </form>
      )}
    </dialog>
  );
}

const BottomSheetWithRef = forwardRef(BottomSheet);

// Export both components
export { BottomSheetWithRef as BottomSheet };
export default BottomSheetWithRef;
