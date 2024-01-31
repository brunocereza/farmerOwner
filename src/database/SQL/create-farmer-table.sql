CREATE TABLE farmer (
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(255) NOT NULL,
  arable_area NUMERIC NOT NULL,
  crops_types NUMERIC NOT NULL,
  vegetation_area NUMERIC NOT NULL,
  CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES owner(id)
)