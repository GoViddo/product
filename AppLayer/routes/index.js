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
        let walletName = req.body.walletName;
        var resp = {};
        if (!email || !password || !firstName || !lastName || !walletName) {

            resp.message = "Missing first name, last name, email, wallet name or password";
            return res.status(400).send(resp);

        }

        let userQuery = "SELECT * FROM user_table WHERE email_id = '" + email + "';";

        db.query(userQuery, function (err, result) {
            var resp = {};
            if (err) {
                resp.message = err;
                return res.status(500).send(resp);
            }
            if (result.length) {
                resp.message = "User with this email already exists";
                return res.status(400).send(resp);
            } else {

                let password = "demopassword=";
                
                let cleosWalletUnlockQuery = "cleos wallet unlock --password " + password;
                let cleosCreateActiveKeys = "cleos create key --to-console";
                let cleosCreateOwnerKeys = "cleos create key --to-console";
                
                var checkWalletNamePromise = new Promise(function (resolve, reject) {
                    //to check account name avilability
                    let cleosCheckWalletName = "cleos -u https://eos.greymass.com/ get account " + walletName + " --json";

                    cmd.get(
                        cleosCheckWalletName,
                        function (err, data, stderr) {
                            if (err == null) {
                                resp.walletMessage = "Wallet Name Not Available";
                                console.log("Account Name Not Avilabile" + data);
                                reject("Account Name Not Avilabile");
                            }
                            else {
                                resp.walletMessage = "Wallet Name Available";
                                console.log("Wallet Name Avilabile" + err);
                                resolve("Wallet Name Avilabile");
                            }
                        }
                    );
                }).catch(console.log("Wallet Name Not Available"));

                checkWalletNamePromise.then(function () {
                    return new Promise(function (resolve, reject) {
                        cmd.get(
                            cleosWalletUnlockQuery,
                            function (err, data, stderr) {
                                if(err == null)
                                {
                                    resp.walletUnlockingMessage = "Wallet Not Unlocked - Password is wrong";
                                    console.log("Wallet Unlocking status = " + data);
                                }
                                else{
                                    resp.walletUnlockingMessage = "Wallet Unlocked Successfully";
                                    console.log("Wallet Unlocking Error = " + err);
                                }
                                resolve(data);
                                
                                
                            }
                        );
                    });
                }).then(function () {
                    return new Promise(function (resolve, reject) {
                        cmd.get(
                            cleosCreateActiveKeys,
                            function (err, data, stderr) {
                                if(err == null)
                                {
                                    resp.createActiveKeyMsg = "Active Keys Not Created";
                                    reject("Active Keys Not Created");
                                }
                                else
                                {
                                var arr = data.split(": ");
                                var Key = arr[1].split("Public key");
                                var activePrivateKey = Key[0];
                                var activePublicKey = arr[2];
                                var activePrivateKey = activePrivateKey.replace(/\n/g, '');
                                var activePublicKey = activePublicKey.replace(/\n/g, '');
                                resp.createActiveKeyMsg = "Keys Not Created";
                                resp.activePrivateKey = activePrivateKey;
                                resp.activePublicKey = activePublicKey;

                                console.log("Active Private Key =" + activePrivateKey);
                                console.log("Active Public Key =" + activePublicKey);
                                resolve(resp);
                                }
                            }
                        )
                    })
                }).then(function (resp) {
                    return new Promise(function (resolve, reject) {
                        cmd.get(
                            cleosCreateOwnerKeys,
                            function (err, data, stderr) {
                                if(err == null)
                                {
                                    resp.createOwnerKeysMsg = "Owner Keys Creation Failed";
                                    reject("Owner Keys Creation Failed");
                                }
                                else
                                {
                                var arr = data.split(": ");
                                var Key = arr[1].split("Public key");
                                var ownerPrivateKey = Key[0];
                                var ownerPrivateKey = ownerPrivateKey.replace(/\n/g, '');
                                var ownerPublicKey = arr[2];
                                var ownerPublicKey = ownerPublicKey.replace(/\n/g, '');
                                resp.createOwnerKeysMsg = "Owner Keys Created";

                                resp.ownerPrivateKey = ownerPrivateKey;
                                resp.ownerPublicKey = ownerPublicKey;

                                console.log("Owner Private Key =" + ownerPrivateKey);
                                console.log("Owner Public Key =" + ownerPublicKey);

                                let createEOSWalletCommand = "cleos -u https://eos.greymass.com/ system newaccount hellogoviddo " + walletName + " --stake-net '0.01 EOS' --stake-cpu '0.01 EOS' --buy-ram '0.1 EOS' " + ownerPublicKey + " " + resp.activePublicKey;
                                console.log('Command to be executed', createEOSWalletCommand);
                                //execute again cmd.get and run the createWalletCommand and return onwer and active keys with wallet name to the user

                                resolve(resp);
                                }
                            }
                        );
                    })
                }).then(function (resp) {
                    // send the user's details to the database
                    let query = "INSERT INTO user_table (first_name, last_name, email_id, password) VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "')";
                    db.query(query, function (err, result) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        resp.message = "Registration successful";
                        return res.status(200).send(resp);
                    });
                });
            }
        }).catch(console.log("Wallet Name Not Available"));
    }
};
