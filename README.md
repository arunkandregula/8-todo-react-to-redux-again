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
   
   0. When we click the links - All, Active, Completed, we are updating the router. We are not updating the store about the change of filter.
   1. Every component has a hard coded dependency on a specific store. Then it is difficult to test components with another store. Its a problem1.
   2. How about passing the store as a prop ?
      eg.
      <TodoApp store={StoreFactory.getStore()}/>
      It solves problem1. But creates problem2.
      Problem2: We have to keep passing store around as a prop into every component.
                More boiler plate code.
   3. How about passing the store implicitly via context ? Lets do this in this Step2.
   4. index.js should be simple. Router and Provider should be introduced in App.js as we see in next step.
   5. Forgot to remove state from TodoApp.js after moving the state to the store. We will remove that as part of Step2.
      Forgot to remove dependency on store in TodoApp.js



## Step2 - Branch.
02-passing-down-store-from-Provider

## Step2.
   1. Some Wrapper component should provide the store to all its child components via context.
      Lets call it Provider. Provider's job is to provide store ref to all child componenets.

   2. Our Provider is different from Router.
      Similarity: both of them are providing some info via context.
      Difference: If that info ( route for Router and store for Provider ) chnages,
                  Router rerenders the entire app, where as, Provider leaves it to individual components if they want to rerender.

   3. So far <Link> is reacting based on the route change propagated by thew router. In this step, instead of relying on the route, we will save that portion as filter in the redux store state and rely on this piece.

   4. We separate Link comp into presentational component and Container component. 

## Problems with Step 2.
1. Right now TodoApp is overloaded with responsibilities like reading and writing to store and doing a forceUpdate whenever anything in the store changes. We will see how we can solve this problem by implementing more Container components. ( We already introduced container components in previous Step when we implemented LinkContainer ).

2. Provider component that we wrote seems very static and standard in any application. So this seems boiler plate. We will see how we can avoid writing Proivder by reusing the <Provider> component from react-redux library.
