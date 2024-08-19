const UserService = require('../../Service/UserService')
const findAllUser = async (req, res) => {
    const data = await UserService.findAllUser()
    return res.json(data)
}
const findOneUser = async (req, res) => {
    const data = await UserService.findOneUser(req,res)
    return res.json(data)
}
const findUserPass = async (req, res) => {
    const data = await UserService.findUserPass(req,res)
    return res.json(data)
}
const themNguoiDung = async (req, res) => {
    const data = await UserService.themNguoiDung(req, res)
    return res.json(data)
}
const capNhatNguoiDung = async (req, res) => {
    const data = await UserService.capNhatNguoiDung(req, res)
    return res.json(data)
}
const xoaNguoiDung = async (req, res) => {
    const data = await UserService.xoaNguoiDung(req, res)
    return res.json(data)
}


module.exports = {
    findAllUser,
    findOneUser,
    findUserPass,
    themNguoiDung,
    capNhatNguoiDung,
    xoaNguoiDung
}