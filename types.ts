export interface UserProfile {
    id: number; // interface User 로 하니까 id키에 오류 뜨던데 이유가 뭐가 ?
    name: string;
    email: string;
    address: UserAddress;
    company: UserCompany;
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

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface ApiResponse<T> {
    data: T[];
    totalCount: number;
    page: number;
    limit: number;
}
