CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    hashed_password VARCHAR,
    hand_length FLOAT,
    hand_width FLOAT,
    preferred_language VARCHAR DEFAULT 'en',
    preferred_currency VARCHAR DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analysis_sessions (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    game_name VARCHAR,
    duration_seconds INTEGER,
    status VARCHAR
);

CREATE TABLE IF NOT EXISTS analysis_results (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR REFERENCES analysis_sessions(id),
    grip_type VARCHAR,
    grip_confidence FLOAT,
    grip_features JSON,
    playstyle_type VARCHAR,
    playstyle_sub_traits JSON,
    playstyle_metrics JSON,
    setup_score FLOAT,
    setup_bottlenecks JSON,
    verdict_setup_grade VARCHAR,
    verdict_aim_grade VARCHAR,
    verdict_tag VARCHAR,
    verdict_one_liner VARCHAR,
    verdict_brief_markdown VARCHAR
);

CREATE TABLE IF NOT EXISTS peripherals (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR,
    brand VARCHAR,
    category VARCHAR,
    price_usd FLOAT,
    image_url VARCHAR,
    purchase_url VARCHAR
);

CREATE TABLE IF NOT EXISTS mouse_specs (
    id VARCHAR PRIMARY KEY REFERENCES peripherals(id),
    weight FLOAT,
    shape VARCHAR,
    sensor VARCHAR,
    max_dpi INTEGER,
    polling_rate INTEGER,
    wireless BOOLEAN,
    grip_compatibility JSON
);

CREATE TABLE IF NOT EXISTS mousepad_specs (
    id VARCHAR PRIMARY KEY REFERENCES peripherals(id),
    width FLOAT,
    height FLOAT,
    surface_type VARCHAR,
    material VARCHAR,
    thickness FLOAT
);

CREATE TABLE IF NOT EXISTS keyboard_specs (
    id VARCHAR PRIMARY KEY REFERENCES peripherals(id),
    layout VARCHAR,
    switch_type VARCHAR,
    actuation_point FLOAT,
    polling_rate INTEGER
);

CREATE TABLE IF NOT EXISTS monitor_specs (
    id VARCHAR PRIMARY KEY REFERENCES peripherals(id),
    panel_type VARCHAR,
    refresh_rate INTEGER,
    response_time FLOAT,
    resolution VARCHAR,
    size_inches FLOAT
);

CREATE TABLE IF NOT EXISTS wallet_items (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR REFERENCES users(id),
    peripheral_id VARCHAR REFERENCES peripherals(id),
    target_price FLOAT,
    currency_code VARCHAR,
    monthly_savings FLOAT,
    saved_amount FLOAT,
    start_date TIMESTAMP WITH TIME ZONE,
    target_date TIMESTAMP WITH TIME ZONE,
    is_completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR REFERENCES analysis_sessions(id),
    peripheral_id VARCHAR REFERENCES peripherals(id),
    match_score FLOAT,
    reasons JSON,
    priority_score FLOAT,
    impact_estimate FLOAT
);
