# 化学动力学 (Chemical Kinetics)

化学动力学主要研究化学反应的速率以及反应机理。在化学奥林匹克竞赛中，动力学是一个核心考点，不仅涉及基本的速率方程积分，还需要掌握微观反应机理的推导（如稳态近似法）。

## 1. 反应速率方程 (Rate Laws)

反应速率通常定义为单位时间内反应物浓度的减少或生成物浓度的增加。对于反应 $aA + bB \rightarrow pP$，速率 $v$ 可表示为：
$$ v = -\frac{1}{a}\frac{d[A]}{dt} = -\frac{1}{b}\frac{d[B]}{dt} = \frac{1}{p}\frac{d[P]}{dt} = k[A]^x[B]^y $$
其中 $k$ 为速率常数，$x$ 和 $y$ 为反应级数。

### 零级反应 (Zero Order)
*   **定义**: 反应速率与反应物浓度无关。
*   **微分方程**: $-\frac{d[A]}{dt} = k$
*   **积分形式**: $[A]_t = [A]_0 - kt$
*   **半衰期**: $t_{1/2} = \frac{[A]_0}{2k}$
*   **特征**: 浓度-时间图为直线，斜率为 $-k$。

### 一级反应 (First Order)
*   **定义**: 反应速率与反应物浓度的一次方成正比。
*   **微分方程**: $-\frac{d[A]}{dt} = k[A]$
*   **积分形式**: $\ln[A]_t = \ln[A]_0 - kt$ 或 $[A]_t = [A]_0 e^{-kt}$
*   **半衰期**: $t_{1/2} = \frac{\ln 2}{k} \approx \frac{0.693}{k}$
*   **特征**: 半衰期与初始浓度无关；$\ln[A]$-时间图为直线。

### 二级反应 (Second Order)
这里主要讨论单一反应物类型 $2A \rightarrow P$ 或速率方程为 $v = k[A]^2$ 的情况。
*   **微分方程**: $-\frac{d[A]}{dt} = k[A]^2$
*   **积分形式**: $\frac{1}{[A]_t} = \frac{1}{[A]_0} + kt$
*   **半衰期**: $t_{1/2} = \frac{1}{k[A]_0}$
*   **特征**: $\frac{1}{[A]}$-时间图为直线。

---

## 2. 阿伦尼乌斯方程 (Arrhenius Equation)

速率常数 $k$ 随温度 $T$ 的变化遵循阿伦尼乌斯方程：
$$ k = A e^{-\frac{E_a}{RT}} $$
*   **$A$**: 指前因子 (Pre-exponential factor)，与碰撞频率有关。
*   **$E_a$**: 活化能 (Activation Energy)，反应发生所需的最小能量。
*   **对数形式**: $\ln k = \ln A - \frac{E_a}{R}\frac{1}{T}$
    *   作 $\ln k$ 对 $1/T$ 图，斜率为 $-E_a/R$。

---

## 3. 碰撞理论与过渡态理论 (Collision Theory vs Transition State Theory)

### 碰撞理论 (Collision Theory)
*   **核心思想**: 反应物分子必须发生**有效碰撞**才能反应。
*   **有效碰撞条件**:
    1.  拥有足够的能量（超过活化能 $E_a$）。
    2.  拥有正确的空间取向（位阻因子）。
*   **模型**: 硬球碰撞模型。

### 过渡态理论 (Transition State Theory, TST)
*   **核心思想**: 反应物在变成产物之前，必须经过一个高能量的中间状态，称为**活化络合物**或**过渡态** ($[AB]^\ddagger$)。
*   **基本假设**: 反应物与活化络合物之间存在准平衡。
*   **艾林方程 (Eyring Equation)**:
    $$ k = \frac{k_B T}{h} e^{-\frac{\Delta G^\ddagger}{RT}} = \frac{k_B T}{h} e^{\frac{\Delta S^\ddagger}{R}} e^{-\frac{\Delta H^\ddagger}{RT}} $$
    *   $\Delta H^\ddagger$: 活化焓，近似等于 $E_a$ (液体/固体) 或 $E_a - RT$ (气体)。
    *   $\Delta S^\ddagger$: 活化熵，反映了形成过渡态时的有序度变化。

---

## 4. 催化作用 (Catalysis)

催化剂通过改变反应路径，降低反应的活化能 $E_a$，从而加快反应速率，但不改变反应的 $\Delta G$ 和平衡常数 $K$。

### 均相催化 (Homogeneous Catalysis)
*   催化剂与反应物处于同一相（如酸碱催化）。
*   **特点**: 接触面积大，反应速率均一，但分离回收困难。

### 多相催化 (Heterogeneous Catalysis)
*   催化剂与反应物处于不同相（通常是固体催化剂与气体/液体反应物）。
*   **步骤**:
    1.  反应物扩散到催化剂表面。
    2.  **吸附 (Adsorption)**: 物理吸附或化学吸附（关键步骤）。
    3.  表面反应。
    4.  **解吸 (Desorption)**。
    5.  产物扩散离开表面。
*   **Langmuir吸附等温式**: 用于描述表面覆盖度。

---

## 5. 反应机理 (Reaction Mechanisms)

大多数反应是通过一系列基元反应 (Elementary steps) 完成的。

### 速率控制步骤 (Rate-Determining Step, RDS)
*   整个反应的速率由最慢的一步基元反应决定。

### 稳态近似法 (Steady State Approximation, SSA)
*   **适用条件**: 当中间产物极不稳定（浓度极低且变化极小）时。
*   **假设**: 中间产物的生成速率等于消耗速率，即 $\frac{d[\text{Intermediate}]}{dt} \approx 0$。
*   **应用**: 推导复杂反应（如连串反应、酶催化Michaelis-Menten方程）的速率方程。

**示例**:
$$ A \xrightarrow{k_1} I \xrightarrow{k_2} P $$
若 $I$ 为活泼中间体，则：
$$ \frac{d[I]}{dt} = k_1[A] - k_2[I] \approx 0 \implies [I] = \frac{k_1}{k_2}[A] $$
$$ \frac{d[P]}{dt} = k_2[I] = k_1[A] $$
（此例中若 $k_2 \gg k_1$，则第一步为RDS）。
