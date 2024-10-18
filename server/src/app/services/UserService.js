import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import * as JWTService from './JwtService.js';

var salt = bcrypt.genSaltSync(10);
export const registerUser = (newUser) => {
    const { email, password, phone } = newUser;
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmailUser = await User.findOne({
                email: email,
            });
            if (checkEmailUser) {
                resolve({
                    status: 'Error',
                    message: 'Email đã tồn tại',
                });
            }
            const hash = bcrypt.hashSync(password, salt);
            const user = await User.create({
                email,
                password: hash,
                phone,
            });
            if (user) {
                resolve({
                    status: 'OK',
                    data: user,
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};
export const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: 'OK',
                data: allUser,
            });
        } catch (err) {
            reject(err);
        }
    });
};
export const getUserDetail = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId);
            if (user) {
                resolve({
                    status: 'OK',
                    data: user,
                });
            }
            resolve({
                status: 'OK',
                message: 'Xin lỗi! Không tìm thấy dữ liệu người dùng',
            });
        } catch (err) {
            reject(err);
        }
    });
};
export const loginUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userInfo;
        try {
            const userCheck = await User.findOne({
                email: email,
            });
            if (!userCheck) {
                resolve({
                    status: 'ERR',
                    message: 'Email hoặc mật khẩu không chính xác',
                });
            }
            const checkPassword = await bcrypt.compare(password, userCheck.password);
            if (!checkPassword) {
                resolve({
                    status: 'ERR',
                    message: 'Email hoặc mật khẩu không chính xáccc',
                });
            }
            const access_token = await JWTService.generalAccessToken({
                id: userCheck.id,
                isAdmin: userCheck.isAdmin,
            });
            const refresh_token = await JWTService.generalRefreshToken({
                id: userCheck.id,
                isAdmin: userCheck.isAdmin,
            });
            resolve({
                status: 'OK',
                message: 'Đăng nhập thành công',
                access_token,
                refresh_token,
            });
        } catch (err) {
            reject(err);
        }
    });
};
export const updateUser = (id, userInfoUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdUser = await User.findById(id);
            if (checkIdUser) {
                const checkEmailUser = await User.findOne({
                    email: userInfoUpdate.email,
                });
                if (checkEmailUser.id !== id) {
                    resolve({
                        status: 'OK',
                        message: 'Email đã tồn tại',
                    });
                }
            } else {
                resolve({
                    status: 'OK',
                    message: 'Không có dữ liệu người dùng',
                });
            }
            const response = await User.findByIdAndUpdate(id, userInfoUpdate, { new: true });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};
export const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkId = await User.findById(id);
            if (checkId) {
                console.log(id);
                const response = await User.delete({ _id: id });
                if (response.matchedCount > 0)
                    resolve({
                        status: 'OK',
                        message: 'Delete successfully',
                    });
                resolve({
                    status: 'ERROR',
                    message: 'Delete unsuccessfully',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Lỗi! Không tìm thấy người dùng',
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};
