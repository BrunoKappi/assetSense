# AssetSense

AssetSense is a comprehensive asset management system designed to streamline the tracking, organization, and maintenance of your organization's assets.

**Landing Page:** [https://assetsense.bkappi.com/](https://assetsense.bkappi.com/)

## Features

- **Dashboard:** An intuitive overview of your assets and system status (Supports Light and Dark Mode).
- **Asset Management:** List, view, and organize all assets efficiently.
- **Transactions & Records:** Keep track of asset withdrawals, returns, and maintenance records.
- **Configurations:** Manage system settings, asset types, storage locations, and more.
- **Access Control:** Manage user permissions and roles.

## Technologies

This project is built with:
- **React (v18)**
- **Vite**
- **Firebase** (Authentication, Firestore Database, Storage)
- **Redux** (State Management)
- **Bootstrap / React Bootstrap** (UI Components)
- **ApexCharts** (Data Visualization)

## Screenshots

### Home Page / Dashboard
**Light Mode:**
![Home Page Light Mode](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/HomePageDashBoard_Light.png)

**Dark Mode:**
![Home Page Dark Mode](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/HomePageDashBoard_Dark.png)

### Asset List
**Light Mode:**
![Asset List Light Mode](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/TelaDeListagemDeAtivosLight.png)

**Dark Mode:**
![Asset List Dark Mode](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/TelaDeListagemDeAtivosDark.png)

### Asset Details View
![Asset Details](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/TelaDeVisualizacaoDeAtivos.png)

### Withdrawal Registration Modal
![Withdrawal Modal](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/ModalDeRegistroDeRetiradaDeAtivo.png)

### Configurations Page
![Configurations](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/TelaDeConfiguracoes.png)

### Request Configurations
![Request Configurations](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/ConfiguracoesDeSoliticoes.png)

### My Permissions Modal
![Permissions](https://cdn.bkappi.com/ProjectsAssets/AssetSense/GithubReadmeAssets/ModalDeMinhasPermissoes.png)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Firebase Project setup

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env` and fill in your Firebase configuration values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To build the project for production:

```bash
npm run build
```
