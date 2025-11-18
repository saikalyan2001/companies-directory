<img width="1352" height="114" alt="Header Light" src="https://github.com/user-attachments/assets/f4167776-a5b6-4d26-bea0-aed652d888af" /># 📘 Companies Directory – Frontend Assessment

A comprehensive, responsive React-based web application designed to display a directory of companies with functionalities such as **searching, filtering, sorting, pagination**, and **API integration (mocked)**. This project was created for a **Frontend Developer Technical Assessment** and showcases robust UI/UX, accessibility, and performance optimizations.

---

## 🚀 Live Demo  
🔗 **Live URL:** *<https://companies-directory-application.netlify.app/>*  

---

## 🧑‍💻 Tech Stack  
- **React.js (Vite)** – for fast and modern React development  
- **Tailwind CSS** – utility-first CSS framework for rapid styling  
- **JavaScript (ES6+)** – modern JavaScript language features  
- **Axios** – HTTP client for API requests  
- **Mock API** – static JSON data placed under `/public/data/companies.json`  
- **Netlify** – for deployment and hosting  

---

## 📂 Features  

### ✔ Core Features
- **Company List Display**  
  - Card View: Rich card UI presenting company details  
  - Table View: Compact tabular representation for quick scanning  
  - Fully responsive design adapting to mobile, tablet, and desktop  

- **Filters**  
  - Filter companies by **Location** and **Industry**  
  - Search companies by **Name** or **Industry** keywords  
  - Active filter pills showing selected filters  
  - Clear all filters option  

- **Sorting Options**  
  - Name alphabetically: A → Z / Z → A  
  - Employees count: High → Low / Low → High  
  - Founded year: Newest → Oldest / Oldest → Newest  

- **Pagination**  
  - Navigable page numbers with intelligent ellipsis  
  - Next and Previous buttons  
  - Displays the current items per page count  
  - Smooth scroll to top on page change  

- **Loading & Error States**  
  - Custom loading indicator with branded visual  
  - Skeleton loading placeholders during data fetch  
  - Detailed, user-friendly error messages with retry and navigation options  

### ⭐ Bonus Features Implemented  
- **Favorites System**: Mark companies as favorites with localStorage persistence  
- **Dual Layout Toggling**: Switch between cards and table view  
- **Export to CSV**: Download filtered company data  
- **Stats Dashboard**: Overview cards showing total companies, locations, industries, and filtered results  
- **Scroll to Top Button**: With scroll progress indicator  
- **Dark/Light Theme Toggle**: Persistent theme preference  
- **Help Modal**: Interactive help guide with keyboard shortcuts  
- **Mobile Menu**: Touch-optimized navigation  
- **Company Details Modal**: Detailed view of individual companies  
- **Quick Actions Menu**: Favorite and share company profiles  
- **Status Badges**: Visual indicators for company status  
- **Accessibility Compliance**: ARIA roles, keyboard navigation, focus management  
- **Mobile Touch Animations**: Enhanced mobile user experience  
- **Tooltips**: Contextual help for UI elements  

---

## 🗂️ Project Structure  

```
companies-directory/
├── public/
│   └── data/
│       └── companies.json           # Mock API data source JSON file
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx           # App header with theme toggle
│   │   │   ├── Footer.jsx           # App footer
│   │   │   ├── MobileMenu.jsx       # Mobile navigation menu
│   │   │   └── HelpModal.jsx        # Help and info modal
│   │   ├── dashboard/
│   │   │   └── StatsDashboard.jsx   # Statistics cards
│   │   ├── filters/
│   │   │   └── Filters.jsx          # Search and filter controls
│   │   ├── company/
│   │   │   ├── CompanyList.jsx      # List wrapper component
│   │   │   ├── CompanyCard.jsx      # Card view component
│   │   │   ├── CompanyTable.jsx     # Table view component
│   │   │   ├── CompanyDetailsModal.jsx # Detailed company view
│   │   │   └── QuickActionsMenu.jsx # Quick actions dropdown
│   │   ├── pagination/
│   │   │   └── Pagination.jsx       # Pagination controls
│   │   └── ui/
│   │       ├── Button.jsx           # Reusable button component
│   │       ├── LoadingState.jsx     # Skeleton loading screen
│   │       ├── BrandedLoadingState.jsx # Branded spinner loading
│   │       ├── ErrorState.jsx       # Error display with actions
│   │       ├── ScrollToTop.jsx      # Scroll to top button
│   │       ├── Spinner.jsx          # Loading spinner variants
│   │       ├── Tooltip.jsx          # Tooltip component
│   │       └── Skeleton.jsx         # Skeleton placeholders
│   ├── context/
│   │   └── ThemeContext.jsx         # Theme context provider
│   ├── hooks/
│   │   ├── useFetch.js              # Data fetching with caching
│   │   ├── useFilter.js             # Filtering and sorting logic
│   │   ├── useLocalStorage.js       # Persistent state management
│   │   └── useDebounce.js           # Debounce hook for search
│   ├── utils/
│   │   ├── constants.js             # App constants (API URL, page size)
│   │   └── helpers.js               # Utility functions (CSV export)
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # React DOM entry point
│   └── index.css                    # Tailwind and global styles
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── vite.config.js                   # Vite build configuration
├── index.html                       # HTML entry point
└── README.md                        # Project documentation
```

