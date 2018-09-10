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


## Step3 - Branch.
 03-presentation-and-container-components

## Step3. Split each component into presentational and container counterparts.

   1. Replaced our Provider component with Provider component from react-redux library.

   2. Also replaced our own container logic in Link component using connect api from react-redux library.

   3. We have following presentational components:
      TodoInput, TodoItem, TodoList as presentational components.
      All of their behaviour is specified in TodoApp.
      We can reduce the responsibilities of TodoApp by moving the behaviour to corresponding Container counterparts of each of those Presentational components.Container components will take care of retrieving the store ref from context and doing store.subscribe and store.unsubscribe. In other words, when anything in the store chnages, these container components are responsible for rerendering their presenational counterparts.

   4. Facts about container components :
      All container components are similar. They have 3 main jobs :
      1. Connect a presentational components to the Redux store.
      2. Specify the data and the behavior that it needs.
      3. Have store subscription logic. They have to rerender when the store state changes. They use store.subscribe/store.unsubscribe.

      So they have lot of boiler plate. So we can have Redux generate the container components for us
      by ReactRedux.connect.
   5. TodoListContainer has to filter the todos from store and pass it itno TodoList.
      It will need access to this.context.route. But we cant access this.context from Container component. So we pass it as a prop into TodoListContainer from TodoApp.

   6. When we add a todo, we need to access state.currentTodo when dispatching ADD_TODO event.
      Million dollar question: How to access state in mapDispatchToProps ?
    // We cant ideally.
    // 1 way to solve this is to get the value of currentTodo from input ref ( current implementation)
    // 2nd way to solve is to pass third param as prevState.currentTodo in todosReducer

   7. Now TodoApp is a stateless functional component and is so succinct.
      Note the way we accessed context from this stateless component. Stateless functional components can reference context if contextTypes is defined as a property of the function.

   8. Moved all actions into Action Creator. 

## Problems with Step 3.

1. We are using our own versions of Router and Link, which are very common in almost all applications. So lets replace them with versions provided by react-router.


## Step4 - Branch.
04-enter-react-router


## Step4. Let React Router control the browser route state and lets rely on the route for filter logic.
 1. Earlier instead of relying on custom Router's context.route, we made changes so that we rely state.filter in redux state.
    Now we change that logic and instead of saving the state of filter in store, we rely on browser route.
    But this time the difference is we rely on react-router. Not our own custom router.

 2. Setting the default value of params.filter is a must or the default filter will be shown as undefined.
  Example:
  <TodoListContainer filter={props.params.filter || 'all'}/>

 3. Also <Link> tag has activeClass which makes life easy withotu using classNames etc.



## Problems with Step 4.
1. Currently Router params are available only to TodoApp. TodoApp doesnt directly use them, rather pass them to its child components like :
<TodoListContainer filter={props.params.filter || 'all'}/>
Again boiler plate props. Lets see how we can directly inject these router params into connected components or container components.

## Step5 - Branch.
05-injecting-router-params


## Step5.
 1. In what ever container component, we need router params, do:
    import { withRouter } from 'react-router';
    ..
    return withRouter(connect(.. , ..)(...));
 2. Thats it.


## Problems with Step 5.
1. You can still find some boiler plate in the function mapDispatchToProps. We can remove the boiler plate code.
2. Components like TodoListContainer has knowledge about state shape as it is filtering todos.
   That creates tight coupling between components and reducers. So if state shape changes, we have to update these components as well. Its a maintainance nightmare. We can solve it if we move the selectors i.e. methods that select part of the state like (getFilteredItems or getFilteredTodos)
   to reducer files that define the state shape.

## Step6 - Branch.
06-colocate-selectors-with-reducers


## Step6. Colocating selectors with reducers.
 1. We will see how we can remove boiler plate code in mapDispatchToProps as long as params match.
 2. Any methods that select something from the current state are usually called selectors.
    For example: getFilteredItems ( we will rename this to getFilteredTodos ) in TodoListContainer.
    We will move this to reducer file that knows the shape of the todos i.e. todosReducer.
    TodoListContainer should still pass the argument as  state.todos. Which means it is still aware of todos prop from state. Which it should not. Ideally our components should not know shape of the state. So TodoListContainer should call storeReducer.getFilteredTodos(state)  and BUT NOT todosReducer.getFilteredTodos(state.todos).
 3. We will see how to achieve loose coupling between components and reducers, by having selector methods colocate with reducers and components dont have to be aware of state shape or any state changes in the store.

