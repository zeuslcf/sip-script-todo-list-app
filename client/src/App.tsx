import React, { useEffect, useState } from "react";
import "./App.scss";
import { Container, Spinner } from "react-bootstrap";
import TodoList, { ITodo } from "./components/TodoList/TodoList";
import AppHeader from "./components/AppHeader/AppHeader";
import Toast from "./components/Toast/Toast";

export const ThemeContext = React.createContext("light");
export const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // Load Todos from server
    fetch(`${apiBaseUrl}/api/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <Container fluid className="px-0" data-bs-theme={theme}>
        <Toast toastMessage={toastMessage}></Toast>
        <AppHeader setTheme={setTheme} />
        <Container className="py-4">
          <Spinner animation="border" role="status" hidden={!isLoading} />
          {!isLoading && (
            <TodoList
              todos={todos}
              setTodos={setTodos}
              showToast={setToastMessage}
            />
          )}
        </Container>
      </Container>
    </ThemeContext.Provider>
  );
}

export default App;
