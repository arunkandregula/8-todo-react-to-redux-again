import v4 from 'node-uuid';

const baseURL = 'http://localhost:8080/todos';
const allTodosBaseURL = baseURL;
const activeTodosBaseURL = `${baseURL}?isComplete=false`;
const completedTodosBaseURL = `${baseURL}?isComplete=true`;


const delay = (delayInMillis)=> new Promise((resolve, reject)=>{setTimeout(resolve, delayInMillis)});

const loadTodos = (filter)=>{
  let url = baseURL;
  const randomFactor = Math.random();
  console.log(randomFactor);
  if( randomFactor > 0.5){
    return delay(500).then(()=>{
      throw new Error("Boom!")
    });
  }

  switch(filter){
    case 'active': url = activeTodosBaseURL; break;
    case 'completed': url = completedTodosBaseURL; break;
    case 'all': url = allTodosBaseURL; break;
    default:
      break;
  }
  return delay(5000)
    .then(()=>fetch(url))
    .then(response => response.json());
}

const createTodo = (text)=> {

  const newTodo = {
    id: v4(),
    text,
    isComplete: false
  };

  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  }).then(response => response.json())
}

const toggleTodo = (todo)=>{

  const toggledTodo = {...todo, isComplete : !todo.isComplete };
  return fetch(`${baseURL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toggledTodo)
  }).then((response)=>{
    return response.json();
  });
}

const deleteTodo = (id)=>{
  return fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
    return id;
  });
}

export default {
  loadTodos,
  createTodo,
  toggleTodo,
  deleteTodo
}