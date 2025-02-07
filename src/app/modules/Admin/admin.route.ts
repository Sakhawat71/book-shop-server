import { Router } from "express";
import { adminContrller } from "./admin.controller";

const router = Router();

router.patch(
    '/users/:userId/block',
    adminContrller.blockUser
);

// router.delete(
//     '/blogs/:id',
//     adminContrller.deleteBlog
// )

export const adminRoute = router;