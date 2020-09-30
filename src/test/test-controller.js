function add(req, res) {
    let result = parseInt(req.query.x) + parseInt(req.query.y);
    
    res.status(200).send({
        result: result
    });
}

exports.add = add;