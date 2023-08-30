# Tracking project with prebid.js

## Structure

Inside project you can see several applications:

-   [Website Service](#website-service)
-   [Tracking Service](#tracking-service)
-   [API Service (Python application with PostgreSQL)](#api-service)
-   [Dashboard retrive data from API and display list of events](#dashboard-service).
-   [Docker compose to make life easier](#docker-compose)

## Website Service

Incorporating advanced technologies and strategies, the project focuses on efficiently tracking user interactions on a sophisticated website. The website Service, developed using React TypeScript, has been seamlessly integrated with both Prebid and Google Ad Manager, elevating its advertising management capabilities. To comprehensively monitor and analyze user behaviors, a dynamic script has been introduced. This script seamlessly integrates into the website's codebase and enables robust tracking functionalities.

### Usage

Go to service folder do `npm install` and after that you can start project with command `npm run start`.
<br/>
Go to `localhost:3000`.

#### Stack

-   React
-   Typescript

## Tracking Service

The user interaction tracking script, ingeniously embedded within the website's structure, is a testament to the project's innovation. This script facilitates the seamless incorporation of the tracking service, enabling a comprehensive view of user activities. Its implementation is swift and smooth:

```
<script>
    (function (d, s, r) {
        var js = d.createElement(s),
            sc = d.getElementsByTagName(s)[0];

        js.src = "http://localhost:4010/script.js";
        js.setAttribute('data-banners', r);
        js.defer = true;
        sc.parentNode.insertBefore(js, sc);
    }(document, "script", ['ad-slot-header', 'ad-slot-footer', 'ad-slot-sidebar']));
</script>
```

Where `['ad-slot-header', 'ad-slot-footer', 'ad-slot-sidebar']` is example of ids that need to be track(click, view)

Through this script, the project achieves a seamless connection to the Tracking Service, hosted at `http://localhost:4010`. Here, the Tracking Service leverages an advanced JavaScript script located at `TrackingService/public/script.js`. This JavaScript marvel is designed to intricately monitor user interactions, such as clicks, scrolls, and more, providing invaluable insights into user behavior.

Event unit:

```
{
  sessionId:String,
  url: String,
  kind: 'view' | 'click',
  target_id: String,
  target_class: 'event' | 'page',
  meta:String;
  domain: String,
}
```

### Usage

Need to create in a root of the service `.env` file in a root of the service with that parameter `API=http://0.0.0.0:8001/`.
<br/>
Go to service folder do `npm install` and after that you can start project with command `npm run start`.

#### Stack

-   NodeJs
-   ExpressJS
-   Javascript

## REST API

The core functionality of the Tracking Service transcends mere tracking. It ingeniously processes and packages the collected user interaction data. Leveraging a meticulously crafted internal REST API endpoint (http://localhost:4010/tracker), the Tracking Service diligently compiles the data and converts it into a streamlined format. This data is then securely transmitted to ApiService(read more about project you can check specific [/Api/Service/README.md](readme) ) where will be store inside PostgreSQL database, which serves as the repository for all captured events.

### Setup

Go to service folder do:

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

#### Stack

-   Python
-   PostgreSQL

## Dashboard Service

The project's commitment to empowering informed decision-making is epitomized by its data visualization component - the Dashboard. Pulling data directly from the REST API, the Dashboard showcases its prowess in transforming raw data into insightful visualizations. Presently, the Dashboard primarily features a list of events, providing stakeholders with an initial glimpse into user behaviors.

### Usage

Need to create in a root of the service `.env` file in a root of the service with that parameter `API=http://0.0.0.0:8001/`.
<br/>
Go to service folder do `npm install` and after that you can start project with command `npm run start`.
<br/>
Go to `localhost:3001`

#### Stack

-   React
-   Typescript

## Docker Compose

### Usage

#### Prerequisites:

Make sure you have Docker and Docker Compose installed on your system.

#### Directory Structure:

Ensure that the directory structure matches what's described in the Docker Compose file. You should have subdirectories for each service (e.g., WebsiteService, DashboardService, TrackingService, ApiService), each containing their respective source code and Dockerfiles.

#### Configuration File:

Save the provided Docker Compose configuration in a file named docker-compose.yml in the root directory of your project.

#### Run the Application:

Open a terminal/command prompt.
Navigate to the directory where the docker-compose.yml file is located.

#### Build and Start:

Run the following command to build and start the application services:

```
docker-compose up --build
```

Docker Compose will start building the required Docker images based on the provided Dockerfiles and then start the defined services.

#### Access Services:

After the services have started, you can access the application components:
Frontend: Open your web browser and navigate to http://localhost:3000.
Dashboard: Open your web browser and navigate to http://localhost:3001.
Event Tracking: The event tracking service might not have a user interface, but it should be accessible within the application.

#### Stopping the Application:

When you're done using the application, you can stop the services by pressing Ctrl+C in the terminal where you started the docker-compose up command.

#### Cleanup:

To remove the stopped containers and associated resources, run the following command:

```
docker-compose down

```

## Backlog

-   Make Dashboard more rich
-   Configure Google Ad manager
-   Add more events to track
-   Cover tests

## Releases

-   1.0.0 Initial Realese
