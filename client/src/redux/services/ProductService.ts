import axios from "axios";

class ProductService {
    async fetchProducts(page: number, limit: number) {
        const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}&limit=${limit}`);
        return data;
    }
}

export default new ProductService() as ProductService;
