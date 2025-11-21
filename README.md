# Todo App - Personal Task Manager

## 📋 Tổng quan dự án

Ứng dụng quản lý task cá nhân với:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: ASP.NET Core Web API + Entity Framework Core
- **Database**: MySQL

## 🛠️ Công nghệ sử dụng

### Backend (TaskApi)

- ASP.NET Core 8.0
- Entity Framework Core 8.0.22
- Pomelo.EntityFrameworkCore.MySql 8.0.0
- AutoMapper 12.0.1
- DotNetEnv 3.1.1

### Frontend (todo-client)

- React 19.2.0
- Vite 7.2.2
- TailwindCSS 4.1.17
- Axios 1.13.2
- React Hot Toast 2.6.0
- React Icons 5.5.0

## 📦 Yêu cầu hệ thống

- **.NET SDK 8.0** trở lên
- **Node.js 20.19** hoặc **22.12** trở lên
- **MySQL Server** (version 8.0 khuyến nghị)

## ⚙️ Cài đặt và chạy dự án

### 1️⃣ Setup Backend

#### Bước 1: Clone project và di chuyển vào thư mục backend

```bash
git clone https://github.com/thPhonG-oss/TodoApp
cd TodoApp
cd TaskApi
```

#### Bước 2: Tạo file `.env` trong thư mục `TaskApi`

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=TodoDB
DB_USER=root
DB_PASS=your_password_here
```

> ⚠️ **Lưu ý**: Thay `your_password_here` bằng mật khẩu MySQL của bạn

#### Bước 3: Tạo database

Mở MySQL Workbench hoặc dùng command line:

```sql
CREATE DATABASE TodoDB;
```

#### Bước 4: Restore packages

```bash
dotnet restore
```

#### Bước 5: Chạy migration (database đã được tạo sẵn)

Migration đã có sẵn trong project, chỉ cần apply:

```bash
dotnet ef database update
```


#### Bước 6: Chạy backend

```bash
dotnet run
```

Backend sẽ chạy tại:

- HTTP: `http://localhost:5093`

### 2️⃣ Setup Frontend

#### Bước 1: Di chuyển vào thư mục frontend

```bash
cd todo-client
```

#### Bước 2: Cài đặt dependencies

```bash
npm install
```

#### Bước 3: Kiểm tra cấu hình API

Mở file `src/api/axiosClient.js` và đảm bảo `baseURL` đúng với backend:

```javascript
baseURL: "http://localhost:5093/api";
```

#### Bước 4: Chạy frontend

```bash
npm run dev
```

Frontend sẽ tự động mở tại: `http://localhost:3000`

## 🎯 API Endpoints

| Method | Endpoint                     | Mô tả                 |
| ------ | ---------------------------- | --------------------- |
| GET    | `/api/Tasks`                 | Lấy tất cả tasks      |
| GET    | `/api/Tasks/{id}`            | Lấy task theo ID      |
| GET    | `/api/Tasks/Status/{status}` | Lấy tasks theo status |
| POST   | `/api/Tasks`                 | Tạo task mới          |
| PUT    | `/api/Tasks/{id}`            | Cập nhật task         |
| DELETE | `/api/Tasks/{id}`            | Xóa task              |

### Request Body mẫu

**Tạo task mới (POST)**:

```json
{
  "title": "Học React",
  "description": "Hoàn thành khóa học React",
  "dueDate": "2025-12-31T00:00:00"
}
```

**Cập nhật task (PUT)**:

```json
{
  "title": "Học React Advanced",
  "description": "Hoàn thành khóa học React nâng cao",
  "dueDate": "2025-12-31T00:00:00",
  "status": "In Progress"
}
```

### Status values

- `To Do` - Chưa bắt đầu
- `In Progress` - Đang thực hiện
- `Done` - Hoàn thành

## 🗂️ Cấu trúc thư mục

