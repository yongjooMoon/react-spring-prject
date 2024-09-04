import React, { useEffect, useRef } from 'react';

const AddressPopup = ({ onClose, onComplete }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const { daum } = window;

    if (daum && popupRef.current) {
      new daum.Postcode({
        oncomplete: (data) => {
          const fullAddress = `${data.address}`;
          onComplete(fullAddress);
          onClose();
        },
        width: '95%',
        height: '95%',
      }).embed(popupRef.current);
    }
  }, [onComplete, onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div ref={popupRef} style={styles.content}></div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '600px',
    height: '600px',
    position: 'relative',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  content: {
    width: '100%',
    height: '100%',
  },
};

export default AddressPopup;
