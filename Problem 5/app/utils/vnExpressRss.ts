import dateFormat from 'dateformat';

export default class VnExpressRss {
    static async init(data : any , params : any) : Promise < any > {
        let result : any = [];

        data.forEach((item : any,index : number) => {
            let news : any = {};

            let content     = item.content;
            let myImage     = content.match('src\s*=\s*"([^"]+)"');
            let myContent   = content.match('.*br>(.*)');

            news.id         = item.id;
            news.title      = item.title;
            news.link       = item.link;
            news.pubDate    = dateFormat(item.pubDate,'dd-mm-yyyy h:MM:ss TT');
            news.image      = (myImage) ? myImage[1] : '';
            news.content    = (myContent) ? myContent[1] : item.contentSnippet;

            result.push(news);
        });
        if(params.req.params.total) {
            let total : number = params.req.params.total;
            let totalData : any = [];

            for (let i = 0; i < total; i++) {
                totalData[i] = result[i]
            }
            return totalData;
        }

        return result;
    }
}