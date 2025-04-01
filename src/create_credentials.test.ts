const Web3 = require('web3').default;
const web3 = new Web3();


describe('Test to create ETH credentials - PK & PUB', () => {

    it('Issue new credentials', () => {

        const account = web3.eth.accounts.create();
        const address = account.address;
        const pk = account.privateKey.replace(/^0x/, '');

        console.log(`Address: ${address}`);
        console.log(`PK: ${pk}`);

        expect(address.startsWith('0x')).toBe(true);
        expect(!pk.startsWith('0x')).toBe(true);
    });
});
