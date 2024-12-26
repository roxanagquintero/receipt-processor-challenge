# **Receipt Processor Challenge**

## **Description**

This project is an implementation of the **Receipt Processor Challenge**, designed to process receipt data and calculate points based on predefined rules. The system includes:

- A REST API for processing receipts and retrieving calculated points.
- MongoDB for persistent data storage.
- Swagger documentation for exploring and testing endpoints.

Optional enhancements, including MongoDB and Swagger, have been added for testing purposes.

---

## **Features**

- Process and store receipts in MongoDB.
- Retrieve calculated points for a receipt by its ID.
- API documentation with Swagger for seamless exploration and testing.

---

## **Quick Start**

### **With Docker**

No need to install Node.js or MongoDB manually. Use Docker to quickly set up the application and its dependencies.

1. **Build the Docker Image**:

   ```bash
   docker-compose build
   ```

2. **Start the Application**:

   ```bash
   docker-compose up
   ```

3. **Access the Application**:

   - API: `http://localhost:4000`
   - Swagger UI: `http://localhost:4000/api-docs`

4. **Stop the Containers**:
   ```bash
   docker-compose down
   ```

---

### **Without Docker**

If you prefer to run the project manually:

1. **Prerequisites**:

   - Install Node.js and npm.
   - Set up a MongoDB instance (local or cloud).

2. **Clone the Repository**:

   ```bash
   git clone https://github.com/roxanagquintero/receipt-processor-challenge.git
   cd receipt-processor-challenge
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Start the Application**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:
   - API: `http://localhost:4000`
   - Swagger UI: `http://localhost:4000/api-docs`

---

## **Endpoints**

### **1. Process a Receipt**

**Endpoint**: `POST /receipts/process`

**Description**: Submits a receipt for processing and returns a unique receipt ID.

**Request Body**:

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
    { "shortDescription": "Emils Cheese Pizza", "price": "12.25" }
  ],
  "total": "35.35"
}
```

**Response**:

```json
{ "id": "64a12345b67890c123456def" }
```

---

### **2. Get Points for a Receipt**

**Endpoint**: `GET /receipts/{id}/points`

**Description**: Retrieves the points awarded for a specific receipt by its ID.

**Response**:

- **Success**:
  ```json
  { "points": 101 }
  ```
- **Not Found**:
  ```json
  { "error": "Receipt not found" }
  ```

---

## **API Documentation**

Swagger UI is available for exploring and testing the API.

**Access Swagger UI**:

```url
http://localhost:4000/api-docs
```

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **API Documentation**: Swagger (via `swagger-jsdoc` and `swagger-ui-express`)
- **Environment Management**: dotenv
- **Containerization**: Docker and Docker Compose

---

## **Testing the API**

Use Swagger UI or Postman to test the endpoints.

---

## **Optional Enhancements**

- **MongoDB Integration**: Receipts are stored in a MongoDB database for persistent handling.
- **Swagger Documentation**: Added for interactive API testing and exploration.

---
