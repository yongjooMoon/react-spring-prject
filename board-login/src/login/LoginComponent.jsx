import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // React Router v6의 Navigate 컴포넌트
import { useUser } from '../context/UserContext';
import AxiosService from '../service/AxiosService';
import HashingService from '../service/HashingService';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);
  const [user, setUser] = useState({
    userList: []
  });
  const [isChecked, setIsChecked] = useState(false);
  const { setInfo } = useUser(); // 컨텍스트에서 setUser 가져오기

  useEffect(() => {
    // 로컬 스토리지에 id 저장되어있으면 id, 체크박스 세팅
    const userString = localStorage.getItem('userId');
    if (userString) {
        setId(userString);
        setIsChecked(true);
    }

    // 토큰이 만료되지 않은 사용자인지 체크
    // AxiosService.apiRequest('POST', 'api/tokenCheck')
    //       .then((res) => {
    //           // 기존 토큰 발행한 유저가 아니면 설정 종료
    //           if(res.data.tokenCheck === "N"){
    //             return;
    //           }

    //           setUser({ 
    //               userList: res.data.list
    //           });

    //           const param = res.data.list;
    //           // 컨텍스트에 전역 변수 가지고 다니기
    //           setInfo({param});
    //           setNavigateTo('/board');
    //           setIsLoading(false);
    //       })
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const signUp = () => {
    setNavigateTo('/signUp');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        loginService(e); // 엔터키를 누르면 loginService 호출
    }
  };
  
  const loginService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 간단한 유효성 검사
    if (!id || !password) {
      setError('Id 또는 password는 필수입니다.');
      setIsLoading(false);
      return;
    }

    try {
        // 비밀번호 암호화
        const orginPassword = password;
        
        const info = {
            id,
            password
        };

        // 아이디 저장 체크
        if(isChecked){
            localStorage.setItem('userId', id);
        }else{
            localStorage.removeItem('userId');
        }

        info.password = HashingService.encryptText(password);
        AxiosService.apiRequest('POST', 'api/login', info)
          .then((res) => {
              setUser({ 
                  userList: res.data.list
              });

              const param = res.data.list;
              // 컨텍스트에 전역 변수 가지고 다니기
              setInfo({param});
              // setNavigateTo('/board', { userInfo: { user } }); 파라미터 넘기기
              setNavigateTo('/board');
              setIsLoading(false);
          })
          .catch((error) => {
              //console.error("로그인 실패하였습니다.", error);
              setError("로그인 실패하였습니다.");
              setPassword(orginPassword);
              setIsLoading(false);
          });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Id</label>
          <input
            type="id"
            value={id}
            onChange={handleIdChange}
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
            style={styles.input}
          />
        </div>
        <div style={styles.checkboxContainer}>
            <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={styles.checkbox}
            />
            <label style={styles.label}>Save ID</label>
        </div>
        <div style={styles.buttonContainer}>
            <button className="btn btn-link" onClick={signUp}>회원가입</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="button" onClick={loginService} style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
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
      height: '85vh',
      backgroundColor: '#f9f9f9',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      color: '#4a90e2',
      marginBottom: '20px',
      fontSize: '24px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
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
    inputFocus: {
      borderColor: '#4a90e2',
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
    buttonHover: {
      backgroundColor: '#357ABD',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
      fontSize: '14px',
    },

    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      checkbox: {
        marginRight: '10px',
      },
      buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 1,
      },
  };

export default LoginPage;
