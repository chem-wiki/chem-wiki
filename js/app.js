// App State & Configuration
const App = {
    elementGroups: [],
    sidebar: document.querySelector('.sidebar'),
    markdownContent: document.getElementById('markdown-content'),
    elementList: document.getElementById('element-list'),
    
    // Core Initialization
    async init() {
        try {
            await this.loadStructure();
            Sidebar.render(this.elementGroups);
            Theme.init();
            Router.init();
            
            // Mobile Menu Toggle
            const toggle = document.getElementById('mobile-menu-toggle');
            if (toggle) {
                toggle.addEventListener('click', () => this.sidebar.classList.toggle('open'));
            }

            // Sidebar Title Click
            const title = document.getElementById('sidebar-title');
            if (title) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', () => Router.goHome());
            }

            // Check file protocol
            if (window.location.protocol === 'file:') {
                console.warn('Running via file:// protocol. Fetch may be blocked by CORS policy.');
            }

        } catch (error) {
            console.error('Initialization failed:', error);
            this.showError(error);
        }
    },

    async loadStructure() {
        const response = await fetch('structure.json');
        if (!response.ok) throw new Error(`Failed to load structure.json: ${response.status}`);
        this.elementGroups = await response.json();
    },

    showError(error) {
        const isFileProtocol = window.location.protocol === 'file:';
        const msg = isFileProtocol 
            ? '无法加载目录结构 (structure.json)。<br>原因：浏览器安全策略阻止了本地文件读取 (CORS)。<br>请使用本地服务器运行。'
            : `无法加载目录结构: ${error.message}`;
        this.elementList.innerHTML = `<li style="color: #d73a49; padding: 20px;">${msg}</li>`;
    }
};

// Routing & Navigation
const Router = {
    init() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Initial load
        const hash = window.location.hash.substring(1);
        const lastVisited = localStorage.getItem('lastVisited');

        if (hash) {
            if (this.isValidId(hash)) {
                this.loadPage(hash);
            } else {
                console.warn('Invalid hash:', hash);
                this.goHome();
            }
        } else if (lastVisited) {
            if (this.isValidId(lastVisited)) {
                // Update hash without triggering reload loop
                window.location.hash = lastVisited; 
            } else {
                this.goHome();
            }
        } else {
            this.goHome();
        }
    },

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            if (this.isValidId(hash)) {
                this.loadPage(hash);
            } else {
                this.goHome();
            }
        } else {
            this.goHome();
        }
    },

    isValidId(id) {
        return this.checkIdRecursive(App.elementGroups, id);
    },

    checkIdRecursive(groups, id) {
        if (!groups) return false;
        for (const group of groups) {
            if (group.elements && group.elements.some(el => el.id === id)) return true;
            if (group.subGroups && this.checkIdRecursive(group.subGroups, id)) return true;
        }
        return false;
    },

    async loadPage(id) {
        // Prevent double loading if we are already here (except if forced?)
        // Actually, loadPage is called on hash change, so we just load.
        
        try {
            const response = await fetch(`md/${id}.md`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const mdText = await response.text();
            
            // Render Markdown
            App.markdownContent.innerHTML = marked.parse(mdText);
            
            // Render MathJax
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise([App.markdownContent])
                    .catch(err => console.log('MathJax typeset failed: ' + err.message));
            }

            localStorage.setItem('lastVisited', id);
            Sidebar.updateActive(id);
            window.scrollTo(0, 0);

            // Close mobile sidebar
            if (window.innerWidth <= 768 && App.sidebar.classList.contains('open')) {
                App.sidebar.classList.remove('open');
            }

        } catch (error) {
            console.error('Error loading markdown:', error);
            App.markdownContent.innerHTML = this.getErrorHtml(id, error);
        }
    },

    goHome() {
        // Clear hash silently if possible
        if (window.location.hash) {
             history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        
        Sidebar.clearActive();
        localStorage.removeItem('lastVisited');
        
        Home.render();
    },

    getErrorHtml(id, error) {
        return `
            <div style="padding: 20px; color: #d73a49; border: 1px solid #d73a49; border-radius: 6px; background: #fff5f5;">
                <h3>加载失败</h3>
                <p>无法加载或解析 <code>md/${id}.md</code> 文件。</p>
                <p>错误详情: ${error.message}</p>
                <p>注意：如果您是直接双击打开的 HTML 文件，浏览器可能会因为安全策略（CORS）阻止读取本地文件。</p>
            </div>
        `;
    }
};

