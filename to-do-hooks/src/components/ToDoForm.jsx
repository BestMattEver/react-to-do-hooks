import React, { useState }from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
  background: #fff;
  border: darkslategray 1px solid;
  border-radius: 100px;
  font-size: 2em;
  min-height: 20px;
  margin-top: 5px;
  width: 70%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin-bottom: 30px;
  
  :hover {
    background: #fff;
  }
`;

export const ToDoForm = (props) => {
  const { addToDo, lastId } = props;

  const [inputValue, setInputValue ] = useState('');

  const handleAddTodo = (inputValue, addToDo, lastId) => {
    const tempTodo = {
      tdid: lastId + 1,
      complete: false,
      completedOn: undefined,
      visible: true,
      toDoText: inputValue,
      added: new Date().toLocaleString()
    }

    addToDo(tempTodo);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

    return (
      <div>
       <InputStyled
         placeholder={"Add New To-Do"}
         type={"text"}
         value={inputValue}
         onChange={(e) => handleChange(e)}
         onKeyDown={(e) => {
             if(e.key === "Enter") {
               console.log("we entered: " + inputValue)
               handleAddTodo(inputValue, addToDo, lastId)
               setInputValue('');
             }
           }
         }
       />
      </div>
    );
}

export default ToDoForm;
