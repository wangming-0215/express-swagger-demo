const { validationResult } = require('express-validator');

const BookModel = require('../models/book');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Book Controller
 * @module controllers/book
 */
module.exports = {
  /**
   * 添加图书
   * @param {Request} req
   * @param {Response} res
   */
  async addBook(req, res) {
    try {
      // 验证请求体参数
      validationResult(req).throw();
      const bookModel = new BookModel(req.body);
      const book = await bookModel.save();
      res.status(200).json({
        code: 200,
        data: book,
        errors: null,
      });
    } catch (errors) {
      console.log(errors);
      res.status(400).json({
        code: 400,
        data: null,
        errors: errors.array(),
      });
    }
  },

  /**
   * 根据 `id` 获取图书详情
   * @param {Request} req
   * @param {Response} res
   */
  async queryBookDetail(req, res) {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      res.status(404).json({
        code: 404,
        data: null,
        errors: {
          message: 'Not Found',
        },
      });
      return;
    }

    res.status(200).json({
      code: 200,
      data: book,
      errors: null,
    });
  },

  /**
   * 获取图书列表
   * @param {Request} req
   * @param {Response} res
   */
  async queryBookList(req, res) {
    try {
      validationResult(req).throw();
      const { page = 1, limit = 20 } = req.query;

      const books = await BookModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await BookModel.estimatedDocumentCount();

      const totalPage = Math.ceil(count / limit);

      res.status(200).json({
        code: 200,
        data: {
          list: books,
          total: count,
          limit,
          page,
          totalPage,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPage,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPage ? page + 1 : null,
        },
        errors: null,
      });
    } catch (errors) {
      res.status(400).json({
        code: 400,
        data: null,
        errors: errors.array(),
      });
    }
  },
};
