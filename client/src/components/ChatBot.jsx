import { useState, useEffect, useRef } from 'react';

const FAQ_DATA = [
  {
    question: 'What is Khel?',
    answer: 'Khel is an AI-powered educational gaming platform that helps children learn through interactive games covering math, science, language, and EVS subjects from pre-nursery to Class VII.',
    keywords: ['what', 'khel', 'platform', 'about', 'is'],
  },
  {
    question: 'How do I subscribe?',
    answer: 'Visit our Plans page (/subscription), choose a plan that suits you, and make the payment via UPI. After payment, your subscription is activated automatically!',
    keywords: ['subscribe', 'subscription', 'plan', 'upgrade', 'premium'],
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all UPI payments including Google Pay, PhonePe, Paytm, BHIM, and other UPI-enabled apps. We also support Razorpay for secure transactions.',
    keywords: ['payment', 'pay', 'upi', 'method', 'google pay', 'phonepe', 'paytm'],
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime by contacting us at roychinu45@gmail.com. We provide prorated refunds for the remaining subscription period.',
    keywords: ['cancel', 'refund', 'unsubscribe'],
  },
  {
    question: 'What age group is Khel for?',
    answer: 'Khel is designed for children from pre-nursery (3 years) up to Class VII (13 years), covering multiple curriculum boards including NCERT, IB, and Montessori.',
    keywords: ['age', 'years', 'old', 'class', 'grade'],
  },
  {
    question: 'Can teachers use Khel?',
    answer: 'Yes! Khel includes a teacher dashboard for classroom management, assigning games to students, and tracking class progress. Teachers can create unlimited games on the Classroom plan.',
    keywords: ['teacher', 'classroom', 'school'],
  },
  {
    question: 'Is my child\'s data safe?',
    answer: 'Absolutely. We follow strict data protection practices and never share your child\'s information with third parties. All data is encrypted and stored securely.',
    keywords: ['safe', 'data', 'privacy', 'secure', 'protection'],
  },
  {
    question: 'Do you offer free trials?',
    answer: 'Yes, we have a Free plan with 10 games to get you started. You can upgrade anytime to access unlimited games and premium features.',
    keywords: ['free', 'trial', 'demo', 'test'],
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach us at roychinu45@gmail.com, call +91 7001406831, or use the contact form on this website. We typically respond within 24 hours.',
    keywords: ['contact', 'support', 'help', 'email', 'phone', 'reach'],
  },
  {
    question: 'Can I play games with my child?',
    answer: 'Yes! Khel includes multiplayer mode where you can play along with your child or let them compete with friends in real-time.',
    keywords: ['multiplayer', 'play together', 'compete', 'friends'],
  },
];

const QUICK_ANSWERS = {
  'hi': 'Hello! 👋 How can I help you today?',
  'hello': 'Hi there! What questions do you have about Khel?',
  'hey': 'Hey! 👋 Ask me anything about Khel!',
  'help': 'I can help you with: subscriptions, payments, gameplay, or general questions. What would you like to know?',
  'price': 'Our plans: Free (₹0 - 10 games), Parent (₹299/month - unlimited), Classroom (₹99/month - unlimited + student management). Visit /subscription for details!',
  'pricing': 'Our plans: Free (₹0 - 10 games), Parent (₹299/month - unlimited), Classroom (₹99/month - unlimited + student management). Visit /subscription for details!',
  'cost': 'Plans start at ₹0 (Free with 10 games). Parent plan is ₹299/month, Classroom is ₹99/month. Visit /subscription for full details!',
  'payment': 'We accept all UPI payments. Use our UPI ID: 7001406831-2@axl or pay securely via Razorpay on the subscription page.',
  'cancel': 'You can cancel anytime by emailing roychinu45@gmail.com. We offer prorated refunds for unused subscription time.',
  'free': 'Yes! Our Free plan gives you access to 10 games with no payment needed. No credit card required!',
  'trial': 'Try our Free plan with 10 games. No credit card required! Upgrade anytime for unlimited access.',
  'age': 'Khel is for kids aged 3-13 years (Pre-Nursery to Class VII). Games adapt to your child\'s developmental stage.',
  'curriculum': 'We cover NCERT, CBSE, ICSE, IB PYP, and Montessori curricula for classes Pre-Nursery to VII.',
  'teacher': 'Yes! Teachers can create classrooms, assign games, and track student progress. The Classroom plan is just ₹99/month.',
  'contact': 'Email: roychinu45@gmail.com | Phone: +91 7001406831 | We respond within 24 hours!',
  'subscription': 'Visit /subscription to see our plans: Free (₹0), Parent (₹299/month), Classroom (₹99/month), or Yearly (₹2400/year).',
  'plans': 'Free (₹0 - 10 games), Parent (₹299/month - unlimited games), Classroom (₹99/month - unlimited + students), Yearly (₹2400 - best value!).',
  'features': 'Khel features: AI game generation, 8 game types, multiplayer mode, progress tracking, teacher dashboard, and curriculum alignment.',
  'games': 'We offer 8 game types: Tap & Match, Drag & Sort, Maze Runner, Word Builder, Quiz Adventure, Strategy Sim, Code & Play, and Multiplayer Race.',
  'create': 'Click "Create" in the navbar (you need to be logged in) to generate games with AI or use the Editor to create manually!',
  'login': 'Click "Login" in the top right corner. If you don\'t have an account, click "Get Started" to register for free.',
  'register': 'Click "Get Started" in the top right corner. Registration is free and takes less than a minute!',
};

