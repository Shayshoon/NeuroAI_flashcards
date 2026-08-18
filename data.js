// Generated flashcards data from NeuroAI_Exercises_and_Solutions.md
var flashcardsData = [
  {
    "id": "ex-1-1",
    "chapter": 1,
    "chapterTitle": "Comparing Biological and Artificial Intelligence",
    "exercise": "1.1",
    "exerciseNum": 1,
    "question": "**Marr level analysis.** Consider a cash register that computes the total price of purchased items. Identify the computational, algorithmic, and implementational levels of analysis for this system. Then explain why agreement at the computational level between a mechanical cash register and an electronic cash register does not imply agreement at the implementational level.",
    "solution": "**Marr level analysis.** Marr’s three levels ask different questions about the same system: what problem is solved (computational), what procedure solves it (algorithmic), and what physical machinery runs that procedure (implementational). \n\nCash register levels.\n\n- Computational: compute the total price of a list of purchased items (a totaling / summation problem under a pricing table).\n\n- Algorithmic: represent prices as Arabic numerals and add with carry (or an equivalent arithmetic procedure).\n\n- Implementational: the physical substrate—mechanical gears and levers in an old register, or silicon circuits and firmware in an electronic one. \\\\\nIndependence of levels. Agreement at the computational level means only that both devices solve the same totaling problem. It does *not* force shared hardware: gears and silicon are different implementational answers to the same algorithmic idea. Conversely, shared machinery would not by itself prove shared goals. Separating levels prevents the common NeuroAI mistake of treating matching behavior as proof of matching circuits (or vice versa)."
  },
  {
    "id": "ex-1-2",
    "chapter": 1,
    "chapterTitle": "Comparing Biological and Artificial Intelligence",
    "exercise": "1.2",
    "exerciseNum": 2,
    "question": "A synapse in the brain has limited access to global error information, whereas backpropagation in artificial neural networks requires error signals that depend on all downstream layers. For each of the following proposed biological learning mechanisms, explain how the mechanism resolves local vs non-local credit assignment: (a) eligibility traces, (b) feedback alignment.",
    "solution": "**Biological learning mechanisms.** Backpropagation needs nonlocal error terms that depend on all downstream layers. Biology is constrained by local synaptic information.\\\\\n\n- (a) **Eligibility traces.** An eligibility variable $e(t)$ stores a fading memory of recent pre/post events so that a later modulator $M$ can still update the synapse ($\\Delta w \\propto M e$). The global (non-local) modulator provides gating information to the synapses.\n\n- (b) **Feedback alignment.** Random fixed feedback $B$ replaces $(W^{\\ell+1})^\\top$ in the backward pass. The error informs the synapses through a separate channel of information that is not the transpose of $W$: the feedback connections $B$. Once $W$ and $B$ realize the alignment constraint the network operates so that both forwarrd information and error feedback reaches the local neuron through separate pathways."
  },
  {
    "id": "ex-1-5",
    "chapter": 1,
    "chapterTitle": "Comparing Biological and Artificial Intelligence",
    "exercise": "1.5",
    "exerciseNum": 5,
    "question": "**Biological vs. artificial convergence.** A convolutional neural network (CNN) trained on ImageNet and the ventral visual stream in primates both achieve high performance on object recognition tasks. Using Marr’s framework, construct an argument for why this behavioral similarity does not necessarily imply that the two systems implement the same algorithm. Provide one specific example of a constraint that would lead to algorithmic divergence.",
    "solution": "**Biological vs. artificial convergence.** Shared high accuracy on object recognition is primarily a *computational*-level agreement: both systems solve a similar recognition problem under natural image statistics. Marr’s framework insists that matching outputs need not match algorithms or implementations.\n\n**Argument.** A CNN and the ventral stream can both minimize recognition error (computational agreement) while using different procedures (algorithmic divergence) and different substrates (implementational divergence). Behavioral similarity alone therefore cannot prove algorithmic identity.\n\n**Constraint forcing divergence.** Locality of credit assignment: CNN training uses nonlocal backpropagated errors $\\delta ^\\ell$ transported by $(W^{\\ell+1})^\\top$, whereas cortical synapses are constrained to locally available signals (pre activity, post activity, neuromodulators). That constraint favors Hebbian, predictive-coding, or approximate-feedback procedures rather than exact backprop—even when the computational goal (good recognition) is shared.\n\n\n<a id=\"chapter-2\"></a>"
  },
  {
    "id": "ex-2-2",
    "chapter": 2,
    "chapterTitle": "What Is Intelligence?",
    "exercise": "2.2",
    "exerciseNum": 2,
    "question": "**Dimensions of intelligence mapping.** The chapter proposes treating intelligence as a vector with eight dimensions: generality, performance, adaptation, efficiency, robustness, compositionality and abstraction, autonomy, and social competence. For each of the following evaluation scenarios, identify which 2 dimensions are primarily being measured: \n- (a) A model achieves 95% accuracy on ImageNet classification. \n- (b) A robot learns to manipulate novel objects after only 3 demonstrations.\n- (c) An LLM maintains coherent dialogue while refusing harmful requests.",
    "solution": "**Dimensions of intelligence mapping.** \n- (a) ImageNet accuracy primarily instruments *performance* and *robustness* to image distortions.\n- (b) Few-shot object manipulation primarily instruments *adaptation*, *efficiency*, and *compositionality and abstraction*.\n- (c) Safe dialogue primarily instruments *social competence*/*alignment* and some *robustness* to adversarial prompting."
  },
  {
    "id": "ex-2-5",
    "chapter": 2,
    "chapterTitle": "What Is Intelligence?",
    "exercise": "2.5",
    "exerciseNum": 5,
    "question": "*Multiple learning systems.* Intelligent behavior often depends on several learning systems working together. Consider a person learning to play a new strategy game from a short explanation and a few rounds of practice. Explain how at least three of the following systems contribute to learning the game: *represtntation learning, credit assignment, control, memory,* and *social alignment*. Then give one example of how performance would be affected if one of these systems were impaired.",
    "solution": "Multiple learning systems. Different learning systems solve different parts of the problem.\n\n- **Representation learning** buuilds useful internal variables from the raw game state: which pieces are important, which configurations are dangerous, and which situations are strategically similar.\n\n- **Credit assignment** determines which earlier decisions were responsible for a later success or failure. For example, losing a round may reveal that a move made several turns earlier created a vulnerability.\n\n- **Control** uses the current state and learned knowledge to select actions. It determines which move to make next and balances immediate gains against longer-term goals.\n\n- **Memory** stores rules, previously encountered situations, and successful or unsuccessful strategies so that they can be reused in later rounds.\n\n- **Social alignment** helps the learner follow the rules and conventions of the game, including instructions from other players and norms about which actions are allowed."
  },
  {
    "id": "ex-2-7",
    "chapter": 2,
    "chapterTitle": "What Is Intelligence?",
    "exercise": "2.7",
    "exerciseNum": 7,
    "question": "**Breadth vs. depth vs. autonomy.** According to the DeepMind \"Levels of AGI\" framework (Morris et al.), AI systems are evaluated across three core dimensions: Generality (Narrow vs. General), Performance (Novice to Superhuman), and Autonomy (Human-in-the-Loop vs. Fully Autonomous). It has been argued that modern AI systems can achieve high levels in at most two of these dimensions simultaneously, but no current system possesses high levels in all three. Evaluate this claim by analyzing the following three modern AI systems:\n- (a) AlphaFold 3 (biomolecular structure engine)\n- (b) AI chat assistant (e.g, ChatGPT, Claude or Gemini)\n- (c) Autonomous web agents (book hotels, send emails, create calendar events, etc.)",
    "solution": "**Breadth vs. depth vs. autonomy.** AlphaFold lacks generality, AI chat assistants lack autonomy and autonomous web agents lack performance\n\n- (a) **AlphaFold 3:** superhuman biomolecular *performance*, high end-to-end execution *autonomy*, strictly narrow *generality* (confined to molecular modeling).\n- (b) **AI chat assistant:** High *generality* across text/reasoning tasks, expert-to-virtuoso benchmark *performance*, low *autonomy* limited by the need for human prompts and manual execution.\n- (c) **Autonomous web agents:** High *generality* across digital web interfaces, high open-loop execution *autonomy*, low/emergent *performance* due to error compounding on complex multi-step workflows.\n\n\n<a id=\"chapter-3\"></a>"
  },
  {
    "id": "ex-3-1",
    "chapter": 3,
    "chapterTitle": "Local Plasticity in Brains",
    "exercise": "3.1",
    "exerciseNum": 1,
    "question": "**Hebbian instability computation.** Consider a single synapse with weight $w$ receiving input $x$ and producing output $y = wx$. The synapse follows the basic Hebbian update $\\Delta w = \\eta x y$ with learning rate $\\eta = 0.01$. Suppose input $x = 2$ is presented repeatedly. If the initial weight is $w_0 = 1$, compute the weight after 3 update steps (treating $x$ as constant during this period). Explain why this illustrates the instability problem.",
    "solution": "**Hebbian instability computation.** \n**Setup.** The chapter's scalar analysis (Eqs. [3.2]–[3.3]) starts from $y = wx$ and the Hebb update $\\Delta w = \\eta x y$. Substituting the linear neuron gives \n$$\\Delta w = \\eta x(wx) = \\eta x^2w$$\nWith $\\eta=0.01$ and fixed $x=2$,\n$$\\Delta w=\\eta \\cdot 4 \\cdot w=0.04 w,     w\\leftarrow w(1+0.04) = 1.04w$$\n**Three steps.** Starting from $w_0=1$,\n$$w_3=1.04^3 w_0 = 1.04^3\\equiv 1.124864$$\n\n**Instability**. The recurrence $w_{t+1}=w_t(1+\\eta x^2)$ is geometric growth. In expectation, $\\mathbb{E}[\\Delta w] = \\eta \\mathbb{E}[x^2]w$ (Eq. [3.3]): whenever $\\mathbb{E}[x^2]>0$, the mean weight grows without bound. This is the chapter's point that *local does not automatically mean stable*-unconstrained Hebb needs normalization, homeostasis, or a decay term (Oja, BCM, weight decay)."
  },
  {
    "id": "ex-3-2",
    "chapter": 3,
    "chapterTitle": "Local Plasticity in Brains",
    "exercise": "3.2",
    "exerciseNum": 2,
    "question": "**Oja derivation.** Derive Oja's rule using weight normalization on Hebbian learning.",
    "solution": "### Oja's Rule Derivation Using Normalization\n\n#### 1. Setup & Multiplicative Normalization\nStandard Hebbian learning updates weights proportional to the correlation between the input $x_i$ and the linear output $y = \\sum_j w_j x_j$:\n\n$$\\tilde{w}_i(t+1) = w_i(t) + \\eta y x_i$$\n\nBecause repeated Hebbian updates lead to unbounded weight growth, we enforce a unit-length constraint ($\\sum_j w_j^2 = 1$) at every time step by dividing by the Euclidean norm:\n\n$$w_i(t+1) = \\frac{w_i(t) + \\eta y x_i}{\\sqrt{\\sum_j \\left[w_j(t) + \\eta y x_j\\right]^2}}$$\n\n---\n\n#### 2. Expanding the Normalization Term (Denominator)\nExpand the squared term inside the square root in the denominator:\n\n$$\\sum_j \\left(w_j + \\eta y x_j\\right)^2 = \\sum_j \\left(w_j^2 + 2\\eta y x_j w_j + \\eta^2 y^2 x_j^2\\right)$$\n\nAssuming the learning rate is very small ($\\eta \\ll 1$), terms of order $\\mathcal{O}(\\eta^2)$ can be neglected:\n\n$$\\sum_j \\left(w_j + \\eta y x_j\\right)^2 \\approx \\sum_j w_j^2 + 2\\eta y \\sum_j x_j w_j$$\n\nApplying the constraints:\n* Unit norm prior: $\\sum_j w_j^2 = 1$\n* Linear neuron output definition: $\\sum_j x_j w_j = y$\n\nSubstituting these into the expression yields:\n\n$$\\sum_j \\left(w_j + \\eta y x_j\\right)^2 \\approx 1 + 2\\eta y(y) = 1 + 2\\eta y^2$$\n\nThus, the denominator simplifies to:\n\n$$\\sqrt{1 + 2\\eta y^2} = \\left(1 + 2\\eta y^2\\right)^{1/2}$$\n\n---\n\n#### 3. Taylor Expansion\nRewrite the reciprocal square root using the first-order Taylor expansion $(1 + \\epsilon)^{-1/2} \\approx 1 - \\frac{1}{2}\\epsilon$ for small $\\epsilon = 2\\eta y^2$:\n\n$$\\frac{1}{\\sqrt{1 + 2\\eta y^2}} = \\left(1 + 2\\eta y^2\\right)^{-1/2} \\approx 1 - \\frac{1}{2}(2\\eta y^2) = 1 - \\eta y^2$$\n\n---\n\n#### 4. Multiplying and Eliminating Higher-Order Terms\nSubstitute the approximated denominator back into the weight update equation:\n\n$$w_i(t+1) \\approx \\left(w_i + \\eta y x_i\\right)\\left(1 - \\eta y^2\\right)$$\n\nExpanding the product:\n\n$$w_i(t+1) \\approx w_i + \\eta y x_i - \\eta y^2 w_i - \\eta^2 y^3 x_i$$\n\nDropping the higher-order term $-\\eta^2 y^3 x_i = \\mathcal{O}(\\eta^2)$:\n\n$$w_i(t+1) \\approx w_i + \\eta y x_i - \\eta y^2 w_i$$\n\n---\n\n#### 5. Final Form of Oja's Rule\nSubtracting the current weight $w_i(t)$ gives the incremental update $\\Delta w_i = w_i(t+1) - w_i(t)$:\n\n$$\\Delta w_i = \\eta \\left(y x_i - y^2 w_i\\right)$$\n\n* **$\\eta y x_i$**: The classic Hebbian excitation driving synaptic growth.\n* **$-\\eta y^2 w_i$**: A local, activity-dependent weight decay term arising naturally from the normalization constraint that prevents explosive runaway weights."
  },
  {
    "id": "ex-3-5",
    "chapter": 3,
    "chapterTitle": "Local Plasticity in Brains",
    "exercise": "3.5",
    "exerciseNum": 5,
    "question": "**STDP timing computation.** A synapse receives presynaptic spikes at times $t_1 = 10$ ms and $t_2 = 30$ ms, and the postsynaptic neuron fires at time $t_{post} = 25$ ms. Using a simple STDP window where $\\Delta w=A_+ e^{-\\Delta t/\\tau_+}$ for pre-before-post (LTP), and $\\Delta w=-A_- e^{\\Delta t/\\tau_-}$ for post-before-pre (LTD), compute the net weight change. Use $A_+=0.1, A_-=0.12, \\tau_+=20$ ms, and $\\tau_-=20$ ms.",
    "solution": "**STDP timing computation.** \nDefine $\\Delta t=t_{post}-t_{pre}$ as in the chapter.\nPre-before-post ($\\Delta t>0$) uses the LTP lobe of Eq. [3.15]; post-before-pre ($\\Delta t<0$) uses LTD.\n\n**Pair 1:** $$t_{pre} = 10, t_{post}=25 \\Rightarrow \\Delta t=+15\\text{ms} \\text{(LTP)}$$\n$$\\Delta w_1 = A_+e^{-\\Delta t/\\tau_+}=0.1e^{-15/20}=0.1e^{-0.75}\\equiv 0.0473$$\n**Pair 2:** $$t_{pre} = 30, t_{post}=25 \\Rightarrow \\Delta t=-5\\text{ms} \\text{(LTD)}$$\n$$\\Delta w_2 = -A_-e^{-|\\Delta t|/\\tau_-}=0.12e^{-5/20}=0.12e^{-0.25}\\equiv 0.0934$$\n**Net.** $$\\Delta w = \\Delta w_1+\\Delta w_2\\equiv 0.0473-0.0934=-0.0461$$.\nThe slightly-after-post spike produces stronger LTD than the earlier LTP contribution so the synapse depressess overall-illustrating that STDP cares about *relative timing*, not merely co-occurrence."
  },
  {
    "id": "ex-3-8",
    "chapter": 3,
    "chapterTitle": "Local Plasticity in Brains",
    "exercise": "3.8",
    "exerciseNum": 8,
    "question": "**BCM intuition.** Consider $\\Delta w = \\eta x y (y −\\theta)$. Explain in words why a sliding $\\theta$ implements a homeostatic pressure. What happens if $\\theta$ is fixed?",
    "solution": "**BCM intuition. Sliding $\\theta$ (Eqs. [3.12], [3.14]).** If average postsynaptic activity is too high, $\\theta$ rises: potentiation then requires even stronger $y$, and depression becomes easier. If activity is too low, $\\theta$ falls. That feedback is a homeostatic/metaplastic pressure against runaway excitation or silence, while still allowing selectivity ($y > \\theta$ vs. $y < \\theta$). Fixed $\\theta$.\n\n**Fixed $\\theta$**. A fixed threshold can still create selectivity (patterns above $\\theta$ grow, those below shrink) but loses automatic homeostatic feedback: a mis-set $\\theta$ can freeze learning or allow persistent imbalance.\n\n\n<a id=\"chapter-4\"></a>"
  },
  {
    "id": "ex-4-1",
    "chapter": 4,
    "chapterTitle": "Backpropagation as Exact Credit Assignment in Deep Networks",
    "exercise": "4.1",
    "exerciseNum": 1,
    "question": "*Delta rule computation.* Consider a single-layer linear network with input $x \\in \\mathbb{R}^3$, weights $w \\in \\mathbb{R}^3$, and output $\\hat{y} = w^\\top x$. Given $x = [1, 2, −1]^\\top, w = [0.5, −0.3, 0.8]^\\top, \\text{and target} y = 0.4$, compute: (a) the prediction $\\hat{y}$; (b) the prediction error $e = \\hat{y} −y$; (c) the gradient $\\frac{\\partial \\ell}{\\partial w}$ for squared loss $\\ell=\\frac{1}{2}(\\hat{y}-y)^2$; and (d) the weight update $\\Delta w$ for learning rate $\\eta=0.1$.",
    "solution": "**Delta rule computation.** We use a linear unit $\\hat{y} = w^\\top x$ and squared loss $\\ell = \\frac{1}{2} (\\hat{y} - y)^2$. The gradient identity for this loss is\n\n$$\\frac{\\partial \\ell}{\\partial w} = (\\hat{y} - y) x = e\\, x, \\qquad \\Delta w = -\\eta \\frac{\\partial \\ell}{\\partial w} = -\\eta\\, e\\, x.$$\n\n(a) **Prediction.**\n\n$$\\hat{y} = w^\\top x = 0.5 \\cdot 1 + (-0.3) \\cdot 2 + 0.8 \\cdot (-1) = 0.5 - 0.6 - 0.8 = -0.9.$$\n\n(b) **Error.**\n\n$$e = \\hat{y} - y = -0.9 - 0.4 = -1.3.$$\n\n(Negative means the network undershot the target: $\\hat{y}$ is too low.)\n\n(c) **Gradient.**\n\n$$\\frac{\\partial \\ell}{\\partial w} = e\\ x = (-1.3) [1, 2, -1]^\\top = [-1.3, -2.6, 1.3]^\\top.$$\n\n**(d) Update.** With $\\eta = 0.1$,\n\n$$\\Delta w = -\\eta \\frac{\\partial \\ell}{\\partial w} = -0.1 \\cdot [-1.3, -2.6, 1.3]^\\top = [0.13, 0.26, -0.13]^\\top.$$\n\nAfter the update, $w_{\\text{new}} = w + \\Delta w = [0.63, -0.04, 0.67]^\\top$. Geometrically (cf. Fig. 4.1), this is a step reducing squared error by moving opposite the gradient in weight space."
  },
  {
    "id": "ex-4-2",
    "chapter": 4,
    "chapterTitle": "Backpropagation as Exact Credit Assignment in Deep Networks",
    "exercise": "4.2",
    "exerciseNum": 2,
    "question": "**Two-layer backprop by hand.** Consider a network with one hidden layer:\n\n$$z_1 = W_1x + b_1, a_1 = \\phi(z1) , z_2 = W_2a_1 + b_2, a_2 = z_2$$\nwith squared loss $L = \\frac{1}{2}∥a_2 −y∥^2$. Derive $\\delta_2, \\delta_1, \\partial L/\\partial W_2$, and $\\partial L/\\partial W_1.$\n\n$\\delta_\\ell := \\partial L/\\partial z_\\ell$",
    "solution": "**Two-layer backprop by hand.** For squared loss with linear readout $a_2 = z_2$,\n\n$$\\delta_2 = \\frac{\\partial L}{\\partial z_2} = a_2 - y.$$\n\n**Hidden-layer adjoint.** Chain through $z_2 = W_2 a_1 + b_2$ and $a_1 = \\phi(z_1)$:\n\n$$\\frac{\\partial L}{\\partial a_1} = (W_2)^\\top \\delta_2, \\qquad \\delta_1 = \\left((W_2)^\\top \\delta_2\\right) \\odot \\phi'(z_1).$$\n\n**Parameter gradients.** Outer products of error against incoming activity:\n\n$$\\frac{\\partial L}{\\partial W_2} = \\delta_2 (a_1)^\\top, \\qquad \\frac{\\partial L}{\\partial W_1} = \\delta_1 x^\\top,$$\n\nand similarly $\\partial L / \\partial b_2 = \\delta_2$, $\\partial L / \\partial b_1 = \\delta_1$.\n\n**How to use this.** Forward-store $(x, z_1, a_1, z_2)$, compute $\\delta_2$, recurse to $\\delta_1$, then form the outer products. This is exactly reverse-mode autodiff on the multilayer graph."
  },
  {
    "id": "ex-4-4",
    "chapter": 4,
    "chapterTitle": "Backpropagation as Exact Credit Assignment in Deep Networks",
    "exercise": "4.4",
    "exerciseNum": 4,
    "question": "**Weight transport Problem.** Standard backpropagation requires the backward pass to use the exact transpose of the forward weight matrix ($W^\\top$). Explain why this mathematical requirement poses a physical impossibility in biological brains (known as the Weight Transport Problem).",
    "solution": "In standard backpropagation, the network computes updates using the exact transpose of the forward weight matrix $W^{\\top}$ in the backward pass. This creates a physical impossibility in biological brains for two main reasons:\n\n- (a) **Synapses are One-Way Streets:** Biological synapses transmit signals in a single direction (from the presynaptic axon to the postsynaptic dendrite). The neural pathway sending signals forward (from Layer $L$ to $L+1$) consists of physically separate axons and synapses from the feedback pathway sending signals backward (from Layer $L+1$ to $L$).\n- (b) **Weight Values Cannot Teleport Across Space:** For a feedback pathway to use $W^{\\top}$, the feedback synapses would need to constantly know and match the exact numerical strengths (weights) of the forward synapses. There is no biological mechanism in the brain that can measure a weight value at one location and \"teleport\" or synchronize that value to a separate feedback synapse elsewhere in the tissue.\n\n\n<a id=\"chapter-5\"></a>"
  },
  {
    "id": "ex-5-3",
    "chapter": 5,
    "chapterTitle": "Biological Sensory Coding",
    "exercise": "5.3",
    "exerciseNum": 3,
    "question": "**Efficient coding objective.** The efficient coding hypothesis proposes that sensory systems optimize a trade-off between fidelity and resource cost. Consider the objective $J = \\mathbb{E}[\\|s - \\hat{s} (z) \\|^2] + \\lambda \\cdot C (z)$, where $s$ is the environmental state, $\\hat{s} (z)$ is an estimate reconstructed from the neural code $z$, and $C (z)$ is a resource cost. (a) Identify what each term represents. (b) Explain how increasing $\\lambda$ would change the optimal code, and discuss the case $\\lambda \\mapsto \\infty$. (c) Propose one biological constraint that could determine the value of $\\lambda$ in real neural systems.",
    "solution": "**Efficient coding objective.** Given $J = \\mathbb{E}[\\|s - \\hat{s} (z) \\|^2] + \\lambda C (z)$.\n\n**(a) Computational roles.**\n\n* The reconstruction term $\\mathbb{E}[\\|s - \\hat{s} (z) \\|^2]$ measures fidelity—how well the code preserves behaviorally useful information about $s$.\n* The cost term $C (z)$ measures resource expenditure—energy, spike count, wiring length, or bandwidth.\n* The Lagrange multiplier $\\lambda$ sets the trade-off between fidelity and cost.\n\n**(b) Increasing $\\lambda$.** As $\\lambda$ grows, the cost term dominates the objective. Optimal codes shift toward lower activity levels and coarser representations, discarding fine details to save resources. In the limit $\\lambda \\rightarrow \\infty$, activity collapses to minimal signaling.\n\n**(c) Biological $\\lambda$.** Several factors can set an effective $\\lambda$ in biological systems:\n\n* Metabolic constraints: ATP available for spiking and synaptic transmission.\n* Developmental limits: fixed neuron and synapse counts.\n* Behavioral pressure: reaction-time demands that penalize slow, complex codes."
  },
  {
    "id": "ex-5-4",
    "chapter": 5,
    "chapterTitle": "Biological Sensory Coding",
    "exercise": "5.4",
    "exerciseNum": 4,
    "question": "**Biological receptive fields and efficient coding.** Simple cells in primary visual cortex (V1) have receptive fields that are localized, oriented, and bandpass. Efficient coding theory explains these receptive fields as a consequence of the statistical structure of natural images and of an objective that balances accurate reconstruction with a sparse representation.\n\n(a) Give two properties of the statistical structure of natural images that makes localized, oriented filters efficient.\n\n(b) Explain, from an algebraic point of view, the difference between an *independent basis* and a *sparse dictionary*\n\n(c) Why do localized edge filters tend to make both the reconstruction and sparsity terms of the sparse-coding objective small for natural images?",
    "solution": "**Biological receptive fields and efficient coding.**\n\n**(a) Natural-image statistics.** Natural images exhibit several important statistical regularities:\n\n* Nearby pixels are strongly correlated.\n* Their power spectrum is dominated by low spatial frequencies, approximately following a $1/f^2$ law.\n* Much of the informative structure is concentrated around localized edges, contours, and boundaries.\n\nA useful code should therefore remove correlations while preserving these informative structures. Localized, oriented, bandpass filters respond strongly to edges of a particular orientation and weakly to relatively uniform regions. They consequently provide an efficient representation of natural images and resemble the Gabor-like receptive fields observed in V1.\n\n**(b) Independent basis versus sparse dictionary.** A *sparse dictionary* is typically overcomplete: $D \\in \\mathbb{R}^{n \\times m}$ with $m > n$. Its columns cannot all be linearly independant, and the equation $x=Da$ generally has many possible solutions. The representation is selected by imposing the additional requirement that only a small number of coefficients be active, for example through\n\n$$\\min_{\\mathbf{a}} \\frac{1}{2} \\|\\mathbf{x} - D\\mathbf{a}\\|_2^2 + \\lambda \\|\\mathbf{a}\\|_1.$$\n\nTherefore, a basis obtains a representation primarily through linear independence and uniqueness, whereas a sparse dictionary can contain many redundant candidate features and selects a small subset of them for each input.\n\n**(c) Why localized edge filters work well for sparse coding.** The sparse-coding objective balances two goals,\n\n$$\\frac{1}{2} \\|\\mathbf{x} - D\\mathbf{a}\\|_2^2 + \\lambda \\|\\mathbf{a}\\|_1 :$$\n\naccurate reconstruction and sparse activity.\n\nNatural images are largely smooth within regions, with important changes concentrated near boundaries and contours. A dictionary containing localized edge filters can therefore reconstruct an image by activating only the filters whose positions, orientations, and scales match the edges present in that image. A relatively small number of active coefficients can explain a substantial fraction of the image structure."
  },
  {
    "id": "ex-5-5",
    "chapter": 5,
    "chapterTitle": "Biological Sensory Coding",
    "exercise": "5.5",
    "exerciseNum": 5,
    "question": "**Divisive normalization and temporal adaptation.** Divisive normalization and adaptation are two mechanisms that regulate sensory responses on different timescales. Divisive normalization can be modeled as\n\n$$z_i = \\frac{r_i}{\\sigma + \\sum_j r_j},$$\n\nwhere $r_i$ is the response of neuron $i$ and $\\sigma$ is a semi-saturation constant.\n\n(a) Show that for large population responses, $\\sum_j r_j \\gg \\sigma$, the normalized responses satisfy\n\n$$\\sum_i z_i \\approx 1.$$\n\n(b) Explain how this operation implements gain control and why this is useful for sensory coding.\n\n(c) Compare divisive normalization and temporal adaptation on at least one ground.",
    "solution": "**Biological and artificial receptive fields.** (a) Summing over neurons,\n\n$$\\sum_i z_i = \\frac{\\sum_i r_i}{\\sigma + \\sum_i r_i} \\approx 1$$\n\nwhen $\\sum_i r_i \\gg \\sigma$. Thus the total normalized population response remains approximately bounded.\n\n(b) If all responses increase together, both the numerator and denominator increase, so individual normalized responses do not grow proportionally with input strength. This provides gain control, preserving relative response patterns while preventing saturation.\n\n(c) Divisive normalization is primarily *spatial*: a neuron's response is controlled by the simultaneous activity of a population of neighboring neurons, preventing real-time saturation. Adaptation is primarily *temporal*: a neuron's response changes according to its recent stimulus history, allowing its operating range to track changing environmental conditions.\n\n\n<a id=\"chapter-6\"></a>"
  },
  {
    "id": "ex-6-1",
    "chapter": 6,
    "chapterTitle": "Artificial Sensory Coding",
    "exercise": "6.1",
    "exerciseNum": 1,
    "question": "**Whitening.** Let $x$ be centered with covariance $\\Sigma_x = U\\Lambda U^\\top$, where $U$ is orthonormal and $\\Lambda$ is diagonal with positive entries. Define\n$$z = \\Lambda^{-1/2} U^\\top x.$$\nShow that $\\text{Cov}(z) = I$.",
    "solution": "Centered $x$ with covariance $\\Sigma_x = U\\Lambda U^\\top$; define $z = \\Lambda^{-1/2} U^\\top x$.\n\n* **Computation:**\n$$\\text{Cov}(z) = \\mathbb{E}[z z^\\top] = \\Lambda^{-1/2} U^\\top \\mathbb{E}[x x^\\top] U \\Lambda^{-1/2} = \\Lambda^{-1/2} U^\\top \\Sigma_x U \\Lambda^{-1/2}$$\n$$= \\Lambda^{-1/2} U^\\top (U\\Lambda U^\\top) U \\Lambda^{-1/2} = \\Lambda^{-1/2} \\Lambda \\Lambda^{-1/2} = I.$$\n\n* **Interpretation:** Whitening (sphering) decorrelates coordinates and normalizes each to unit variance—a standard early-vision preprocessing step before ICA or further coding."
  },
  {
    "id": "ex-6-2",
    "chapter": 6,
    "chapterTitle": "Artificial Sensory Coding",
    "exercise": "6.2",
    "exerciseNum": 2,
    "question": "**Gaussian sources and ICA identifiability.** Why does ICA fail if all latent sources are Gaussian with unit variance?",
    "solution": "Observations $x = As$ with independent sources $s$.\n\n* **Argument:** If every source is $\\mathcal{N}(0, 1)$, then $x \\sim \\mathcal{N}(0, AA^\\top)$. For any orthogonal $Q$, define $\\tilde{A} = AQ^\\top$ and $\\tilde{s} = Qs$. Both $(A, s)$ and $(\\tilde{A}, \\tilde{s})$ yield the same distribution for $x$, so $A$ is identifiable only up to rotation.\n* ICA needs non-Gaussian higher-order statistics; Gaussians have vanishing cumulants beyond order two, so there is nothing left to pin down orientation."
  },
  {
    "id": "ex-6-6",
    "chapter": 6,
    "chapterTitle": "Artificial Sensory Coding",
    "exercise": "6.6",
    "exerciseNum": 6,
    "question": "**Distance-index interpretation.** A perceptual effect is summarized by\n$$I = \\frac{d_1 - d_2}{d_1 + d_2},$$\nwhere $d_1, d_2 > 0$. What does $I > 0$ mean? What does $I \\approx 0$ mean? Why is this index useful for comparing brains and deep networks?",
    "solution": "$I = (d_1 - d_2) / (d_1 + d_2)$ with $d_1, d_2 > 0$.\n\n* **Meaning:** $I > 0$ means condition 1 has larger effect than 2; $I \\approx 0$ means comparable effects. $I \\in [-1, 1]$ is a normalized contrast.\n* **Brain–DNN use:** Absolute firing rates and CNN activations have incomparable scales; $I$ compares relative patterns so one can ask whether a network reproduces the brain’s qualitative effect structure.\n\n\n<a id=\"chapter-7\"></a>"
  },
  {
    "id": "ex-7-1",
    "chapter": 7,
    "chapterTitle": "Biological Neural Dynamics",
    "exercise": "7.1",
    "exerciseNum": 1,
    "question": "**Fixed points and stability in one dimension.** Consider the one-dimensional system $\\dot{x} = x - x^3$. Find the fixed points and state which are stable or unstable.",
    "solution": "* **Fixed points:** Fixed points satisfy $F(x) = 0$. For $\\dot{x} = F(x) = x - x^3$:\n$$x - x^3 = x(1 - x^2) = 0 \\implies x^* \\in \\{-1, 0, 1\\}.$$\n* **Stability analysis:** Compute $F'(x) = 1 - 3x^2$ at each fixed point:\n  * $F'(-1) = -2$ (negative $\\implies$ stable)\n  * $F'(0) = 1$ (positive $\\implies$ unstable)\n  * $F'(1) = -2$ (negative $\\implies$ stable)\n\nIn one dimension, $F'(x^*) < 0$ indicates stability and $F'(x^*) > 0$ indicates instability. Thus $x^* = \\pm 1$ are stable fixed points and $x^* = 0$ is unstable. Trajectories with $x(0) < 0$ flow to $-1$; those with $x(0) > 0$ flow to $+1$."
  },
  {
    "id": "ex-7-4",
    "chapter": 7,
    "chapterTitle": "Biological Neural Dynamics",
    "exercise": "7.4",
    "exerciseNum": 4,
    "question": "**Low-rank connectivity constrains dimensionality.** Suppose recurrent connectivity has the form $J_{ij} = u_i v_j$ (rank one). Explain how this constrains the dimensionality of recurrent feedback in the network.",
    "solution": "Consider the recurrent dynamics\n$$\\tau \\dot{x}_i = -x_i + \\sum_j J_{ij} \\phi(x_j),$$\nwith rank-1 connectivity $J_{ij} = u_i v_j$. The recurrent input is\n$$\\sum_j J_{ij} \\phi(x_j) = u_i \\sum_j v_j \\phi(x_j) = u_i s(t), \\qquad s(t) = \\sum_j v_j \\phi(x_j).$$\nHence the network dynamics can be written in vector form as\n$$\\tau \\dot{x} = -x + u\\, s(t).$$\nAlthough $x \\in \\mathbb{R}^N$, the recurrent drive always points along the single direction $u$. All recurrent feedback is proportional to the pattern $u$, so dynamics are confined to a one-dimensional subspace. More generally, rank-$r$ connectivity yields at most $r$ independent recurrent modes, keeping dynamics low-dimensional even for large $N$."
  },
  {
    "id": "ex-7-6",
    "chapter": 7,
    "chapterTitle": "Biological Neural Dynamics",
    "exercise": "7.6",
    "exerciseNum": 6,
    "question": "**Ring-model broad state and stability.** In the one-population ring model of Sec. 7.5, consider the broad regime where $M(\\phi) = I_0 + I_2 \\cos 2\\phi$ with $I_0 = C(1 - \\varepsilon) - T + J_0 r_0$ and $I_2 = C\\varepsilon + J_2 r_2$.\n\n(a) Using $\\int_{-\\pi/2}^{\\pi/2} (\\cos 2\\phi) \\frac{d\\phi}{\\pi} = 0$ and $\\int_{-\\pi/2}^{\\pi/2} (\\cos^2 2\\phi) \\frac{d\\phi}{\\pi} = \\frac{1}{2}$, show that $r_0 = I_0$ and $r_2 = I_2/2$.\n\n(b) Derive the closed forms $r_0 = \\frac{C(1 - \\varepsilon) - T}{1 - J_0}$ and $r_2 = \\frac{C\\varepsilon/2}{1 - J_2/2}$.",
    "solution": "(a) Given the broad regime where $M(\\phi) = I_0 + I_2 \\cos 2\\phi$, calculate $r_0$ and $r_2$ by definition:\n$$r_0 = \\int_{-\\pi/2}^{\\pi/2} \\frac{d\\phi}{\\pi} M(\\phi) = I_0 + I_2 \\int_{-\\pi/2}^{\\pi/2} \\frac{d\\phi}{\\pi} \\cos 2\\phi = I_0,$$\n$$r_2 = \\int_{-\\pi/2}^{\\pi/2} \\frac{d\\phi}{\\pi} M(\\phi) \\cos 2\\phi = I_2 \\int_{-\\pi/2}^{\\pi/2} \\frac{d\\phi}{\\pi} \\cos^2 2\\phi = \\frac{I_2}{2}.$$\n\n(b) Substitute $I_0 = C(1 - \\varepsilon) - T + J_0 r_0$ into $r_0 = I_0$:\n$$r_0 = C(1 - \\varepsilon) - T + J_0 r_0 \\implies r_0 (1 - J_0) = C(1 - \\varepsilon) - T \\implies r_0 = \\frac{C(1 - \\varepsilon) - T}{1 - J_0}.$$\nSubstitute $I_2 = C\\varepsilon + J_2 r_2$ into $r_2 = I_2/2$:\n$$r_2 = \\frac{C\\varepsilon + J_2 r_2}{2} \\implies r_2 \\left(1 - \\frac{J_2}{2}\\right) = \\frac{C\\varepsilon}{2} \\implies r_2 = \\frac{C\\varepsilon/2}{1 - J_2/2}.$$\n\n\n<a id=\"chapter-8\"></a>"
  },
  {
    "id": "ex-8-1",
    "chapter": 8,
    "chapterTitle": "Artificial Models of Neural Dynamics via RNNs",
    "exercise": "8.1",
    "exerciseNum": 1,
    "question": "**Meaning of the rate-RNN equation.** For the continuous-time RNN\n$$\\tau \\dot{x} = -x + W \\phi(x) + V u(t) + b,$$\nidentify each term and explain its computational role. What biological quantity does each term approximate?",
    "solution": "The rate-RNN equation $\\tau \\dot{x} = -x + W \\phi(x) + V u(t) + b$ has the following terms:\n* $x$: hidden population state (activity vector)\n* $\\tau$: membrane or integration timescale\n* $-x$: leak term driving activity toward rest\n* $\\phi(x)$: rate-like nonlinearity (e.g., sigmoid or ReLU)\n* $W \\phi(x)$: recurrent feedback from other units\n* $V u(t)$: external drive or input\n* $b$: bias or baseline drive\n\n* **Biological interpretation:** This is a coarse rate model: $x$ approximates population activity, $W$ represents recurrent synapses, and $u$ is external input. It captures population-level dynamics but is not a spike-resolved circuit model."
  },
  {
    "id": "ex-8-2",
    "chapter": 8,
    "chapterTitle": "Artificial Models of Neural Dynamics via RNNs",
    "exercise": "8.2",
    "exerciseNum": 2,
    "question": "**Effect of increasing the recurrent gain $g$.** Consider a random network with $W_{ij} \\sim \\mathcal{N}(0, g^2/N)$. As $g$ increases from 0.5 to 1.5, describe qualitatively how the dynamics change. At what value of $g$ do you expect the transition from stable to chaotic dynamics?",
    "solution": "Consider random recurrent weights $W_{ij} \\sim \\mathcal{N}(0, g^2/N)$. Near the origin with $\\phi'(0) \\approx 1$, the linear dynamics are $\\dot{x} \\approx (-I + W)x$. Stability requires all eigenvalues of $-I + W$ to have negative real parts. The bulk spectrum of $W$ fills a disk of radius $\\sim g$ (Girko's circular law). Equivalently, the spectral radius of $W$ is of order $g$, so the critical gain is $g \\sim 1$:\n* **Small $g$ (e.g., $g = 0.5$):** Spectral radius of $W$ is below 1. Leak $-I$ dominates; all modes of $-I + W$ decay. Activity returns to a stable fixed point near the origin.\n* **Near $g \\approx 1$:** Eigenvalues of $W$ approach the stability boundary. Some modes become arbitrarily slow, so transients are richer and longer-lasting.\n* **$g \\gtrsim 1$:** Part of the spectrum of $W$ lies outside the unit disk, so $-I + W$ has eigenvalues with positive real part. Those modes grow: the origin loses stability and the network generates irregular self-sustained (chaotic) activity."
  },
  {
    "id": "ex-8-3",
    "chapter": 8,
    "chapterTitle": "Artificial Models of Neural Dynamics via RNNs",
    "exercise": "8.3",
    "exerciseNum": 3,
    "question": "**Fixed points and slow points in discrete-time RNNs.** For a discrete-time RNN $x_{t+1} = F(x_t)$, write the fixed-point equation. Explain why finding slow points (where $\\|F(x) - x\\|$ is small) is often more practical than finding exact fixed points. What does the Jacobian $J_F(x^*)$ reveal about dynamics near a fixed point?",
    "solution": "A fixed point $x^*$ satisfies $x^* = F(x^*)$, or equivalently the vector equation $F(x^*) - x^* = 0$. Solving it directly is a hard nonlinear root-finding problem, but optimizing the scalar \"slowness\"\n$$q(x) = \\frac{1}{2} \\|F(x) - x\\|_2^2$$\nwith standard gradient-based optimizers is much easier. Exact fixed points are zeros of $q$, and every $x$ with small $q(x)$ is a slow point: the discrete map barely moves the state, so nearby trajectories linger. Even when no exact fixed point is found, these points still organize the flow and support Jacobian analysis—which is why reverse-engineering practice prefers optimizing q over insisting on exact algebraic solutions.\n\nNear a fixed point (or slow point), perturbations evolve as $\\delta x_{t+1} = J_F(x^*) \\delta x_t$. Eigenvalues of $J_F$ reveal stable directions (magnitude $< 1$), unstable directions (magnitude $> 1$), and rotational modes (complex eigenvalues).\n\n\n\n<a id=\"chapter-9\"></a>"
  },
  {
    "id": "ex-9-1",
    "chapter": 9,
    "chapterTitle": "Predictive Processing in the Brain",
    "exercise": "9.1",
    "exerciseNum": 1,
    "question": "**Gradient-based inference dynamics.** Consider a one-dimensional generative model where $x = g(z) + \\epsilon$ with $g(z) = z^2$, sensory noise variance $\\sigma_x^2 = 1$, and prior mean $\\mu = 1$ with variance $\\sigma_z^2 = 4$. The energy function is\n$$E(z) = \\frac{1}{2}(x - z^2)^2 + \\frac{1}{8}(z - 1)^2.$$\n(a) Compute the gradient $\\frac{\\partial E}{\\partial z}$.\n(b) Write the inference dynamics $\\frac{dz}{dt} = -\\eta \\frac{\\partial E}{\\partial z}$ with $\\eta = 1$.\n(c) If the current latent estimate is $z = 2$ and the sensory input is $x = 3$, compute the instantaneous update direction $\\frac{dz}{dt}$.",
    "solution": "(a) The energy function is $E(z) = \\frac{1}{2}(x - z^2)^2 + \\frac{1}{8}(z - 1)^2$. Taking the derivative with respect to $z$:\n$$\\frac{\\partial E}{\\partial z} = 2z(z^2 - x) + \\frac{z - 1}{4}.$$\n\n(b) Gradient descent dynamics with learning rate $\\eta = 1$ follow $dz/dt = -\\partial E/\\partial z$:\n$$\\frac{dz}{dt} = -\\left[ 2z(z^2 - x) + \\frac{z - 1}{4} \\right].$$\n\n(c) At $z = 2, x = 3$, evaluating the gradient yields:\n$$\\frac{dz}{dt} = -\\left[ 2 \\cdot 2 \\cdot (4 - 3) + \\frac{2 - 1}{4} \\right] = -\\frac{17}{4} = -4.25.$$\nThe negative sign means $z$ decreases, moving toward values that better balance the sensory fit against the prior constraint."
  },
  {
    "id": "ex-9-2",
    "chapter": 9,
    "chapterTitle": "Predictive Processing in the Brain",
    "exercise": "9.2",
    "exerciseNum": 2,
    "question": "**Precision and attention.** Explain how precision weighting in predictive processing relates to attention in biological systems. Specifically:\n(a) What happens to inference when sensory precision $1/\\sigma_x^2$ increases?\n(b) What happens when prior precision $1/\\sigma_z^2$ increases?\n(c) Give a concrete example where increasing sensory precision would be adaptive, and one where increasing prior precision would be adaptive.",
    "solution": "(a) Higher sensory precision $1/\\sigma_x^2$ increases the weight on the prediction error term in the energy function. The latent variable $z$ tracks the observation more strongly, corresponding to increased attention to sensory evidence.\n\n(b) Higher prior precision $1/\\sigma_z^2$ increases the weight on the prior term, pulling $z$ toward the prior mean $\\mu$. This corresponds to trusting contextual expectations over noisy sensory data.\n\n(c) Raise sensory precision during clear viewing conditions where the input is reliable. Raise prior precision when listening to speech in noise—linguistic context becomes more reliable than degraded acoustic evidence."
  },
  {
    "id": "ex-9-4",
    "chapter": 9,
    "chapterTitle": "Predictive Processing in the Brain",
    "exercise": "9.4",
    "exerciseNum": 4,
    "question": "**Temporal prediction and information bottlenecks.** Consider temporal prediction with a recurrent state $h_t$ that summarizes history. The predictive information objective is\n$$\\max_{h_t} I(h_t; x_{t+1:t+K}) \\quad \\text{subject to} \\quad I(h_t; x_{\\le t}) \\le C.$$\n(a) Explain in plain language what this optimization tries to achieve.\n(b) Why does a capacity constraint $C$ matter?\n(c) Describe a scenario where this objective would extract different latent variables than a sensory reconstruction objective $\\min \\|x_t - \\hat{x}_t\\|^2$.",
    "solution": "(a) The compressed history $h_t$ should retain only information useful for predicting future observations. The objective maximizes predictive power while minimizing retained past information.\n\n(b) Without a capacity constraint $C$, the system could store the entire past verbatim. The bottleneck forces the representation to extract only predictive features, acting as a regularizer.\n\n(c) In a navigation task, a reconstruction objective might encode textures and lighting details. A prediction objective would extract pose and landmarks—features that causally determine future views.\n\n\n<a id=\"chapter-10\"></a>"
  },
  {
    "id": "ex-10-1",
    "chapter": 10,
    "chapterTitle": "LLMs as Predictive Machines",
    "exercise": "10.1",
    "exerciseNum": 1,
    "question": "**Computing predictive loss.** Consider a vocabulary of size $V = 50{,}000$. At a given position $t$, the model produces logits $o_t$ where the correct next token $k$ has logit $o_{t,k} = 2.5$, and the sum of exponentials of all logits is $\\sum_j e^{o_{t,j}} = 100{,}000$. Compute the cross-entropy loss at this position. If the model were to increase the logit for the correct token to $o_{t,k} = 5.0$ while keeping all other logits fixed, what would the new loss be? Interpret the change in terms of surprise.",
    "solution": "Cross-entropy loss is $L = -\\log p_k$ with $p_k = e^{o_{t,k}} / \\sum_j e^{o_{t,j}}$.\n\n* **Initial:** With $o_{t,k} = 2.5$ and $Z := \\sum_j e^{o_{t,j}} = 10^5$:\n$$p_k = \\frac{e^{2.5}}{10^5} \\approx 1.218 \\times 10^{-4}, \\qquad L = -\\log p_k \\approx 9.01.$$\n* **After raising the correct logit to 5.0:** Updating the partition:\n$$Z' = 10^5 - e^{2.5} + e^5 \\approx 1.00136 \\times 10^5, \\qquad p'_k = \\frac{e^5}{Z'} \\approx 1.482 \\times 10^{-3}, \\qquad L' \\approx 6.51.$$\n* **Interpretation:** The loss drop means the model is less surprised by the observed token: concentrating probability on $k$ reduces predictive surprise."
  },
  {
    "id": "ex-10-7",
    "chapter": 10,
    "chapterTitle": "LLMs as Predictive Machines",
    "exercise": "10.7",
    "exerciseNum": 7,
    "question": "**Why an LLM is more than autocomplete**. A next-token language model is trained to predict $x_t$ from the preciding context $x_{<t}$. Explain why the LLM cannot be simply deemed to be autocompleting text, a simple \"autocomplete\" mode.",
    "solution": "The model is performing next-token completion at its output, but producing good completions can require representations of syntax, entities, facts, discourse, algorithms, and other regularities. In this sense, \"autocomplete\" describes the interface-level operation but not the internal computation required to perform it well. Thus, predictive training also rewards the model for constructing internal variables that summarize latent structure in the context. local correlations remain useful, but they are not sufficient for minimizing loss across complex text."
  },
  {
    "id": "ex-10-8",
    "chapter": 10,
    "chapterTitle": "LLMs as Predictive Machines",
    "exercise": "10.8",
    "exerciseNum": 8,
    "question": "**Why predictive training is powerful**. Predictive training uses the observed next token as the target at every position in a sequence. Explain why this produces an unusually rich learning signal compared with training from sparse human-provided labels.",
    "solution": "Predictive training is powerful because it converts the structure already present in the data into supervision. For a sequence\n$$x_1, x_2,\\dots,x_T$$\nthe model receives approximately $T$ prediction targets:\n$$x_1\\rightarrow x_2, x_{1:2}\\rightarrow x_3,\\dots,x_{<T}\\rightarrow x_T$$\nNo seperate human annotation is required.\n\nThree factors reinforce one another:\n\n- **Dense supervision:** nearly every token contributes a loss term, so a corpus containing $D$ tokens provides approximately $D$ training signals\n- **Diverse predictive structure:** text contains grammar, facts, code, arguments, dialogue, mathematical derivations, explanations, and many other regularities. Each regularity can be exploited to reduce predictive error.\n- **Large model capacity:** sufficiently large networks can store, combine, and reuse many of these regularities rather than relying on simple local statistics.\n\nThe same objective simultaneously rewards many useful computations. The power therefore comes from the combination of a *simple objective* with an extremely *rich prediction problem*. Many capabilities need not have separate training objectives: they can emerge as useful intermediate computations for solving the common task of predicting what comes next.\n\n\n<a id=\"chapter-11\"></a>"
  },
  {
    "id": "ex-11-1",
    "chapter": 11,
    "chapterTitle": "Biological Control and Reinforcement Learning",
    "exercise": "11.1",
    "exerciseNum": 1,
    "question": "**TD error computation.** Consider a simple MDP with two states, $s_A$ and $s_B$. From state $s_A$, taking action $a_1$ yields reward $r = 0$ and transitions to $s_B$ with probability 1. From state $s_B$, all actions yield reward $r = +1$ and transition to a terminal state. The discount factor is $\\gamma = 0.9$. A policy $\\pi$ selects action $a_1$ in $s_A$ and arbitrary actions in $s_B$. Compute the state-value $V^\\pi(s_A)$ and the TD error $\\delta_t$ observed at the transition from $s_A$ to $s_B$ if the current value estimates are $V(s_A) = 0.5$ and $V(s_B) = 0.8$.",
    "solution": "(a) **Value function:** With $\\gamma = 0.9$, from state $s_B$ the agent receives reward $+1$ then terminates, so $V^\\pi(s_B) = 1$. From $s_A$, the agent receives $r = 0$ and transitions to $s_B$, giving:\n$$V^\\pi(s_A) = 0 + \\gamma V^\\pi(s_B) = 0.9.$$\n\n(b) **TD error:** Using estimates $V(s_A) = 0.5$ and $V(s_B) = 0.8$, the temporal-difference error at $s_A$ is:\n$$\\delta_t = r_t + \\gamma V(s_B) - V(s_A) = 0 + 0.9 \\cdot 0.8 - 0.5 = 0.22 > 0.$$\nThe positive TD error indicates the transition was better than expected, so value estimates should increase."
  },
  {
    "id": "ex-11-3",
    "chapter": 11,
    "chapterTitle": "Biological Control and Reinforcement Learning",
    "exercise": "11.3",
    "exerciseNum": 3,
    "question": "**Neuromodulator mapping.** Doya's hypothesis treats neuromodulators as meta-parameters of an RL controller (Table 11.1). Write the function for each of these equations in the context of the full controller according to Table 11.1:\n* the TD / Bellman error $\\delta_t = r_t + \\gamma_t V(s_{t+1}) - V(s_t)$ (Dopamine);\n* the state-dependent discount $\\gamma_t = \\Gamma_{\\text{5HT}}(s_t)$ (Serotonin);\n* the softmax policy $\\pi(a \\mid s) = e^{\\beta_{\\text{NE},t} Q(s,a)} / \\sum_b e^{\\beta_{\\text{NE},t} Q(s,b)}$ (Noradrenaline);\n* the three-factor update $\\Delta w_t = \\alpha_{\\text{ACh},t} \\delta_t e_t$ (Acetylcholine).",
    "solution": "* **Dopamine:** $\\delta_t = r_t + \\gamma_t V(s_{t+1}) - V(s_t)$, the signed reward-prediction error (evaluative signal). Phasic dopamine activity increases for outcomes better than expected and decreases when expected rewards are omitted.\n* **Serotonin:** Sets $\\gamma_t$, controlling patience and the effective temporal horizon.\n* **Noradrenaline:** Sets $\\beta_t$, controlling exploration versus exploitation (choice stochasticity).\n* **Acetylcholine:** Sets $\\alpha_t$ in $\\Delta w_t = \\alpha_t \\delta_t e_t$, controlling learning rate and plasticity gain under uncertainty."
  },
  {
    "id": "ex-11-5",
    "chapter": 11,
    "chapterTitle": "Biological Control and Reinforcement Learning",
    "exercise": "11.5",
    "exerciseNum": 5,
    "question": "**Eligibility traces.** Eligibility traces address a fundamental limitation of basic TD learning. Consider an agent that takes action $a^{\\ast}$ in state $s^{\\ast}$ at time $t = 0$, then wanders for 10 steps before receiving a large reward at $t = 10$. Explain why basic TD learning struggles to assign credit to $(s^{\\ast}, a^{\\ast})$, and how eligibility traces solve this problem. Derive the trace update rule and explain its biological interpretation.",
    "solution": "(a) **The problem:** At $t = 10$, plain TD only updates the currently active state. The state-action pair $(s^{\\ast}, a^{\\ast})$ visited at $t = 0$ is no longer active and receives no credit.\n\n(b) **Trace mechanism:** Keep a fading memory of visited states:\n$$e_t(s) = \\gamma \\lambda e_{t-1}(s) + \\mathbf{1}[s = s_t], \\qquad V(s) \\leftarrow V(s) + \\alpha \\delta_t e_t(s).$$\nDelayed TD errors $\\delta_t$ credit recently eligible states. Biologically, this matches synapse-local eligibility traces gated by a later global neuromodulatory signal.\n\n\n<a id=\"chapter-12\"></a>"
  },
  {
    "id": "ex-12-2",
    "chapter": 12,
    "chapterTitle": "LLM Agents as Artificial Control Systems",
    "exercise": "12.2",
    "exerciseNum": 2,
    "question": "**Action space selection.** An LLM agent's action space is defined as $\\mathcal{A}\\_\\{\\text{LLM}\\} = \\mathcal{A}\\_\\{\\text{token}\\} \\cup \\mathcal{A}\\_\\{\\text{tool}\\} \\cup \\mathcal{A}\\_\\{\\text{code}\\} \\cup \\mathcal{A}\\_\\{\\text{memory}\\} \\cup \\mathcal{A}\\_\\{\\text{delegate}\\}$. For each of the following tasks, identify which action type(s) from this union are most appropriate and explain why:\n\n* **(a)** Computing $\\sqrt{2.71828}$ to 10 decimal places\n* **(b)** Remembering a user's preference from a conversation three days ago\n* **(c)** Finding the current weather in Tokyo\n* **(d)** Solving a complex multi-file bug in a software repository",
    "solution": "* **(a) $\\mathcal{A}\\_\\{\\text{tool}\\}$ (or $\\mathcal{A}\\_\\{\\text{code}\\}$):** Exact arithmetic requires reliable computation beyond the model's parametric memory, which is prone to errors on multi-digit calculations.\n* **(b) $\\mathcal{A}\\_\\{\\text{memory}\\}$:** User preferences from past conversations are not in the live context window and must be retrieved from long-term storage.\n* **(c) $\\mathcal{A}\\_\\{\\text{tool}\\}$:** Current weather requires live external data via a weather API, since the model's training data is static and outdated.\n* **(d) $\\mathcal{A}\\_\\{\\text{code}\\} \\cup \\mathcal{A}\\_\\{\\text{delegate}\\}$:** Multi-file repository work benefits from code execution for precise edits and testing, and may require delegating subtasks to specialized subagents."
  },
  {
    "id": "ex-12-3",
    "chapter": 12,
    "chapterTitle": "LLM Agents as Artificial Control Systems",
    "exercise": "12.3",
    "exerciseNum": 3,
    "question": "**Biological and artificial control comparison.** Compare the biological control loop from Chapter 11, $s_t \\to a_t \\to s_{t+1}$, with the LLM agent context loop $c_t \\xrightarrow{\\pi_\\theta} a_t \\xrightarrow{\\text{Env/Tool}} o_t \\xrightarrow{U} c_{t+1}$. Identify three structural parallels and three fundamental differences between these frameworks at the computational level (Marr's first level).",
    "solution": "* **Parallels:**\n  1. Both systems operate in closed-loop interaction with their environment.\n  2. Each maintains a policy mapping state (biological: $s_t$; artificial: context $c_t$) to actions.\n  3. Both face the temporal credit assignment problem: linking actions to delayed outcomes through reinforcement signals.\n* **Differences:**\n  1. The artificial context $c_t$ is textual and arbitrarily extensible, whereas biological state $s_t$ is embodied and fixed-dimensional.\n  2. LLM agents use symbolic action spaces (tools, code, API calls) versus biological continuous/discrete motor actions.\n  3. Feedback differs: artificial systems receive verifier or tool signals, while biological systems rely on neuromodulatory plasticity (dopamine, acetylcholine) for learning."
  },
  {
    "id": "ex-12-6",
    "chapter": 12,
    "chapterTitle": "LLM Agents as Artificial Control Systems",
    "exercise": "12.6",
    "exerciseNum": 6,
    "question": "**System intelligence experiment design.** The chapter states that the intelligence of a system is not the same as the intelligence of the model alone. Design an experiment to test this claim. Specify: (a) the two conditions to compare; (b) the task domain; (c) the evaluation metric; (d) the predicted outcome and its interpretation.",
    "solution": "* (a) **Conditions:** Compare a strong model alone against a weaker model augmented with tools, memory, and code execution.\n* (b) **Domains:** Tasks requiring exact computation (arithmetic), fresh data (current events), or executable reasoning (coding problems).\n* (c) **Metrics:** Success rate, latency, and error type classification.\n* (d) **Hypothesis & Interpretation:** The tool-augmented weaker model should outperform on tool-necessary tasks, demonstrating that system scaffolding—not base-model capability alone—drives competence.\n\n\n<a id=\"chapter-13\"></a>"
  },
  {
    "id": "ex-13-2",
    "chapter": 13,
    "chapterTitle": "Biological Memory: Hippocampus, Cortex, and Attractors",
    "exercise": "13.2",
    "exerciseNum": 2,
    "question": "**Pattern completion.** Consider a Hopfield network with Hebbian weights Eq. [13.1] and asynchronous update Eq. [13.2]. Let $\\eta^\\mu \\in \\{\\pm 1\\}^N$ be a stored pattern, and let a partial cue initialize the state $r(0)$ with overlap\n$$m^\\mu(0) = \\frac{1}{N} \\sum_{i=1}^N r_i(0) \\eta^\\mu_i.$$\n(a) Write the local field $h_i$ at a cue neuron and decompose it into a signal term proportional to $\\eta^\\mu_i$ plus crosstalk noise from other patterns.\n(b) Argue why one update step tends to increase $m$ when $|m(0)|$ is large enough and $P/N$ is below capacity.\n(c) Using the energy Eq. [13.3], explain why iterated updates retrieve $\\eta^\\mu$ (or $-\\eta^\\mu$) from the partial cue.",
    "solution": "(a) **Signal and noise:** With $W_{ij} = N^{-1} \\sum_{\\nu} \\eta^\\nu_i \\eta^\\nu_j$ ($i \\ne j$) and $r(0)$ a partial cue for pattern $\\mu$:\n$$h_i = \\sum_j W_{ij} r_j(0) = \\eta^\\mu_i m^\\mu(0) + \\frac{1}{N} \\sum_{\\nu \\ne \\mu} \\eta^\\nu_i \\sum_j \\eta^\\nu_j r_j(0).$$\nThe first term is the retrieval signal; the second is crosstalk with variance of order $(P - 1)/N$ when patterns are random.\n\n(b) **Overlap growth:** Updating $r_i \\leftarrow \\text{sign}(h_i)$ flips mismatched units toward $\\eta^\\mu_i$ whenever the signal $\\eta^\\mu_i m(0)$ dominates the noise. Thus if $|m(0)|$ is large enough and $P/N < \\alpha_c \\approx 0.138$, the mean overlap increases after a step: $m(1) > m(0)$ (for $m(0) > 0$).\n\n(c) **Energy descent:** Each aligned flip decreases $E$ (or leaves it unchanged), so the dynamics converge to a local minimum. For a cue inside the basin of $\\eta^\\mu$, that minimum is the stored pattern (or its global flip), completing the partial memory."
  },
  {
    "id": "ex-13-3",
    "chapter": 13,
    "chapterTitle": "Biological Memory: Hippocampus, Cortex, and Attractors",
    "exercise": "13.3",
    "exerciseNum": 3,
    "question": "**Energy descent.** For the Hopfield energy $E(r) = -\\frac{1}{2} \\sum_{i,j} W_{ij} r_i r_j$, show that if neuron $i$ flips to align with its local field $h_i$, then $\\Delta E \\le 0$.",
    "solution": "When neuron $i$ flips to align with its local field $h_i$, the energy change is:\n$$\\Delta E = -[r_i(t+1) - r_i(t)] h_i(t).$$\n* If $h_i > 0$, alignment means $r_i(t+1) = +1$. Either $r_i(t) = -1$ and flips to $+1$ (yielding $\\Delta E = -(2)(h_i) < 0$), or it was already $+1$ ($\\Delta E = 0$).\n* If $h_i < 0$, alignment means $r_i(t+1) = -1$. Symmetrically, $[r_i(t+1) - r_i(t)] h_i(t) \\ge 0$, so $\\Delta E \\le 0$.\n\nIn all cases, energy never increases under aligned flips ($\\Delta E \\le 0$)."
  },
  {
    "id": "ex-13-5",
    "chapter": 13,
    "chapterTitle": "Biological Memory: Hippocampus, Cortex, and Attractors",
    "exercise": "13.5",
    "exerciseNum": 5,
    "question": "**Complementary learning.** Why would a single fast-learning cortical system be vulnerable to catastrophic interference? How does the hippocampal-cortical division of labor address this?",
    "solution": "* **Problem:** A single learning system must balance fast learning with stable memory. If cortex updates shared parameters sequentially ($\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\ell_A$ followed by $\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\ell_B$), then for large $\\eta$ and conflicting gradients ($\\nabla_\\theta \\ell_A \\cdot \\nabla_\\theta \\ell_B < 0$), learning task $B$ overwrites parameters vital for task $A$, causing *catastrophic interference.*\n\n**Complementary Learning Systems.** The solution is to separate learning timescales:\n$$\\eta_{\\text{hipp}}>>\\eta_{\\text{cortex}}$$\nThe hippocampus rapidly stores individual episodes, while cortex learns slowly and extracts regularities across many experiences. During replay, old and new hippocampal memories are interleaved ($A, B, A, B, \\dots$), allowing cortical learning to combine gradients:\n$$\\Delta \\theta_{\\text{cortex}} \\propto -\\eta_{\\text{cortex}}(\\nabla_\\theta \\ell_A + \\nabla_\\theta \\ell_B).$$\nReplay enables new memories to be gradually integrated without overwriting previously learned structure.\n\n\n<a id=\"chapter-14\"></a>"
  },
  {
    "id": "ex-14-3",
    "chapter": 14,
    "chapterTitle": "LLM Memory: Context, Attention, Retrieval, and RAG",
    "exercise": "14.3",
    "exerciseNum": 3,
    "question": "**Capacity.** For classical Hopfield with $N_f = 500$, estimate $P_c$ using $\\alpha_c \\approx 0.14$. For DAM with $F(z) = z^4$, how does capacity scale with $N_f$? Why does Eq. [14.2] also involve $N_h$?",
    "solution": "* **Classical Hopfield:** With $N = 500$ neurons:\n$$P_c \\approx 0.14 \\times 500 = 70 \\text{ patterns}.$$\n* **DAM with $F(z) = z^4$:** Capacity scales as $N_f^{n-1} = N_f^3$. The bound in $N_{\\text{mem}} \\le \\min(N_f^{n-1}, N_h)$ also involves $N_h$ because each stored pattern requires a distinct hidden (memory) unit in the bipartite construction."
  },
  {
    "id": "ex-14-5",
    "chapter": 14,
    "chapterTitle": "LLM Memory: Context, Attention, Retrieval, and RAG",
    "exercise": "14.5",
    "exerciseNum": 5,
    "question": "**RAG probability.** A RAG system retrieves $k = 5$ documents with $p_\\eta(z \\mid x) = [0.4, 0.3, 0.2, 0.05, 0.05]$. Only the third contains the correct answer. The generator returns the correct answer with probability 0.9 given the correct document and 0.1 otherwise. Compute $p(\\text{correct answer})$ under Eq. [14.6].",
    "solution": "Marginalizing over documents in $p(y \\mid x) = \\sum_{z \\in \\mathcal{D}} p_\\eta(z \\mid x) p_\\theta(y \\mid x, z)$:\n$$p(\\text{correct}) = \\sum_d p(d) \\cdot p(\\text{correct} \\mid d)$$\n$$= 0.2 \\times 0.9 + (0.4 + 0.3 + 0.05 + 0.05) \\times 0.1 = 0.18 + 0.8 \\times 0.1 = 0.18 + 0.08 = 0.26.$$\n\n\n<a id=\"chapter-15\"></a>"
  },
  {
    "id": "ex-15-1",
    "chapter": 15,
    "chapterTitle": "What LLMs Teach NeuroAI, and What They Still Lack",
    "exercise": "15.1",
    "exerciseNum": 1,
    "question": "**Five-line comparison framework.** Consider the analogy between in-context learning in transformers and rapid synaptic plasticity in biological neural circuits. Apply the five-line comparison framework (objective, algorithm, implementation, constraint, failure mode) to analyze this analogy.",
    "solution": "* **Objective:** Rapid adaptation from few examples.\n* **Algorithm:** Transformers: forward-pass attention over the prompt. Biology: transient synaptic / eligibility plasticity.\n* **Implementation:** Softmax attention and residual streams vs. biophysical synapses and neuromodulation.\n* **Constraint:** Finite context window vs. energy, interference, and consolidation limits.\n* **Failure mode:** ICL resets with each new prompt; biological rapid plasticity needs consolidation and can interfere with stored memories."
  },
  {
    "id": "ex-15-6",
    "chapter": 15,
    "chapterTitle": "What LLMs Teach NeuroAI, and What They Still Lack",
    "exercise": "15.6",
    "exerciseNum": 6,
    "question": "**Stacked learning systems and multiplicative competence.** The course argues that intelligence is not one module but a stack of learning systems. Consider an LLM agent answering a multi-hop factual question that requires (i) sensory/representation parsing of a PDF, (ii) predictive next-step reasoning, (iii) memory retrieval (RAG), (iv) control/tool choice (search vs answer), and (v) social alignment (refuse if the query is unsafe). Model end-to-end success as independent Bernoulli stages with reliabilities\n$$p_{\\text{sens}} = 0.95, \\quad p_{\\text{pred}} = 0.90, \\quad p_{\\text{mem}} = 0.80, \\quad p_{\\text{ctrl}} = 0.85, \\quad p_{\\text{align}} = 0.98,$$\nso that $P(\\text{success}) = \\prod_k p_k$ when the query is safe.\n\n(a) Compute $P(\\text{success})$.\n(b) Recompute after ablating memory ($p_{\\text{mem}} = 0.2$) and after ablating alignment on an unsafe query where the desired behavior is refusal, taking $p_{\\text{align}} = 0.5$.\n(c) Explain why the product form (rather than a sum) captures the course message that synergy is necessary.",
    "solution": "(a) $P(\\text{success}) = 0.95 \\times 0.90 \\times 0.80 \\times 0.85 \\times 0.98 \\approx 0.569$.\n\n(b) \n* Memory ablation: $0.95 \\times 0.90 \\times 0.20 \\times 0.85 \\times 0.98 \\approx 0.142$.\n* Alignment-critical case: $0.95 \\times 0.90 \\times 0.80 \\times 0.85 \\times 0.5 \\approx 0.291$.\nBoth ablations collapse overall competence despite intact remaining stages.\n\n(c) Under a product (bottleneck) composition, the weakest stage dominates. Brains and LLM agents need the full stack: prediction alone cannot rescue failed memory or failed alignment."
  },
  {
    "id": "ex-15-7",
    "chapter": 15,
    "chapterTitle": "What LLMs Teach NeuroAI, and What They Still Lack",
    "exercise": "15.7",
    "exerciseNum": 7,
    "question": "**Coupled stack: prediction, RL, and alignment.** Biological control uses a TD error $\\delta_t = r_t + \\gamma V(s_{t+1}) - V(s_t)$ that depends on a learned value predictor $V$, while LLM agents combine predictive modeling, a policy, and preference/alignment costs. Consider the schematic scalar objective contribution of one action,\n$$J = R_{\\text{pred}} + \\lambda_{\\text{RL}} A - \\lambda_{\\text{align}} C_{\\text{norm}},$$\nwith $R_{\\text{pred}} = -0.2$ (predictive surprise residual), advantage $A = 0.4$, norm cost $C_{\\text{norm}} = 0.3$, $\\lambda_{\\text{RL}} = 1$, and $\\lambda_{\\text{align}} = 2$.\n\n(a) Compute $J$.\n(b) For which $\\lambda_{\\text{align}}$ does the alignment penalty dominate the RL term ($\\lambda_{\\text{align}} C_{\\text{norm}} > \\lambda_{\\text{RL}} A$)?\n(c) In one sentence each, how does the same coupling appear in the brain (prediction $\\to$ value $\\to$ neuromodulated policy; norms gate action) and in LLM systems (pretrain/SFT/preference stack + agent loop)?",
    "solution": "(a) $J = -0.2 + 1 \\cdot 0.4 - 2 \\cdot 0.3 = -0.4$.\n\n(b) $\\lambda_{\\text{align}} \\cdot 0.3 > 1 \\cdot 0.4 \\implies \\lambda_{\\text{align}} > \\frac{0.4}{0.3} = \\frac{4}{3} \\approx 1.33$.\n\n(c)\n* **Brain:** Predictions help estimate what is valuable, dopamine-like signals update behavior, and social or normative signals constrain which actions are reinforced.\n* **LLM:** Pretraining learns to predict text, later training shapes which responses or actions are preferred, and agent feedback guides tool use and behavior."
  }
];
var chaptersData = {
  "1": "Comparing Biological and Artificial Intelligence",
  "2": "What Is Intelligence?",
  "3": "Local Plasticity in Brains",
  "4": "Backpropagation as Exact Credit Assignment in Deep Networks",
  "5": "Biological Sensory Coding",
  "6": "Artificial Sensory Coding",
  "7": "Biological Neural Dynamics",
  "8": "Artificial Models of Neural Dynamics via RNNs",
  "9": "Predictive Processing in the Brain",
  "10": "LLMs as Predictive Machines",
  "11": "Biological Control and Reinforcement Learning",
  "12": "LLM Agents as Artificial Control Systems",
  "13": "Biological Memory: Hippocampus, Cortex, and Attractors",
  "14": "LLM Memory: Context, Attention, Retrieval, and RAG",
  "15": "What LLMs Teach NeuroAI, and What They Still Lack"
};

if (typeof window !== 'undefined') {
  window.flashcardsData = flashcardsData;
  window.chaptersData = chaptersData;
}
