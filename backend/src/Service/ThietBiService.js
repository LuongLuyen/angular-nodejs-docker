const Dao = require('../Dao/dao')
require('dotenv').config()

const findOneThietBi = async(req,res) => {
    try {
        const data= await Dao.findOne({table:`${process.env.DATABASE}.home_device`,id:req.params.id})
        return data
    } catch (error) {
        return error
    }
}
const findAllThietBi = async(req,res) => {
    try {
        let data= await Dao.findAll({table:`${process.env.DATABASE}.home_device`})
        return data
    } catch (error) {
        return error
    }
}
const findAllThietBiHsd = async(req,res) => {
    try {
        let data= await Dao.findAll({table:`${process.env.DATABASE}.home_device`})
        data = data.filter(x=>{
            return x.unit !=="PHÒNG"
        })
        data = data.filter(x=>{
            return x.status !=="HẾT HẠN"
        })
        return data
        
    } catch (error) {
        return error
    }
}

const findAllBoMon = async(req,res) => {
    try {
        let data= await Dao.findAll({table:`${process.env.DATABASE}.home_device`})
        data = data.filter(x=>{
            return x.unit ==="PHÒNG"
        })
        return data
    } catch (error) {
        return error
    }
}
const deleteThietBiPhong = async(req,res) => {
    try {
        let data= await Dao.xoa({table:`${process.env.DATABASE}.home_device`,id:req.body.id})
        return data
    } catch (error) {
        return error
    }
}
const themThietBiPhong = async(req,res) => {
    const data =req.body
    const sql =`
    INSERT INTO ${process.env.DATABASE}.home_device ( name, mon, code, unit, price, quantity, userId_id, hansudung, location, ngaynhap, status) 
    VALUES ('${data.name}', '${data.mon}', '${data.code}', '${data.unit}', '${data.price}', '${data.quantity}', ${data.userId_id}, '${data.hansudung}', '${data.location}', '${data.ngaynhap}', '${data.status}');
    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}
const hetHan = async(req,res) => {
    const sql =`
    UPDATE ${process.env.DATABASE}.home_device
    SET status = 'HẾT HẠN'
    WHERE STR_TO_DATE(hansudung, '%Y-%m-%d') <= '${req.body.today}';
    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}
const capNhatThietBiPhong = async(req,res) => {
    const data = req.body
    const sql =`
    UPDATE ${process.env.DATABASE}.home_device
    SET 
    name = '${data.name}',
    mon = '${data.mon}',
    code = '${data.code}',
    unit = '${data.unit}',
    price = '${data.price}',
    quantity = '${data.quantity}',
    userId_id = ${data.userId_id},
    hansudung = '${data.hansudung}',
    location = '${data.location}',
    ngaynhap = '${data.ngaynhap}',
    status = '${data.status}'
    WHERE id = ${data.id};

    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}
const capNhatSl = async(req,res) => {
    const thietBi= await Dao.findOne({table:`${process.env.DATABASE}.home_device`,id:req.body.id})
    let quantity = 0
    if(req.body.phepTinh ==="-"){
        quantity = Number(thietBi.quantity) - Number(req.body.quantity)
        const data= await Dao.capNhatThietBiSl({table:`${process.env.DATABASE}.home_device`,quantity:quantity,id:req.body.id})
        return data
    }
    if(req.body.phepTinh ==="+"){
        quantity = Number(thietBi.quantity) + Number(req.body.quantity)
        const data= await Dao.capNhatThietBiSl({table:`${process.env.DATABASE}.home_device`,quantity:quantity,id:req.body.id})
        return data
    }
    if(req.body.phepTinh ==="no"){
        return "OK"
    }

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