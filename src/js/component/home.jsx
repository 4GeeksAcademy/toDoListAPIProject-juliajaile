import React, {useEffect, useState} from "react";


//create your first component
const Home = () => {
	const[todos, setTodos] = useState([]); //donde irán la lista de todos
    const[inputValue, setInputValue] = useState(""); //donde irá lo que se escriba en input
    //const[tarea, setTarea]=useState("");

	//hace que el estado de inputValue sea igual a lo que se escribe en input
	const handleChange = (event) =>{
        setInputValue(event.target.value);
	}
	//añade nueva todo al estado todos y limpia el estado de inputValue cuando se le da enter
	const handleSubmit = (event) => {
       event.preventDefault();
	   setTodos([...todos, inputValue]);
	   fetchPostTask();
	   setInputValue(""); 

	}

   const handleKeyEnter = (event) =>{
	if(event.key === "Enter"){
		handleSubmit(event)
	}
   }


   useEffect(() => {
	fetchGetTask();
   }, [])

   const fetchGetTask = () => {
	fetch('https://playground.4geeks.com/todo/users/julia', {
		method: "GET",
	  })
	  .then(response => response.json)
	  .then(data => {
		console.log(data) // Esto imprimirá en la consola el objeto exacto recibido del servidor
		setTodos(data.todos) 
	  })
	  .catch(error => console.log(error))// Manejo de errores
   }
   console.log(todos)

   const fetchPostTask = () => {
        const nuevaTarea = {
				label: todos,
				is_done: false
		}

	fetch('https://playground.4geeks.com/todo/todos/julia', {
		method:"POST",
		body: JSON.stringify(nuevaTarea),
		headers:{
			"Content-type":"application/json"
		}
	})
	 .then(response => response.json)
	 .then(data => {
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
	 .then(response => response.json)
	 .then(data => {
		fetchGetTask();
	 })
	 .catch(error => console.log(error))// Manejo de errores)
   }
    
	return (
		<div className="container-fluid bg-black w-100 d-flex flex-column justify-content-center align-items-center ">
			<div className="backgroundList">
			  <div className="container d-flex flex-column justify-content-center align-items-center">
			     <h1 className="title">todos</h1>
				 <form>
				   <input className="input" type="text" id="" placeholder="Write a task..." value={inputValue} onChange={handleChange} onKeyDown={handleKeyEnter}></input>
				 </form>
				 <ul>
				     {todos.map((inputValue, index) => (
						<li className="submittedInput" key={index}>
						{inputValue.label}
						<button className="closing-btn" onClick={() => fetchDeleteTask(inputValue.id)}>X</button>
						</li>	
				      ))}
					  {todos.length <= 0 && <p className="submittedInput">No tasks, add a task</p>}
			     </ul> 
			  </div>
			</div>
		</div>
	);
};


export default Home;
