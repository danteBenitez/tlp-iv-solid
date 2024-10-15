import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IClient } from "../../interfaces/client.interface";

type ClientCreationAttributes = Omit<IClient, "id">;

@Table({
    tableName: 'clients',
    timestamps: true,
    paranoid: true,
})
export default class Client extends Model<IClient, ClientCreationAttributes> implements IClient {
    declare id: string

    @Column
    declare name: string;

    @Column
    declare email: string;

    @Column(DataType.BIGINT)
    declare phone_number: number;
}