import React from 'react';
import styles from './NoteTag.module.css';


export default function NoteTag({data: tag}) {
  return (
    <div className={styles.noteTag}><span>{ tag.name }</span></div> 
  )
}
