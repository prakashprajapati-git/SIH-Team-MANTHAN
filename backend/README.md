🚀 RockGuard AI: Real-Time Computer Vision for Mine Safety
Project for Smart India Hackathon (SIH) | Problem ID: 25071

🎯 Mission Statement
Rockfalls in open-pit mines are a severe threat to human lives and high-value equipment. Traditional safety protocols are reactive and slow. RockGuard AI transforms standard video cameras into vigilant, 24/7 AI-powered sentinels, providing a cost-effective, scalable, and intelligent early-warning system to create a proactive safety culture.

✨ Key Features
Live Visual Analysis: Utilizes a live video feed (from a webcam or drone) and a backend OpenCV engine to autonomously identify physical hazards like cracks and loose rocks in real-time.

Real-Time Annotated Feed: Detected risks are immediately highlighted with bounding boxes directly on the video stream, providing an instant, actionable "ground truth" of the mine's stability.

Centralized Dashboard: A user-friendly web interface acts as a command center, providing the live annotated video, a summary of active detections, and overall risk level assessments.

Low-Cost & Scalable: Built entirely on open-source software (Python, Flask, React) to run on commodity hardware, making it a highly accessible and scalable alternative to expensive proprietary systems.

🛠️ Technical Architecture
Backend:

Framework: Flask

AI/CV Engine: OpenCV for core computer vision tasks, including Canny Edge Detection and Contour Analysis.

Libraries: NumPy, Pillow

Frontend:

Framework: React.js (built with Vite)

Styling: Tailwind CSS & Lucide Icons

🏃 How to Run This Project
Backend Setup
Navigate to the backend directory: cd backend

Create and activate a Python virtual environment:

python -m venv venv
.\venv\Scripts\activate

Install dependencies: pip install -r requirements.txt

Run the Flask server: python app.py
(Backend will run on http://127.0.0.1:5000)

Frontend Setup
Open a new terminal in the root directory.

Install dependencies: npm install

Run the development server: npm run dev
(Frontend will open automatically)