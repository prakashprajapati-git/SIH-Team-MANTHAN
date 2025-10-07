# 🚀 MineGuard AI Backend Setup Guide

This guide will help you set up the **fully functional AI-powered Live Webcam system** for mine risk detection.

## 🎯 What You'll Get

- **Real AI Detection**: Computer vision-based detection of mine risks
- **Live Camera Feed**: Connect your phone's camera for real-time monitoring
- **Risk Assessment**: Automatic risk level calculation (Critical, High, Medium, Low)
- **Visual Annotations**: AI overlays showing detected risks on video feed
- **Multiple Risk Types**: Detects cracks, loose rocks, gas leaks, structural damage

## 📋 Prerequisites

- **Python 3.7 or higher** installed on your system
- **pip** package manager
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **HTTPS connection** (required for camera access)

## 🚀 Quick Start (Windows)

### Step 1: Start the AI Backend Server

**Option A: Using the Batch File (Recommended)**
```bash
# Double-click the file or run in command prompt:
start_ai_backend.bat
```

**Option B: Manual Setup**
```bash
# Open Command Prompt and run:
cd backend
pip install -r requirements.txt
python app.py
```

### Step 2: Start the Frontend

In a **new command prompt window**:
```bash
npm run dev
```

### Step 3: Access the System

1. Open your browser and go to: `http://localhost:5173`
2. Login with: `admin@mineguard.com` / `admin123`
3. Navigate to **"Live Webcam"** in the sidebar
4. Click **"Start Camera"** and allow camera permissions
5. Point your camera at the area you want to monitor

## 🐧 Quick Start (Linux/Mac)

### Step 1: Start the AI Backend Server

```bash
# Make the script executable and run:
chmod +x start_ai_backend.sh
./start_ai_backend.sh
```

### Step 2: Start the Frontend

In a **new terminal window**:
```bash
npm run dev
```

### Step 3: Access the System

Same as Windows instructions above.

## 📱 Using Your Phone Camera

### Mobile Setup:
1. **Connect your phone to the same WiFi** as your computer
2. **Find your computer's IP address**:
   - Windows: Run `ipconfig` in Command Prompt
   - Mac/Linux: Run `ifconfig` in Terminal
3. **Access from phone**: `http://YOUR_IP_ADDRESS:5173`
4. **Login and navigate to Live Webcam**
5. **Allow camera permissions** when prompted
6. **Point camera at mine area** for AI detection

## 🔧 Backend API Endpoints

The AI backend provides these endpoints:

- `GET /api/health` - Check server status
- `POST /api/process_frame` - Process camera frame for AI detection
- `POST /api/start_detection` - Start continuous detection
- `POST /api/stop_detection` - Stop detection
- `GET /api/detection_status` - Get current detection results
- `POST /api/calibrate` - Calibrate detection parameters
- `POST /api/emergency_stop` - Emergency stop all systems

## 🎯 AI Detection Features

### Risk Types Detected:
1. **Cracks** - Structural cracks and fissures (High severity)
2. **Loose Rock** - Unstable rock formations (Medium severity)
3. **Gas Leak** - Hazardous gas detection (Critical severity)
4. **Structural Damage** - Building/mine structure issues (High severity)
5. **Slope Instability** - Ground movement indicators (Critical severity)
6. **Water Accumulation** - Water-related hazards (Medium severity)

### Risk Levels:
- **🔴 Critical**: Immediate danger requiring evacuation
- **🟠 High**: Significant risk requiring immediate attention
- **🟡 Medium**: Moderate risk requiring monitoring
- **🟢 Low**: Minimal risk, normal operations

## 🖥️ System Requirements

### Backend (Python):
- Python 3.7+
- OpenCV 4.8+
- Flask 2.3+
- NumPy 1.24+
- Pillow 10.0+

### Frontend (React):
- Node.js 16+
- Modern web browser
- HTTPS connection (for camera access)

## 🔍 Troubleshooting

### Backend Issues:

**Port 5000 already in use:**
```bash
# Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

**Python/OpenCV installation issues:**
```bash
# Uninstall and reinstall OpenCV
pip uninstall opencv-python
pip install opencv-python-headless
```

**Permission errors:**
```bash
# On Linux/Mac, make scripts executable:
chmod +x start_ai_backend.sh
```

### Frontend Issues:

**Camera not working:**
- Ensure you're using HTTPS (required for camera access)
- Check browser permissions for camera access
- Try refreshing the page and allowing permissions again

**Backend connection failed:**
- Verify the backend server is running on port 5000
- Check firewall settings
- Ensure both frontend and backend are running

### Mobile Issues:

**Can't access from phone:**
- Ensure phone and computer are on same WiFi network
- Check computer's firewall settings
- Use the computer's IP address instead of localhost

## 🎮 How to Use

### Basic Usage:
1. **Start both servers** (backend and frontend)
2. **Open the webcam page** in your browser
3. **Click "Start Camera"** and allow permissions
4. **Point camera at mine area** you want to monitor
5. **AI will automatically detect risks** and show overlays
6. **Monitor the detection panel** for risk assessments

### Advanced Features:
- **Screenshot**: Capture images of detected risks
- **Video Recording**: Record video evidence
- **Fullscreen Mode**: Full-screen viewing for better analysis
- **Emergency Stop**: Immediate safety response
- **Calibration**: Adjust detection sensitivity

## 📊 Performance Tips

### For Better Detection:
- **Good lighting**: Ensure adequate lighting for better image quality
- **Stable camera**: Keep camera steady for consistent detection
- **Clear view**: Avoid obstructions in camera view
- **Regular calibration**: Calibrate the system periodically

### For Better Performance:
- **Close other applications** to free up system resources
- **Use wired internet** for more stable connection
- **Restart servers** if detection becomes slow

## 🆘 Support

### If you encounter issues:

1. **Check the console logs** in your browser (F12)
2. **Check the backend terminal** for error messages
3. **Verify all requirements** are installed correctly
4. **Test API endpoints** using curl or Postman
5. **Restart both servers** if problems persist

### Common Error Messages:

- **"Cannot connect to AI backend server"**: Backend not running
- **"Failed to access camera"**: Camera permissions not granted
- **"Backend server not responding"**: Backend crashed or not started

## 🎉 Success!

Once everything is running, you should see:

- ✅ **Backend Status**: "Backend: CONNECTED" (green)
- ✅ **AI Detection**: "AI Detection: ON" (green)
- ✅ **Live Video Feed**: Your camera feed with AI overlays
- ✅ **Risk Detection**: Real-time detection results in the panel
- ✅ **Annotated Images**: AI-processed images with detection boxes

**Your AI-powered mine risk detection system is now fully functional!** 🚀

---

## 📞 Need Help?

If you need assistance:
1. Check this guide first
2. Look at the console logs for error messages
3. Verify all prerequisites are met
4. Test each component individually

**Happy mining safely with AI!** ⛏️🤖
