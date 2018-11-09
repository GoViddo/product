CREATE KEYSPACE IF NOT EXISTS db_goviddo
WITH durable_writes = true
AND replication = {
	'class' : 'SimpleStrategy',
	'replication_factor' : 3
};






CREATE TABLE IF NOT EXISTS db_goviddo.playback_track (
	id text,
	browser int,
	complete int,
	country text,
	os text,
	progress text,
	start_time text,
	user_id int,
	video_genere_id int,
	video_id int,
	video_slug text,
	PRIMARY KEY (id)
);





CREATE TABLE IF NOT EXISTS db_goviddo.user_table (
	user_id text,
	address text,
	birth_date text,
	country text,
	email_id text,
	first_name text,
	gender int,
	is_email_verified int,
	is_phone_verified int,
	last_name text,
	notification_token text,
	password text,
	phone_no text,
	register_as_advisor int,
	register_as_producer int,
	register_as_user int,
	status int,
	user_profile_picture text,
	user_video_choice text,
	user_wallet_id text,
	PRIMARY KEY (user_id)
);








CREATE TABLE IF NOT EXISTS db_goviddo.video_genere_table (
	id text,
	description text,
	name text,
	status int,
	PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS db_goviddo.video_likes_comment_track (
	id text,
	comments text,
	likes int,
	status int,
	user_id int,
	video_genere_id int,
	video_id int,
	PRIMARY KEY (id)
);





CREATE TABLE IF NOT EXISTS db_goviddo.video_table (
	id text,
	banner_image text,
	created_date text,
	description text,
	director text,
	duration int,
	home_image text,
	live_upto_date text,
	producer text,
	shorten_text text,
	show_name text,
	show_on_home_page int,
	show_on_home_page_upto_date text,
	slug text,
	starring text,
	status int,
	vdocipher_video_id text,
	video_genere_type int,
	video_tags text,
	PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS db_goviddo.web_season_table (
	id text,
	created_date text,
	home_image text,
	season_no int,
	status int,
	web_show_id int,
	PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS db_goviddo.web_show_episode_table (
	id text,
	banner_image text,
	created_date text,
	description text,
	director text,
	duration int,
	episode_no int,
	home_image text,
	live_upto_date text,
	producer text,
	shorten_text text,
	show_name text,
	show_on_homepage int,
	show_on_homepage_upto_date text,
	slug text,
	starring text,
	status int,
	vdocipher_video_id text,
	video_genere_type int,
	video_tags text,
	web_season_id int,
	web_show_id int,
	PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS db_goviddo.web_show_table (
	id text,
	banner_image text,
	created_date text,
	description text,
	home_image text,
	producer text,
	show_name text,
	show_on_homepage int,
	show_on_homepage_upto_date text,
	slug text,
	status int,
	PRIMARY KEY (id)
);


CREATE INDEX IF NOT EXISTS user_email ON db_goviddo.user_table (email_id);




CREATE TABLE IF NOT EXISTS db_goviddo.configuration_table (
	id int,
	config_key text,
	config_value text,
	status int,
	PRIMARY KEY (id)
);


INSERT INTO db_goviddo.configuration_table
(id, config_key,config_value, status )
VALUES (1, 'banner_images', '5', 1);



INSERT INTO db_goviddo.configuration_table
(id, config_key,config_value, status )
VALUES (2, 'previews', '5', 1);



INSERT INTO db_goviddo.configuration_table
(id, config_key,config_value, status )
VALUES (3, 'populars', '10', 1);



INSERT INTO db_goviddo.configuration_table
(id, config_key,config_value, status )
VALUES (4, 'categories', '{"drama" : 10, "originals" : 10, "sci-fi" : 10, "horror" : 10}', 1);


