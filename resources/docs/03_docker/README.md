# <img src="../../images/docker-icon.png" width=30> 3. Docker setup

## ✨ 1. Manual Testing

Before you work on Docker setup, make sure the application runs manually!

### 1.1 Run the backend server (Terminal 1)

```bash
$ python manage.py runserver # are you on the backend folder ?
```

### 1.2 Run the frontend server (Terminal 2)

```bash
$ npm run dev # are you on the frontend folder ?
```

### 1.3 Test

* The application should open on port `5173`
* Make the `8000` port public and test the application

## ✨ 2. Docker Setup

### 2.1 `backend/Dockerfile`

```docker
# Use the official Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev && \
    apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### 2.2 `frontend/Dockerfile`

```Dockerfile
# Use the Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the application
RUN npm run build

# Expose the port for the Vite dev server
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev", "--", "--host"]
```

### 2.3 `composed_app/docker-compose.yml`

```yml
services:
  backend:
    build:
      context: ../backend
    container_name: django-backend
    ports:
      - "8000:8000"
    volumes:
      - ../backend:/app
    depends_on:
      - db

  frontend:
    build:
      context: ../frontend
    container_name: react-frontend
    ports:
      - "5173:5173"
    volumes:
      - ../frontend:/app
    depends_on:
      - backend
    environment:
      - VITE_API_BASE_URL=<<PUT YOUR GITHUB CODESPACE ID HERE>>

  db:
    image: postgres:15-alpine
    container_name: postgres-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: anime_db
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### 2.4 Testing

```bash
$ docker-compose up --build # first time, else docker-compose up
$ docker-compose down # OPTIONAL, if there are any issues, stop the containers
§ docker system prune # OPTIONAL, caution, this removes all the dangling containers and images, use this only as a last resort
```