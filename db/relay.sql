DROP TABLE IF EXISTS runners;

CREATE TABLE runners (
  id SERIAL PRIMARY KEY,
  runner VARCHAR(100) NOT NULL DEFAULT NULL,
  phone VARCHAR(10),
  pace REAL
);

CREATE TABLE legs (
  id SERIAL,
  runner REFERENCES runners (id),
  distance REAL
);

