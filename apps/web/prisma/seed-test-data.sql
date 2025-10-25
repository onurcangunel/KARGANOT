-- Quick test data for upload system
-- Add faculties, departments, courses for popular universities

-- Get university IDs first
SELECT id, name FROM universities WHERE name LIKE '%Ankara%' OR name LIKE '%İstanbul%' OR name LIKE '%Boğaziçi%' LIMIT 5;

-- Insert sample faculties for Ankara University (assuming ID exists)
-- We'll create a proper seed script in TypeScript

-- For now, let's create a TypeScript seed script instead
