import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Incrementer,
  List,
  ULWrapper,
} from './components';
import { useNumber, useTodos } from './hooks';

export interface Payload {
  text: string;
}

const App = () => {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [value, setValue] = useNumber(0);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: 'Bruno', done: false },
  ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title='Introduction' />
      <Box>Box Text</Box>
      <List items={['Michael', 'Bruno']} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
      <Heading title='Wrapped Todos' />
      <ULWrapper
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <React.Fragment>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </React.Fragment>
        )}
      />
      <Heading title='Todos' />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
      <div>
        <input type='text' ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add</Button>
      </div>
    </div>
  );
};

export default App;
