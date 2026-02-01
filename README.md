<img src="public/logos/Candoxa_Horizontal_Logo.png" width="500"/>

# Candoxa DApp

  - [1. Project Description](#1-project-description)
  - [2. Features](#2-features)
  - [3. Technologies Used](#3-technologies-used)
  - [4. Prerequisites](#4-prerequisites)
    - [4.1. Node.js](#31-nodejs)
    - [4.2. TypeScript](#32-typescript)
  - [5. Installation](#5-installation)
    - [5.1. Clone the Repository](#51-clone-the-repository)
    - [5.2. Access the Project Directory](#52-access-the-project-directory)
    - [5.3. Install Dependencies](#54-install-dependencies)
  - [6. Execution](#6-execution)
    - [6.1. Configure Environment Variables](#61-configure-environment-variables)
    - [6.2. Start the Application](#62-start-the-application)
    - [6.3. Candoxa DApp Interface](#63-candoxa-dapp-interface)
    - [6.4. BNB Smart Chain Testnet Explorer](#64-bnb-smart-chain-testnet-explorer)

## 1. Project Description
Candoxa is a Web3 platform where creators collect their best work from across the internet into one public, permanent profile. Content and reputation are recorded on-chain, so they remain verifiable beyond platforms and algorithms. Discovery is driven by the community, not by opaque feeds or pay-to-play systems. Even if accounts disappear, your work and credibility stay intact.

## 2. Features
* **MetaMask integration:** allows users to connect their MetaMask wallet to interact with the Candoxa;

* Note: more features will be introduced as development continues*

## 3. Technologies Used
* **Next.js:** React framework for building scalable, server-rendered web applications;
* **TypeScript:** strongly typed superset of JavaScript that improves code safety and maintainability;
* **Tailwind CSS:** CSS framework that enables styling directly in markup using predefined utility classes;
* **Shadcn UI:** Design system focused on full ownership and customization of components;
* **Solidity:** programming language for writing immutable smart contracts that define on-chain business logic and state on Ethereum;
* **Wagmi:** React hooks library for interacting with Ethereum wallets and smart contracts;

## 4. Prerequisites
### 4.1. Node.js
> Download and Install [Node.js](https://nodejs.org/)

### 4.2. TypeScript
   ```sh
   npm install -g typescript
   ```

## 5. Installation
### 5.1. Clone the Repository
```sh
git clone https://github.com/Join-Candoxa/candoxa-dapp.git
```

### 5.2. Access the Project Directory
```sh
cd candoxa-dapp
```

### 5.3. Install Dependencies
```sh
pnpm install
```

## 6. Execution
### 6.1. Configure Environment Variables
* Rename the **.env.example** file located at the root of the project to **.env**

### 6.2. Start the Application
```sh
pnpm dev
```

### 6.3. Candoxa DApp Interface
* The Candoxa DApp UI can be accessed at **http://192.168.2.102:3000/** or **http://localhost:3000/**

### 6.4. BNB Smart Chain Testnet Explorer
* Transaction validation can be performed through **https://testnet.bscscan.com/**
