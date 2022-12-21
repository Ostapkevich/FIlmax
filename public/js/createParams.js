/*jshint esversion:8 */
const keys = require("../../keys");
class CreateConnectionParams {
    constructor(){
        this.host= keys.host;
        this.user=keys.user;
        this.password=keys.password;
        this.database= keys.database;
    }
}
class CreatePoolParams{
    constructor(){
        this.host= keys.host;
        this.user=keys.user;
        this.password=keys.password;
        this.database= keys.database;
        this.waitForConnections= true;
        this.connectionLimit= 10;
        this.queueLimit= 0;
    }
        
}
class CreateSessionParams {
    constructor(){
       this.secret=keys.secret;
       this.key= keys.key;
    }
}

module.exports={CreateConnectionParams,CreatePoolParams,CreateSessionParams};