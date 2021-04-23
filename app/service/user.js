const Service = require('egg').Service;

class UserService extends Service {

  async find(){
    const {ctx} = this;
    const user = await ctx.model.User.findAll({
      include: [{
        model: ctx.model.Role,
        as: 'role',
      }]
            
    });
    return user;
  }

  async login(data){
    const {ctx} = this;
    const user = await ctx.model.User.findOne({
      where:{
        username:data.username
      }
    });
    return user;
  }

  

  
}

module.exports = UserService;