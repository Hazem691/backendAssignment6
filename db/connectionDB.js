import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('blzhqgbsdf0nvi6md5ke', 'ubjeg4ea3dx0crnk', 'qdr6yH01gVaiIRgFwS20', {
    host: 'blzhqgbsdf0nvi6md5ke-mysql.services.clever-cloud.com',
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