import React, { useState } from 'react'
import styles from './NoteList.module.css';

import NoteItem from './NoteItem';
import NoteDeleteModal from '../components/modals/NoteDeleteModal';

export default function NoteList({ data: notes, activeNote, setActiveNote, onDeleteNote }) {
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
                    <NoteItem data={note} key={note.pk} 
                    isActive={activeNote && activeNote.pk === note.pk} onClick={() => {setActiveNote(note);}} 
                    onClickDelete={() => {openModal(note.pk)}} />
                )}
            </ul>

            <NoteDeleteModal visible={isModalOpen} onClose={closeModal} onSubmit={handleDelete}/>
        </>
    )
}
