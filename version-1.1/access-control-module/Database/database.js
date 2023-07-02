const mysql = require('mysql');
const file = require('./Config.js')

class DataBaseHandler
{
  constructor(DBConfig)
  {
    this.mysqlConnection = mysql.createConnection
      ({
          host: DBConfig.host,
          user: DBConfig.user,
          password: DBConfig.password,
          database: DBConfig.database,
      });
  }
  connect()
  {
    this.mysqlConnection.connect((error) => 
    {
      if (error) 
      {
        console.error(error);
        return;
      }
      console.log('Conexion exitosa');
    });
    
  }
  callStoredProcedure(...args)
  {

    let parameters = args.slice(1).map( ()=> '?').join(',')
    let sql = `CALL ??(${parameters})`;
    console.log(args)
    
    this.mysqlConnection.query( sql ,args,( err,result ) =>
    {
      if( err )
      {
        console.log( err )
      }
      else 
      {
        console.log(result )
      }
    })
  }
  disconnect()
  {
    console.log('disconnected from the database')
    this.mysqlConnection.end();
  }
}

module.exports = 
{
  DataBaseHandler
};
