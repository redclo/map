import GameMap from "..";
import FileSaver from 'file-saver';


export default (game: GameMap) => {

    const _Images: any = {};
    const _ImageOwns: any = {};
    const _ImageColors: any = {};
    let _otherSvg: any;

    const _imgTemp = { x: 0, y: 0, width: 200, height: 200, image: null, bg: "#444", isOther: false };
    const _bgs: string[] = ["5D8D5F", "FEF8A5", "2A6495", "AA8229", "84AC52",
        "EAF6A6", "B5B8BB", "EDE182", "FEF8A4",
        "2A6495", "AA812A", "95CC99", "B2B139", "43742E", "FFFFA6",
        "95CC99", "FEF8A5", "84AC52", "B5B8BB", "B2B139",
        "84AC52", "AA812A", "A4CBFA", "EDE182", "B5B8BB",
        "B2B139"]

    function loadImage(url: string, index: number) {
        const i = index;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ index: i, img });
            }
            img.onerror = (e) => {
                reject({ index: i, error: e });
            }
            img.src = url;
        });
    }

    return {
        async editorLoad() {
            game.state.isEditor = true;

            await game.actions.loadImages();

            game.actions.loadLocalTiles();
        },

        async MainLoad() {
            game.state.isEditor = false;
            game.state.loading = true;

            await game.actions.loadImages();

            game.actions.loadMainConfig();

            game.state.loading = false;
        },

        async loadImages() {
            const loading: any = [];
            for (let i = 0; i < 26; i++) {
                loading.push(loadImage(`./svgs/${i + 1}.svg`, i));
            }
            const rets = await Promise.all(loading);
            console.log(rets);

            rets.forEach((item: any) => {
                _Images[item.index] = item.img;
            })

            //owned 
            const loading2: any = [];
            for (let i = 0; i < 26; i++) {
                loading2.push(loadImage(`./svgs/${i + 1}.own.svg`, i));
            }
            const rets2 = await Promise.all(loading2);

            rets2.forEach((item: any) => {
                _ImageOwns[item.index] = item.img;
            })

            //_ImageColors
            const loading3: any = [];
            for (let i = 0; i < 26; i++) {
                loading3.push(loadImage(`./svgscolor/${i + 1}.svg`, i));
            }
            const rets3 = await Promise.all(loading3);
            rets3.forEach((item: any) => {
                _ImageColors[item.index] = item.img;
            })

            const otherSvg: any = await loadImage(`./other.svg`, 0);
            _otherSvg = otherSvg.img;
            console.log(_otherSvg);
        },

        getOtherSvg() {
            return _otherSvg;
        },

        getImage(index: number, r: number, c: number) {

            //判断自己是否购买
            let imgs = _Images;
            _imgTemp.isOther = false;

            const ownedItem = game.ctx.ethers.state.occupiedLocations.find(item => item.x == (c + 1) && item.y == (r + 1))
            if (ownedItem) {
                imgs = _ImageOwns;
                _imgTemp.isOther = true;
                const self = game.ctx.ethers.state.selfLocations.find(item => item.x == (c + 1) && item.y == (r + 1))
                if (self) {
                    _imgTemp.isOther = false;
                }
            }

            _imgTemp.image = imgs[index];
            //@ts-ignore
            _imgTemp.width = _imgTemp.image.width;
            //@ts-ignore
            _imgTemp.height = _imgTemp.image.height;

            _imgTemp.bg = "#" + _bgs[index];

            return _imgTemp;
        }
    }
}