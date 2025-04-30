const AppDataSource = require('../models/data-source');

class CategoryService{
    constructor(){
        this.repo = AppDataSource.getRepository('Category')
    }

    getAll(){
        return this.repo.find()
    }
    addBook(data){
        const category = this.repo.create(data);
        return this.repo.save(category);
    }
    async detail(id){
        const data = await this.repo.findOneBy({id});
        if(!data){
            console.log('Không tìm thấy');
        }
        return data
    }

    async edit(id, data){
        const category = await this.repo.findOneBy({id});
        if(!category){
            console.log('Không tìm thấy');
        }

        const update = Object.assign(category, data);
        return this.repo.save(update)
    }

    remove(id){
        return this.repo.delete(id)
    }
}

module.exports = new CategoryService();