import AddressComponent from "../../prototype/addressComponent";
import AdminModel from '../../models/admin/admin'
import formidable from 'formidable'


class Admin extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async login(req,res,next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return;
            }
            
            const {username, password, status = 1} = fields;
            console.log(username,password)
            try {
                if(!username) {
                    throw new Error('用户名参数错误')
                } else if(!password) {
                    throw new Error('密码参数错误')
                }
            } catch (error) {
                console.log(error.message, error);
                res.send({
                    status: 0,
                    type: 'GET_PARAM_ERROR',
                    message: error.message
                })
                return;
            }

            try {
                AdminModel.find({
                    where: {
                        name: username
                    }
                }).then(function(data) {
                    if(data){
                        console.log(password==data.password);
                        if(password==data.password){
                            res.send({
                                status:1,
                                type:'LOGIN_SUCCESS',
                                message:'登录成功！'
                            })
                            return;
                        }
                        res.send({
                            status:0,
                            type:'LOGIN_FAILED',
                            message:'登录失败，用户名或密码错误！'
                        })

                    } else {
                        res.send({
                            status:0,
                            type:'LOGIN_FAILED',
                            message:'不存在的用户'
                        })
                        // AdminModel.create({
                        //     name: username,
                        //     password: password,
                        //     gender:true
                        // }).then(function(result){
                        //     if(result && result.id) {
                        //         res.send({
                        //             status:1,
                        //             type:'LOGIN_SUCCESS',
                        //             message:'注册成功！'
                        //         })
                        //     } else {
                        //         res.send({
                        //             status:0,
                        //             type:'LOGIN_SUCCESS',
                        //             message:'注册失败！'
                        //         })
                        //     }
                        // })
                    }
                    
                    // var _data = {
                    //     code:0,
                    //     data:JSON.parse(JSON.stringify(data.dataValues))
                    // }
                    // res.jsonp(_data);
                }).catch(function(err){
                    console.log('failed: ' + err);
                });

            } catch (error) {
                throw new Error('数据查询错误')
            }
        });
       
    }
    async register(req,res,next){
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return;
            }
            
            const {username, password, status = 1} = fields;
            console.log(username,password)
            try {
                if(!username) {
                    throw new Error('请填写用户名')
                } else if(!password) {
                    throw new Error('请填写密码')
                }
            } catch (error) {
                console.log(error.message, error);
                res.send({
                    status: 0,
                    type: 'GET_PARAM_ERROR',
                    message: error.message
                })
                return;
            }

            try {
                AdminModel.find({
                    where: {
                        name: username
                    }
                }).then(function(data) {
                    if(data){
                        res.send({
                            status:0,
                            type:'REGISTR_FAILED',
                            message:'注册失败，用户名已存在！'
                        })
                    } else {
                        AdminModel.create({
                            name: username,
                            password: password,
                            gender:true
                        }).then(function(res){
                            if(res && res.id) {
                                res.send({
                                    status:1,
                                    type:'LOGIN_SUCCESS',
                                    message:'注册成功！'
                                })
                            } else {
                                res.send({
                                    status:0,
                                    type:'LOGIN_SUCCESS',
                                    message:'注册失败！'
                                })
                            }
                        })
                    }
                    
                }).catch(function(err){
                    console.log('failed: ' + err);
                });

            } catch (error) {
                throw new Error('数据查询错误')
            }
        });
    }
    async getAdminInfo(req,res,next){
        const admin_id = req.session.admin_id;
		if (!admin_id || !Number(admin_id)) {
			console.log('获取管理员信息的session失效');
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '获取管理员信息失败'
			})
			return 
		}
		try{
			const info = await AdminModel.findOne({id: admin_id}, '-_id -__v -password');
			if (!info) {
				throw new Error('未找到当前管理员')
			}else{
				res.send({
					status: 1,
					data: info
				})
			}
		}catch(err){
			console.log('获取管理员信息失败');
			res.send({
				status: 0,
				type: 'GET_ADMIN_INFO_FAILED',
				message: '获取管理员信息失败'
			})
		}
    }
}

export default new Admin()