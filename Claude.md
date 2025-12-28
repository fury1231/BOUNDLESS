# Role: Senior Full-Stack Architect & UI/UX Expert

## 1. Company Identity & Context (The Soul)
You are building the official digital infrastructure for **"無垠科技" (Boundless Tech)**.

- **Name**: 無垠科技 (Boundless Tech)
- **Tagline**: 智識無界，創新無垠 (Beyond Boundaries. Architecting the Infinite).
- **Description**:
  "無垠科技致力於開發高擴展性的數位架構，將複雜的演算邏輯封裝於極簡的介面之下。我們不只是寫程式，我們是在為企業構建通往未來的數位神經網絡。從無頭式架構 (Headless Architecture) 到生成式 AI 整合，我們讓您的業務像宇宙般無限擴張。"
- **Brand Vibe**: Cyberpunk Minimalist, Futuristic, High-Scalability, "Under-the-hood" Power.

---

## 2. Tech Stack (Strict Enforcement)

### 🔵 Backend (The Brain)
- **Framework**: Python FastAPI (Async).
- **Database**: SQLite (Dev) / PostgreSQL (Prod).
- **ORM**: SQLModel (Pydantic + SQLAlchemy).
- **Admin Panel**: `sqladmin` (**CRITICAL**: Must implement this to allow immediate data management without frontend forms).
- **Docs**: Automatic Swagger UI at `/docs`.

### 🟢 Frontend (The Face)
- **Framework**: Next.js 14+ (App Router, TypeScript).
- **Styling**: Tailwind CSS (Utility-first).
- **Animation (CRITICAL)**: Framer Motion. *Static websites are forbidden. Every element needs entry animations.*
- **UI Components**:
  - Base: `shadcn/ui` (Buttons, Inputs).
  - Visuals: **Aceternity UI** (Hero Parallax, Glowing Cards). *Ask the user to provide component code for high-end visuals.*

---

## 3. Project Structure (資料夾規範)

```
project-root/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI 入口
│   │   ├── config.py            # 環境配置
│   │   ├── database.py          # DB 連線
│   │   ├── models/              # SQLModel 資料模型
│   │   ├── schemas/             # Pydantic 請求/回應 schemas
│   │   ├── routers/             # API 路由模組
│   │   ├── services/            # 業務邏輯層
│   │   ├── utils/               # 工具函式
│   │   └── admin.py             # sqladmin 配置
│   ├── tests/
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui 組件
│   │   │   ├── sections/        # 頁面區塊
│   │   │   └── animations/      # Framer Motion 動畫組件
│   │   ├── lib/                 # 工具函式
│   │   ├── hooks/               # 自定義 Hooks
│   │   ├── types/               # TypeScript 類型定義
│   │   └── styles/              # 全域樣式
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
└── docker-compose.yml
```

---

## 4. API Design Guidelines (API 設計規範)

### RESTful 命名規則
- 使用複數名詞：`/api/v1/users`, `/api/v1/projects`
- 版本控制：所有 API 以 `/api/v1/` 為前綴
- 使用 kebab-case：`/api/v1/user-profiles`

### 標準回應格式
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful",
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

### HTTP 方法對應
| 方法 | 用途 | 範例 |
|------|------|------|
| GET | 讀取資源 | `GET /api/v1/users` |
| POST | 新增資源 | `POST /api/v1/users` |
| PUT | 完整更新 | `PUT /api/v1/users/{id}` |
| PATCH | 部分更新 | `PATCH /api/v1/users/{id}` |
| DELETE | 刪除資源 | `DELETE /api/v1/users/{id}` |

---

## 5. Authentication & Authorization (認證授權)

### 策略：JWT + OAuth2
- **Access Token**: 有效期 15 分鐘
- **Refresh Token**: 有效期 7 天，存於 HttpOnly Cookie
- **密碼加密**: bcrypt (cost factor: 12)

### 權限層級
```python
class Role(str, Enum):
    ADMIN = "admin"        # 完整權限
    MANAGER = "manager"    # 管理權限 (無系統設定)
    USER = "user"          # 一般使用者
    GUEST = "guest"        # 訪客 (唯讀)
```

### 保護路由
```python
@router.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {"user": current_user}
```

---

## 6. Error Handling (錯誤處理規範)

### 標準錯誤格式
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {"field": "email", "message": "Invalid email format"}
    ]
  }
}
```

### HTTP 狀態碼規範
| 狀態碼 | 用途 |
|--------|------|
| 200 | 成功 |
| 201 | 新增成功 |
| 400 | 請求錯誤 (驗證失敗) |
| 401 | 未認證 |
| 403 | 無權限 |
| 404 | 資源不存在 |
| 422 | 資料驗證錯誤 |
| 500 | 伺服器錯誤 |

### 錯誤碼命名
使用 SCREAMING_SNAKE_CASE：`USER_NOT_FOUND`, `INVALID_TOKEN`, `RATE_LIMIT_EXCEEDED`

---

## 7. Environment Configuration (環境配置)

### 分層配置策略

| 環境 | 配置方式 | 說明 |
|------|----------|------|
| 本地開發 | `.env` 檔案 | 方便快速，不提交至 Git |
| CI/CD | Pipeline Secrets | GitHub Secrets / GitLab CI Variables |
| Staging | Kubernetes Secrets | 或 Cloud Provider Secrets |
| **Production** | **Secrets Manager** | AWS Secrets Manager / Azure Key Vault / HashiCorp Vault |

### 本地開發 (.env)
```bash
# .env.example (提交至 Git，僅作為範本)
DATABASE_URL=sqlite:///./dev.db
SECRET_KEY=change-me-in-local-env
ACCESS_TOKEN_EXPIRE_MINUTES=15
CORS_ORIGINS=http://localhost:3000

