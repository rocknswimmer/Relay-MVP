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

