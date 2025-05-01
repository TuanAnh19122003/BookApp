const AppDataSource = require('../models/data-source');
const fs = require('fs');
const path = require('path');


class BookService {
    constructor() {
        this.repo = AppDataSource.getRepository('Book')
    }

    getAll() {
        return this.repo.find({
            relations: ['category']
        });
    }

    addBook(data) {
        const { categoryId, ...rest } = data;
        const book = this.repo.create({
            ...rest,
            category: { id: categoryId }
        });
        return this.repo.save(book);
    }

    async detailBook(id) {
        const book = await this.repo.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!book) {
            console.log('Không tìm thấy id: ');
        }
        return book;
    }

    async editBook(id, data) {
        const book = await this.repo.findOne({
            where: { id },
            relations: ['category'],
        });
    
        if (!book) {
            console.log('Không tìm thấy sách với id: ', id);
            return null;
        }
        
        book.title = data.title || book.title;
        book.author = data.author || book.author;
        book.description = data.description || book.description;
        book.categoryId = data.categoryId || book.categoryId;
    
        if (data.image) {
            if (book.image) {
                const oldImageName = path.basename(book.image);
                const oldImagePath = path.join(__dirname, '..', '..', 'public', 'uploads', oldImageName);
    
                console.log('Đang kiểm tra ảnh cũ: ', oldImagePath);
                
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('Đã xóa ảnh cũ');
                } else {
                    console.log('Ảnh cũ không tồn tại, kiểm tra lại đường dẫn.');
                }
            }
            book.image = data.image;
        }
        return await this.repo.save(book);
    }

    async removeBook(id) {
        const book = await this.repo.findOne({
            where: { id },
        });

        if (!book) {
            console.log('Không tìm thấy sách với id: ', id);
            return null;
        }

        if (data.image) {
            if (book.image) {
                const oldImageName = path.basename(book.image);
                const oldImagePath = path.join(__dirname, '..', '..', 'public', 'uploads', oldImageName);
    
                console.log('Đang kiểm tra ảnh cũ: ', oldImagePath);
                
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('Đã xóa ảnh cũ');
                } else {
                    console.log('Ảnh cũ không tồn tại, kiểm tra lại đường dẫn.');
                }
            }
            book.image = data.image;
        }
        return this.repo.delete(id);
    }

}

module.exports = new BookService();