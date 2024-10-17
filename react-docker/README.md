# Takijunchik App

## Project Overview

Takijunchik is a language learning application that utilizes Firebase for data storage and retrieval. The project is transitioning from a backend-heavy architecture to a more frontend-focused approach using Firebase.

## Setup and Installation

### Prerequisites

- Docker
- Node.js # using nvm 20
- npm

### Building and Running with Docker

1. Build the Docker image:
   ```
   docker compose build
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 takijunchik-app ???
   ```

3. Access the application:
   Open your web browser and navigate to `http://localhost:8080`

## Development Notes

### Firebase Integration

- The application now primarily uses Firebase for data storage and retrieval.
- Firebase integration is handled directly in the frontend, reducing the need for a complex backend.

### Legacy Backend

While transitioning to a Firebase-centric architecture, some backend components still exist. The following seed will initialize the firebase if its not yet.

1. Start the Node.js server:
   ```
   cd nodejs-docker
   node index.js
   ```

2. Seed Firebase database (if needed):
   ```
   cd nodejs-docker/middleware
   node firebase_data_seeder.js
   ```

### Project Goals

1. Migrate fully to Firebase for data management.
2. Simplify the backend structure.
3. Remove or repurpose MariaDB components.
4. Organize and streamline the project structure.

### Known Issues

- Some legacy code and database migrations may still be present and need to be cleaned up.
- The project structure is in transition and may need further organization.

