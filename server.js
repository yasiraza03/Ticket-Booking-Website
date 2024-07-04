const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
    dbService,
    insert,
    retrieve,
    update,
    deleteRecord,
    checkDbConnection,
    insertRead,
} = require("./dbService.js");
const { auth, setUser, authRole } = require("./auth");

let activeUsers = [];

const app = express();
app.use(
    cors({
        origin: "http://127.0.0.1:3000",
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkDbConnection);

app.post("/register", (req, res) => {
    const data = req.body;
    console.log(req.body);
    query =
        "insert into users (name,email,password,contact,city,role) values (?);commit;";
    values = [
        req.body.name,
        req.body.email,
        req.body.pass,
        req.body.contact,
        req.body.city,
        req.body.role,
    ];
    insert(query, values)
        .then(() => res.send({ message: "Successful" }))
        .catch((err) => res.send({ message: "Failed", error: err }));
});
app.post("/login", auth, (req, res) => {
    let data = { id: null, role: null };
    console.log("Here in server.js");
    if (!req.results) {
        res.send(data);
        return;
    }
    data = {
        id: req.results[0].id,
        role: req.results[0].role,
    };
    activeUsers.push(data);
    res.send(data);
});
app.get("/dashboard", (req, res) => {
    const query =
        "select u.name,u.password,u.contact,u.city,e.event_id,e.event_name,p.standard,p.premium,p.vip,e.number,t.type,count(*) as count \
        from users u,ticket t,events e,price p where u.id=? and e.price=p.price_id and\
    u.id=t.user_id and e.event_id=t.event_id group by t.event_id,t.type";
    values = [req.query.id];
    retrieve(query, values, function (data) {
        if (!data.length) {
            temp = "select * from users where id=?";
            retrieve(temp, [req.query.id], function (response) {
                res.send(response);
            });
        } else res.send(data);
    });
});
app.get("/adminDashboard", (req, res) => {
    const query = "select * from users where id=?";
    values = [req.query.id];
    retrieve(query, values, function (data) {
        res.send(data);
    });
});
app.post("/addVenue", (req, res) => {
    query = "insert into venue (venue_name,city,address) values (?);commit;";
    values = [req.body.name, req.body.city, req.body.address];
    insert(query, values);
    res.send({ message: "ok" });
});
app.post("/admin/addEvent", (req, res) => {
    console.log(req.body);
    query = "insert into price (standard,premium,vip) values (?);commit;";
    values = [req.body.standard, req.body.premium, req.body.vip];
    insertRead(query, values, (data) => {
        price = data.insertId;
        query =
            "insert into events (event_name,venue,organizer,number,time,price,date,added_by) values (?);commit;";
        values = [
            req.body.name,
            req.body.venue,
            req.body.organizer,
            req.body.capacity,
            req.body.time,
            price,
            req.body.date,
            req.body.id,
        ];
        insert(query, values);
    });

    res.send({ message: "ok" });
});
app.get("/getEvents", (req, res) => {
    query =
        "select * from events e,venue v,price p where e.is_approved=? and e.venue=v.venue_id and e.price=p.price_id;";
    retrieve(query, [req.query.approved], function (data) {
        console.log(data);
        res.send(data);
    });
});
app.post("/addTicket", (req, res) => {
    console.log(req.body);
    query = "insert into ticket (event_id,user_id,type) values (?);commit;";
    values = [req.body.event_id, req.body.user_id, req.body.type];
    for (let i = 0; i < req.body.count; i++) {
        insert(query, values);
    }
    available = req.body.number - req.body.count;
    console.log(req.body.number, req.body.count);
    query = "update events set number = ? where event_id = ?;commit;";
    values = [available, req.body.event_id];
    update(query, values);
    query = "select * from receipt where user_id=? and event_id=? and type=?";
    values = [req.body.user_id, req.body.event_id, req.body.type];
    retrieve(query, values, (data) => {
        console.log(data);
        if (!data.length) {
            query =
                "insert into receipt (user_id,event_id,quantity,amount,type) values (?);commit;";
            values = [
                req.body.user_id,
                req.body.event_id,
                req.body.count,
                req.body.amount,
                req.body.type,
            ];
            insert(query, values);
        } else {
            query =
                "update receipt set quantity=?,amount=? where receipt_id=?;commit;";
            let newAmount = req.body.amount + data[0].amount;
            let newCount = req.body.count + data[0].quantity;
            values = [newCount, newAmount, data[0].receipt_id];
            update(query, values);
        }
    });
    console.log(available);
    res.send({ message: "ok" });
});
app.post("/updateTicket", (req, res) => {
    console.log("price", req.body.price);
    query = "delete from ticket where event_id=? and type=? limit ?;commit;";
    values = [req.body.id, req.body.type, req.body.newCount];
    deleteRecord(query, values);
    const newCount = req.body.count - req.body.newCount;
    if (!newCount) {
        query =
            "delete from receipt where user_id=? and event_id=? and type=?;commit;";
        values = [req.body.user_id, req.body.id, req.body.type];
        deleteRecord(query, values);
    } else {
        console.log("newcount", newCount);
        query =
            "update receipt set quantity=?,amount=? where user_id=? and event_id=? and type=?;commit;";
        amount = req.body.amount - req.body.newCount * req.body.price;
        values = [
            newCount,
            amount,
            req.body.user_id,
            req.body.id,
            req.body.type,
        ];
        update(query, values);
    }
    const newAvailable = req.body.available + req.body.newCount;
    query = "update events set number=? where event_id=?;commit;";
    values = [newAvailable, req.body.id];
    update(query, values);
    res.send({ msg: "ok ki report he" });
});
app.get("/customers", (req, res) => {
    query = "select * from users where role=?";
    values = [req.query.category];
    retrieve(query, values, function (data) {
        console.log(data);
        res.send(data);
    });
});
app.get("/approvedEvents", (req, res) => {
    query =
        "select * from events,venue where events.is_approved=1 and events.approved_by=? and events.venue=venue.venue_id";
    retrieve(query, [req.query.id], (data) => {
        console.log(data);
        res.send(data);
    });
});
app.get("/organizerEvents", (req, res) => {
    query =
        "SELECT e.event_name,v.venue_name,e.organizer,p.standard,p.premium,p.vip,e.number,e.time,e.date,sum(r.amount)\
    as 'Revenue',e.event_id FROM events e,users u,receipt r,venue v,price p \
    WHERE u.id=e.added_by and u.id=? and e.event_id=r.event_id and e.venue=v.venue_id and e.price=p.price_id;";
    values = [req.query.id];
    retrieve(query, values, (data) => {
        console.log("here", data);
        res.send(data);
    });
});
app.get("/getVenues", (req, res) => {
    query = "select * from venue where is_approved=?;";
    retrieve(query, [req.query.approved], (data) => {
        console.log(data);
        res.send(data);
    });
});
app.post("/deleteVenue", (req, res) => {
    query = "delete from venue where venue_id in (?);commit;";
    values = [req.body.data];
    deleteRecord(query, values);
    res.send({ msg: "ok" });
});
app.post("/delete", (req, res) => {
    if (req.body.table === "events")
        query = "delete from events where event_id in (?);commit;";
    else if (req.body.table === "users")
        query = "delete from users where id in (?);commit;";
    else {
        query =
            "select event_id,user_id,sum(quantity) as count from receipt where user_id in (?) group by event_id,user_id;";
        values = [req.body.data];
        retrieve(query, values, (response) => {
            response.forEach((element) => {
                query =
                    "update events set number=number+? where event_id=?;commit;";
                values = [element.count, element.event_id];
                update(query, values);
            });
        });
        query = "delete from receipt where user_id in (?);commit;";
        values = [req.body.data];
        deleteRecord(query, values);
        query = "delete from ticket where user_id in (?);commit;";
    }
    values = [req.body.data];
    deleteRecord(query, values);
    res.send({ message: "record deleted" });
});
app.post("/update", (req, res) => {
    query =
        "update events set is_approved=1,approved_by=? where event_id in (?);commit;";
    values = [req.body.adminId, req.body.data];
    update(query, values);
    res.send({ message: "Event Approved" });
});
app.post("/updateVenue", (req, res) => {
    query =
        "update venue set is_approved=1,approved_by=? where venue_id in (?);commit;";
    values = [req.body.adminId, req.body.data];
    update(query, values);
    res.send({ message: "Venue Approved" });
});
app.post("/updateDetails", (req, res) => {
    query =
        "update users set name=?,contact=?,city=?,password=? where id=?;commit;";
    values = [
        req.body.name,
        req.body.contact,
        req.body.city,
        req.body.pass,
        req.body.id,
    ];
    update(query, values);
    res.send({ msg: "ok" });
});
app.post("/updateEvent", (req, res) => {
    query =
        "update events set event_name=?,organizer=?,time=?,date=?,number=? where event_id=?;commit;";
    values = [
        req.body.name,
        req.body.organizer,
        req.body.time,
        req.body.date,
        req.body.available,
        req.body.id,
    ];
    update(query, values);
    res.send({ msg: "ok" });
});
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
