import React from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { Todo as TodoItem } from '../TodoList/TodoList';

interface ITodo {
  todo: TodoItem;
  updateTodoStatus: (id: string) => void;
  removeTodo: (id: string) => void;
}

const Todo: React.FC<ITodo> = ({ todo, updateTodoStatus, removeTodo }) => {

  const handleTodoChange = () => {
    updateTodoStatus(todo.id);
  }

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md="11">
              <Form>
                <Form.Check type='checkbox' id={todo.id} label={todo.title} checked={todo.isComplete} onChange={handleTodoChange} />
              </Form>
            </Col>
            <Col md='1'>
              <Button variant='outline-danger' size='sm' onClick={handleRemoveTodo}>
                <Trash></Trash>
              </Button>
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Todo;