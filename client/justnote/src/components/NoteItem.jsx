import React, { useState } from 'react';
import styles from './NoteItem.module.css';

import NoteDeleteButton from './buttons/NoteDeleteButton';
import DateFormatter from '../utilities/DateFormatter';


export default function NoteItem({ note, isActive, onClick, onClickDelete}) {
    const rootStyles = [styles.item];
    if (isActive) {rootStyles.push(styles.active);}

    return (
        <li className={rootStyles.join(' ')} onClick={onClick}>
            <div className={styles.previewMain}>
                <div className={styles.previewBody}>
                    <h4 className={styles.previewTitle}>{ note.title || "Новая заметка" }</h4>
                    <div className={styles.previewContent}><span>{ note.content }</span></div>
                </div>
                <div className={styles.previewControls}>
                    <NoteDeleteButton onClick={onClickDelete}/>
                </div>
            </div>
            <div className={styles.previewFooter}>
                <span className={styles.previewDate}>{ DateFormatter.Format(note.created_at) }</span>
            </div>
        </li>
    )
}
