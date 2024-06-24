import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DialogProps } from './Dialog.types';
import {
    Overlay,
    DialogContainer,
    Header,
    Title,
    CloseButton,
    Body,
} from './Dialog.styles';

const Dialog = ({ isOpen, onClose, title, children }: DialogProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <Overlay onClick={onClose} role="presentation">
            <DialogContainer
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                ref={dialogRef}
                onClick={(event: React.ChangeEvent<HTMLInputElement>) => event.stopPropagation()}
            >
                <Header>
                    <Title id="dialog-title">{title}</Title>
                    <CloseButton
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        &times;
                    </CloseButton>
                </Header>
                <Body>{children}</Body>
            </DialogContainer>
        </Overlay>,
        document.body
    );
};

export default Dialog;
