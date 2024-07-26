import {Table,Column,Model,DataType,CreatedAt, PrimaryKey, AllowNull} from "sequelize-typescript"
@Table({
    tableName:"Categories",
    modelName:"Category",
    timestamps:true
})

class Category extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({type:DataType.STRING,allowNull:false})
    declare categoryName:string
}//model banauna betikai aphai table banxa

export default Category