import AddressComponent from "../../prototype/addressComponent";
import AdminModel from '../../models/admin/admin'


class Admin extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async login(req,res,next) {
        try {
            AdminModel.findAll({
                where: {
                    name: 'Jike'
                }
            }).then(function(p) {
                var _data = {
                    code:0,
                    data:JSON.parse(JSON.stringify(p))
                }
                res.jsonp(_data);
            }).catch(function(err){
                console.log('failed: ' + err);
            });
        } catch (error) {
            console.log("失败");
        }
        
        // console.log(`find ${admins.length} admins:`);
        // for(let p of admins){
        //     console.log(JSON.stringify(p));
        // }
        // res.jsonp({
        //     code: '0',
        //     name:'乘风',
        //     github:'https://github.com/Faithree',
        //     sex:'男',
        //     examTime:'2017-04-13',
        //     province:'广东',
        //     city:'广州',
        //     country:'中国',
        //     age:22,
        // })
        // return;
    }
}

export default new Admin()