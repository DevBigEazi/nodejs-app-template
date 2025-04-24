const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (username, roles) => {
    return jwt.sign({ username, roles }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

// @desc    Register new admin
// @route   POST api/v1/admin
// @access  private
const handleNewAdmin = async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password)
        return res
            .status(400)
            .json({ message: "All required field must be filled" });

    // check password/username length
    if (username.length <= 2 || password.length <= 7)
        return res.status(400).json({
            message:
                "Username and Password characters must be at least 3 and 8 respectively",
        });

    // check for duplicate username
    const duplicate = await Admin.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //conflict

    try {
        const hashedpwd = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            username: username,
            password: hashedpwd,
            roles,
        });

        console.log(admin);

        if (admin) {
            res.status(201).json({
                _id: admin.id,
                username: admin.username,
                password: admin.password,
                roles: admin.roles,
                token: generateToken(admin._id, admin.roles),
            });
        } else {
            res.status(400).json("Invalid credentials");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    update existing admin
// @route   PATCH api/v1/admin
// @access  private
const handleUpdateAdmin = async (req, res) => {
    const { id, username, roles, password } = req.body;

    // Confirm data
    if (!id || !username || typeof roles !== 'object' || !Object.keys(roles).length) {
        return res
            .status(400)
            .json({ message: "All fields except password are required" });
    }

    try {
        // Does the admin exist to update?
        const admin = await Admin.findById(id).exec();

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        // Check for duplicate
        const duplicate = await Admin.findOne({ username })
            .collation({ locale: "en", strength: 2 })
            .lean()
            .exec();

        // Allow updates to the original admin
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: "Duplicate username" });
        }

        admin.username = username;
        admin.roles = roles;

        if (password) {
            // Hash password
            admin.password = await bcrypt.hash(password, 10); // salt rounds
        }

        const updatedAdmin = await admin.save();

        res.json({ message: `${updatedAdmin.username} updated` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete admin
// @route   DELETE api/v1/admin
// @access  private
const handleDeleteAdmin = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "ID required!" });

    try {
        // Does the user exist to delete?
        const admin = await Admin.findById(id).exec();
        if (!admin) return res.status(400).json({ message: "User not found" });

        await admin.deleteOne();

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Authenticate an admin
// @route   POST api/v1/admin/auth
// @access  Public
const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        //check if the admin exist
        const foundAdmin = await Admin.findOne({ username }).exec();
        if (!foundAdmin)
            return res.status(401).json({ message: "Admin not exist" });

        // check if admin pwd match
        const pwdMatch = await bcrypt.compare(password, foundAdmin.password);
        if (!pwdMatch)
            return res.status(401).json({ message: "Password not correct" });

        const roles = Object.values(foundAdmin.roles);

        // Generate JWT token
        const token = generateToken(foundAdmin._id, roles);

        // Set token as a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }); // 7 days

        if (foundAdmin && pwdMatch) {
            res.status(200).json({
                _id: foundAdmin.id,
                username: foundAdmin.username,
                password: foundAdmin.password,
                roles: roles,
                token: token,
            });
        } else {
            res.status(400).json("Invalid credentials");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    handleNewAdmin,
    handleUpdateAdmin,
    handleDeleteAdmin,
    handleLogin,
};