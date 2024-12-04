# EcoTrack

EcoTrack is a blockchain-based application designed to track personal carbon footprints and reward users for environmentally friendly actions. Built on the Internet Computer platform, EcoTrack incentivizes users to reduce their carbon emissions by offering reward points based on their activities. The platform allows users to log their activities, calculate their carbon emissions, and earn rewards for reducing their environmental impact. The backend is built using Node.js, Express.js, and Azle, ensuring secure and persistent data storage with StableBTreeMap.

## Features
- Track personal carbon footprints
- Reward points for reducing carbon emissions
- Decentralized and secure data storage on the blockchain
- User-friendly API to interact with carbon footprint data
- Built with Node.js, Express.js, and Azle

## Installation

### Prerequisites
- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ecotrack.git
   cd ecotrack
2. Install dependencies:
  ``` bash 
  npm install
3. Start the DFX project:
  ``` bash 
  dfx start
4. Deploy the canister:
  ```bash
  dfx deploy
5. Run the application locally:
  ```bash
  npm run dev

## API Endpoints
- POST /footprints: Create a new carbon footprint entry
- GET /footprints: Retrieve all carbon footprint entries
- GET /footprints/:id: Retrieve a specific carbon footprint entry by ID
- PUT /footprints/:id: Update a carbon footprint entry by ID
- DELETE /footprints/:id: Delete a carbon footprint entry by ID

## License
This project is licensed under the MIT License - see the LICENSE file for details.



