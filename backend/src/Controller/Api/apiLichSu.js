const LichSuService = require('../../Service/LichSuService')
const findOneLichSu = async (req, res) => {
    const data = await LichSuService.findOneLichSu(req,res)
    return res.json(data)
}
const findAllLichSu = async (req, res) => {
    const data = await LichSuService.findAllLichSu()
    return res.json(data)
}
const findLichSuUser = async (req, res) => {
    const data = await LichSuService.findLichSuUser(req, res)
    return res.json(data)
}
const findLichSuTb = async (req, res) => {
    const data = await LichSuService.findLichSuTb(req, res)
    return res.json(data)
}
const dangKyThietBiPhong = async (req, res) => {
    const data = await LichSuService.dangKyThietBiPhong(req, res)
    return res.json(data)
}
const traThietBiPhong = async (req, res) => {
    const data = await LichSuService.traThietBiPhong(req, res)
    return res.json(data)
}

module.exports = {
    findAllLichSu,
    findLichSuUser,
    dangKyThietBiPhong,
    traThietBiPhong,
    findLichSuTb,
    findOneLichSu
}