import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css"
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
    notes: Note[],
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id:string) => {
            await deleteNote(id);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["request"] });
        }
    });

    return (<ul className={css.list}>
        {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{ note.title}</h2>
                <p className={css.content}>{ note.content}</p>
            <div className={css.footer}>
                <span className={css.tag}>{ note.tag}</span>
                <button className={css.button} onClick={()=>{mutation.mutate(note.id)}}>Delete</button>
            </div>
        </li>
        ))}
    </ul>);
}