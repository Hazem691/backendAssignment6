import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('sixthassignment', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

const ConnectionDB = async ()=>{
    return await sequelize.sync({alter : true , alter : true}).then(()=>{
        console.log('connection db intialized successfully');
    }).catch((err)=>{
        console.log('connected initialized failed ...',err);
    })
}

export default ConnectionDB ;