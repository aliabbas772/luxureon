import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../api'; // Assume this API function exists

const Shopnow = () => {
  const [products, setProducts] = useState([]);
  const [section, setSection] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsWithCategory = data.map(product => {
          const fileName = product.imageUrl.split('/').pop();
          const category = fileName.startsWith('men_') ? 'men' :
                          fileName.startsWith('women_') ? 'women' :
                          fileName.startsWith('kids_') ? 'kids' : 'other';
          return { ...product, category };
        });
        setProducts(productsWithCategory);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = section === 'all' ? products : products.filter(product => product.category === section);

  return (
    <Container>
      <h1>Shop Now</h1>
      <Nav variant="tabs" defaultActiveKey="all" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="all" onClick={() => setSection('all')}>All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="men" onClick={() => setSection('men')}>Men</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="women" onClick={() => setSection('women')}>Women</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="kids" onClick={() => setSection('kids')}>Kids</Nav.Link>
        </Nav.Item>
      </Nav>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card as={Link} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
              <Card.Body className="text-center">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shopnow;