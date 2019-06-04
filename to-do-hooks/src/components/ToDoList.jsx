import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import useCountIncompleteToDos from '../hooks/useCountIncompleteToDos';

let ToDos = [
  {tdid: 1, complete: true, completedOn: "today", visible: true, toDoText: "make an app", added: "10/10/10 10:10:10"},
  {tdid: 2, complete: false, completedOn: undefined, visible: true, toDoText: "learn hooks", added: "11/11/11 11:11:11"},
  {tdid: 3, complete: false,  completedOn: undefined, visible: true, toDoText: "give lunch n learn talk", added: "12/12/12 12:12:12"},
  {tdid: 4, complete: true,  completedOn: "yesterday", visible: true, toDoText: "one more for good luck", added: "13/13/13 13:13:13"}
];

const ToDoListStyled = styled.div`
  background: #ccc;
  border: darkslategray 3px;
  border-radius: 5px;
  min-height: 300px;
  margin-top: 100px;
  width: 1250px;
`;
const ListHeader = styled.div`
  font-size: 2.5em;
  background: #282c34;
  color: lightblue;
  width: 100%;
`;

const HideCompleteBtn = styled.span`
  position: absolute;
  margin: 10px;
  padding: 5px;
  float: right;
  background: #ff6688;
  border-radius: 100px;
  color: #772244;
  font-size: .3em;
  cursor: pointer;
  
  :hover {
    color: #ff6688;
    background: #772244;
  }
`;

const ShowCompleteBtn = styled.span`
  position: absolute;
  margin: 10px;
  padding: 5px;
  float: right;
  background: #33cc77;
  color: #115511;
  border-radius: 100px;
  font-size: .3em;
  cursor: pointer;
  
  :hover {
    background: #115511;
    color: #33cc77;
  }
`;

export const ToDoList = () => {
  const [stufftodo, setstuffToDo ] = useState(ToDos);
  const [ completeHidden, setCompleteHidden ] = useState(false);

  const removeEmpties = (stufftodo) => {
    const newstuff = stufftodo.filter((todo) => {
      if(todo.tdid) {
        return todo;
      }
    });
    return newstuff
  };

  const toggleComplete = (tdid) => {
    let tempToDos = stufftodo;
    let toDoInQuestion = tempToDos.filter((todo) => todo.tdid === tdid);
    toDoInQuestion = toDoInQuestion[0];
    toDoInQuestion.complete = !toDoInQuestion.complete;
    if(toDoInQuestion.complete){
      toDoInQuestion.completedOn = new Date().toLocaleString();
    } else {
      toDoInQuestion.completedOn = undefined;
    }
    if(completeHidden && toDoInQuestion.complete){
      toDoInQuestion.visible = false;
    }
    //for some reason, changing the objects INSIDE the array in state wont trigger an update,
    // but ADDING an object (empty) to the state array, DOES trigger an update.
    setstuffToDo([...tempToDos, {}]);
    // as a result, we have to filter, and REASSIGN to remove the empty objects required for the update.
    const newstuff = removeEmpties(stufftodo);
    setstuffToDo(newstuff);
    console.log(stufftodo);
  };

  const deleteForever = (tdid) => {
    console.log('we deleted forever: ' + tdid);
    const tempstufftodo = stufftodo;
    const filteredstufftodo = tempstufftodo.filter((todo) => todo.tdid != tdid);
    console.log(filteredstufftodo);
    setstuffToDo([...filteredstufftodo]);
    console.log(stufftodo);
  };

  const generateToDos = (toDoData) => {
    if(toDoData.length == 0){
      return "No To-Dos. Good job, you go-getter!";
    }
    return toDoData.map((todo) => {
      return <ToDo {...todo} toggleComplete={toggleComplete} deleteForever={deleteForever}/>
    });
  };

  const addToDo = (ToDoObj) => {
    const temptodos = ([...stufftodo, ToDoObj]);
    setstuffToDo(temptodos);
    console.log(stufftodo);
  }

  const toggleShowComplete = () => {
    let tempToDos = stufftodo;
    const changedtodos = tempToDos.map((todo) => {
      if(todo.complete) {
        todo.visible = !todo.visible;
      }
    });
    setstuffToDo([...changedtodos, {}]);
    console.log(stufftodo);
    const newstuff = removeEmpties(stufftodo);
    setstuffToDo(newstuff);
    setCompleteHidden(!completeHidden);
    console.log("complete hidden: " + completeHidden);
  };

  const getHighestTdid = () => {
    let highest = 0;
    for(let i = 0; i < stufftodo.length; i++) {
      if(stufftodo[i].tdid > highest) {highest = stufftodo[i].tdid}
    }
    return highest;
  }

  //this is my custom hook that counts the incomplete todos
  //Its basically just a util function prepended with 'use'
  //custom hooks can also call other hooks, though each call has its own state
  //so state wont carry over between calls
  const incomplete = useCountIncompleteToDos(stufftodo);

  // this 'useEffect' hook takes a callback and fires it after the render is complete.
  // kind of like the componentDidUpdate lifecycle method
  useEffect(() => {
    document.title = 'My List - ' + incomplete + ' To-Dos';
  });

  return (
    <ToDoListStyled>
      <ListHeader>
        My List
        <span>
          {completeHidden
            ?
            <ShowCompleteBtn onClick={() => toggleShowComplete()}>
              Show Completed Tasks
            </ShowCompleteBtn>
            :
            <HideCompleteBtn onClick={() => toggleShowComplete()}>
              Hide Completed Tasks
            </HideCompleteBtn>
          }
        </span>
      </ListHeader>
      <ToDoForm lastId={getHighestTdid()} addToDo={addToDo}/>
      <span>{incomplete} Incomplete To-Dos</span>
      <br/>
      {generateToDos(stufftodo)}
    </ToDoListStyled>
  );
}

export default ToDoList;
