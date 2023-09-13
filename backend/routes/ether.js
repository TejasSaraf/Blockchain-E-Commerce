const Web3 = require("web3")

// Set up two wallets
function sendETH(fromAddress, toAddress, privateKey, amount) {

    // Connect to an Ethereum node
    const web3 = new Web3("LINK_TO_YOUR_NODE")

    // Create transaction object
    let transaction = {
        from: fromAddress,
        to: toAddress,
        gas: web3.utils.toHex(21000),
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether"))
    }

    // Sign the transaction
    const signTx = new Promise((resolve, reject) => {
        resolve(web3.eth.accounts.signTransaction(transaction, privateKey))
    })

    signTx.then(signedTx => {
        // Send the transaction
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
            if (!error) {
                console.log("Transaction hash: ", hash)
            }
            else {
                console.log("Error: ", error)
            }
        })
    })

}

sendETH(fromAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", toAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", amount = "0.05")
