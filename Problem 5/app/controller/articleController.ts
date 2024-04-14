import { Request, Response ,NextFunction} from 'express';
import MainModel from '../models/article';
import ErrorResponse from '../utils/errorResponse'

class ArticleController {
    public async get (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.listItem({req},{})
        if(!data) return next(new ErrorResponse(400,'Không tồn tại data'));
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })
    }

}

export default new ArticleController();