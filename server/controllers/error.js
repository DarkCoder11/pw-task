module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        //error Api
        if (req.originalUrl.startsWith("/api")) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                stack: err.stack,
                error: err
            })
        } else {
            //Render website
            return res.status(err.statusCode).render("error", {
                title: "Something wrong",
                msg: err.message
            })
        }
    }
}