import { Schema, model } from "mongoose";

const categorySchema = new Schema
    (
        {
            Name: {
                type: String,
                required: true,
            }
        }
    )

export const categoryModel = model("category", categorySchema)

