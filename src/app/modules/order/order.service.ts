import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { orderUtils } from "./order.utils";


// Get all orders
const getAllOrders = async () => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 }); // Sorting by latest order first
        return orders;
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        throw error;
    }
};

// Get single order by ID
const getSingleOrder = async (orderId: string) => {
    try {
        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    } catch (error) {
        console.error("Error in getSingleOrder:", error);
        throw error;
    }
};




// Create an order
const createAnOrder = async (
    user: any,
    orderData: IOrder,
    client_ip: string
) => {

    let order = await OrderModel.create(orderData);

    // payment integration
    const shurjopayPayload = {
        amount: orderData.totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: user.address,
        customer_email: orderData.email,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip,
    };

    // console.log('services',shurjopayPayload);
    // return {shurjopayPayload,order};

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await OrderModel.findByIdAndUpdate(
            order._id,
            {
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            },
            { new: true } // return the updated document
        );
    }
    // if (payment?.transactionStatus) {
    //     order = await OrderModel.updateOne({
    //         transaction: {
    //             id: payment.sp_order_id,
    //             transactionStatus: payment.transactionStatus,
    //         },
    //     });
    // }

    return { payment, order };
    // return payment?.checkout_url;
};


const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await OrderModel.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                            ? "Pending"
                            : verifiedPayment[0].bank_status == "Cancel"
                                ? "Cancelled"
                                : "",
            }
        );
    }

    return verifiedPayment;
};



// Calculate Revenue from Orders
const calculateRevenueFromOrders = async () => {
    try {
        const result = await OrderModel.aggregate([
            // stap 1 : multiplying quantity and totalPrice
            {
                $project: {
                    revenue: { $multiply: ["$quantity", "$totalPrice"] }
                }
            },
            // stap 2 : sum all revenue values
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" }
                }
            },
            // stap 3 : total revenue as the result
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1
                }
            }
        ]);

        return result.length > 0 ? result[0].totalRevenue : 0;

    } catch (error) {
        console.log(error);
    }
}


export const orderService = {
    getAllOrders,
    getSingleOrder,
    createAnOrder,
    verifyPayment,
    calculateRevenueFromOrders,
}