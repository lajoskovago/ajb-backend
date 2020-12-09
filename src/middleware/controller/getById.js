  const mongoose = require("mongoose");

  exports.getModelById = (model) => async (req, res, next) => {
    const { id } = req.query;
    if(!id){
      return res.status(400).send({
        error: "Sorry, but you didn't provide an id!",
        data: null
    });
    }else{
      const validationId = mongoose.Types.ObjectId.isValid(id);
      if(validationId==false){
        return res.status(400).send({
          error: "Sorry, but id is set incorrect(must be ObjectId)!",
          data: null
      });
      }else{
      const foundModel=await model.findById(id);
      if(!foundModel){
        return res.status(400).send({
          error: "Sorry, model cannot be found!",
          data: null
      });
      }else{
        req.result = foundModel;
      }
    }
  }
    next();
  }