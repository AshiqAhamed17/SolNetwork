import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

// Initialize the connection
const connection = new Connection("https://api.devnet.solana.com");

// Parameterized function to send SOL
async function sendSol(senderPublicKey, receiverPublicKey, amountInSol) {
  try {
    // Define public keys
    const sender = new PublicKey(senderPublicKey);
    const receiver = new PublicKey(receiverPublicKey);

    // Create transaction
    const transaction = new Transaction();

    // Create the transfer instruction
    const sendSolInst = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: receiver,
      lamports: amountInSol * LAMPORTS_PER_SOL, // Amount in lamports
    });

    // Add the instruction to the transaction
    transaction.add(sendSolInst);

    // Retrieve and decode the Base64 encoded private key
    const secretKeyBase64 = process.env.PRIVATE_KEY_BASE64;
    const secretKey = Uint8Array.from(Buffer.from(secretKeyBase64, "base64"));

    // Validate secret key length
    if (secretKey.length !== 64) {
      throw new Error("Invalid secret key size");
    }

    // Create Keypair from secret key
    const keypair = Keypair.fromSecretKey(secretKey);

    // Send and confirm the transaction
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [keypair], // Signer (the sender's Keypair)
      { preflightCommitment: "confirmed" } // Commitment level
    );

    console.log("Transaction Signature:", signature);
  } catch (error) {
    console.error("Error sending SOL:", error);
  }
}

// Example usage
// Replace with your actual public keys and amount
const senderPublicKey = "7UsN2ocFdUA89xp5KQ3eterTnChJreXgmuhaoyaKqxG7";
const receiverPublicKey = "DBmzz6UdBU4Ehbusxzn9cfgkAkCryhjkBwczvXrsvcFj";
const amountInSol = 0.2; // Amount in SOL

sendSol(senderPublicKey, receiverPublicKey, amountInSol);
