exports.paginate = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {};
    const startIndex = (page) * limit;
  
    if(limit<0 || page<0){
      res.status(400).json({
        error:  'Limit and page parameters must have a positive value!',
        data: []
    })
    }else{
  
    results.lastPage = Math.ceil(await model.countDocuments().exec()/limit)-1;

    if (page < results.lastPage) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
  
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
  
     if(page>results.lastPage){
      res.status(400).json({ message:  `The maximum number of page is ${results.lastPage} !`})
     }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      req.list = results;
      next();
    } catch (e) {
      res.status(500).json({ 
        error: e.message,
        data: [] 
      });
    }
  }
  };