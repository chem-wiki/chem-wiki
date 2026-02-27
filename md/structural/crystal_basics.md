# 晶体学基础 (Crystal Basics)

## 1. 七大晶系与十四种布拉维点阵 (7 Crystal Systems & 14 Bravais Lattices)

晶体结构可以通过晶胞参数（边长 $a, b, c$ 和 夹角 $\alpha, \beta, \gamma$）进行分类。

### 七大晶系 (Seven Crystal Systems)

| 晶系 (System) | 晶胞参数特征 (Unit Cell Parameters) | 包含的布拉维点阵 (Bravais Lattices) |
| :--- | :--- | :--- |
| **立方晶系 (Cubic)** | $a=b=c, \alpha=\beta=\gamma=90^\circ$ | P (简单), I (体心), F (面心) |
| **四方晶系 (Tetragonal)** | $a=b \neq c, \alpha=\beta=\gamma=90^\circ$ | P (简单), I (体心) |
| **正交晶系 (Orthorhombic)** | $a \neq b \neq c, \alpha=\beta=\gamma=90^\circ$ | P (简单), I (体心), F (面心), C (底心) |
| **三方晶系 (Trigonal/Rhombohedral)** | $a=b=c, \alpha=\beta=\gamma \neq 90^\circ$ | P (简单 / R) |
| **六方晶系 (Hexagonal)** | $a=b \neq c, \alpha=\beta=90^\circ, \gamma=120^\circ$ | P (简单) |
| **单斜晶系 (Monoclinic)** | $a \neq b \neq c, \alpha=\gamma=90^\circ, \beta \neq 90^\circ$ | P (简单), C (底心) |
| **三斜晶系 (Triclinic)** | $a \neq b \neq c, \alpha \neq \beta \neq \gamma \neq 90^\circ$ | P (简单) |

*注：P=Primitive (简单), I=Body-centered (体心), F=Face-centered (面心), C=Base-centered (底心)*

### 十四种布拉维点阵 (14 Bravais Lattices)
这 14 种点阵是三维空间中点阵的全部可能形式。

## 2. 晶胞参数计算 (Unit Cell Calculations)

晶胞参数直接决定了晶体的物理性质。

*   **体积 (Volume, $V$)**:
    *   立方: $V = a^3$
    *   四方: $V = a^2c$
    *   正交: $V = abc$
    *   六方: $V = \frac{\sqrt{3}}{2}a^2c$

## 3. 堆积效率与配位数 (Packing Efficiency & Coordination Number)

假设原子为刚性球体，且半径为 $r$。

### 简单立方堆积 (Simple Cubic, SCC)
*   **晶胞内原子数 ($Z$)**: $8 \times \frac{1}{8} = 1$
*   **边长与半径关系**: $a = 2r$
*   **配位数 (CN)**: 6
*   **堆积效率 (Packing Efficiency)**:
    $$ \eta = \frac{1 \times \frac{4}{3}\pi r^3}{(2r)^3} = \frac{\pi}{6} \approx 52.4\% $$

### 体心立方堆积 (Body-Centered Cubic, BCC)
*   **晶胞内原子数 ($Z$)**: $8 \times \frac{1}{8} + 1 = 2$
*   **边长与半径关系**: 体对角线接触 $\sqrt{3}a = 4r \Rightarrow a = \frac{4r}{\sqrt{3}}$
*   **配位数 (CN)**: 8
*   **堆积效率**:
    $$ \eta = \frac{2 \times \frac{4}{3}\pi r^3}{a^3} = \frac{\pi\sqrt{3}}{8} \approx 68.0\% $$

### 面心立方堆积 (Face-Centered Cubic, FCC / CCP)
*   **晶胞内原子数 ($Z$)**: $8 \times \frac{1}{8} + 6 \times \frac{1}{2} = 4$
*   **边长与半径关系**: 面对角线接触 $\sqrt{2}a = 4r \Rightarrow a = 2\sqrt{2}r$
*   **配位数 (CN)**: 12
*   **堆积效率**:
    $$ \eta = \frac{4 \times \frac{4}{3}\pi r^3}{a^3} = \frac{\pi\sqrt{2}}{6} \approx 74.0\% $$
*   **堆积方式**: ABCABC...

### 六方最密堆积 (Hexagonal Close Packing, HCP)
*   **晶胞内原子数 ($Z$)**: 2 (在一个平行六面体晶胞中，或者通常六棱柱计为6)
*   **配位数 (CN)**: 12
*   **堆积效率**: $\approx 74.0\%$ (同 FCC)
*   **堆积方式**: ABAB...
*   **理想轴比**: $c/a = \sqrt{8/3} \approx 1.633$
