# 化学热力学 (Chemical Thermodynamics)

## 1. 热力学第一定律 (The First Law of Thermodynamics)

### 内能 (Internal Energy, U)
$$ \Delta U = q + w $$
*   $q$: 热量 (Heat)，吸热为正。
*   $w$: 功 (Work)，环境对体系做功为正 ($w = -P_{ext}\Delta V$ 对于不可逆膨胀)。

### 焓 (Enthalpy, H)
定义：$H = U + PV$
*   在恒压条件下，$\Delta H = q_p$ (体系吸收的热量等于焓变)。
*   对于理想气体，$\Delta H = \Delta U + \Delta(PV) = \Delta U + \Delta nRT$。

### 热容 (Heat Capacity)
*   **定容热容 ($C_V$)**: $C_V = (\frac{\partial U}{\partial T})_V$
*   **定压热容 ($C_p$)**: $C_p = (\frac{\partial H}{\partial T})_p$
*   关系 (理想气体): $C_p - C_V = R$
    *   单原子分子: $C_V = \frac{3}{2}R, C_p = \frac{5}{2}R$
    *   双原子分子 (常温): $C_V = \frac{5}{2}R, C_p = \frac{7}{2}R$

---

## 2. 热力学第二定律 (The Second Law of Thermodynamics)

### 熵 (Entropy, S)
*   孤立体系的熵永不减少：$\Delta S_{univ} \ge 0$。
*   定义：$dS = \frac{dq_{rev}}{T}$
*   玻尔兹曼公式: $S = k_B \ln \Omega$ ($\Omega$ 为微观状态数)。

### 吉布斯自由能 (Gibbs Free Energy, G)
定义：$G = H - TS$
*   恒温恒压下自发过程的判据。
*   $\Delta G = \Delta H - T\Delta S$

### 自发性判据 (Spontaneity Criteria)
在恒温恒压 ($T, P$ const) 下：
1.  $\Delta G < 0$: 过程自发 (Spontaneous)。
2.  $\Delta G = 0$: 体系处于平衡状态 (Equilibrium)。
3.  $\Delta G > 0$: 过程非自发 (Non-spontaneous)，逆过程自发。

---

## 3. 化学势与相平衡 (Chemical Potential & Phase Equilibria)

### 化学势 (Chemical Potential, $\mu$)
定义：$\mu_i = (\frac{\partial G}{\partial n_i})_{T,P,n_{j \ne i}}$
*   物质流动的驱动力：物质总是从化学势高的地方流向化学势低的地方，直到相等。
*   平衡条件：$\sum \nu_i \mu_i = 0$。

### 克拉佩龙方程 (Clapeyron Equation)
描述相变平衡曲线斜率：
$$ \frac{dP}{dT} = \frac{\Delta_{trs} H}{T \Delta_{trs} V} $$

### 克劳修斯-克拉佩龙方程 (Clausius-Clapeyron Equation)
适用于液-气或固-气平衡 (假设气体为理想气体且忽略凝聚相体积)：
$$ \ln \frac{P_2}{P_1} = -\frac{\Delta_{vap}H}{R} (\frac{1}{T_2} - \frac{1}{T_1}) $$
