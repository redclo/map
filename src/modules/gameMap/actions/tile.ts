import GameMap from "..";
import FileSaver from 'file-saver';
import { UploadFileController } from "@/queenjs/framework/utils";


export default (game: GameMap) => {

    let _tiles: { index: number, num: number }[] = [];
    const _titesMap: any = {};

    return {

        drawTiles(ctx: CanvasRenderingContext2D) {
            const state = game.state;
            const ColGridCount = state.ColGridCount;
            const actions = game.actions;

            for (let k = 0; k < _tiles.length; k++) {
                const tile = _tiles[k];
                const i = tile.num
                const r = Math.floor(i / ColGridCount);
                const c = i % ColGridCount;
                const x1 = state.offsetX + c * state.itemSize;
                const y1 = state.offsetY + r * state.itemSize;
                const icon = actions.getImage(tile.index);
                ctx.drawImage(icon.image as any, icon.x, icon.y, icon.width, icon.height, x1, y1, state.itemSize, state.itemSize);
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