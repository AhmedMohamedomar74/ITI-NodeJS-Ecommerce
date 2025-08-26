import userModel from "../../DB/models/User.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { successResponce } from "../../utils/Response.js"
import { genrateHash } from "../../utils/secuirty/hash.services.js"

export const profile = asyncHandler(async (req , res , next)=>
{
    // console.log()
    successResponce({res:res , data:req.user})
})


export const updateProfile = asyncHandler(async (req, res, next) => {
    const { password, DOB } = req.body
    console.log({ password, DOB })
    let updatedData = {}
    if (password) {
        updatedData.password = await genrateHash({plainText : password , saltRound : parseInt(process.env.SALT)});
    }

    // Only update DOB if it's provided in req.body
    if (DOB) {
        updatedData.DOB = DOB;
    }

    console.log({ updatedData })
    let n_password = genrateHash({ plainText: password, saltRound: parseInt(process.env.SALT) })
    console.log({user : req.user})
    req.user.password = n_password
    
    console.log({newPass : n_password , oldPass : req.user.password})
    const UpdateUser = await userModel.findByIdAndUpdate(req.user.id,
        {
            $set:
            {
                password: updatedData.password,
                DOB: updatedData.DOB
            },
            $inc: { __v: 1 }
        },
        {
            new: true
        })
    if (UpdateUser) {
        successResponce({ res: res, data: UpdateUser, message: "user updated" })
        return
    }
    else {
        next(new Error("Note not found"))
    }

})

export const deleteProfile = asyncHandler(async (req , res , next)=>
{
    // console.log()
    const deletUser = await userModel.findByIdAndDelete(req.user._id)
    successResponce({res:res , data:deletUser})
})