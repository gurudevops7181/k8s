# Kubernetes Mini Dashboard

A local React and Express app for viewing a Kubernetes Deployment and its related Pods, Services, and Ingresses. The backend reads cluster resources using the kubeconfig available to its process.

For full requirements, Kubernetes permissions, API details, and build instructions, see the [repository README](../README.md).

## Quick start

Requirements: Node.js 18 or newer, npm, and access to a Kubernetes cluster through a configured kubeconfig.

Run these commands from the `k8s-dashboard/` directory:

```sh
cd backend
npm ci

cd ../frontend
npm ci
```

Start the backend in one terminal, from `k8s-dashboard/`:

```sh
cd backend
node server.mjs
```

Start the frontend in another terminal, also from `k8s-dashboard/`:

```sh
cd frontend
npm run dev
```

The backend listens on <http://localhost:9000>. Open the Vite URL shown in the frontend terminal, typically <http://localhost:5173>.
