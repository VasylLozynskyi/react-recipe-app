import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import store from "../../Components/Redux/store/store";
import { updateCountRecipesUserAction } from "../../Components/Redux/Actions/indexUser";
import { createRecipe } from "../../Components/utills/functions";
import { CreateRecipe } from "./CreateRecipe";


export const CreateRecipeContainer = (props) => {
    const user = useSelector(state => state.userPage.user)
    const isAuth = useSelector(state => state.userPage.isAuth)
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
    const valid_style = {border: "1px solid gray"};
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
        if (title.length >= 29) {
            setErr_Title("You can not write more then 30 letters");
            setInvalid_title(invalid_style);
        } else {
            setErr_Title("");
            setInvalid_title(valid_style);
        }
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
                ingredients: inputList,
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
        } else {setErr_Title(""); setInvalid_title(valid_style)};
        if (!time) {
            setErr_Time("field time to prepare must not be empty");
            setInvalid_time(invalid_style);
        } else {setErr_Time(""); setInvalid_time(valid_style); } 
        if (!file.name) {
            setErr_File("You must choose a photo file");
            setInvalid_file(invalid_style);
        } else {setErr_File("");  setInvalid_file(valid_style);}
        
        if (!err_Title && !err_Time && !err_File && isAuth) {
        createRecipe(newRecipe(), user, file);
        store.dispatch(updateCountRecipesUserAction())
         navigate(`/profile/${user.idUrl}`)
         setInvalidSubmit({border: "none"});
        } else  setInvalidSubmit(invalid_style);
    }

    return (
       <CreateRecipe
          dataSite={props.dataSite}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
          handleRemoveClick={handleRemoveClick}
          handleAddClick={handleAddClick}
          handleInputProcedureChange={handleInputProcedureChange}
          handleRemoveProcedureItem={handleRemoveProcedureItem}
          handleListProcedureAdd={handleListProcedureAdd}
          setFileValue={(e) => {setFile(e.target.files[0])}}
          invalid_title={invalid_title}
          invalid_time={invalid_time}
          invalid_file={invalid_file}
          err_Title={err_Title}
          err_Time={err_Time}
          err_File={err_File}
          invalidSubmit={invalidSubmit}
          inputList={inputList}
          procedureList={procedureList}
      />
    )
}