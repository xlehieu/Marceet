import * as ProductService from '../services/ProductService.js';

export const getAllProduct = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await ProductService.getAllProduct(limit, page - 1);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            status: 'ERROR',
            message: err,
        });
    }
};
export const getProductDetail = async (req, res) => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Incomplete data',
            });
        }
        const response = await ProductService.getProductDetail(slug);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'ERROR',
        });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, thumb, category } = req.body;
        if (!name || !description || !price || !quantity || !thumb || !category) {
            return res.status(200).json({
                status: 'OK',
                message: 'Incomplete data',
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'OK',
                message: 'Product ID is required',
            });
        }
        const { name, description, price, quantity, thumb, category } = req.body;
        if (!name || !description || !price || !quantity || !thumb || !category) {
            return res.status(200).json({
                status: 'OK',
                message: 'Product info is required',
            });
        }
        const response = await ProductService.updateProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'OK',
                message: 'Product ID is required',
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
