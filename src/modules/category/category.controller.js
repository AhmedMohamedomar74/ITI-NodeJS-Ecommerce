// category.controller.js
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponce } from "../../utils/Response.js";
import { categoryModel } from "./../../DB/models/category.model.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private/Admin
export const getAllCategory = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find();

    successResponce({
        res,
        message: "Categories retrieved successfully",
        data: categories
    });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private/Admin
export const getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
        next(new Error("Category not found"), { cause: 404 })
        return
    }

    successResponce({
        res,
        message: "Category retrieved successfully",
        data: category
    });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res, next) => {
    const { Name } = req.body;

    if (!Name) {
        next(new Error("Name is required"), { cause: 400 })
        return
    }

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ Name });
    if (existingCategory) {
        next(new Error("Category already exists"), { cause: 409 })
        return
    }

    const newCategory = await categoryModel.create({ Name });

    successResponce({
        res,
        status: 201,
        message: "Category created successfully",
        data: newCategory
    });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { Name } = req.body;

    if (!Name) {
        next(new Error("Name is required"), { cause: 400 })
        return
    }

    const category = await categoryModel.findByIdAndUpdate(
        id,
        {
            Name,
            $inc: { __v: 1 }
        },
        { new: true}
    );

    if (!category) {
        next(new Error("Category not found"), { cause: 404 })
        return
    }

    successResponce({
        res,
        message: "Category updated successfully",
        data: category
    });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
        next(new Error("Category not found"), { cause: 404 })
        return 
    }

    successResponce({
        res,
        message: "Category deleted successfully",
        data: category
    });
});