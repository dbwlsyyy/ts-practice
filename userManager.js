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
            const emailExist = this._users.some((existingUser) => existingUser.email === user.email);
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
        this.getUserById = (id) => {
            const filteredUser = this._users.find((u) => u.id === id);
            return filteredUser !== null && filteredUser !== void 0 ? filteredUser : null;
        };
        this.updateUserRole = (id, newRole) => {
            const userToUpdate = this.getUserById(id);
            if (userToUpdate === null) {
                console.log('해당 아이디는 없는 아이디 입니다, update 실패');
                return false;
            }
            else {
                userToUpdate.role = newRole;
                console.log(`${id}번 아이디의 유저 role이 업데이트 됨, update 성공`);
                return true;
            }
        };
        this._users = initialUsers;
    }
    get users() {
        return [...this._users];
    }
}
