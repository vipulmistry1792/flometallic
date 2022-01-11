const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');
const config1 = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
};

async function authenticate({ username, password }) {
    
    const rows = await db.query(
        `select * from user_master where username='${username}'`
      );
      const data = helper.emptyOrRows(rows);
      //const meta = {page};
   // const data = await User.findOne({ username });
   const data1=data[0]
   //console.log(data1)
    if (data1 && bcrypt.compareSync(password, data1.hash)) {
        const token = jwt.sign({ sub: data1.id }, config1.secret, { expiresIn: '7d' });
        return {
            ...data1,
            token
        };
    }
}
async function getAll() {
    const rows = await db.query(
        `select * from user_master`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getById(id) {
    const rows = await db.query(
        `select * from user_master where id=${id}`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function create(userParam) {
  //  console.log(userParam);
    // validate
    const rows = await db.query(
        `select * from user_master where username like '${userParam.username}'`
      );
      const data = helper.emptyOrRows(rows);
    if (data.length>0) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user=userParam;
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
//console.log(user);
    // save user
    const rows1 = await db.query(
        `insert into user_master (username,hash,firstName,lastName,user_control,friendly_name) values (?,?,?,?,?,?)`,
    [user.username, user.hash,user.firstName,user.lastName,user.Type,user.friendly_name]
       );
    // await user.save();
}

async function update(id, userParam) {
    const rows = await db.query(
        `select * from user_master where id =${id}`
      );
      const data = helper.emptyOrRows(rows);
    const user=userParam;
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
console.log( `update user_master set hash=?,firstName=?,lastName=?,user_control=?,friendly_name=? where id=${id}`);
    // save user
    const rows1 = await db.query(
        `update user_master set hash=?,firstName=?,lastName=?,user_control=?,friendly_name=? where id=${id}`,
         [user.hash,user.firstName,user.lastName,user.Type,user.friendly_name]
       );
}

async function _delete(id) {
    const rows1 = await db.query(
        `delete from user_master where id=${id}`);
    //await User.findByIdAndRemove(id);
}