```
.
├── TaskApi/                    # Backend
│   ├── Controllers/           # API Controllers
│   │   └── TasksController.cs
│   ├── Models/                # Domain Models
│   │   └── TaskItem.cs
│   ├── Dtos/                  # Data Transfer Objects
│   │   ├── TaskItemCreationRequest.cs
│   │   ├── TaskItemUpdateRequest.cs
│   │   └── TaskItemResponse.cs
│   ├── Services/              # Business Logic
│   │   ├── IServices/
│   │   │   └── ITaskItemService.cs
│   │   └── TaskItemService.cs
│   ├── Repositories/          # Data Access Layer
│   │   ├── IRepositories/
│   │   │   ├── IRepository.cs
│   │   │   └── ITaskItemRepository.cs
│   │   └── TaskItemRepository.cs
│   ├── Data/                  # DbContext
│   │   └── AppDbContext.cs
│   ├── Migrations/            # EF Core Migrations
│   ├── MappingProfiles/       # AutoMapper Profiles
│   │   └── GeneralMappingProfile.cs
│   ├── Program.cs             # Entry point
│   ├── TaskApi.csproj         # Project file
│   ├── appsettings.json       # Configuration
│   └── .env                   # Environment variables (tạo mới)
│
└── todo-client/               # Frontend
    ├── src/
    │   ├── api/              # API client
    │   │   ├── axiosClient.js
    │   │   └── taskApi.js
    │   ├── components/       # React components
    │   │   ├── AddTaskModal.jsx
    │   │   ├── EditTaskModal.jsx
    │   │   ├── ConfirmDeleteModal.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── TaskItem.jsx
    │   │   └── TaskList.jsx
    │   ├── pages/            # Page components
    │   │   └── Home.jsx
    │   ├── App.jsx           # Main App
    │   ├── main.jsx          # Entry point
    │   └── index.css         # Global styles
    ├── vite.config.js        # Vite configuration
    └── package.json          # Dependencies
```

## 🚀 Các tính năng

✅ Tạo, xem, sửa, xóa tasks  
✅ Lọc tasks theo status (All, To Do, In Progress, Done)  
✅ Hiển thị ngày hết hạn  
✅ Đánh dấu task hoàn thành  
✅ Toast notifications  
✅ Responsive design  
✅ Modal dialogs cho CRUD operations

## 🐛 Xử lý lỗi thường gặp

### 1. Lỗi kết nối database

```
Unable to connect to MySQL server
```

**Giải pháp**:

- Kiểm tra MySQL server đã chạy chưa
- Kiểm tra thông tin trong file `.env`
- Đảm bảo database `TodoDB` đã được tạo

### 2. Lỗi CORS

```
Access to XMLHttpRequest blocked by CORS policy
```

**Giải pháp**: Backend đã config CORS `AllowAnyOrigin`, restart lại backend

### 3. Lỗi port đã được sử dụng

```
Address already in use
```

**Giải pháp**: Thay đổi port trong:

- Backend: `Properties/launchSettings.json`
- Frontend: `vite.config.js`

### 4. Lỗi EF Core Tools

```
dotnet ef command not found
```

**Giải pháp**: Cài đặt EF Core Tools

```bash
dotnet tool install --global dotnet-ef
```

### 5. Lỗi kết nối Frontend - Backend

```
Network Error hoặc 404 Not Found
```

**Giải pháp**:

- Đảm bảo backend đang chạy
- Kiểm tra port trong `axiosClient.js` khớp với backend
- Xem log console để biết chi tiết lỗi

## 🔍 Testing API với cURL

### Get all tasks

```bash
curl -X GET http://localhost:5000/api/Tasks
```

### Get task by ID

```bash
curl -X GET http://localhost:5000/api/Tasks/1
```

### Create task

```bash
curl -X POST http://localhost:5000/api/Tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test",
    "dueDate": "2025-12-31T00:00:00"
  }'
```

### Update task

```bash
curl -X PUT http://localhost:5000/api/Tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "dueDate": "2025-12-31T00:00:00",
    "status": "InProgress"
  }'
```

### Delete task

```bash
curl -X DELETE http://localhost:5000/api/Tasks/1
```
