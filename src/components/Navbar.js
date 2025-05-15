import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
            <Link to="/doctor" style={{ marginRight: '20px' }}>Doctor Info</Link>
            <Link to="/medical-record">Medical Record Info</Link>
        </nav>
    );
}

export default Navbar;
