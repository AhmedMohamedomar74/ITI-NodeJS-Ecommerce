import cartModel from "../DB/models/cartModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { successResponce } from "../utils/Response.js"

export const removeUserCart = asyncHandler(async (req , res , next)=>
{
    console.log({userID :  req.user._id})
    if (req.user._id) {
        let deletedCart = await cartModel.findOneAndDelete({userId : req.user._id})
        console.log({deletedCart})
    }
    next()
})