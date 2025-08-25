// hooks/useModalHistory.js
import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook to sync modal state with browser history
 * @param {string} modalKey - Unique identifier for the modal (e.g., 'categoryModal', 'itemModal')
 * @param {boolean} isOpen - Current modal open state
 * @param {function} onClose - Function to call when modal should close
 * @param {object} options - Additional options
 * @param {boolean} options.replace - Whether to replace current history entry instead of pushing new one
 * @returns {object} - Helper functions for modal management
 */
export const useModalHistory = (modalKey, isOpen, onClose, options = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { replace = false } = options;

  // Check if modal should be open based on URL
  const modalOpenFromUrl = new URLSearchParams(location.search).get('modal') === modalKey;

  // Open modal and update URL
  const openModal = useCallback((modalData = null) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('modal', modalKey);
    
    // Store additional modal data if provided
    if (modalData) {
      searchParams.set('modalData', JSON.stringify(modalData));
    }
    
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    
    if (replace) {
      navigate(newUrl, { replace: true });
    } else {
      navigate(newUrl);
    }
  }, [modalKey, location.pathname, location.search, navigate, replace]);

  // Close modal and update URL
  const closeModal = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('modal');
    searchParams.delete('modalData');
    
    const newSearch = searchParams.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    
    navigate(newUrl);
    
    // Call the provided onClose callback
    if (onClose) {
      onClose();
    }
  }, [location.pathname, location.search, navigate, onClose]);

  // Get modal data from URL
  const getModalData = useCallback(() => {
    const modalDataParam = new URLSearchParams(location.search).get('modalData');
    if (modalDataParam) {
      try {
        return JSON.parse(modalDataParam);
      } catch (e) {
        console.warn('Failed to parse modal data from URL:', e);
        return null;
      }
    }
    return null;
  }, [location.search]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const shouldBeOpen = modalOpenFromUrl;
    
    if (shouldBeOpen && !isOpen) {
      // Modal should be open but isn't - this happens when user navigates forward
      // Don't automatically open, let the component handle it
    } else if (!shouldBeOpen && isOpen) {
      // Modal is open but shouldn't be - this happens when user navigates back
      if (onClose) {
        onClose();
      }
    }
  }, [modalOpenFromUrl, isOpen, onClose]);

  // Clean up URL when component unmounts and modal was open
  useEffect(() => {
    return () => {
      if (isOpen && modalOpenFromUrl) {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('modal') === modalKey) {
          searchParams.delete('modal');
          searchParams.delete('modalData');
          const newSearch = searchParams.toString();
          const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
          navigate(newUrl, { replace: true });
        }
      }
    };
  }, []); // Only run on unmount

  return {
    openModal,
    closeModal,
    getModalData,
    isModalOpenFromUrl: modalOpenFromUrl,
    shouldOpenModal: modalOpenFromUrl && !isOpen
  };
};

/**
 * Custom hook for nested modals (modal within modal)
 * @param {string} modalKey - Unique identifier for the modal
 * @param {boolean} isOpen - Current modal open state  
 * @param {function} onClose - Function to call when modal should close
 * @param {string} parentModalKey - Key of parent modal
 * @returns {object} - Helper functions for nested modal management
 */
export const useNestedModalHistory = (modalKey, isOpen, onClose, parentModalKey) => {
  const navigate = useNavigate();
  const location = useLocation();

  // For nested modals, we use a different parameter name
  const nestedModalKey = `nested_${modalKey}`;
  const modalOpenFromUrl = new URLSearchParams(location.search).get('nestedModal') === modalKey;

  const openModal = useCallback((modalData = null) => {
    const searchParams = new URLSearchParams(location.search);
    
    // Ensure parent modal is also in URL
    if (parentModalKey && !searchParams.get('modal')) {
      searchParams.set('modal', parentModalKey);
    }
    
    searchParams.set('nestedModal', modalKey);
    
    if (modalData) {
      searchParams.set('nestedModalData', JSON.stringify(modalData));
    }
    
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  }, [modalKey, parentModalKey, location.pathname, location.search, navigate]);

  const closeModal = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('nestedModal');
    searchParams.delete('nestedModalData');
    
    const newSearch = searchParams.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    
    navigate(newUrl);
    
    if (onClose) {
      onClose();
    }
  }, [location.pathname, location.search, navigate, onClose]);

  const getModalData = useCallback(() => {
    const modalDataParam = new URLSearchParams(location.search).get('nestedModalData');
    if (modalDataParam) {
      try {
        return JSON.parse(modalDataParam);
      } catch (e) {
        console.warn('Failed to parse nested modal data from URL:', e);
        return null;
      }
    }
    return null;
  }, [location.search]);

  useEffect(() => {
    const shouldBeOpen = modalOpenFromUrl;
    
    if (!shouldBeOpen && isOpen) {
      if (onClose) {
        onClose();
      }
    }
  }, [modalOpenFromUrl, isOpen, onClose]);

  return {
    openModal,
    closeModal,
    getModalData,
    isModalOpenFromUrl: modalOpenFromUrl,
    shouldOpenModal: modalOpenFromUrl && !isOpen
  };
};
