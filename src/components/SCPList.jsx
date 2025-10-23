import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { supabase } from '../services/supabase';
import SCPCard from './SCPCard';
import SCPForm from './SCPForm';
import SCPDetails from './SCPDetails';

// SCP List Component
function SCPList() {
    const [scps, setScps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentScp, setCurrentScp] = useState(null);

// Fetch SCPs on component mount
    useEffect(() => {
        getScps();
    }, []);

// Fetch SCPs from Supabase
    async function getScps() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('scp_subjects')
                .select('*')
                .order('item', { ascending: true });

            if (error) throw error;
            setScps(data || []);
        } catch (err) {
            setErrorMsg(err.message);
            console.error('Error fetching SCPs:', err);
        } finally {
            setLoading(false);
        }
    }
// Handlers for view, edit, delete, and save
    function handleView(scp) {
        setCurrentScp(scp);
        setShowDetails(true);
    }
// Edit handler
    function handleEdit(scp) {
        setCurrentScp(scp);
        setShowForm(true);
    }
// Delete handler
    async function handleDelete(id) {
        const confirmDelete = window.confirm('Are you sure you want to delete this SCP?');
        if (!confirmDelete) return;
        try {
            const { error } = await supabase.from('scp_subjects').delete().eq('id', id);
            if (error) throw error;
            getScps();
            setShowDetails(false);
        } catch (err) {
            setErrorMsg(err.message);
        }
    }
// Save handler
    async function handleSave(formData) {
        try {
            if (currentScp) {
                const { error } = await supabase
                    .from('scp_subjects')
                    .update(formData)
                    .eq('id', currentScp.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('scp_subjects').insert([formData]);
                if (error) throw error;
            }
            setShowForm(false);
            setCurrentScp(null);
            getScps();
        } catch (err) {
            setErrorMsg(err.message);
        }
    }
// Close all modals
    function closeAll() {
        setShowForm(false);
        setShowDetails(false);
        setCurrentScp(null);
    }
// Render loading state
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading SCP Data...</p>
            </Container>
        );
    }
// Render main component
    return (
        <Container>
            <div className="text-center mb-4">
                <h1 className="page-title">SCP DATABASE</h1>
                <p className="subtitle">Explore and manage SCP subjects</p>
                <Button className="add-btn" onClick={() => setShowForm(true)}>
                    + Add SCP
                </Button>
            </div>
            
            {errorMsg && (
                <Alert variant="danger" onClose={() => setErrorMsg('')} dismissible>
                    {errorMsg}
                </Alert>
            )}
            
            <Row>
                {scps.map((scp) => (
                    <Col key={scp.id} md={6} lg={4} className="mb-4">
                        <SCPCard
                            scp={scp}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Col>
                ))}
            </Row>

            {scps.length === 0 && !loading && (
                <Alert variant="info" className="text-center">
                    No SCPs found. Try adding one!
                </Alert>
            )}

            <SCPDetails
                scp={currentScp}
                show={showDetails}
                onClose={closeAll}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <SCPForm
                scp={currentScp}
                onSubmit={handleSave}
                onCancel={closeAll}
                show={showForm}
            />
        </Container>
    );
}

export default SCPList;