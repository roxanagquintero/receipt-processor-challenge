const router = require('express').Router();
// const { ReceiptsController } = require('../controller/receiptsController');
const ReceiptsController = require('../controller/receiptsController');
const receiptsController = new ReceiptsController();

/**
 * @swagger
 * /receipts/process:
 *   post:
 *     summary: Submits a receipt for processing.
 *     description: Submits a receipt for processing and returns an ID for the receipt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Receipt processed successfully, returning the receipt ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "adb6b560-0eef-42bc-9d16-df48f30e89b2"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.route('/process').post((req: Request, res: Response) => {
  receiptsController.processReceipts(req, res);
});

/**
 * @swagger
 * /receipts/{id}/points:
 *   get:
 *     summary: Returns the points awarded for the receipt.
 *     description: Fetches the receipt points using the receipt ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the receipt.
 *         schema:
 *           type: string
 *           example: "676c1f91ed8928616e21c838"
 *     responses:
 *       200:
 *         description: Points successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointsResponse'
 *       404:
 *         description: No receipt found for that ID.
 *       500:
 *         description: Internal server error.
 */
router.route('/:id/points').get((req: Request, res: Response) => {
  console.log(`Received request for ID: ${req}`);
  receiptsController.getPoints(req, res);
});

export { router as receiptsRouter };
