import axios from 'axios';

// 일반 api 요청
const apiRequest = (method, url, data = null) => {
    const config = {
        method: method,
        url: "http://localhost:9000/" + url,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json', // 중요: JSON 형식임을 명시
        },
    };

    // POST나 PUT 요청인 경우, 데이터(payload)를 추가
    if (data && (method === 'POST' || method === 'PUT')) {
        config.data = data;
    }

    return handleApiResponse(() => axios(config));
};

// 파일 api 요청
const apiRequestFile = (method, url, data = null) => {
    const config = {
        method: method,
        url: "http://localhost:9000/" + url,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    };

    // POST나 PUT 요청인 경우, 데이터(payload)를 추가
    if (data && (method === 'POST' || method === 'PUT')) {
        config.data = data;
    }

    return handleApiResponse(() => axios(config));
};

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

const AxiosService = {
    apiRequest,
    apiRequestFile
}

export default AxiosService;