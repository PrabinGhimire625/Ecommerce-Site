import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";

@Table({
    tableName: "ProductReviews",  
    modelName: "ProductReview",   
    timestamps: true,             
})

class ProductReview extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
        defaultValue: 3,
    })
    declare rating: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare message: string;
}

export default ProductReview;
