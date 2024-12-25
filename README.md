# **Receipt Processor Challenge**

This is an implementation of the **Receipt Processor Challenge**, a project created to process receipt data and calculate points based on specific rules. The project includes a REST API with endpoints to process receipts and fetch calculated points. Swagger documentation and MongoDB were implemented as optional enhancements to demonstrate project extensibility and best practices.

---

## **Features**

- Process receipts and store them in a database (MongoDB used as the database).
- Fetch calculated points for a receipt by its ID.
- Swagger documentation for easy API exploration and testing.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **API Documentation**: Swagger (via `swagger-jsdoc` and `swagger-ui-express`)
- **Environment Management**: dotenv

---

## **Endpoints**

### **1. Process a Receipt**

**Endpoint**: `POST /receipts/process`

**Description**: Submits a receipt for processing and returns a generated ID for the receipt.

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

**Description**: Fetches the points awarded for a specific receipt by its ID.

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

## **Setup Instructions**

### **Prerequisites**

- Node.js and npm installed on your system.
- MongoDB Atlas or a local MongoDB instance (optional if you choose not to use a database).

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/roxanagquintero/receipt-processor-challenge.git
   cd receipt-processor-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

---

## **Swagger Documentation**

The project includes Swagger documentation for exploring and testing the API endpoints.

**Access the Swagger UI**:

```url
http://localhost:4000/api-docs
```

---

## **Optional Enhancements**

The following features were implemented as optional enhancements for the challenge:

- **MongoDB Integration**: MongoDB was used to store and retrieve receipts for persistent data handling.
- **Swagger Documentation**: Swagger UI was added to simplify API exploration and provide an interactive way to test endpoints.

---

## **Testing the API**

1. Use **Swagger UI** to test the API directly in your browser.
2. Use tools like **Postman** or **curl** to send requests to the endpoints.

### Example Commands:

**Processing a Receipt**:

```bash
curl -X POST http://localhost:4000/receipts/process \
-H "Content-Type: application/json" \
-d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
    { "shortDescription": "Emils Cheese Pizza", "price": "12.25" }
  ],
  "total": "35.35"
}'
```

**Fetching Points**:

```bash
curl http://localhost:4000/receipts/64a12345b67890c123456def/points
```

---

If you have any questions or issues, feel free to contact me. Thank you for reviewing this project!
