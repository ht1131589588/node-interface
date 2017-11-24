import BaseComponent from "../../prototype/baseComponent";



class Admin extends BaseComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async login(req,res,next) {
        res.jsonp({
            code: '0',
            name:'乘风',
            github:'https://github.com/Faithree',
            sex:'男',
            examTime:'2017-04-13',
            province:'广东',
            city:'广州',
            country:'中国',
            age:22,
        })
    }
}

export default new Admin()