const {body} = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório!")
            .isLength({min: 3})
            .withMessage("O nome precisa ter ao menos 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório!")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória!")
            .isLength({min: 5})
            .withMessage("A senha precisa ter ao menos 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória!")
            .custom((value, {req}) => {
                if(value != req.body.password) {
                    throw new Err("As senhas precisam ser iguais!");
                }
                return true;
            }),
    ];
};

const loginValidation = () => {
    return [
        body("email")
        .isString()
        .withMessage("O e-mail é obrigatório!")
        .isEmail()
        .withMessage("Insira um e-mail válido."),
        body("password")
        .isString()
        .withMessage("A senha é obrigatória!"),
    ];
};

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({min:3})
            .withMessage("O nome precisa de pelo menos 3 caracteres."),
        body("password")
            .optional()
            .isLength({min:5})
            .withMessage("A senha precisa de pelo menos 5 caracteres."),
    ];
};

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}