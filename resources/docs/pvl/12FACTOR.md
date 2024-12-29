# 12-Factor Principles for our project

### 1. Codebase
* Application: Middleware services (backend, frontend, db) share a single codebase for each respective service, tracked in version control (e.g., Git).
* Implementation: Each service (backend, frontend) has a context pointing to its local codebase, ensuring consistency across environments.

### 2. Dependencies
* Application: All dependencies for backend (e.g., Python requirements) and frontend (e.g., React.js packages) are explicitly declared.
* Implementation: Dependencies are installed during container runtime via commands (pip install, npm install), ensuring isolation within the containers.

### 3. Config
* Application: Configuration is externalized and stored in environment variables, enabling environment-specific customization.
* Implementation:
    - `VITE_API_BASE_URL` in the frontend ensures environment-specific API endpoints for CORS (Cross Origin).

### 4. Backing Services
* Application: Middleware treats the database (postgres-db) as a replaceable, attached resource. The backend connects using a connection string.
* Implementation: The db service is a Docker container running PostgreSQL, and all services interact with it using environment variables.

### 5. Build, Release, Run
* Application: The build stage is defined via Docker images and/or local contexts. Configuration is provided at runtime using environment variables.
* Implementation:
    - The backend uses the `41kusa1mst/jan-sanjay-backend` docker image for a consistent build artifact.
    - The frontend uses `41kusa1mst/jan-sanjay-frontend` docker image to ensure consistent builds across environments.

### 6. Processes
* Application: Middleware is designed as stateless processes, with externalized state handled by the db service.
* Implementation: The backend and frontend services are stateless and restartable. Persistent data is stored in the db_data volume for the database.

### 7. Port Binding
* Application: Each service binds to a specific port for communication.
* Implementation:
    - backend binds to port `8000`.
    - frontend binds to port `5173`.
    - db binds to port `5432`.

### 8. Concurrency
* Application: Middleware allows horizontal scaling by running multiple instances of services when required.
* Implementation: Docker Compose can be extended to scale services (docker-compose up --scale backend=3) to handle increased load.

### 9. Disposability
* Application: Middleware services are designed to start quickly and shut down gracefully.
* Implementation:
    - Containers start using lightweight docker images uploaded on Docker hub.
    - Database migrations and application tasks are handled via the backend startup commands.

### 10. Dev/Prod Parity
* Application: Development, staging, and production environments are as similar as possible.
* Implementation: Docker Compose provides consistent local environments, and production services can replicate this setup using orchestration tools like Kubernetes.

### 11. Logs
* Application: Middleware services write logs to stdout and stderr, allowing centralized log aggregation.
* Implementation: Each service outputs its logs, which can be collected using tools like ELK or cloud logging solutions.

### 12. Admin Processes
* Application: One-off admin tasks, such as database migrations or data seeding, can be run independently.
* Implementation: Database migrations (python manage.py migrate) are included in the backend startup commands. Ad-hoc tasks can be executed using docker exec.