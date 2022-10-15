import Web3 from 'web3/dist/web3.min.js';

const { BigNumber } = require("ethers");

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "location",
                "type": "uint64"
            },
            {
                "internalType": "string",
                "name": "romance",
                "type": "string"
            }
        ],
        "name": "addMoment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyLocations",
        "outputs": [
            {
                "internalType": "uint64[]",
                "name": "",
                "type": "uint64[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOccupiedLocations",
        "outputs": [
            {
                "internalType": "uint64[]",
                "name": "",
                "type": "uint64[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "location",
                "type": "uint64"
            }
        ],
        "name": "getRomance",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "locationMap",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "occupiedLocations",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "name": "romanceMap",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const address = '0xCB6DD0c2eA49A46db7791C46BA682193De332a41';
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abi, address);

const base = BigNumber.from(2);

function convertCoordinateToLocation(x, y) {
    let bigNumberX = BigNumber.from(x);
    let bigNumberY = BigNumber.from(y);
    return bigNumberX.mul(base.pow(32)).add(bigNumberY);
}

function convertLocationToCoordinate(location) {
    let bigNumberLocation = BigNumber.from(location)
    return [bigNumberLocation.div(base.pow(32)).toNumber(), bigNumberLocation.mask(32).toNumber()]
}

export async function addMoment(account, locationX, locationY, message) {
    await contract.methods
        .addMoment(convertCoordinateToLocation(locationX, locationY), message)
        .send({from: account}, function (err, res) {
            if (err) {
                console.log("An error occurred", err)
                return
            }
            console.log("Hash of the transaction: " + res)
        });
}

export async function getMyMoments(account) {
    let moments = [];
    let myLocations = await contract.methods.getMyLocations()
        .call({from: account}, function (err, res) {
            if (err) {
                console.log("An error occurred", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });
    console.log(myLocations);

    for (const value of myLocations) {
        let romance = await contract.methods.getRomance(value)
            .call({from: account}, function (err, res) {
                if (err) {
                    console.log("An error occurred", err);
                }
                console.log("Hash of the transaction: " + res);
            });
        let [x, y] = convertLocationToCoordinate(value);
        moments.push({x, y, romance});
    }
    console.log(moments);
    return moments;
}

export async function getOccupiedLocations(account) {
    let occupiedLocations = await contract.methods.getOccupiedLocations()
        .call({from: account}, function (err, res) {
            if (err) {
                console.log("An error occurred", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });
    let locations = [];
    console.log(occupiedLocations)
    for (const value of occupiedLocations) {
        let [x, y] = convertLocationToCoordinate(value);
        locations.push({x, y});
    }
    return locations;
}