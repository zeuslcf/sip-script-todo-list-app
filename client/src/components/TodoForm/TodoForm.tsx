import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { Todo } from '../TodoList/TodoList';
import { v4 as uuidv4 } from 'uuid';

interface ITodoList {
  showToast: (message: string) => void;
  createTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<ITodoList> = ({ showToast, createTodo }) => {

  const [input, setInput] = useState('');

  const handleCreateTodo = () => {
    if (!input) {
      showToast('Please fill in the text before submitting!')
    }

    const todo: Todo = {
      id: uuidv4(),
      isComplete: false,
      title: input
    };

    createTodo(todo);
    setInput('');
  }

  return (
    <Container className='px-3'>
      <Row>
        <Col md='11'>
          <Form.Control type="text" placeholder="Type your todo..." value={input} onChange={(e) => setInput(e.target.value)} />
        </Col>
        <Col md='1'>
          <Button type='button' variant='primary' size='sm' onClick={handleCreateTodo}>
            <Plus></Plus>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default TodoForm