## Problems with Step 6.
1. In real world, the state could be more complex like multiple arrays.
   In this case, if same todo end up in more than one array, that could lead to data inconsistencies.

## Step7 - Branch.
07-treat-state-as-database


## Step7. Treating state as database. ( with added support for LOAD_TODOS event. )
)
 1. Lets normalize the state and make it look like a database for consistency purposes.
 2. Lets use v4() method of node-uuid npm package to generateId.
 3. We also added support for LOAD_TODOS event. We also took care of dispatching LOAD_TODOS event as part displaying the list. (which we missed in previous steps)

## Step8 - Branch.
08-log-every-state-change

## Step8. Log every state change.
 1. We will see how to log every state change in the redux app. In Redux app, although we dont have central Dispatcher like in Flux, every state chnage is centralized thru store.dispatch() method.

 2. In this step, we will see how we can override store.dispatch method to log every state change.
    We will also see how to use console.group API for grouping and coloring the logs.

 3. In one of the subsequent steps, we will see how to achieve the same using a npm package. (redux-logger)


## Problems with Step 8 and its predecessors.
1. So far we have been doing eager loading, where it will retrive all the data in one request.
   Lets see how we can do lazy loading for performance reasons for huge data sets, where retriving everything in one request may take time.

## Step9 - Branch.
09-fetching-data-on-route-change

## Step9. Fetching data on route change - as it is not a good idea to load all the data at once in large size production applications
 1. We have <TodoList />. We want to add props to it.
    <TodoList filter="active" items={filtered items} />

    Previous behaviour: All the data is loaded first time. Every time we chnage filter, items are filtered from the loaded list.
    New/This Step behaviour: Every time we change filter, we fire an ajax request to get data specific to the filter.

 2. We also change the structure of state todos.allIds to todos.idsByFilter (which is a map of all, active, completed reducers.)
    Now that we load each filter separately, we store the ids separately to load from the database i.e. byIds faster.


## Problems with Step 9
1. Component will take the responsibility of calling the TodoService API and fetching the data and then passing the data to dispatch.
   ActionCreator's method is alsmost dummy and have no use unless we have data.
   We can have the action method do the heavy lifting than the component.

## Step10 - Branch.
10-overriding-dispatch-to-support-promises

## Step10. Overriding dispatch to support promises. Moving fetching data to action creator.
 1. We moved the api calling heavy work into action creator's getLoadTodosPromiseAction.
    This returns a promise action object. And our dispatch should know how to handle this promise.
    So just like earlier we have overriden store.dispatch to add logging support, this time we have overriden it so that it know know to handle special promise action objects.
 2. One thing to remember is, logging should happen after promise resolves so that we log useful action.data.
    If we log before promise resolves, action.data will be printed as promise pending object which is not very useful.
    For that, the store.dispatch that we make available to the application should first handle promise and then next store.dispatch must log the info and last store.dispatch should be the original dispatch.
    For that ordering is important:

    1. addLoggingSupport
    2. addPromiseSupport.
    and then give the latest dispatch to customer i.e. application.
    So when application calls dispatch, it first calls 2. addPromiseSupport, once the promise is resolved, it then calls 1. addLoggingSupport .

## Problems with Step 10
1. If we want to enhance dispatch by wrapping it multiple times, the code pattern may look ugly. The order in which action propagates is reverse to the order in which we override dispatch method, which is not super readable or intuitive. For example, the order in which action propagates is getDispatchThatRecognizePromise and getDispatchThatLogsState. But the order in which we override dispatch is getDispatchThatLogsState, getDispatchThatRecognizePromise.

## Step11 - Branch.
11-introducing-middleware-chain

## Step11. Introducing middleware chain in the order of action propogation.
  1. We will see how we can have a more scalable and generalized way of enhancing dispatch functionality with the concept of middlewares.
     Every middleware function/module wraps dispatch and enhances it.
  2. We will also make it more readable and intuitive by declaring the middleware functions/modules in the same order in which the action propagates.
  3. Instead of have every dispatch enhancer saving its own version of rawDispatch and reusing it, we pass rawDispatch as a 2nd param as another way to do it. Although this signature is also different from the redux middleware.
  
## Problems with Step 11
1. The signature of the middleware functions are different from the signature of middleware modules provided by redux i.e. 'redux-logger' and 'redux-promise'.
