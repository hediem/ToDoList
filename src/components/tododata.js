import React, { useEffect, useState } from 'react';
import './tododata.css' 
const axios = require('axios').default;

function Tododata(){

    const [todo,setTodo] = useState([])
    const [state, setState] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() =>{
            axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                let datas = res.data.map( value => {
                    return {title: value.title, completed: value.completed }
                    });
                    setTodo(datas)
                    setFilteredTodos(datas)
                }
            )
    },[])

    useEffect(() => {
        switch(state){
                case "all":
                    setFilteredTodos(todo);
                    break;
                case "completed":
                    setFilteredTodos(todo.filter(td => td.completed));
                    break;
                case "uncompleted":
                    setFilteredTodos(todo.filter(td => !td.completed));
        }
    }, [state])
 
    // const handleCompleted = (value) => {
    //    return value.completed ? "checked" : null 
    // }

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
                                <li><button className="dropdown-item" type="button" onClick={() => setState("all")}>All</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => setState("completed")}>Completed</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => setState("uncompleted")}>UnCompleted</button></li>
                            </ul>
                        </div>
                    </div>
                    <br/>
                <div className="list-group">
                    {filteredTodos.map((value,index) => <div key={index}>                
                        <label className="list-group-item" >
                        <input className="form-check-input me-1" type="checkbox" value="" checked={(value.completed) ? "checked" : ""}/>
                            {value.title}
                        </label>
                         <br/></div>)}
                </div>
            </div>
        </div>
    )
}

export default Tododata;