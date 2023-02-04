import { useState } from "react";
import { Categories } from "../../data/data";
import {useNavigate} from "react-router-dom"
import {createRecipe, updateUserParam} from "../../Components/utills/functions"
import style from "./createrecipepage.module.scss"


export const CreateRecipe = (props) => {
    const user = props.user;
    const [title, setTitle]=useState("");
    const [err_Title, setErr_Title]= useState("");
    const [category, setCategory]= useState("All");
    const [time, setTime]= useState(0);
    const [err_Time, setErr_Time]=useState("")
    const [procedureList, setProcedureList] = useState([{}]);
    const [inputList, setInputList] = useState([{}]);
    const [file, setFile] = useState({});
    const [err_File, setErr_File]=useState("")
    const [invalid_title, setInvalid_title]=useState({})
    const [invalid_time, setInvalid_time]=useState({})
    const [invalid_file, setInvalid_file]=useState({})
    const [invalidSubmit, setInvalidSubmit]=useState({})
    const navigate = useNavigate();
    const invalid_style = {border: "1px solid red"};
    // handle input change ingradient
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    }
   
    // handle click event of the Remove ingradient
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    }
   
    // handle click event of the Add ingradient
    const handleAddClick = () => {
      setInputList([...inputList, {}]);
    }
    // handle click event of the Add procedure
    const handleListProcedureAdd = (e) => {
        e.preventDefault();
        setProcedureList([...procedureList, {}])
    }
    // handle input change procedure
    const handleInputProcedureChange = (event, index) => {
        const { value } = event.target
        const newProcedureList = [...procedureList]
        newProcedureList[index].input = value
        newProcedureList[index].input_rank = index + 1
        setProcedureList(newProcedureList)
    }
    // handle click event of the Remove ingradient
    const handleRemoveProcedureItem = (index) => {
        const newList = [...procedureList]
        newList.splice(index, 1)
        setProcedureList(newList)
    }

    const handleChange = (e) => {
        if (e.target.id === "title") setTitle(e.target.value);
        if (e.target.id === "category") setCategory(e.target.value);
        if (e.target.id === "time") setTime(e.target.value);
    }
    const newRecipe = () => {
        let newRecipe = {
            id: Math.floor(Math.random() * 99999),
            idUser: user.uid,
            authorName: user.name,
            title: title,
            recipe: {
                ingradients: inputList,
                procedure: procedureList,
            },
            time : time,
            category: category,
        }
        return newRecipe;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || title.length === 0) {
            setErr_Title("field Recipe name must not be empty"); 
            setInvalid_title(invalid_style);
        } else {setErr_Title(""); setInvalid_title({border: "1px solid gray"})};
        if (!time) {
            setErr_Time("field time to prepare must not be empty");
            setInvalid_time(invalid_style);
        } else {setErr_Time(""); setInvalid_time({border: "1px solid gray"}); } 
        if (!file.name) {
            setErr_File("You must choose a photo file");
            setInvalid_file(invalid_style);
        } else {setErr_File("");  setInvalid_file({border: "1px solid gray"});}
        if (!err_Title) console.dir(err_Title);
        
        if (!err_Title && !err_Time && !err_File && user) {
            createRecipe(newRecipe(), props.user, file)
            updateUserParam(user.uid, "countRecipes", +user.countRecipes+1)
            navigate(`/react-recipe-app/profile/${user.idUrl}`)
            
            setInvalidSubmit({border: "none"});
        } else setInvalidSubmit(invalid_style);
    }

    return (
        <div className={style.createrecipe_container}>
            <h2>New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.section}>
                    <label htmlFor="title">Recipe name</label>
                    <input type="text" name="title" id="title" style={invalid_title} onChange={handleChange}/>
                    <p className={style.invalid_value}>{err_Title}</p>
                </div>
                <div className={style.section}>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" onChange={handleChange} >
                        {Categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                </div>
                <div className={style.section}>
                    <label htmlFor="time">time to prepare (mins)</label>
                    <input type="number" id="time" name="time" style={invalid_time} onChange={handleChange}/>
                    <p className={style.invalid_value}>{err_Time}</p>
                </div>
                <div className={style.section}>
                    <label htmlFor="ingradients">Ingradients</label>
                    {inputList.map((x, i) => {
                    return (
                    <div key={i} className={style.ingradient_name}>
                        <input
                            type="text"
                            name="ingradient"
                                placeholder="Enter ingradient"
                            value={x.ingradient || ""}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <input
                            type="number"
                            className={style.ingradient_qty}
                            name="weight"
                                placeholder="Enter weight (grams)"
                            value={x.weight || ""}
                            onChange={e => handleInputChange(e, i)}
                        />
                        
                            {inputList.length !== 1 && <button
                                className={style.btn_remove}
                                onClick={() => handleRemoveClick(i)}> <span>❌</span></button>}
                            {inputList.length - 1 === i && <button className={style.btn_add} onClick={handleAddClick}>Add ingradient</button>}
                        
                    </div>
                    );
                    })}
                </div>
                <div className={style.section}>
                    <label htmlFor="procedure">Procedure</label>
                    {procedureList.length > 0 ? procedureList.map((input, index) => (
                    <div key={index} className={style.procedureindex}>
                        <p>{`${index + 1} step`}</p>
                        <textarea
                            label={`input ${index + 1}`}
                            onChange={(event) =>  handleInputProcedureChange(event, index)}
                        />
                        {procedureList.length > 1 ? 
                            <button className={style.btn_remove} onClick={() => handleRemoveProcedureItem(index)}>
                                <span>❌</span>
                            </button> : ""}
                    </div>
                    )) : "No procedure in the list "}
                    <button style={style.btn_add} onClick={handleListProcedureAdd}>
                        Add new step
                    </button>
                </div>
                <div className={style.section}>
                    <label htmlFor="photo_food">photo</label>
                    <input type="file" name="photo_food" id="img_file" style={invalid_file} onChange={(e) => {setFile(e.target.files[0])}}/>
                    <p className={style.invalid_value}>{err_File}</p>
                </div>
            <input className={style.btn_submit} type="submit" value="Submit" style={invalidSubmit} />
            </form>
        </div>
    )
}