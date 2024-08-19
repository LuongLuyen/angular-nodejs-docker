const ThietBiService = require('../../Service/ThietBiService')
const findOneThietBi = async (req, res) => {
    const data = await ThietBiService.findOneThietBi(req,res)
    return res.json(data)
}
const findAllThietBi = async (req, res) => {
    const data = await ThietBiService.findAllThietBi()
    return res.json(data)
}
const findAllThietBiHsd = async (req, res) => {
    const data = await ThietBiService.findAllThietBiHsd()
    return res.json(data)
}
const findAllBoMon = async (req, res) => {
    const data = await ThietBiService.findAllBoMon()
    return res.json(data)
}
const capNhatSl = async (req, res) => {
    const data = await ThietBiService.capNhatSl(req, res)
    return res.json(data)
}
const hetHan = async (req, res) => {
    const data = await ThietBiService.hetHan(req, res)
    return res.json(data)
}
const themThietBiPhong = async (req, res) => {
    const data = await ThietBiService.themThietBiPhong(req, res)
    return res.json(data)
}
const deleteThietBiPhong = async (req, res) => {
    const data = await ThietBiService.deleteThietBiPhong(req, res)
    return res.json(data)
}
const capNhatThietBiPhong = async (req, res) => {
    const data = await ThietBiService.capNhatThietBiPhong(req, res)
    return res.json(data)
}


module.exports = {
    findAllThietBi,
    findAllThietBiHsd,
    findAllBoMon,
    findOneThietBi,
    capNhatSl,
    hetHan,
    themThietBiPhong,
    deleteThietBiPhong,
    capNhatThietBiPhong
}