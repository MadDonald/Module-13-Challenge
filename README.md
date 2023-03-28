# Module-13-Challenge

This is a backend application for an e-commerce platform, providing API endpoints to manage products, categories, and tags. The application is built with Node.js, Express, and Sequelize to interact with a MySQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Video Guide
https://user-images.githubusercontent.com/100619060/228107801-d93715fa-c381-43d7-9d07-b7992c6d0951.mp4

## Installation

1. Clone the repository or download the source code.

2. Navigate to the root folder of the project in your terminal.

3. Run `npm install` to install the required dependencies.

4. Create a `.env` file in the root folder with the following variables:

DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

5. Set up the database by running the following commands in MySQL:

source ./db/schema.sql;

6. Run `node seeds/index.js' in your terminal to seed the database. 

7. Start the application by running `npm start`.

## Usage

To interact with the API, you can use a tool like [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest). The application provides the following API routes:

- `/api/categories` to manage categories
- `/api/products` to manage products
- `/api/tags` to manage tags

## API Routes

### Categories

- `GET /api/categories`: Retrieve all categories
- `GET /api/categories/:id`: Retrieve a category by its ID
- `POST /api/categories`: Create a new category
- `PUT /api/categories/:id`: Update a category by its ID
- `DELETE /api/categories/:id`: Delete a category by its ID

### Products

- `GET /api/products`: Retrieve all products
- `GET /api/products/:id`: Retrieve a product by its ID
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product by its ID
- `DELETE /api/products/:id`: Delete a product by its ID

### Tags

- `GET /api/tags`: Retrieve all tags
- `GET /api/tags/:id`: Retrieve a tag by its ID
- `POST /api/tags`: Create a new tag
- `PUT /api/tags/:id`: Update a tag by its ID
- `DELETE /api/tags/:id`: Delete a tag by its ID

## Contributing

Feel free to fork the repository and submit pull requests with any improvements or bug fixes. Please follow the existing code style and add comments where necessary.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information
