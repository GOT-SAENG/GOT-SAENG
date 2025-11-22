import "./Modal.style.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  showCancel = true,
  confirmButtonStyle = "default", // "default" | "danger" | "primary"
  maxWidth = "400px",
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getConfirmButtonClass = () => {
    switch (confirmButtonStyle) {
      case "danger":
        return "modal-confirm-btn modal-confirm-btn-danger";
      case "primary":
        return "modal-confirm-btn modal-confirm-btn-primary";
      default:
        return "modal-confirm-btn";
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {title && <h2 className="modal-title">{title}</h2>}
        {message && <p className="modal-message">{message}</p>}

        {children && <div className="modal-content">{children}</div>}

        {(onConfirm || showCancel) && (
          <div className="modal-button-group">
            {showCancel && (
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={onClose}
              >
                {cancelText}
              </button>
            )}

            {onConfirm && (
              <button
                type="button"
                className={getConfirmButtonClass()}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
