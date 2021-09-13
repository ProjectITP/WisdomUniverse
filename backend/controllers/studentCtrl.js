const Students = require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const studentCtrl = {
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        nic,
        address,
        phone,
        gender,
        password,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !nic ||
        !address ||
        !phone ||
        !gender ||
        !password
      )
        return res.status(400).json({ msg: "Please fill in all fields" });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email" });

      const student = await Students.findOne({ email });
      if (student)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newStudent = {
        firstName,
        lastName,
        email,
        nic,
        address,
        phone,
        gender,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newStudent);

      const url = `${CLIENT_URL}/student/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address");

      res.json({
        msg: "Register success! Please activate your email to start",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const student = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      console.log(student);

      const {
        firstName,
        lastName,
        email,
        nic,
        address,
        phone,
        gender,
        password,
      } = student;

      const check = await Students.findOne({ email });

      if (check)
        return res.status(400).json({ msg: "This email already exists" });

      const newStudent = new Students({
        firstName,
        lastName,
        email,
        nic,
        address,
        phone,
        gender,
        password,
      });

      await newStudent.save();

      res.json({ msg: "Account has been activated! Now you can login" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const student = await Students.findOne({ email });
      if (!student)
        return res.status(400).json({ msg: "This email does not exist" });

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch)
        return res.status(400).json({ msg: "The password is incorrect" });

      const refresh_token = createRefreshToken({ id: student._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/student/refreshtoken",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, student) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: student.id });
        res.json({ access_token });
        console.log(student);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const student = await Students.findOne({ email });
      if (!student)
        return res.status(400).json({ msg: "This email does not exist" });

      const access_token = createAccessToken({ id: student.id });
      const url = `${CLIENT_URL}/student/reset/${access_token}`;

      sendMail(email, url, "Reset your password");
      res.json({ msg: "Resent the password, please check your email" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      await Students.findOneAndUpdate(
        { _id: req.student.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password successfully updated! Now you can login" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStudentInfor: async (req, res) => {
    try {
      const student = await Students.findById(req.student.id).select(
        "-password"
      );
      res.json(student);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/student/refreshtoken" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStudent: async (req, res) => {
    try {
      const { firstName, lastName, nic, address, phone, dob, thumbnail } =
        req.body;
      await Students.findOneAndUpdate(
        { _id: req.student.id },
        {
          firstName,
          lastName,
          nic,
          address,
          phone,
          phone,
          dob,
          thumbnail,
        }
      );

      res.json({ msg: "Student details update successful!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await Students.find().select("-password");
      res.json(students);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      await Students.findByIdAndDelete(req.student.id);
      res.json({ msg: "Delete success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = studentCtrl;
