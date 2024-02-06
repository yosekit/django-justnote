import React, { useState } from 'react'
import styles from './NoteList.module.css';

import NoteItem from './NoteItem';
import NoteDeleteModal from '../components/modals/NoteDeleteModal';

export default function NoteList({ notes, activeNote, onNoteClick, onDeleteNote }) {
    const [deletedNote, setDeletedNote] = useState(-1);
    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const openModal = (pk) => {
        setModalOpen(true);
        setDeletedNote(pk);
    }
    const handleDelete = () => {
        onDeleteNote(deletedNote);
        closeModal();
    };

    return (
        <>
            <ul className={styles.list}>
                {notes.map(note =>
                    <NoteItem key={note.pk} note={note}  
                    isActive={activeNote?.pk === note.pk} 
                    onClick={() => onNoteClick(note)} 
                    onClickDelete={() => openModal(note.pk)} />
                )}
            </ul>

            <NoteDeleteModal visible={isModalOpen} onClose={closeModal} onSubmit={handleDelete}/>
        </>
    )
}
