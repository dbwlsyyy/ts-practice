enum UserRole {
    Admin = 'Admin',
    Editor = 'Editor',
    Viewer = 'Viewer',
}

interface User {
    readonly id: number;
    name: string;
    email: string;
    role: UserRole;
    lastLoginAt?: Date;
}

class UserManager {
    private _users: User[] = [];

    constructor(initialUsers: User[] = []) {
        this._users = initialUsers;
    }

    public get users(): User[] {
        return [...this._users];
    }

    public addUser = (user: User): Boolean => {
        const emailExist = this._users.some(
            (existingUser) => existingUser.email === user.email
        );

        if (emailExist) {
            console.log('이메일 중복, 유저 추가 실패');
            return false;
        }

        this._users.push(user);
        console.log('유저 추가 성공');
        return true;
    };
    // side effect를 위해 map을 사용하면 안됨.
    // map은 각 요소에 대해 함수를 실행하고 새로운 배열을 반환하는 함수임

    public getUserById = (id: number): User | null => {
        const filteredUser = this._users.find((u) => u.id === id);
        return filteredUser ?? null;
    };

    public updateUserRole = (id: number, newRole: UserRole): Boolean => {
        const userToUpdate = this.getUserById(id);

        if (typeof userToUpdate !== null) {
            userToUpdate.role = newRole;

            console.log('해당 아이디는 없는 아이디 입니다, update 실패');
            return false;
        } else {
            console.log(
                `${id}번 아이디의 유저 role이 업데이트 됨, update 성공`
            );
            return true;
        }
    };
}
