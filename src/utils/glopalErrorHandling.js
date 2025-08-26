export const glopalErrorHandling = (error, req, res, next) => {
        res.status(error.cause || 500).send({message: error.name, info: (error.errors || error.message ), stack: error.stack})
    }