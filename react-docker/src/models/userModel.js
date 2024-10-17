class UserModel {
    constructor(name = '', email = '', pwd = '') {
      this.name = name;
      this.email = email;
      this.pwd = pwd;
    }
  
    static defaultState() {
      return new UserModel();
    }
  
    // You can add methods here if needed
    update(data) {
      Object.assign(this, data);
    }
  
    toJSON() {
      return {
        name: this.name,
        email: this.email,
        pwd: this.pwd
      };
    }
  }
  
  export default UserModel;