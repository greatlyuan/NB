import Web3 from "web3";

const web3 = new Web3(window.ethereum);
const usdt_addr = "0xD019be5cEfd9917b885a10E2F9b9223Ff9B1dAa4";
const nb_addr = "0x3DE05E7f1C53B4017Ac4D15c6AFa28CA099bad5F";
const usdt_abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
const nb_abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_type",
                "type": "uint256"
            },
            {
                "name": "_number",
                "type": "uint256"
            },
            {
                "name": "_parent",
                "type": "address"
            }
        ],
        "name": "flashcash",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_parent",
                "type": "address"
            },
            {
                "name": "_number",
                "type": "uint256"
            }
        ],
        "name": "join",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "receive",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "flashcashinfo",
        "outputs": [
            {
                "name": "_usdtbalance",
                "type": "uint256"
            },
            {
                "name": "_ausdtbalance",
                "type": "uint256"
            },
            {
                "name": "_nbbalance",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "name": "_type",
                        "type": "uint256"
                    },
                    {
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "name": "number",
                        "type": "uint256"
                    }
                ],
                "name": "_o",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "components": [
                    {
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "name": "count",
                        "type": "uint256"
                    },
                    {
                        "name": "rate",
                        "type": "uint256"
                    },
                    {
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "name": "profittime",
                        "type": "uint256"
                    },
                    {
                        "name": "endtime",
                        "type": "uint256"
                    },
                    {
                        "name": "outtime",
                        "type": "uint256"
                    },
                    {
                        "name": "number",
                        "type": "uint256"
                    },
                    {
                        "name": "totalnumber",
                        "type": "uint256"
                    },
                    {
                        "name": "parent",
                        "type": "address"
                    },
                    {
                        "name": "sons",
                        "type": "address[]"
                    },
                    {
                        "name": "_teamnumber",
                        "type": "uint256"
                    },
                    {
                        "name": "achievement",
                        "type": "uint256"
                    },
                    {
                        "name": "sprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "dprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "totalprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "currentprofit",
                        "type": "uint256"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "investmentinfo",
        "outputs": [
            {
                "name": "_nbbalance",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "name": "count",
                        "type": "uint256"
                    },
                    {
                        "name": "rate",
                        "type": "uint256"
                    },
                    {
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "name": "profittime",
                        "type": "uint256"
                    },
                    {
                        "name": "endtime",
                        "type": "uint256"
                    },
                    {
                        "name": "outtime",
                        "type": "uint256"
                    },
                    {
                        "name": "number",
                        "type": "uint256"
                    },
                    {
                        "name": "totalnumber",
                        "type": "uint256"
                    },
                    {
                        "name": "parent",
                        "type": "address"
                    },
                    {
                        "name": "sons",
                        "type": "address[]"
                    },
                    {
                        "name": "_teamnumber",
                        "type": "uint256"
                    },
                    {
                        "name": "achievement",
                        "type": "uint256"
                    },
                    {
                        "name": "sprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "dprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "totalprofit",
                        "type": "uint256"
                    },
                    {
                        "name": "currentprofit",
                        "type": "uint256"
                    }
                ],
                "name": "_o",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "poolinfo",
        "outputs": [
            {
                "name": "_userhold",
                "type": "uint256"
            },
            {
                "name": "_teamhold",
                "type": "uint256"
            },
            {
                "name": "_teamnumber",
                "type": "uint256"
            },
            {
                "name": "_sons",
                "type": "address[]"
            },
            {
                "name": "_sonsnumber",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "profitinfo",
        "outputs": [
            {
                "name": "_usdtbalance",
                "type": "uint256"
            },
            {
                "name": "_nbbalance",
                "type": "uint256"
            },
            {
                "name": "_sprofit",
                "type": "uint256"
            },
            {
                "name": "_dprofit",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "name": "_type",
                        "type": "uint256"
                    },
                    {
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "name": "number",
                        "type": "uint256"
                    }
                ],
                "name": "_o",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

function Usdt () {
    return new web3.eth.Contract(usdt_abi, usdt_addr);
}

function Nb () {
    return new web3.eth.Contract(nb_abi, nb_addr);
}

function Coinbase (){
    return new Promise((resolve, reject) => {
        web3.eth.getCoinbase().then( res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    });
}

export default {
    Usdt,
    Nb,
    Coinbase
}