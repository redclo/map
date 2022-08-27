import GameMap from "..";
import FileSaver from 'file-saver';


export default (game: GameMap) => {

    const _Images: any = {};

    const _imgTemp = { x: 0, y: 0, width: 200, height: 200, image: null, bg: "#444" };
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

            await game.actions.loadImages();

            // game.actions.loadMainConfig();
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
        },

        getImage(index: number) {
            _imgTemp.image = _Images[index];
            //@ts-ignore
            _imgTemp.width = _imgTemp.image.width;
            //@ts-ignore
            _imgTemp.height = _imgTemp.image.height;

            _imgTemp.bg = "#" + _bgs[index];

            return _imgTemp;
        }
    }
}