var OSS = require('ali-oss');

var co = require('co');
var path = require('path');
var fs = require('fs');
var cdnpath = 'map/';

var client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAI5tS3CZgxeCKNUM71JNSJ',
    accessKeySecret: 'bNUDDyOCocXvFMhjilnwk8EOHZPSvS',
    bucket: 'funeralhk',
});

function GetSubFiles(dir) {
    return new Promise((reslove, reject) => {
        fs.readdir(dir, function(err, files) {
            reslove(files);
        });
    });
}

async function GetTotalFiles(dir) {
    let subfiles = await GetSubFiles(dir);

    let files = [],
        len = subfiles.length;
    let ret = [];
    for (let i = 0; i < len; i++) {
        let f = subfiles[i];

        let fpath = `${dir}/${f}`;
        var stat = fs.lstatSync(fpath);
        if (!stat.isDirectory()) {
            ret.push(fpath);
        } else {
            let fsubs = await GetTotalFiles(fpath);
            let size = fsubs.length;
            for (let k = 0; k < size; k++) {
                ret.push(fsubs[k]);
            }
        }
    }
    return ret;
}

GetTotalFiles('dist').then((files) => {
    handleFile(files);
});

async function handleFile(files) {
    let i = 0,
        len = files.length;
    for (; i < len; i++) {
        let fpath = files[i];
        if (path.extname(fpath) != '.map') {
            await UploadOss(files[i]);
        }
    }
}

function UploadOss(src) {
    return new Promise((resolve, reject) => {
        co(function*() {
            let fpath = src.substr(5); //去掉前面的dist
            console.log('uploading ' + fpath);

            var ret = yield client.put(cdnpath + fpath, src, { timeout: 2000000 });
            //console.log(ass+'->' + ret.url);
            let i = 0;
            while (!ret) {
                if (i++ > 3) {
                    reject(`uploading ${src} error!`);
                    return;
                }
                ret = yield client.put(cdnpath + fpath, dist, { timeout: 2000000 });
            }
            console.log(ret.url);

            resolve(ret);
        });
    });
}