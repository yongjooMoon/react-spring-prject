import React, { useEffect, useState } from 'react';
import ProductService from '../service/ProductService';

const ProductUploadPopup = ({ onClose, popupData }) => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productId, setProductId] = useState('');

    useEffect(() => {
        if (popupData && popupData.mode === 'edit' && popupData.product) {
            // 수정 모드일 때 기존 상품 데이터를 설정
            setProductName(popupData.product.productNm);
            setProductPrice(parseInt(popupData.product.atm , 10).toLocaleString());
            setProductId(popupData.product.productId);
            setImage(popupData.product.imageUrl); // 이미지 URL을 미리보기로 설정
        }
    }, [popupData]);
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        
        if (file && !file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드할 수 있습니다.');
            return;
        }
        
        if(file && file.size >= 10 * 1024 * 1024){
            alert("이미지 업로드 크기는 10MB보다 클 수 없습니다.");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 수정
        if(productId !== ""){
            // 상품 등록 로직 추가
            const userId = popupData && popupData.userId ? popupData.userId.param.id : '';

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productPrice', productPrice.replace(/,/g, ''));
            formData.append('imageFile', imageFile);
            formData.append('userId', userId);
            formData.append('productId', productId);

            ProductService.productUpdate(formData)
                .then((res) => {
                    if(res.status === 200){
                        // 팝업 닫기
                        onClose();
                    }else{
                        alert("상품 수정 실패");
                    }
                })
                .catch((error) => {
                    console.error("상품 수정중 에러가 발생하였습니다.", error);
                });
        }else{  // 등록
            // 상품 등록 로직 추가
            const userId = popupData && popupData.userId ? popupData.userId.param.id : '';

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productPrice', productPrice.replace(/,/g, ''));
            formData.append('imageFile', imageFile);
            formData.append('userId', userId);

            ProductService.productCreate(formData)
                .then((res) => {
                    if(res.status === 200){
                        // 팝업 닫기
                        onClose();
                    }else{
                        alert("상품 등록 실패");
                    }
                })
                .catch((error) => {
                    console.error("상품 등록중 에러가 발생하였습니다.", error);
                });
        }
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;

        // 마이너스 기호 제거
        value = value.replace(/-/g, '');

        // 숫자만 남기기
        value = value.replace(/[^0-9]/g, '');

        // 금액 포맷 적용
        if (value) {
            value = parseInt(value, 10).toLocaleString();
        }
        
        setProductPrice(value);
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>상품 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className="image-upload">
                        <label htmlFor="imageUpload" className="image-upload-label">
                            {image ? (
                                <img src={image} alt="Preview" className="image-preview" />
                            ) : (
                                <span>이미지 업로드</span>
                            )}
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>상품명</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>상품가격</label>
                        <input
                            type="text"
                            value={productPrice}
                            onChange={handlePriceChange}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">취소</button>
                        <button type="submit" className="btn-submit">등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductUploadPopup;
