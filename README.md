🚀 Kubernetes Mini Dashboard – React + Node.js + Minikube

This project is a lightweight Kubernetes Dashboard built using:
	•	Frontend: React + Vite + TailwindCSS
	•	Backend: Node.js + Express + Kubernetes Client SDK
	•	Cluster: Minikube (or any local Kubernetes cluster)

It visualizes workload relationships such as:
	•	Deployment
	•	Services attached
	•	Ingress routes
	•	Running Pods
	•	Namespaces

	This is ideal for learning Kubernetes object relationships and building a custom internal UI.
📂 Project Structure

k8s-dashboard/
├── backend/
│   ├── server.mjs
│   ├── package.json
│   ├── k8s/
│   │   ├── fetchResources.mjs
│   │   └── findMatchingIngresses.js
│   └── node_modules/
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.cjs
    ├── tailwind.config.cjs
    └── src/
        ├── App.jsx
        ├── api.js
        ├── index.css
        ├── components/
        │   ├── WorkloadCard.jsx
        │   ├── ServiceCard.jsx
        │   ├── PodsCard.jsx
        │   ├── IngressCard.jsx
        │   └── Diagram.jsx

🧩 Features

✔ Fetch Namespaces

Lists namespaces dynamically from Kubernetes API.

✔ Fetch Workload Details

For a selected namespace + deployment:
	•	Deployment details
	•	Related service(s)
	•	Related ingress rules
	•	Related pods

✔ Automatic Matching Logic

The backend links objects using:
	•	metadata.labels
	•	spec.selector.matchLabels
	•	Ingress backend service references

✔ Interactive UI

React UI shows:
	•	Deployment overview
	•	Services
	•	Pods
	•	Ingress
	•	Connection diagram (optional visual graph)
	🔧 Backend (Node.js + Express)
Start Backend
cd backend
npm install
node server.mjs

Backend runs at:
http://localhost:9000

📡 API Endpoints
1. Get Namespaces
   GET /api/namespaces
Response:
{
  "namespaces": ["default", "demo", "kube-system"]
}

2. Get Workload + Related Objects
   GET /api/workload?namespace=demo&deployment=demo-app

   Response contains:
   {
  "workload": {},
  "matchingServices": [],
  "matchingIngresses": [],
  "pods": [],
  "namespaces": []
}
🎨 Frontend (React + Vite + TailwindCSS)

Start Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

⚙ TailwindCSS Configuration

tailwind.config.cjs

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
🐳 Minikube Setup
Apply sample app:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

Add host entry:
sudo nano /etc/hosts
192.168.49.2   demo.local
![Dashboard Screenshot](https://github.com/user-attachments/assets/a79d0f91-89e9-4f69-a019-823cbb4824b1)
