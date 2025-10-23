import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';

// Define badge classes for containment levels
const badgeClasses = {
  Safe: 'safe-badge',
  Euclid: 'euclid-badge', 
  Keter: 'keter-badge'
};

// SCP Details Component
function SCPDetails({ scp, show, onClose, onEdit, onDelete }) {
  if (!scp) return null;
// Render SCP details in a modal
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>
          {scp.item} - <Badge className={badgeClasses[scp.class] || 'safe-badge'}>{scp.class}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-content">
        <Row>
          <Col md={6}>
            <img 
              src={scp.image_url || 'https://via.placeholder.com/400x300/2d2d44/ffffff?text=SCP'} 
              alt={scp.item}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Col>
          <Col md={6}>
            <h5>Description</h5>
            <p className="card-text">{scp.description}</p>
            
            <h5>Containment Procedures</h5>
            <p className="card-text">{scp.containment}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="modal-header">
        <Button variant="secondary" onClick={onClose}>
          CLOSE
        </Button>
        <div className="d-flex gap-2">
          <Button className="edit-btn" onClick={() => onEdit(scp)}>
            EDIT
          </Button>
          <Button className="delete-btn" onClick={() => onDelete(scp.id)}>
            DELETE
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SCPDetails;