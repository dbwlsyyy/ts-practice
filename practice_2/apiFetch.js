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
Object.defineProperty(exports, "__esModule", { value: true });
console.log('\n----- Fetch API와 타입스크립트 연동 시작 -----');
const getSinglePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data = yield response.json();
    return data;
});
const runFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myPost = yield getSinglePost(1);
        console.log(myPost);
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error);
    }
});
runFetch();
