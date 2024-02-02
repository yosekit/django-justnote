import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function NoteDeleteModal({visible, onClose, onSubmit}) {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить заметку?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Заметка и её содержимое будет удалено без возможности восстановления.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Отменить</Button>
                <Button variant="primary" onClick={onSubmit}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    )
}
