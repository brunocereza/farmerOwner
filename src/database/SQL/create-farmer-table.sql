CREATE TABLE farm (
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  ownerId UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  arable_area NUMERIC NOT NULL,
  total_area NUMERIC NOT NULL,
  crops_types VARCHAR(255) NOT NULL,
  vegetation_area NUMERIC NOT NULL,
  CONSTRAINT fk_owner FOREIGN KEY(ownerId) REFERENCES owner(id)
)