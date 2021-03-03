const router = require('express').Router();
const { checkSchema } = require('express-validator');

const BookController = require('../controllers/book');

const addBookSchema = {
  name: {
    in: ['body'],
    errorMessage: '图书名为必填项',
    isString: true,
    trim: true,
  },
};

const queryBookListSchema = {
  page: {
    in: ['query'],
    optional: {
      options: {
        nullable: true,
        checkFalsy: true,
      },
    },
    isInt: true,
    toInt: true,
  },
  limit: {
    in: ['query'],
    optional: {
      options: {
        nullable: true,
        checkFalsy: true,
      },
    },
    isInt: true,
    toInt: true,
  },
};

// 添加图书
router
  .post('/', checkSchema(addBookSchema), BookController.addBook)
  .get('/:id', BookController.queryBookDetail)
  .get('/', checkSchema(queryBookListSchema), BookController.queryBookList);

module.exports = router;
