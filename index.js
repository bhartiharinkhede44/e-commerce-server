import express from "express";
import mongoose, {model, Schema} from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// import Product from './models/product.js'



const app = express();
app.use(express.json());
//mongodb connection
const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('MongoDB connected successfully');
    }
};
connectMongoDB();


const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String,
});
const Product = model('Product', productSchema);












app.get("/products",async (res, req) => {
    const findingproduct= await Product.find()
    res.json({
        
        data: findingproduct,
        
    })
})

app.post("/product",async (req, res) => {
    const { name, description, price, productImage, brand } = req.body;
    if (!name) {
        return res.json({
            success: false,
            message: 'Name is required'
        })
    }
    if (!description) {
        return res.json({
            success: false,
            message: 'description is required'
        })
    }
    if (!price) {
        return res.json({
            success: false,
            message: 'price is required'
        })
    }
    if (!productImage) {
        return res.json({
            success: false,
            message: 'productImage is required'
        })
    }
    if (!brand) {
        return res.json({
            success: false,
            message: 'brand is required'
        })
    }

    const prod = new Product({

        name : name,
        description : description,
        price : price,
        productImage : productImage,
        brand : brand

    })
    const savedProduct = await prod.save();

   
    res.json({
        success: true,
        data:savedProduct,
        message: 'Sucessfully added new product'
    })


});
app.get('/product', (req, res) => {
    const { name } = req.query;
    let product = null;
    const newProduct ={
        // 'id':'id',
        'name':'name',
        'description':'description',
        'price' : 'price',
        'productImage' : 'productImage',
        'brand' : 'brand'
    }
    if (product == null) {
        return res.json({
            success: false,
            message: 'product not found',
        })
    }
    res.json({
        success: true,
        data: student,
        message: 'successfully fetched student'
    })

})


app.listen(8080, () => {
    console.log(`server is running at 8080`)
})