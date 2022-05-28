const {Pool } = require("pg");

require("dotenv").config();

const connectionString = `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.pgport}/${process.env.database}`
const pool = new Pool({
    connectionString: connectionString
})


module.exports = pool