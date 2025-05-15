import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorInfo from './components/Doctor';
import MedicalRecordInfo from './components/MedicalRecord';
import Navbar from './components/Navbar';

function App() {
    return (
            <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/doctor" element={<DoctorInfo />} />
                    <Route path="/medical-record" element={<MedicalRecordInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
