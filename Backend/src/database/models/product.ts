import {Table,Column,Model,DataType,CreatedAt, PrimaryKey, AllowNull} from "sequelize-typescript"
@Table({
    tableName:"Products",
    modelName:"Product",
    timestamps:true
})

class Product extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({type:DataType.STRING,allowNull:false})
    declare productName:string

    @Column({type:DataType.TEXT})
    declare productDescription:string

    @Column({type:DataType.INTEGER,allowNull:false })
    declare productPrice:number

    @Column({type:DataType.INTEGER,allowNull:false })
    declare productTotalStockQty:number

    @Column({type:DataType.TEXT})
    declare productImageUrl:string
}

export default Product