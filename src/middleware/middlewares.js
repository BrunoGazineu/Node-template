exports.meuMiddlewareGlobal = (req, res, next) => {
    next();
}

exports.csrfErrorMiddleware = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}