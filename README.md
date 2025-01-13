# NestJS GraphQL Application with MongoDB, Prisma, Authentication, and File Storage

This repository contains a robust NestJS application built with GraphQL (code-first approach), MongoDB, Prisma, and Backblaze B2 for file storage. The application includes JWT-based authentication, multi-business profile management, and scalable modular architecture.

---

## **Features**

### **User Management**
- User registration with email, Google, and Apple login.
- Secure authentication using JWT and Passport.js.
- Profile management (update name, photo, and preferences).
- Password recovery via email.

### **Business Profile Management**
- Create and manage multiple business profiles.
- Add essential details: name, address, phone, website, and services.
- Post updates visible for 24 hours.
- Manage multiple business locations.

### **File Storage**
- Backblaze B2 integration for file storage.
- Upload and manage user profile photos and business assets.

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (>= 16.x)
- **MongoDB**
- **NestJS CLI**
- **Backblaze B2 Account**

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=3000
     DATABASE_URL=<Your_MongoDB_Connection_String>
     JWT_SECRET=<Your_JWT_Secret>
     BACKBLAZE_KEY_ID=<Your_Backblaze_Key_ID>
     BACKBLAZE_APPLICATION_KEY=<Your_Backblaze_Application_Key>
     BACKBLAZE_BUCKET_NAME=<Your_Backblaze_Bucket_Name>
     BACKBLAZE_BUCKET_REGION=<Your_Backblaze_Bucket_Region>
     ```

4. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

---

## **Project Structure**

```
src/
  modules/
    user/
      user.module.ts
      user.controller.ts
      user.service.ts
      user.resolver.ts
    auth/
      auth.module.ts
      auth.service.ts
      auth.controller.ts
    business/
      business.module.ts
      business.controller.ts
      business.service.ts
      business.resolver.ts
  common/
    decorators/
    filters/
    guards/
    interceptors/
  prisma/
    schema.prisma
  main.ts
```

---

## **Scripts**

- **Start Development Server**:
  ```bash
  npm run start:dev
  ```

- **Build Application**:
  ```bash
  npm run build
  ```

- **Run Tests**:
  ```bash
  npm run test
  ```

---

## **Technologies Used**

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MongoDB with Prisma ORM
- **GraphQL**: Code-first approach
- **Authentication**: Passport.js with JWT
- **File Storage**: Backblaze B2

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/<feature-name>`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature/<feature-name>`.
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any inquiries or feedback, please reach out to **[Your Name/Team]** at **your-email@example.com**.
