"use strict";
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["Editor"] = "Editor";
    UserRole["Viewer"] = "Viewer";
})(UserRole || (UserRole = {}));
class UserManager {
    constructor(initialUsers = []) {
        this._users = [];
        this.addUser = (user) => {
            this._users.map((u) => u.email === user.email
                ? console.log('email 중복, 유저 추가 실패')
                : (() => {
                    this._users = [...this._users, user];
                    console.log('유저 추가 성공');
                })());
        };
        // side effect를 위해 map을 사용하면 안됨. map은 각 요소에 대해 함수를 실행하고 새로운 배열을 반환하는 함수임
        //
        this.getUserById = (id) => {
            const filteredUser = this._users.find((u) => u.id === id);
            return filteredUser !== null && filteredUser !== void 0 ? filteredUser : null;
        };
        this.updateUserRole = (id, newRole) => {
            this._users.map((u) => u.id === id
                ? (() => {
                    u.role = newRole;
                    console.log(`유저 ${id}의 role 업데이트 완료`);
                })()
                : console.log('에러 : 해당 사용자가 없습니다.')); // 여기서 질문 ! 타입 가드 없이 이렇게 해도되지 않아 ? 이거 대신 타입 가드 하려면 좀 복잡해지는 것 같은데
        };
        this._users = initialUsers;
    }
    get users() {
        return [...this._users];
    }
}
