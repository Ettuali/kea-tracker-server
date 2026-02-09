    const router = require("express").Router();
    const controller = require("../controllers/expenseController");

    router.post("/", controller.addExpense);
    router.put("/:id", controller.updateExpense);
    router.delete("/:id", controller.deleteExpense);

    module.exports = router;
