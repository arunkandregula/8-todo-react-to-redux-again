import TodoHelpers from './todoHelpers';

test('addTodo should add the passed todo to the list', ()=>{
  const startTodos = [
    {id:1, text: 'one', isComplete: false},
    {id:2, text: 'two', isComplete: false},
  ];

  const newTodo = {
    id: 3, text: 'three', isComplete: false
  }

  const expectedTodos = [
    {id:1, text: 'one', isComplete: false},
    {id:2, text: 'two', isComplete: false},
    {id: 3, text: 'three', isComplete: false}  
  ];

  const result = TodoHelpers.addTodo(startTodos, newTodo)

  expect(result).toEqual(expectedTodos);

})