import React from "react";
import DeleteToDo from "./DeleteToDo";
import './item.css'

function Item({value,index,changeState,del}){

    return(                    
                <div className="items">
                    <div key={index}>                               
                            <label className="list-group-item" >
                            <div>
                            <input className="form-check-input me-1" type="checkbox" value="" checked={(value.completed) ? "checked" : ""} 
                            onChange={() =>{                            
                                changeState(!value.completed, value.id)
                            }} />
                                {value.title}
                                
                            </div>
                                <DeleteToDo index={index} del={del}/>
                            </label>
                        <br/>
                    </div>
                </div>
    )
}
export default Item;