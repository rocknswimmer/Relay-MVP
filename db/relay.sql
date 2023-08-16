DROP TABLE IF EXISTS legs;
DROP TABLE IF EXISTS runners;

CREATE TABLE runners (
  id SERIAL PRIMARY KEY,
  runner VARCHAR(100) NOT NULL DEFAULT NULL,
  phone VARCHAR(10) NOT NULL DEFAULT NULL,
  pace REAL NOT NULL DEFAULT NULL
);

CREATE TABLE legs (
  id SERIAL PRIMARY KEY,
  runner INTEGER NOT NULL DEFAULT NULL REFERENCES runners (id),
  distance REAL NOT NULL DEFAULT NULL,
  complete BOOLEAN NOT NULL DEFAULT false,
  start_time VARCHAR(50) NOT NULL DEFAULT 'TBD',
  end_time VARCHAR(50) NOT NULL DEFAULT 'TBD',
  pacific_start VARCHAR(50) NOT NULL DEFAULT 'TBD',
  pacific_end VARCHAR(50) NOT NULL DEFAULT 'TBD',
  dif VARCHAR(50) NOT NULL DEFAULT 'TBD'
);

insert into runners (runner, phone, pace) values ('And e', '5554567890', 10) returning *;
insert into runners (runner, phone, pace) values ('And 2', '5554567891', 10.5) returning *;
insert into runners (runner, phone, pace) values ('And 3', '5554567892', 10.25) returning *;

insert into legs (runner, distance) values (1, 3.1) returning *;
insert into legs (runner, distance) values (2, 6.2) returning *;
insert into legs (runner, distance) values (3, 5) returning *;
insert into legs (runner, distance) values (1, 3.1) returning *;
insert into legs (runner, distance) values (2, 6.2) returning *;
insert into legs (runner, distance) values (3, 5) returning *;