import React, { useState } from 'react'
import styles from './NoteEditor.module.css';
import NoteStates from '../NoteStates.js';

import Form from 'react-bootstrap/Form';

import NoteTags from './NoteTags';
import NoteSaveButton from './buttons/NoteSaveButton';


export default function NoteEditor({ data: note, isNoteUpdated, onUpdateNote }) {
  const [noteState, setNoteState] = useState(isNoteUpdated ? NoteStates.Saved : NoteStates.Untouched);

  const [titleValue, setTitleValue] = useState(note.title);
  const [contentValue, setContentValue] = useState(note.content);

  const handleInputTitle = (event) => {
    setNoteState(NoteStates.Edited);
    setTitleValue(event.target.value);
  };
  const handleInputContent = (event) => {
    setNoteState(NoteStates.Edited);
    setContentValue(event.target.value);
  }
  const handleInputTags = () => {
    setNoteState(NoteStates.Edited);
  };

  return (
    <div className={styles.container}>
      <div className={styles.area}>
        <div className='d-flex flex-column h-100'>
          <Form>
            <div className={styles.header}>
              <Form.Control value={titleValue} as='input' type='text' onChange={handleInputTitle} className={styles.inputTitle} placeholder='Введите название'/>
              <div className={styles.date}>
                <span>{ note.created_at }</span>
              </div>
            </div>
            <div className={styles.body}>
              <Form.Control value={contentValue} as='textarea' type='text' onChange={handleInputContent} className={styles.inputContent} placeholder='Напишите заметку...'/>
            </div>
            <div className={styles.footer}>
              <div className='d-flex flex-row align-items-center justify-content-between'>
                <NoteTags data={note} onChanged={handleInputTags}/>
                <NoteSaveButton state={noteState} onClick={() => {onUpdateNote(note)}} />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