---

## 🛠️ Installation & Setup  

### Prerequisites
- Node.js (version 14 or higher)  
- npm package manager  

### Steps  

#### 1️⃣ Clone the repository  
```bash
git clone github.com/saikalyan2001/companies-directory.git
cd companies-directory
```

#### 2️⃣ Install dependencies  
```bash
npm install
```

#### 3️⃣ Run the development server  
```bash
npm run dev
```

#### 4️⃣ Open the app  
Visit: http://localhost:5173  

---

## 🗂 API / Data Source  

### Mock API  
Located at:  
`/public/data/companies.json`

### Data Structure  
```json
{
  "companies": [
    {
      "id": 1,
      "name": "Company Name",
      "location": "City, Country",
      "country": "Country",
      "industry": "Industry Type",
      "employees": 500,
      "founded": 2015,
      "description": "Company description"
    }
  ]
}
```

### Fetching Data (Axios)
```javascript
const response = await axios.get('/data/companies.json');
```

### Caching Strategy  
- Caches first fetch using **localStorage**  
- Loads instantly next time  
- Still fetches fresh data silently  

---

## 📤 Deployment  

### Build for Production  
```bash
npm run build
```

### Output  
- Build folder: `dist/`  

### Deployment Platforms  
**Netlify**  
- Build: `npm run build`  
- Publish: `dist`  
---

## 🧪 Project Approach & Architecture  

### Component Architecture  
- Modular, reusable components  
- Custom hooks for logic separation  
- Context API for theme  
- Clean composition pattern  

### State Management  
- Local state via `useState`  
- Persistent state via `localStorage`  
- Debounced search  
- Derived state for filters + sorting  

### Performance Optimizations  
- Cached API data  
- Debounced search input  
- Lazy computation  
- Passive scroll listeners  
- Minimum perceived loading time  

### Accessibility  
- ARIA labels  
- Keyboard navigation  
- Screen reader compatible  
- Correct tab indexing  
- Color contrast compliance  

### Responsive Design  
- Mobile-first  
- Touch optimized  
- Uses Tailwind breakpoints  
- Table → Card adaptation  

---

## 🎨 Design System  

### Colors  
- Blue gradient primary  
- White/light surfaces  
- Dark Mode: gray-900 background  

### Fonts  
- System stack for performance  

### Animations  
- Fade, slide, pulse, spin, scale  
- Respects **prefers-reduced-motion**  

---

## 🔑 Key Features Explained  

### Smart Filtering  
- Combined search + dropdown filters  
- Debounced for performance  

### Sorting  
- Multiple criteria + directions  

### Favorites  
- Saved in localStorage  

### CSV Export  
- Filtered data export  

### Theme Toggle  
- Light/dark persistent themes  

### Statistics Dashboard  
- Real-time summary cards  

---

## 📊 Data Coverage  

Includes companies from:  
- India, USA, Germany  
- UK, China, Canada  
- Australia  
Across industries:  
- Tech, Finance, Healthcare  
- Retail, Energy, Travel  
- Construction, Education  
…and more  

---

## 🧰 Libraries Used  

- React  
- Vite  
- Tailwind CSS  
- Axios  
- localStorage / sessionStorage  

---

## 📱 Browser Support  

Fully supports:  
- Chrome  
- Edge  
- Firefox  
- Safari  
- Mobile browsers  

---

## 🐛 Known Issues  
- None currently reported  

---

## 🚀 Future Enhancements  
- Real API  
- Company comparison  
- Review & rating system  
- Maps integration  
- Shareable filter URLs  
- Analytics Dashboard  

---

## 📸 Screenshots  

