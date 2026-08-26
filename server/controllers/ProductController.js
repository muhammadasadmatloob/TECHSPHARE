import productService from '../services/ProductService.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class ProductController {
  static async getProducts(req, res) {
    try {
      const { category = 'all', search = '' } = req.query;
      const result = await productService.getAllProducts(category, search);
      return ApiResponse.success(res, result.products, 'Products fetched successfully', 200, {
        source: result.source,
        total: result.products.length
      });
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch products', 500, error.message);
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return ApiResponse.error(res, 'Product not found', 404);
      }
      return ApiResponse.success(res, product, 'Product details retrieved successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Error fetching product details', 500, error.message);
    }
  }
}
