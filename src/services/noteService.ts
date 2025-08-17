import axios from "axios";
import type { Note, NoteInputValues } from "../types/note";

interface FetchHttpResponse {
    notes: Note[],
    totalPages:number,
}

interface FetchParams {
    search?: string,
    page: number,
}

export async function fetchNotes(searchText: string, page: number):Promise<FetchHttpResponse> {
    const params:FetchParams = {
    page,
  };

  if (searchText.trim() !== "") {
    params.search = searchText.trim();
  }
    const response = await axios.get<FetchHttpResponse>("https://notehub-public.goit.study/api/notes", {
        params: {
            ...params,
            perPage: 12,
        },
        headers: {
             Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        }
    });
    return response.data;
}

export async function createNote(note: NoteInputValues): Promise<Note> {
    const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", 
        {
            title: note.title,
            content: note.content,
            tag: note.tag,
        },
        {
        headers: {
             Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        }
    });

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
             Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        }
    })

    return response.data;
}