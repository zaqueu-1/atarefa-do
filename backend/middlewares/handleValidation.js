const {validationResult} = require("express-validator");

const validate = (res,res,next) => {
    const errs = validationResult(req);

    if(errs.isEmpty()) {
        return next();
    };

    const extractedErrs = [];

    errs.array().map((err) => extractedErrs.push(err.msg));
    
    return res.status(422).json({
        errs: extractedErrs,
    });
};

module.exports = {validate};