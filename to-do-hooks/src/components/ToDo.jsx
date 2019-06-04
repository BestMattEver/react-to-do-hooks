import React from 'react';
import styled from 'styled-components';

const ToDoStyled = styled.div`
  position: relative;
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

const DeleteBtn = styled.span`
  position: absolute;
  left: 95%;
  background: #ff6688;
  width: 35px;
  border-radius: 100px;
  color: #772244;
  font-size: 2em;
  cursor: pointer;
  
  :hover {
    background: #772244;
    color: #ff6688;
  }
`;

export const ToDo = (props) => {
  const {tdid, completedOn, visible, added, toDoText, complete, toggleComplete, deleteForever} = props;

  const handleToDoClick = (tdid, toggleComplete) => {
    console.log('we clicked toggle:' + tdid);
    toggleComplete(tdid);
  }

  const handleDeleteClick = (e, tdid) => {
    e.stopPropagation();
    deleteForever(tdid)
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
          <DeleteBtn onClick={(e) => handleDeleteClick(e, tdid)}>
            X
          </DeleteBtn>
        </ToDoStyled>
    );
  }
  return null;
}

export default ToDo;
