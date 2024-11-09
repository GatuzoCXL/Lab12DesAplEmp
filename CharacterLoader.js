import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { FaUserAlt, FaBirthdayCake, FaWeight, FaRulerVertical } from 'react-icons/fa';

function CharacterLoader({ searchTerm }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState('https://swapi.dev/api/people/');

  const loadCharacters = async (url) => {
    if (!url || loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get(url);
      setCharacters(prev => [...prev, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters('https://swapi.dev/api/people/');
  }, []);

  const filteredCharacters = characters
    .filter(character => 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.mass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.height.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      <Row>
        {filteredCharacters.map((character, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="character-card">
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <div className="info-row">
                    <FaUserAlt /> <span>{character.gender}</span>
                  </div>
                  <div className="info-row">
                    <FaBirthdayCake /> <span>{character.birth_year}</span>
                  </div>
                  <div className="info-row">
                    <FaWeight /> <span>{character.mass} kg</span>
                  </div>
                  <div className="info-row">
                    <FaRulerVertical /> <span>{character.height} cm</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && (
        <div className="text-center w-100 my-4">
          <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
          </Spinner>
        </div>
      )}
      {nextPage && !loading && (
        <div className="text-center my-4">
          <Button 
            variant="outline-warning" 
            onClick={() => loadCharacters(nextPage)}
            className="load-more-button"
          >
            Cargar más personajes
          </Button>
        </div>
      )}
    </Container>
  );
}

export default CharacterLoader;