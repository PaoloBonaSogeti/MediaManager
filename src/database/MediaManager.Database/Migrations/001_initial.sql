-- Migration 001: create the media schema
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'media')
    EXEC('CREATE SCHEMA media');
