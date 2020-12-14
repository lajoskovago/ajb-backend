const { configPage } = require("../../middleware/controller/configPage");

exports.paginate = (model) => async (req, res, next) => {

  let resultConfigPage = {};
  let result = {};

  await configPage(req, model).then((data)=>{
     resultConfigPage = data.config;
     result = data.result;
  });

    try {
     
      result.result = await model.find().limit(resultConfigPage.limit).skip(resultConfigPage.startIndex).exec();
      result.total = await model.countDocuments().exec();
      req.list = result;
      next();
    } catch (e) {
      res.status(500).json({ 
        error: e.message,
        data: [] 
      });
    }
  };