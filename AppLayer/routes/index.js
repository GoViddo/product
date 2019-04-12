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

                data[result[i].config_key] = result[i].config_value;;

            }

            return res.status(200).send(data);
        });
    },

    generateVideoOtp: (req, res) => {
        let urlPath = req.originalUrl;

        let arr = urlPath.split("=", -1);
        let videoId = arr[1];


        //console.log(videoId);

        var request = require("request");

        var options = {
            method: 'POST',
            url: 'https://dev.vdocipher.com/api/videos/' + videoId + '/otp',
            headers:
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Apisecret 8522c382576c20779b543c305ada4a1459323eeba69604ab06410536f03ad718'
            },
            body: { ttl: 300 },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            //console.log(body);
            return res.status(200).send(body);
        });

    },

    getSliderImageData: (req, res) => {
        let sliderMaxCount = req.body.sliderMaxCount;

        let selectSliderImagesQuery = "SELECT * FROM `video_table` WHERE `banner_image` != '' and `status` = 1 ORDER BY video_id DESC LIMIT " + sliderMaxCount;

        db.query(selectSliderImagesQuery, function (err, result) {

            let resp = {};

            if (err) {
                resp.message = "failed";
                resp.data = err;
                return res.status(500).send(resp);
            }

            let data = [];
            resp.message = "success";
            for (var i = 0; i < result.length; i++) {
                sliderDetails = {};

                sliderDetails.video_id = result[i].video_id;
                sliderDetails.slider_image = result[i].banner_image;
                sliderDetails.shorten_text = result[i].shorten_text;
                sliderDetails.vdo_cipher_id = result[i].vdo_cipher_id;

                data.push(sliderDetails);

            }

            resp.data = data;


            return res.status(200).send(resp);


        });

    },


    getPreviewData: (req, res) => {
        let previewMaxCount = req.body.previewMaxCount;
        let previewLastId = req.body.previewLastId;


        let selectSliderImagesQuery = "SELECT * FROM `video_table` WHERE video_id > " + previewLastId + " and `status` = 1 ORDER BY video_id ASC LIMIT " + previewMaxCount;

        db.query(selectSliderImagesQuery, function (err, result) {

            let resp = {};

            if (err) {
                resp.message = "failed";
                resp.data = err;
                return res.status(500).send(resp);
            }

            let data = [];
            resp.message = "success";
            for (var i = 0; i < result.length; i++) {
                previewDetails = {};

                previewDetails.video_id = result[i].video_id;
                previewDetails.slider_image = result[i].home_image;
                previewDetails.shorten_text = result[i].shorten_text;
                previewDetails.vdo_cipher_id = result[i].vdo_cipher_id;

                data.push(previewDetails);

            }

            resp.data = data;


            return res.status(200).send(resp);


        });

    },




    getSubscriptionList: (req, res) => {
        let emailId = req.body.emailId;

        let userIdSelectionQuery = "SELECT * FROM `user_table` WHERE `email_id` = '"+emailId+"'";  
        
        db.query(userIdSelectionQuery, function(erre, result1){

            var userid = result1[0].user_id;


        let selectSliderImagesQuery = "SELECT * FROM `subscirption_list` WHERE `user_id` = '"+userid+"'";

       
        db.query(selectSliderImagesQuery, function (err, result) {

            let resp = {};

            if (err) {
                resp.message = "failed";
                resp.data = err;
                return res.status(500).send(resp);
            }

            let data = [];
            resp.message = "success";
            for (var i = 0; i < result.length; i++) {
                previewDetails = {};

                var channelId = result[i].subscription_channel_id;
                previewDetails.video_id = result[i].subscription_channel_id;
                
           
                data.push(previewDetails);
                
            }
           
                resp.data = data;

                return res.status(200).send(resp);
            

        });



        });

    },


    getUserHistory: (req, res)=> {

        let userEmail = req.body.userEmial;
        resp = {};
        data = [];
        
        let getUserIdQuery = "SELECT * FROM `user_table` WHERE `email_id` = '"+userEmail+"'";

        db.query(getUserIdQuery, function(err, result){

            var userId = result[0].user_id;

            let getHistoryQuery = "SELECT * FROM `video_views_table` WHERE `view_user` = '"+userId+"' ORDER BY `view_id` DESC LIMIT 10";

            db.query(getHistoryQuery, function(errr , resulthq){

                resp.message = "success";

                var chk = resulthq.length;

                var j = 0;

                for (var i = 0; i < resulthq.length; i++) {
                     j = j + 1;
            
                    ress = {};

                    var videoId = resulthq[i].video_id;
                    ress.videoId = videoId;

                    let getVideoDetailsQuery = "SELECT * FROM `video_table` WHERE `video_id` = '"+videoId+"'";

                    db.query(getVideoDetailsQuery, function(errm, resultm){

                        var videoName = resultm[0].show_name;
                        var home_image = resultm[0].home_image;
                        var shorten_text = resultm[0].shorten_text;
                        var vdo_cipher_id = resultm[0].vdo_cipher_id;
                        var video_description = resultm[0].video_description;
                        
                        ress.videoName = videoName;
                        ress.home_image = home_image;
                        ress.shorten_text = shorten_text;
                        ress.vdoCipherId = vdo_cipher_id;
                        ress.videoDescription = video_description;

                        data.push(ress);

        
                        console.log(j + " chk = "+ chk );

                    });

                }



            });

        });

    },

    getChannelList: (req, res) => {
    
        let channelId = req.body.channelId;

        let channelDetailsQuery = "SELECT * FROM `channel_list` WHERE `channel_id` = '"+channelId+"' and `status` = 1";

        var previewDetails = {};
                
        db.query(channelDetailsQuery, function(errr, resultm){

            previewDetails.channelId = channelId;
            previewDetails.slider_image = resultm[0].channel_logo_url;
            previewDetails.shorten_text = resultm[0].channel_name;

            return res.status(200).send(previewDetails);

        });


    },


    saveViewInformation: (req, res) => {
        let vdoCipherId = req.body.vdoCipherId;
        let userEmailId = req.body.userEmailId;
        let videoViewDuration = req.body.videoViewDuration;


        let selectVideoIdQuery = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '" + vdoCipherId + "'";

        db.query(selectVideoIdQuery, function (err, result) {

            let resp = {};

            if (err) {
                resp.message = "failed";
                resp.data = err;
                return res.status(500).send(resp);
            }

            let videoId = result[0].video_id;

            let userDetailsQuery = "SELECT * FROM `user_table` WHERE `email_id` = '" + userEmailId + "'";

            db.query(userDetailsQuery, function (err1, result1) {

                if (err1) {
                    resp.message = "failed";
                    resp.data = err;
                    return res.status(500).send(resp);
                }

                let userId = result1[0].user_id;


                let insertIntoVideoViewQuery = "INSERT INTO `video_views_table`(`view_user`, `video_id`, `total_video_played_time`) VALUES (" + userId + "," + videoId + ",'" + videoViewDuration + "')";


                db.query(insertIntoVideoViewQuery, function (err2, result2) {

                    if (err1) {
                        resp.message = "failed";
                        resp.data = err;
                        return res.status(500).send(resp);
                    }


                    let data = [];
                    resp.message = "success";

                    reviewDetails = {};

                    reviewDetails.userId = userId;
                    reviewDetails.videoId = videoId;

                    data.push(reviewDetails);

                    resp.data = data;
                    return res.status(200).send(resp);


                });


            });




        });

    },



    getSubscriptionData: (req, res) => {
        let channelId = req.body.channelId;


        let selectSliderImagesQuery = "SELECT * FROM `channel_list` WHERE `channel_id` = " + channelId;

        
        db.query(selectSliderImagesQuery, function (err, result) {

            let resp = {};

            if (err) {
                resp.message = "failed";
                resp.data = err;
                return res.status(500).send(resp);
            }

            let data = [];
            resp.message = "success";

            var chnnelName = result[0].channel_name;


            let selectDataQuery = "SELECT * FROM `video_table` WHERE `video_channel_name` = '" + chnnelName + "'";

            
            db.query(selectDataQuery, function (error, resultm) {
                if (error) {
                    resp.message = "failed";
                    resp.data = err;
                    return res.status(500).send(resp);
                }
                else {

                    for (var i = 0; i < resultm.length; i++) {

                        videoDetails = {};

                        videoDetails.video_id = resultm[i].video_id;
                        videoDetails.home_image = resultm[i].home_image;
                        videoDetails.shorten_text = resultm[i].shorten_text;
                        videoDetails.vdo_cipher_id = resultm[i].vdo_cipher_id;

                        data.push(videoDetails);

                    }
                    resp.data = data;
                    return res.status(200).send(resp);


                }

            })





        });

    },




    getVideoData: (req, res) => {
        let videoGenere = req.body.videoGenere;
        let videoEndLimit = req.body.videoLimit;
        let videoLastId = req.body.videoLastId;

        var videoGenereId = 0;

        var resp = {};

        let videoGenereIdQuery = "SELECT * FROM `video_genere_table` WHERE `video_genere_name` = '" + videoGenere + "'";

        resp.video_genere = videoGenere;


        db.query(videoGenereIdQuery, function (err, result) {

            if (err) {
                return res.status(500).send(err);
            }

            const row = result[0];

            videoGenereId = row.video_genere_id;




            let videoDataQuery = "SELECT * FROM `video_table` WHERE `status` = 1 and `video_genere_type` = " + videoGenereId + " and `video_id` > " + videoLastId + " ORDER BY `video_id` ASC LIMIT " + videoEndLimit;


            db.query(videoDataQuery, function (err, result) {
                if (err) {
                    return res.status(500).send(err);
                }


                resp.message = "success";
                data = [];

                for (var i = 0; i < result.length; i++) {

                    videoDetails = {};

                    videoDetails.video_id = result[i].video_id;
                    videoDetails.home_image = result[i].home_image;
                    videoDetails.shorten_text = result[i].shorten_text;
                    videoDetails.vdo_cipher_id = result[i].vdo_cipher_id;
                    videoDetails.video_genere = videoGenere;

                    data.push(videoDetails);

                }

                resp.data = data;


                return res.status(200).send(resp);

            });




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

                return res.status(200).send({ message: "User does not exist" });
            } else {
                const row = result[0];
                if (row.password == password) {
                    return res.status(200).send({
                        message: "Login success",
                        firstname: row.first_name,
                        lastname: row.last_name,
                        email: row.email_id,
                        walletName: row.eosio_account_name,
                        address: row.address,
                        country: row.country,
                        phone: row.phone_no,
                        gender: row.gender,
                        dob: row.birth_date
                    });
                } else {

                    return res.status(200).send({ message: "Invalid Password" });
                }
            }
        });
    },

    checkWalletName: (req, res) => {
        let walletName = req.body.walletName;
        var resp = {};

        let cleosCheckWalletName = "cleos -u https://eos.greymass.com/ get account " + walletName + " --json";

        cmd.get(
            cleosCheckWalletName,
            function (err, data, stderr) {
                if (err == null) {
                    resp.walletMessage = "Wallet Name Not Available";
                    console.log("Account Name Not Avilabile" + data);
                    return res.status(400).send(resp);
                }
                else {
                    resp.walletMessage = "Wallet Name Available";
                    console.log("Wallet Name Avilabile" + err);
                    return res.status(200).send(resp);
                }
            }
        );




    },


    likeUnlikeSstore: (req, res) => {
        let emailid = req.body.emailid;
        let likedislikestatus = req.body.likestatus;
        let videocipherid = req.body.videoid;
        resp = {};       

       let query = "SELECT * FROM `user_table` WHERE `email_id` = '" + emailid + "'";

       db.query(query, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            row = result[0];
            let userid = row.user_id;

            let selectVideoId = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '"+videocipherid+"'";
            db.query(selectVideoId, function (err, result) {

                if (err) {
                    return res.status(400).send(err);
                }
                else {
       
                    row = result[0];
                    let videoid = row.video_id;

                    let checkupdation = "SELECT * FROM `video_like_table` WHERE `video_id` = '"+videoid+"' and `user_id` = '"+userid+"'";
                    db.query(checkupdation, function (err, resultm) {

                        console.log(resultm.length)

                        if(resultm.length < 1)
                        {
                            let queryinsert = "INSERT INTO `video_like_table` (`video_like_id`, `video_id`, `user_id`, `like_status`) VALUES (NULL, '"+videoid+"', '"+userid+"', '"+likedislikestatus+"');";

                            db.query(queryinsert, function (err, result) {

                                if (err) {
                                    return res.status(400).send(err);
                                }
                                else {
                                    resp.message = "success";
                            
                                    return res.status(200).send(resp);
                                }
                
                            });
                

                        }
                        else{
                            let queryinsert = "UPDATE `video_like_table` SET `like_status`= '"+likedislikestatus+"' WHERE `video_id` = '"+videoid+"' and `user_id` = '"+userid+"'";

                            db.query(queryinsert, function (err, result) {

                                if (err) {
                                    return res.status(400).send(err);
                                }
                                else {
                                    resp.message = "success";
                            
                                    return res.status(200).send(resp);
                                }
                
                            });
                
                        }


            
           



                    });


                }

            });

            
        }
    })

    },







    subscriptChannel: (req, res) => {
        let emailid = req.body.emailid;
        let subscriptionstatus = req.body.subscriptionstatus;
        let videocipherid = req.body.videoid;
        resp = {};       

       let query = "SELECT * FROM `user_table` WHERE `email_id` = '" + emailid + "'";

       db.query(query, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            row = result[0];
            let userid = row.user_id;

            let selectVideoId = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '"+videocipherid+"'";
            db.query(selectVideoId, function (err, result) {

                if (err) {
                    return res.status(400).send(err);
                }
                else {
       
                    row = result[0];
                    let channelname = row.video_channel_name;

                    let channelidquerry = "SELECT * FROM `channel_list` WHERE `channel_name` = '"+channelname+"'";

                    db.query(channelidquerry, function (err, resultm) {

                        let channelid = resultm[0].channel_id;


                        if(subscriptionstatus == 1)
                        {
                    let checkupdation = "SELECT * FROM `subscirption_list` WHERE `subscription_channel_id` = '"+channelid+"' and `user_id` = '"+userid+"'";
                    db.query(checkupdation, function (err, resultm) {

                        console.log(resultm.length)

                        if(resultm.length < 1)
                        {
                        let queryinsert = "INSERT INTO `subscirption_list` (`subsciption_id`, `subscription_channel_id`, `user_id`) VALUES (NULL, '"+channelid+"', '"+userid+"');";

                            db.query(queryinsert, function (err, result) {

                                if (err) {
                                    return res.status(400).send(err);
                                }
                                else {
                                    resp.message = "success";
                            
                                    return res.status(200).send(resp);
                                }
                
                            });
                

                        }
                        else{

                            return res.status(200).send(resp);
                        }
                        

                    });

                }
                else{

                    let deletequery = "DELETE FROM `subscirption_list` WHERE `subscription_channel_id` = '"+channelid+"' and `user_id` = '"+userid+"'";

                    db.query(deletequery, function (err, result) {
                     
                        if (err) {
                                    return res.status(400).send(err);
                                }
                                else {
                                    resp.message = "success";
                            
                                    return res.status(200).send(resp);
                                }
                        
                    });

                }


                    });


                }

            });

            
        }
    })

    },


    getVideoRelatedDetails:(req, res) => {

        let videoId = req.body.videoId;
        let userEmail = req.body.userEmail;

        resp = {};
      
        let query = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '"+videoId+"'";

        db.query(query, function (err, result) {

            if(err)
            {
                return res.status(400).send(err);
            }
            else{

                var videoName = result[0].show_name;
                resp.videoName = videoName;
                var channelName = result[0].video_channel_name;
                resp.channelName = channelName;
                var videoDescription = result[0].video_description;
                resp.videoDescription = videoDescription;
                var videoIdd = result[0].video_id;

                let channelidquerry = "SELECT * FROM `channel_list` WHERE `channel_name` = '"+channelName+"'";

                db.query(channelidquerry, function (err, resultm) {

                    var channelid = resultm[0].channel_id;
                    var channelLogo = resultm[0].channel_logo_url;
                    resp.channelLogo = channelLogo;

                    let getuserdetials = "SELECT * FROM `user_table` WHERE `email_id` = '"+userEmail+"'";

                    db.query(getuserdetials, function(err, resultu)
                    {

                        var userId = resultu[0].user_id;

                        let userLikeStatus = "SELECT * FROM `video_like_table` WHERE `user_id` = '"+userId+"' and `video_id` = '"+videoIdd+"' ";

                    db.query(userLikeStatus, function(err, resultum)
                    {
                        if(resultum.length > 0)
                        {
                            var likestatus = resultum[0].like_status;
                        }
                        else{
                            var likestatus = 2;
                        }

                        
                        let subcriptionStatus = "SELECT * FROM `subscirption_list` WHERE `subscription_channel_id` = '"+channelid+"' and `user_id` = '"+userId+"'";

                        db.query(subcriptionStatus, function(err, resultuc)
                    {
                        if(resultuc.length > 0)
                        {
                            var subscriptionstatus = 1;
                        }
                        else{
                            var subscriptionstatus = 0;
                        }
                        resp.likestatus = likestatus;

                        resp.subscriptionstatus = subscriptionstatus;
                        

                        let viewCount = "SELECT * FROM `video_views_table` WHERE `video_id` = '"+videoIdd+"'";

                        db.query(viewCount, function(err, resultvc){

                            var viewCount = resultvc.length;
                            resp.viewCount = viewCount;



                            let likeCount = "SELECT * FROM `video_like_table` WHERE `video_id` = '"+videoIdd+"' and `like_status` = '1'";

                            db.query(likeCount, function(erre, resultlc){

                                var likeCount = resultlc.length;
                                resp.likeCount = likeCount;

                                let dislikeCount = "SELECT * FROM `video_like_table` WHERE `video_id` = '"+videoIdd+"' and `like_status` = '0'";

                                db.query(dislikeCount, function(errm, resultdlc){
                                    var dilikeCount = resultdlc.length;
                                    resp.dilikeCount = dilikeCount;

                                    return res.status(200).send(resp);


                                });


                            });

                            
                        });
                       
                        

                    });



                    });

                    });


                });

                
            }

        });
        


    },



    addComment:(req, res) => {

        let emailId = req.body.emailId;
        let comment = req.body.comment;
        let videoCipherId = req.body.videoCipherId;
        var resp = {};

        let getUserId = "SELECT * FROM `user_table` WHERE `email_id` = '"+emailId+"'";

        db.query(getUserId, function(err, result){
            var userId = result[0].user_id;


            let getVideoIdQuery = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '"+videoCipherId+"'";

        db.query(getVideoIdQuery, function (err, result) {

                var videoIdd = result[0].video_id;

                let chkQuery = "SELECT * FROM `video_comments_table` WHERE `user_id` = '"+userId+"' and `video_id` = '"+videoIdd+"'";

                db.query(chkQuery, function(errr, resulchk){

                    if(resulchk.length > 0)
                    {

                        let updateQuery = "UPDATE `video_comments_table` SET `comment`='"+comment+"' WHERE `user_id` = '"+userId+"' and `video_id` = '"+videoIdd+"' ";
                
                        db.query(updateQuery, function(errm, resultm){

                            if(err)
                            {
                                return res.status(400).send(err);
                            }
                            else{
                                resp.messgae = "success";
                                return res.status(200).send(resp);
                            }
        
                        });
        

                    }
                    else{


                let insertDataQuery = "INSERT INTO `video_comments_table` (`comment_id`, `user_id`, `video_id`, `comment`) VALUES (NULL, '"+userId+"', '"+videoIdd+"', '"+comment+"');";

                db.query(insertDataQuery, function(errm, resultm){

                    if(err)
                    {
                        return res.status(400).send(err);
                    }
                    else{
                        resp.messgae = "success";
                        return res.status(200).send(resp);
                    }

                });

                    }

                });

                


        });


        });

    },


    getCommentList: (req, res) => {

        let videoCipherId = req.body.videoCipherId;

        let getVideoIdQuery = "SELECT * FROM `video_table` WHERE `vdo_cipher_id` = '"+videoCipherId+"'";
        var resp = {};

        db.query(getVideoIdQuery, function(err, result)
        {

            var videoId = result[0].video_id;

            let getCommentsQuery = "SELECT * FROM `video_comments_table` WHERE `video_id` = '"+videoId+"' LIMIT 10";

            db.query(getCommentsQuery, function(errr, resultgc){

                if(errr)
                {
                    res.status(400).send(err);
                }
                else{

                    resp.message = "success";

                    data = [];
                    for (var i = 0; i < resultgc.length; i++) {
                        
                        commentsData = {};

                        commentsData.comment_id = resultgc[i].comment_id;
                        commentsData.userId = resultgc[i].user_id;
                        var userIdd = resultgc[i].user_id;
                        commentsData.comment = resultgc[i].comment;
                        
                        data.push(commentsData);

                    }
                    resp.data = data;
                    return res.status(200).send(resp);


                }

            });

        });

    },

    getUserProfilePics:(req, res) => {

        let userId = req.body.userId;
        resp = {};

        let userDetailsQuery = "SELECT * FROM `user_table` WHERE `user_id` = '"+userId+"'";

        db.query(userDetailsQuery, function(err, result){

            if(err)
            {
                return res.status(400).send(err);
            }
            else{
                resp.profilPic = result[0].user_profile_picture;
                resp.userName = result[0].first_name+" "+result[0].last_name;

                return res.status(200).send(resp);
            }

        });

    },

    getUserInfoForAccount: (req, res)=> {


        let emailId = req.body.emailId;

        let resp = {};

        let userDetailsQuery = "SELECT * FROM `user_table` WHERE `email_id` = '"+emailId+"'";

        db.query(userDetailsQuery, function(err, result){

            resp.user_id = result[0].user_id;
            resp.first_name = result[0].first_name;
            resp.last_name = result[0].last_name;
            resp.email_id = result[0].email_id;
            resp.eosio_account_name = result[0].eosio_account_name;
            resp.gender = result[0].gender;
            resp.phone_no = result[0].phone_no;
            resp.birth_date = result[0].birth_date;
            resp.address = result[0].address;
            resp.country = result[0].country;
            resp.user_video_choice = result[0].user_video_choice;
            resp.user_profile_picture = result[0].user_profile_picture;
            resp.notification_token = result[0].notification_token;
            resp.register_as_advisor = result[0].register_as_advisor;
            resp.register_as_producer = result[0].register_as_producer;
            resp.registration_date = result[0].registration_date;
            resp.status = result[0].status;
            
            return res.status(200).send(resp);
        

        });

    },



    getVideoGenereId: (req, res) => {

        let videoGenereName = req.body.videoGenereName;
        var resp = {};

        let query = "SELECT * FROM `video_genere_table` WHERE `video_genere_name` = '" + videoGenereName + "'";

        db.query(query, function (err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            else {
                resp.message = "success";
                row = result[0];
                resp.genereId = row.video_genere_id;
                resp.genereName = row.video_genere_name;
                resp.status = row.status;

                return res.status(200).send(resp);
            }
        })
    },

    bannerImages: (req, res) => {

        let query = "SELECT * FROM `video_table` WHERE `show_on_home_page` = 1 and `status` = 1 ORDER BY `video_id` DESC LIMIT 5";
        var resp = {};

        db.query(query, function (err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            else {
                resp.message = "success";

                data = [];

                for (var i = 0; i < result.length; i++) {
                    bannerDetails = {};

                    bannerDetails.video_id = result[i].video_id;

                    bannerDetails.show_name = result[i].show_name;

                    bannerDetails.created_date = result[i].created_date;

                    bannerDetails.director = result[i].director;

                    bannerDetails.duration = result[i].duration;

                    bannerDetails.home_image = result[i].home_image;

                    bannerDetails.banner_image = result[i].banner_image;

                    bannerDetails.producer = result[i].producer;

                    bannerDetails.shorten_text = result[i].shorten_text;

                    bannerDetails.show_on_home_page = result[i].show_on_home_page;

                    bannerDetails.slug = result[i].slug;

                    bannerDetails.starring = result[i].starring;

                    bannerDetails.vdo_cipher_id = result[i].vdo_cipher_id;

                    bannerDetails.video_tags = result[i].video_tags;

                    bannerDetails.video_description = result[i].video_description;

                    bannerDetails.video_genere_type = result[i].video_genere_type;

                    bannerDetails.video_channel_name = result[i].video_channel_name;

                    bannerDetails.production_name = result[i].production_name;

                    bannerDetails.video_views_count = result[i].video_views_count;

                    bannerDetails.video_earnings = result[i].video_earnings;

                    bannerDetails.status = result[i].status;

                    data.push(bannerDetails);
                }

                resp.data = data;

                return res.status(200).send(resp);

            }
        })

    },

    register: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let walletName = req.body.walletName;
        var resp = {};
        var activeKeys = {};
        var ownerKeys = {};
        if (!email || !password || !firstName || !lastName || !walletName) {

            resp.message = "Missing first name, last name, email, wallet name or password";
            return res.status(400).send(resp);


        }

        let userQuery = "SELECT * FROM user_table WHERE email_id = '" + email + "';";

        db.query(userQuery, function (err, result) {
            var resp = {};
            if (err) {
                resp.message = err;
                return res.status(200).send(resp);
            }
            if (result.length) {
                resp.message = "User with this email already exists";
                return res.status(200).send(resp);
            } else {

                let walletPassword = "PW5KNGHsfKMvje9TgwFTyWAY8nLLGxARdCvmbXy1KQNcxurhGaiB5";

                let cleosWalletUnlockQuery = "cleos wallet unlock --password " + walletPassword;
                let cleosCreateActiveKeys = "cleos create key --to-console";
                let cleosCreateOwnerKeys = "cleos create key --to-console";

                var checkWalletNamePromise = new Promise(function (resolve, reject) {
                    //to check account name avilability
                    //mainnet url
                    //let cleosCheckWalletName = "cleos -u https://eos.greymass.com/ get account " + walletName + " --json";

                    //testnet url
                    let cleosCheckWalletName = "cleos -u http://junglehistory.cryptolions.io get account " + walletName + " --json";

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
                });

                checkWalletNamePromise.catch(function () {
                    resp.message = "Wallet Not Available please try new name";
                    console.log("Promise Rejected");
                    return res.status(500).send(resp);
                });


                checkWalletNamePromise.then(function () {
                    return new Promise(function (resolve, reject) {
                        cmd.get(
                            cleosWalletUnlockQuery,
                            function (err, data, stderr) {
                                if (err != null) {
                                    resp.walletUnlockingMessage = "Wallet Not Unlocked - Password is wrong";
                                    console.log("Wallet Unlocking status = " + data);
                                }
                                else {
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

                                var arr = data.split(": ");
                                var Key = arr[1].split("Public key");
                                var activePrivateKey = Key[0];
                                var activePublicKey = arr[2];
                                var activePrivateKey = activePrivateKey.replace(/\n/g, '');
                                var activePublicKey = activePublicKey.replace(/\n/g, '');
                                //resp.createActiveKeyMsg = "Active Keys Created";


                                activeKeys.activePrivateKey = activePrivateKey;
                                activeKeys.activePublicKey = activePublicKey;

                                resp.activePublicKey = activePublicKey;

                                activeKeysArray = [];
                                activeKeysArray.push(activeKeys);
                                resp.activeKeys = activeKeysArray;

                                console.log("Active Private Key =" + activePrivateKey);
                                console.log("Active Public Key =" + activePublicKey);
                                resolve(resp);

                            }
                        )
                    })
                }).then(function (resp) {
                    return new Promise(function (resolve, reject) {
                        cmd.get(
                            cleosCreateOwnerKeys,
                            function (err, data, stderr) {

                                var arr = data.split(": ");
                                var Key = arr[1].split("Public key");
                                var ownerPrivateKey = Key[0];
                                var ownerPrivateKey = ownerPrivateKey.replace(/\n/g, '');
                                var ownerPublicKey = arr[2];
                                var ownerPublicKey = ownerPublicKey.replace(/\n/g, '');
                                //resp.createOwnerKeysMsg = "Owner Keys Created";

                                ownerKeys.ownerPrivateKey = ownerPrivateKey;
                                ownerKeys.ownerPublicKey = ownerPublicKey;

                                ownerKeysArray = [];
                                ownerKeysArray.push(ownerKeys);

                                resp.ownerKeys = ownerKeysArray;

                                console.log("Owner Private Key =" + ownerPrivateKey);
                                console.log("Owner Public Key =" + ownerPublicKey);

                                //mainnet account creation command
                                //let createEOSWalletCommand = "cleos -u https://eos.greymass.com/ system newaccount hellogoviddo " + walletName + " --stake-net '0.01 EOS' --stake-cpu '0.01 EOS' --buy-ram '0.1 EOS' " + ownerPublicKey + " " + resp.activePublicKey;


                                //testnet account creation command
                                let createEOSWalletCommand = "cleos -u http://junglehistory.cryptolions.io system newaccount hellogoviddo " + walletName + " --stake-net '0.01 EOS' --stake-cpu '0.01 EOS' --buy-ram '0.1 EOS' " + ownerPublicKey + " " + resp.activePublicKey;


                                console.log('Command to be executed', createEOSWalletCommand);
                                //execute again cmd.get and run the createWalletCommand and return onwer and active keys with wallet name to the user

                                cmd.get(
                                    createEOSWalletCommand,
                                    function (err, data, stderr) {
                                        if (err == null) {
                                            resp.accountCreatedMsg = "Account Created Successfully";
                                            console.log("Account Created Successfully" + data);
                                        }
                                        else {
                                            resp.accountCreatedMsg = "Account creation failed";
                                            console.log("Account creation failed" + err);
                                        }
                                    }
                                );


                                resolve(resp);

                            }
                        );
                    })
                }).then(function (resp) {
                    // send the user's details to the database
                    let query = "INSERT INTO user_table (first_name, last_name, eosio_account_name, email_id, password) VALUES ('" + firstName + "', '" + lastName + "', '" + walletName + "', '" + email + "', '" + password + "')";
                    db.query(query, function (err, result) {
                        if (err) {
                            resp.message = "Registration Failed due to database error";
                            return res.status(200).send(err);
                        }
                        resp.message = "Registration successful";
                        return res.status(200).send(resp);
                    });
                });
            }
        });
    }

};


