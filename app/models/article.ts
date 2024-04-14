import fs from 'fs';
import { envConfigs } from './../configs/envConfigs';
import VnExpressRss from '../utils/vnExpressRss';


export default class Model {
    static async listItem( params : any , option : any) : Promise < any > {
        let id = params.req.params.id;
        let slug = id.split('_')[0];

        // path
        let path        = envConfigs.data.path;
        let pathName    = path + slug + '.json';

        try {
            let data : Buffer = fs.readFileSync(pathName);
            data = await VnExpressRss.init(JSON.parse(data.toString()),params);
            let result = data.find((item : any) => item.id === id);
            return result;
        } catch (err) {
            return false;
        }
    }
}