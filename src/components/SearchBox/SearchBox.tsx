import css from "./SearchBox.module.css"

interface SearchBoxProps {
    value: string,
    handleChange: (value:string)=>void
}

export default function SearchBox({ value, handleChange }: SearchBoxProps) {
    return (
        <input
          className={css.input}
            type="text"
            value={value}
          placeholder="Search notes"
          onChange={(event)=>handleChange(event.target.value)}
        />
    );
}