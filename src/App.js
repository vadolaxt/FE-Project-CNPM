import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorInfo from './components/Doctor';
import MedicalRecordInfo from './components/MedicalRecord';
import MedicalRecordDetail from './components/MedicalRecordDetail';
import Navbar from './components/Navbar';
import PrescriptionForm from './components/PrescriptionForm';


function App() {
    return (
            <Router>
            <div className="App">
                <Navbar />
               <Routes>
                    <Route path="/prescriptions" element={<PrescriptionForm />} />
                    <Route path="/doctor" element={<DoctorInfo />} />
                    <Route path="/medical-record" element={<MedicalRecordInfo />} />
<<<<<<< HEAD
                    <Route path="/medical-record/:id" element={<MedicalRecordDetail />} /> 
=======
                    <Route path="/medical-record/:id" element={<MedicalRecordDetail />} />
>>>>>>> 3dbaeac966d8d2d99e98ed17633bbbd996f1069b
                </Routes>

            </div>
        </Router>
    );
}

export default App;
