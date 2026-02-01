# Tribekart - Digital Twin Supply Chain for Artisans

Tribekart is a decentralized application (dApp) designed to link rural artisans directly with global markets, ensuring authenticity and fair trade through blockchain technology. By creating a "Digital Twin" for each artifact on the Ethereum (Sepolia) blockchain, Tribekart provides a tamper-proof history of origin and ownership.

## Features

-   **Dual Persona**:
    -   **Buyer Mode**: Browse, purchase, and track unique artisanal products.
    -   **Seller Mode**: Mint new items (creating a Digital Twin), manage inventory, and view business stats.
-   **Blockchain Integration**:
    -   Smart Contracts on **Sepolia Testnet**.
    -   Verifiable history of product creation and purchase.
    -   Transparent "Digital Twin" journey from artisan to buyer.
-   **Wallet System**: Integrated wallet for handling transactions (simulated fiat/crypto bridge).
-   **Order Tracking**: Visual timeline of the product's journey (Minted -> Purchased -> Delivered) with Etherscan links.

## Tech Stack

-   **Frontend**: React Native with Expo Router (Mobile App).
-   **Backend**: Node.js, Express.
-   **Database**: SQLite (Local data persistence).
-   **Blockchain**: Hardhat, Solidity (Smart Contracts).
-   **Network**: Ethereum Sepolia Testnet.

## Project Structure

The project is organized as a monorepo:

```
TRIBEKART/
├── app/                # Frontend application (Expo/React Native)
├── backend/            # Backend API and Database
├── blockchain/         # Smart Contracts and Deployment Scripts
├── components/         # Reusable UI Components
├── services/           # API Integration logic
├── styles/             # Application Styling
└── assets/             # Images and Static Assets
```

## Setup & Configuration

### Prerequisites
-   Node.js (v18+)
-   Expo CLI
-   Metamask Wallet (with Sepolia ETH)

### 1. Installation

Clone the repository:
```bash
git clone git@github.com:KAVYAJOSHI1/TRIBEKART.git
cd TRIBEKART
```

Install dependencies for all parts:
```bash
# Root (Frontend) dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Blockchain dependencies
cd blockchain
npm install
cd ..
```

### 2. Environment Configuration

**IMPORTANT**: This project requires Environment Variables for the Blockchain connection. **These are NOT included in the repo for security.**

Create a `.env` file in **both** the `backend/` and `blockchain/` directories.

**File: `backend/.env` AND `blockchain/.env`**
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=0xYOUR_METAMASK_PRIVATE_KEY
```
*Note: Ensure your Private Key starts with `0x`.*

### 3. Blockchain Deployment (Optional if contract exists)

If you need to deploy a new contract:
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```
Copy the deployed address and update `CONTRACT_ADDRESS` in `backend/server.js`.

### 4. Running the Application

**Step 1: Start the Backend**
```bash
cd backend
node migrate.js   # Initialize Database (Runs once)
node server.js    # Start Server
```
*Server runs on port 3000.*

**Step 2: Start the Frontend**
Open a new terminal in the root directory:
```bash
npm start
```
*Scan the QR code with Expo Go app or run on Android Emulator (`a`).*

## Troubleshooting

-   **"Router not found"**: Reset Expo cache with `npm start -- --reset-cache`.
-   **Backend Crash**: Check `.env` format. Private key **must** have `0x` prefix.
-   **Blockchain Error**: Ensure you have enough Sepolia ETH in your wallet.

## Contributors
-   KAVYA JOSHI
