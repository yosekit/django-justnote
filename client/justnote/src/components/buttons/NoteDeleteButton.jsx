import React from 'react';
import styles from './NoteDeleteButton.module.css';

import DeleteIcon from '../icons/DeleteIcon';

export default function NoteDeleteButton({onClick}) {
    return (
        <button className={styles.deleteBtn} onClick={onClick}>
        </button>
    )
}
