import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Incrementer,
  List,
  ULWrapper,
} from './components';
import TodoList from './components/TodoList';
import { useNumber } from './hooks';
import {
  TodosProvider,
  useAddTodo,
  useRemoveTodo,
  useTodos,
} from './hooks/useTodos';

export interface Payload {
  text: string;
}

const App = () => {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [value, setValue] = useNumber(0);

  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

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

const AppWrapper = () => (
  <TodosProvider initialTodos={[{ id: 0, text: 'Bruno', done: false }]}>
    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      <App />
      <TodoList />
    </div>
  </TodosProvider>
);

export default AppWrapper;
