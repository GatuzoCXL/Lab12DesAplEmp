import React, { useState } from 'react';
import './App.css';
import CharacterLoader from './CharacterLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaJedi } from 'react-icons/fa';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <Container className="main-container">
        <div className="header-content">
          <FaJedi className="jedi-icon" />
          <h1>Personajes de Star Wars</h1>
        </div>
        <InputGroup className="search-container">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Busca por nombre, sexo, masa o altura..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </InputGroup>
        <CharacterLoader searchTerm={searchTerm} />
      </Container>
    </div>
  );
}

export default App;