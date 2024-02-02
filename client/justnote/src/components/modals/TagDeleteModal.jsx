import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TagDeleteModal({visible, onClose, onSubmit}) {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить тег?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Тег буден удален из всех заметок, содержащих его.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Отменить</Button>
                <Button variant="primary" onClick={onSubmit}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    )
}
