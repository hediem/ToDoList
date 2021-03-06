import React, { useEffect, useState } from 'react';
import './tododata.css' 
import Item from './Item';
const axios = require('axios').default;

function Tododata(){

    const [todo,setTodo] = useState([])
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    // const[check,setCheck] = useState()
    // const[checkId,setCheckId]=useState()
    const [searchText,setSearchText] = useState(" ")

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
        let list = [...todo]
        switch(status){
                case "completed":
                    list=list.filter(td => td.completed);
                    break;
                case "uncompleted":
                    list=list.filter(td => !td.completed);
                    break;
                default :
                    break;
        }
        list=list.filter(td => td.title.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredTodos(list)
    }, [status,todo,searchText])
                
    const changeCompleteState = (com,id) => {
        setTodo(todo.map(todo => {
            if(todo.id===id) return{...todo,completed:com};
            return todo;
        }))
    }

    const del = (index)  => {
        setTodo(todo.filter((todo,i) => {return index !== i}))
    }
//    const handleCompleted = (value) => {
//         return !value 
//     }
    // useEffect(()=> {
    //     // const com={completed: check}
    //     axios.patch(`https://jsonplaceholder.typicode.com/todos/${checkId}`,{completed: check})
    //     .then(response => console.log(response.data));
    // },[check])

    return(
        <div>
            <div>
                <label className="header">
                To Do :
                <input className="my-input" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </label>
            </div>
            <div className="base">
                <div className="nav">
                    <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Select
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><button className="dropdown-item" type="button" onClick={() =>  setStatus("all")}>All</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() =>  setStatus("completed")}>Completed</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() =>  setStatus("uncompleted")}>UnCompleted</button></li>
                            </ul>
                        </div>
                    </div>
                    <br/>
                <div className="list-group">
                    {filteredTodos.map((value,index) =><Item key={index} value={value} index={index} changeState={changeCompleteState} del={del}/> )}
                </div>
            </div>
        </div>
    )
}

export default Tododata;