const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
  /**
   * 连接 mongodb 数据库
   *
   * @async
   * @static
   * @param {string?} uri
   */
  async connect(uri = 'mongodb://127.0.0.1/swagger-demo') {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      console.log(
        chalk.yellow('[MongoDB] database connection established successfully')
      );

      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }
    } catch (ex) {
      console.log(chalk.red(ex));
    }
  },
};
