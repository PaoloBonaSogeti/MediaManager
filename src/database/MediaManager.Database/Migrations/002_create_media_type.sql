-- Migration 002: create MediaType lookup table with seed data
CREATE TABLE media.MediaType
(
    Id   INT          NOT NULL IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_MediaType PRIMARY KEY (Id),
    CONSTRAINT UQ_MediaType_Name UNIQUE (Name)
);

INSERT INTO media.MediaType (Name) VALUES
    ('CD'),
    ('DVD'),
    ('BLU-RAY'),
    ('VHS');
