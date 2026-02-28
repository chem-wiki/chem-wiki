// 元素列表配置（按族/类别分组）
let elementGroups = [];

// DOM 元素
const elementList = document.getElementById('element-list');
const markdownContent = document.getElementById('markdown-content');
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// 初始化
async function init() {
    try {
        const response = await fetch('structure.json');
        if (!response.ok) {
            throw new Error(`Failed to load structure.json: ${response.status}`);
        }
        elementGroups = await response.json();
        renderSidebar();
        
        // 默认加载逻辑：检查是否有上次访问记录
        const lastVisited = localStorage.getItem('lastVisited');
        
        // 验证 ID 是否有效（防止存入无效路径导致加载失败）
        let isValidId = false;

        const checkIdRecursive = (groups, id) => {
            if (!groups) return false;
            for (const group of groups) {
                if (group.elements && group.elements.some(el => el.id === id)) {
                    return true;
                }
                if (group.subGroups && checkIdRecursive(group.subGroups, id)) {
                    return true;
                }
            }
            return false;
        };

        if (lastVisited) {
            isValidId = checkIdRecursive(elementGroups, lastVisited);
        }
        
        // Check if we are on file protocol - if so, warn about potential fetch issues
        if (window.location.protocol === 'file:') {
             console.warn('Running via file:// protocol. Fetch may be blocked by CORS policy.');
        }

        if (isValidId) {
            console.log('Restoring last visited page:', lastVisited);
            loadElement(lastVisited);
        } else {
            if (lastVisited) {
                console.warn('Invalid or obsolete lastVisited ID:', lastVisited);
                localStorage.removeItem('lastVisited');
            }
            renderHome();
        }
    } catch (error) {
        console.error('Initialization failed:', error);
        const isFileProtocol = window.location.protocol === 'file:';
        const errorMsg = isFileProtocol 
            ? '无法加载目录结构 (structure.json)。<br>原因：浏览器安全策略阻止了本地文件读取 (CORS)。<br>请使用本地服务器运行 (如 VS Code Live Server 或 python -m http.server)。'
            : `无法加载目录结构: ${error.message}`;
            
        elementList.innerHTML = `<li style="color: #d73a49; padding: 20px;">${errorMsg}</li>`;
    }

    initTheme();
    
    // 移动端菜单切换
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // 侧边栏标题点击回首页
    const sidebarTitle = document.getElementById('sidebar-title');
    if (sidebarTitle) {
        sidebarTitle.style.cursor = 'pointer';
        sidebarTitle.addEventListener('click', () => {
            renderHome();
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// 渲染侧边栏
function renderSidebar() {
    elementList.innerHTML = ''; // Clear existing content
    
    // Helper function to create list items
    const createListItem = (el) => {
        const li = document.createElement('li');
        li.textContent = el.name;
        li.dataset.id = el.id;
        li.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling details when clicking item
            loadElement(el.id);
            // 在移动端点击后自动收起侧边栏
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('open');
            }
        });
        return li;
    };

    // Helper function to create a details group
    const createDetailsGroup = (name, elements, subGroups) => {
        const details = document.createElement('details');
        details.open = true; // Default open
        
        const summary = document.createElement('summary');
        summary.className = 'group-header';
        summary.textContent = name;
        summary.style.cursor = 'pointer';
        summary.style.userSelect = 'none';
        
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        ul.style.margin = '0';
        
        // Render top-level elements if any
        if (elements) {
            elements.forEach(el => {
                ul.appendChild(createListItem(el));
            });
        }
        
        // Render sub-groups if any
        if (subGroups) {
            subGroups.forEach(sub => {
                // Nested groups usually have their own details/summary structure
                // But we can just append them as nested details inside the UL or directly in details
                // To keep indentation nice, let's put them in the UL but as a special item
                const subDetails = createDetailsGroup(sub.groupName, sub.elements, sub.subGroups);
                subDetails.style.marginLeft = '15px'; // Indent subgroups
                
                // Wrap in li or just append? 
                // Let's just append to details directly to avoid li bullet issues if styles aren't perfect,
                // BUT current CSS targets ul li. 
                // Let's stick to the structure: details > summary + ul > li
                // For nested groups, it's: details > summary + ul > (li > details...)
                
                const li = document.createElement('li');
                li.style.listStyle = 'none';
                li.appendChild(subDetails);
                ul.appendChild(li);
            });
        }

        details.appendChild(summary);
        details.appendChild(ul);
        return details;
    };

    elementGroups.forEach(group => {
        const details = createDetailsGroup(group.groupName, group.elements, group.subGroups);
        elementList.appendChild(details);
    });
}

// 渲染首页（完整目录）
function renderHome() {
    // 清除侧边栏选中状态
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    
    // 清除上次访问记录
    localStorage.removeItem('lastVisited');

    let html = '<div class="home-container" style="padding: 20px; max-width: 1200px; margin: 0 auto;">';
    
    // Intro Section
    html += `
        <div class="intro-section" style="margin-bottom: 40px; padding: 30px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
            <h1 style="margin-top: 0; color: var(--text-primary); font-size: 2.2rem;">关于 Chem Wiki</h1>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary);">
                这是一个开源的化学知识库，旨在为化学竞赛学生和爱好者提供高质量、系统化的学习资源。
                当前版本已部署于 <code>chem-wiki.llumi.org</code>。我们非常欢迎您的贡献！
            </p>
            <div style="margin-top: 20px;">
                <button onclick="loadElement('contribution')" 
                        style="background-color: var(--primary-color, #007bff); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: background 0.3s;">
                    了解更多
                </button>
            </div>
        </div>
    `;

    html += '<h2 style="text-align: center; margin-bottom: 30px; color: var(--text-primary);">Chem Wiki 目录</h2>';
    
    // Helper for cards
    const renderCard = (el) => `
        <div class="home-card" 
              onclick="loadElement('${el.id}')"
              style="background: var(--bg-secondary); padding: 20px; border-radius: 12px; cursor: pointer; border: 1px solid var(--border-color); transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">${el.name}</h3>
        </div>`;

    // Recursive function to render groups
    const renderGroup = (group, level) => {
        // level defaults to 2 if not provided (called from loop)
        level = level || 2;
        
        // Wrapper for the group
        let groupHtml = `<div class="home-group" style="margin-bottom: 20px; ${level > 2 ? 'margin-left: 20px; border-left: 2px solid var(--border-color); padding-left: 15px;' : ''}">`;
        
        // Details/Summary structure
        // Only use details if it's not the root or if specifically desired. Here we use it for all.
        // We set it to open by default
        groupHtml += `<details open>
            <summary style="font-size: ${level === 2 ? '1.5rem' : '1.2rem'}; font-weight: bold; cursor: pointer; margin-bottom: 15px; padding: 10px; border-bottom: ${level === 2 ? '2px solid var(--border-color)' : 'none'}; outline: none; list-style: none;">
                ${group.groupName}
            </summary>
            <div style="padding-top: 10px;">`;

        // Render direct elements (if any)
        if (group.elements && group.elements.length > 0) {
             groupHtml += `<div class="home-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">`;
             group.elements.forEach(el => {
                groupHtml += renderCard(el);
             });
             groupHtml += `</div>`;
        }

        // Render subgroups (if any)
        if (group.subGroups) {
             group.subGroups.forEach(sub => {
                groupHtml += renderGroup(sub, level + 1);
            });
        }
        
        groupHtml += `</div></details></div>`;
        return groupHtml;
    };
    
    elementGroups.forEach(group => {
        html += renderGroup(group);
    });
    
    html += '</div>';
    
    // Add some inline styles for hover effects
    const styleId = 'home-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .home-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
                border-color: var(--primary-color, #007bff) !important;
            }
            details > summary {
                list-style: none; /* Hide default triangle in some browsers */
            }
            details > summary::-webkit-details-marker {
                display: none;
            }
            details > summary::before {
                content: '▶';
                display: inline-block;
                margin-right: 8px;
                font-size: 0.8em;
                transition: transform 0.2s;
            }
            details[open] > summary::before {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);
    }
    
    markdownContent.innerHTML = html;

    // 触发 MathJax 渲染
    if (window.MathJax) {
        MathJax.typesetPromise([markdownContent]).catch((err) => console.log('MathJax typeset failed: ' + err.message));
    }
}

