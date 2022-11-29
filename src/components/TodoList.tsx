import { useTodos } from '../hooks/useTodos';
import ULWrapper from './ULWrapper';

const TodoList = () => {
  const todos = useTodos();
  return (
    <ULWrapper
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

export default TodoList;
