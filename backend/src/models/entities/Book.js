const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Book',
    tableName: 'books',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: "varchar",
        },
        image: {
            type: "varchar",
            nullable: true,
        },
        author: {
            type: "varchar",
        },
        description: {
            type: "text",
            nullable: true,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    },
    relations: {
        category: {
            target: "Category",
            type: "many-to-one",
            joinColumn: true,
            eager: true,
        },
    },
});
