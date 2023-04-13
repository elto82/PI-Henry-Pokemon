import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCharacter, getTypes } from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./create.module.css";
import Modal from "react-modal";

const Create = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    //console.log("input", input);
  };

  const handleSelectType = (e) => {
    const selectedType = e.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      types: [...prevInput.types, selectedType],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      types: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postCharacter(input));
    setModalIsOpen(true);
  };

  const validate = (input) => {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    }

    if (/\d/.test(input.name)) {
      errors.name = "Name cannot contain numbers";
    }

    if (input.hp < 1 || input.hp > 200) {
      errors.hp = "the value of life must be between 1 and 200";
    }

    if (input.attack < 1 || input.attack > 200) {
      errors.attack = "the value attack must be between 1 and 200";
    }

    if (input.defense < 1 || input.defense > 200) {
      errors.defense = "The value of defense  must be between 1 and 200";
    }

    if (input.image === "") {
      errors.image = "Image URL is required";
    }
    if (input.types) {
      errors.types = "At least one type is required";
    }
    return errors;
  };

  useEffect(() => {
    const requiredFields = [
      "name",
      "hp",
      "attack",
      "defense",
      "image",
      "types",
    ];
    const allFieldsHaveValue = requiredFields.every((field) => input[field]);
    setButtonDisabled(!allFieldsHaveValue);
  }, [input]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Link to={"/home"}>
        <button className={style.btnHome}>Home</button>
      </Link>

      <h1 className={style.titleCreate}>Create your character</h1>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.divInputForm}>
          <label className={style.labelForm}>Name:</label>
          <input
            className={style.inputForm}
            type={"text"}
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className={style.errorForm}>{errors.name}</p>}
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Life:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.hp}
            name="hp"
            onChange={handleChange}
          />
          {errors.hp && <p className={style.errorForm}>{errors.hp}</p>}
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Attack:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.attack}
            name="attack"
            onChange={handleChange}
          />
          {errors.attack && <p className={style.errorForm}>{errors.attack}</p>}
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Defense:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.defense}
            name="defense"
            onChange={handleChange}
          />
          {errors.defense && (
            <p className={style.errorForm}>{errors.defense}</p>
          )}
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Speed:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.speed}
            name="speed"
            onChange={handleChange}
          />
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Height:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.height}
            name="height"
            onChange={handleChange}
          />
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Weight:</label>
          <input
            className={style.inputForm}
            type={"number"}
            value={input.weight}
            name="weight"
            onChange={handleChange}
          />
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>Image:</label>
          <input
            className={style.inputForm}
            type={"text"}
            value={input.image}
            name="image"
            onChange={handleChange}
          />
          {errors.image && <p className={style.errorForm}>{errors.image}</p>}
        </div>

        <div className={style.divInputForm}>
          <label className={style.labelForm}>types:</label>
          <input
            className={style.inputForm}
            type={"text"}
            value={input.types.join(", ")}
            name="types"
            readOnly={true}
            onChange={handleChange}
          />
          {errors.types && <p className={style.errorForm}>{errors.types}</p>}
        </div>

        <select className={style.selectForm} onChange={handleSelectType}>
          <option className={style.optionForm} value="">
            Select type
          </option>{" "}
          {types.map((type, index) => (
            <option className={style.optionForm} key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <button
          className={style.submitForm}
          type="submit"
          disabled={buttonDisabled}
        >
          Create
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        className={style.modal}
      >
        <div className={style.modalContent}>
          <h2>Created!</h2>
          <button onClick={() => history.push("/home")}>Go to home</button>
        </div>
      </Modal>
    </div>
  );
};

export default Create;
