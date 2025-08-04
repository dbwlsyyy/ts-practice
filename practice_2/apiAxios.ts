import axios from 'axios';
import { CreatePost, Post } from '../types';

interface NewPost {
    title: string;
    body: string;
    userId: number;
}

// 생성된 Post의 응답 (id가 추가됨)
interface CreatedPost extends NewPost {
    id: number;
}

const getPost = async (postId: number): Promise<Post> => {
    const response = await axios.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
};

const postPost = async (postData: NewPost): Promise<CreatedPost> => {
    const response = await axios.post<CreatePost>(
        'https://jsonplaceholder.typicode.com/posts',
        postData
    );
    return response.data;
};

const runAxiosGet = async () => {
    console.log('----- Axios GET 요청 시작 (타입스크립트 연동) -----');

    try {
        const myPost: Post = await getPost(1);
        console.log(myPost);
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
    }
};

const runAxiosPost = async () => {
    console.log('----- Axios Post 요청 시작 (타입스크립트 연동) -----');

    const newPost: NewPost = {
        title: 'axios 테스트 포스팅',
        body: 'axios post 요청으로 글 잘 보내는 중',
        userId: 1,
    };

    try {
        const createdPost = await postPost(newPost);
        console.log(
            `Axios POST 성공! 생성된 글 ID: ${createdPost.id}, 제목: "${createdPost.title}"`
        );
    } catch (err: unknown) {
        if (err instanceof Error) console.error(err.message);
    }
};

runAxiosGet();
runAxiosPost();
