import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../../actions";
import style from "./search.module.css";
import Modal from "react-modal";

const SearchBar = ({ isLoading, setIsLoading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
    //console.log("name :", name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Please enter a search term");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    setIsLoading(true);
    try {
      const response = await dispatch(getNameCharacters(name));
      if (!response || response.payload.length === 0) {
        setModalOpen(true);
      } else {
        setMessage("");
      }
    } catch (error) {
      setMessage("An error occurred when searching for characters");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div className={style.loading}>Loading...</div>}
      {message && <div className={style.message}>{message}</div>}
      <Modal isOpen={modalOpen} className={style.Modal}>
        <h2>Pokemon not found</h2>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default SearchBar;
