const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");


const {
  getEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getOrganization,
  getProfile,
   changePassword,
  uploadProfileImage,
} = require("../controllers/employeeController");

router.get("/", protect, getEmployees);

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "HR Manager"),
  addEmployee
);

router.get("/organization", protect, getOrganization);
router.get("/profile", protect, getProfile);
router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.get("/:id", protect, getEmployeeById);

router.put(
  "/:id",
  protect,
  authorizeRoles("Super Admin", "HR Manager"),
  updateEmployee
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("Super Admin"),
  deleteEmployee
);





module.exports = router;