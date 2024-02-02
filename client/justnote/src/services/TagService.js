import axios from 'axios';
import { Urls } from '../config.js';

export default class TagService {
    static async ReadAll() {
        let url = Urls.Host + Urls.Api.Tags.ReadAll;
        const response = await axios.get(url);

        return response.data;
    }

    static async ReadExcept(note_pk) {
        let url = Urls.Host + Urls.Api.Tags.ReadExcept.replace(':note_pk', note_pk);
        const response = await axios.get(url);

        return response.data;
    }

    static async Create(tag) {
        let url = Urls.Host + Urls.Api.Tags.Create;
        const response = await axios.post(url, tag);

        return response.status;
    }

    static async Delete(pk) {
        let url = Urls.Host + Urls.Api.Tags.Delete.replace(':pk', pk);
        const response = await axios.delete(url)

        return response.data;
    }

    static async AddToNote(tag, note) {
        let url = Urls.Host + Urls.Api.Tags.AddToNote
            .replace(':tag_pk', tag.pk).replace(':note_pk', note.pk);
        const response = await axios.put(url);

        return response.status;
    }

    static async RemoveFromNote(tag, note) {
        let url = Urls.Host + Urls.Api.Tags.RemoveFromNote
            .replace(':tag_pk', tag.pk).replace(':note_pk', note.pk);
        const response = await axios.put(url);

        return response.status;
    }
}