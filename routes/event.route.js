const router = require("express").router();
const { evetController } = require("./../controllers/event.controller");
router.get("/events", evetController.getEvents);

module.export = router;
