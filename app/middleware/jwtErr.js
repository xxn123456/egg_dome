'use strict';
// token中间键
// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function jwtErr(ctx, next) {
    // 获取头部token
    const token = ctx.request.header.authorization.split(' ')[1];
    // console.log(ctx.request.header);
    let decode = '';

    if (token) {

      try {

        decode = await ctx.app.jwt.verify(token, "123456");

        let redis_token = await ctx.app.redis.get("hsh");

      

       

        if (token == redis_token) {
          next();
        } else {
          // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
          console.log("其他账号登录---------------------")
          ctx.status = 200;
          ctx.body = {
            code: 401,
            msg: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态',
          };
        }

      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          ctx.status = 401;
          ctx.body = {
            msg: 'token已过期，请重新登录',
            code: '401',
          };
          return;
        } else if (error.name === 'JsonWebTokenError') {
          ctx.status = 401;
          ctx.body = {
            msg: '无效的token',
            code: '401',
          };
          return;
        }
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'token不存在',
        code: '401',
      };
      return;
    }
  };
};