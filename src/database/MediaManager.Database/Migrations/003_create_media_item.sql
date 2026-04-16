-- Migration 003: create MediaItem table with FK to MediaType
CREATE TABLE media.MediaItem
(
    Id          UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    Title       NVARCHAR(200)    NOT NULL,
    Barcode     NVARCHAR(100)    NOT NULL,
    MediaTypeId INT              NOT NULL,
    CONSTRAINT PK_MediaItem       PRIMARY KEY (Id),
    CONSTRAINT FK_MediaItem_MediaType FOREIGN KEY (MediaTypeId)
        REFERENCES media.MediaType (Id)
);
