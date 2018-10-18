module.exports = {

    // TODO: Remove this test API once we have at least 1 GET API
    test: (req, res) => {
        res.status(200).send("Nice! Server is working.");
    },

    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return res.status(400).send("Missing critical information");
        }

        let usernameQuery = "SELECT * FROM `users` WHERE username = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            debugger
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length == 0) {
                return res.status(400).send("User does not exist");
            } else {

                if (result[0].password == password) {
                    return res.status(200).send("Login successful");
                } else {
                    return res.status(400).send("Password invalid");
                }
            }
        });
    },

    register: (req, res) => {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        if (!username || !email || !password) {
            return res.status(400).send("Missing critical information");
        }

        let usernameQuery = "SELECT * FROM `users` WHERE username = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.status(400).send("Username already exists");
            } else {
                // send the user's details to the database
                let query = "INSERT INTO `users` (username, email, password) VALUES ('" +
                    username + "', '" + email + "', '" + password + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send("Registration successful");
                });
            }
        });
    }
};