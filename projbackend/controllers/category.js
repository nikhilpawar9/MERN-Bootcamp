const Category = require("../models/category")


exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err, cate)=>{
        if (err) {
            return res.status(400).json({
                error:"Category not found in DB"
            });
        }
        req.category = cate;
        next();
    });
    
    next();
}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if (err) {
            return res.status(400).json({
                error:"Not able to save category in DB"
            });
        }
        req.json({category}) ;
    })
};

exports.getCategory=(req,res)=>{
    return res.json(req.category);
}

exports.getAllCategory=(req,res)=>{
    Category.find().exe((err,categories)=>{
        if (err) {
            return res.status(400).json({
                error:"No categories found in DB"
            });
        }
        res.json(categories);
    })
}


exports.updateCategory=(req,res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updateCategory)=>{
        if (err) {
            return res.status(400).json({
                error:"Failed to update category in DB"
            });
        }
        req.json({updatedCategory}) ;
    })
}