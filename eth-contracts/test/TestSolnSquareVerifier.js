var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

var proof = {
  "proof": {
    "a": [
      "0x17d05f26bc4bd247ee96270a70a7937da83feea6b43cc3d0b73c913dfe86df5d",
      "0x270fb41333f752aedbd0905b3419bec7d9951273b672add9cd2cd35e5e5420b1"
    ],
    "b": [
      [
        "0x1d1f937fb42b6d69143aae652705272dac5ef6ad2f97a7bb2b5254797c475459",
        "0x1642fcee5613c3f8704befe1d024cbed579487f6416372ac557284fa96c3f1c1"
      ],
      [
        "0x2f4c395b7c64c9630b28fed244848f83688f2a2e8ae2dcfbb620dda08ed1a81d",
        "0x29f29567a333236fff8f86f8361b74cc79137e58c213fdd1dab2265485394e96"
      ]
    ],
    "c": [
      "0x0f80726fed44a34784e17e92de8b67e54fceca7afb2a4b73146aa80e029751ab",
      "0x2c1687f86163a962a8b27d1f2c3f7368856f373e222b26fb8fafaf88b2ab4537"
    ]
  },
  "inputs": [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ]
};

contract('SolnSquareVerifier', accounts => {

  const account1 = accounts[0];
  const account2 = accounts[1];

  const a = proof.proof.a;
  const b = proof.proof.b;
  const c = proof.proof.c;
  const correctInput = proof.inputs;

  describe('SolnSquareVerifier test', () => {
    beforeEach(async() => {
      const verifier = await Verifier.new({ from: account1 });
      this.contract = await SolnSquareVerifier.new(verifier.address, { from: account1 });
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier // Test if an ERC721 token can be minted for contract - SolnSquareVerifier

    it('Test if new solution can be added for contract & ERC721 token can be minted for contract', async() => {
      let mintToken = await this.contract.mintNFT(account2, 2, a, b, c, correctInput, { from: account1 });
      let owner = await this.contract.ownerOf(2);

      assert.equal(account2, owner, "Token owner incorrect or token is not minted!");
    });
  });
});

