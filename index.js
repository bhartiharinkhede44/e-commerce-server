import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import product from './models/product.js'

const PORT = 8080;


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
app.get("/products",async (req, res) => {
    const FindProduct= await product.find();
    res.json({
        
        data: FindProduct,
        
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

    const prod = new product({

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
app.get('/product', async (req, res) => {
    const { name } = req.query;

    const Product = await product.findOne({name:name})
       res.json
       ({
        success:true,
        data:Product,
        message:"successfull"
       })
       

    })
   
    // delete operation
app.delete('/product/:_id', async (req,res) => {
    
    const {_id} =req.params;
     await product.deleteOne({_id:_id});
    res.json({
        success:true,
        data:{},
        message:`Successfully deleted product with id ${_id}`,
    })
    
 });

//  for Update all data in one collection
// use put method

app.put('/product/:_id',async (req,res) =>{
 const {_id} =req.params;
 const { name,description,price,productImage,brand}=req.body;
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

await product.updateOne(
    {_id:_id},
    {$set :{
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand,
        
    }
    }
 )
 const UpdatedProduct= await product.findOne({_id:_id})

 res.json({
    success:true,
    data:UpdatedProduct,
    message:`succesfully Updated`,
 })
});
// Update specific data by using patch method
app.patch('/product/:_id',async (req,res)=>{
    const {_id}=req.params;
    const { name,description,price,productImage,brand}= req.body;
    const Product = await product.findById(_id);
  
    if(name){
        Product.name = name;
    }
    if(description){
        Product.description = description;
    }
    if(price){
        Product.price = price;
    }
    if(productImage){
        Product.productImage = productImage;
    }
    if(brand){
        Product.brand = brand;
    }
    const UpdatedProduct = await Product.save();
    res.json({
        success:true,
        data:UpdatedProduct ,
        message:'Succesfully Updated',
    })
})


app.listen(PORT, () => {
    console.log(`server is running at PORT 
    ${PORT}`)
})