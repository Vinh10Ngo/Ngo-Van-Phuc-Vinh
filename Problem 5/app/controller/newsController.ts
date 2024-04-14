import { Request, Response ,NextFunction} from 'express';
import MainModel from '../models/news';
import ErrorResponse from '../utils/errorResponse'

class NewsController {
    public async get (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.listItem({req,res},{})
        if(!data) return next(new ErrorResponse(400,'Đường dẫn không hợp lệ'));
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })
    }

}

export default new NewsController();