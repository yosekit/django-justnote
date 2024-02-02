import axios from 'axios';
import { Urls } from '../config.js';

export default class NoteService {
    static async ReadAll() {
        let url = Urls.Host + Urls.Api.Notes.ReadAll;
        const response = await axios.get(url);

        return response.data;
    }

    static async Read(pk) {
        let url = Urls.Host + Urls.Api.Notes.Read.replace(':pk', pk);
        const response = await axios.get(url);

        return response.data;
    }

    static async Create() {
        let url = Urls.Host + Urls.Api.Notes.Create;
        const response = await axios.post(url);

        return response.status;
    }

    static async Delete(pk) {
        let url = Urls.Host + Urls.Api.Notes.Delete.replace(':pk', pk);
        const response = await axios.delete(url)

        return response.data;
    }

    static async Update(note) {
        let url = Urls.Host + Urls.Api.Notes.Delete.replace(':pk', note.pk);
        const response = await axios.put(url, note);

        return response.status;
    }
}