import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { ITodo } from '../TodoList/TodoList';

interface ITodoList {
  showToast: (message: string) => void;
  createTodo: (todo: Pick<ITodo, 'title' | 'isComplete'>) => void;
}

const TodoForm: React.FC<ITodoList> = ({ showToast, createTodo }) => {

  const [input, setInput] = useState('');

  const handleCreateTodo = () => {
    if (!input) {
      showToast('Please fill in the text before submitting!')
    }

    const todo: Pick<ITodo, 'title' | 'isComplete'> = {
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