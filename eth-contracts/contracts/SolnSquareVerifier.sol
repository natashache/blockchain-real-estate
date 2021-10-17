pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721 {
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solAddress;
    };

    // TODO define an array of the above struct
    Solution[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(address => Solution) solutionsSubmitted;

    constructor(address verifierAddress, string memory name, string memory symbol) CustomERC721(name, symbol) public {
      verifierContract = Verifier(verifierAddress);
    }

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address submitter);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolutions(address solAddress, uint256 index) public {
      Solution memory newSolution = Solution({
        index: index,
        solAddress: solAddress
      });
      solutionsArray.push(newSolution);
      emit SolutionAdded(msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    function mintNFT(address to, uint256 tokenId, string memory tokenURI) public {
      //  - make sure the solution is unique (has not been used before)
      //  - make sure you handle metadata as well as tokenSuplly
    }
}






























