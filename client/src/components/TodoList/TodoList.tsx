import React, { Dispatch } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';

interface ITodoList {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
  showToast: (message: string) => void;
}

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

const TodoList: React.FC<ITodoList> = ({ todos, setTodos, showToast }) => {

  const createTodo = (todo: Todo) => {
    const oldTodos = Array.from(todos);
    oldTodos.unshift(todo);
    setTodos(oldTodos);
    showToast('Todo has been created!');
  }

  /**
   * Update Todo to Complete/InComplete
   * @param id 
   */
  const updateTodoStatus = (id: string) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
        showToast(`Todo status has been updated to ${todo.isComplete ? 'Finished' : 'Unfinished'}`)
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const removeTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    showToast('Todo has been removed!');
  }

  /** Display a message if there's no todos in the list */
  if (todos.length <= 0) {
    return (
      <Container>
        <TodoForm showToast={showToast} createTodo={createTodo} />
        <Row className='mt-4'>
          <Col md='12'>
            <p className='text-center'>Relax! You don't have anything to do 🎉</p>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <TodoForm showToast={showToast} createTodo={createTodo} />
      { todos.map(todo => (
        <Row key={todo.id} className='my-2'>
          <Col md="12">
            <Todo todo={todo} updateTodoStatus={updateTodoStatus} removeTodo={removeTodo} />
          </Col>
        </Row>
      )) }
    </Container>
  )
}

export default TodoList