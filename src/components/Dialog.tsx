import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { animated } from '@react-spring/web';
import { AriaDialogProps } from '@react-types/dialog';
import React from 'react';
import { CSSProperties } from 'styled-components';

interface DialogProps {
  title?: string;
}

interface OverlayProps {
  /** Whether the overlay is currently open. */
  isOpen?: boolean;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default false
   */
  isDismissable?: boolean;
  /** Whether the overlay should close when focus is lost or moves outside it. */
  shouldCloseOnBlur?: boolean;
  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * When user interacts with the argument element outside of the overlay ref,
   * return true if onClose should be called.  This gives you a chance to filter
   * out interaction with elements that should not dismiss the overlay.
   * By default, onClose will always be called on interaction outside the overlay ref.
   */
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
}

type ModalProps = OverlayProps &
  AriaDialogProps &
  DialogProps & {
    containerStyles: CSSProperties;
  };

const ModalDialog: React.FC<ModalProps> = (props) => {
  const { title, children, containerStyles } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...underlayProps}
    >
      {/* eslint-disable-next-line jsx-a11y/no-autofocus  */}
      <FocusScope contain restoreFocus autoFocus>
        <animated.div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: '#000000',
            color: '#ffffff',
            padding: '40px 16px',
            marginBottom: 64,
            borderRadius: 16,
            boxShadow: `0.3px 0.3px 2.2px rgba(0, 0, 0, 0.02), 0.7px 0.8px 5.3px rgba(0, 0, 0, 0.028),
            1.3px 1.5px 10px rgba(0, 0, 0, 0.035), 2.2px 2.7px 17.9px rgba(0, 0, 0, 0.042),
            4.2px 5px 33.4px rgba(0, 0, 0, 0.05), 10px 12px 80px rgba(0, 0, 0, 0.07)`,
            ...containerStyles,
          }}
        >
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
          {children}
        </animated.div>
      </FocusScope>
    </div>
  );
};

export { ModalDialog };
