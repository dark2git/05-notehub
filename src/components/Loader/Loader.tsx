import css from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <ClipLoader color="#ff5e00ff" size={40} />
    </div>
  );
}