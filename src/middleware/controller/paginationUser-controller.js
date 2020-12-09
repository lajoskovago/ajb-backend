exports.paginateUser = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {};
    const userMap = {};
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
      res.status(400).json({ 
        error:  `The maximum number of page is ${results.lastPage} !`,
        data: []
    })
     }
    try {
      await model.find().limit(limit).skip(startIndex).then((users) => {
 
        users.forEach((user) => {
        var info = {};
        
        info.name = user.name;
        info.firstname = user.firstname;
        info.email = user.email;
        info.phone = user.phone;
        info.role = user.role;
        userMap[user._id] = info;
      });
    });
      results.results = userMap;
      const countAllUsers = await model.countDocuments().exec();
      req.numberOfUsers = countAllUsers;
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