import game from "@/modules/gameMap/actions/game";
import Ethers from "..";
import * as love from "../requests/LoveCounter";
import { getQuery } from "@/queenjs/framework/utils";

export default (eth: Ethers) => {

    function Format(dat: Date, fmt: string) {  // author: meizz 
        const o = {
            "M+": dat.getMonth() + 1,  // 月份 
            "d+": dat.getDate(),  // 日 
            "h+": dat.getHours(),  // 小时 
            "m+": dat.getMinutes(),  // 分 
            "s+": dat.getSeconds(),  // 秒 
            "q+": Math.floor((dat.getMonth() + 3) / 3),  // 季度 
            "S": dat.getMilliseconds()  // 毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dat.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (const k in o)
            //@ts-ignore
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }

    return {
        async addMoment(x: number, y: number) {
            try {
                const find = eth.state.occupiedLocations.find(item => (item.x == (x + 1) && item.y == (y + 1)))
                if (find) {
                    return true;
                }
                const msg = Format(new Date(), "yyyy/MM/dd hh:mm:ss")
                const { err, res } = await love.addMoment(eth.state.ethereumAccount, x + 1, y + 1, msg)
                if (err) {
                    eth.ctx.ui.messageError("connect failed, please try again!")
                    return
                }
                console.log("addMoment=>vvv", res);
                const times = msg.split(" ");
                eth.state.currMomentDay = times[0];
                eth.state.currMomentHour = times[1];

                await eth.actions.updateState();

                eth.ctx.gameMap.state.isCurSelOwned = eth.ctx.gameMap.actions.isCurSelOwned();

                eth.ctx.gameMap.actions.redraw();

            } catch (error) {
            }
        },
        isSuppertMetaMask() {
            const query = getQuery();
            return !!((window as any).ethereum) && (!query.tip)
        },

        async connectMetamaskWallet() {
            try {
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
                eth.state.ethereumAccount = accounts[0];
                return true;
            } catch (error: any) {
                console.log(error);
                if (error.message) {
                    alert(`Something went wrong: ${error.message}`);
                }
            }
            return false
        },

        async updateState() {
            await eth.actions.getMyMoments();

            await eth.actions.getOccupiedLocations();

            eth.ctx.gameMap.actions.redraw();
        },

        async getMessage() {
            const y = eth.ctx.gameMap.state.selItemX + 1
            const x = eth.ctx.gameMap.state.selItemY + 1

            const loc = eth.state.occupiedLocations.find(item => item.x == x && item.y == y);

            if (loc) {
                eth.state.currMomentDay = ""
                eth.state.currMomentHour = ""
                const ret = await love.getRomanceByLocation(eth.state.loveMainAccount, x, y);
                if (ret) {
                    const timeFrags = ret.split(" ")
                    if (timeFrags.length == 2 && timeFrags[0] && timeFrags[1]) {
                        eth.state.currMomentDay = timeFrags[0]
                        eth.state.currMomentHour = timeFrags[1]
                    }
                }
            }
        },

        async getMyMoments() {
            if (eth.state.ethereumAccount) {
                const my = await love.getMyLocations(eth.state.ethereumAccount);
                eth.state.selfLocations = my;
            }
        },

        async getOccupiedLocations() {
            const locations = await love.getOccupiedLocations(eth.state.loveMainAccount);
            eth.state.occupiedLocations = locations;
        }
    }
}