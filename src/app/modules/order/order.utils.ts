import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
    config.sp_endpoint!,
    config.sp_username!,
    config.sp_password!,
    config.sp_prefix!,
    config.sp_return_url!,
);

const makePaymentAsync = async (
    paymentPayload: any
): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        shurjopay.makePayment(
            paymentPayload,
            (response) => resolve(response),
            (error) => reject(error)
        );
    });
};

const verifyPaymentAsync = (
    order_id: string
): Promise<VerificationResponse[]> => {
    return new Promise((resolve, reject) => {
        shurjopay.verifyPayment(
            order_id,
            (response) => resolve(response),
            (error) => reject(error)
        );
    });
};

export const orderUtils = {
    makePaymentAsync,
    verifyPaymentAsync,
};