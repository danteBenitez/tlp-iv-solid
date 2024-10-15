import { Column, Model, Table } from "sequelize-typescript";
import { IVehicle } from "../interfaces/vehicle.interface";

type VehicleCreationAttributes = Omit<IVehicle, "id">;

@Table({
    tableName: 'vehicles',
    timestamps: true,
    paranoid: true,
})
export default class Vehicle extends Model<IVehicle, VehicleCreationAttributes> implements IVehicle {
    declare id: string

    @Column
    declare name: string;

    @Column
    declare make: string;

    @Column
    declare model: string

    @Column
    declare year: number

    @Column
    declare price: number
}