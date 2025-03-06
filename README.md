# Appointment API

This project provides a simple appointment scheduling API built with TypeScript and runs on `http://localhost:3000/appointments`.

## Build and Run

- Run `npm run build` to compile the TypeScript code.
- Run `npm run serve` to start the API server.

## Endpoints

- **POST /appointments:** Creates a new appointment.
- **GET /appointments:** Retrieves all stored appointments.

## Appointment API Data Structure

This JSON payload is used for creating a new appointment via the POST `/appointments` endpoint. It consists of the following parts:

- **customer:** An object containing the customer's details:
  - `firstName`: Customer's first name.
  - `lastName`: Customer's last name.
  - `phone`: Customer's phone number.
  - `email`: Customer's email address.
- **appointmentDateTime:** A string in ISO 8601 format representing the date and time of the appointment.
- **location:** An object with the appointment location details:
  - `line1`: First line of the street address.
  - `line2`: Second line of the street address (optional).
  - `city`: City name.
  - `state`: State abbreviation.
  - `zipCode`: Postal code.
- **vehicle:** An object with vehicle information:
  - `vin`: The Vehicle Identification Number.
- **appointmentDuration:** A number representing the duration of the appointment in minutes.

## Testing with Postman

To test the API endpoints, we recommend using Postman:

1. **POST /appointments:**  
   Set up a POST request to `http://localhost:3000/appointments` with a JSON payload that follows the data structure described above.

2. **GET /appointments:**  
   Set up a GET request to `http://localhost:3000/appointments` to retrieve all appointments.

Using Postman will help you verify that the API accepts the payload correctly and that both endpoints function as expected.