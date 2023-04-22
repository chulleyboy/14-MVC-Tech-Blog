module.exports = checkDate = (req, res, next) => {
    console.log(req.query.date)
    var date = new Date(req.query.date);
    if (!isNaN(date.getTime())) {
        next()
    } else {
        res.status(404).json({ error: "invalid date format" })
    }
}
