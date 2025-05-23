// MedicalRecordDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MedicalRecordDetail() {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(null);

    // 14.4.1
    useEffect(() => {
        fetch(`/api/MedicalRecord/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (data.status === 'OK' && data.data) {
                    setRecord(data.data);
                    setFormData(data.data);
                } else {
                    setError('Invalid data format');
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Đang tải hồ sơ...</p>;
    if (error) return <p>Lỗi: {error}</p>;
    if (!record) return <p>Không tìm thấy hồ sơ.</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const payload = {
            id: formData.id,
            patient: { id: formData.patient?.id },
            doctor: { id: formData.doctor?.id },
            visit_date: formData.visit_date,
            discharge_date: formData.discharge_date,
            symptom: formData.symptom,
            diagnosis: formData.diagnosis,
            note: formData.note,
        };
    
        console.log("Payload gửi đi:", payload);
    
        fetch(`/api/MedicalRecord/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                // Nếu response không OK, hiển thị message từ JSON
                // 14.10.2
                throw new Error(data.message || `Lỗi ${res.status}`);
            }
            // 14.10.1
            alert(data.message || 'Lưu thành công');
            setRecord(data.data);
            // 14.11 , 14.4.2   
            window.location.href = 'http://localhost:3000/medical-record';
        })
        .catch(err => {
            alert(`Lỗi khi lưu: ${err.message}`);
        });
        
    };

    const cancel = () => {
        window.location.href = 'http://localhost:3000/medical-record';
    };
    
    return (
        <div>
            <h1>Chi tiết hồ sơ bệnh án #{record.id}</h1>
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
            <p>
                <b>Ngày khám:</b>
                <input
                    type="date"
                    value={record.visit_date ? new Date(record.visit_date).toISOString().split('T')[0] : ''}
                    readOnly
                />
            </p>
            <p>
                <b>Ngày xuất viện:</b>
                <input
                    type="date"
                    name="discharge_date"
                    value={formData?.discharge_date ? new Date(formData?.discharge_date).toISOString().split('T')[0] : ''}
                    onChange={handleChange}
                />
            </p>
            <p>
                <b>Triệu chứng:</b>
                <input
                    type="text"
                    name="symptom"
                    value={formData?.symptom || ''}
                    onChange={handleChange}
                />
            </p>
            <p>
                <b>Chuẩn đoán:</b>
                <input
                    type="text"
                    name="diagnosis"
                    value={formData?.diagnosis || ''}
                    onChange={handleChange}
                />
            </p>

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
                <p>Không có đơn thuốc</p>
            )}

            <p>
                <b>Ghi chú  :</b>
                <input
                    type="text"
                    value={record.note || ''}
                    readOnly
                />
            </p>
            {/* 14.3.1 */}
            <button onClick={handleSave}>Lưu</button>
            {/* 14.3.2 */}
            <button onClick={cancel}>Hủy</button>

        </div>
    );
}

export default MedicalRecordDetail;
