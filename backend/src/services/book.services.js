const AppDataSource = require('../models/data-source');

class BookService{
    constructor(){
        this.repo = AppDataSource.getRepository('Book')
    }

    getAll(){
        return this.repo.find({
            relations:['category']
        });
    }

    addBook(data){
        const {categoryId, ...rest} = data;
        const book = this.repo.create({
            ...rest,
            category: {id: categoryId}
        });
        return this.repo.save(book);
    }

    async detailBook(id){
        const book = await this.repo.findOne({
            where: { id },
            relations: ['category'],
        });
        if(!book){
            console.log('Không tìm thấy id: ');
        }
        return book;
    }


    async editBook(id, data){
        const book = await this.repo.findOne({
            where: { id },
            relations: ['category']
        });
        if(!book){
            console.log('Không tìm thấy id: ');
        }
        const { categoryId, ...otherData } = data;
        Object.assign(book, otherData);
        if (categoryId) {
            book.category = { id: categoryId };
        }
        return await this.repo.save(book);
    }

    async removeBook(id){
        return this.repo.delete(id);
    }
}

module.exports = new BookService();