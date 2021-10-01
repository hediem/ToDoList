import {FaTrashAlt} from "react-icons/fa"

function DeleteToDo({index,del}) {

    return(     
              <FaTrashAlt  style={{cursor:"pointer" , color: "rgba(0,0,0,0.4)"} } onClick={()=> del(index)}/>
    )
}

export default DeleteToDo;