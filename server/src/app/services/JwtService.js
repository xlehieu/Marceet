import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generalAccessToken = (payload) => {
    const access_token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, { expiresIn: '12h' });
    return access_token;
};
export const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_token;
};
export const refreshTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'Lỗi định danh',
                    });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};
