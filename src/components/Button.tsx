const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      alignItems: 'center',
      backgroundClip: 'padding-box',
      backgroundColor: '#fa6400',
      border: '1px solid transparent',
      borderRadius: '.25rem',
      boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
      boxSizing: 'border-box',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
    }}
  >
    {title ?? children}
  </button>
);

export default Button;
