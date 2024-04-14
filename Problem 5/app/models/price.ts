import fs from 'fs';
import xml2js from 'xml2js';
import { envConfigs } from '../configs/envConfigs'
import rp from 'request-promise';

export default class Model {
    static async getGold( params : any , option : any) : Promise < any > {
       let parserXml = new xml2js.Parser();

       let requestOptions = {
           method : 'GET',
           uri : envConfigs.price.urlGold,
           json : true,
           "rejectUnauthorized": false
       }
       let data : any;
       let xml = await rp(requestOptions);
       parserXml.parseString(xml,function(err : any , result : any ){
            data = JSON.stringify(result);
       })
       let gold = JSON.parse(data).root.ratelist[0].city[0].item;
       let price : any = [];
       gold.forEach((element : any ) => {
          price.push(element["$"]);
       });
       return price;
    }

    static async getCoin( params : any , option : any) : Promise < any > {

        const requestOptions = {
            method: 'GET',
            uri: envConfigs.price.urlCoin,
            qs: {
              'start': '1',
              'limit': '20',
              'convert': 'USD',
              'aux' : 'cmc_rank'
            },
            headers: {
              'X-CMC_PRO_API_KEY': '3646d135-01ad-42fb-8bdc-a1c7347c0e66'
            },
            json: true,
            gzip: true
          };

        let data = await rp(requestOptions)
        data = data.data;
        let result : any = [];
        data.forEach((ele : any) => {
            let obj : any = {};
            obj.id            = ele.id; 
            obj.name          = ele.name; 
            obj.symbol        = ele.symbol; 
            obj.slug          = ele.slug; 
            obj.price         = ele.quote.USD.price; 
            obj.percent_change_1h   = ele.quote.USD.percent_change_1h; 
            result.push(obj);
        });
        return result;
     }
}