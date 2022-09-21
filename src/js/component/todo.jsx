import React,{useState, useEffect} from 'react';

export const Todo = () => {
    
    const [tasklist , setTasklist] = useState([]);
    const [task , setTask] = useState("");

    useEffect(()=>{getApilist()},[]);

    const BURL = "https://assets.breatheco.de/apis/fake/todos/user/test1";
    
    const INI_POST = {
        method: "POST",
        body: JSON.stringify(tasklist),
        headers: {
          "Content-Type": "application/json"
        }
      }
    
    const DEL_DELETE = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }

    const getApilist = async () =>{

        let resp = await fetch(BURL);
        if(resp.ok){
            let APIList = await resp.json();
            setTasklist(APIList);
            setTask("");
            console.log("Lista guardada cargada con exito")
        }else{
            let createuser = await fetch(BURL , INI_POST)
            if(createuser.ok){
                console.log("usuario iniciado con exito");
            }
        }
        return console.log("iniciado")
    }

     
    const mensaje2 = () =>{
        if(tasklist.length == 0){
            return "No hay tareas pendientes"
        }
        else{
            return `${tasklist.length} tareas pendientes`
        }
    }

    const mensaje = () =>{
        if(tasklist.length == 0){
            return "No hay tareas para mostrar"
        }
        else{
            return "Eliminar todas las Tareas"
        }
    }

    const handlerTask = (event) => { setTask(event.target.value)}
   
     
    const handlerKeyPress = async (event) => {
        
        if (event.key == 'Enter' && task != "") {
            
            setTasklist([...tasklist, task]);
            
            let newList = tasklist;     
            
            newList.push({
                label: task,
                done: false
            });
           
            let response = await fetch(BURL, {
                method: "PUT",
                body: JSON.stringify(newList),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                let resp = await fetch(BURL);
                let APIList = await resp.json();
                setTasklist(APIList);
                setTask("");
            } else {
                alert("intenta de nuevo, tienes un error");
            }           
        }
    }

    const handlerButtomDelete = async (indexid, actlist) => {
        console.log(actlist);
        const filterlist = actlist.filter((todo, index)=> index != indexid);
     
          if(filterlist.length > 0){
            let response = await fetch(BURL, {
				method: "PUT",
				body: JSON.stringify(filterlist),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				setTasklist(filterlist); 
			} else {
				alert("hubo un problema 1");
			}
		} else {
			let response = await fetch(BURL, DEL_DELETE);
			if (response.ok) {
				setTasklist([]);
                console.log("la lista entera se borro con exito")
                let createuser = await fetch(BURL , INI_POST)
            if(createuser.ok){
                console.log("usuario iniciado con exito");
            }

			} else {
				alert("Problema de nuevo");
			}
		}
        }


    const handlerDelete = async () =>
        {
            setTasklist(tasklist.length = []);

            let response = await fetch(BURL , DEL_DELETE);
            
            if(response.ok){
                console.log("la lista se borro con exito")
            }

            let createuser = await fetch(BURL , INI_POST)
            if(createuser.ok){
                console.log("usuario iniciado con exito");
            }

        }     
        
return (
   

    <div className='row mt-5'>  
        <h1 id="ti">To-do list</h1>
        <div className='col-4'>
        <div className='card-text border-dark mt-3'>
                    <div className="form-floating mb-3">
                        <input onChange={handlerTask} value={task} onKeyDown={handlerKeyPress} type="text" className="form-control" id="floatingInput" placeholder="Tarea por hacer"/>
                        <label id="f1" htmlFor="floatingInput"> Agrega una Tarea</label>
                    </div>
                    <div className="row text-muted">
				        <h5>{mensaje2()}</h5>
			        </div>
                </div>
                </div>
            <div className='col-5'>
                    {tasklist.map((tarea , i)=>{
                    return ( 
                        <div className='Card card m-1' key={i}>
                        <div className="modal-header justify-content-between">                             
                            <h4>{i+1}. {tarea.label}</h4>
                            <button type="button" className="btn-close " onClick={(event) => handlerButtomDelete(i, tasklist)}></button>
                        </div>
                    </div>                    
                           );
                           })}
            </div>
        <div className='col-3'>
            <button type="button" className="btn btn-danger btn-lg" onClick={(event) => handlerDelete()}>{mensaje()}</button>
        </div>
    </div>
  )
}
