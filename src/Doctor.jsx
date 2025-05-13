import React, { useEffect, useState } from 'react';

const DoctorInfo = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('/api/doctors')
            .then(response => response.json())
            .then(data => {
                console.log("API result:", data);
                // Nếu backend trả về { status, message, data }, thì dùng data.data
                setDoctors(Array.isArray(data) ? data : data.data);
            })
            .catch(error => console.error('Error fetching doctor data:', error));
    }, []);

    if (!Array.isArray(doctors)) {
        return <div>Không có dữ liệu bác sĩ.</div>;
    }

    return (
        <div className="doctor-info">
            <h1>Danh sách bác sĩ</h1>
            {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <div><strong>Tên:</strong> {doctor.name}</div>
                    <div><strong>Chuyên khoa:</strong> {doctor.specialty}</div>
                    <div><strong>Số điện thoại:</strong> {doctor.phone}</div>
                    <div><strong>Email:</strong> {doctor.email}</div>
                    <div><strong>Địa chỉ:</strong> {doctor.address}</div>
                    <div><strong>Số giấy phép:</strong> {doctor.licenseNumber}</div>
                    <div><strong>Bằng cấp:</strong> {doctor.qualification}</div>
                </div>
            ))}
        </div>
    );
};

export default DoctorInfo;
