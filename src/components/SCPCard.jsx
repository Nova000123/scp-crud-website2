import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

// Badge color classes
const badgeClasses = {
    Safe: 'safe-badge',
    Euclid: 'euclid-badge', 
    Keter: 'keter-badge'
};

// SCP Card Component
function SCPCard({ scp, onView, onEdit, onDelete }) {
    const { item, class: scpClass, description, image_url, id } = scp;
    
    const truncatedDescription = description?.length > 120 
        ? `${description.substring(0, 120)}...`
        : description || 'No description available';
    
    return (
        <Card className="scp-card h-100">
            <Card.Img 
                variant="top" 
                src={image_url || 'https://via.placeholder.com/300x200/2d2d44/ffffff?text=SCP'} 
                style={{ height: '180px', objectFit: 'cover' }}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/2d2d44/ffffff?text=SCP';
                }}
            />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="card-title">{item || 'Unnamed SCP'}</Card.Title>
                    <Badge className={badgeClasses[scpClass] || 'safe-badge'}>
                        {scpClass || 'Unknown'}
                    </Badge>
                </div>

                <Card.Text className="card-text">
                    {truncatedDescription}
                </Card.Text>

                <div className="mt-auto">
                    <div className="d-grid gap-2">
                        <Button className="view-btn button" onClick={() => onView(scp)}>
                            VIEW DETAILS
                        </Button>
                        <div className="d-flex gap-2">
                            <Button className="edit-btn button" onClick={() => onEdit(scp)}>
                                EDIT
                            </Button>
                            <Button className="delete-btn button" onClick={() => onDelete(id)}>
                                DELETE
                            </Button>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default SCPCard;