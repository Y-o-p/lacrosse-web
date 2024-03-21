CREATE TABLE users (
	user_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	user_name varchar,
	pword varchar,
	role_id int,
	coach_id bigint
);

CREATE TABLE coaches (
	coach_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	last_name varchar,
	first_name varchar,
	team_ID bigint,
	birth_date date,
	phone varchar,
	date_created date
);

CREATE TABLE teams (
	team_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	team_name varchar,
	coach_id bigint,
	wins int,
	losses int
);

CREATE TABLE players (
	player_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	team_id bigint,
	last_name varchar,
	first_name varchar,
	pos char,
	height float,
	weight float,
	birth_date date,
	jersey_num
);

CREATE TABLE games (
	game_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	game_date date,
	game_field varchar,
	hometeam_id bigint,
	awayteam_id bigint,
	published boolean
);

CREATE TABLE player_stats (
	playerstat_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	game_id bigint,
	player_id bigint,
	team_id bigint,
	goals int,
	assists int,
	shots int,
	faceoffs_won int,
	faceoffs_lost int,
	saves int,
	clears_attempted int,
	clears_made int,
	penalties int
);

CREATE TABLE sk_session (
	session_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	game_id bigint,
	coach_id bigint,
	room_code varchar,
	expire_time bigint
)
