import { PageListController } from "./PageListController";

export default class EmptyPageListController extends PageListController<any, any>{
    constructor(ctx:any) {
        super(ctx, ()=>(page, size, query, fields)=>{
            return new Promise((resolve, reject)=>{
                resolve({
                    errorNo:200,
                    result: {
                        list:[],
                        total: 0,
                    }
                });
            });
        })
    }
}