// main.ts (기존 파일에 이어서 붙여넣기!)
import api from './axiosConfig'; // 설정된 Axios 인스턴스 가져오기!
import { Post, UserProfile } from '../types'; // Post, UserProfile 인터페이스 가져오기!
import axios from 'axios';

console.log('\n----- Axios Interceptor 적용 테스트 시작 -----');

// 기존의 getPost를 인터셉터가 적용된 api 인스턴스로 교체!
async function getPostWithInterceptor(postId: number): Promise<Post> {
    console.log(
        `[Main] Interceptor 적용된 Axios로 게시글 ID ${postId} 가져오는 중...`
    );
    const response = await api.get<Post>(`/posts/${postId}`); // baseURL이 이미 설정되어 있으므로 /posts만!
    return response.data;
}

// 에러 테스트용 함수 (존재하지 않는 리소스 요청)
async function getNonExistentResource(): Promise<any> {
    console.log(`[Main] 존재하지 않는 리소스 요청 중... (404 에러 예상)`);
    const response = await api.get(`/nonexistent-resource`); // 존재하지 않는 URL!
    return response.data;
}

async function runInterceptorExamples() {
    // 성공 케이스
    try {
        const post = await getPostWithInterceptor(1);
        console.log(
            `\n[Main] 게시글 1번 성공: "${post.title.substring(0, 30)}..."`
        );
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(`\n[Main] 게시글 요청 에러: ${error.message}`);
        } else if (error instanceof Error) {
            console.error(`\n[Main] 기타 에러: ${error.message}`);
        }
    }

    // 실패 케이스 (404 Not Found)
    try {
        await getNonExistentResource();
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(
                `\n[Main] 404 에러 잡음 (메인에서): ${error.message}`
            );
            if (error.response) {
                console.error(
                    `  - 메인에서 상태 코드: ${error.response.status}`
                );
            }
        } else if (error instanceof Error) {
            console.error(`\n[Main] 기타 에러: ${error.message}`);
        }
    }
}

runInterceptorExamples();
