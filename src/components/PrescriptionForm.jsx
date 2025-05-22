import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';





function PrescriptionForm() {
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');

    const [diagnosis, setDiagnosis] = useState('');
    const [medications, setMedications] = useState([
        { name: '', dosage: '', quantity: '', instructions: '' },
    ]);
    const [note, setNote] = useState('');
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [visitDate, setVisitDate] = useState(dayjs().format('YYYY-MM-DD'));

    useEffect(() => {
        async function fetchPatient() {
            try {
                const response = await fetch('http://localhost:8080/api/patients/1');
                if (response.ok) {
                    const data = await response.json();
                    setPatientName(data.name);
                    setAge(data.age.toString());
                    setGender(data.gender);
                    setAddress(data.address);
                    setDob(dayjs(data.dob).format('YYYY-MM-DD'));
                } else {
                    alert('Không tìm thấy bệnh nhân với id = 1');
                }
            } catch (error) {
                console.error(error);
                alert('Lỗi kết nối tới server');
            }
        }
        fetchPatient();
    }, []);

    useEffect(() => {
    async function fetchMedicines() {
        try {
            const response = await fetch('http://localhost:8080/api/medicines');
            if (response.ok) {
                const data = await response.json();
                setMedicineOptions(data);
            } else {
                alert('Không lấy được danh sách thuốc');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server khi lấy thuốc');
        }
    }
    fetchMedicines();
}, []);


    const addMedication = () => {
        setMedications([...medications, { name: '', dosage: '', quantity: '', instructions: '' }]);
    };

    const removeMedication = (index) => {
        if (medications.length > 1) {
            setMedications(medications.filter((_, i) => i !== index));
        }
    };

    const updateMedication = (index, field, value) => {
        const updated = [...medications];
        updated[index][field] = value;
        setMedications(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            patientName,
            age: Number(age),
            gender,
            dob,
            address,
            visitDate,
            diagnosis,
            medications: medications.map((med) => ({
                ...med,
                quantity: Number(med.quantity),
            })),
            note,
        };


        try {
            const response = await fetch('http://localhost:8080/api/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Đơn thuốc đã được lưu thành công!');
                setPatientName('');
                setAge('');
                setGender('');
                setVisitDate('');
                setDiagnosis('');
                setMedications([{ name: '', dosage: '', quantity: '', instructions: '' }]);
                setNote('');
            } else {
                const errorData = await response.json();
            alert('Lỗi: ' + errorData.message);

            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối tới server');
        }
    };


    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit} className="card shadow-lg">
                <div className="card-body">
                    <h2 className="text-center mb-4 text-primary">🩺 Lên Đơn Thuốc Online</h2>

                    {/* Thông tin bệnh nhân */}
                    <div className="form-section-title">🧑‍⚕️ Thông tin bệnh nhân</div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên bệnh nhân</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên bệnh nhân"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Tuổi</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Tuổi"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Giới tính</label>
                            <select
                                className="form-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Chọn
                                </option>
                                <option>Nam</option>
                                <option>Nữ</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Địa chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Chẩn đoán</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Viêm họng cấp, sốt nhẹ..."
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            required
                        />
                    </div>

                    {/* Danh sách thuốc */}
                    <div className="form-section-title mt-4">💊 Danh sách thuốc</div>
                    {medications.map((med, index) => (
                        <div className="row g-3 mb-3 medication-item" key={index}>
                            <div className="col-md-4">
                                <select
                                        className="form-select"
                                        value={med.name}
                                        onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                        required
                                    >
                                        <option disabled value="">-- Chọn tên thuốc --</option>
                                        {medicineOptions.map((medicine) => (
                                            <option key={medicine.id} value={medicine.name}>
                                                {medicine.name}
                                            </option>
                                        ))}
                                </select>

                            </div>
                            <div className="col-md-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Liều dùng"
                                    value={med.dosage}
                                    onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Số lượng"
                                    value={med.quantity}
                                    onChange={(e) => updateMedication(index, 'quantity', e.target.value)}
                                    required
                                    min={1}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Hướng dẫn dùng"
                                    value={med.instructions}
                                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                                />
                            </div>
                            <div className="col-md-1 d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeMedication(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addMedication} className="btn btn-outline-primary btn-sm mb-4">
                        + Thêm thuốc
                    </button>

                    {/* Ghi chú */}
                    <div className="form-section-title">📝 Ghi chú thêm</div>
                    <textarea
                        className="form-control mb-4"
                        rows="3"
                        placeholder="Các dặn dò thêm cho bệnh nhân..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>

                    {/* Nút gửi */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-success btn-lg px-5">
                            💾 Gửi đơn thuốc
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PrescriptionForm;
