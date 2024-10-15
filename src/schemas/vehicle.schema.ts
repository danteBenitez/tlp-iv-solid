import mongoose, { Schema } from "mongoose";
import { IVehicle } from "../interfaces/vehicle.interface";

export const VehicleModel = mongoose.model<IVehicle>('Vehicle', new Schema({
    make: String,
    model: String,
    price: Number,
    year: Number
}, {
    id: true,
    autoCreate: true,
}))