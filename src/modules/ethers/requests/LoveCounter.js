import Web3 from 'web3/dist/web3.min.js';

const {
    BigNumber
} = require("ethers");

const abi = [{
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint64[]",
            "name": "",
            "type": "uint64[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOccupiedLocations",
        "outputs": [{
            "internalType": "uint64[]",
            "name": "",
            "type": "uint64[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint64",
            "name": "location",
            "type": "uint64"
        }],
        "name": "getRomance",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "occupiedLocations",
        "outputs": [{
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
        }],
        "name": "romanceMap",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

const address = '0x3617a64ad6A0E5d73fe08dc7aC2d48b68e1Cc8E3';

const base = BigNumber.from(2);

let _ethereum = null;

export function getMmSdk() {
    if (_ethereum) return _ethereum;

    const MMSDK = new window.MetaMaskSDK()

    _ethereum = MMSDK.getProvider() // You can also access via window.ethereum
    
    console.log("ethereum=>", _ethereum);

    return _ethereum;
}

let _contract = null;

export function getContract() {
    if ( _contract ) return _contract;
    const web3 = new Web3(getMmSdk());

    _contract = new web3.eth.Contract(abi, address);

    return _contract;
}

function convertCoordinateToLocation(x, y) {
    let bigNumberX = BigNumber.from(x);
    let bigNumberY = BigNumber.from(y);
    return bigNumberX.mul(base.pow(32)).add(bigNumberY);
}

function convertLocationToCoordinate(location) {
    let bigNumberLocation = BigNumber.from(location)
    return [bigNumberLocation.div(base.pow(32)).toNumber(), bigNumberLocation.mask(32).toNumber()]
}

export function addMoment(account, locationX, locationY, message) {

    return new Promise((resolve) => {
        getContract().methods
            .addMoment(convertCoordinateToLocation(locationX, locationY), message)
            .send({
                from: account
            }, function (err, res) {
                if (err) {
                    resolve({
                        err,
                        res
                    })
                }
            }).then(r => {
                resolve({});
            })
    })

}

export async function getMyMoments(account) {
    let moments = [];
    let myLocations = await  getContract().methods.getMyLocations()
        .call({
            from: account
        }, function (err, res) {
            if (err) {
                console.log("An error occurred", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });
    console.log(myLocations);

    for (const value of myLocations) {
        let romance = await  getContract().methods.getRomance(value)
            .call({
                from: account
            }, function (err, res) {
                if (err) {
                    console.log("An error occurred", err);
                }
                console.log("Hash of the transaction: " + res);
            });
        let [x, y] = convertLocationToCoordinate(value);
        moments.push({
            x,
            y,
            romance
        });
    }
    console.log(moments);
    return moments;
}

export async function getMyLocations(account) {
    let ret = [];
    let myLocations = await  getContract().methods.getMyLocations()
        .call({
            from: account
        }, function (err, res) {
            if (err) {
                console.log("An error occurred", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });

    for (const value of myLocations) {
        let [x, y] = convertLocationToCoordinate(value);
        ret.push({
            x,
            y
        });
    }
    console.log(ret);
    return ret;
}

export async function getOccupiedLocations(account) {
    let occupiedLocations = await  getContract().methods.getOccupiedLocations()
        .call({
            from: account
        }, function (err, res) {
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
        locations.push({
            x,
            y
        });
    }
    return locations;
}

export async function getRomanceByLocation(account, locationX, locationY) {
    return await  getContract().methods.getRomance(convertCoordinateToLocation(locationX, locationY))
        .call({
            from: account
        }, function (err, res) {
            if (err) {
                console.log("An error occurred", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });
}