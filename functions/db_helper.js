
import knex from "knex";
// const port = 3311;
const port = 3306;
const user = 'root';
const password = '12345';
const database = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: user,
        port: port,
        password: password,
        database: 'enrollment',
        timezone: 'UTC',
        dateStrings: true
    }
});
export { database }