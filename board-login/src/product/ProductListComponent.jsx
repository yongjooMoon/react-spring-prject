import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import AxiosService from '../service/AxiosService';
import ProductUploadPopup from './ProductUploadPopup';

const ProductListComponent = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);
    const [products, setProducts] = useState([]);
    const { user } = useUser(); // 컨텍스트에서 사용자 정보 가져오기

    useEffect(() => {
        AxiosService.apiRequest('GET', 'menu/products')
            .then((res) => {
                if (res.status === 200) {
                    const productList = res.data.list.map(product => {
                        // 바이트 배열을 Base64 문자열로 변환
                        // const base64String = btoa(
                        //     String.fromCharCode(...new Uint8Array(product.imageData))
                        // );
                        return {
                            ...product,
                            imageUrl: `data:image/jpeg;base64,${product.imageData}`, // 이미지 URL로 변환
                        };
                    });
                    setProducts(productList);
                } else {
                    alert("상품 조회 실패");
                }
            })
            .catch((error) => {
                console.error("상품 조회 중 에러가 발생하였습니다.", error);
            });
    }, []); // 빈 배열로 useEffect를 사용하여 한 번만 실행되도록 설정

    const openPopup = (data) => {
        setPopupData(data); // 파라미터를 state로 설정
        setIsPopupOpen(true);
    };

    const deleteProduct = (data) => {
        if(window.confirm("정말로 상품을 삭제하시겠습니까?\n삭제된 상품은 복구 할 수 없습니다.")) {
            AxiosService.apiRequest('DELETE', 'menu/delete?productId=' + data)
                .then((res) => {
                    if (res.status === 200) {
                        alert("상품을 삭제하였습니다.");
                        selectList();
                    } else {
                        alert("상품 삭제 실패");
                    }
                })
                .catch((error) => {
                    console.error("상품 삭제 중 에러가 발생하였습니다.", error);
                });
        }
    }

    const closePopup = () => {
        setIsPopupOpen(false);
        setPopupData(null); // 팝업 닫힐 때 데이터 초기화
        selectList();
    };

    const selectList = () =>{
        AxiosService.apiRequest('GET', 'menu/products')
        .then((res) => {
            if (res.status === 200) {
                const productList = res.data.list.map(product => {
                    // 바이트 배열을 Base64 문자열로 변환
                    // const base64String = btoa(
                    //     String.fromCharCode(...new Uint8Array(product.imageData))
                    // );
                    return {
                        ...product,
                        imageUrl: `data:image/jpeg;base64,${product.imageData}`, // 이미지 URL로 변환
                    };
                });
                setProducts(productList);
            } else {
                alert("상품 조회 실패");
            }
        })
        .catch((error) => {
            console.error("상품 조회 중 에러가 발생하였습니다.", error);
        });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-center">상품 목록</h2>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => openPopup({ mode: 'create', userId: user })} style={{ marginBottom: "10px" }}>
                    상품 등록
                </button>

                {isPopupOpen && <ProductUploadPopup onClose={closePopup} popupData={popupData} />}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.map((product) => (
                    <div key={product.productId} style={{ width: 'calc(20% - 20px)', textAlign: 'center' }}>
                        <img src={product.imageUrl} alt={product.productNm} style={{ width: '100%', height: '50%' }} />
                        <h3 style={{ margin: '10px 0 5px' }}>{product.productNm}</h3>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>{parseInt(product.atm , 10).toLocaleString()}원</p>
                        <button className="btn btn-secondary" onClick={() => openPopup({ mode: 'edit', product })} style={{ marginTop: "8px" }}>
                            수정
                        </button>
                        <button className="btn btn-secondary" onClick={() => deleteProduct(product.productId)} style={{ background: "red", marginLeft: "10px", marginTop: "8px" }}>
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListComponent;
