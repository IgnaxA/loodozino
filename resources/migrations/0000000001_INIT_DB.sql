
CREATE TABLE IF NOT EXISTS users(
    user_id BIGSERIAL PRIMARY KEY,
    user_email VARCHAR (40) UNIQUE NOT NULL,
    user_password VARCHAR (200) NOT NULL,
    user_access_level SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS devices(
    device_id BIGSERIAL PRIMARY KEY,
    device_ip VARCHAR(20) NOT NULL,
    device_name VARCHAR(400) NOT NULL,
    device_last_authorized VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS tokens(
    token_id BIGSERIAL PRIMARY KEY,
    token_body VARCHAR(200) NOT NULL,
    token_status SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS migration_changelogs(
    migration_id BIGSERIAL PRIMARY KEY,
    migration_name VARCHAR(200) NOT NULL,
    migration_status SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_link_devices(
    user_id BIGINT NOT NULL,
    device_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS device_link_tokens(
    device_id BIGINT NOT NULL,
    token_id BIGINT NOT NULL,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (token_id) REFERENCES tokens(token_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);