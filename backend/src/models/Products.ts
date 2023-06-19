import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        picture: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        description: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        productCategories: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "ProductCategory",
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        isAvailable: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
