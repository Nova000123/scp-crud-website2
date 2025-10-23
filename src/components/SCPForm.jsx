import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

// SCP Form Component
function SCPForm({ scp, onSubmit, onCancel, show }) {
    const [formData, setFormData] = useState({
        item: '',
        class: 'Safe',
        description: '',
        containment: '',
        image_url: ''
    });
    const [errors, setErrors] = useState({});
// Populate form when editing an SCP
    useEffect(() => {
        if (scp) {
            setFormData({
                item: scp.item || '',
                class: scp.class || 'Safe',
                description: scp.description || '',
                containment: scp.containment || '',
                image_url: scp.image_url || ''
            });
        } else {
            setFormData({
                item: '',
                class: 'Safe',
                description: '',
                containment: '',
                image_url: ''
            });
        }
        setErrors({});
    }, [scp, show]);
// Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    // Form validation
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.item.trim()) {
            newErrors.item = 'SCP Item is required';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        
        if (!formData.containment.trim()) {
            newErrors.containment = 'Containment procedures are required';
        }
        
        if (formData.image_url && !isValidUrl(formData.image_url)) {
            newErrors.image_url = 'Please enter a valid URL';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // URL validation helper
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };
    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        onSubmit(formData);
    };
    // Render form modal
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{scp ? 'Edit SCP' : 'Add New SCP'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="scp-form">
                    <div className="form-group">
                        <label>SCP Item</label>
                        <input
                            type="text"
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            placeholder="SCP-173"
                            className={`form-control ${errors.item ? 'error' : ''}`}
                        />
                        {errors.item && <span className="error-text">{errors.item}</span>}
                    </div>

                    <div className="form-group">
                        <label>Object Class</label>
                        <select 
                            name="class" 
                            value={formData.class} 
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="Safe">Safe</option>
                            <option value="Euclid">Euclid</option>
                            <option value="Keter">Keter</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the SCP..."
                            rows="3"
                            className={`form-control ${errors.description ? 'error' : ''}`}
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label>Containment Procedures</label>
                        <textarea
                            name="containment"
                            value={formData.containment}
                            onChange={handleChange}
                            placeholder="Containment procedures..."
                            rows="3"
                            className={`form-control ${errors.containment ? 'error' : ''}`}
                        />
                        {errors.containment && <span className="error-text">{errors.containment}</span>}
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={`form-control ${errors.image_url ? 'error' : ''}`}
                        />
                        {errors.image_url && <span className="error-text">{errors.image_url}</span>}
                    </div>

                    <div className="form-buttons">
                        <button type="button" onClick={onCancel} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            {scp ? 'Update SCP' : 'Add SCP'}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default SCPForm;
