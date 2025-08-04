import { Post, UserProfile } from '../types';

const getUserInfo = async (userId: number): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 999) {
                reject(new Error('theres no id 999')); // 왜 여기서는 throw 안해 ?
            } else {
                resolve({
                    name: `user-${userId}`,
                    id: userId,
                    email: `${userId}@test.com`,
                    address: {
                        street: 'string',
                        suite: 'string',
                        city: 'string',
                        zipcode: 'string',
                        geo: {
                            lat: 'string',
                            lng: 'string',
                        },
                    },
                    company: {
                        name: 'string',
                        catchPhrase: 'string',
                        bs: 'string',
                    },
                });
            }
        }, 500);
    });
};

const getPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    //그럼 여기서 fetch로 받아온게 Promise 객체야 ? fetch는 저 url에서 데이터를 받아오는 함수지 ?
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data: Post[] = await response.json();
    // 여기서 reponse 객체를 json으로 바꾼는건데 response는 이미 위에서 await로 까져있는 상태 아니야 ?
    // response.json은 promise 객체가 아닌데 왜 await로 또 까는거야 ?

    return data;
};

const runFetch = async () => {
    console.log('------- 케이스1 : 성공 --------');
    try {
        const userInfo: UserProfile = await getUserInfo(100);
        console.log(userInfo);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message); // 콘솔에러랑 쓰로우 뉴 에러 둘 다 써도 되는지 ?
            // throw new Error(err.message);
        }
    }

    console.log('------- 케이스2 : 실패 --------');
    try {
        const userInfo: UserProfile = await getUserInfo(999);
        console.log(userInfo);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message); // 콘솔에러랑 쓰로우 뉴 에러 둘 다 써도 되는지 ?
            // throw new Error(err.message); 쓰면 안됨
        }
    }
};

runFetch();
