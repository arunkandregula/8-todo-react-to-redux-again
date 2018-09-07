 
export default {
  addTodo: (list, todo) => [...list, todo],
  findById(list, id){
    return list.find((eachTodo)=>{
      return eachTodo.id === id;
    });
  },
  toggleTodo(todo){
    return {...todo, isComplete: !todo.isComplete};
  },
  updateTodos(todos, todo){
    let index = todos.findIndex((eachTodo)=>{
      return eachTodo.id === todo.id;
    })
    return [
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index+1)
    ]
  },
  findIndex(todos, id){
    return todos.findIndex((eachTodo)=>{
      return eachTodo.id === id;
    });
  },
  removeTodoAtIndex(todos, index){
    return [
      ...todos.slice(0, index),
      ...todos.slice(index+1)
    ];
  },
  generateId(){
    return Math.random()*10000 << 0;
  },
  deleteTodoIndexAtIndex(ids, idToBeDeleted){
    const index = ids.findIndex((eachId)=>{
      return eachId === idToBeDeleted
    });
    return [
      ...ids.slice(0, index),
      ...ids.slice(index+1)
    ];
  }

}
