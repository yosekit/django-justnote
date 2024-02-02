import React from 'react';
import styles from './NoteSidebar.module.css';

import NoteCreateButton from './buttons/NoteCreateButton';
import NoteList from './NoteList';


export default function NoteSidebar({data: notes, activeNote, setActiveNote, onCreateClick, onDeleteNote}) {
    return (
        <div className={styles.container}>
            <div className="d-flex flex-column my-0 mx-auto">
                <div className={styles.controls}>
                    <NoteCreateButton onClick={onCreateClick}/>
                </div>
                <NoteList data={notes} activeNote={activeNote} setActiveNote={setActiveNote} onDeleteNote={onDeleteNote} />
            </div>
        </div>
    )
}
