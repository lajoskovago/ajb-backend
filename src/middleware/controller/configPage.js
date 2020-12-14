exports.configPage = async (req, model) => {
  const result = {};
  const config = {}

  result.currentPage = parseInt(req.query.page);
  config.limit = parseInt(req.query.limit);
  config.startIndex = result.currentPage * config.limit;
  
  
  if (config.limit < 0 || result.currentPage < 0) {
    res.status(400).json({
      error: "Limit and page parameters must have a positive value!",
      data: [],
    });
  } else {
    result.lastPage =Math.ceil((await model.countDocuments().exec()) / config.limit) - 1;

    if (result.currentPage < result.lastPage) {
      result.next = {
        page: result.currentPage + 1,
        limit: config.limit,
      };
    }

    if (config.startIndex > 0) {
      result.previous = {
        page: result.currentPage - 1,
        limit: config.limit,
      };
    }

    if (result.currentPage > result.lastPage) {
      res.status(400).json({
        error: `The maximum number of page is ${result.lastPage} !`,
        data: [],
      });
    }
  }
  return {result,config};
};
