import React from 'react';
import Modal from 'react-modal';
import ExperienceForm from '../form/ExperienceForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '60vw',
        height: '60vh',
        transform: 'translate(-50%, -50%)',
    },
};

interface ModalProps {
    openModal: () => void;
    closeModal: () => void;
    modalIsOpen: boolean;
    afterOpenModal?: () => void;
    data?: any
}

const ExperienceSectionModal: React.FC<ModalProps> = ({
    openModal,
    closeModal,
    modalIsOpen,
    afterOpenModal,
    data
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
                    <ExperienceForm data={data} closeModal={closeModal} />
                </div>
            </Modal>
        </div>
    );
};

export default ExperienceSectionModal;
