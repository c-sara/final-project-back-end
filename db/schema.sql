create database moodtracker;

create table users (
  id serial primary key,
  name varchar,
  email varchar,
  password varchar
);

create table user_data (
  id serial primary key,
  user_id int,
  mood text,
  habits text[],
  comment text,
  date timestamp
);

insert into user_data (mood, habits, comment, date) values ('okay', ARRAY['exercise', 'eat healthy', 'sleep early'], 'today is an okay day', '2021-10-24');

insert into user_data (mood, habits, comment, date) values ('good', ARRAY['exercise', 'eat healthy', 'sleep early'], 'today is a good day', '2021-10-25');