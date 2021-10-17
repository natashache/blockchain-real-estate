var CustomERC721 = artifacts.require('CustomERC721');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            const _name = "TashCoin";
            const _symbol = "TCN";
            this.contract = await CustomERC721.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, { from: account_one });
            await this.contract.mint(account_two, 2, { from: account_one });
            await this.contract.mint(account_two, 3, { from: account_one });
        })

        it('should return total supply', async function () {
            const totalSupply = await this.contract.totalSupply.call({ from: account_one });
            assert.equal(totalSupply, 3, "Total supply should be 3.");
        })

        it('should get token balance', async function () {
            const totalBalance = await this.contract.balanceOf.call(account_two);
            assert.equal(totalBalance, 3, "Total balance for this user should be 3.");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', "Wrong token URI.");
        })

        it('should transfer token from one owner to another', async function () {
            this.contract.safeTransferFrom(account_two, account_one, 1, { from: account_two });
            const owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, account_one, "Token transfer failed.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await CustomERC721.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let failed = false;
            try {
                await this.contract.mint(account_two, 4, { from: account_two });
            } catch (err) {
                failed = true;
            }
            assert.equal(failed, true, "Minting should fail when sender is nto contract owner.")
        })

        it('should return contract owner', async function () {
            const owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "Does not return the correct owner.");
        })

    });
})