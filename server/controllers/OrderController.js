import orderService from '../services/OrderService.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class OrderController {
  static async createOrder(req, res) {
    try {
      const { customerName, customerEmail, shippingAddress, items, subtotal } = req.body;

      if (!customerName || !customerEmail || !shippingAddress || !items || !items.length) {
        return ApiResponse.error(res, 'Missing required order fields', 400);
      }

      const order = await orderService.createOrder({
        customerName,
        customerEmail,
        shippingAddress,
        items,
        subtotal
      });

      return ApiResponse.success(res, order, 'Order created successfully and queued for fulfillment', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to process order', 500, error.message);
    }
  }
}
