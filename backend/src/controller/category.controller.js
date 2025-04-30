const CategoryService = require('../services/category.services');

class CategoryController {
    
    async getAll(req, res){
        try {
            const data = await CategoryService.getAll();
            res.json(data);
        } catch (error) {
            console.log('Lỗi lấy danh sách thể loại sách: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res){
        try {
            const data = await CategoryService.addBook(req.body);
            res.status(200).json(data);
        } catch (error) {
            console.log('Lỗi thêm thể loại sách: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async detail(req, res){
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID không hợp lệ' });
            }
            const data = await CategoryService.detail(id);
            res.json(data);
        } catch (error) {
            console.log('Lỗi hiển thị thể loại sách: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res){
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID không hợp lệ' });
            }
            const data = req.body;
            const update = await CategoryService.edit(id, data);
            res.status(202).json(update);
        } catch (error) {
            console.log('Lỗi cập nhật thể loại sách: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async remove(req, res){
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID không hợp lệ' });
            }
            await CategoryService.remove(id);
            res.status(204).end();
        } catch (error) {
            console.error('Lỗi xóa Thể loại:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();
