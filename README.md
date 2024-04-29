# Flytbase Backend Assignment

## Functionality

This backend application provides the following functionality:

- A server to manage user, drone, mission, and site data.
- User Authentication:
  - Users can log in to the service to fetch their relevant information.
  - JWT (JSON Web Token) for authentication.
  - Bcrypt for password encryption.
- Site Management:
  - Users can add/update/delete sites in their account.
- Drone Management:
  - Users can add/update/delete drones under a site.
- Mission Management:
  - Users can add/update/delete missions under a site.
- Retrieval of Data:
  - Ability to retrieve all missions belonging to a particular site.
  - Ability to retrieve all drones belonging to a particular site.
  - Ability to request the server to retrieve all missions belonging to a particular category.
  - Ability to request the server to retrieve all drones belonging to a particular category.
- Middleware:
  - Middleware for handling authentication and authorization.
- Shifting Drones:
  - Users can shift drones from one site to another.

## Tech Stack

- Backend: Node.js and Express.js
- Database: MongoDB

