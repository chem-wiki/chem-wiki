# 化学平衡 (Chemical Equilibrium)

## 1. 平衡常数 (Equilibrium Constants)

对于通用反应 $aA + bB \rightleftharpoons cC + dD$:

### 定义
*   **压力平衡常数 ($K_p$)**: $K_p = \frac{(P_C/P^\ominus)^c (P_D/P^\ominus)^d}{(P_A/P^\ominus)^a (P_B/P^\ominus)^b}$
*   **浓度平衡常数 ($K_c$)**: $K_c = \frac{(c_C/c^\ominus)^c (c_D/c^\ominus)^d}{(c_A/c^\ominus)^a (c_B/c^\ominus)^b}$
*   **摩尔分数平衡常数 ($K_x$)**: $K_x = \frac{x_C^c x_D^d}{x_A^a x_B^b}$

### 相互关系
$$ K_p = K_c (RT)^{\Delta n} $$
$$ K_p = K_x (P/P^\ominus)^{\Delta n} $$
其中 $\Delta n = (c+d) - (a+b)$ (气相物种化学计量数之差)。
注意：$K_p$ 和 $K_c$ 仅是温度的函数，而 $K_x$ 可能随总压 $P$ 变化。

###  Gibbs 自由能与平衡常数
$$ \Delta_r G^\ominus = -RT \ln K^\ominus $$
(通常 $K^\ominus$ 指标准平衡常数，即 $K_p$)

---

## 2. 范特霍夫方程 (Van't Hoff Equation)

描述平衡常数随温度的变化关系：
$$ \frac{d \ln K^\ominus}{dT} = \frac{\Delta_r H^\ominus}{RT^2} $$
积分形式 (假设 $\Delta_r H^\ominus$ 为常数)：
$$ \ln \frac{K_2}{K_1} = -\frac{\Delta_r H^\ominus}{R} (\frac{1}{T_2} - \frac{1}{T_1}) $$
*   吸热反应 ($\Delta H > 0$): $T \uparrow \Rightarrow K \uparrow$ (平衡右移)。
*   放热反应 ($\Delta H < 0$): $T \uparrow \Rightarrow K \downarrow$ (平衡左移)。

---

## 3. 勒夏特列原理 (Le Chatelier's Principle)

如果改变影响平衡的一个条件 (浓度、压力、温度)，平衡将向着减弱这种改变的方向移动。

*   **浓度**: 增加反应物浓度，平衡向生成物方向移动。
*   **压力**: 增大总压，平衡向气体分子数减少的方向移动。
*   **温度**: 升高温度，平衡向吸热反应方向移动。
*   **惰性气体**:
    *   恒温恒容加入: 总压增大，各组分分压不变，平衡不移动。
    *   恒温恒压加入: 体积增大，各组分分压减小，平衡向气体分子数增大的方向移动。

---

## 4. 离子平衡 (Ionic Equilibrium)

### 酸碱平衡 (Acid-Base Equilibrium)
*   **水解离平衡**: $K_w = [H^+][OH^-] \approx 1.0 \times 10^{-14}$ ($25^\circ C$)
*   **弱酸电离**: $HA \rightleftharpoons H^+ + A^-$, $K_a = \frac{[H^+][A^-]}{[HA]}$
*   **pH 计算**: $pH = -\log[H^+]$
*   **缓冲溶液 (Henderson-Hasselbalch Equation)**:
    $$ pH = pK_a + \log \frac{[A^-]}{[HA]} $$

### 溶度积 (Solubility Product, $K_{sp}$)
对于难溶电解质 $M_m A_n(s) \rightleftharpoons m M^{n+}(aq) + n A^{m-}(aq)$:
$$ K_{sp} = [M^{n+}]^m [A^{m-}]^n $$
*   **溶解度 (s)** 与 $K_{sp}$ 的关系:
    若无其他离子干扰，$K_{sp} = (ms)^m (ns)^n$。
*   **沉淀生成条件**: 离子积 $Q_c > K_{sp}$。
*   **同离子效应**: 加入含有相同离子的强电解质，会降低难溶盐的溶解度。
