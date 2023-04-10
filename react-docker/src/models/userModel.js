import { Model } from 'react-axiom';
class UserModel extends Model {


    static defaultState() {
        return {
            name: '',
            email: '',
            pwd: ''
        };
    }
}
module.exports= UserModel;