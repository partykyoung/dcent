import { type HTMLAttributes, type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { ModalRoot, ModalBackdrop } from "../modal";

interface BottomSheetRootProps extends PropsWithChildren {
  isOpen: boolean;
}

interface BottomSheetBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

function BottomSheetRoot({ isOpen, children }: BottomSheetRootProps) {
  return (
    <ModalRoot
      isOpen={isOpen}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      {children}
    </ModalRoot>
  );
}

function BottomSheetBody({
  children,
  className = "",
  style,
  onClick,
}: BottomSheetBodyProps) {
  return (
    <motion.div
      className={`
        relative bg-white rounded-t-2xl shadow-xl w-full max-h-[90vh] overflow-hidden
        ${className}
      `.trim()}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="px-6 pb-6 max-h-[calc(90vh-48px)] overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}

export {
  BottomSheetRoot as BottomSheet,
  BottomSheetBody,
  ModalBackdrop as BottomSheetBackdrop,
};
