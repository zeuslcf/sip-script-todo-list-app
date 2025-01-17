import React, { useEffect, useState } from 'react'
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';

interface ITodo {
  toastMessage: string;
}

const Toast: React.FC<ITodo> = ({ toastMessage }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (toastMessage) {
      setMessage(toastMessage);
      setShow(true);
    }
  }, [toastMessage]);

  return (
    <ToastContainer position='bottom-center' className='p-3'>
      <BootstrapToast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <BootstrapToast.Body>{ message }</BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
}

export default Toast