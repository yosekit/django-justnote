import React from 'react';
import styles from './NoteSaveButton.module.css';

import Button from 'react-bootstrap/Button';


export default function NoteSaveButton({state, onClick}) {
    return (
        <button type='submit' className={[styles.saveBtn, state].join(' ')} onClick={onClick}>
        </button>
    )
}
