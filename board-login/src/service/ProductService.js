import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:9000/menu";

// 공통 API 응답 처리 함수
const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall();
        
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        if (error.response) {
            // 서버에서 응답이 있는 경우
            //console.error("서버 응답 상태:", error.response.status);
            //console.error("서버 응답 데이터:", error.response.data);

            // 응답 데이터에서 에러 메시지 추출
            const errorMessage = error.response.data.message || "알 수 없는 오류가 발생했습니다.";

            // 사용자에게 알림
            alert(`Error: ${errorMessage}`);
        } else if (error.request) {
            // 요청이 전송되었으나 응답을 받지 못한 경우
            //console.error("응답을 받지 못했습니다:", error.request);
            alert("Network error. Please try again.");
        } else {
            // 요청 설정 중에 문제가 발생한 경우
            //console.error("요청 설정 중 에러 발생:", error.message);
            alert("Error: " + error.message);
        }
        window.location.href = '/';
        return false;
    }
};

const getProducts = () => {
    return handleApiResponse(() => axios.get(PRODUCT_API_BASE_URL + "/products", { withCredentials: true }));
}

const productUpdate = (product) => {
    return handleApiResponse(() => axios.post(PRODUCT_API_BASE_URL + "/update" , product, { withCredentials: true }));
}

const deleteProduct = (productId) => {
    return handleApiResponse(() => axios.delete(PRODUCT_API_BASE_URL + "/delete?productId=" + productId, { withCredentials: true }));
}

const productCreate = (product) => {
    return handleApiResponse(() => axios.post(PRODUCT_API_BASE_URL + "/create", product, { withCredentials: true }));
}


const ProductService = {
    productCreate,
    getProducts,
    deleteProduct,
    productUpdate
}

export default ProductService;
