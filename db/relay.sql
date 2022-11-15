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
  distance REAL NOT NULL DEFAULT NULL
);

insert into runners (runner, phone, pace) values ('And e', '5554567890', 10) returning *;
insert into runners (runner, phone, pace) values ('And 2', '5554567891', 10.5) returning *;
insert into runners (runner, phone, pace) values ('And 3', '5554567892', 10.25) returning *;