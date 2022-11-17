const ethers = require("ethers");
var groupBy = require("group-by");
const { BigNumber } = require("ethers");
const abiEthereumTest = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "datetime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
      {
        internalType: "string",
        name: "thumbnail",
        type: "string",
      },
      {
        internalType: "string",
        name: "chainId",
        type: "string",
      },
      {
        internalType: "string",
        name: "streamData",
        type: "string",
      },
    ],
    name: "addEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "addSubscritpion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "cancelSubscriptions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "eventAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "purchaseDone",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "_event_count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_events",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_thumbnail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_chainId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_streamData",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_subscritption_count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_subscritption_creator",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_is_subscription_created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_subscritptions",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "_thumbnails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
        ],
        internalType: "struct ImbueToken.SubscritptionDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_now",
        type: "uint256",
      },
    ],
    name: "getUpcomingEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_thumbnail",
            type: "string",
          },
          {
            internalType: "string",
            name: "_chainId",
            type: "string",
          },
          {
            internalType: "string",
            name: "_streamData",
            type: "string",
          },
        ],
        internalType: "struct ImbueToken.EventDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "isPurchased",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "isPurchasedWithAddress",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "isSubscriptionPurchesed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];


const abiEthereum = [];
const abiHarmoneyTest = [];
const abiHarmoney = [];
const abiPolygonTest = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "datetime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
      {
        internalType: "string",
        name: "thumbnail",
        type: "string",
      },
      {
        internalType: "string",
        name: "chainId",
        type: "string",
      },
      {
        internalType: "string",
        name: "streamData",
        type: "string",
      },
    ],
    name: "addEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "addSubscritpion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "cancelSubscriptions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "eventAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "purchaseDone",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "_event_count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_events",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_thumbnail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_chainId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_streamData",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_subscritption_count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_subscritption_creator",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_is_subscription_created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_subscritptions",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "_thumbnails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
        ],
        internalType: "struct ImbueToken.SubscritptionDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_now",
        type: "uint256",
      },
    ],
    name: "getUpcomingEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_thumbnail",
            type: "string",
          },
          {
            internalType: "string",
            name: "_chainId",
            type: "string",
          },
          {
            internalType: "string",
            name: "_streamData",
            type: "string",
          },
        ],
        internalType: "struct ImbueToken.EventDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "isPurchased",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "isPurchasedWithAddress",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscription_index",
        type: "uint256",
      },
    ],
    name: "isSubscriptionPurchesed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const abiArbitrum = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "eventAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "purchaseDone",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_event_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "_events",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_thumbnail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_chainId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_streamData",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_subscritption_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
			}
		],
		"name": "_subscritption_creator",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_is_subscription_created",
				"type": "bool"
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
		"name": "_subscritptions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "_thumbnails",
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
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "datetime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "streamId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "thumbnail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "chainId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "streamData",
				"type": "string"
			}
		],
		"name": "addEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "eventIndex",
				"type": "uint256"
			}
		],
		"name": "addPerson",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addSubscritpion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "subscription_index",
				"type": "uint256"
			}
		],
		"name": "cancelSubscriptions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSubscriptions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_index",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_price",
						"type": "uint256"
					}
				],
				"internalType": "struct ImbueToken.SubscritptionDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_now",
				"type": "uint256"
			}
		],
		"name": "getUpcomingEvents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_index",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_start",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_duration",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_thumbnail",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_chainId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_streamData",
						"type": "string"
					}
				],
				"internalType": "struct ImbueToken.EventDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "eventIndex",
				"type": "uint256"
			}
		],
		"name": "isPurchased",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "eventIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "isPurchasedWithAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "subscription_index",
				"type": "uint256"
			}
		],
		"name": "isSubscriptionPurchesed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "subscription_index",
				"type": "uint256"
			}
		],
		"name": "subscribe",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

const abis = new Map([
  // ["0x45", abiEthereumTest],
  // ["0xA", abiEthereum],
  // ["0x6357D2E0", abiHarmonyTest],
  // ["0x63564C40", abiHarmony],
  ["0x13881", abiPolygonTest],
  ["0x66EEB", abiArbitrum],
]);

