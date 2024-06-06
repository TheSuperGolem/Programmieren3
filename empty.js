const LivingBeing = require("./livingbeing");

module.exports = class Empty extends LivingBeing{
    constructor(color){
        super(color);
        this.color;
    }
}