# VisionaryAI: Accessible Content Insights - Setup and Use Guide

This guide provides comprehensive instructions to set up and run the VisionaryAI application on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following software installed and configured on your system:

* **Python 3.x**: The backend is built with Python. Download from [python.org](https://www.python.org/downloads/).
* **Node.js (LTS version) & npm/yarn**: The frontend is built with Next.js/React. Download from [nodejs.org](https://nodejs.org/en/download/).
* **Docker Desktop**: Required to run the Redis message broker. Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/). Ensure it's running before starting services.
* **Git**: For cloning the project repository. Download from [git-scm.com/downloads](https://git-scm.com/downloads/).

## Setup

1. Clone the Repository

    ```bash
    git clone [https://github.com/NelsonXunic/VisionaryAI.git](https://github.com/NelsonXunic/VisionaryAI.git)
    ```

2. Navigate to the project directory

    ```bash
    cd VisionaryAI
    ```

## Backend Setup (Python/FastAPI)

1. Navigate into the `backend/` directory

    ```sh
    cd backend
    ```

2. Set up a Python virtual environment

    ```sh
    python3 -m venv venv
    ```

3. Activate the virtual environment

    * macOS/Linux

        ```sh
        source venv/bin/activate
        ```

    * Windows (Command Prompt)

        ```sh
        .\venv\Scripts\activate.bat
        ```

    * Windows (PowerShell)

         ```sh
        .\venv\Scripts\Activate.ps1
        ```

4. Install Python Dependencies

    ```sh
    pip install -r requirements.txt
    ```

## Frontend Setup (Node.js/Next.js)

1. Open a new terminal tab and navigate into the `frontend/` directory

    ```sh
    cd VisionaryAI/frontend
    ```

2. Install the Node.js dependencies

    ```sh
    npm install  # or yarn install if you prefer yarn
    ```

## Docker Services Setup (Redis)

Open another new terminal tab. Ensure Docker Desktop is running. Then, run the Redis container which will serve as the message broker for Celery.

```sh
docker run --name visionaryai-redis -p 6379:6379 -d redis/redis-stack-server
```

Verify it's running by typing

```sh
docker ps
```

## Running the Application Services

You will need three separate terminal tabs for the backend, Celery worker, and frontend. Ensure you are in the correct directory and environment for each

1. Start FastAPI Backend

    In your backend terminal tab (where `venv` is active)

    ```sh
    uvicorn main:app --reload --port 8000
    ```

    This will start the FastAPI server, usually accessible at `http://localhost:8000`

2. Start Celery Worker

    In another backend terminal tab (where `venv` is active):

    ```sh
    celery -A celery_worker worker --loglevel=info
    ```

    This will start the Celery worker, which will process the AI tasks. The first time it runs, it will download the necessary AI models (e.g., for image captioning, VQA, TTS), which can take several minutes depending on your internet connection.

3. Start Frontend Development Server

    In your frontend terminal tab

    ```sh
    npm run dev # or yarn dev if using yarn
    ```

    This will start the Next.js development server, usually accessible at `http://localhost:3000`

## Verify Installation

Once all three services (FastAPI, Celery Worker, Frontend) are running:

* Open your web browser and navigate to `http://localhost:3000/`. You should see the VisionaryAI frontend.
* The frontend has a "Check Backend Status" button; click it to confirm the frontend can communicate with the backend (`http://localhost:8000/ping`). It should display "Backend is running and accessible."
* You can also explore the FastAPI interactive documentation at `http://localhost:8000/docs` to see the available API endpoints and manually test them (e.g., caption_image, answer_question, generate_speech). Observe the Celery worker terminal for task processing logs.
