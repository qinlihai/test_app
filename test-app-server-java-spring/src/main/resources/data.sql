INSERT IGNORE INTO roles(name) VALUES('ROLE_USER');
INSERT IGNORE INTO roles(name) VALUES('ROLE_ADMIN');
INSERT IGNORE INTO users (id, email, name, password, username) VALUES (1, 'qinlihai@gmail.com', 'lihai', '$2a$10$09Nvtsdix59XFIcA6VeSBO0PRohGh64gKkLNvnjkrgyamPDJtgZg6', 'lihai');
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (1, 1);
