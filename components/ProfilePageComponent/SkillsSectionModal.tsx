import React from 'react';
import Modal from 'react-modal';
import SkillsSectionForm from './form/SkillsSectionForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '60vw',
        transform: 'translate(-50%, -50%)',
    },
};

interface ModalProps {
    openModal: () => void;
    closeModal: () => void;
    modalIsOpen: boolean;
    afterOpenModal?: () => void;
}

const SkillsSectionModal: React.FC<ModalProps> = ({
    openModal,
    closeModal,
    modalIsOpen,
    afterOpenModal,
}) => {
    return (
        <div>
            <Modal
                className=''
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
                contentLabel='Category'
                ariaHideApp={false}
            >
                <div>
                    <SkillsSectionForm />
                </div>
            </Modal>
        </div>
    );
};

export default SkillsSectionModal;
