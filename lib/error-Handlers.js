export const notFoundErrorHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            msg: err.message
        })
    } else {
        next(err)
    }
}

export const badRequestErrorHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            msg: err, 
        })
    } else {
        next(err)
    }
}

export const forbiddenRequest = (err, req, res, next) => {
    if (err.status === 403) {
        res.status(400).send({
            success: false,
            msg: err, 
        })
    } else {
        next(err)
    }
}

export const serverErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).send("SERVER DOWN!!!!!!!")
}