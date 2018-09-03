## Motivation of this tutorial:
   1. To help newbies to transition from React to React with Redux.

##
Steps to follow to run the application:
1. npm install
2. json-server -p 8080 src/data/db.json
3. npm start

## Step1 - Branch.
01-moving-state-to-store

## Step1. Move the state from TodoApp component to Store.
   1. We need to create new entities like Store, Reducers, ActionsCreator, Constants.
   2. Get the todos from store and pass as properties to TodoApp.
   3. Start json server using following command:
      json-server -p 8080 src/data/db.json
   4. For this step, we just implemented :
     ADD_TODO, TOGGLE_TODO, DELETE_TODO, LOAD_TODOS, CHANGE_CURRENT_TODO, CHANGE_CURRENT_TODO, SHOW_ERROR_MSG



## Problems with Step 1.
   
   We will fix this in Step 1.5 :
   0. When we click the links - All, Active, Completed, we are updating the router. We are not updating the store about the change of filter.


   We will fix these after Step 1.5 :
   1. Every component has a hard coded dependency on a specific store. Then it is difficult to test components with another store. Its a problem1.
   2. How about passing the store as a prop ?
      eg.
      <TodoApp store={StoreFactory.getStore()}/>
      It solves problem1. But creates problem2.
      Problem2: We have to keep passing store around as a prop into every component.
                More boiler plate code.
   3. How about passing the store implicitly via context ? Lets do this in this Step2.
