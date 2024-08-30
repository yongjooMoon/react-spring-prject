import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginService from '../service/LoginService';

const HeaderComponent = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 사용

    const isLoginPage = location.pathname === '/';
    const isSignPage = location.pathname === '/signUp';

    const loginPage = () => {
        LoginService.logOut().then((res) => {
            if (res.status === 200) {
                navigate('/'); // useNavigate로 페이지 이동
            } else {
                alert("로그아웃 실패하였습니다.");
            }
        });
    };

    const handleNavigation = (path) => {
        navigate(path); // 경로로 페이지 이동
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-left">
                        {!isLoginPage && !isSignPage ? (
                            <span onClick={() => handleNavigation('/board')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                Board-FullStack-App
                            </span>
                        ) : (
                            <span className="navbar-brand">Board-FullStack-App</span>
                        )}
                    </div>
                    
                    <div className="navbar-center" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {!isLoginPage && !isSignPage ? (
                            <>
                                <span onClick={() => handleNavigation('/board')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                    게시판
                                </span>
                                <span onClick={() => handleNavigation('/product')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                    상품
                                </span>
                                <span onClick={() => handleNavigation('/menu3')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                    메뉴3
                                </span>
                                <span onClick={() => handleNavigation('/menu4')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                    메뉴4
                                </span>
                                <span onClick={() => handleNavigation('/menu5')} className="navbar-brand" style={{ cursor: 'pointer' }}>
                                    메뉴5
                                </span>
                            </>
                        ) : (
                            <span></span>
                        )}
                    </div>

                    <div className="navbar-right">
                        {isSignPage ? (
                            <span 
                                onClick={() => handleNavigation('/')} 
                                className="navbar-brand" 
                                style={{ 
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#555'}  // 호버 시 배경색 변경
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}  // 원래 색으로 복원
                            >
                                로그인
                            </span>
                        ) : (
                            ''
                        )}
                        {!isLoginPage && !isSignPage ? (
                            <span 
                                onClick={loginPage} 
                                className="navbar-brand" 
                                style={{ 
                                    color: 'white', 
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#555'}  // 호버 시 배경색 변경
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}  // 원래 색으로 복원
                            >
                                로그아웃
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
