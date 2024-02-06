import React from 'react';
import styles from './TagDeleteButton.module.css';

import DeleteIcon from '../icons/DeleteIcon';

export default function TagDeleteButton({onClick}) {
    return (
        <button icon={Delete} onClick={onClick} className={styles.tagDeleteBtn}>
            <DeleteIcon />
        </button>
    )
}
