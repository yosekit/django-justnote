import React, { useState, useEffect } from 'react';

import NoteService from '../services/NoteService';

import NoteSidebar from '../components/NoteSidebar';
import NoteEditor from '../components/NoteEditor';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Notes() {
    const [notes, setNotes] = useState([]);

    const [activeNote, setActiveNote] = useState(null);
    const [isNoteUpdated, setNoteUpdated] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        let data = await NoteService.ReadAll();
        setNotes(data);
    }

    async function createNote() {
        let data = await NoteService.Create();
        fetchNotes();
    }

    async function deleteNote(pk) {
        let data = await NoteService.Delete(pk);
        fetchNotes();
    }

    async function updateNote(note) {
        let data = await NoteService.Update(note);
        setNoteUpdated(true);
        fetchNotes();
    }

    return (
        <Container style={{ height: 'calc(100% - 80px)', flexGrow: 1, marginTop: '3rem' }}>
            <Row className='h-100'>
                <Col className='md-4 h-100'>
                    <NoteSidebar data={notes}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                    onCreateClick={createNote}
                    onDeleteNote={deleteNote} />
                </Col>

                {activeNote && (
                    <Col className='md-8 h-100'>
                        <NoteEditor data={ activeNote } isNoteUpdated={isNoteUpdated} onUpdateNote={updateNote}/>
                    </Col>
                )}
            </Row>
        </Container>
    )
}
