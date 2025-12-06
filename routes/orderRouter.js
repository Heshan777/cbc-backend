import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/",getOrders)
orderRouter.put("/status/:orderID",updateOrderStatus)

// --- In your Backend's Order Routes file ---

// This is the new endpoint you need to create:
// GET /api/orders/my-orders
// (Requires user to be logged in)


export default orderRouter;