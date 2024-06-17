# stu-mingle

Students get to mingle with each other ! 

## BACKEND

### Instructions

- Navigate to the backend folder
    ```bash
    cd backend
    ```
- Copy the `.env.example` to `.env` then specify the required environment variables
- Install the dependencies
    ```bash
    npm i
    ```
- Run postgres server either locally or through docker via our script.
    ```bash
        ./tools/run_postgres_docker.sh
    ```
- Apply prisma migration
    ```bash
    npm run prisma:migrate
    ```
- Run the development server
    ```bash
    npm run dev
    ```


## FRONTEND

### Instructions

- Navigate to the frontend folder
    ```bash
    cd frontend/matchmaking-frontend
    ```
- Install the dependencies
    ```bash
    npm i
    ```
- Run the development server:
    ```bash
    npm run dev
    ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.