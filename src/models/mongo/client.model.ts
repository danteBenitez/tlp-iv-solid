import mongoose, { Schema } from "mongoose";
import { IClient } from "../../interfaces/client.interface";

export const ClientModel = mongoose.model<IClient>('Client', new Schema({
    name: String,
    email: String,
    phone_number: Number,
}, {
    id: true,
    autoCreate: true,
}))