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
