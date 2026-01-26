import React, { useState, useEffect } from 'react';
import {
  Trophy,
  ShieldCheck,
  Scale,
  Eye,
  Zap,
  FileText,
  Award,
  Search,
  Download,
  Upload,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock,
  Menu,
  X,
  AlertTriangle,
  Globe,
  Stethoscope,
  ShieldAlert,
  Languages,
  Users,
  Building2,
  Gavel
} from 'lucide-react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [leaderboardCategory, setLeaderboardCategory] = useState('Overall');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock Data
  const models = [
    { id: 1, name: "Omni-G 4.5", provider: "NeuralCore", overall: 94.2, secure: 92, fair: 95, clear: 91, reliable: 96, date: "2024-05" },
    { id: 2, name: "Llama-X 70B", provider: "MetaLogic", overall: 91.8, secure: 88, fair: 92, clear: 89, reliable: 94, date: "2024-04" },
    { id: 3, name: "Nexus Pro", provider: "OpenMind", overall: 90.5, secure: 94, fair: 87, clear: 93, reliable: 89, date: "2024-06" },
    { id: 4, name: "Titan 2", provider: "DeepSynthetix", overall: 89.1, secure: 85, fair: 90, clear: 88, reliable: 91, date: "2024-03" },
    { id: 5, name: "Clarify-1", provider: "EthicsAI", overall: 88.4, secure: 82, fair: 98, clear: 96, reliable: 82, date: "2024-05" },
  ];

  const papers = [
    { id: 1, title: "Measuring Red-Teaming Resilience in Large Language Models", score: 94, codeUrl: "#", paperUrl: "#", tags: ["Security", "Red-Teaming"] },
    { id: 2, title: "Fairness Audits: A New Framework for Bias Mitigation", score: 89, codeUrl: "#", paperUrl: "#", tags: ["Ethics", "Fairness"] },
    { id: 3, title: "The Uncertainty Quantification Benchmark (UQB)", score: 91, codeUrl: "#", paperUrl: "#", tags: ["Reliability"] },
    { id: 4, title: "Interpretable Attention Mechanisms in Transformers", score: 85, codeUrl: "#", paperUrl: "#", tags: ["Explainability"] },
  ];

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setActiveTab(id); setIsMenuOpen(false); }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
        }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Globe className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">TrustMaps</span>
            </div>

            <div className="hidden md:flex space-x-4">
              <NavItem id="home" label="Home" icon={Building2} />
              <NavItem id="leaderboard" label="Leaderboard" icon={Trophy} />
              <NavItem id="papers" label="Papers & Scores" icon={FileText} />
              <NavItem id="certify" label="Certify Model" icon={Award} />
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2">
            <NavItem id="home" label="Home" icon={Building2} />
            <NavItem id="leaderboard" label="Leaderboard" icon={Trophy} />
            <NavItem id="papers" label="Papers & Scores" icon={FileText} />
            <NavItem id="certify" label="Certify Model" icon={Award} />
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'leaderboard' && (
          <LeaderboardPage
            models={models}
            category={leaderboardCategory}
            setCategory={setLeaderboardCategory}
          />
        )}
        {activeTab === 'papers' && <PapersPage papers={papers} />}
        {activeTab === 'certify' && <CertificationWorkflow setActiveTab={setActiveTab} />}
      </main>

      <footer className="bg-white border-t mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Globe className="text-indigo-600" size={20} />
            <span className="text-lg font-bold">TrustMaps India</span>
          </div>
          <p className="text-slate-500 text-sm">Building the National Gold Standard for Medical AI Evaluation.</p>
        </div>
      </footer>
    </div>
  );
};

