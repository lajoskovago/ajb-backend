exports.logoutUser = (req,res,next) => {
    req.logout();
    res.cookie('refresh','deleted',{httpOnly:true,secure:true});
    res.cookie('jwt','deleted',{httpOnly:true,secure:true});
    next();
}