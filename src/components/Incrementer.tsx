import { UserNumberSetValue, UserNumberValue } from '../hooks/useNumber';
import Button from './Button';

const Incrementer: React.FunctionComponent<{
  value: UserNumberValue;
  setValue: UserNumberSetValue;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`} />
);

export default Incrementer;