// Sidebar UI
const Sidebar = {
    render(groups) {
        App.elementList.innerHTML = '';
        groups.forEach(group => {
            const details = this.createDetailsGroup(group.groupName, group.elements, group.subGroups);
            App.elementList.appendChild(details);
        });
    },

    createDetailsGroup(name, elements, subGroups) {
        const details = document.createElement('details');
        details.open = true;
        
        const summary = document.createElement('summary');
        summary.className = 'group-header';
        summary.textContent = name;
        
        const ul = document.createElement('ul');
        
        if (elements) {
            elements.forEach(el => ul.appendChild(this.createListItem(el)));
        }
        
        if (subGroups) {
            subGroups.forEach(sub => {
                const subDetails = this.createDetailsGroup(sub.groupName, sub.elements, sub.subGroups);
                subDetails.style.marginLeft = '15px';
                ul.appendChild(subDetails); // Append as child of UL to keep structure
            });
        }
        
        details.appendChild(summary);
        details.appendChild(ul);
        return details;
    },

    createListItem(el) {
        const li = document.createElement('li');
        li.textContent = el.name;
        li.dataset.id = el.id;
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.hash = el.id;
        });
        return li;
    },

    updateActive(id) {
        this.clearActive();
        const activeItem = document.querySelector(`.sidebar li[data-id="${id}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            // Expand parent details
            let parent = activeItem.parentElement;
            while (parent) {
                if (parent.tagName === 'DETAILS') {
                    parent.open = true;
                }
                parent = parent.parentElement;
            }
        }
    },

    clearActive() {
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    }
};

// Home Page
const Home = {
    render() {
        App.markdownContent.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'home-container';
        container.style.padding = '20px';
        container.style.maxWidth = '1200px';
        container.style.margin = '0 auto';

        // Intro
        container.innerHTML = `
            <div class="intro-section" style="margin-bottom: 40px; padding: 30px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
                <h1 style="margin-top: 0; color: var(--text-primary); font-size: 2.2rem;">关于 Chem Wiki</h1>
                <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary);">
                    这是一个开源的化学知识库，旨在为化学竞赛学生和爱好者提供高质量、系统化的学习资源。
                    当前版本已部署于 <code>chem-wiki.llumi.org</code>。我们非常欢迎您的贡献！
                </p>
                <div style="margin-top: 20px;">
                    <button onclick="window.location.hash='contribution'" 
                            style="background-color: var(--primary-color, #007bff); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: background 0.3s;">
                        了解更多
                    </button>
                </div>
            </div>
            <h2 style="text-align: center; margin-bottom: 30px; color: var(--text-primary);">Chem Wiki 目录</h2>
            <div class="home-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;"></div>
        `;

        const grid = container.querySelector('.home-grid');
        this.renderRecursive(App.elementGroups, grid);
        
        App.markdownContent.appendChild(container);
    },

    renderRecursive(groups, container) {
        if (!groups) return;
        
        groups.forEach(group => {
            // Render items in this group
            if (group.elements) {
                group.elements.forEach(el => {
                    const card = document.createElement('div');
                    card.className = 'home-card';
                    card.onclick = () => window.location.hash = el.id;
                    card.style.cssText = `
                        background: var(--bg-secondary); 
                        padding: 20px; 
                        border-radius: 12px; 
                        cursor: pointer; 
                        border: 1px solid var(--border-color); 
                        transition: all 0.3s ease; 
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    `;
                    card.innerHTML = `<h3 style="margin: 0; font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">${el.name}</h3><span style="font-size: 0.9em; color: var(--text-secondary); opacity: 0.8;">${group.groupName}</span>`;
                    
                    // Hover effect via JS since inline styles are tricky with hover
                    card.onmouseenter = () => { card.style.transform = 'translateY(-5px)'; card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; };
                    card.onmouseleave = () => { card.style.transform = 'none'; card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'; };
                    
                    container.appendChild(card);
                });
            }
            
            // Recurse
            if (group.subGroups) {
                this.renderRecursive(group.subGroups, container);
            }
        });
    }
};

// Theme Manager
const Theme = {
    init() {
        const toggle = document.getElementById('theme-toggle');
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        
        // Check saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            iconMoon.style.display = 'none';
            iconSun.style.display = 'block';
        }

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            iconMoon.style.display = isDark ? 'none' : 'block';
            iconSun.style.display = isDark ? 'block' : 'none';
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
};

// Start the app
App.init();
