import product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "you are not authorized to create a product"
        });
        return;
    }
    try {
        const productData = req.body;
        
        const newProduct = new product(productData);

        await newProduct.save();

        res.json({
            message: "product created successfully",
            product: newProduct
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "failed to create product"
        });
    }
}

export async function getProducts(req, res) {
    console.log("fetching products")
    try {
        const products = await product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "failed to retrieve products"
        });
        return;
    }
}

export async function deleteProduct(req,res) {
     if (!isAdmin(req)) {
        res.status(403).json({
            message: "you are not authorized to create a product"
        });
        return;
    }
    try{
      const productID = req.params.productID;
    await product.deleteOne({
        productID: productID
    })
    res.json({
        message : "product deleted successfully"
    })
    }catch(err){
       console.error(err);
        res.status(500).json({
            message: "failed to delete product"
        });
    }
}

export async function updateProduct(req,res) 
{ 
     if (!isAdmin(req)) {
        res.status(403).json({
            message: "you are not authorized to create a product"
        });
        return;
    }
    try{
   const productID = req.params.productID;
   const updateData = req.body;
   await product.updateOne(
    {
        productID: productID
    },
    updateData
   );
   res.json({
    message : "product updated successfully"
   });
    }catch(err){
     console.error(err);
       res.status(500).json({
        message: "failed to update product"
       })
    }
    
}

export async function getProductId(req, res) {
    try {
        const productId = req.params.productID;
        const product = await product.findOne({
            productId : productId
        });
        if(product==null){
            res.status(404).json({
                message : "product not found"
            });
        }else{
            res.json(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "failed to retrieve products"
        });
        return;
    }
}

export async function getProductsBySearch(req, res) {
    try{
         const query = req.params.query;

         const products = await product.find({
           $or: [
            {
                name: { $regex: query, $options: "i" }
            },
            {
                altNames: { $elemMatch: { $regex: query, $options: "i" } }
            }
           ]
         });
         res.json(products);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to search products"
        })
    }
}