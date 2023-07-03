import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        userCategories: {
            type: [
                {
                    restaurant: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Restaurant",
                        required: true,
                    },
                    restaurantName: {
                        type: mongoose.Schema.Types.String,
                        required: true,
                    },
                    restaurantUrl: {
                        type: mongoose.Schema.Types.String,
                        required: true,
                    },
                    categoryEnum: {
                        type: mongoose.Schema.Types.Number,
                        required: true,
                    },
                },
            ],
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
