import { Post } from '../types';

console.log('\n----- Fetch API와 타입스크립트 연동 시작 -----');

const getSinglePost = async (postId: number): Promise<Post> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data: Post = await response.json();
    return data;
};

const runFetch = async () => {
    try {
        const myPost = await getSinglePost(1);
        console.log(myPost);
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error);
    }
};

runFetch();
