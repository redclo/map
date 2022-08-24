import GameMap from "..";
import FileSaver from 'file-saver';


export default (game: GameMap) => {

    const _Images: any = {};

    const _imgTemp = { x: 0, y: 0, width: 200, height: 200, image: null };
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
        async loadImages() {
            const loading: any = [];
            for (let i = 0; i < 25; i++) {
                loading.push(loadImage(`./icons/${i + 1}.jpg`, i));
            }
            const rets = await Promise.all(loading);
            console.log(rets);

            rets.forEach((item: any) => {
                _Images[item.index] = item.img;
            })

            game.actions.loadLocalTiles();
        },
        getImage(index: number) {
            _imgTemp.image = _Images[index];
            return _imgTemp;
        }
    }
}