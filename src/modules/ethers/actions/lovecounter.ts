import Ethers from "..";
import * as love from "../requests/LoveCounter";

export default (eth: Ethers) => {

    return {
        async addMoment(x: number, y: number) {
            try {
                const ret = await love.addMoment(eth.state.ethereumAccount, x, y, `x:${x}y:${y}`)
                console.log("addMoment=>", ret);
            } catch (error) {
            }
        },
        async connectMetamaskWallet() {
            try {
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
                eth.state.ethereumAccount = accounts[0];
            } catch (error) {
                alert(`Something went wrong: ${error}`);
            }
        },
        async getMyMoments() {
            return love.getMyMoments(eth.state.ethereumAccount);
        },

        async getOccupiedLocations() {
            const locations = await love.getOccupiedLocations(eth.state.loveMainAccount);
            console.log(locations);
            eth.state.occupiedLocations = locations;
            eth.ctx.gameMap.actions.redraw();
        }
    }
}