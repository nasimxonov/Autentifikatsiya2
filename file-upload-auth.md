# Express bilan oddiy Autentifikatsiya va Fayl yuklash loyihasi

## Texnik talablar

1. **Backend**: Node.js, Express.js
2. **Ma'lumotlar bazasi**: PostgreSQL
3. **Fayl yuklash**: express-fileupload package
4. **API**: RESTful API formatida

## API endpointlari

### 1. Ro'yxatdan o'tish (Registration)

- **Endpoint**: `POST /api/auth/register`
- **Request body**:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- **Response (Muvaffaqiyatli)**:

```json
{
  "success": true,
  "message": "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 2. Tizimga kirish (Login)

- **Endpoint**: `POST /api/auth/login`
- **Request body**:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- **Response (Muvaffaqiyatli)**:

```json
{
  "success": true,
  "message": "Muvaffaqiyatli tizimga kirdingiz",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 3. Fayl yuklash

- **Endpoint**: `POST /api/upload`
- **Headers**: `userId`: foydalanuvchi user_id
- **Request**: `form-data` formatida
  - `file`: Yuklanadigan fayl
- **Response (Muvaffaqiyatli)**:

```json
{
  "success": true,
  "message": "Fayl muvaffaqiyatli yuklandi",
  "file": {
    "name": "yuklangan_fayl.pdf",
    "path": "/public/uploads/yuklangan_fayl_1234567890.pdf",
    "size": 12345,
    "type": "application/pdf"
  }
}
```

## Ma'lumotlar bazasi strukturasi

### Users jadvali

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Files jadvali

```sql
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
