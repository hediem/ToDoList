import React, { useEffect, useState } from 'react';
import './tododata.css' 
const axios = require('axios').default;

function Tododata(){

    const [todo,setTodo] = useState([])
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    // const[check,setCheck] = useState()
    // const[checkId,setCheckId]=useState()

    useEffect(() =>{
            axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                let datas = res.data.map( value => {
                    return {id: value.id,title: value.title, completed: value.completed }
                    });
                    setTodo(datas)
                    setStatus("all")
                }
            )
    },[])

    useEffect(() => {
        switch(status){
                case "all":
                    setFilteredTodos(todo);
                    break;
                case "completed":
                    setFilteredTodos(todo.filter(td => td.completed));
                    break;
                case "uncompleted":
                    setFilteredTodos(todo.filter(td => !td.completed));
        }
    }, [status,todo])
 
//    const handleCompleted = (value) => {
//         return !value 
//     }
    // useEffect(()=> {
    //     // const com={completed: check}
    //     axios.patch(`https://jsonplaceholder.typicode.com/todos/${checkId}`,{completed: check})
    //     .then(response => console.log(response.data));
    // },[check])

    const changeCompleteState = (value,id) => {
        setTodo(todo.map(todo => {
            if(todo.id===id) return{...todo,completed:value};
            return todo;
        }))
    }
    return(
        <div>
            <p className="header">To Do :</p>
            <div className="base">
                <div className="nav">
                    <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><button className="dropdown-item" type="button" onClick={() => setStatus("all")}>All</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() =>  setStatus("completed")}>Completed</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() =>  setStatus("uncompleted")}>UnCompleted</button></li>
                            </ul>
                        </div>
                    </div>
                    <br/>
                <div className="list-group">
                    {filteredTodos.map((value,index) => <div key={index}>                
                        <label className="list-group-item" >
                        <input className="form-check-input me-1" type="checkbox" value="" checked={(value.completed) ? "checked" : ""} 
                        onChange={() =>{                            
                            changeCompleteState(!value.completed, value.id)
                        }} />
                            {value.title}
                        </label>
                         <br/></div>)}
                </div>
            </div>
        </div>
    )
}

export default Tododata;