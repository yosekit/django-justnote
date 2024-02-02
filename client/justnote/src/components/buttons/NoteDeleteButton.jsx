import React from 'react';
import styles from './NoteDeleteButton.module.css';

import { ReactComponent as Delete } from '../../images/delete.svg';
//import Button from 'react-bootstrap/Button';

export default function NoteDeleteButton({onClick}) {
    return (
        <button className={styles.deleteBtn} onClick={onClick}>
            <span><Delete/></span>
        </button>
    )
}
