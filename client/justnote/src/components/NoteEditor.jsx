import React, { useState, useEffect } from 'react'
import styles from './NoteEditor.module.css';
import NoteStates from '../NoteStates.js';

import Form from 'react-bootstrap/Form';

import NoteTags from './NoteTags';
import NoteSaveButton from './buttons/NoteSaveButton';
import DateFormatter from '../utilities/DateFormatter';


export default function NoteEditor({ activeNote, isNoteUpdated, onUpdateNote }) {
  const [noteState, setNoteState] = useState(isNoteUpdated ? NoteStates.Saved : NoteStates.Untouched);

  const [titleValue, setTitleValue] = useState(activeNote.title);
  const [contentValue, setContentValue] = useState(activeNote.content);

  useEffect(() => {
    if (activeNote) {
      setTitleValue(activeNote.title);
      setContentValue(activeNote.content);
    }
  }, [activeNote]);

  const OnTitleChange = (e) => {
    setTitleValue(e.target.value);
    setNoteState(NoteStates.Edited);
  };
  const onContentChange = (e) => {
    setContentValue(e.target.value);
    setNoteState(NoteStates.Edited);
  }
  const OnTagsChange = () => {
    setNoteState(NoteStates.Edited);
  };

  return (
    <div className={styles.container}>
      <div className={styles.area}>
        <div className='d-flex flex-column h-100'>
          <Form>
            <div className={styles.header}>
              <Form.Control as='input' type='text' placeholder='Введите название'
              value={titleValue}  
              onChange={OnTitleChange} 
              className={styles.inputTitle} />
              <div className={styles.date}>
                <span>{ DateFormatter.Format(activeNote.created_at) }</span>
              </div>
            </div>
            <div className={styles.body}>
              <Form.Control as='textarea' type='text' placeholder='Напишите заметку...'
              value={contentValue} 
              onChange={onContentChange} 
              className={styles.inputContent} />
            </div>
            <div className={styles.footer}>
              <div className='d-flex flex-row align-items-center justify-content-between'>
                <NoteTags note={activeNote} onChange={OnTagsChange}/>
                <NoteSaveButton state={noteState} onClick={() => {onUpdateNote(activeNote)}} />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
