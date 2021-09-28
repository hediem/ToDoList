import React from "react";


function item(value,index,changeCompleteState){

    return(                    
                <div key={index}>                               
                        <label className="list-group-item" >
                        <input className="form-check-input me-1" type="checkbox" value="" checked={(value.completed) ? "checked" : ""} 
                        onChange={() =>{                            
                            changeCompleteState(!value.completed, value.id)
                        }} />
                            {value.title}
                        </label>
                    <br/>
                </div>
    )
}
export default item;