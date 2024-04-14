import { Request, Response ,NextFunction} from 'express';
import MainModel from '../models/category';
import ValidateReq from '../middleware/validateReq';
import ErrorResponse from '../utils/errorResponse'

class CategoryController {
    public async get (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.listItem(req.query,{'task' : 'all'})
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })
    }

    public async getOne ( req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.listItem({ id : req.params.id} ,{'task' : 'one'})
        res.status(200).json({
            success : true,
            data
        })  
    }
    public async getArticleInCategory ( req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.getArticleInCategory({req,res} ,{})
        if(!data) return next(new ErrorResponse(400,'Đường dẫn không hợp lệ'));
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })  
    }
    public async post (req : Request , res : Response , next : NextFunction) : Promise < any > {
        const err = await ValidateReq.init(req,res,next);
        if(!err){
            let data = await MainModel.addItems(req.body,{});
            res.status(200).json({
                success : true,
                data
            })
        }
    }

    public async put (req : Request , res : Response , next : NextFunction) : Promise < any > {
        const err = await ValidateReq.init(req,res,next);
        if(!err){
            let data = await MainModel.editItem({'id' : req.params.id,'body' : req.body} , {'task' : 'edit'})
            res.status(200).json({
                success : true,
                data
            })
        }
    }

    public async delete (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data
        })
    }

}

export default new CategoryController();