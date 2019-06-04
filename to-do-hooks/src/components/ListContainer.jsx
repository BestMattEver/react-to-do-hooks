import React from 'react';
import styled from 'styled-components';
import ToDoList from './ToDoList';

const ListContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListContainer = () => {
  return (
    <ListContainerStyled>
      <ToDoList/>
    </ListContainerStyled>
  );
}

export default ListContainer;
