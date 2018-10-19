module.exports = {

    // TODO: Remove this test API once we have at least 1 GET API
    test: (req, res) => {
        res.status(200).send("Nice! Server is working.");
    },

    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).send("Missing critical information");
        }

        let userQuery = "SELECT * FROM db_goviddo.user_table WHERE email_id = ?;";

        db.execute(userQuery, [email], function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!result.rows || result.rows.length == 0) {
                return res.status(400).send("User does not exist");
            } else {
                const row = result.first();
                if (row.password == password) {
                    return res.status(200).send({
                        message: "Login success",
                        firstname: row.first_name,
                        lastname: row.last_name,
                        email: row.email_id,
                        address: row.address,
                        country: row.country,
                        phone: row.phone_no,
                        gender: row.gender,
                        dob: row.birth_date
                    });
                } else {
                    return res.status(400).send("Password invalid");
                }
            }
        });
    },

    register: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).send("Missing critical information");
        }

        let userQuery = "SELECT * FROM db_goviddo.user_table WHERE email_id = ?;";

        db.execute(userQuery, [email], function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.status(400).send("Username already exists");
            } else {
                
                // Fetch user's details to calculate next user id
                // let query = "SELECT user_id FROM db_goviddo.user_table;";
                // db.execute(query, function (err, result) {
                //     if (err) {
                //         return res.status(500).send(err);
                //     }
                //     const row = result.first();
                // });
                
                // send the user's details to the database
                let query = "INSERT INTO user_table (email_id, password) VALUES ('" + email + "', '" + password + "')";
                db.execute(query, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send("Registration successful");
                });
            }
        });
    }
};