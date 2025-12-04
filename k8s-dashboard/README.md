# Kubernetes Dashboard (Custom Mini Dashboard)

A lightweight Kubernetes dashboard built using:

- React + Vite (frontend)
- Node.js + Express (backend)
- Kubernetes client-node SDK

This project displays:
- Deployment details
- Pod details
- Matching Services
- Matching Ingress resources
- Simple architecture diagram (placeholder)

---

## 🚀 Features

✔ Fetch namespaces dynamically  
✔ View deployments across any namespace  
✔ Display workload, pods, services, and ingress details  
✔ Clean UI with TailwindCSS  
✔ Backend auto-loads kubeconfig from your local machine  

---

## 📁 Project Structure
k8s-dashboard/
│
├── backend/      → Node.js (Express) backend API
├── frontend/     → React UI Dashboard
└── README.md


---

## 🛠 Requirements

- Node.js 18+  
- Minikube / Kubernetes cluster  
- `kubectl` configured (`~/.kube/config` is used automatically)

---

## 📦 Install Dependencies

### 1️⃣ Backend
cd backend
npm install

### 2️⃣ Frontend
cd frontend
npm install
---

## ▶️ Running the Dashboard

### Start Backend API
cd backend
node server.mjs

The backend will start at:
http://localhost:9000

### Start Frontend
cd frontend
npm run dev
Frontend runs at:
http://localhost:5173

---

## 🔧 API Endpoints

### GET /api/namespaces
Returns all namespaces:

{
“namespaces”: [“default”, “kube-system”, “demo”]
}

### GET /api/workload?namespace=demo&deployment=demo-app
Returns:
- workload
- pods
- services
- ingresses

Example:


http://localhost:9000/api/workload?namespace=demo&deployment=demo-app

---

## 🐳 Kubernetes Permissions

Your kubeconfig must have permissions to:

- list pods
- list deployments
- list services
- list ingresses
- list namespaces

---