const HomePage = ({ setActiveTab }) => {
  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
          We evaluate AI <br /><span className="text-indigo-600">in Indian Healthcare</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
          India is quickly adopting AI through <span className="font-bold text-slate-800">Ayushman Bharat Digital Mission</span>.
          But as AI enters our hospitals, we face a critical question: <span className="italic">Is it safe for our people?</span>
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={() => setActiveTab('certify')} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
            Certify Your Model
          </button>
          <button onClick={() => setActiveTab('leaderboard')} className="bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
            View Leaderboard
          </button>
        </div>
      </section>

      {/* The Gap & Risks */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            The Critical Gap
          </div>
          <h2 className="text-4xl font-bold">Why Western Standards Don't Fit India</h2>
          <div className="space-y-4 text-slate-600">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
              <p><span className="font-bold text-slate-900">Population Diversity:</span> Western datasets are often homogeneous. India’s diversity in ethnicity, skin tones, and bodies requires specialized testing.</p>
            </div>
            <div className="flex items-start space-x-3">
              <Languages className="text-indigo-500 shrink-0 mt-1" size={20} />
              <p><span className="font-bold text-slate-900">Linguistic Complexity:</span> AI must handle "Hinglish," regional dialects, and code-mixing which current global models fail to do.</p>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldAlert className="text-orange-500 shrink-0 mt-1" size={20} />
              <p><span className="font-bold text-slate-900">Clinical Risk:</span> In high-stakes areas like <span className="text-slate-900 font-semibold">Mental Health and Oncology</span>, an AI "hallucination" can lead to life-altering mistakes.</p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-900 rounded-3xl p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Users size={200} />
          </div>
          <h3 className="text-2xl font-bold">A National Level Attempt</h3>
          <p className="text-indigo-100 opacity-80">We are building a unified framework to measure the dimensions that matter most to the Indian public.</p>
          <div className="grid grid-cols-2 gap-4">
            {['Privacy', 'Trustworthiness', 'Interpretability', 'Uncertainty'].map(item => (
              <div key={item} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-indigo-300 font-black mb-1">MEASURING</div>
                <div className="text-lg font-bold">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why India Center */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Why India needs a Nationwide Evaluation Center?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Providing a "gold standard" validated by top Indian institutes like AIIMS and IITs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
            <h4 className="text-xl font-bold">Protecting Vulnerable Populations</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Without a local center, AI might systematically misclassify or under-diagnose specific groups based on age, sex, or educational background, minimizing stigma in sensitive fields.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Gavel size={24} />
            </div>
            <h4 className="text-xl font-bold">DPDP Act 2023 Compliance</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Validate that medical AI tools follow Indian laws regarding patient consent, the "right to be forgotten," and technical security safeguards against adversarial attacks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Stethoscope size={24} />
            </div>
            <h4 className="text-xl font-bold">Building Clinical Trust</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Doctors are more likely to use AI if they understand how it works (Interpretability) and know it's been validated by trusted national authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Core Objectives</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-indigo-400">
              <ShieldCheck size={24} />
              <h3 className="text-xl font-bold">Objective 1: Privacy & Security</h3>
            </div>
            <p className="text-slate-400">To ensure patient data is protected and AI systems cannot be hacked or manipulated in clinical environments.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-indigo-400">
              <Scale size={24} />
              <h3 className="text-xl font-bold">Objective 2: Assessing Trustworthiness</h3>
            </div>
            <p className="text-slate-400">To measure bias, ensuring the AI treats all patients fairly regardless of age, sex, or socio-economic background.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-indigo-400">
              <Eye size={24} />
              <h3 className="text-xl font-bold">Objective 3: Interpretability</h3>
            </div>
            <p className="text-slate-400">Evaluating "why" an AI made a certain decision, allowing doctors to verify reasoning before acting.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-indigo-400">
              <Zap size={24} />
              <h3 className="text-xl font-bold">Objective 4: Uncertainty & Hallucination</h3>
            </div>
            <p className="text-slate-400">Identifying when AI "doesn't know" something to prevent it from providing dangerous or wrong medical advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const LeaderboardPage = ({ models, category, setCategory }) => {
  const tabs = [
    { name: 'Overall', icon: Trophy },
    { name: 'Secure', icon: ShieldCheck },
    { name: 'Fair', icon: Scale },
    { name: 'Clear', icon: Eye },
    { name: 'Reliable', icon: Zap }
  ];

  const sortedModels = [...models].sort((a, b) => b[category.toLowerCase()] - a[category.toLowerCase()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">TrustMaps Leaderboard</h1>
          <p className="text-slate-500 mt-1">Trustworthiness rankings based on the National Evaluation Framework.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCategory(tab.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${category === tab.name ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Rank</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Model</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Provider</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Score</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedModels.map((model, idx) => (
              <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                    idx === 1 ? 'bg-slate-100 text-slate-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-400'
                    }`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">{model.name}</td>
                <td className="px-6 py-4 text-slate-600">{model.provider}</td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                    {model[category.toLowerCase()]}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">{model.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle2 size={16} className="mr-1" />
                    Certified
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PapersPage = ({ papers }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Benchmarking Papers</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search papers..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {papers.map((paper) => (
        <div key={paper.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {paper.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors cursor-pointer">
                {paper.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-indigo-600 font-medium">
                <a href={paper.codeUrl} className="flex items-center hover:underline">
                  <ExternalLink size={14} className="mr-1" /> Code
                </a>
                <a href={paper.paperUrl} className="flex items-center hover:underline">
                  <FileText size={14} className="mr-1" /> Paper
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-dashed">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-800">{paper.score}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Trust Score</div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800">
                View Specs
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CertificationWorkflow = ({ setActiveTab }) => {
  const [step, setStep] = useState(1);
  const [verifyId, setVerifyId] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  const steps = [
    { id: 1, name: "Prepare", desc: "Download dataset & guidelines", icon: Download },
    { id: 2, name: "Submit", desc: "API Endpoint or Weights", icon: Upload },
    { id: 3, name: "Evaluation", desc: "Automated Stress Testing", icon: Clock },
    { id: 4, name: "Review", desc: "Certification Issued", icon: Award }
  ];

  const handleVerify = () => {
    // Works with any input for now
    if (verifyId.trim().length > 0) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };


  const handleDownloadReport = async () => {
    // Dynamic import to avoid SSR issues if this were a Next.js app, 
    // but standard import is fine for Vite. We'll use standard import at top of file, 
    // but for this snippet let's assume imports are added.
    // For this specific block, I will strictly rewrite the function logic.

    // We need to create a temporary element to render the HTML
    const reportContainer = document.createElement('div');
    reportContainer.style.position = 'absolute';
    reportContainer.style.top = '-9999px';
    reportContainer.style.left = '-9999px';
    reportContainer.style.width = '800px'; // Fixed width to ensure A4 consistency
    reportContainer.style.backgroundColor = '#ffffff';
    document.body.appendChild(reportContainer);

    reportContainer.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Courier+Prime:wght@700&display=swap');
        .report-body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #333; padding: 40px; background: #fff; }
        .header { border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
        .logo { font-size: 24px; font-weight: bold; color: #4f46e5; }
        .meta { text-align: right; font-size: 14px; color: #666; }
        h1 { font-size: 26px; margin-bottom: 10px; color: #1e1b4b; }
        h2 { font-size: 18px; color: #4f46e5; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        h3 { font-size: 14px; font-weight: bold; margin-top: 15px; color: #334155; }
        .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 10px; }
        .metric-item { background: #f8fafc; padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; border: 1px solid #e2e8f0; align-items: center; }
        .metric-name { font-weight: 500; font-size: 12px; }
        .metric-value { font-family: 'Courier Prime', monospace; font-weight: bold; color: #0f172a; font-size: 13px; }
        .footer { margin-top: 40px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
        .badge { background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-left: 5px; }
      </style>
      <div class="report-body">
        <div class="header">
          <div class="logo">TrustMaps India</div>
          <div class="meta">
            <div>Certificate ID: <strong>TM-IND-2024-HEALTH-001</strong></div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <h1>Comprehensive Model Evaluation Report</h1>
        <p>This report certifies that the model has undergone the rigorous <strong>National Trust Gold Standard</strong> evaluation protocol.</p>
        
        <h2>Security & Privacy Assessment</h2>
        <div class="metric-grid">
          <div class="metric-item"><span class="metric-name">Membership Inference Accuracy (MIA)</span> <span class="metric-value">0.52 <span class="badge">LOW RISK</span></span></div>
          <div class="metric-item"><span class="metric-name">Equal Error Rate (EER)</span> <span class="metric-value">2.4%</span></div>
          <div class="metric-item"><span class="metric-name">Differential Privacy Budget (&epsilon;)</span> <span class="metric-value">2.1</span></div>
          <div class="metric-item"><span class="metric-name">Vernacular Context Leakage (VCL)</span> <span class="metric-value">0.012</span></div>
          <div class="metric-item"><span class="metric-name">Cross-Modal Privacy Propagation (CPPI)</span> <span class="metric-value">Low</span></div>
          <div class="metric-item"><span class="metric-name">Stigmatization Amplification Risk (SAR)</span> <span class="metric-value">0.04</span></div>
          <div class="metric-item"><span class="metric-name">Clinical Harm Attack Rate (CH-ASR)</span> <span class="metric-value">0.0%</span></div>
        </div>

        <h2>Fairness Assessment</h2>
        <h3>Balancing Loss with Fairness Penalties</h3>
        <div class="metric-grid">
          <div class="metric-item"><span class="metric-name">Skewed Error Rate (SER)</span> <span class="metric-value">0.03</span></div>
          <div class="metric-item"><span class="metric-name">Demographic Parity (DP) Gap</span> <span class="metric-value">0.02</span></div>
          <div class="metric-item"><span class="metric-name">Equality of Opportunity (EO)</span> <span class="metric-value">0.98</span></div>
          <div class="metric-item"><span class="metric-name">Groupwise FNR/FPR Gap</span> <span class="metric-value">&lt; 1.5%</span></div>
          <div class="metric-item"><span class="metric-name">Individual Unfairness</span> <span class="metric-value">0.01</span></div>
          <div class="metric-item"><span class="metric-name">Counterfactual Unfairness</span> <span class="metric-value">Pass</span></div>
        </div>

        <h2>Calibration & Risk Assessment</h2>
        <div class="metric-grid">
          <div class="metric-item"><span class="metric-name">Predictive Entropy</span> <span class="metric-value">0.45 bits</span></div>
          <div class="metric-item"><span class="metric-name">Mutual Information</span> <span class="metric-value">0.32</span></div>
          <div class="metric-item"><span class="metric-name">Variance (Stochastic Passes)</span> <span class="metric-value">0.004</span></div>
          <div class="metric-item"><span class="metric-name">Abstention AU-ROC</span> <span class="metric-value">0.94</span></div>
          <div class="metric-item"><span class="metric-name">Uncertainty Confusion Metric (UCM)</span> <span class="metric-value">0.05</span></div>
          <div class="metric-item"><span class="metric-name">Harmonic Dice (HDice)</span> <span class="metric-value">0.89</span></div>
        </div>

        <div class="footer">
          Generated automatically by TrustMaps National Evaluation Center.<br>
          Verification Endpoint: https://trustmaps.gov.in/verify
        </div>
      </div>
    `;

    try {
      const canvas = await html2canvas(reportContainer, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('TrustMaps_Detailed_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      document.body.removeChild(reportContainer);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Workflow Section */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Model Certification</h1>
          <p className="text-slate-500 mt-1">Align your AI with TrustMaps national evaluation standards.</p>
        </div>

        {/* Stepper */}
        <div className="relative flex justify-between px-4">
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-10"></div>
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center space-y-2 bg-slate-50 px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'
                }`}>
                <s.icon size={18} />
              </div>
              <div className="hidden sm:block text-center">
                <div className="text-xs font-bold text-slate-800">{s.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Step 1: Download National Dataset Bundle</h3>
                <p className="text-slate-600">Prepare for the audit by testing against our proprietary Indian-centric clinical datasets.</p>
              </div>
              <div className="flex flex-col space-y-3">
                <button className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors">
                  <Download size={20} />
                  <span>Download India-Clinical-Suite.zip (5.8GB)</span>
                </button>
                <div className="text-xs text-slate-400 text-center italic">Includes: DPDP-compliance audit script and multi-dialect prompts.</div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 flex items-center shadow-lg shadow-indigo-100"
                >
                  Next Step <ChevronRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Step 2: Submit Endpoint for Testing</h3>
                <p className="text-slate-600">Connect your public API or upload a containerized model.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Inference URL</label>
                  <input type="text" placeholder="https://api.your-model-host.in/v1" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Authorization Key</label>
                  <input type="password" placeholder="••••••••••••" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:text-slate-700">Back</button>
                <button onClick={() => setStep(3)} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">Initiate Audit</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-12 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock className="text-indigo-600" size={32} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">National Stress-Testing...</h3>
                <p className="text-slate-600 max-w-sm mx-auto">Evaluating Privacy, Bias, and Interpretability across 22 regional language contexts.</p>
              </div>
              <button
                onClick={() => setStep(4)}
                className="text-indigo-600 text-sm font-bold hover:underline"
              >
                Skip to Results
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600">
                <Award size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-slate-900">Certified by TrustMaps</h3>
                <p className="text-slate-600">Your system has passed the <span className="font-bold text-slate-900">National Trust Gold Standard</span>.</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 font-mono text-sm inline-block">
                <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Verify at trustmaps.gov.in/verify</div>
                <span className="text-indigo-900 font-bold text-lg">TM-IND-2024-HEALTH-001</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  onClick={handleDownloadReport}
                  className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="flex-1 border-2 border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2"
                >
                  <Trophy size={18} />
                  <span>Visit Leaderboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verification Widget */}
      <div className="space-y-6">
        <div className="bg-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-white/10">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Verify a Certificate</h3>
            <p className="text-indigo-300 text-sm">Input any Certificate ID to verify its standing in the registry.</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={verifyId}
                onChange={(e) => setVerifyId(e.target.value)}
                placeholder="Ex: TM-IND-12345"
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-white/30"
              />
            </div>
            <button
              onClick={handleVerify}
              className="w-full bg-white text-indigo-950 font-black py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
            >
              Verify Certificate
            </button>
          </div>

          {isVerified !== null && (
            <div className={`p-4 rounded-xl flex items-start space-x-3 transition-all ${isVerified ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
              {isVerified ? (
                <>
                  <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <div className="font-bold">Authentic Certificate</div>
                    <div className="opacity-80">This model is officially certified and active in the National Registry.</div>
                  </div>
                </>
              ) : (
                <>
                  <X className="shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <div className="font-bold">Missing ID</div>
                    <div className="opacity-80">Please enter a valid TrustMaps Certificate ID.</div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* DPDP Section */}
        <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm space-y-4">
          <div className="flex items-center text-indigo-700 font-bold uppercase text-xs tracking-widest">
            <Gavel size={14} className="mr-2" /> Regulatory Alert
          </div>
          <h4 className="font-bold text-lg">DPDP Act 2023 Readiness</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            All AI systems evaluated by TrustMaps are checked for compliance with Section 6 regarding notice and consent, and Section 12 regarding the correction and erasure of personal data.
          </p>
          <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf" className="inline-flex items-center text-indigo-600 text-sm font-bold hover:underline">
            Read Guidance <ChevronRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