const addressMap = new Map([
  // ["0x45", "0x02ed220846b7ec387069e66f4e0d15896445a719"], //Optimistic
  // ["0xA", "0xb2d44f91bfba624369940645ef54ef86a1ee90f0"],
  // ["0x6357D2E0", "0x188a6d53d2ad50deb9d3fa93edb8feceaf67b2be"], //Harmony
  // ["0x63564C40", "0x3829f87b08d6d37b319850fa17b2c081b1b83301"],
  ["0x13881", "0xe9eb6701f5573e7699d9953b36a837a5aad1ca8e"], //Polygon
  ["0x66EEB", "0x87C5F859E3710658d529607EbaE07738BC399082"],
]);

const rpcMap = new Map([
  // ["0x45", "https://kovan.optimism.io"], //Optimistic
  // ["0xA", ""],
  // ["0x6357D2E0", ""], //Harmony
  // ["0x63564C40", ""],
  ["0x13881", "https://rpc-mumbai.maticvigil.com"], //Polygon
  ["0x66EEB","https://rinkeby.arbitrum.io/rpc"],
]);


/**
 * fetching upcoming events by getUpcomingEvents in from smart contract.
 * arguments (chianId, walletAddress).
 * It will return list of events getted from blockchian.
 */
const fetchUpcomingEvents = async ({ chainId, walletAddress }) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcMap.get(chainId));
  const imbueContract = new ethers.Contract(
    addressMap.get(chainId),
    abis.get(chainId),
    provider
  );
  const events = await imbueContract.getUpcomingEvents(
    walletAddress,
    Date.now()
  );
  return events;
};

/**
 * 
 * @param {walletAddress} param0 
 * @returns 
 */


