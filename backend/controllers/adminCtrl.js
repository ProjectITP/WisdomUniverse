const Admins = require("../models/adminModel");
const Students = require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const adminCtrl = {
  register: async (req, res) => {
    try {
      console.log(req.body);
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields" });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email" });

      const admin = await Admins.findOne({ email });
      if (admin)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newAdmin = {
        firstName,
        lastName,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newAdmin);

      const url = `${CLIENT_URL}/admin/activate/${activation_token}`;
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
      const admin = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      console.log(admin);

      const { firstName, lastName, email, password } = admin;

      const check = await Admins.findOne({ email });

      if (check)
        return res.status(400).json({ msg: "This email already exists" });

      const newAdmin = new Admins({
        firstName,
        lastName,
        email,
        password,
      });
      await newAdmin.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admins.findOne({ email });
      if (!admin)
        return res.status(400).json({ msg: "This email does not exist" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "The password is incorrect" });

      const refresh_token = createRefreshToken({ id: admin._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/admin/refreshtoken",
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

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: admin.id });
        res.json({ access_token });
        console.log(admin);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const admin = await Admins.findOne({ email });
      if (!admin)
        return res.status(400).json({ msg: "This email does not exist" });

      const access_token = createAccessToken({ id: admin.id });
      const url = `${CLIENT_URL}/admin/reset/${access_token}`;

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

      await Admins.findOneAndUpdate(
        { _id: req.admin.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password successfully updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAdminInfor: async (req, res) => {
    try {
      const admin = await Admins.findById(req.admin.id).select("-password");
      res.json(admin);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/admin/refreshtoken" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const { firstName, lastName, thumbnail } = req.body;
      await Admins.findOneAndUpdate(
        { _id: req.admin.id },
        {
          firstName,
          lastName,
          thumbnail,
        }
      );

      res.json({ msg: "Update Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStudent: async (req, res) => {
    try {
      const { firstName, lastName, nic, address, phone, dob, thumbnail } =
        req.body;
      await Students.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        nic,
        address,
        phone,
        phone,
        dob,
        thumbnail,
      });

      res.json({ msg: "Update Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAdmin: async (req, res) => {
    try {
      await Students.findByIdAndDelete(req.params.id);
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

module.exports = adminCtrl;
