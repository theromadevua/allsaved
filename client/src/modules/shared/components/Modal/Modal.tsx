import { useEffect } from 'react';
import styles from './Modal.module.scss'; import { X } from 'lucide-react'; 

interface ModalProps { 
  isOpen: boolean; 
  onClose: () => void; title: string; 
  children: React.ReactNode; 
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.content}>
        <div className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <div className={styles.close} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
