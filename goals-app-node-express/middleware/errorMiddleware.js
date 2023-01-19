

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    // res.status(statusCode);
    res.status(statusCode).json({
        message: err.message || 'Error Server. Please Try Again Later.',
        stack: process.env.NODE_ENV == "production" ? null : err.stack
    });
}

module.exports = {
    errorHandler
}