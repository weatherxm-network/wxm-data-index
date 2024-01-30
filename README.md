# WeatherXM Decentralized Data Index
WeatherXM Decentralized Data Index is a dapp that allows users to fetch WeatherXM's data and Merkle trees from Basin's smart contracts. This application is designed to be fully decentralized, enabling users to access weather data and daily reward distribution Merkle trees directly from Filecoin. You can see it in action on https://index.weatherxm.com

## Features
- Fetch weather data from Basin's smart contracts.
- Retrieve Merkle trees from daily reward distributions for station owners.
- Specify custom time ranges to retrieve historical weather data.
- Decentralized architecture, ensuring data integrity and transparency.

## Prerequisites
Before running the application, ensure you have the following dependencies installed on your machine:

- Node.js: Download and Install Node.js
- Git: Download and Install Git

## Getting Started
- Follow these steps to set up and run the WeatherXM Decentralized Data Index locally:

1. Clone the repository to your local machine using Git:
    ```
    git clone https://github.com/WeatherXM/wxm-data-index.git
    ```
2. Navigate to the project directory:
    ```
    cd wxm-data-index
    ```
3. Install the project dependencies using npm:
    ```
    npm install
    ```

## Start the application:
1. Create a `.env.local` file in the root of the project and fill in the env variables like in `.env.example`
2. Start the dev server
    ```bash
    npm run dev
    ```
Open your web browser and access the application at http://localhost:3000.

## Usage
1. Select the desired publication from the dropdown menu.
2. Choose a time range for the data you want to fetch.
3. The fetched data will be displayed on the screen.
