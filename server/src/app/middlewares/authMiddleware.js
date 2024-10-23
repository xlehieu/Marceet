import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) return;
    const token = req.headers.authorization?.split(' ')[1];
    //hàm verify này nhận dối số thứ 2 là khóa để giải mã
    // ở hàm general token bên jwtservice cũng là khóa process.env.access_token nên nó giải mã được
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Lỗi',
            });
        }
        if (!user.isAdmin) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Authentication error',
            });
        }
        next();
    });
};
export const authUserMiddleware = (req, res, next) => {
    if (!req.headers.authorization) return;
    const token = req.headers.authorization?.split(' ')[1];
    //hàm verify này nhận dối số thứ 2 là khóa để giải mã
    // ở hàm general token bên jwtservice cũng là khóa process.env.access_token nên nó giải mã được
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Lỗi',
            });
        }
        if (!user?.id || user.id !== req.params.id || !user.isAdmin) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Authentication error',
            });
        }
        next();
    });
};
