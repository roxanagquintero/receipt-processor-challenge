import { isWithinInterval, parse } from 'date-fns';
import { Receipt } from '../models/receiptModel';

/**
 * Calculates the total points based on various receipt criteria.
 *
 * This function evaluates a receipt against multiple criteria, such as:
 * - Number of alphanumeric characters in the retailer name.
 * - Whether the total is a round dollar amount or a multiple of 0.25.
 * - Number of item pairs on the receipt.
 * - Whether the purchase day is odd.
 * - Whether the purchase time is between 2:00pm and 4:00pm.
 * - Points based on individual item descriptions.
 *
 * @param {Receipt} receipt - The receipt object containing details such as retailer name, items, total, purchase date, and time.
 * @returns {number} - The total calculated points for the receipt.
 */
export function CalculatePoints(receipt: Receipt) {
  let points: number = 0;

  points =
    getPointsByItemPairs(receipt.items) +
    getPointsOddDay(receipt.purchaseDate) +
    getPointsRoundDollarAmount(receipt.total) +
    getPointsAlphaNumeric(receipt.retailer) +
    getPointsForTime(receipt.purchaseTime) +
    getPointsTotalMultiple25(receipt.total) +
    getPointsByIndividualItemMultipleOf3(receipt.retailer, receipt.items);
  console.log('CalculatePoints final val', points);
  return points;
}

/**
 * Calculates points based on the alphanumeric characters in the retailer name.
 *
 * Awards one point for every alphanumeric character in the retailer name.
 *
 * @param {string} retailer - The name of the retailer.
 * @returns {number} - The total points awarded based on the number of alphanumeric characters.
 */
function getPointsAlphaNumeric(retailer: any) {
  //makes sense, understand .test()
  const alphanumericChars = retailer
    .split('')
    .filter((c: any) => /^[A-Za-z0-9]$/.test(c));
  const count = alphanumericChars.length;
  console.log('getPointsAlphaNumeric--->', count);
  if (count > 0) {
    //1 Non-alphanumeric character = 1 point
    return count;
  } else {
    return 0;
  }
}

/**
 * Awards points if the total is a round dollar amount with no cents.
 *
 * Awards 50 points if the total is an integer (e.g., no fractional cents).
 *
 * @param {number} total - The total price to evaluate.
 * @returns {number} - 50 points if the total is a round dollar amount, otherwise 0.
 */
function getPointsRoundDollarAmount(total: any) {
  //need to test
  if (Number.isInteger(total)) {
    //round dollar amount = 50 points
    console.log('getPointsRoundDollarAmount--->', 50);
    return 50;
  } else {
    console.log('getPointsRoundDollarAmount--->', 0);
    return 0;
  }
}

/**
 * Awards points if the total is a multiple of 0.25.
 *
 * Awards 25 points if the total price is divisible by 0.25 without a remainder.
 *
 * @param {number} totalPrice - The total price to evaluate.
 * @returns {number} - 25 points if the total is a multiple of 0.25, otherwise 0.
 */
function getPointsTotalMultiple25(totalPrice: number): number {
  if (totalPrice % 0.25 === 0) {
    console.log('getPointsTotalMultiple25--->', 25);
    return 25; // Return 25 points
  }
  console.log('getPointsTotalMultiple25--->', 0);
  return 0; // Return 0 points otherwise
}

/**
 * Awards points for every pair of items on the receipt.
 *
 * Awards 5 points for every two items on the receipt.
 *
 * @param {Array<any>} items - The list of items on the receipt.
 * @returns {number} - Total points based on the number of item pairs.
 */
function getPointsByItemPairs(items: Array<any>) {
  if (items.length > 1) {
    //2 pairs @ 5 points each item
    const pairsNum = Math.floor(items.length / 2);
    console.log('getPointsByItemPairs--->', pairsNum * 5);
    return pairsNum * 5;
  } else {
    console.log('getPointsByItemPairs--->', 0);
    return 0;
  }
}

/**
 * Awards points based on individual item descriptions.
 *
 * If the trimmed length of the retailer name is a multiple of 3,
 * multiplies the item price by 0.2, rounds up, and awards the resulting points.
 *
 * @param {string} retailer - The name of the retailer.
 * @param {Array<any>} items - The list of items on the receipt.
 * @returns {number} - Total points awarded based on the price of qualifying items.
 */
function getPointsByIndividualItemMultipleOf3(
  retailer: string,
  items: Array<any>
) {
  let totalPoints = 0;
  if (items.length) {
    //points by individual item
    items.forEach((item) => {
      const itemCharCount = item.shortDescription.length;
      // Check if character count is a multiple of 3
      if (itemCharCount % 3 === 0) {
        // Calculate points: 20% of price, rounded up
        const rawPoints = item.price * 0.2;
        totalPoints = totalPoints + Math.ceil(rawPoints);
        console.log('totalPoints', totalPoints);
      }
    });
    console.log('getPointsByIndividualItemMultipleOf3--->', totalPoints);
    return totalPoints;
  }
}

/**
 * Awards points based on the day of the purchase.
 *
 * Awards 6 points if the purchase date falls on an odd day.
 *
 * @param {Date} purchaseDate - The date of purchase.
 * @returns {number} - 6 points if the purchase day is odd, otherwise 0.
 */
function getPointsOddDay(purchaseDate: Date) {
  const dateObj = new Date(purchaseDate);
  const isOddDay = dateObj.getUTCDate() % 2 !== 0;
  if (isOddDay === true) {
    //purchase day is odd = 6 points
    console.log('getPointsOddDay', 6);
    return 6;
  } else {
    console.log('getPointsOddDay', 0);
    return 0;
  }
}

/**
 * Awards points based on the time of purchase.
 *
 * Awards 10 points if the purchase time is between 2:00pm and 4:00pm.
 *
 * @param {Date} currentTime - The time of purchase.
 * @returns {number} - 10 points if the purchase time is within the specified range, otherwise 0.
 */
function getPointsForTime(currentTime: any): number {
  // Define the range
  const startTime = '2:00pm';
  const endTime = '4:00pm';

  // Parse the times into date objects (date-fns handles AM/PM parsing)
  const today = new Date(); // Use today's date for context
  const receiptTime = parse(currentTime, 'HH:mm', today);
  const startDate = parse(startTime, 'h:mma', today);
  const endDate = parse(endTime, 'h:mma', today);

  // Check if the current time is within the range
  if (isWithinInterval(receiptTime, { start: startDate, end: endDate })) {
    console.log('getPointsForTime', 10);
    return 10; // Award 10 points
  }
  console.log('getPointsForTime', 0);
  return 0; // No points if outside the range
}
