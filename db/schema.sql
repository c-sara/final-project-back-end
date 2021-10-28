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

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Amazing', ARRAY['Eat healthy', 'Drink lots of water', 'Adequate sleep', 'Complete a personal goal'], 'It was a really productive day today, I was able to get a lot of work and chores done :)', '2021-10-24 13:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Okay', ARRAY['Eat healthy', 'Drink lots of water'], 'Woke up tired. Still tired. Gonna be tired all day I reckon.', '2021-10-25 13:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Good', ARRAY['Eat healthy', 'Drink lots of water', 'Practice meditation/mindfulness'], 'Discovered a new mindfulness app today. Went for a walk and picked up some groceries.', '2021-10-26 13:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Amazing', ARRAY['Drink lots of water', 'Spend time with friends/family'], 'Ate sooooooo much food. Life is great.', '2021-10-27 13:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Okay', ARRAY['Eat healthy', 'Drink lots of water', 'Spend time with friends/family'], 'All I can think about is the project and how great it would be to finish', '2021-10-28 13:30:00');

insert into user_data (user_id, mood, habits, comment, date) values (26, 'Amazing', ARRAY['Eat healthy', 'Drink lots of water', 'Spend time with friends/family'], 'Last day of GA! Whaaaaaaaat', '2021-10-29 13:30:00');
