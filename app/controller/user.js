const Controller = require('egg').Controller;
class UserController extends Controller {
  async test() {
    const {
      ctx
    } = this;

    console.log("进入控制层------------------")



    ctx.status = 200;

    ctx.body = {
      code: "200",
      data: "token 测试成功"
    };

  }

  async login() {
    const {
      ctx,
      app
    } = this;
    let req = ctx.request.body;

    let user = await ctx.service.user.login(req);


    console.log("用户登录嘻嘻嘻------------------------",user);

    if (user.password == req.password) {

      const token = app.jwt.sign({
        username: user.username,
        password: user.password
      }, '123456', {
        expiresIn: '30 days'
      }); // token签名 有效期为30天

      await app.redis.set(user.username,token);





      ctx.status = 200;
      ctx.body = {
        code: "200",
        token
      };
     
    } else {
      ctx.status = 401;
      ctx.body = {
        code: "200",
        des: "暂无权限"
      };

    }
  }
  async findUser() {
    const {
      ctx
    } = this;

    let data = await ctx.service.user.find(ctx);

    ctx.status = 200;

    ctx.body = {
      code: "200",
      data: data
    };

  }
}
module.exports = UserController;