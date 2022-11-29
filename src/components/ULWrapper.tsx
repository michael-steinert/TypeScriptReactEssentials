const ULWrapper = <T extends unknown>({
  items,
  itemClick,
  render,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  itemClick: (item: T) => void;
  render: (item: T) => React.ReactNode;
}) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => itemClick(item)}>
        {render(item)}
      </li>
    ))}
  </ul>
);

export default ULWrapper;
