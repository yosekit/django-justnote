// Enable Bootstrap Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const csrftoken = Cookies.get('csrftoken');

const urls = {
    getNoteEditor: noteId => `/api/get_note_editor/${noteId}/`, 
    createNote: '/api/create_note/',
    deleteNote: '/api/delete_note/',
    updateNote: '/api/update_note/',
}

const NoteState = {
    Untouched: 'untouched',
    Edited: 'edited',
    Saved: 'saved'
};

$(document).ready(function () {
    $('.note-item').on('click', function () {
        setActiveNote(this);
        loadNoteEditor(this);
    });

    $('#noteCreateBtn').on('click', function () {
        createNote();
    });

    $('.note-delete-btn').on('click', function () {
        deletedNoteId = $(this).closest('.note-item').data('note-id');
    });
    $('#noteDeleteBtnConfirm').on('click', function() { 
        deleteNote(deletedNoteId);
    });
});

$(document).on('input', '#noteEditorTitle', function () {
    changeNoteState(NoteState.Edited);
});
$(document).on('input', '#noteEditorContent', function () {
    changeNoteState(NoteState.Edited);
});

$(document).on('click', '#noteSaveBtn', function () {
    updateNote($('#noteEditor').data('active-note-id'));
    changeNoteState(NoteState.Saved);
});


function _httpRecv(url, handler) {
    $.ajax({
        url: url,
        method: 'GET',
        success: handler,
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function _httpSend(url, data, handler) {
    $.ajax({
        url: url,
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin',
        data: data,
        success: handler,
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function getNoteItem(noteId) {
    var noteItems = $('.note-item').filter(function() {
        return $(this).data('note-id') === noteId;
    });

    return noteItems.first()[0];
}

function setActiveNote(noteItem) {
    $('.note-item').removeClass('active-note');
    $(noteItem).addClass('active-note');

    changeNoteState(NoteState.Untouched);
}

function loadNoteEditor(noteItem) {
    let noteId = $(noteItem).data('note-id');
    _httpRecv(urls.getNoteEditor(noteId), response => {
        $('#noteEditorCol').html(response);
    });
}

function createNote() {
    _httpSend(urls.createNote, '', response => {
        location.reload();
        
        // TODO: set active to created note
    });
}

var deletedNoteId = 0;
function deleteNote(noteId) {
    _httpSend(urls.deleteNote, {id: noteId}, response => {
        location.reload();

        // TODO: set active to actived note (if deleted note != actived note)
    });
}

function updateNote(noteId) {
    let data = {
        id: noteId,
        title: $('#noteEditorTitle').val(),
        content: $('#noteEditorContent').val(),
    };

    _httpSend(urls.updateNote, data, response => {
        location.reload();

        // TODO: set active to updated note
    });
}

var currentNoteState = NoteState.Untouched;
function changeNoteState(state) {
    currentNoteState = state;
    changeSaveBtnState(currentNoteState);
}

function changeSaveBtnState(state) {
    let btn = $('#noteSaveBtn');
    btn.removeClass(function(index, className) {
        return (className.match(/\bstate\S+/g) || []).join(' ');
    });

    switch (state) {
        case NoteState.Untouched:
            btn.addClass('state-untouched');
            break;
        case NoteState.Edited:
            btn.addClass('state-edited');
            break;
        case NoteState.Saved:
            btn.addClass('state-saved');
            break;
        default:
            break;
    }
}