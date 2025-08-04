"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts (기존 파일에 이어서 붙여넣기!)
const axiosConfig_1 = __importDefault(require("./axiosConfig")); // 설정된 Axios 인스턴스 가져오기!
const axios_1 = __importDefault(require("axios"));
console.log('\n----- Axios Interceptor 적용 테스트 시작 -----');
// 기존의 getPost를 인터셉터가 적용된 api 인스턴스로 교체!
function getPostWithInterceptor(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[Main] Interceptor 적용된 Axios로 게시글 ID ${postId} 가져오는 중...`);
        const response = yield axiosConfig_1.default.get(`/posts/${postId}`); // baseURL이 이미 설정되어 있으므로 /posts만!
        return response.data;
    });
}
// 에러 테스트용 함수 (존재하지 않는 리소스 요청)
function getNonExistentResource() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[Main] 존재하지 않는 리소스 요청 중... (404 에러 예상)`);
        const response = yield axiosConfig_1.default.get(`/nonexistent-resource`); // 존재하지 않는 URL!
        return response.data;
    });
}
function runInterceptorExamples() {
    return __awaiter(this, void 0, void 0, function* () {
        // 성공 케이스
        try {
            const post = yield getPostWithInterceptor(1);
            console.log(`\n[Main] 게시글 1번 성공: "${post.title.substring(0, 30)}..."`);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error(`\n[Main] 게시글 요청 에러: ${error.message}`);
            }
            else if (error instanceof Error) {
                console.error(`\n[Main] 기타 에러: ${error.message}`);
            }
        }
        // 실패 케이스 (404 Not Found)
        try {
            yield getNonExistentResource();
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error(`\n[Main] 404 에러 잡음 (메인에서): ${error.message}`);
                if (error.response) {
                    console.error(`  - 메인에서 상태 코드: ${error.response.status}`);
                }
            }
            else if (error instanceof Error) {
                console.error(`\n[Main] 기타 에러: ${error.message}`);
            }
        }
    });
}
runInterceptorExamples();
