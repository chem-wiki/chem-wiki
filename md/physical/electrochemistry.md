# 电化学 (Electrochemistry)

电化学主要研究电能与化学能之间的相互转化。在竞赛中，重点在于能斯特方程的应用、电池电动势的计算以及电导率的相关理论。

## 1. 原电池与电解池 (Galvanic Cells vs Electrolytic Cells)

### 原电池 (Galvanic/Voltaic Cell)
*   **功能**: 自发的化学反应产生电能 ($\Delta G < 0$)。
*   **电极定义**:
    *   **负极 (Anode)**: 发生**氧化**反应 (Oxidation)。电子流出。
    *   **正极 (Cathode)**: 发生**还原**反应 (Reduction)。电子流入。
*   **示例**: 丹尼尔电池 (Zn-Cu)。

### 电解池 (Electrolytic Cell)
*   **功能**: 利用外接电源迫使非自发反应发生 ($\Delta G > 0$)。
*   **电极定义**:
    *   **阳极 (Anode)**: 与电源正极相连，发生**氧化**反应。
    *   **阴极 (Cathode)**: 与电源负极相连，发生**还原**反应。
*   **记忆口诀**: 无论原电池还是电解池，**Anode总是发生Oxidation (A-O)，Cathode总是发生Reduction (C-R)**。

---

## 2. 标准电极电势 (Standard Electrode Potentials, E°)

*   **定义**: 在标准状态下（浓度 $1 \text{ M}$，压强 $1 \text{ bar}$，通常 $298 \text{ K}$），电极相对于标准氢电极 (SHE, $E^\circ = 0 \text{ V}$) 的电势。
*   **意义**: $E^\circ$ 越正，氧化性越强（越容易得电子）；$E^\circ$ 越负，还原性越强（越容易失电子）。
*   **电池电动势**:
    $$ E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}} $$
*   **与自由能的关系**:
    $$ \Delta G^\circ = -nFE^\circ_{\text{cell}} $$
    *   $n$: 反应转移的电子摩尔数。
    *   $F$: 法拉第常数 ($\approx 96485 \text{ C/mol}$)。

---

## 3. 能斯特方程 (Nernst Equation)

用于计算非标准状态下的电极电势或电池电动势。

对于半反应 $Ox + ne^- \rightarrow Red$:
$$ E = E^\circ - \frac{RT}{nF} \ln \frac{a_{Red}}{a_{Ox}} $$
在 $298 \text{ K}$ 时，常数项 $\frac{RT}{F} \ln(10) \approx 0.0592 \text{ V}$，方程简化为：
$$ E = E^\circ - \frac{0.0592}{n} \lg Q $$
其中 $Q$ 为反应商 (Reaction Quotient)。

*   **浓度电池**: 两个电极材料相同但浓度不同，通过能斯特方程产生电势差。
*   **pH计原理**: 利用玻璃电极对 $H^+$ 的响应，电势与 pH 成线性关系。

---

## 4. 电导率 (Conductivity)

### 基本概念
*   **电阻 ($R$)**: $R = \rho \frac{l}{A}$
*   **电导 ($G$)**: $G = \frac{1}{R} = \kappa \frac{A}{l}$，单位西门子 (S)。
*   **电导率 ($\kappa$)**: $\kappa = \frac{1}{\rho}$，单位 $\text{S m}^{-1}$ 或 $\text{S cm}^{-1}$。它是电解质溶液导电能力的量度。
*   **电导池常数 ($K_{cell}$)**: $K_{cell} = \frac{l}{A}$，则 $\kappa = G \cdot K_{cell}$。

### 摩尔电导率 (Molar Conductivity, $\Lambda_m$)
为了比较不同电解质的导电能力，引入摩尔电导率：
$$ \Lambda_m = \frac{\kappa}{c} $$
单位通常为 $\text{S cm}^2 \text{mol}^{-1}$。

### 强电解质与弱电解质
*   **强电解质**: $\Lambda_m$ 随浓度降低略微增加（离子间相互作用减弱）。遵循 Onsager 方程。
*   **弱电解质**: $\Lambda_m$ 随浓度降低急剧增加（电离度 $\alpha$ 增大）。

### 科尔劳乌施定律 (Kohlrausch's Law)
*   **独立离子移动定律**: 在无限稀释条件下 ($\alpha \approx 1$, 离子间无作用力)，电解质的摩尔电导率等于正负离子极限摩尔电导率之和：
    $$ \Lambda_m^\circ = \nu_+ \lambda_+^\circ + \nu_- \lambda_-^\circ $$
*   **应用**: 
    1.  计算弱电解质的 $\Lambda_m^\circ$（利用强电解质的数据线性组合）。
    2.  计算弱电解质的电离度 $\alpha = \frac{\Lambda_m}{\Lambda_m^\circ}$ 和电离平衡常数 $K_a$。
