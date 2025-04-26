import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductById } from '../api'; // Assume this API function exists

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <Button variant="primary" className="me-2">Add to Cart</Button>
          <Button variant="success">Buy Now</Button>
          <p className="mt-3">{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;