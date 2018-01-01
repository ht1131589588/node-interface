import BaseComponent from "../../prototype/baseComponent";
import ArticleModel from '../../models/article/article'
import formidable from 'formidable'


class Article extends BaseComponent {
    constructor() {
        super()
        this.add = this.add.bind(this)
    }
    async lists(req,res,next) {
        try{
			const articles = await ArticleModel.findAll();
			res.send({
                status: 1,
				type: 'GET_DATA_SUCCESS',
				data:articles,
				message: ''
			})
		}catch(err){
			console.log('获取文章列表失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
    }
    async get(req,res,next) {
        const id = req.params.id;
		try{
			const article = await ArticleModel.findAll({
                where: {
                    id
                }
            });
			res.send({
				status: 1,
				article,
			})
		}catch(err){
			console.log('获取文章内容失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
    }
    async add(req,res,next) {
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
          
          const {title, content, classifys, status = 1} = fields;
          console.log(title, content, classifys)
          try {
              if(!title) {
                  throw new Error('标题不能为空！')
              } else if(!content) {
                  throw new Error('内容不能为空！')
              }
          } catch (error) {
              res.send({
                  status: 0,
                  type: 'GET_PARAM_ERROR',
                  message: error.message
              })
              return;
          }

          try {
            console.log('....................')
            ArticleModel.create({
                title: title,
                content: content
            }).then(function(result){
                if(result && result.id) {
                    res.send({
                        status:1,
                        type:'LOGIN_SUCCESS',
                        message:'发布成功！'
                    })
                } else {
                    res.send({
                        status:0,
                        type:'LOGIN_SUCCESS',
                        message:'发布失败！'
                    })
                }
            })
          } catch (error) {
            throw new Error('数据添加错误')
          }
      });
      
    }
    async modify(req,res,next) {
      
    }
    async delete(req,res,next) {
        const id = req.params.id;
        console.log(req.params);
        try{
            if(!id){
                res.send({
                    status: 0,
                    message: 'id不存在'
                })
                return;
            }
			var article = await ArticleModel.find({
                where:{
                    id:id
                }
            });
            await article.destroy();
            res.send({
                status: 1,
				message: '删除成功！'
            })
		}catch(err){
			console.log('获取文章内容失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
        
    }
}

export default new Article()