import GameMap from "..";
import FileSaver from 'file-saver';
import { UploadFileController } from "@/queenjs/framework/utils";
import configTitles from "./config";


export default (game: GameMap) => {

    let _tiles: { index: number, num: number }[] = [];
    const _titesMap: any = {};

    const names = [
        "Promise Bank", "'He is the One' Casino", "Hospital of Insecurity", "Crush Highway ", "University of Radical Generosity"
        , "Deep Feeling Test Center ", "Prison of Silence", "Confession Stage", "Uncertainty Playground ", "Pillow Talk Radio Station ",
        "Eloping Canyon", "Marriage Monument", "Kissing Stage ", "'Loves Me Loves Me Not' Garden", "Untitled Relationship Hotel ",
        "Reunion Notary Office", "First-Love Kindergarten", "Ex Cemetery", "Lost Souls Transport Station", "Academy of Loyal Relationships",
        "Dokidoki Lane ", "Museum of Jealousy", "‘We Will’ Sea", "'Don\'t text him' Rehab", "Unrequited Love Intelligence Agency ",
        "Passing Fancy Square"
    ]

    const _contentBox = { w: 0, h: 0 };
    let _maxNum = 0;
    return {
        getContentBox() {
            return _contentBox;
        },


        loadMainConfig() {
            _tiles = configTitles;
            _maxNum = 0;
            _tiles.forEach(item => {
                _titesMap[item.num] = item;
                _maxNum = Math.max(_maxNum, item.num);
            })
            game.actions.computeContentBox();
        },

        computeContentBox() {
            _contentBox.h = (1 + Math.floor(_maxNum / game.state.ColGridCount)) * game.state.itemSize;
            _contentBox.w = (_maxNum % game.state.ColGridCount + 1) * game.state.itemSize;
        },
        getItemNames() {
            return names
        },

        drawTiles(ctx: CanvasRenderingContext2D) {
            const state = game.state;
            const ColGridCount = state.ColGridCount;
            const actions = game.actions;

            for (let k = 0; k < _tiles.length; k++) {
                const tile = _tiles[k];
                const i = tile.num
                const r = Math.floor(i / ColGridCount);
                const c = i % ColGridCount;
                const x1 = Math.floor(state.offsetX + c * state.itemSize);
                const y1 = Math.floor(state.offsetY + r * state.itemSize);
                const icon = actions.getImage(tile.index, r, c);

                ctx.fillStyle = icon.bg;
                ctx.fillRect(x1, y1, state.itemSize, state.itemSize);
                ctx.drawImage(icon.image as any, icon.x, icon.y, icon.width, icon.height, x1, y1, state.itemSize, state.itemSize);

                if (icon.isOther) {
                    const othersvg = actions.getOtherSvg();
                    ctx.drawImage(othersvg, 0, 0, othersvg.width, othersvg.height, x1 + state.itemSize * 0.85, y1 + state.itemSize * 0.03, state.itemSize * 0.12, state.itemSize * 0.14);
                }
            }
        },
        cleanIcons() {
            const selectedTiles = game.actions.getSelected();
            selectedTiles.forEach(num => {
                if (_titesMap[num]) {
                    const i = _tiles.indexOf(_titesMap[num]);
                    _tiles.splice(i, 1);
                    delete _titesMap[num]
                }
            });
            game.actions.save2Local();
            game.actions.redraw();
        },
        getTile(num: number) {
            return _titesMap[num];
        },
        getCurSelTileImageUrl() {
            const num = game.actions.getSelected()[0]
            const title = game.actions.getTile(num)
            // const img = game.actions.getImage(title?.index);
            // console.log("=====>");

            // //@ts-ignore
            // if (img) return img.image?.src;
            console.log("num==>", num);

            return `svgscolor/${title?.index + 1}.svg?t=1`
        },

        getCurSelTileName() {
            const num = game.actions.getSelected()[0]
            const title = game.actions.getTile(num)
            return names[title.index];
        },

        isCurSelOwned() {
            const num = game.actions.getSelected()[0]

            const ColGridCount = game.state.ColGridCount;
            // return game.state.owned.find(item => item.num == num);
            const r = Math.floor(num / ColGridCount);
            const c = num % ColGridCount;

            return !!game.ctx.ethers.state.occupiedLocations.find(item => item.x == (c + 1) && item.y == (r + 1))
        },

        async connWallet() {
            if (!game.ctx.ethers.actions.isSuppertMetaMask()) {
                game.state.showItem = false;
                game.state.showTip = true;

//                 game.ctx.ui.messageError(`Current enviornment is for exhibition version only.
// Please use Metamask APP or PC Broswer with Metamask plugins
// to register the evidence of your love.`);
                return;
            }

            if (!game.ctx.ethers.state.ethereumAccount) {
                game.ctx.ui.showLoading("login...");
                const ret = await game.ctx.ethers.actions.connectMetamaskWallet();
                console.log("connWallet==>", ret);
                if (!ret) {
                    game.ctx.ui.messageError("connect metamask failed!")
                    game.ctx.ui.hideLoading();
                    return;
                }
                await game.ctx.ethers.actions.getMyMoments();
                game.ctx.ui.hideLoading();
                game.actions.redraw();
            }

            //添加moment
            game.ctx.ui.showLoading("connecting...");
            const num = game.actions.getSelected()[0]
            const state = game.state;
            const r = Math.floor(num / state.ColGridCount);
            const c = num % state.ColGridCount;
            await game.ctx.ethers.actions.addMoment(c, r);

            game.ctx.ui.hideLoading();
        },

        saveTiles() {
            const tiles = game.actions.save2Local();
            FileSaver.saveAs(new Blob([tiles], {
                type: 'text/plain'
            }), "config.json");
        },
        async loadLocalConfig() {
            const uploader = new UploadFileController(game);
            const files = await uploader.selectAnyFile(false, "")
            console.log(files);
            if (files.length != 1 && files[0].ext != "json") return;
            const reader = new FileReader();
            reader.onload = function () {
                try {
                    _tiles = JSON.parse(reader.result as string)
                    _tiles.forEach(item => {
                        _titesMap[item.num] = item;
                    })
                    game.actions.redraw();
                } catch (error) {

                }
            }
            reader.readAsText(files[0].file, "utf-8");//设置编码
        },

        loadLocalTiles() {
            const tiles = localStorage.getItem("tiles");
            if (tiles) {
                try {
                    _tiles = JSON.parse(tiles);
                    _tiles.forEach(item => {
                        _titesMap[item.num] = item;
                    })
                } catch (error) {
                }
            }
        },
        save2Local() {
            const tiles = JSON.stringify(_tiles);
            localStorage.setItem("tiles", tiles);
            return tiles;
        },

        insertIcons(selected: number[]) {
            if (selected.length < 1) return;
            const selectedTiles = game.actions.getSelected();

            let offset = 0;

            const nums = selectedTiles.slice(0);
            nums.sort((a, b) => { return a - b });

            nums.forEach(num => {
                if (_titesMap[num] == undefined) {
                    const item = { index: selected[offset], num };
                    _titesMap[num] = item
                    _tiles.push(item);
                } else {
                    _titesMap[num].index = selected[offset];
                }
                offset = (offset + 1) % selected.length;
            });
            game.actions.save2Local();
            game.actions.redraw();
        }
    }
}