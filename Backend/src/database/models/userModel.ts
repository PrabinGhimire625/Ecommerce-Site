import {Table,Column,Model,DataType,CreatedAt, PrimaryKey, AllowNull} from "sequelize-typescript"
@Table({
    tableName:"Users",
    modelName:"User",
    timestamps:true
})

class User extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.STRING
    })
    declare username:string

    @Column({
        type:DataType.STRING,
    })
    declare email:string

    @Column({
        type:DataType.STRING
    })
    declare password:string

    @Column({
        type : DataType.ENUM('customer','admin'),
        defaultValue : 'customer'
    })
    declare role : string
}

export default User