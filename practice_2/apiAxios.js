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
const getPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
});
const postPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post('https://jsonplaceholder.typicode.com/posts', postData);
    return response.data;
});
const runAxiosGet = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- Axios GET 요청 시작 (타입스크립트 연동) -----');
    try {
        const myPost = yield getPost(1);
        console.log(myPost);
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
    }
});
const runAxiosPost = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- Axios Post 요청 시작 (타입스크립트 연동) -----');
    const newPost = {
        title: 'axios 테스트 포스팅',
        body: 'axios post 요청으로 글 잘 보내는 중',
        userId: 1,
    };
    try {
        const createdPost = yield postPost(newPost);
        console.log(`Axios POST 성공! 생성된 글 ID: ${createdPost.id}, 제목: "${createdPost.title}"`);
    }
    catch (err) {
        if (err instanceof Error)
            console.error(err.message);
    }
});
runAxiosGet();
runAxiosPost();
