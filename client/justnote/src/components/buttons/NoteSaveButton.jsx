import React from 'react';
import styles from './NoteSaveButton.module.css';

import Button from 'react-bootstrap/esm/Button';

export default function NoteSaveButton({state, onClick}) {
    return (
        <Button type='submit' className={[styles.saveBtn, state].join(' ')} onClick={onClick}>
        </Button>
    )
}
