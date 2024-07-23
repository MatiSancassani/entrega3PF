import { Router } from 'express';
import { faker } from '@faker-js/faker';

const router = Router();

const generateProducts = (qty) => {
    const products = [];
    for (let i = 0; i < qty; i++) {       
        const title = faker.commerce.productName();
        const description = faker.commerce.productDescription();
        const price = faker.commerce.price();
        const stock = faker.number.int();
        const code = faker.string.uuid();
        const status = faker.datatype.boolean();

        products.push({title, description, price, stock, code, status})
    }
    return products;
}

router.get('/mockingproducts/:qty', async (req, res) => {
    const data = await generateProducts(req.params.qty)
    res.status(200).send({status: 'Ok', totalProducts: data.length, payload: data})
});

 

export default router;