export class Loader {
    async load(id:string) :Promise<any> {

    } 
}

export class CacheController {
    loader: Loader
    
    constructor(loader :Loader) {
        this.loader= loader;
    }

    get(id: string, forceUdate:boolean =false) {

    }
}

