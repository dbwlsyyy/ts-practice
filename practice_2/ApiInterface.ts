import axios from 'axios';
import { ApiResponse, Comment, Post, UserProfile } from '../types';

console.log('----- 인터페이스 활용 API 호출 시작 -----');

const getDetailedUserProfile = async (userId: number): Promise<UserProfile> => {
    console.log(`Axios로 상세 사용자 프로필 (ID: ${userId}) 가져오는 중...`);
    const reponse = await axios.get<UserProfile>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return reponse.data;
};

const getCommentsForPost = async (postId: number): Promise<Comment[]> => {
    console.log(`Axios로 게시글 ID ${postId}의 댓글 가져오는 중...`);
    const response = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.data;
};

const getPostsPaginated = async (): Promise<ApiResponse<Post>> => {
    console.log('Axios로 페이지네이션된 게시글 목록 가져오는 중...');
    const mockApiResponse: ApiResponse<Post> = {
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
    return new Promise((resolve) =>
        setTimeout(() => resolve(mockApiResponse), 500)
    );
};

const runInterfaceExam = async () => {
    try {
        const detailedUser = await getDetailedUserProfile(1);
        console.log(`\n상세 사용자 프로필 성공! 이름: ${detailedUser.name}`);
        console.log(
            `주소: ${detailedUser.address.street}, ${detailedUser.address.city}`
        );
        console.log(`회사: ${detailedUser.company.name}`);
    } catch (error: unknown) {
        axios.isAxiosError(error) &&
            console.error(`\n상세 사용자 프로필 에러: ${error.message}`);
    }

    try {
        const comments = await getCommentsForPost(1);
        console.log(`\n게시글 1번의 댓글 ${comments.length}개 성공!`);
        if (comments.length > 0) {
            console.log(
                `첫 번째 댓글: "${comments[0].body.substring(0, 30)}..." (by ${
                    comments[0].email
                })`
            );
        }
    } catch (error) {
        axios.isAxiosError(error) &&
            console.error(`\n게시글 댓글 에러: ${error.message}`);
    }

    try {
        const pagedPosts: ApiResponse<Post> = await getPostsPaginated();
        console.log(
            `\n페이지네이션된 게시글 성공! 총 ${pagedPosts.totalCount}개 중 ${pagedPosts.data.length}개 표시`
        );
        console.log(`현재 페이지: ${pagedPosts.page}`);
        // console.log(pagedPosts.data[0].notExistingField); // 에러: 없는 필드!
    } catch (error) {
        axios.isAxiosError(error) &&
            console.error(`\n페이지네이션 에러: ${error.message}`);
    }
};

runInterfaceExam();
