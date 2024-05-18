import { FiSearch } from "react-icons/fi";
import style from "./Form.module.css";
import { useState } from "react";

export const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return alert("Can not be empty");
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        onChange={handleChange}
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        value={query}
        required
        autoFocus
      />
    </form>
  );
};
