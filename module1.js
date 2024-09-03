import { PublicKey, Connection } from "@solana/web3.js";

// Function to get balance using the provided public key
async function getBalanceUsingWeb3(publicKey) {
    const connection = new Connection("https://api.devnet.solana.com");
    return connection.getBalance(publicKey);
}

// Create a PublicKey object with the given key
const publicKey = new PublicKey('7UsN2ocFdUA89xp5KQ3eterTnChJreXgmuhaoyaKqxG7');

// Call the function and print the balance
getBalanceUsingWeb3(publicKey).then(balance => {
    console.log('Balance:', balance);
}).catch(error => {
    console.error("Error fetching balance:", error);
});