# SummarMuse

**SummarMuse** is a modern **AI-powered document summarizer** built using **React** and **TailwindCSS**.  
It allows users to **upload PDFs**, select **Short**, **Medium**, or **Long** summaries, and **download the results** as `.txt` or `.pdf` — all in a clean, responsive, and smooth UI.

---

## Features

- Upload **PDF files** for summarization  
- Choose **summary length**: Short, Medium, or Long  
- AI-powered **concise summaries**  
- **Delete summaries** instantly  
- **Download summaries** as `.txt` or `.pdf`  
- Fully **responsive design** using TailwindCSS  
- **Smooth animations** with Framer Motion  
- Optimized performance with **Vite**

---

## Tech Stack

| Technology       | Purpose                     |
|-----------------|----------------------------|
| **React 18**    | Frontend framework        |
| **TailwindCSS** | Styling & responsive UI   |
| **Framer Motion** | UI animations           |
| **jsPDF**       | Export summaries as PDF   |
| **FileSaver.js** | Save summaries as TXT    |
| **Lucide Icons** | Clean icons              |
| **Vite**        | Fast development & build |

---


---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/SummarMuse.git
cd SummarMuse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
After running the command, open the app in your browser:
http://localhost:5173

---

## Build for Production
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## Environment Variables (Optional)
If you're using an API key for AI summarization, create a .env file in the root:
```env
VITE_API_KEY=your_api_key_here
```
Use it inside the code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## Available Commands

| Command         | Description                   |
|-----------------|-------------------------------|
| `npm install`  | Install all project dependencies |
| `npm run dev`  | Start the development server   |
| `npm run build`| Build the production-ready app |
| `npm run preview` | Preview the production build |

---

## Future Enhancements

- **Dark / Light Mode Toggle** – Provide a theme switcher for better accessibility and user preference.
- **Support for Multiple File Uploads** – Enable uploading and summarizing multiple PDFs at once.
- **Multi-Language Summaries** – Generate summaries in different languages for global accessibility.
- **Advanced AI Summarization** – Improve the summarization engine for more accurate and detailed results.

---

## License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it.

---

## Author

**Rida Fatima**  

- **Portfolio**: [Rida Fatima](https://portfolio-rida-fatimas-projects-ef57397f.vercel.app/)  
- **LinkedIn**: [Rida Fatima](https://www.linkedin.com/in/ridafatima1210/)  
- **Email**: [ridafatima121004@gmail.com](mailto:ridafatima121004@gmail.com)



