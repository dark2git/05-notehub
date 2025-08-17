import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import { useEffect } from "react";
//import NoteForm from "../NoteForm/NoteForm";
//import { Formik, Form,Field  } from "formik";

interface ModalProps {
    onClose: () => void,
    //onMutation: (value: boolean) => void,
    children: React.ReactNode,
}

export default function Modal({ onClose, children }:ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);
    
    function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }


    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                    {children}
            </div>
        </div>,
        document.body
    );
}