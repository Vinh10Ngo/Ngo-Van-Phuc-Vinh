import Parser from 'rss-parser';
import fs from 'fs';
import { envConfigs } from './../configs/envConfigs';
import VnExpressRss from '../utils/vnExpressRss';


type CustomFeed = {foo: string};
type CustomItem = {bar: number};
type CustomOption = {limit: string};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['foo'],
      item: ['bar'],
    }
  });


export default class Model {
    static async listItem( params : any , option : any) : Promise < any > {
        let link = (params.link) ? params.link : 'https://vnexpress.net/rss/tin-moi-nhat.rss';
        let slug = (params.slug) ? params.slug : 'news';
        // path
        let path        = envConfigs.data.path;
        let pathName    = path + slug + '.json';



        if(params.req.cookies[slug] && params.req.cookies[slug] >= Date.now()){
            console.log('Thực hiện đọc file');
            let data : Buffer = fs.readFileSync(pathName);
            return VnExpressRss.init(JSON.parse(data.toString()),params);
        }else{
            try {
                const feed = await parser.parseURL(link);
                params.res.cookie(slug,Date.now() + 1 * 60 * 1000);
                let data = feed.items;
                data.forEach((ele : any , ind : number) => {
                    ele.id = slug + '_' + (ind + 1)
                });
                fs.writeFileSync(pathName, JSON.stringify(data));
                return VnExpressRss.init(data,params);
            } catch (err) {
                return false;
            }
        }
    }
}