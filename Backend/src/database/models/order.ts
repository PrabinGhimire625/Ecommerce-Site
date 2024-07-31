import { AllowNull, Column, Model, DataType, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
@Table({
    tableName:"Orders",
    modelName:"Order",
    timestamps:true
})

class Order extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:number

    @Column({
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len : {
                args : [10,10],
                msg : 'Phone number must be 10 digits'
            }
        }
    })
    declare phoneNumber : string

    @Column({type:DataType.STRING, allowNull:false})
    declare shippingAddress:string

    @Column({type:DataType.FLOAT})
    declare totalAmount:number

    @Column({type:DataType.ENUM("pending","cancelled","delivered","ontheway","preparation"), defaultValue:"pending"})
    declare orderStatus:string
}

export default Order