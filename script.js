// 元素列表配置（按族/类别分组）
const elementGroups = [
    {
        groupName: 's区元素',
        elements: [
            { id: 'Alkali_Metals', name: '碱金属 (Li-Cs)' },
            { id: 'Alkaline_Earth', name: '碱土金属 (Be-Ba)' }
        ]
    },
    {
        groupName: 'p区元素',
        elements: [
            { id: 'C_Si_B', name: '碳硅硼 (C, Si, B)' },
            { id: 'N', name: '氮 (N)' },
            { id: 'P_As_Sb_Bi', name: '磷族 (P, As, Sb, Bi)' },
            { id: 'O', name: '氧 (O)' },
            { id: 'S', name: '硫 (S)' },
            { id: 'Cl', name: '卤素 (Cl, Br, I)' },
            { id: 'Al', name: '铝 (Al)' },
            { id: 'Sn_Pb', name: '锡铅 (Sn, Pb)' },
            { id: 'Noble_Gases', name: '稀有气体 (Xe等)' }
        ]
    },
    {
        groupName: 'd区元素 (过渡金属)',
        elements: [
            { id: 'Ti_V', name: '钛钒 (Ti, V)' },
            { id: 'Cr', name: '铬 (Cr)' },
            { id: 'Mn', name: '锰 (Mn)' },
            { id: 'Fe', name: '铁 (Fe)' },
            { id: 'Co_Ni', name: '钴镍 (Co, Ni)' },
            { id: 'Cu', name: '铜 (Cu)' },
            { id: 'Ag', name: '银 (Ag)' },
            { id: 'Zn_Cd_Hg', name: '锌族 (Zn, Cd, Hg)' }
        ]
    },
    {
        groupName: 'f区元素',
        elements: [
            { id: 'Lanthanides_Actinides', name: '镧系与锕系 (Ce, U等)' }
        ]
    }
];

// DOM 元素
const elementList = document.getElementById('element-list');
const markdownContent = document.getElementById('markdown-content');
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// 初始化
function init() {
    renderSidebar();
    initTheme();
    
    // 移动端菜单切换
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // 默认加载第一个元素
    if (elementGroups.length > 0 && elementGroups[0].elements.length > 0) {
        loadElement(elementGroups[0].elements[0].id);
    }
}

// 渲染侧边栏
function renderSidebar() {
    elementGroups.forEach(group => {
        // 创建分组标题
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-header';
        groupHeader.textContent = group.groupName;
        elementList.appendChild(groupHeader);

        // 创建该分组下的元素列表
        group.elements.forEach(el => {
            const li = document.createElement('li');
            li.textContent = el.name;
            li.dataset.id = el.id;
            li.addEventListener('click', () => {
                loadElement(el.id);
                // 在移动端点击后自动收起侧边栏
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('open');
                }
            });
            elementList.appendChild(li);
        });
    });
}

// 加载并解析 Markdown 文件
async function loadElement(id) {
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
        const response = await fetch(`md/${id}.md`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const mdText = await response.text();
        
        // 使用 marked.js 解析 Markdown
        markdownContent.innerHTML = marked.parse(mdText);
    } catch (error) {
        console.error('加载 Markdown 失败:', error);
        markdownContent.innerHTML = `
            <div style="color: #d73a49; padding: 20px; border: 1px solid #d73a49; border-radius: 6px;">
                <h3>加载失败</h3>
                <p>无法加载 <code>md/${id}.md</code> 文件。</p>
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

// 启动应用
init();