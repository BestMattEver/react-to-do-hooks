import React from 'react';

function useCountIncompleteToDos(stufftodo) {
  let count = 0;
  stufftodo.forEach((todo) => {
    if(!todo.complete) {count++;}
  })
  return count;
}

export default useCountIncompleteToDos;
