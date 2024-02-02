import React from 'react';
import styles from './TagDeleteButton.module.css';

import { ReactComponent as Delete } from '../../images/delete.svg';
import Button from 'react-bootstrap/Button';


export default function TagDeleteButton({onClick}) {
    return (
        <button icon={Delete} onClick={onClick} className={styles.tagDeleteBtn}>
            <Delete/>
        </button>
    )
}
