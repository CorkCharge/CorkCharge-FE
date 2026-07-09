import { cn } from '@/shared/utils/utils';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, hasCloseButton = false, className }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={'fixed inset-0 z-[102] flex items-center justify-center bg-black/50'}>
      <div
        className={cn(
          'relative min-w-[300px] rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-white p-6 shadow-lg',
          className
        )}
      >
        {hasCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-black"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