## 📸 Header/Navbar – Light Mode
![Header Light](https://github.com/user-attachments/assets/8f6d067c-4935-41bc-9f5b-8aeabfb84b5a)

## 📸 Header/Navbar – Dark Mode
![Header Light](https://github.com/user-attachments/assets/094bc4ca-6381-43f4-b08f-70791c41b236)

## 📸 Help & Info – Light Mode
![Help Info Light](https://github.com/user-attachments/assets/39d0de23-861c-4b5f-9928-ea3ce606d72d)

## 📸 Help & Info – Dark Mode
![Header Light](https://github.com/user-attachments/assets/a18db459-3fdb-4df8-b71e-3b27d4fd995b)

## 📸 Status Cards – Light Mode
![Stats Light](https://github.com/user-attachments/assets/f9f88cc9-8a5b-4a04-9472-f21f353dd86e)

## 📸 Status Cards – Dark Mode
![Header Light](https://github.com/user-attachments/assets/d4e8f1a0-5eeb-4722-aabf-852c3d6f240d)

## 📸 Filters – Light Mode
![Filters Light](https://github.com/user-attachments/assets/b77cf465-b261-49ca-90f9-507d23962c43)

## 📸 Filters – Dark Mode
![Header Light](https://github.com/user-attachments/assets/3a9d18a9-172f-430f-acf9-240e1c960c40)

## 📸 Company Cards – Light Mode
![Cards Light](https://github.com/user-attachments/assets/5c290f7f-05b0-4fac-b86c-105a2e4016d3)

## 📸 Company Cards – Dark Mode
![Header Light](https://github.com/user-attachments/assets/85320473-f79c-4e3c-b0ba-6cc7598e3cea)

## 📸 Favorites – Light Mode
![Fav Light](https://github.com/user-attachments/assets/e2404a57-afd4-4dc8-81a2-7e536100691d)

## 📸 Favorites – Dark Mode
![Header Light](https://github.com/user-attachments/assets/c10f84d6-e3fd-476d-8bc6-4feb162408f6)

## 📸 View Details – Light Mode
![View Details Overview](https://github.com/user-attachments/assets/0b663bde-9668-4c47-8803-c10f893c8e41)
![View Details contact](https://github.com/user-attachments/assets/caecec2b-cb31-4a91-bba7-d03d8404c690)
![View Details Stats](https://github.com/user-attachments/assets/af0751fc-c773-4dec-a673-52532f07b4f7)

## 📸 View Details – Dark Mode
![Header Light](https://github.com/user-attachments/assets/6715074b-dcb8-471d-a2d2-cac5c1708f56)

## 📸 Table View – Light Mode
![View Details Overview](https://github.com/user-attachments/assets/a7d53438-6e2a-4a97-a3ef-801eb0ed810a)

## 📸 Table View – Dark Mode
![Header Light](https://github.com/user-attachments/assets/164a298e-8ff9-4305-86df-f98a98ea1253)

## 📸 Pagination – Light Mode
![Pagination Light](https://github.com/user-attachments/assets/c00e8f18-2001-438a-a285-85e2dfaf488c)

## 📸 Pagination – Dark Mode
![Header Light](https://github.com/user-attachments/assets/88f46133-e954-4c5d-87fe-4d2e46975d7f)

## 📸 Footer – Light Mode
![Footer Light](https://github.com/user-attachments/assets/942bc71f-6623-41e2-b5af-dcfa51106730)

## 📸 Footer – Dark Mode
![Header Light](https://github.com/user-attachments/assets/db5b6904-281b-4de0-a6a1-8c67bf446c78)

## 📸 Loading – Light Mode
![Loading Light](https://github.com/user-attachments/assets/119073e5-0ffe-426b-9028-8b7a617715ef)

## 📸 Loading – Dark Mode
![Loading Dark](https://github.com/user-attachments/assets/34e4e483-1063-4909-8852-54d3da050c67)

## 📸 Mobile View
![1](https://github.com/user-attachments/assets/db6b929f-c6fd-47cd-b9df-b0d988e9325b)
![2](https://github.com/user-attachments/assets/5b040d70-c91d-473e-a7f5-8cc77b253316)
![3](https://github.com/user-attachments/assets/dee585ec-ef57-4c90-b0b5-244809bb3cae)
![4](https://github.com/user-attachments/assets/5c2371f9-6162-4563-9943-a984b20c813a)
![5](https://github.com/user-attachments/assets/2716ef9f-f74e-4c01-a2d5-d32d0c274e96)
![6](https://github.com/user-attachments/assets/a85c3633-11ed-44e9-b640-5f597944ae6c)
![7](https://github.com/user-attachments/assets/baee3734-4557-4538-9cb4-a0af0657fab4)
![8](https://github.com/user-attachments/assets/2679d43e-3d7f-4d15-898a-3cce4135780d)
![9](https://github.com/user-attachments/assets/65a33f6d-36ad-4b4e-b20e-030b4606599b)
![10](https://github.com/user-attachments/assets/1c80f4ba-ddb4-4029-bc0b-1be7d56bec0c)
![11](https://github.com/user-attachments/assets/d680d3c4-0a45-490f-8a45-dbf3bfbeca1a)
![12](https://github.com/user-attachments/assets/e87aedfe-bc0d-4f6e-9f21-1a8ded660191)

---

## 🎥 Demo Video  
( video link here)


---

## 🙌 Author  
**Sai Kalyan Bursu**  
Frontend Developer  
📧 saikalyan20013@gmail.com  
🔗 GitHub: https://github.com/saikalyan2001/companies-directory 
🔗 LinkedIn: https://www.linkedin.com/in/sai-kalyan-bursu-571454241/

---

## 🙏 Acknowledgments  
- React.js Community  
- Tailwind CSS  
- Vite  

---

## 📞 Support  
For issues or questions:  
- Email: saikalyan20013@gmail.com 

---

**Thank you for reviewing this project!** 🚀
