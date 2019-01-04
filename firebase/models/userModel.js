class UserModel {
    constructor(
        email,
        name,
        pwd,
        userType
    ) {
        this.email = email;
        this.name = name;
        this.pwd=pwd;
        this.userType = userType;
    }
}

module.exports = UserModel;
