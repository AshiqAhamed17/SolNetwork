import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Function to get balance using the provided public key
async function getBalanceUsingWeb3(publicKey) {
    const connection = new Connection("https://api.devnet.solana.com");
    const balance = await connection.getBalance(publicKey);
    console.log('Balance:', balance / LAMPORTS_PER_SOL + " SOL");
}

// Create a PublicKey object with the given key
const publicKey = new PublicKey('7UsN2ocFdUA89xp5KQ3eterTnChJreXgmuhaoyaKqxG7');

// Call the function and print the balance
getBalanceUsingWeb3(publicKey).catch(error => {
    console.error("Error fetching balance:", error);
});

// Function to get balance using JSON-RPC
async function getBalanceUsingJSONRPC(address) {
    const url = 'https://api.devnet.solana.com';
    console.log(url);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [
                    address
                ]
            })
        });

        const json = await response.json();

        if (json.error) {
            throw json.error;
        }

        const balance = json['result']['value'];
        console.log('Balance:', balance / LAMPORTS_PER_SOL + " SOL");
    } catch (error) {
        console.error("Error fetching balance using JSON-RPC:", error);
    }
}

// Call the JSON-RPC function
getBalanceUsingJSONRPC('7UsN2ocFdUA89xp5KQ3eterTnChJreXgmuhaoyaKqxG7');