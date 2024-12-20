# Sui Counter dApp

This dApp is a simple counter application built using the Sui blockchain. It allows users to create and interact with counters on the blockchain.

## Project Structure

The project is structured as follows:
- The `counter/` directory contains the Move smart contracts and related files.
- The `my-first-sui-dapp/` directory contains the React frontend application.

## Key Files

- `src/App.tsx`: The main application component.
- `src/Counter.tsx`: Component to interact with an existing counter.
- `src/CreateCounter.tsx`: Component to create a new counter.
- `src/networkConfig.ts`: Configuration for connecting to the Sui network.

## Prerequisites

- Node.js and Yarn installed on your machine.

## Installation

To install the dependencies, navigate to the `my-first-sui-dapp/` directory and run:

yarn install

## Development

To start the development server, run:
    - yarn dev
        - This will start the application in development mode and open it in your default web browser.

## Building
To build the application for production, run:
    - yarn build
        - This will create a dist/ directory with the production build of the application.

## Publishing
To publish the Move smart contracts, navigate to the counter/ directory and follow these steps:

    1. Compile the Move smart contracts:
        - move build

    2. Publish the compiled bytecode to the Sui network:
        - sui client publish --path ./build/counter --gas-budget 1000
            - Replace 1000 with an appropriate gas budget for your transaction.

## Usage
Once the application is running, you can:
- Connect your wallet using the Connect button.
- Create a new counter using the "Create Counter" button.
- Interact with an existing counter by incrementing or resetting its value.


## License
This project is licensed under the Apache-2.0 License.

