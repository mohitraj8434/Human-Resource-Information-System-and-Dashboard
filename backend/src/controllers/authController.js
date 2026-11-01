const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   console.log(req.body);
  try {
    const {
      employeeId,
      name,
      email,
      password,
      phone,
      department,
      designation,
      salary,
      role,
    } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await Employee.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      salary,
      role,
    });

    res.status(201).json({
      success: true,
      message: "Employee Registered Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   const employee = await Employee.findOne({ email });

    if(!employee) {
      return res.status(401).json({
        sucess: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if(!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
     id: employee._id,
     role: employee.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }

  );

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    employee: {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    },
  });
  } catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};