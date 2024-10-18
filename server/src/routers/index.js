import productRouter from './productRouter.js';
import userRouter from './userRouter.js';
const routes = function (app) {
    app.use('/api/product', productRouter);
    app.use('/api/user', userRouter);
};
export default routes;
