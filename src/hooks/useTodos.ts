import { useCallback, useReducer } from 'react';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export type ActionType =
  | {
      type: 'ADD';
      text: string;
    }
  | { type: 'REMOVE'; id: number };

const useTodos = (
  initialTodos: Todo[]
): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD', text: text });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: 'REMOVE', id: id });
  }, []);

  return { todos, addTodo, removeTodo };
};

export default useTodos;
