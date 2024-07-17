import productsModel from "./models/products.model.js";


export const getAllProducts = async (req) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let sort = req.query.sort;
        if (sort === 'asc' || sort === 'desc') {
            sort = { price: sort}
        } else {
            sort = null
        }
        const products =  await productsModel.paginate({}, {page, limit, sort, lean: true});
        
        const hasNextPage = products.hasNextPage;
        const hasPrevPage = products.hasPrevPage;          
        const totalPages = products.totalPages;
        const prevPage = products.prevPage;
        const nextPage = products.nextPage;
        const prevLink = products.prevLink;
        const nextLink = products.nextLink;

        return {
            hasNextPage,
            hasPrevPage,
            totalPages,
            prevPage,
            nextPage,
            prevLink,
            nextLink,
            payload: products,
        }
}

export const getProductById = async (pid) => await productsModel.findById(pid);

export const addProduct = async ({title, description, price, thumbnail, stock , code, status ,category }) =>     
    await productsModel.create({title, description, price, thumbnail, stock , code, status ,category })

export const updateProduct = async (pid, rest) => 
    await productsModel.findByIdAndUpdate(pid, {...rest}, {new: true}).lean();


export const removeProduct = async (pid) => await productsModel.findByIdAndDelete(pid).lean();


class ProductsManager {
    constructor() {
    }
    newService = async (limit , page = 1) => {
        try {
            if (limit === 0) {
                return await productsModel.find().lean();
            } else {
                return await productsModel.paginate({}, { page: page, limit: limit, lean: true });
            }
        } catch (err) {
            return err.message;
        };
       
         
    }
}

export default ProductsManager;
