import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
            <Link to="/doctor" style={{ marginRight: '20px' }}>Doctor Info</Link>
            {/* 14.1 */}
            <Link to="/medical-record">Hồ sơ bệnh án</Link>
        </nav>
    );
}

export default Navbar;