# .env (不提交，本地開發用)
DATABASE_URL=sqlite:///./dev.db
SECRET_KEY=my-local-dev-secret
```

### 生產環境 (Linode + Docker Compose)

**部署架構**: Linode VPS + Docker Compose + 伺服器端 .env

```bash
# 1. 在 Linode 伺服器上建立安全的 .env
sudo mkdir -p /opt/myapp
sudo touch /opt/myapp/.env
sudo chmod 600 /opt/myapp/.env      # 僅 root 可讀寫
sudo chown root:root /opt/myapp/.env

# 2. 編輯 .env (使用 sudo)
sudo nano /opt/myapp/.env
```

```bash
# /opt/myapp/.env (生產環境)
DATABASE_URL=postgresql://user:強密碼@localhost:5432/proddb
SECRET_KEY=使用-openssl-rand-hex-32-產生
ACCESS_TOKEN_EXPIRE_MINUTES=15
CORS_ORIGINS=https://yourdomain.com
ENVIRONMENT=production
```

```yaml
# /opt/myapp/docker-compose.yml
services:
  backend:
    image: myapp-backend:latest
    ports:
      - "8000:8000"
    env_file:
      - .env  # 從伺服器本地讀取，不在 Git 中
    restart: unless-stopped
    depends_on:
      - db

  frontend:
    image: myapp-frontend:latest
    ports:
      - "3000:3000"
    restart: unless-stopped

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}  # 從 .env 讀取
      POSTGRES_DB: proddb
    restart: unless-stopped

volumes:
  postgres_data:
```

```bash
# 3. 產生安全的密鑰
openssl rand -hex 32  # 用於 SECRET_KEY

# 4. 啟動服務
cd /opt/myapp
sudo docker-compose up -d
```

**安全檢查清單**:
- [ ] `.env` 權限設為 600
- [ ] `.env` 不存在於 Git 儲存庫
- [ ] 使用強密碼 (openssl rand -hex 32)
- [ ] 定期輪換密鑰

### 配置類別
```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False
    environment: str = "development"  # development / staging / production

    class Config:
        env_file = ".env"  # 僅本地開發時使用

@lru_cache
def get_settings() -> Settings:
    return Settings()
```

> **重要**: 生產環境的 `.env` 僅存在於伺服器本地 (`/opt/myapp/.env`)，絕不提交至 Git。檔案權限必須設為 600，並使用強密碼。如需更高安全性，可考慮 Doppler 或 HashiCorp Vault。

---

## 8. Testing Strategy (測試策略)

### Backend (pytest)
```bash
backend/tests/
├── conftest.py          # Fixtures
├── test_users.py        # API 測試
├── test_services.py     # 單元測試
└── test_integration.py  # 整合測試
```

**覆蓋率要求**: 最低 80%

### Frontend (Jest + React Testing Library)
```bash
frontend/src/
├── __tests__/
│   ├── components/      # 組件測試
│   └── hooks/           # Hook 測試
```

### 測試命令
```bash
# Backend
pytest --cov=app --cov-report=html

# Frontend
npm run test -- --coverage
```

---

## 9. Deployment & CI/CD (部署流程)

### Docker 配置
```yaml
# docker-compose.yml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://...

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### CI/CD Pipeline (GitHub Actions)
1. **Lint & Type Check**: ESLint, Pyright
2. **Test**: pytest, Jest
3. **Build**: Docker build
4. **Deploy**: 自動部署至 staging/production

---

## 10. Security Guidelines (安全規範)

### CORS 配置
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 安全檢查清單
- [ ] SQL Injection: 使用 ORM 參數化查詢
- [ ] XSS: React 自動轉義 + DOMPurify
- [ ] CSRF: SameSite Cookie + CSRF Token
- [ ] Rate Limiting: 使用 `slowapi` (100 req/min)
- [ ] Input Validation: Pydantic 嚴格驗證
- [ ] Secrets: 永不提交 `.env` 至版本控制

### Rate Limiting
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@app.get("/api/v1/resource")
@limiter.limit("100/minute")
async def get_resource():
    ...
```

---

## 11. Design Guidelines (Anti-Generic Rules)
**Goal**: Avoid the generic "Bootstrap/AI" look.

1. **Typography**: Use `Inter` or `Geist Sans`. Headings must be `font-bold tracking-tight`.
2. **Color Palette**:
   - Background: Deep Zinc (`bg-zinc-950`).
   - Accents: Electric Indigo (`text-indigo-500`) or Neon Cyan for a Cyberpunk touch.
   - Text: Never pure black. Use `text-zinc-200` for body, `text-white` for headers.
3. **Spacing**: Be generous. Sections must have `py-24` or `py-32`.
4. **Micro-interactions**: Hover effects on cards (lift + glow), active states on buttons.

### 動畫規範 (Framer Motion)
```tsx
// 標準進場動畫
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// 交錯動畫 (列表)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};
```

---

## 12. Git Conventions (版本控制規範)

### Commit Message 格式
```
<type>(<scope>): <subject>

feat(auth): add JWT refresh token mechanism
fix(api): resolve user query pagination bug
docs(readme): update installation guide
```

### Branch 命名
- `main` - 生產環境
- `develop` - 開發環境
- `feature/xxx` - 新功能
- `fix/xxx` - 錯誤修復
- `hotfix/xxx` - 緊急修復

---
