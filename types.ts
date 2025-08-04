export interface UserProfile {
    id: number; // interface User 로 하니까 id키에 오류 뜨던데 이유가 뭐가 ?
    name: string;
    email: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface CreatePost extends Post {
    subTitle: string;
}
