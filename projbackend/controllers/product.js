const Product = requier("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req,res,next, id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err, product)=>{
        if (err) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res)=>{
    let from  = new formidable.findById();
    formidable.keepExtensions = true;

    form.parse(req, (err, feilds, file) =>{
        if (err) {
            return res.status(400).json({
                eroor: "Problem with image"
            })
        }
        //TODO restrictions on fields
        let product = new Product(fields)

        //handle file here 
        if (file.photo) {
            if (file.photo.size >3000000) {
                return res.status(400).json({
                    error: "File size too bog!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contetType = file.photo.type;
        };

        //save to DB
        product.save((err,product) => {
            if (err) {
                res.status(400).json({
                    error: "saving tshirt in DB failed"
                })
            }
            res.json(product)

        })
    });
}