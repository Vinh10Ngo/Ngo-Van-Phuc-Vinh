import { Request, Response ,NextFunction} from 'express';
import MainModel from '../models/price';

class PriceController {
    public async getGold (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.getGold({},{})
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })
    }
    public async getCoin (req : Request , res : Response , next : NextFunction) : Promise < any > {
        let data = await MainModel.getCoin({},{})
        res.status(200).json({
            success : true,
            count : data.length,
            data
        })
    }

}

export default new PriceController();