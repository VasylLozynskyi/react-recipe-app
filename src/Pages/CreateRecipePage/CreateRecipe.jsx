import { Categories } from "../../data/data";
import style from "./createrecipepage.module.scss";

export const CreateRecipe = (props) => {
  const data = props.dataSite;
  return (
    <div className={style.createrecipe_container}>
      <h2>{data.title}</h2>
      <form onSubmit={props.handleSubmit}>
        <div className={style.section}>
          <label htmlFor="title">{data.labelName}</label>
          <input
            type="text"
            name="title"
            id="title"
            style={props.invalid_title}
            onChange={props.handleChange}
            maxLength="30"
          />
          <p className={style.invalid_value}>{props.err_Title}</p>
        </div>
        <div className={style.section}>
          <label htmlFor="category">{data.labelCategory}</label>
          <select name="category" id="category" onChange={props.handleChange}>
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={style.section}>
          <label htmlFor="time">{data.labelTimePrepare}</label>
          <input
            type="number"
            id="time"
            name="time"
            style={props.invalid_time}
            onChange={props.handleChange}
          />
          <p className={style.invalid_value}>{props.err_Time}</p>
        </div>
        <div className={style.section}>
          <label htmlFor="ingredient">{data.labelIngredient}</label>
          {props.inputList.map((x, i) => {
            return (
              <div key={i} className={style.ingradient_name}>
                <input
                  type="text"
                  name="ingredient"
                  placeholder={data.addIngredient.placeholderText}
                  value={x.ingredient || ""}
                  onChange={(e) => props.handleInputChange(e, i)}
                />
                <input
                  type="number"
                  className={style.ingradient_qty}
                  name="weight"
                  placeholder={data.addIngredient.placeholderNumber}
                  value={x.weight || ""}
                  onChange={(e) => props.handleInputChange(e, i)}
                />

                {props.inputList.length !== 1 && (
                  <button
                    className={style.btn_remove}
                    onClick={() => props.handleRemoveClick(i)}
                  >
                    {" "}
                    <span>{data.buttonDelete}</span>
                  </button>
                )}
                {props.inputList.length - 1 === i && (
                  <button
                    className={style.btn_add}
                    onClick={props.handleAddClick}
                  >
                    {data.addIngredient.button}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className={style.section}>
          <label htmlFor="procedure">{data.labelProcedure}</label>
          {props.procedureList.length > 0 ? (
            props.procedureList.map((input, index) => (
              <div key={index} className={style.procedureindex}>
                <p>{`${index + 1} ${data.addProcedure.step}`}</p>
                <textarea
                  label={`textarea ${index + 1}`}
                  onChange={(event) =>
                    props.handleInputProcedureChange(event, index)
                  }
                />
                {props.procedureList.length > 1 ? (
                  <button
                    className={style.btn_remove}
                    onClick={() => props.handleRemoveProcedureItem(index)}
                  >
                    <span>{data.buttonDelete}</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <span>{data.addProcedure.noProcedure}</span>
          )}
          <button style={style.btn_add} onClick={props.handleListProcedureAdd}>
            {data.addProcedure.button}
          </button>
        </div>
        <div className={style.section}>
          <label htmlFor="photo_food">{data.labelFile}</label>
          <input
            type="file"
            name="photo_food"
            id="photo_food"
            style={props.invalid_file}
            onChange={(e) => props.setFileValue(e)}
          />
          <p className={style.invalid_value}>{props.err_File}</p>
        </div>
        <input
          className={style.btn_submit}
          type="submit"
          value={data.buttonSubmitName}
          style={props.invalidSubmit}
        />
      </form>
    </div>
  );
};
