## Description

This repository was created using [Create React App](https://create-react-app.dev/).

## Prerequisites

- Node.js (v18.12.1)
  - Please refer to [this link](https://nodejs.org/en/download/) to install Node.js
- NPM (v8.19.2)
  - This version of NPM comes included with Node.js (v18.12.1)

## Installation

Run the installation script to install the required packages with NPM:

```bash
$ npm install
```

## Running the app
Please ensure that there is `.env` file containing the correct environment variables in the root folder of this repository when running it locally.

You can run a development copy of this app with the following script:

```bash
$ npm run start
```

## Features

- Type into the **User Search** input field to trigger the autocomplete options for users available on the backend
- Pressing enter on the keyboard or clicking on the search icon triggers a search query
- Results are displayed in a table with the username, avatar, repository, user type and user score
- Clicking on the repository button navigates to the user's GitHub repository
- If there is more than 1 page of results, you can click on the table scroll buttons to navigate to the previous / next page
