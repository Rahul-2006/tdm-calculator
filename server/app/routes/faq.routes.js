const router = require("express").Router();

const faqController = require("../controllers/faq.controller");

module.exports = router;

router.get("/", faqController.get);
router.get("/:id", faqController.getById);
router.post("/", faqController.post);
router.put("/:id", faqController.put);
router.delete("/:id", faqController.del);
