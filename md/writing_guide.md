# 文章撰写指南 (Article Writing Guide)

为了确保文章在 Chem Wiki 上正确显示，请遵循以下规范。

## 1. 化学式 (Chemical Formulas)

本项目使用 **MathJax (mhchem)** 渲染化学式。为了兼容所有的渲染引擎，请务必遵循以下规则：

*   **必须使用 `$` 包裹**：所有的 `\ce{...}` 命令必须放在 LaTeX 数学环境 `$...$` 中。
    *   ✅ 正确：`$\ce{H2O}$`
    *   ❌ 错误：`\ce{H2O}` (在某些情况下不会渲染)
    *   ✅ 正确：`$\ce{SO4^{2-}}$`
    *   ❌ 错误：`SO4^{2-}`

*   **行内 vs 独立行**：
    *   行内公式使用单美元符号：`$\ce{Fe^2+}$`
    *   独立行公式使用双美元符号：
        ```latex
        $$
        \ce{2H2 + O2 -> 2H2O}
        $$
        ```

## 2. 标题与结构 (Headings & Structure)

*   使用 Markdown 标准标题 (`#`, `##`, `###`)。
*   文章开头应包含一级标题作为文章名。

## 3. 链接 (Links)

*   **内部链接**：若要链接到另一篇文章，请使用该文章的 ID (即文件名，不带扩展名) 作为哈希链接。
    *   例如，链接到“有机化学导论” (`md/organic/intro.md`)，ID 为 `organic/intro`。
    *   Markdown 写法：`[有机化学导论](#organic/intro)`
    *   ✅ 正确：`参见 [酸碱排名](#special/acid_base_ranking)`
    *   ❌ 错误：`参见 [酸碱排名](md/special/acid_base_ranking.md)` (会导致页面刷新)

## 4. 特殊字符

*   在 Markdown 中，`_` (下划线) 和 `*` (星号) 是特殊字符。如果在公式外使用（如文件名），请注意转义或使用代码块。
