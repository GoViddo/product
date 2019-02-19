module.exports = {

    getConfig: (req, res) => {
        // An example to read config from a JSON file
        // const fs = require('fs');
        // fs.readFile('mockData.json', (err, data) => {
        //     if (err) res.status(500).send(err);
        //     res.status(200).send(JSON.parse(data));
        // });

        let configQuery = "SELECT * FROM config_table";

        db.query(configQuery, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }

            let data = {};

            for (var i = 0; i < result.length; i++) {
                data[result[i].config_key] = result[i].config_value;
            }

            return res.status(200).send(data);
        });
    },

    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).send("Missing critical information");
        }

        let userQuery = "SELECT * FROM user_table WHERE email_id = '" + email + "';";

        db.query(userQuery, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!result || !result.length) {
                return res.status(400).send("User does not exist");
            } else {
                const row = result[0];
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
                    return res.status(400).send("Invalid Password");
                }
            }
        });
    },

    register: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send("Missing first name, last name, email or password");
        }

        let userQuery = "SELECT * FROM user_table WHERE email_id = '" + email + "';";

        db.query(userQuery, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length) {
                return res.status(400).send("User with this email already exists");
            } else {
                // send the user's details to the database
                let query = "INSERT INTO user_table (first_name, last_name, email_id, password) VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "')";
                db.query(query, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }




                    // cmd.run('cleos wallet unlock --password testpwd').then(function() {
                    //     console.log('wallet unlocked!');
                    // }, function(error) {
                    //     console.log('Error unlocking wallet!', error);
                    // });

                    let password = "testpwd";

                    let cleosWalletUnlockQuery = "cleos wallet unlock --password "+password;

                    let cleosCreateActiveKeys = "cleos create key --to-console";
                    let cleosCreateOwnerKeys = "cleos create key --to-console";

                    cmd.get(
                        cleosWalletUnlockQuery,
                        function(err, data, stderr){
                            console.log('Wallet Unlocking Output :\n\n',data);
                            console.log('Wallet Unlocking Output :\n\n',err);


                        }
                    );



                    cmd.get(
                        cleosCreateActiveKeys,
                        function(err, data, stderr){
                            console.log('Active Keys :\n\n',data);

                            var arr = data.split(": ");

                            var Key = arr[1].split("Public key");
                            var activePrivateKey = Key[0];

                            var activePublicKey = arr[2];

                            console.log("Active Private Key ="+activePrivateKey);
                            console.log("Active Public Key ="+activePublicKey);
                        }
                    );


                    cmd.get(
                        cleosCreateOwnerKeys,
                        function(err, data, stderr){
                         
                            console.log('Owner Keys :\n\n',data);
                            

                            var arr = data.split(": ");

                            var Key = arr[1].split("Public key");
                            var activePrivateKey = Key[0];

                            var activePublicKey = arr[2];

                            console.log("Owner Private Key ="+activePrivateKey);
                            console.log("Owner Public Key ="+activePublicKey);

                        }
                    );



                    return res.status(200).send("Registration successful");
                });
            }
        });
    }
};
