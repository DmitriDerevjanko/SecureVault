# SecureVault

**SecureVault** is a secure and user-friendly password management application designed to help users store, manage, and protect their passwords with ease. It features a robust ASP.NET Core backend, a Vue.js frontend, and leverages JWT tokens for authentication and AES-GCM for encrypting sensitive data. With Docker containerization and GitLab CI/CD, SecureVault is easy to deploy and maintain.

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Requirements](#requirements)
5. [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
6. [Configuration](#configuration)
    - [Backend Configuration](#backend-configuration)
    - [Frontend Configuration](#frontend-configuration)
7. [Running the Application](#running-the-application)
    - [Development](#development)
    - [Production](#production)
8. [Deployment](#deployment)
9. [Usage](#usage)
10. [Contributing](#contributing)
11. [License](#license)
12. [Contact](#contact)

---

## Overview

SecureVault provides a secure platform for managing passwords. Key capabilities include:

- **User Authentication:** Secure registration and login with JWT.
- **Role Management:** Supports Administrator and User roles.
- **Password Management:** CRUD operations on passwords with AES-GCM encryption.
- **Modern UI:** Responsive and intuitive frontend built with Vue.js.
- **Containerization:** Dockerized applications for simpler deployments.
- **CI/CD:** Automated building and deploying via GitLab CI/CD.

---

## Technologies

### Backend:

- **Language:** C#
- **Framework:** ASP.NET Core
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Encryption:** AES-GCM
- **ORM:** Entity Framework Core
- **Logging:** ILogger
- **Containerization:** Docker

### Frontend:

- **Language:** TypeScript
- **Framework:** Vue.js 3
- **State Management:** Pinia
- **UI Libraries:** PrimeVue, WindiCSS
- **Encryption:** Web Crypto API
- **Containerization:** Docker, Nginx

### DevOps:

- **CI/CD:** GitLab CI/CD
- **Container Registry:** AWS ECR
- **Web Server:** Nginx
- **Version Control:** Git

---

## Features

- **User Registration & Authentication:** Secure sign-up and login.
- **Password CRUD Operations:** Create, read, update, and delete encrypted passwords.
- **Encryption:** All sensitive data secured by AES-GCM.
- **Password Generator:** Generate strong passwords with customizable criteria.
- **Strength Checker:** Assess password strength in real-time.
- **Auto-Fill Forms:** Automatically fill login forms on supported websites.
- **Role Management:** Differentiate access between admins and regular users.
- **Responsive UI:** Accessible on desktops, tablets, and mobile devices.
- **Automated Deployments:** Build and deploy via GitLab CI/CD.

---

## Requirements

- **Docker:** For running backend and frontend containers.
- **Node.js & npm/pnpm:** For frontend dependencies and builds.
- **.NET SDK:** For building and running the backend.
- **PostgreSQL:** Application database.
- **AWS Account (optional):** For hosting Docker images in ECR.

---

## Installation

### Backend

1. Clone the Repository:

    ```bash
    git clone https://github.com/yourusername/securevault.git
    cd securevault/Backend
    ```

2. Configure Environment Variables:

    Create an `appsettings.json` file based on `appsettings.example.json` and set up your PostgreSQL connection string and JWT secrets.

3. Build and Run with Docker:

    ```bash
    docker build -t securevault-backend .
    docker run -d -p 7150:80 --name securevault-backend securevault-backend
    ```

### Frontend

1. Navigate to the Frontend Directory:

    ```bash
    cd ../Frontend
    ```

2. Install Dependencies:

    ```bash
    npm install
    ```
    or
    ```bash
    pnpm install
    ```

3. Build and Run with Docker:

    ```bash
    docker build -t securevault-frontend .
    docker run -d -p 80:80 --name securevault-frontend securevault-frontend
    ```

---

## Configuration

### Backend Configuration

Create or edit `appsettings.json` in the Backend directory:

```json
{
  "ConnectionStrings": {
    "default": "Host=localhost;Database=securevault;Username=yourusername;Password=yourpassword"
  },
  "JWT": {
    "Secret": "YourSuperSecretKeyHere",
    "ValidIssuer": "https://localhost",
    "ValidAudience": "https://localhost"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

### Frontend Configuration

Place a `runtime-config.json` in `public/config/`:

```json
{
  "API_URL": "https://localhost:7150/api/"
}
```

---

## Running the Application

### Development

#### Backend:

```bash
cd Backend
dotnet ef database update
dotnet run
```

#### Frontend:

```bash
cd Frontend
npm run dev
# or
pnpm run dev
```

### Production

Use Docker Compose or separate Docker build and run commands to start the production containers.

---

## Deployment

Deployment is automated via GitLab CI/CD with the following stages:

- **Build:** Builds Docker images for backend and frontend and pushes them to ECR.
- **Deploy (Manual Stage):** Connects to the server over SSH, updates docker-compose configuration, and starts containers.

Ensure the following environment variables are set in GitLab:

- `DOCKER_REGISTRY`
- `DOMAIN`
- `SSH_PRIVATE_KEY`

---

## Usage

- **User Registration:**
  - Go to the registration page and enter Email, Username, and Password.
  - Store the generated Master Key securely, as it is required to decrypt passwords.

- **Login:**
  - Enter your Username, Password, and Master Key.

- **Password Management:**
  - Add Passwords: Create new password entries.
  - Edit Passwords: Modify existing entries.
  - Delete Passwords: Remove unnecessary passwords.
  - Filter & Sort: Manage your passwords efficiently.

- **Additional Features:**
  - Password Generator: Quickly create strong passwords.
  - Strength Checker: Evaluate password strength instantly.
  - Auto-Fill Forms: Automatically fill login details on supported sites (e.g., YouTube, Google).

