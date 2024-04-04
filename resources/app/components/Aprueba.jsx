import  useTheme from '../hooks/useTheme';

const Aprueba = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Aprueba;