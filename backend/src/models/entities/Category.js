const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name:'Category',
    tableName:'categories',
    columns:{
        id:{
            primary: true,
            type:'int',
            generated: true
        },
        name:{
            type:'nvarchar',
            nullable: false
        },
    },
    relations:{
        books:{
            target:'Book',
            type:'one-to-many',
            inverseSide: "category",
        }
    }
})