pragma solidity >=0.4.21 <0.6.0;


//  define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";

//  define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721 {

    Verifier verifierContract;

    //  define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solAddress;
    }

    //  define an array of the above struct
    Solution[] solutionsArray;

    //  define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionsSubmitted;

    constructor(address verifierAddress) CustomERC721() public {
      verifierContract = Verifier(verifierAddress);
    }

    //  Create an event to emit when a solution is added
    event SolutionAdded(address submitter);

    //  Create a function to add the solutions to the array and emit the event
    function addSolution(address solAddress, uint256 index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory inputs) public {
      bytes32 key = keccak256(abi.encodePacked(a, b, c, inputs));
      require(solutionsSubmitted[key].solAddress == address(0), "Solution already exists!");

      Solution memory newSolution = Solution({
        index: index,
        solAddress: solAddress
      });

      solutionsSubmitted[key] = newSolution;
      solutionsArray.push(newSolution);

      emit SolutionAdded(solAddress);
    }


    //  Create a function to mint new NFT only after the solution has been verified
    function mintNFT(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory inputs) public {
      //  - make sure the solution is unique (has not been used before)
      //  - make sure you handle metadata as well as tokenSuplly

      // require(verifierContract.verifyTx(a, b, c, inputs), "Wrong solution!");
      addSolution(to, tokenId, a, b, c, inputs);
      super.mint(to, tokenId);
    }
}






























