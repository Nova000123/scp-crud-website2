import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../assets/logo.png'; 

// Header component
function Header() {
    return (
        <header className="header" style={{ background: '#0d1117', padding: '20px 0' }}>
            <Container>
                <div
                    className="header-content"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        color: '#fff',
                    }}
                >
                    <img
                        src={logo}
                        alt="SCP Logo"
                        style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                    />
                    
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>SCP FOUNDATION DATABASE</h1>
                        <p style={{ margin: 0, color: '#8b949e' }}>SECURE . CONTAIN . PROTECT</p>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;

