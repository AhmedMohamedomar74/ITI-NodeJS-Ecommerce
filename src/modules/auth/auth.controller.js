import userModel from "../../DB/models/User.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { successResponce } from "../../utils/Response.js"
import { create, findOne } from "../../DB/db.services.js"
import { compareHash, genrateHash } from "../../utils/secuirty/hash.services.js"
import { generateAuthTokens, genrateToken, selectSignatureLevel, signatureLevelEnum } from "../../utils/secuirty/token.services.js"
import { sendEmailEvent } from "../../Events/sendEmail.event.js"
export const signup = asyncHandler(async (req, res, next) => {
    /**
         * @Doing
         * reterive data 
         * check user existance with number and email
         * save to db 
         *
         * hash password 
         * send email OTP
         * send session
         */
    


    const { password , email, userName } = req.body
    const findUser = await findOne({model : userModel , filter : {
        $or: [
            { email: email },
            { userName: userName }
        ]
    }})
    if (findUser) {
        next(new Error("User already Exsits"), { cause: 409 })
        return 
    }
    if (password) {
        let n_password = await genrateHash({ plainText: password, saltRound: parseInt(process.env.HASH_SALT_ROUND) })
        req.body.password = n_password
    }
    else {
        next(new Error("there is no passowrd"), { cause: 400 })
        return
    }
    if (req.body.email) {
        sendEmailEvent.emit("confirmEmail", { to: req.body.email, html: `<p>OTP :  ${Date.now()}</p>` })
    }
    const newUser = await create({
        model: userModel,
        data: req.body
    });
    successResponce({ res: res, data: newUser })
    return
})

export const login = asyncHandler(async (req, res, next) => {
    const tokens = generateAuthTokens(req.user);
    successResponce({ res, data: tokens });
})
