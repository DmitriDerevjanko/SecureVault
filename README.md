SecureVault
SecureVault is a secure and user-friendly password management application designed to help users store, manage, and protect their passwords with ease. The application features a robust backend built with ASP.NET Core and a dynamic frontend developed using Vue.js. It ensures data security through JWT-based authentication, AES-GCM encryption, and integrates seamlessly with Docker for containerization and GitLab CI/CD for automated deployments.

Table of Contents
Overview
Technologies
Features
Requirements
Installation
Backend
Frontend
Configuration
Backend Configuration
Frontend Configuration
Running the Application
Development
Production
Deployment
Usage
Project Structure
Contributing
License
Contact
Overview
SecureVault provides users with a secure platform to manage their passwords efficiently. Key features include:

User Authentication: Secure registration and login using JWT tokens.
Role Management: Supports Administrator and User roles.
Password Management: CRUD operations for passwords with AES-GCM encryption.
Frontend Interface: Intuitive and responsive UI built with Vue.js.
Containerization: Dockerized applications for easy deployment.
CI/CD Pipeline: Automated builds and deployments using GitLab CI/CD.
Technologies
Backend
Language: C#
Framework: ASP.NET Core
Database: PostgreSQL
Authentication: JWT (JSON Web Tokens)
Encryption: AES-GCM
ORM: Entity Framework Core
Logging: ILogger
Containerization: Docker
Frontend
Language: TypeScript
Framework: Vue.js 3
State Management: Pinia
UI Libraries: PrimeVue, WindiCSS
Encryption: Web Crypto API
Containerization: Docker, Nginx
DevOps
CI/CD: GitLab CI/CD
Container Registry: AWS ECR
Web Server: Nginx
Version Control: Git
Features
User Registration & Authentication: Secure user signup and login with role-based access.
Password CRUD Operations: Create, read, update, and delete passwords securely.
Encryption: All sensitive data is encrypted using AES-GCM.
Password Generator: Generate strong passwords with customizable parameters.
Password Strength Checker: Assess the strength of passwords in real-time.
Auto-Fill Functionality: Automatically fill login forms on supported websites.
Role Management: Differentiate access levels between administrators and regular users.
Responsive UI: Accessible on various devices with a modern interface.
Automated Deployments: Streamlined deployment process with Docker and GitLab CI/CD.
Requirements
Docker: For containerizing backend and frontend applications.
Node.js & npm/pnpm: For managing frontend dependencies.
.NET SDK: For building and running the backend.
PostgreSQL: For the application's database.
AWS Account: For hosting Docker images in ECR (Elastic Container Registry).
Installation
Backend
Clone the Repository:

git clone https://github.com/yourusername/securevault.git
cd securevault/Backend
Configure Environment Variables:

Create an appsettings.json file based on the appsettings.example.json and populate it with your configurations, including the PostgreSQL connection string and JWT secrets.

Build and Run with Docker:


docker build -t securevault-backend .
docker run -d -p 7150:80 --name securevault-backend securevault-backend
Frontend
Navigate to the Frontend Directory:


cd ../Frontend
Install Dependencies:


npm install
# or
pnpm install
Build and Run with Docker:


docker build -t securevault-frontend .
docker run -d -p 80:80 --name securevault-frontend securevault-frontend
Configuration
Backend Configuration
The appsettings.json file contains essential configurations:

json
Copy code
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
Frontend Configuration
The runtime-config.json file should be located in the public/config/ directory and contain the API URL:

json
Copy code
{
  "API_URL": "https://localhost:7150/api/"
}
Running the Application
Development
Backend
Navigate to Backend Directory:


cd Backend
Apply Migrations and Run the Application:


dotnet ef database update
dotnet run
Frontend
Navigate to Frontend Directory:


cd Frontend
Run the Development Server:


npm run dev
# or
pnpm run dev
Production
The application is containerized for production environments. Use Docker Compose or separate docker build and docker run commands to deploy the containers.

Deployment
Deployment is automated using GitLab CI/CD with the following stages:

Build Backend and Frontend:

Utilizes docker:24.0.7-alpine3.18 images.
Builds Docker images for both backend and frontend.
Pushes images to AWS ECR.
Deploy:

Manual deployment stage.
Connects to the server via SSH.
Updates Docker Compose on the server and starts the containers.
GitLab CI/CD Configuration
The .gitlab-ci.yml file includes stages for building and deploying the application. Ensure that the following environment variables are set in GitLab:

DOCKER_REGISTRY
DOMAIN
SSH_PRIVATE_KEY
Usage
User Registration:

Navigate to the registration page.
Enter your Email, Username, and Password.
Save the generated Master Key securely as it is required for decrypting your passwords.
Login:

Enter your Username and Password.
Provide the Master Key to access your stored passwords.
Password Management:

Add Password: Create new password entries with login details and purpose.
Edit Password: Modify existing password entries.
Delete Password: Remove unwanted password entries.
Filter & Sort: Use filters and sorting options to manage your passwords efficiently.
Additional Features:

Password Generator: Generate strong passwords based on customizable criteria.
Password Strength Checker: Assess the strength of your passwords in real-time.
Auto-Fill Forms: Automatically fill login forms on supported websites like YouTube and Google.