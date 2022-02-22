const Question = require('../models/question');

const getPagination = (page, size, data) => {
  const start = page ? + (page - 1) * size : 0;
  const end = size ? page * size : 10;
  const dataInPer = data.slice(start, end);
  const pagePer = Math.ceil(data.length / size);
  return { dataInPer, pagePer };
};


exports.listPopulerTags = async (req, res, next) => {
  try {
    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 25 }
    ]);
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.listTags = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const { dataInPer, pagePer } = getPagination(page, size, tags);

    res.json({
      currentPage: Number(page),
      pageNum: pagePer,
      tag: dataInPer
    });
  } catch (error) {
    next(error);
  }
};

exports.searchTags = async (req, res, next) => {
  const { tag = '' } = req.params;
  try {
    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $match: { _id: { $regex: tag, $options: 'i' } } },
      { $sort: { count: -1 } }
    ]);
    res.json(tags);
  } catch (error) {
    next(error);
  }
};
