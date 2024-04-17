# Atenai

## Audio File Tokenization Project on the Stacks Network

This project combines technologies such as **Vite**, **React**, **IPFS**, and a **smart contract written in Clarity** with **Clarinet** to tokenize audio files. The goal is to upload an audio file to IPFS and then create a unique token associated with that file using the smart contract.

## Features

- **IPFS File Upload**: The project allows users to upload audio files to the IPFS network, ensuring decentralization and availability.
- **Tokenization**: It utilizes a smart contract written in Clarity to create unique tokens representing audio files.
- **User Interface**: The user interface is built with React and Vite, providing a smooth and user-friendly experience.

## Usage Instructions

1. **Installation**:
   - Clone this repository.
   - Install dependencies by running `npm install`.

2. **Smart Contract Interaccion**:
   - The smart contract is deployed on the Stacks testnetwork so your wallet should bi in the same **Testnet**.

3. **IPFS File Upload**:
   - Utilize the IPFS library to upload audio files to the IPFS network.
   - Create an acount in pinnata and save de jwt token in the .env file
   - Save the generated IPFS addresses for each file.

4. **Tokenization**:
   - Invoke the smart contract to create unique tokens associated with the IPFS addresses of the audio files.
   - Each token represents a specific file.

5. **User Interface**:
   - Develop a user interface using React and Vite.
   - Display the uploaded audio files and their associated tokens.

---

*Note: This project is fictional and provided for illustrative purposes. It does not represent an actual production project.*
