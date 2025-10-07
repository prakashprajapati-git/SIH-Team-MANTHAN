# 🚀 RockGuard AI: Real-Time Computer Vision for Mine Safety

**A Project for the Smart India Hackathon (SIH) | Problem ID: 25071**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


---

## 🎯 Mission Statement

Rockfalls in open-pit mines pose a severe and constant threat to human lives and high-value equipment. Traditional safety protocols are reactive and slow. **RockGuard AI** transforms standard video cameras into vigilant, 24/7 AI-powered sentinels, providing a cost-effective, scalable, and intelligent early-warning system to create a **proactive safety culture**.

---

## ✨ Key Features

-   **Live Visual Analysis:** Utilizes a live video feed from a webcam or drone and a backend **OpenCV** engine to autonomously identify physical hazards like **cracks** and **loose rocks** in real-time.
-   **Real-Time Annotated Feed:** Detected risks are immediately highlighted with bounding boxes directly on the video stream, providing an instant, actionable "ground truth" of the mine's stability.
-   **Centralized Dashboard:** A user-friendly web interface acts as a command center, providing the live annotated video, a summary of active detections, and overall risk level assessments.
-   **Low-Cost & Scalable:** Built entirely on open-source software (**Python**, **Flask**, **React**) to run on commodity hardware, making it a highly accessible and scalable alternative to expensive proprietary systems.

---

## 🛠️ Technical Architecture

Our system is a full-stack application composed of a powerful Python backend and a modern React frontend.

### **Backend**
-   **Framework:** **Flask**
-   **AI/CV Engine:** **OpenCV** for core computer vision tasks, including Canny Edge Detection and Contour Analysis.
-   **Libraries:** NumPy, Pillow

### **Frontend**
-   **Framework:** **React.js** (built with Vite)
-   **Styling:** **Tailwind CSS** & Lucide Icons

---

## 🏃 How to Run This Project

### **Backend Setup**

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the Flask server:
    ```bash
    python app.py
    ```
    *The backend will be running on `http://127.0.0.1:5000`.*

### **Frontend Setup**

1.  Open a **new terminal** in the project's root directory.
2.  Install the dependencies using `npm`:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    *The frontend will open automatically at an address like `http://localhost:5173`.*

---

## 👥 Team Members - Team MANTHAN

-   Prakash Kumar Prajapati - Team Leader
-   Abhinam Kumar Mahato
-   Satish Kumar
-   Jyoti Kumari
-   Kumari Vaishnavi
-   Sumit Ghosh
