# DentivaCare

Dentiva Care is an application designed for storing, managing, and monitoring patients within an odontological clinic. This repository contains the frontend interface where users interact with the system.

For further details on the problem scope, refer to [this Google Docs document](https://docs.google.com/document/d/1LAH34UK6-TpweXkyZxZZGVZN_WqXxlU7yO2jd6XJYR0/edit?usp=sharing).

This project was initiated using [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Development Server

To run the project locally:

1. Ensure you have Node.js (18 or higher) and Angular/CLI (16 or higher) installed.
2. Clone the repository to your local machine by executing the following command in your desired directory:

```bash
git clone https://github.com/7Rena7/dentiva-care.git
```

3. Install the required npm packages:

```bash
npm install
```

4. Ensure the environment.ts file is appropriately configured to communicate with either the deployed server or your local server.
```javascript
// DEVELOPMENT API
export const baseUrl = 'http://localhost:8080/api';

// PRODUCTION API
export const baseUrl = 'https://dentiva-care-api-c9a35adf00ce.herokuapp.com/api';
```

5. Serve the application using:

```bash
ng serve -o
```
