const mysql = require("mysql");

let connected = false;

const connection = mysql.createConnection({
    host: "localhost",
    user: "abdullah",
    password: "abc123",
    database: "ticketr",
    dateStrings: "date",
});

function dbService() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log(err);
                reject();
            }
            resolve();
        });
    });
}
function checkDbConnection(req, res, next) {
    if (!connected) {
        return dbService()
            .then(() => {
                connected = true;
                console.log("connected");
                return next();
            })
            .catch(() => {
                connected = false;
                return;
            });
    }
    next();
}
function insert(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, [values], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}
function insertRead(query, values, callback) {
    connection.query(query, [values], (err, results) => {
        if (err) {
            console.log(err);
            callback();
        } else {
            return callback(results);
        }
    });
}
function retrieve(query, values, callback) {
    connection.query(query, values, (err, results) => {
        if (err) {
            console.log(err);
            callback();
        } else {
            return callback(results);
        }
    });
}
function update(query, values) {
    connection.query(query, values, (err, results) => {
        if (err) console.log(err);
        console.log(results);
    });
}
function deleteRecord(query, values) {
    console.log(values);
    connection.query(query, values, (err, results) => {
        if (err) console.log(err);
    });
}

module.exports = {
    insert,
    dbService,
    retrieve,
    update,
    deleteRecord,
    checkDbConnection,
    insertRead,
};
