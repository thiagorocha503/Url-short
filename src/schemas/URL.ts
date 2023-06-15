import { model, Schema, Model, Document } from "mongoose";

export interface IURL extends Document {
    hash: String;
    url: String;
    click: number;
    createdAt: Date;
}
export const URL = new Schema<IURL>({
    hash: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    click: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
export const ShortURL: Model<IURL> = model<IURL>("urls", URL);
