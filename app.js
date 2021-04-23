
module.exports = app => {
  app.beforeStart(async () => {
    // 写入该方法会自动创建表

    console.log("项目启动-----------------------------------------------------------------------------")
    // await app.model.sync({ alter: true });
  });
};
