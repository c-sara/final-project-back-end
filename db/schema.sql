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

insert into user_data (user_id, mood, habits, comment, date) values (5, 'Amazing', ARRAY['Eat healthy', 'Drink lots of water', 'Adequate sleep', 'Complete a personal goal'], 'It was a really productive day today, I was able to get a lot of work and chores done :)', '2021-10-24 10:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (5, 'Okay', ARRAY['Eat healthy', 'Drink lots of water'], 'Woke up tired. Still tired. Gonna be tired all day I reckon.', '2021-10-25 11:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (5, 'Good', ARRAY['Eat healthy', 'Drink lots of water', 'Practice meditation/mindfulness'], 'Discovered a new mindfulness app today. Went for a walk and picked up some groceries.', '2021-10-26 22:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (5, 'Amazing', ARRAY['Drink lots of water', 'Spend time with friends/family'], 'Ate sooooooo much food. Life is great.', '2021-10-27 11:30:00');

select distinct on (date::date) id, user_id, mood, habits, comment, date from user_data where user_id = 5;