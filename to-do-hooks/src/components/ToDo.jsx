import React from 'react';
import styled from 'styled-components';

const ToDoStyled = styled.div`
  background: #eee;
  border: darkslategray 1px solid;
  border-radius: 100px;
  min-height: 50px;
  margin-top: 5px;
  width: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  
  :hover {
    background: #fff;
  }
`;

const ToDoInfoStyled = styled.span`
  font-size: .6em;
  color: #999;
  padding-right: 20px;
  min-width: 140px;
`;

const DoneStyle = styled.span`
  text-decoration: line-through;
  color: #33cc77
`;

export const ToDo = (props) => {
  const {tdid, completedOn, visible, added, toDoText, complete, toggleComplete} = props;

  const handleToDoClick = (tdid, toggleComplete) => {
    console.log('we clicked toggle:' + tdid);
    toggleComplete(tdid);

  }

  if(visible) {
    return (
        <ToDoStyled key={tdid} id={tdid} onClick={(e) => handleToDoClick(tdid, toggleComplete)}>
          <ToDoInfoStyled>
            <span>
              Added on {added}:
              {complete &&
                <div>
                  Completed: {completedOn}
                </div>
              }
            </span>
          </ToDoInfoStyled>
          {complete ?
            <DoneStyle>
              {toDoText}
            </DoneStyle>
            :
            <span>
              {toDoText}
            </span>
          }
        </ToDoStyled>
    );
  }
  return null;
}

export default ToDo;
