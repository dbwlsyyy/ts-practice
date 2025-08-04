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
const axios_1 = __importDefault(require("axios"));
console.log('----- 인터페이스 활용 API 호출 시작 -----');
const getDetailedUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Axios로 상세 사용자 프로필 (ID: ${userId}) 가져오는 중...`);
    const reponse = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return reponse.data;
});
const getCommentsForPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Axios로 게시글 ID ${postId}의 댓글 가져오는 중...`);
    const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.data;
});
const getPostsPaginated = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Axios로 페이지네이션된 게시글 목록 가져오는 중...');
    const mockApiResponse = {
        data: [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere ...',
                body: 'quia et ...',
            },
            { userId: 1, id: 2, title: 'qui est esse', body: 'est rerum ...' },
        ],
        totalCount: 100,
        page: 1,
        limit: 2,
    };
    return new Promise((resolve) => setTimeout(() => resolve(mockApiResponse), 500));
});
const runInterfaceExam = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detailedUser = yield getDetailedUserProfile(1);
        console.log(`\n상세 사용자 프로필 성공! 이름: ${detailedUser.name}`);
        console.log(`주소: ${detailedUser.address.street}, ${detailedUser.address.city}`);
        console.log(`회사: ${detailedUser.company.name}`);
    }
    catch (error) {
        axios_1.default.isAxiosError(error) &&
            console.error(`\n상세 사용자 프로필 에러: ${error.message}`);
    }
    try {
        const comments = yield getCommentsForPost(1);
        console.log(`\n게시글 1번의 댓글 ${comments.length}개 성공!`);
        if (comments.length > 0) {
            console.log(`첫 번째 댓글: "${comments[0].body.substring(0, 30)}..." (by ${comments[0].email})`);
        }
    }
    catch (error) {
        axios_1.default.isAxiosError(error) &&
            console.error(`\n게시글 댓글 에러: ${error.message}`);
    }
    try {
        const pagedPosts = yield getPostsPaginated();
        console.log(`\n페이지네이션된 게시글 성공! 총 ${pagedPosts.totalCount}개 중 ${pagedPosts.data.length}개 표시`);
        console.log(`현재 페이지: ${pagedPosts.page}`);
        // console.log(pagedPosts.data[0].notExistingField); // 에러: 없는 필드!
    }
    catch (error) {
        axios_1.default.isAxiosError(error) &&
            console.error(`\n페이지네이션 에러: ${error.message}`);
    }
});
runInterfaceExam();
