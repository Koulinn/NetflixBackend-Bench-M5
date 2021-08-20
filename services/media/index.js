import  express  from "express";

const mediaRouter = express.Router()

mediaRouter.get("/", (req, res, next) => {
    try {
      console.log('inside media route GET')
      res.send('worked')

    } catch (error) {
        next(error)

    }
})

export default mediaRouter