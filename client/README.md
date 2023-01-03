# Fishpond Client

## Requirements

### Software Needed

- Nodejs
- Yarn

After installing Nodejs, you can install Yarn using the following command in git bash.

```sh
npm install --location=global yarn
```

Once yarn is installed, there is no need to repeat the steps above.

### Installation of dependencies

1. Open git bash inside the client folder
2. run the following command

```sh
yarn install
```

### Configuring the app

Inside the client folder, there is a file named `.env.example`
Please create a file named `.env` inside the client folder with the following contents:

```sh
VITE_SERVER_URL=http://localhost:8000
```

### Running the app

Assuming the steps above are done, run the following command.

```sh
yarn dev
```