const fetchEventsFromBlockChain = async ({ walletAddress }) => {
  try {
    let eventsList = [];
    // const evnets1 = await fetchUpcomingEvents({
    //   chainId: "0x45",
    //   walletAddress: walletAddress,
    // });

    // console.log("----------------", evnets1);

    const evnets2 = await fetchUpcomingEvents({
      chainId: "0x13881",
      walletAddress: walletAddress,
    });
    // console.log("----------------", evnets2);

    const evnets3 = await fetchUpcomingEvents({
      chainId: "0x66EEB",
      walletAddress: walletAddress,
    });
    // console.log("----------------", evnets3);
// add condition if list empty return empty array
    eventsList = [
      // ...evnets1.map((event) => {
      //   return {
      //     _index: event._index.toString(),
      //     _owner: event._owner,
      //     _name: event._name,
      //     _start: event._start.toString(),
      //     _duration: event._duration.toString(),
      //     _description: event._description,
      //     _price: event._price.toString(),
      //     _thumbnail: event._thumbnail,
      //     _chainId: event._chainId,
      //     _streamData: event._streamData,
      //   };
      // }),
      ...evnets2.map((event) => {
        return {
          _index: event._index.toString(),
          _owner: event._owner,
          _name: event._name,
          _start: event._start.toString(),
          _duration: event._duration.toString(),
          _description: event._description,
          _price: event._price.toString(),
          _thumbnail: event._thumbnail,
          _chainId: event._chainId,
          _streamData: event._streamData,
        };
      }),
      ...evnets3.map((event) => {
        return {
          _index: event._index.toString(),
          _owner: event._owner,
          _name: event._name,
          _start: event._start.toString(),
          _duration: event._duration.toString(),
          _description: event._description,
          _price: event._price.toString(),
          _thumbnail: event._thumbnail,
          _chainId: event._chainId,
          _streamData: event._streamData,
        };
      }),
    ];
    // console.log(eventsList);
    // console.log(groupBy(eventsList, "_streamData"));
    let groudpByEventData = groupBy(eventsList, "_streamData");
    var reqmdata = [];
    for (const key in groudpByEventData) {
      let onekeyData = groudpByEventData[key];
      // console.log(`${key}: ${onekeyData}`);
      const uniqueChainIdArray = [
        ...new Set(onekeyData.map((item) => item._chainId)),
      ]; // [ 'A', 'B']
      const eventIndexes = onekeyData.map((item) => {
        return { chainId: item._chainId, index: item._index };
      });
      let myacObj = {
        _index: onekeyData[0]._index,
        _owner: onekeyData[0]._owner,
        _name: onekeyData[0]._name,
        _start: onekeyData[0]._start,
        _duration: onekeyData[0]._duration,
        _description: onekeyData[0]._description,
        _price: onekeyData[0]._price,
        _thumbnail: onekeyData[0]._thumbnail,
        _chainId: uniqueChainIdArray,
        _streamData: onekeyData[0]._streamData,
        _eventIndexes: eventIndexes,
      };
      reqmdata.push(myacObj);
    }

    // console.log(reqmdata);
    return reqmdata.map((el) => {
      return { ...el, id: Math.random().toString(16).slice(2) };
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fetchEventsFromBlockChain2 = async ({ walletAddress }) => {
  try {
    let eventsList = [];
    // const evnets1 = await fetchUpcomingEvents({
    //   chainId: "0x45",
    //   walletAddress: "0x0000000000000000000000000000000000000000",
    // });

    // console.log("----------------", evnets1);

    const evnets2 = await fetchUpcomingEvents({
      chainId: "0x13881",
      walletAddress: "0x0000000000000000000000000000000000000000",
    });

    const evnets3 = await fetchUpcomingEvents({
      chainId: "0x66EEB",
      walletAddress: "0x0000000000000000000000000000000000000000",
    });
    eventsList = [
      // ...evnets1.map((event) => {
      //   return {
      //     _index: event._index.toString(),
      //     _owner: event._owner,
      //     _name: event._name,
      //     _start: event._start.toString(),
      //     _duration: event._duration.toString(),
      //     _description: event._description,
      //     _price: event._price.toString(),
      //     _thumbnail: event._thumbnail,
      //     _chainId: event._chainId,
      //     _streamData: event._streamData,
      //   };
      // }),
      ...evnets2.map((event) => {
        return {
          _index: event._index.toString(),
          _owner: event._owner,
          _name: event._name,
          _start: event._start.toString(),
          _duration: event._duration.toString(),
          _description: event._description,
          _price: event._price.toString(),
          _thumbnail: event._thumbnail,
          _chainId: event._chainId,
          _streamData: event._streamData,
        };
      }),
      ...evnets3.map((event) => {
        return {
          _index: event._index.toString(),
          _owner: event._owner,
          _name: event._name,
          _start: event._start.toString(),
          _duration: event._duration.toString(),
          _description: event._description,
          _price: event._price.toString(),
          _thumbnail: event._thumbnail,
          _chainId: event._chainId,
          _streamData: event._streamData,
        };
      }),
    ];
    // console.log(eventsList);
    const filterList = eventsList.filter(
      (event) => event._owner.toLowerCase() != walletAddress.toLowerCase()
    );
    // return filterList;

    // console.log(groupBy(filterList, "_streamData"));
    let groudpByEventData = groupBy(filterList, "_streamData");
    var reqmdata = [];
    for (const key in groudpByEventData) {
      let onekeyData = groudpByEventData[key];
      // console.log(`${key}: ${onekeyData}`);
      const uniqueChainIdArray = [
        ...new Set(onekeyData.map((item) => item._chainId)),
      ]; // [ 'A', 'B']
      const eventIndexes = onekeyData.map((item) => {
        return { chainId: item._chainId, index: item._index };
      });

      let myacObj = {
        _index: onekeyData[0]._index,
        _owner: onekeyData[0]._owner,
        _name: onekeyData[0]._name,
        _start: onekeyData[0]._start,
        _duration: onekeyData[0]._duration,
        _description: onekeyData[0]._description,
        _price: onekeyData[0]._price,
        _thumbnail: onekeyData[0]._thumbnail,
        _chainId: uniqueChainIdArray,
        _streamData: onekeyData[0]._streamData,
        _eventIndexes: eventIndexes,
      };
      reqmdata.push(myacObj);
    }

    // console.log(reqmdata);

    return reqmdata.map((el) => {
      return { ...el, id: Math.random().toString(16).slice(2) };
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isEventPurchased = async (eventIndexes, walletAddress) => {
  // console.log(eventIndexes,walletAddress,"=============")
  const pro = await Promise.all(
    eventIndexes.map(async (el) => {
      const provider = new ethers.providers.JsonRpcProvider(rpcMap.get(el.chainId));
      const imbueContract = new ethers.Contract(
        addressMap.get(el.chainId),
        abis.get(el.chainId),
        provider
      );
   const a =    await imbueContract.isPurchasedWithAddress(
        BigNumber.from(el.index),
        walletAddress
      );
      // console.log(a)
      return a;
    })
  );

  // console.log("========================================",!pro.every(element => element === false));
  return !pro.every(element => element === false);
};

module.exports = {
  fetchEventsFromBlockChain,
  fetchEventsFromBlockChain2,
  isEventPurchased,
};
