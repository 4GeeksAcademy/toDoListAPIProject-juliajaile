import React, {useEffect, useState} from "react";


//create your first component
const Home = () => {
	const[todos, setTodos] = useState([]); //donde irán la lista de todos
    const[inputValue, setInputValue] = useState(""); //donde irá lo que se escriba en input
    

	//hace que el estado de inputValue sea igual a lo que se escribe en input
	const handleChange = (event) =>{
        setInputValue(event.target.value);
	}
	

   const handleKeyEnter = (event) =>{
	if(event.key === "Enter"){
		fetchPostTask();
	}
   }
   

   useEffect(() => {
	fetchPostUser();
	fetchGetTask();
   }, [])

   const fetchPostUser = () => {
	const nuevoUser = {
		label: inputValue,
		is_done: false
    }

    fetch('https://playground.4geeks.com/todo/users/julia', {
    method:"POST",
    body: JSON.stringify(nuevoUser),
    headers:{
	   "Content-type":"application/json"
    }
    })
   .then(response => response.json())
   .then(data => {
    console.log(data);
   })
   .catch(error => console.log(error))// Manejo de errores)
   }


   const fetchGetTask = () => {
	fetch('https://playground.4geeks.com/todo/users/julia', {
		method: "GET",
	  })
	  .then(response => response.json())
	  .then(data => {
		console.log(data) // Esto imprimirá en la consola el objeto exacto recibido del servidor
		setTodos(data.todos) 
	  })
	  .catch(error => console.log(error))// Manejo de errores
   }
  

   const fetchPostTask = () => {
        const nuevaTarea = {
				label: inputValue,
				is_done: false
		}

	fetch('https://playground.4geeks.com/todo/todos/julia', {
		method:"POST",
		body: JSON.stringify(nuevaTarea),
		headers:{
			"Content-type":"application/json"
		}
	})
	 .then(response => response.json())
	 .then(data => {
		console.log(data);
		fetchGetTask();
	 })
	 .catch(error => console.log(error))// Manejo de errores)
   }
    
   const fetchDeleteTask = (id) => {
	fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method:"DELETE",
		headers:{
			"Content-type":"application/json"
		}
	})
	 .then(response => response.json())
	 .then(data => {
		console.log(data);
		fetchGetTask();
	 })
	 .catch(error => console.log(error))// Manejo de errores)
   }

   const fetchDeleteUser = () => {
	fetch('https://playground.4geeks.com/todo/users/julia', {
		method:"DELETE",
		headers:{
			"Content-type":"application/json"
		}
	})
	 .then(response => console.log(response))
	 .then(data => {
		console.log(data);
		fetchPostUser();
		setTodos([]);
	 })
	 .catch(error => console.log(error))// Manejo de errores)
   }


    
	return (
		<div className="container-fluid bg-black w-100 d-flex flex-column justify-content-center align-items-center ">
			<div className="backgroundList">
			  <div className="container d-flex flex-column justify-content-center align-items-center">
			     <h1 className="title">todos</h1>
				 <form>
				   <input className="input" type="text" id="" placeholder="Write a task..." value={inputValue} onChange={handleChange} onKeyDown={handleKeyEnter}/>
				 </form>
				 <ul>
				     {todos?.map((inputValue, index) => (
						<li className="submittedInput" key={index}>
						{inputValue.label}
						<button className="closing-btn" onClick={() => fetchDeleteTask(inputValue.id)}>X</button>
						</li>	
				      ))}
					  {todos?.length <= 0 && <p className="submittedInput">No tasks, add a task</p>}
			     </ul> 
				 <span><button className="btn btn-primary" onClick={fetchDeleteUser}>Delete todos</button></span>
			  </div>
			</div>
		</div>
	);
};


export default Home;
