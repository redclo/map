import { StateRoot } from '@/queenjs/framework';

export default class extends StateRoot {
    installMetaPlugin = false;
    ethereumAccount = "";
    loveMainAccount = "0xa0fdd1c7af9d1e695937059d02d150edfbdb1a16";
    occupiedLocations: { x: number, y: number }[] = [];
    selfLocations: { x: number, y: number }[] = [];

    currMomentDay = "";
    currMomentHour = ""
}