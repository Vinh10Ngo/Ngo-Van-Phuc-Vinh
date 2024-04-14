import MainModel from '../schemas/category';
import NewsModel from './news';

export default class Model {

    static async listItem( params : any , option : any) : Promise < any > {
        const queryFind = { ...params };

        let find : any,select: any,sort: any;
        // Create fields remove
        let removeFields = ['select','sort','page','limit'];

        // Remove fields 
        removeFields.forEach(param => delete queryFind[param]);

        // Create query string
        let queryStr = JSON.stringify(queryFind);

        // replace 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`); 

        //parse
        find = JSON.parse(queryStr);

        // select fields
        if(params.select){
            select = params.select.split(',').join(' ');
        }

        // sort fields
        if(params.sort){
            sort = params.sort.split(',').join(' ');
        }

        //pagination
        const page  = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 6;
        const skip  = ( page-1 )*limit;

        if(option.task == 'all'){
            return MainModel
                .find(find)
                .populate('items')
                .select(select)
                .sort(sort)
                .skip(skip).limit(limit)
        }
        if(option.task == 'one'){
            return MainModel
            .findById(params.id)
            .populate('items')
            .select({})
        }
    }
    static async addItems(params : any , option : any) : Promise < any > {
        return new MainModel(params).save();
    }

    static async editItem(params : any , option : any) : Promise < any > {
        if(option.task == 'edit'){
            return MainModel
                .findOneAndUpdate({_id : params.id},params.body,{ new : true})
        }
    }

    static async deleteItem(params : any , option : any) : Promise < any > {
        if(option.task == 'one'){
            return MainModel
                .findOneAndDelete({_id : params.id},{ new : false})
        }
    }

    static async getArticleInCategory(params : any , option : any) : Promise < any > {
        let item = await MainModel.findById(params.req.params.id).select({});
        params.link = item.link;
        params.slug = item.slug;
        let data = await NewsModel.listItem(params,{});
        return data;
    }

}