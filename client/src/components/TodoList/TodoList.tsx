import React, { Dispatch } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';
import { apiBaseUrl } from "../../App";

interface ITodoList {
  todos: ITodo[];
  setTodos: Dispatch<React.SetStateAction<ITodo[]>>;
  showToast: (message: string) => void;
}

export interface ITodo {
  id: string;
  title: string;
  isComplete: boolean;
}

const TodoList: React.FC<ITodoList> = ({ todos, setTodos, showToast }) => {

  const createTodo = async (todo: Pick<ITodo, 'title' | 'isComplete'>) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      if (response.ok) {
        setTodos([data, ...todos]);
        showToast('Todo has been created!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast("Error creating todo!");
    }
  }

  /**
   * Update Todo to Complete/InComplete
   * @param id 
   */
  const updateTodoStatus = async (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const todoStatus = { isComplete: !todoToUpdate.isComplete };
      try {
        const response = await fetch(`${apiBaseUrl}/api/todo/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todoStatus),
        });
        if (response.ok) {
          setTodos(todos.map(todo => todo.id === id ? {...todo, ...todoStatus} : todo));
          showToast(`Todo status has been updated to ${todoStatus.isComplete ? 'Finished' : 'Unfinished'}`);
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (error) {
        showToast("Error updating todo!");
      }
    } else {
      showToast('No todo found to update!');
    }
  }

  /**
   * Remove Todo from the list
   */
  const removeTodo = async (id: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/todo/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
        showToast('Todo has been removed!');
      } else {
        showToast("Error deleting todo!");
      }
    } catch (error) {
      showToast("Error deleting todo!");
    }
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

export default TodoList;