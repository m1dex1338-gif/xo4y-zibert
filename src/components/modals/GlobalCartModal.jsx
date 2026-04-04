import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GlobalCartModal() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleShowModal = (e) => {
      setProduct(e.detail.product);
      setMessage(e.detail.message || 'Товар додано до кошика!');
      setShow(true);
    };

    window.addEventListener('showCartModal', handleShowModal);
    return () => {
      window.removeEventListener('showCartModal', handleShowModal);
    };
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fs-5 fw-bold">{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {product && (
          <div>
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
              alt={product.name || product.Productname} 
              style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }} 
              className="mb-3 rounded"
            />
            <h5 className="fw-semibold">{product.name || product.Productname}</h5>
            <p className="fw-bold fs-5 text-dark">
              {product.price} {product.price && !String(product.price).includes('₴') ? '₴' : ''}
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0 gap-2">
        <Button variant="outline-dark" className="px-4 py-2 rounded-3" onClick={handleClose}>
          Продовжити покупки
        </Button>
        <Link to="/cart" className="btn btn-dark px-4 py-2 rounded-3" onClick={handleClose}>
          Перейти до кошика
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default GlobalCartModal;
