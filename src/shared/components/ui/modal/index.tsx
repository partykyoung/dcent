import { type HTMLAttributes, type PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalRootProps extends PropsWithChildren {
  isOpen: boolean;
}

interface ModalBackdropProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

interface ModalBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

function ModalRoot({ isOpen, children }: ModalRootProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBackdrop({ onClick, className, style }: ModalBackdropProps) {
  return (
    <motion.div
      className={`fixed inset-0 bg-black/50 ${className || ""}`}
      style={style}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}

function ModalBody({
  children,
  className = "",
  style,
  onClick,
}: ModalBodyProps) {
  return (
    <motion.div
      className={`
        relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4
        ${className}
      `.trim()}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

const Modal = Object.assign(ModalRoot, {
  Backdrop: ModalBackdrop,
  Body: ModalBody,
});

export { Modal };
