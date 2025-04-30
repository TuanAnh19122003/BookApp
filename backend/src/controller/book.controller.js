const bookServices = require('../services/book.services');

class BookController {
    async getAll(req, res) {
        try {
            const respone = await bookServices.getAll();
            res.json(respone)
        } catch (error) {
            console.log('Lỗi lấy danh sách: ', error);
        }
    }
    
    async create(req, res){
        try {
            const book = await bookServices.addBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }
    
    async update(req, res){
        try {
            const id = parseInt(req.params.id);
            const data = req.body
            const update = await bookServices.editBook(id, data);
            res.json(update);
        } catch (error) {
            console.error('Lỗi cập nhật sách:', error);
            res.status(500).json({ error: err.message || "Update failed"});
        }
    }

    async detail(req, res){
        try {
            const id = parseInt(req.params.id);
            const book = await bookServices.detailBook(id);
            res.json(book);
        } catch (error) {
            console.error('Lỗi lấy chi tiết sách:', error);
            res.status(500).json({ error: error.message || "Get detail failed" });
        }
    }

    async remove(req, res){
        try {
            await bookServices.removeBook(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.error('Lỗi xóa sách:', error);
            res.status(500).json({ error: err.message});
        }
    }
}

module.exports = new BookController();