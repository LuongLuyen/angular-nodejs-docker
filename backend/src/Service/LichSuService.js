const Dao = require('../Dao/dao')
require('dotenv').config()

const findOneLichSu = async(req,res) => {
    try {
        const data= await Dao.findOne({table:`${process.env.DATABASE}.home_borrowreturn`,id:req.params.id})
        return data
    } catch (error) {
        return error
    }
}



const findAllLichSu = async(req,res) => {
    try {
        const sql =`
            SELECT
                u.name as nguoidung, 
                d.name as thietbi,
                d.mon,
                d.unit as donvi,
                d.status as trangthai,
                d.price as gia,
                l.ngay_dang_ky as ngaydangky,
                l.ngay_muon as ngaymuon,
                l.ngay_tra as ngaytra,           
                l.lop,           
                l.tiet_muon as tietmuon,       
                l.tiet_tra as tiettra,       
                l.so_luong as soluong ,      
                l.da_tra as datra       
            FROM 
                ${process.env.DATABASE}.home_borrowreturn l 
            INNER JOIN 
                ${process.env.DATABASE}.home_user u 
            ON 
                l.userId_id = u.id 
            INNER JOIN 
                ${process.env.DATABASE}.home_device d     
            ON 
                l.deviceId_id = d.id 
        `
        let data= await Dao.sql(sql)
        return data
    } catch (error) {
        return error
    }
}
const findLichSuUser = async(req,res) => {
    try {
        const sql =`
            SELECT
                u.name as nguoidung, 
                d.name as thietbi,
                d.mon,
                d.unit as donvi,
                d.status as trangthai,
                d.price as gia,
                l.ngay_dang_ky as ngaydangky,
                l.ngay_muon as ngaymuon,
                l.ngay_tra as ngaytra,           
                l.lop,           
                l.tiet_muon as tietmuon,       
                l.tiet_tra as tiettra,        
                l.so_luong as soluong,       
                l.da_tra as datra,
                l.id,     
                l.deviceId_id as idThietBi,
                l.userId_id as idNguoiDung
            FROM 
                ${process.env.DATABASE}.home_borrowreturn l 
            INNER JOIN 
                ${process.env.DATABASE}.home_user u 
            ON 
                l.userId_id = u.id 
            INNER JOIN 
                ${process.env.DATABASE}.home_device d     
            ON 
                l.deviceId_id = d.id 
            WHERE l.userId_id =${req.params.id}
        `
        let data= await Dao.sql(sql)
        return data
    } catch (error) {
        return error
    }
}

const dangKyThietBiPhong = async(req,res) => {
  
    try {
        let data= await Dao.createLichSu({table:`${process.env.DATABASE}.home_borrowreturn`,item:req.body})
        return data
    } catch (error) {
        return error
    }
}
const traThietBiPhong = async(req,res) => {
    try {
        let data= await Dao.traThietBiPhong({table:`${process.env.DATABASE}.home_borrowreturn`,id:req.body.id })
        return data
    } catch (error) {
        return error
    }
}
const findLichSuTb = async(req,res) => {
    try {
        let data= await Dao.findByIdTb({table:`${process.env.DATABASE}.home_borrowreturn`,id:req.params.id})
        return data
    } catch (error) {
        return error
    }
}

module.exports = {
    findAllLichSu,
    findLichSuUser,
    dangKyThietBiPhong,
    traThietBiPhong,
    findLichSuTb,
    findOneLichSu
}