// Improved keyword matching with scoring
function getBotResponse(query) {
  const q = query.toLowerCase().trim();
  
  // Check for empty query
  if (!q) return 'Please type your question and I\'ll try to help! 😊';
  
  // First, check exact keyword matches in QUICK_ANSWERS
  for (const [key, answer] of Object.entries(QUICK_ANSWERS)) {
    if (q === key || q.includes(` ${key} `) || q.startsWith(key + ' ') || q.endsWith(' ' + key)) {
      return answer;
    }
  }
  
  // Check if query contains any quick answer keywords
  const words = q.split(/\s+/);
  for (const [key, answer] of Object.entries(QUICK_ANSWERS)) {
    if (words.includes(key)) {
      return answer;
    }
  }
  
  // Score-based FAQ matching
  let bestMatch = null;
  let bestScore = 0;
  
  for (const faq of FAQ_DATA) {
    let score = 0;
    const questionWords = faq.question.toLowerCase().split(/\s+/);
    
    // Score for keyword matches
    for (const keyword of faq.keywords) {
      if (q.includes(keyword)) {
        score += 3;
      }
    }
    
    // Score for question word matches
    for (const word of questionWords) {
      if (word.length > 3 && q.includes(word)) {
        score += 1;
      }
    }
    
    // Bonus for exact phrase match
    if (q.includes(faq.question.toLowerCase())) {
      score += 10;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }
  
  // Return best match if score is high enough
  if (bestMatch && bestScore >= 3) {
    return bestMatch.answer;
  }
  
  // Fallback with helpful suggestions
  return "I'm not sure about that. Try asking about:\n\n" +
    "• Subscription plans and pricing\n" +
    "• Payment methods\n" +
    "• Age groups and curriculum\n" +
    "• Teacher features\n" +
    "• Game types\n\n" +
    "Or contact support at roychinu45@gmail.com or call +91 7001406831";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m here to help. Ask me anything about Khel!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    const botMsg = { from: 'bot', text: getBotResponse(input) };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button onClick={() => setOpen(!open)} style={styles.trigger}>
        💬
      </button>

      {open && (
        <div style={styles.chatbox}>
          <div style={styles.header}>
            <span>Khel Support</span>
            <button onClick={() => setOpen(false)} style={styles.closeBtn}>×</button>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={{...styles.msg, ...(msg.from === 'user' ? styles.userMsg : styles.botMsg)}}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  trigger: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#6366f1',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
    zIndex: 1000,
  },
  chatbox: {
    position: 'fixed',
    bottom: '100px',
    right: '24px',
    width: '360px',
    height: '480px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
  },
  header: {
    padding: '16px 20px',
    background: '#6366f1',
    color: '#fff',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
  },
  messages: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  msg: {
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    lineHeight: '1.5',
    maxWidth: '85%',
    whiteSpace: 'pre-line',
  },
  userMsg: {
    alignSelf: 'flex-end',
    background: '#6366f1',
    color: '#fff',
  },
  botMsg: {
    alignSelf: 'flex-start',
    background: '#f3f4f6',
    color: '#1f2937',
  },
  inputArea: {
    padding: '12px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
  },
  sendBtn: {
    padding: '10px 20px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};
