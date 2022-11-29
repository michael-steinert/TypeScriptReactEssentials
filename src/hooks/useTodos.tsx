import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

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

type UserTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UserTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

const useTodosManager = (
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

export default useTodosManager;

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): UserTodosManagerResult['todos'] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UserTodosManagerResult['addTodo'] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UserTodosManagerResult['removeTodo'] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
