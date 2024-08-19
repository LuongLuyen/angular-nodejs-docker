const db = require('../Config/configDB')

const findAll = (data)=> {
	return new Promise((resolve, reject) => {
		const sql = `Select * from ${data.table}`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			} else {
				resolve(results)
			}
		}) 
	})
}
const sql = (sql)=> {
	return new Promise((resolve, reject) => {
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			} else {
				resolve(results)
			}
		}) 
	})
}
const findOne = (data)=>{
   return new Promise((resolve,reject)=>{
	const sql = `SELECT * FROM ${data.table} WHERE id = ${data.id}`
	db.query(sql,(err,results)=>{
		if(err){
			reject(err)
		}else {
			resolve(results[0])
		}
	})
   })
} 
const findByIdTb = (data)=>{
   return new Promise((resolve,reject)=>{
	const sql = `SELECT * FROM ${data.table} WHERE deviceId_id = ${data.id}`
	db.query(sql,(err,results)=>{
		if(err){
			reject(err)
		}else {
			resolve(results)
		}
	})
   })
} 
const findUserPass = (data)=>{
	return new Promise((resolve,reject)=>{
		const sql = `SELECT * FROM ${data.table} WHERE username = '${data.userName}' AND password = '${data.password}'`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			}else {
				resolve(results[0])
			}
		})
	})
} 
const createLichSu = (data)=>{
	return new Promise((resolve,reject)=>{
		const sql = `
		INSERT INTO ${data.table} (ngay_muon, ngay_tra, lop, giaovien,tiet_muon,deviceId_id,userId_id,so_luong,ngay_dang_ky,da_tra,tiet_tra)
        VALUES ('${data.item.muon}', '${data.item.tra}', '${data.item.lop}', '${data.item.giaovien}', '${data.item.tiet}', '${data.item.deviceId_id}', '${data.item.userId_id}', '${data.item.so_luong}', '${data.item.ngay_dang_ky}','${data.item.da_tra}','${data.item.tiet_tra}');

		`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			}else {
				resolve("OK")
			}
		})
	})
} 
const traThietBiPhong = (data)=>{
	return new Promise((resolve,reject)=>{
		const sql = `
		UPDATE ${data.table}
		SET da_tra = 'T'
		WHERE id = ${data.id};
		`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			}else {
				resolve("Ok")
			}
		})
	})
} 
const capNhatThietBiSl = (data)=>{
	return new Promise((resolve,reject)=>{
		const sql = `
		UPDATE ${data.table}
		SET quantity = '${data.quantity}'
		WHERE id = ${data.id};
		`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			}else {
				resolve("Ok")
			}
		})
	})
} 
const xoa = (data)=>{
	return new Promise((resolve,reject)=>{
		const sql = `
		DELETE FROM  ${data.table}
		WHERE id = ${data.id};
		`
		db.query(sql,(err,results)=>{
			if(err){
				reject(err)
			}else {
				resolve("Ok")
			}
		})
	})
} 


module.exports = {
	findAll,
	findOne,
	findUserPass,
	sql,
	createLichSu,
	traThietBiPhong,
	capNhatThietBiSl,
	findByIdTb,
	xoa
}