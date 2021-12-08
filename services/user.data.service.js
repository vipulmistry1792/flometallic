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
    create
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
    
    // const user =`{
    //     "username":"${userParam.username}",
    //     "password":"${userParam.password}",
    //     "lastName":"${userParam.lastName}"
    // }`;
    const user=userParam;
   /// console.log(user);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
//console.log(user);
    // save user
    const rows1 = await db.query(
        `insert into user_master (username,hash,firstName,lastName,user_control) values (?,?,?,?,0)`,
    [user.username, user.hash,user.firstName,user.lastName]
       );
    // await user.save();
}

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }