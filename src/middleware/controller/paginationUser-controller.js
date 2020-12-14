const { configPage } = require("../../middleware/controller/configPage");

exports.paginateUser = (model) => async (req, res, next) => {
    const userMap = {};
    let resultConfigPage = {};
    let result = {};

    await configPage(req, model).then((data)=>{
       resultConfigPage = data.config;
       result = data.result;
    });
    
    try {
      await model.find().limit(resultConfigPage.limit).skip(resultConfigPage.startIndex).then((users) => {
 
        users.forEach((user) => {
        let info = {};
        
        info.name = user.name;
        info.firstname = user.firstname;
        info.email = user.email;
        info.phone = user.phone;
        info.role = user.role;
        userMap[user._id] = info;
      });
    });
      result.result = userMap;
      result.total = await model.countDocuments().exec();
      req.list = result;
      next();
      
    } catch (e) {
      res.status(500).json({ 
        error: e.message,
        data: [] 
      });
    }
}
