This README file provides an overview of a FastAPI application that interacts with a PostgreSQL database to manage events data. The application allows for creating, retrieving, and managing event records in the database. It also includes CORS middleware to handle cross-origin requests. Let's break down the contents of the `readme.md` file:

## FastAPI Event Management Application

This is a FastAPI application designed to manage event data using a PostgreSQL database. The application provides various endpoints to interact with the database, including creating new events, retrieving events, and getting event-related metrics.

### Setup

1. Install the required packages using the following command:
    ```
    pip install -r requirements.txt
    ```
2. Set up your PostgreSQL database and configure the necessary environment variables in a `.env` file.

### Configuration

Ensure you have the following environment variables configured in the `.env` file:

-   `POSTGRES_USER`: PostgreSQL username.
-   `POSTGRES_PASSWORD`: PostgreSQL password.
-   `POSTGRES_SERVER`: PostgreSQL server hostname (default is "localhost").
-   `POSTGRES_PORT`: PostgreSQL server port (default is 5432).
-   `POSTGRES_DB`: PostgreSQL database name (default is "tdd").

### Running the Application

To run the application, execute the following command in your terminal:

```
python main.py
```

The FastAPI application will start, and you can access the API at `http://0.0.0.0:8000`.

### Endpoints

1. **GET /get-domains**

    Retrieves a list of domains from the database.

2. **GET /domain-metrics/**

    Retrieves event data for a specific domain.

3. **GET /metrics-all**

    Retrieves all event data from the database.

4. **POST /events**

    Creates a new event record in the database. Requires a JSON payload with event details.

### Database Initialization

The application automatically creates the required database table named "events" on startup if it doesn't already exist. The table schema includes the following columns:

-   `event_id`: Auto-incrementing event ID (Primary Key).
-   `kind`: Event kind.
-   `session_id`: Session ID associated with the event.
-   `target_id`: Target ID of the event.
-   `target_class`: Target class of the event.
-   `meta`: Event metadata.
-   `url`: URL associated with the event.
-   `created_on`: Timestamp of when the event was created.
-   `domain`: Domain associated with the event.

### CORS Configuration

Cross-Origin Resource Sharing (CORS) is enabled for all origins to allow cross-domain requests to the API.

### Error Handling

In case of errors during API requests or database interactions, appropriate HTTP error responses are provided.

For any questions or issues, feel free to contact the maintainers of this repository.

---

**Note:** This README provides an overview of the FastAPI application. For the latest and most accurate instructions, please refer to the code and documentation directly.
