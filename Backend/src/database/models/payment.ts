import { Column,Model, DataType, Table } from "sequelize-typescript";

@Table({
    tableName:"Payments",
    modelName:"Payment",
    timestamps:true
})

class Payment extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type : DataType.ENUM('cod','khalti','esewa'),
        allowNull : false
    })
    declare paymentMethod : string


    @Column({type:DataType.ENUM('paid','unpaid'), defaultValue:'unpaid'})
    declare paymentStatus:string

    @Column({type:DataType.STRING})
    declare pidx:string
}

export default Payment











