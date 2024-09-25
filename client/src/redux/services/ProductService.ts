import axios from "axios";
class ProductService {
    async fetchProducts(page: number, limit: number) {
        try {
            const config = JSON.parse(localStorage.getItem('config') || '{}');
            console.log('config ', config);
            console.log('config 2 ', `${config?.REACT_APP_BASE_URL}/api/products?pageNumber=${page}&limit=${limit}`);
            const { data } = await axios.get(`${config?.REACT_APP_BASE_URL}/api/products?pageNumber=${page}&limit=${limit}`);
            return data;
        } catch (err) {
            alert(err);
            return null;
        }
    }
}

export default new ProductService() as ProductService;
