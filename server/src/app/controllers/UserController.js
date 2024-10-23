import jsonwebtoken from 'jsonwebtoken';
import * as userService from '../services/UserService.js';
import * as JWTService from '../services/JwtService.js';
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
export const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUser();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            message: err,
        });
    }
};
export const getUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await userService.getUserDetail(userId);

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            status: 'ERROR',
            message: err,
        });
    }
};
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refresh_token;
        if (!token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Token bị lỗi',
            });
        }
        const response = await JWTService.refreshTokenService(token);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            status: 'ERROR',
            message: err,
        });
    }
};
export const registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword, phone } = req.body;
        if (!email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'OK',
                message: 'Thiếu dữ liệu',
            });
        }
        if (!validateEmail(email)) {
            return res.status(200).json({
                status: 'OK',
                message: 'Email không đúng định dạng',
            });
        }
        if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'OK',
                message: 'Mật khẩu không giống nhau',
            });
        }
        const response = await userService.registerUser(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập email',
            });
        }
        if (!password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập mật khẩu',
            });
        }
        const response = await userService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        return res.status(200).json(newResponse);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Xin lỗi quý khách, chúng tôi đang bị lỗi',
            });
        }
        const { name, email, phone, avatar, address } = req.body;
        if (!name || !email || !phone || !avatar || !address) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Thiếu dữ liệu',
            });
        }
        if (!validateEmail(email)) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Email không đúng định dạng',
            });
        }
        const response = await userService.updateUser(id, req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({
                status: 'OK',
                message: 'Xin lỗi quý khách, chúng tôi đang bị lỗi',
            });
        }
        const response = await userService.deleteUser(id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('access_token');
        return res.status(200).json({ status: 'OK', message: 'Log out success' });
    } catch (err) {
        return res.status(500).json(err);
    }
};
