Kubernetes Dashboard (Full-Stack App)

A full-stack Kubernetes Dashboard built with:
	•	Backend: Node.js (Express, ES Modules)
	•	Frontend: React (Vite, TailwindCSS)
	•	Kubernetes Integration: Custom scripts to fetch Pods, Services, Deployments, and Ingress mappings

This dashboard provides a simplified UI to visualize Kubernetes resources in any cluster that your kubeconfig has access to.

⸻
📁 Project Structure
k8s-dashboard/
│
├── backend/
│   ├── package.json
│   ├── server.mjs
│   └── k8s/
│       ├── fetchResources.mjs
│       └── findMatchingIngresses.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── api.js
│       ├── components/
│       │   ├── WorkloadCard.jsx
│       │   ├── PodCard.jsx
│       │   ├── ServiceCard.jsx
│       │   ├── IngressCard.jsx
│       │   └── Diagram.jsx
│       └── index.css
│
└── README.md


🖥️ Features

Backend

✔ Fetch Kubernetes resources
✔ Pods, Deployments, Services, Ingresses
✔ Ingress → Service → Pod matching
✔ Lightweight Express server
✔ Uses local kubeconfig (same as kubectl)

Frontend

✔ Clean UI with TailwindCSS
✔ Live resource cards
✔ Relationship diagram (Ingress → Service → Pod)
✔ API communication with backend
✔ Vite-powered fast development environment


⚙️ Backend Setup (Node.js + Express)
1️⃣ Navigate to backend
cd backend
2️⃣ Install dependencies
npm install
3️⃣ Start backend server
node server.mjs
Backend Default Port
http://localhost:3000

Kubernetes Access

Backend reads your kubeconfig from:
~/.kube/config
If you want to specify another file:
export KUBECONFIG=/path/to/config


🎨 Frontend Setup (React + Vite)

1️⃣ Navigate to frontend
cd frontend
2️⃣ Install dependencies
npm install
3️⃣ Start UI
npm run dev
Vite default UI URL:
http://localhost:5173

🔗 API Endpoints

GET /api/resources

Fetch all cluster resources:
	•	Pods
	•	Deployments
	•	Services
	•	Ingress

GET /api/ingress/match

Matches:
Ingress → Service → Pods
Output example:
{
  "ingress": "my-app",
  "service": "my-service",
  "pods": ["my-app-7d4f45f8c7-x92bc", "my-app-7d4f45f8c7-wk2dp"]
}

🚀 How It Works (Flow)

1️⃣ Backend connects to Kubernetes using kubeconfig
2️⃣ Fetches resources via Kubernetes API
3️⃣ Normalizes and sends data to frontend
4️⃣ Frontend displays:
	•	Pods
	•	Services
	•	Deployments
	•	Ingress
5️⃣ Diagram visually connects:
Ingress → Service → Pod
