exports.csrfAuthentication = (req,res,next) => {

   cookieKey = req.cookies.csrf
   headerKey = req.headers.csrftoken

   if(!cookieKey){
    return res.status(400).json({
        error: "The cookieKey is undefined,you are not allowed to navigate on this page",
        data: null
       })
   }
   if(!headerKey){
    return res.status(400).json({
        error: "The headerKey is undefined,you are not allowed to navigate on this page",
        data: null
       })
   }

   if(cookieKey === headerKey)
   {
       next();
   }else{
    return res.status(400).json({
        error: "The two key don`t match,you are not allowed to navigate on this page",
        data: null
       })
   }
}