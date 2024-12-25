import { Request, Response } from 'express';
import { Receipt } from '../models/receiptModel';
import { CalculatePoints } from './calculatePoints';

class ReceiptsController {
  /**
   * Processes a JSON receipt and returns a JSON object with a generated ID.
   *
   * Takes in a JSON receipt (see example in the example directory),
   * sends it to the backend for processing, and returns an object with an ID.
   *
   * Example response:
   * {
   *   "id": "676c1f91ed8928616e21c838"
   * }
   *
   * @param {Request} req - The HTTP request object containing the receipt in the body.
   * @returns {Response} res - The HTTP response object used to send the generated ID back to the client.
   */
  processReceipts(req: Request, res: Response) {
    const receiptData = req.body;
    //create new receipt
    const receipt = new Receipt(receiptData);
    //Save receipt on MongoDB 'receipts' collection
    receipt
      .save()
      .then((savedReceipt) => {
        // Respond with the MongoDB-generated ID
        res.status(200).json({ id: savedReceipt._id });
      })
      .catch((error) => {
        console.error('Error saving receipt:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
  /**
   * Looks up the receipt by ID and returns a JSON object specifying the points awarded.
   *
   * Takes a JSON object containing the receipt ID, fetches the receipt details,
   * calculates the points awarded, and returns the points.
   *
   * Example response:
   * {
   *   "points": 32
   * }
   *
   * @param {Request} req - The HTTP request object containing the receipt ID in the body.
   * @returns {Response} res - The HTTP response object used to send the points awarded back to the client.
   */
  async getPoints(req: Request, res: Response) {
    try {
      const receiptID = req.params.id;
      console.log('receiptID', receiptID);
      // Fetch the receipt from the MongoDB 'receipts' collection
      Receipt.findById(receiptID)
        .then((receipt) => {
          console.log('receipt', receipt);
          // Check if the receipt exists
          if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
          }

          // Calculate the points based on the receipt attributes
          const points = 101; //CalculatePoints(receipt);

          // Respond with the points
          res.status(200).json({ points: points });
        })
        .catch((error) => {
          console.error('Error fetching receipt:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    } catch (error) {
      // Catch block for synchronous errors
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
module.exports = ReceiptsController;
