import React, { useState, useEffect } from 'react';
import styles from './NoteTags.module.css';

import TagService from '../services/TagService';

import NoteTag from './NoteTag';
import TagDeleteButton from './buttons/TagDeleteButton';
import TagDeleteModal from './modals/TagDeleteModal';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


export default function NoteTags({ data: note }) {
    const [searchTags, setSearchTags] = useState([]);
    const fetchSearchTags = () => {
        const data = TagService.ReadExcept(note.pk);
        setSearchTags(data);
    }

    const [searchTagName, setSearchTagName] = useState('');
    const handleSearchTag = (event) => {
        setSearchTagName(event.target.value);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div className='d-flex flex-row'>
                <div className={styles.noteTags}>
                    {note.tags.map(tag =>
                        <NoteTag data={tag} key={tag.pk} />
                    )}
                </div>
                <Dropdown>
                    <Dropdown.Toggle className={styles.addTagBtn} onClick={fetchSearchTags}>теги</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {searchTags.map(tag =>
                            <div className={styles.searchTag}>
                                <Dropdown.ItemText className={styles.searchTagText}>{tag.name}</Dropdown.ItemText>
                                <TagDeleteButton onClick={openModal} />
                            </div>
                        )}
                        <Dropdown.Divider />
                        <Form.Control as='input' type='text' value={searchTagName} onChange={handleSearchTag} placeholder='новый...' />
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <TagDeleteModal visible={isModalOpen} onClose={closeModal} onSubmit={closeModal} />
        </>
    )
}
