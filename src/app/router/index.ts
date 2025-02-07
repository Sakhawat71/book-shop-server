import { Router } from "express";
import { authRoute } from "../modules/Auth/auth.route";
import { userRoute } from "../modules/User/user.route";
// import { blogRoute } from "../modules/Blog/blog.route";
import { adminRoute } from "../modules/Admin/admin.route";
import { bookRouter } from "../modules/book/book.route";
import { orderRouter } from "../modules/order/order.route";

const route = Router();

const routersModule = [
    {
        path :'/auth',
        route: authRoute
    },
    {
        path :'/users',
        route: userRoute
    },
    {
        path : '/products',
        route: bookRouter
    },
    {
        path : '/admin',
        route : adminRoute
    },
    {
        path : '/orders',
        route : orderRouter
    },

];

routersModule.forEach((r) => {
    route.use(r.path, r.route);
});

export default route;