// 加载并解析 Markdown 文件
async function loadElement(id) {
    if (!id) return;
    id = id.trim(); // Ensure clean ID
    
    // 保存状态
    localStorage.setItem('lastVisited', id);

    // 更新侧边栏激活状态
    document.querySelectorAll('.sidebar li').forEach(li => {
        li.classList.remove('active');
        if (li.dataset.id === id) {
            li.classList.add('active');
        }
    });

    markdownContent.innerHTML = '<p>正在加载内容...</p>';

    try {
        // 注意：本地直接打开 HTML 文件时，fetch 可能会遇到 CORS 跨域问题。
        // 建议使用 VS Code 的 Live Server 插件或本地 HTTP 服务器运行。
        // Use relative path but ensure correct formatting
        const path = `md/${id}.md`.replace(/\\/g, '/'); // Ensure forward slashes for URL
        // console.log(`Loading content from: ${path}`);
        
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const mdText = await response.text();
        
        // 使用 marked.js 解析 Markdown
        try {
            markdownContent.innerHTML = marked.parse(mdText);
        } catch (e) {
            throw new Error(`Markdown parsing failed: ${e.message}`);
        }

        // 触发 MathJax 渲染
        if (window.MathJax) {
            MathJax.typesetPromise([markdownContent]).catch((err) => console.log('MathJax typeset failed: ' + err.message));
        }
    } catch (error) {
        console.error('加载或解析失败:', error);
        markdownContent.innerHTML = `
            <div style="color: #d73a49; padding: 20px; border: 1px solid #d73a49; border-radius: 6px;">
                <h3>加载失败</h3>
                <p>无法加载或解析 <code>md/${id}.md</code> 文件。</p>
                <p>错误详情: ${error.message}</p>
                <p><strong>注意：</strong>如果您是直接双击打开的 HTML 文件，浏览器可能会因为安全策略（CORS）阻止读取本地文件。</p>
                <p><strong>解决方法：</strong>请使用本地服务器运行此页面（例如 VS Code 的 Live Server 插件，或在终端运行 <code>python -m http.server</code>）。</p>
            </div>
        `;
    }
}

// 主题切换逻辑
function initTheme() {
    // 检查本地存储或系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // 绑定点击事件
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
    } else {
        document.documentElement.removeAttribute('data-theme');
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
    }
    localStorage.setItem('theme', theme);
}

// Expose loadElement to global scope for inline onclick handlers
window.loadElement = loadElement;

// 启动应用
init();