# Fishpond Sever

## Requirements

### Software Needed

- PHP 8.1
- Composer

### Installation of dependencies

1. Open git bash inside the server folder
2. run the following command

```sh
composer install
```

### Configuring the app

Inside the server folder, there is a file named `.env.example`
Please create a file named `.env` inside the server folder with the following contents from the `.env.example` file.

The configuration for the database and mailhog needs to be put inside the `.env` file

After configuring the `.env` file, run the following commands.

__Generate a secure key__:

```sh
php artisan key:generate
```

__Generate a jwt key for authentication__:

```sh
php artisan jwt:secret -f
```

__Create the database tables and seed__:

```sh
php artisan migrate --seed
```

### Running the app

Assuming the steps above are done, run the following command.

```sh
php artisan serve
```
