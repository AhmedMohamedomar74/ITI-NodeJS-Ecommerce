import mongoose from "mongoose";
import wishlistModel from "../../DB/models/wishlist.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponce } from "../../utils/Response.js";

// Add to wishlist
export const addToWishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
        return next(new Error("productId is required", { cause: 400 }));
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new Error("Invalid productId", { cause: 400 }));
    }

    // Check if product exists (you might want to import Product model for this)
    // const product = await Product.findById(productId);
    // if (!product) {
    //   return next(new Error("Product not found", { cause: 404 }));
    // }

    // Find user's wishlist or create one if it doesn't exist
    let wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
        // Create new wishlist
        wishlist = await wishlistModel.create({
            userId,
            items: [{ productId }]
        });
        successResponce({ res, message: "Wishlist created successfully", data: wishlist })
        return
    }

    // Check if product already exists in wishlist
    const existingItem = wishlist.items.find(item =>
        item.productId.toString() === productId
    );

    if (existingItem) {
        return next(new Error("Product already in wishlist", { cause: 400 }));
    }

    // Add product to wishlist
    wishlist.items.push({ productId });
    await wishlist.save();

    return successResponce({ res, message: "Product added to wishlist", data: wishlist })
});

// Remove from wishlist
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
        return next(new Error("productId is required", { cause: 400 }));
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new Error("Invalid productId", { cause: 400 }));
    }

    // Find user's wishlist
    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
        return next(new Error("Wishlist not found", { cause: 404 }));
    }

    // Check if product exists in wishlist
    const itemIndex = wishlist.items.findIndex(item =>
        item.productId.toString() === productId
    );

    if (itemIndex === -1) {
        return next(new Error("Product not found in wishlist", { cause: 404 }));
    }

    // Remove product from wishlist
    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    return successResponce({ res, message: "Product removed from wishlist", data: wishlist });
});

// Get user's wishlist
// Get user's wishlist - Returns products directly in items array
export const getWishlist = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const wishlist = await wishlistModel.findOne({ userId })
        .populate({
            path: "items.productId",
            select: "name price images category",
            populate: {
                path: "category",
                select: "name"
            }
        })
        .populate("userId", "name email userName");
    console.log({ wishlist });
    if (!wishlist) {
        return successResponce({
            res,
            message: "Wishlist is empty",
            data: { items: [] }
        });
    }

    // Transform the data to return products directly in items array
    const transformedItems = wishlist.items
        .filter(item => item.productId) // Remove items with deleted products
        .map(item => ({
            ...item.productId.toObject(), // Spread the product details
            wishlistItemId: item._id // Keep the wishlist item ID if needed
        }));


    return successResponce({
        res,
        message: "Wishlist retrieved successfully",
        data: { items: transformedItems }
    });
});

// Clear entire wishlist
export const clearWishlist = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist || wishlist.items.length === 0) {
        return next(new Error("Wishlist is already empty", { cause: 400 }));
    }

    // Clear all items
    wishlist.items = [];
    await wishlist.save();

    return successResponce({ res, message: "Wishlist cleared successfully", data: wishlist });
});

// Update wishlist (replace entire wishlist with new items)
// export const updateWishlist = asyncHandler(async (req, res, next) => {
//     const { items } = req.body;
//     const userId = req.user._id;

//     if (!items || !Array.isArray(items)) {
//         return next(new Error("Items array is required", { cause: 400 }));
//     }

//     // Validate all product IDs
//     for (const item of items) {
//         if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
//             return next(new Error(`Invalid productId: ${item.productId}`, { cause: 400 }));
//         }
//     }

//     // Find wishlist or create new one
//     let wishlist = await wishlistModel.findOne({ userId });

//     if (!wishlist) {
//         wishlist = await wishlistModel.create({
//             userId,
//             items
//         });
//     } else {
//         // Update items
//         wishlist.items = items;
//         await wishlist.save();
//     }

//     return successResponce({ res, message: "Wishlist updated successfully", data: wishlist })
// });

// Check if product is in wishlist
export const checkInWishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
        return next(new Error("productId is required", { cause: 400 }));
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new Error("Invalid productId", { cause: 400 }));
    }

    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
        successResponce({ res, message: "Wishlist not found", data: wishlist })
        return
    }

    const inWishlist = wishlist.items.some(item =>
        item.productId.toString() === productId
    );

    return successResponce({ res, message: "Wishlist found", data: inWishlist })
});