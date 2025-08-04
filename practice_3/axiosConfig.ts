import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000, // 질문 0: 이건 무슨 역할 ? -> 해당 요청이 서버로부터 응답을 받을 때까지 최대 3000 밀리초(즉, 3초)를 기다리겠다는 의미
});

// 1. 요청 인터셉터 설정: 모든 요청이 보내지기 전에 가로채서 처리
api.interceptors.request.use(
    (config) => {
        console.log(
            `[Axios Request Interceptor] ${config.method?.toUpperCase()} 요청 보냄: ${
                config.url
            }`
        );
        return config;
    },
    (error: AxiosError) => {
        console.error(
            `[Axios Request Interseptor] 요청 에러: ${error.message}`
        );
        return Promise.reject(error);
        // 질문 1: 이건 뭐임?
        // -> pomise 반환할 때 reject로 반환
    }
);

// 2. 응답 인터셉터 설정: 서버에서 응답이 도착한 후에 가로채서 처리
api.interceptors.response.use(
    (response) => {
        // 2xx 범위의 성공적인 응답이 왔을 때
        console.log(
            `[Axios Response Interseptor] 응답 받음: ${response.config.url} (상태: ${response.status})`
        );
        return response;
    },
    (error: AxiosError) => {
        // 2xx 범위 밖의 에러 응답이 왔을 때 (4xx, 5xx 등)
        console.error(
            `[Axios Response Interceptor] 응답 에러 (${error.response?.status}):`,
            // 질문 2: 여기서 왜 굳이 response가 있는지 response?(옵서널체이닝)로 검사하는거임
            // -> 항상 존재하는 속성이 아님(서버 응답이 온 경우 error.response 존재
            // / 요청은 보냈으나 서버로부터 응답을 받지 못한 경우 error.request 존재
            // / 요청 설정 등 그 외의 에러 error.response, error.request 모두 없을 수 있음
            error.message
        );

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error(
                        '  -> Unauthorized: 인증 실패! 로그인 페이지로 리다이렉트!'
                    );
                    // 예시: window.location.href = '/login';
                    break;
                case 404:
                    console.error(
                        '  -> Not Found: 요청한 리소스를 찾을 수 없습니다.'
                    );
                    break;
                case 500:
                    console.error('  -> Server Error: 서버 내부 오류 발생!');
                    break;
                default:
                    console.error(
                        `  -> 알 수 없는 에러: ${error.response.status}`
                    );
            }
        } else if (error.request) {
            // 요청이 전송되었으나 응답을 받지 못한 경우 (네트워크 오류)
            console.error(
                '  -> No Response: 서버로부터 응답을 받지 못했습니다. 네트워크 확인 필요!'
            );
        } else {
            // 요청 설정 등 그 외의 에러
            console.error('  -> Request Setup Error:', error.message);
        }

        return Promise.reject(error); // 에러를 다시 던져야 해당 요청의 catch 블록으로 전달됨
    }
);

export default api;
