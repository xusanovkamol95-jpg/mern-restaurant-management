const jwt = require("jsonwebtoken")

const generateToken = (data) => {
    return jwt.sign({
        id: data._id,
        role: data.role,
        ism: data.ism
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

module.exports = generateToken