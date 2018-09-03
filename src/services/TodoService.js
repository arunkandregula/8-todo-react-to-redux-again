const baseURL = 'http://localhost:8080/todos';

export const loadTodos = ()=>{
  return fetch(baseURL).then(response => response.json());
}


export const createTodo = (todo)=> {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(response => response.json())
}

export const updateTodo = (todo)=>{
  return fetch(`${baseURL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then((response)=>{
    return response.json();
  });
}

export const deleteTodo = (todo)=>{
  return fetch(`${baseURL}/${todo.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
    return response.json();
  });
}