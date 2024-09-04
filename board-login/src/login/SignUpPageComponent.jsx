import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // React Router v6의 Navigate 컴포넌트
import AxiosService from '../service/AxiosService';
import HashingService from '../service/HashingService';
import AddressPopup from './AddressPopup'; // DaumPostcode 컴포넌트 import

const SignUpPageComponent = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    age: '',
    sex: '',
    phoneNumber: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림 상태
  const [navigateTo, setNavigateTo] = useState(null);
  
  const handleAddressComplete = (fullAddress) => {
    form.address = fullAddress;
    setIsPopupOpen(false); // 팝업 닫기
  };

  const handleInputClick = () => {
    if (!isPopupOpen) { // 팝업이 열려 있지 않은 경우에만 열기
      setIsPopupOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    setError('');
  };

  const signUpService = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!form.address) {
      setError('주소정보는 필수 입니다.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 암호화
    const orginPassword = form.password;
    form.password = HashingService.encryptText(form.password);
    form.confirmPassword = HashingService.encryptText(form.confirmPassword);

    AxiosService.apiRequest('POST', 'api/create', form)
            .then((res) => {
                // 성공 메시지 표시
                alert('회원가입에 성공하였습니다!');
                setNavigateTo('/');
            })
            .catch((error) => {
              form.password = orginPassword;
              form.confirmPassword = orginPassword;
              setError("회원가입 실패하였습니다.");
            });
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>회원가입</h2>
      <form style={styles.form} onSubmit={signUpService}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>아이디</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>생년월일</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>나이</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>성별</label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>주소</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            style={styles.input}
            placeholder="주소를 검색하세요"
            onClick={handleInputClick} // 주소 검색 팝업 열기
            readOnly
          />
          {isPopupOpen && <AddressPopup onClose={() => setIsPopupOpen(false)} onComplete={handleAddressComplete} />}
          </div>
          {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '105vh',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    color: '#4a90e2',
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center', // 타이틀을 중앙에 정렬
    width: '100%', // 타이틀이 컨테이너의 너비에 맞추어 확장
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px', // 폼의 너비를 400px로 확장
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    height: 'auto', // 폼의 높이를 자동으로 설정
    overflow: 'hidden', // 내용이 넘치지 않도록 설정
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: '#333333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #dcdcdc',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '14px',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
    fontSize: '14px',
  },
};

export default SignUpPageComponent;
