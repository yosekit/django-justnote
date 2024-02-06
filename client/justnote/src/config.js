export const Urls = {
    // DEBUG
    // Host: "http://127.0.0.1:8000/",
    // PRODUCTION
    Host: "http://mos202.pythonanywhere.com/",
    Api: {
        Notes: {
            ReadAll: "api/notes/",
            Read: "api/note/:pk/",
            Create: "api/note/create/",
            Delete: "api/note/delete/:pk/",
            Update: "api/note/update/:pk/"
        },
        Tags: {
            ReadAll: "api/tags/",
            ReadExcept: "api/tags/except/:note_pk/",
            Create: "api/tag/create/",
            Delete: "api/tag/delete/:pk/",
            AddToNote: "api/tag/add/:tag_pk/to/note/:note_pk/",
            RemoveFromNote: "api/tag/remove/:tag_pk/from/note/:note_pk/"
        }
    }
}
