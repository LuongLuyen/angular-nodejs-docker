const Dao = require('../Dao/dao')
require('dotenv').config()

const token = (length)=> {
    const characters = process.env.TOKEN
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
const findAllUser = async(req,res) => {
    try {
        const data= await Dao.findAll({table:`${process.env.DATABASE}.home_user`})
        return data
    } catch (error) {
        return error
    }
}
const findOneUser = async(req,res) => {
    try {
        const data= await Dao.findOne({table:`${process.env.DATABASE}.home_user`,id:req.params.id})
        return data
    } catch (error) {
        return error
    }
}
const findUserPass = async(req,res) => {
    try {
        const data = await Dao.findUserPass({table:`${process.env.DATABASE}.home_user`,userName:req.body.userName,password:req.body.password})
        return {token : data.id + token(20)+data.role.substring(0,1)}
    } catch (error) {
        return error
    }
}
const themNguoiDung = async(req,res) => {
    const data = req.body
    const sql = `
    INSERT INTO ${process.env.DATABASE}.home_user (userName, password, name,role)
    VALUES ('${data.userName}', '${data.password}', '${data.name}','${data.role}');
    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}
const capNhatNguoiDung = async(req,res) => {
    const data = req.body
    const sql =`
    UPDATE ${process.env.DATABASE}.home_user
    SET
    userName = '${data.userName}', 
    password = '${data.password}',
    name = '${data.name}',
    role = '${data.role}'
    WHERE id = ${data.id};
    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}
const xoaNguoiDung = async(req,res) => {
    const data = req.body
    const sql =`
    DELETE FROM ${process.env.DATABASE}.home_user
    WHERE id = ${data.id};

    `
    try {
        await Dao.sql(sql)
        return "OK"
    } catch (error) {
        return error
    }
}

module.exports = {
    findAllUser,
    findOneUser,
    findUserPass,
    themNguoiDung,
    capNhatNguoiDung,
    xoaNguoiDung
}