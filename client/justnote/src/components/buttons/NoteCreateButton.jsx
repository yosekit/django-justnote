import React from 'react'
import styles from './NoteCreateButton.module.css';

import PlusIcon from '../icons/PlusIcon';

export default function NoteCreateButton({onClick}) {
  return (
    <button className={styles.noteCreateBtn} type='button' onClick={onClick}>
    </button>
  )
}
