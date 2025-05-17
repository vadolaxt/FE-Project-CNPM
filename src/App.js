import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorInfo from './components/Doctor';
import MedicalRecordInfo from './components/MedicalRecord';
import MedicalRecordDetail from './components/MedicalRecordDetail';
import Navbar from './components/Navbar';

function App() {
    return (
            <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/doctor" element={<DoctorInfo />} />
                    <Route path="/medical-record" element={<MedicalRecordInfo />} />
                    <Route path="/medical-record/:id" element={<MedicalRecordDetail />} /> 

                </Routes>
            </div>
        </Router>
    );
}

export default App;
