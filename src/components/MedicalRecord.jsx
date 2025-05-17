import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MedicalRecordInfo() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/MedicalRecord')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data.status === 'OK' && Array.isArray(data.data)) {
          setMedicalRecords(data.data);
        } else {
          setError('Invalid data format');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading medical records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Danh sách hồ sơ bệnh án</h1>
      {medicalRecords.length === 0 && <p>No medical records found.</p>}

      {medicalRecords.map(record => (
        <div key={record.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h2>ID hồ sơ: {record.id}</h2>

          <h3>Thông tin bệnh nhân</h3>
          <p><b>Tên:</b> {record.patient?.name || 'N/A'}</p>
          <p><b>Ngày sinh:</b> {record.patient?.dob ? new Date(record.patient.dob).toLocaleDateString() : 'N/A'}</p>
          <p><b>Địa chỉ:</b> {record.patient?.address || 'N/A'}</p>

          <h3>Thông tin bác sĩ</h3>
          <p><b>Tên:</b> {record.doctor?.name || 'N/A'}</p>
          <p><b>Chuyên ngành:</b> {record.doctor?.specialty || 'N/A'}</p>
          <p><b>SDT:</b> {record.doctor?.phone || 'N/A'}</p>
          <p><b>Email:</b> {record.doctor?.email || 'N/A'}</p>
          <p><b>Địa chỉ:</b> {record.doctor?.address || 'N/A'}</p>
          <p><b>Số bằng cấp:</b> {record.doctor?.licenseNumber || 'N/A'}</p>
          <p><b>Chứng chỉ:</b> {record.doctor?.qualification || 'N/A'}</p>

          <h3>Thông tin ngày khám</h3>
          <p><b>Ngày khám:</b> {record.visit_date ? new Date(record.visit_date).toLocaleDateString() : 'N/A'}</p>
          <p><b>Ngày xuất viện:</b> {record.discharge_date ? new Date(record.discharge_date).toLocaleDateString() : 'N/A'}</p>
          <p><b>Triệu chứng:</b> {record.symptom || 'N/A'}</p>
          <p><b>Chuẩn đoán:</b> {record.diagnosis || 'N/A'}</p>

          <h3>Kê đơn thuốc</h3>
          {record.prescription && record.prescription.length > 0 ? (
            <ul>
              {record.prescription.map(p => (
                <li key={p.id}>
                  <b>{p.medicine_name}</b> - Liều lượng: {p.dosage} mg, Tần suất: {p.frequency} lần/ngày, Uống trong: {p.duration} ngày<br />
                  Hướng dẫn: {p.instructions}
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions</p>
          )}

          <p><b>Ghi chú:</b> {record.note || 'N/A'}</p>
          <Link to={`/medical-record/${record.id}`}>
            <button>Chỉnh sửa</button>
          </Link>


        </div>
      ))}
    </div>
  );
}

export default MedicalRecordInfo;
