import React, { useState } from 'react';
import styled from 'styled-components';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';

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

export const ToDoList = () => {
  const [stufftodo, setstuffToDo ] = useState(ToDos);

  const toggleComplete = (tdid) => {
    let tempToDos = stufftodo;
    tempToDos[tdid-1].complete = !tempToDos[tdid-1].complete;
    if(stufftodo[tdid-1].complete){
      tempToDos[tdid-1].completedOn = new Date().toLocaleString();
    } else {
      tempToDos[tdid-1].completedOn = undefined;
    }

    //for some reason, changing the objects INSIDE the array in state wont trigger an update,
    // but ADDING an object (empty) to the state array, DOES trigger an update.
    setstuffToDo([...tempToDos, {}]);
    // as a result, we have to filter, and REASSIGN to remove the empty objects required for the update.
    const newstuff = stufftodo.filter((todo) => {
      if(todo.tdid) {
        return todo;
      }
    });
    setstuffToDo(newstuff);

    console.log(stufftodo);
  }

  const generateToDos = (toDoData) => {
    return toDoData.map((todo) => {
      return <ToDo {...todo} toggleComplete={toggleComplete} />
    });
  }

  const addToDo = (ToDoObj) => {
    const temptodos = ([...stufftodo, ToDoObj]);
    setstuffToDo(temptodos);
    console.log(stufftodo);
  }

  return (
    <ToDoListStyled>
      <ListHeader>My List</ListHeader>
      <ToDoForm lastId={stufftodo.length} addToDo={addToDo}/>
      {generateToDos(stufftodo)}
    </ToDoListStyled>
  );
}

export default ToDoList;
