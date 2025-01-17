import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Button, Navbar, Container } from 'react-bootstrap'
import { ThemeContext } from '../../App'
import { Check2All, Moon } from 'react-bootstrap-icons'

interface IAppHeader {
  setTheme: Dispatch<SetStateAction<string>>
}

const AppHeader: React.FC<IAppHeader> = ({setTheme}) => {
  const theme = useContext(ThemeContext);
  const toggleTheme = () => (theme === 'light') ? setTheme('dark') : setTheme('light');
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <Check2All/>&nbsp;
          <span>Todo List App</span>  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button type='button' variant='seconday' onClick={toggleTheme}>
              <Moon />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader