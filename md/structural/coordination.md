# 配位化学基础 (Coordination Chemistry)

## 1. 晶体场理论 (Crystal Field Theory, CFT)

CFT 假设中心金属离子与配体之间的相互作用纯粹是静电作用。

### 八面体场分裂 (Octahedral Splitting, $O_h$)
*   当 6 个配体沿 $x, y, z$ 轴接近金属离子时，d 轨道发生分裂。
*   **$e_g$ 轨道 ($d_{x^2-y^2}, d_{z^2}$)**: 指向配体，能量显著升高。
*   **$t_{2g}$ 轨道 ($d_{xy}, d_{yz}, d_{xz}$)**: 指向配体之间，能量相对较低。
*   分裂能定义为 $\Delta_o$ (或 $10Dq$)。
    *   $E(e_g) = +0.6 \Delta_o$
    *   $E(t_{2g}) = -0.4 \Delta_o$

### 四面体场分裂 (Tetrahedral Splitting, $T_d$)
*   4 个配体接近金属离子（位于立方体交错顶点）。
*   分裂图样与八面体相反，但分裂能较小。
*   **$t_2$ 轨道 ($d_{xy}, d_{yz}, d_{xz}$)**: 能量升高。
*   **$e$ 轨道 ($d_{x^2-y^2}, d_{z^2}$)**: 能量降低。
*   关系: $\Delta_t \approx \frac{4}{9} \Delta_o$。通常四面体配合物都是高自旋。

## 2. 晶体场稳定化能 (Crystal Field Stabilization Energy, CFSE)

计算电子填充在分裂后轨道中相对于简并轨道的能量下降值。
$$ \text{CFSE} = n_{t_{2g}} (-0.4 \Delta_o) + n_{e_g} (+0.6 \Delta_o) + P $$
*   $P$ 为成对能 (Pairing Energy)。仅在需要额外成对时考虑。

## 3. 高自旋与低自旋 (High Spin vs Low Spin)

取决于分裂能 $\Delta_o$ 与成对能 $P$ 的相对大小。

*   **强场配体 (Strong Field Ligands)** (如 CN⁻, CO): $\Delta_o > P$。
    *   电子优先成对填充 $t_{2g}$。
    *   形成**低自旋 (Low Spin)** 配合物。
*   **弱场配体 (Weak Field Ligands)** (如 I⁻, Br⁻, Cl⁻, H₂O): $\Delta_o < P$。
    *   电子优先占据高能级 $e_g$ 而不成对。
    *   形成**高自旋 (High Spin)** 配合物。

**光谱化学序列 (Spectrochemical Series)**:
$$ I^- < Br^- < S^{2-} < SCN^- < Cl^- < F^- < OH^- < H_2O < NCS^- < NH_3 < en < CN^- < CO $$

## 4. 姜-泰勒效应 (Jahn-Teller Effect)

*   **定理**: 任何处于电子简并基态的非线性分子体系都会发生几何畸变，以消除简并度，降低体系能量。
*   **常见情况**: 八面体 $d^9$ (如 Cu²⁺) 和高自旋 $d^4$ (如 Cr²⁺, Mn³⁺)。
*   **表现**: 通常表现为拉长八面体 (Z-out)，即 z 轴上的配体键长变长，x/y 轴键长变短。

## 5. 颜色与磁性 (Color and Magnetism)

### 颜色 (Color)
*   源于 d-d 跃迁 (d-d transition)。
*   吸收光子的能量 $E = h\nu = \Delta_o$。
*   吸收光的互补色即为配合物呈现的颜色。
*   电荷转移跃迁 (Charge Transfer, CT) 也会产生颜色（通常颜色更深，如 KMnO₄）。

### 磁性 (Magnetism)
*   主要取决于未成对电子数 ($n$)。
*   **顺磁性 (Paramagnetic)**: 有未成对电子。
*   **反磁性 (Diamagnetic)**: 无未成对电子。
*   **自旋磁矩 (Spin-only Magnetic Moment)**:
    $$ \mu_s = \sqrt{n(n+2)} \mu_B $$
    *   $\mu_B$: 玻尔磁子 (Bohr Magneton)。
