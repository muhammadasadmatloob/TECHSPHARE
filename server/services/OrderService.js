import { Order } from '../models/Order.js';
import databaseService from '../config/DatabaseService.js';

class OrderService {
  constructor() {
    this.inMemoryOrders = [];
  }

  async createOrder(orderData) {
    const orderNumber = `TS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items,
      subtotal: orderData.subtotal,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    if (databaseService.getStatus().isConnected) {
      try {
        const orderDoc = new Order(newOrder);
        await orderDoc.save();
        return orderDoc.toObject();
      } catch (err) {
        console.warn('MongoDB order write error, using fallback in-memory store', err.message);
      }
    }

    this.inMemoryOrders.push(newOrder);
    return newOrder;
  }
}

export default new OrderService();
