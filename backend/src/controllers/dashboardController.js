const Employee = require("../models/Employee");

const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ isDeleted: false });

    const activeEmployees = await Employee.countDocuments({
      status: "Active",
      isDeleted: false,
    });

    const inactiveEmployees = await Employee.countDocuments({
      status: "Inactive",
      isDeleted: false,
    });

    const departments = await Employee.distinct("department", {
      isDeleted: false,
    });

    res.status(200).json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      departmentCount: departments.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};