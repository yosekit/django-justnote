import React from 'react'
import styles from './NoteCreateButton.module.css';

import { ReactComponent as Plus } from '../../images/plus.svg';
import Button from 'react-bootstrap/Button';


export default function NoteCreateButton({onClick}) {
  return (
    <button className={styles.noteCreateBtn} type='button' onClick={onClick}>
      <Plus/>
    </button>
  )
}
