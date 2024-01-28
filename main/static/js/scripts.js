// Enable Bootstrap Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

$(document).ready(function () {
    $('.note-item').on('click', function () {
        selectNote(this)
    });
});

function selectNote(noteItem) {
    var noteId = $(noteItem).data('note-id');
    console.log("note item clicked: " + noteId);

    $.ajax({
        url: `/ajax/get_note/${noteId}/`,
        method: 'GET',
        dataType: 'json',
        success: function (note) {
            $('#noteEditorTitle').val(note.title);
            $('#noteEditorContent').val(note.content);
            $('#noteEditorCreatedAt').text(note.created_at);

            $('#noteEditorTags').empty();
            note.tags.forEach(tag => {
                $('#noteEditorTags').append($('<div class="note-editor-tag"><span>' + tag.name + '</span></div>'));
            });

            setActiveNote(noteItem);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function setActiveNote(noteItem) {
    $('.note-item').removeClass('active-note');
    $(noteItem).addClass('active-note');
}