exports.paginate = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if(limit<0){
    res.status(400).json({ message:  'The limit parameter must have a positive value!'})
  }else{
  
  var results = {};
  const startIndex = (page) * limit;
  const endIndex = page * limit;
  results.lastPage = Math.floor(await model.countDocuments().exec()/limit);

 
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
    res.status(400).json({ message:  'THE MAXIMUM NUMBER OF PAGES IS '+results.lastPage+" !"})
   }
  try {
    results.results = await model.find().limit(limit).skip(startIndex).exec();

    req.paginatedResults = results;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

  req, res;
};
