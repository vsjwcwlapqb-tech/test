const { useState, useEffect } = React;
if (!window.storage) {
  window.storage = {
    get: async (key) => { const value = localStorage.getItem(key); return value === null ? null : { value }; },
    set: async (key, value) => { localStorage.setItem(key, value); return true; },
    delete: async (key) => { localStorage.removeItem(key); return true; }
  };
}

// ── CUSTOMER / WORKER LANGUAGE TOGGLE ─────────────────────────────
const NE_TXT = {
  "Home":"गृहपृष्ठ","Browse":"ब्राउज","My Space":"मेरो ठाउँ","Alerts":"सूचना","More":"थप",
  "Services":"सेवाहरू","Rent a Space":"ठाउँ भाडामा","Find trusted home workers":"विश्वसनीय घर सेवा कामदार खोज्नुहोस्",
  "Search services or providers...":"सेवा वा प्रदायक खोज्नुहोस्...","Search by name or phone...":"नाम वा फोनबाट खोज्नुहोस्...",
  "All":"सबै","Water":"पानी","Electrical":"बिजुली","Furniture":"फर्निचर","Cleaning":"सफाई","Appliance":"उपकरण","Construction":"निर्माण",
  "Rating: Any":"रेटिङ: कुनै पनि","providers":"प्रदायकहरू","View Profile":"प्रोफाइल हेर्नुहोस्","Book Now":"बुक गर्नुहोस्",
  "Busy":"व्यस्त","Pro":"प्रो","standard":"स्ट्यान्डर्ड","premium":"प्रिमियम","active":"सक्रिय",
  "Post Requirement":"आवश्यकता पोस्ट गर्नुहोस्","Customer Requirements":"ग्राहक आवश्यकताहरू","Customer Requirements Feed":"ग्राहक आवश्यकता फिड",
  "Service Needed":"आवश्यक सेवा","Location":"स्थान","Budget":"बजेट","Description":"विवरण","Post":"पोस्ट गर्नुहोस्",
  "I am interested":"म इच्छुक छु","Send Quote":"कोट पठाउनुहोस्","Matches you":"तपाईंलाई मिल्छ","Other service":"अन्य सेवा",
  "Worker Feed":"कामदार फिड","Bookings":"बुकिङहरू","Earnings":"कमाइ","Reviews":"समीक्षा","Settings":"सेटिङहरू",
  "GharSewa Worker":"घरसेवा कामदार","Online":"अनलाइन","Away":"टाढा","Dashboard":"ड्यासबोर्ड","Today":"आज","Upcoming":"आउने","Completed":"सम्पन्न",
  "New Jobs":"नयाँ कामहरू","Accept":"स्वीकार","Reject":"अस्वीकार","Complete":"सम्पन्न गर्नुहोस्","Call":"कल","Message":"सन्देश",
  "Earnings Overview":"कमाइ विवरण","Pending":"बाँकी","Net Payout":"नेट भुक्तानी","Payout Breakdown":"भुक्तानी विवरण",
  "Worker Settings":"कामदार सेटिङ","Profile Settings":"प्रोफाइल सेटिङ","Full Name":"पूरा नाम","Phone Number":"फोन नम्बर","Service Category":"सेवा वर्ग","Service Area":"सेवा क्षेत्र","Base Price":"आधार मूल्य","Experience":"अनुभव","Bio":"परिचय","Save Changes":"परिवर्तन सुरक्षित गर्नुहोस्","Sign Out":"साइन आउट",
  "Settings Updated":"सेटिङ अपडेट भयो","Your worker profile has been saved.":"तपाईंको कामदार प्रोफाइल सुरक्षित भयो।",
  "Loyalty":"लयल्टी","Referral":"रेफरल","Support":"सहयोग","FAQ":"प्रश्नहरू","About and Contact":"बारेमा र सम्पर्क","Profile, notifications, language":"प्रोफाइल, सूचना, भाषा",
  "Notification Settings":"सूचना सेटिङ","Language":"भाषा","English":"अंग्रेजी","Nepali":"नेपाली","Save":"सेभ",
  "Welcome to GharSewa!":"घरसेवामा स्वागत छ!","Loading...":"लोड हुँदैछ...","Get Started":"सुरु गर्नुहोस्","Step 1 of 3":"३ मध्ये चरण १","Who are you?":"तपाईं को हुनुहुन्छ?",
  "Customer":"ग्राहक","Service Worker":"सेवा कामदार","Admin":"एड्मिन","Continue":"जारी राख्नुहोस्","Your Details":"तपाईंको विवरण","Worker Details":"कामदार विवरण","Next":"अर्को","Submit Application":"आवेदन पेश गर्नुहोस्","Open Worker Dashboard":"कामदार ड्यासबोर्ड खोल्नुहोस्","Explore GharSewa":"घरसेवा खोल्नुहोस्","Approved Worker? Login with Email":"स्वीकृत कामदार? इमेलबाट लगइन","Email Address":"इमेल ठेगाना","Create Password":"पासवर्ड बनाउनुहोस्","Worker Login":"कामदार लगइन","Login with Email and Password":"इमेल र पासवर्डबाट लगइन","Login to Worker Portal":"कामदार पोर्टलमा लगइन","New Worker? Create Account":"नयाँ कामदार? खाता बनाउनुहोस्","Go to Worker Login":"कामदार लगइनमा जानुहोस्",
  "Sign Up":"साइन अप","Login":"लगइन","Worker Account":"कामदार खाता","Create Worker Account":"कामदार खाता बनाउनुहोस्","Already approved? Login here":"पहिले नै स्वीकृत? यहाँ लगइन गर्नुहोस्","Create Account":"खाता बनाउनुहोस्","Back":"पछाडि","Password":"पासवर्ड","Only admin-approved workers can access the Worker Portal.":"एड्मिनले स्वीकृत गरेका कामदारले मात्र कामदार पोर्टल खोल्न सक्छन्।","After signup, admin must approve your account. Only approved workers can login.":"साइन अपपछि एड्मिनले तपाईंको खाता स्वीकृत गर्नुपर्छ। स्वीकृत कामदारले मात्र लगइन गर्न सक्छन्।","Send OTP":"OTP पठाउनुहोस्","Enter OTP (any 4 digits — demo)":"OTP प्रविष्ट गर्नुहोस् (डेमोमा कुनै पनि ४ अंक)","Verify and Continue":"प्रमाणित गरी जारी राख्नुहोस्","Admin Access":"एड्मिन पहुँच","Enter the admin access code":"एड्मिन पहुँच कोड प्रविष्ट गर्नुहोस्","Admin Code":"एड्मिन कोड","Demo code: ADMIN123":"डेमो कोड: ADMIN123","Enter Admin Panel":"एड्मिन प्यानल खोल्नुहोस्","Worker Setup":"कामदार सेटअप","Step 3 of 4 — Worker Setup":"४ मध्ये चरण ३ — कामदार सेटअप","Choose Service":"सेवा छान्नुहोस्","Area and Rate":"क्षेत्र र शुल्क","Upload Docs":"कागजात अपलोड","Choose Plan":"योजना छान्नुहोस्","Select one or more services you can offer:":"तपाईंले दिन सक्ने एक वा बढी सेवा छान्नुहोस्:","Application Submitted!":"आवेदन पेश भयो!","Your documents are being reviewed. You will receive an SMS within 24 hours once approved.":"तपाईंका कागजात समीक्षा हुँदैछन्। स्वीकृत भएपछि २४ घण्टाभित्र SMS पाउनुहुनेछ।","Go to Worker Login":"कामदार लगइनमा जानुहोस्","Explore GharSewa":"घरसेवा अन्वेषण गर्नुहोस्","41 Services · 10 Rentals · Kathmandu Valley":"४१ सेवा · १० भाडा · काठमाडौं उपत्यका","41 Services":"४१ सेवा","10 Rentals":"१० भाडा","10+ Workers":"१०+ कामदार","4.8★ Rating":"४.८★ रेटिङ","Rentals":"भाडा","Workers":"कामदार","Rating":"रेटिङ","Book 47 services, rent homes, earn rewards.":"४७ सेवा बुक गर्नुहोस्, घर भाडामा लिनुहोस्, र पुरस्कार कमाउनुहोस्।","Offer services, receive bookings, earn money.":"सेवा दिनुहोस्, बुकिङ प्राप्त गर्नुहोस्, पैसा कमाउनुहोस्।","Manage the entire GharSewa platform.":"पूरै घरसेवा प्लेटफर्म व्यवस्थापन गर्नुहोस्।","Book instantly":"तुरुन्त बुक गर्नुहोस्","Rent rooms/villas":"कोठा/भिल्ला भाडामा","Pay eSewa/Khalti":"eSewa/Khalti बाट भुक्तानी","Earn loyalty pts":"लयल्टी अंक कमाउनुहोस्","Get ID-verified":"ID प्रमाणित गर्नुहोस्","Unlimited bookings":"असीमित बुकिङ","Earnings dashboard":"कमाइ ड्यासबोर्ड","3 months FREE":"३ महिना निःशुल्क","Verify providers":"प्रदायक प्रमाणित","All bookings":"सबै बुकिङ","Revenue dashboard":"आम्दानी ड्यासबोर्ड","Disputes and promo":"विवाद र प्रोमो","Your full name":"तपाईंको पूरा नाम","Minimum 6 characters":"कम्तीमा ६ अक्षर","worker@email.com":"worker@email.com","Search":"खोज्नुहोस्","Customer Login":"ग्राहक लगइन","Customer Signup":"ग्राहक साइन अप","Provider":"प्रदायक","Admin Panel":"एड्मिन प्यानल","Approve":"स्वीकृत","Approved":"स्वीकृत","Rejected":"अस्वीकृत","Pending Verify":"प्रमाणीकरण बाँकी","Verify":"प्रमाणित गर्नुहोस्","Users":"प्रयोगकर्ता","Tools":"उपकरण","Finance":"वित्त","Overview":"अवलोकन","Today Bookings":"आजको बुकिङ","Total Bookings":"कुल बुकिङ","Active Providers":"सक्रिय प्रदायक","Total GMV":"कुल GMV","Commission":"कमिसन","Top Services":"शीर्ष सेवा","View History":"इतिहास हेर्नुहोस्","Ban User":"प्रयोगकर्ता प्रतिबन्ध","Call Customer":"ग्राहकलाई कल","Call Worker":"कामदारलाई कल","Message Both":"दुवैलाई सन्देश","Resolve Case":"केस समाधान गर्नुहोस्","Disputes":"विवादहरू", "Subscription":"सदस्यता", "Subscription Status":"सदस्यता अवस्था", "Renew Plan":"योजना नवीकरण", "Upgrade Plan":"योजना अपग्रेड", "Current Plan":"हालको योजना", "Expires":"समाप्त हुने", "Days Left":"बाँकी दिन", "Pay with eSewa":"eSewa बाट तिर्नुहोस्", "Pay with Khalti":"Khalti बाट तिर्नुहोस्", "Choose Your Plan":"आफ्नो योजना छान्नुहोस्", "Admin Subscriptions":"एड्मिन सदस्यता", "Active Subs":"सक्रिय सदस्यता", "Expired Subs":"समाप्त सदस्यता", "Monthly Sub Revenue":"मासिक सदस्यता आम्दानी", "Renewed":"नवीकरण भयो", "Plan Updated":"योजना अपडेट भयो"
};
const EN_TXT = Object.fromEntries(Object.entries(NE_TXT).map(([k,v]) => [v,k]));
function useLanguageAutoTranslate(lang) {
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    let busy = false;
    const translate = () => {
      if (busy) return; busy = true;
      const map = lang === 'ne' ? NE_TXT : EN_TXT;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      const entries = Object.entries(map).sort((a,b)=>b[0].length-a[0].length);
      nodes.forEach(n => {
        const raw = n.nodeValue || ''; const trimmed = raw.trim();
        if (!trimmed || trimmed.length > 140) return;
        let out = map[trimmed];
        if (!out) {
          out = trimmed;
          entries.forEach(([a,b]) => { out = out.split(a).join(b); });
          if (out === trimmed) out = null;
        }
        if (out) n.nodeValue = raw.replace(trimmed, out);
      });
      root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const raw = el.getAttribute('placeholder') || '';
        if (!raw || raw.length > 140) return;
        let out = map[raw] || raw;
        entries.forEach(([a,b]) => { out = out.split(a).join(b); });
        if (out !== raw) el.setAttribute('placeholder', out);
      });
      document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
      busy = false;
    };
    translate();
    const mo = new MutationObserver(() => setTimeout(translate, 40));
    mo.observe(root, { childList: true, subtree: true, characterData: true, attributes:true, attributeFilter:['placeholder'] });
    return () => mo.disconnect();
  }, [lang]);
}
function LanguageToggle({ lang, setLang, dark=false }) {
  return React.createElement("button", {
    title: "Switch English / Nepali",
    style: { border: "1px solid " + (dark ? "#E5E7EB" : "rgba(255,255,255,.35)"), background: dark ? "#FFFFFF" : "rgba(255,255,255,.18)", color: dark ? "#A52A24" : "#FFFFFF", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
    onClick: () => setLang(lang === "en" ? "ne" : "en")
  }, lang === "en" ? "नेपाली" : "EN");
}

// ── SHARED CHAT + DEMO DATA HELPERS ─────────────────────────────
function maskPhoneNumbers(text){
  return String(text || '').replace(/(\+?977[- ]?)?(98\d{8}|97\d{8}|96\d{8}|0?1[- ]?\d{7}|\b\d{10}\b)/g, '**********');
}
function readLS(key, fallback){ try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch(e){ return fallback; } }
function writeLS(key, value){ try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){} }
function sameWorker(booking, worker){
  if(!booking || !worker) return false;
  const a = String(booking.workerEmail || booking.provEmail || '').toLowerCase();
  const b = String(worker.email || '').toLowerCase();
  const pn = String(booking.prov || booking.providerName || '').toLowerCase();
  const wn = String(worker.name || '').toLowerCase();
  const svc = String(booking.svcId || booking.serviceId || booking.svc || '').toLowerCase();
  const wsvc = String(worker.service || '').toLowerCase();
  return (a && b && a===b) || (pn && wn && pn===wn) || (!a && !pn && svc && wsvc && svc.includes(wsvc));
}
function ChatPanel({ bookingId, role, title, onBack }){
  const key = 'g8_chat_' + bookingId;
  const [msgs,setMsgs] = React.useState(() => readLS(key, []));
  const [txt,setTxt] = React.useState('');
  React.useEffect(() => { const t=setInterval(()=>setMsgs(readLS(key, [])), 900); return () => clearInterval(t); }, [key]);
  const send = () => {
    const clean = maskPhoneNumbers(txt.trim());
    if(!clean) return;
    const msg = { id:Date.now(), role, text:clean, time:new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) };
    const next = [...readLS(key, []), msg];
    writeLS(key, next); setMsgs(next); setTxt('');
  };
  const wrap={background:'#fff',border:'1px solid #E5E7EB',borderRadius:16,padding:12,margin:12};
  return React.createElement('div',{style:{padding:'12px 14px 0'}},
    React.createElement('button',{style:{border:'none',background:'none',fontWeight:900,marginBottom:10,cursor:'pointer'},onClick:onBack},'← Back'),
    React.createElement('div',{style:wrap},
      React.createElement('div',{style:{fontSize:18,fontWeight:900,marginBottom:4}},'💬 '+(title || 'Booking Chat')),
      React.createElement('div',{style:{fontSize:11,color:'#6B7280',marginBottom:10}},'Phone numbers are automatically hidden as **********. Chat is separate for booking '+bookingId+'.'),
      React.createElement('div',{style:{height:300,overflowY:'auto',background:'#F9FAFB',borderRadius:14,padding:10,marginBottom:10}},
        msgs.length===0 ? React.createElement('div',{style:{textAlign:'center',color:'#6B7280',paddingTop:110}},'No messages yet.') : msgs.map(m => React.createElement('div',{key:m.id,style:{display:'flex',justifyContent:m.role===role?'flex-end':'flex-start',margin:'7px 0'}},
          React.createElement('div',{style:{maxWidth:'78%',background:m.role===role?'#A52A24':'#FFFFFF',color:m.role===role?'#FFFFFF':'#111827',border:'1px solid #E5E7EB',borderRadius:14,padding:'8px 10px'}},
            React.createElement('div',{style:{fontSize:12,lineHeight:1.35,whiteSpace:'pre-wrap'}},m.text),
            React.createElement('div',{style:{fontSize:9,opacity:.7,marginTop:4}},(m.role==='worker'?'Worker':'Customer')+' · '+m.time)
          )
        ))
      ),
      React.createElement('div',{style:{display:'flex',gap:8}},
        React.createElement('input',{style:{flex:1,border:'1px solid #E5E7EB',borderRadius:12,padding:'11px 12px',fontFamily:'inherit'},placeholder:'Type message...',value:txt,onChange:e=>setTxt(e.target.value),onKeyDown:e=>{if(e.key==='Enter')send();}}),
        React.createElement('button',{style:{border:'none',borderRadius:12,padding:'0 16px',background:'#A52A24',color:'#fff',fontWeight:900},onClick:send},'Send')
      )
    )
  );
}

// ── CONSTANTS ──────────────────────────────────────────────────────
const COMMISSION = 0.10, TDS = 0.015, VAT = 0.13, PPR = 0.1, P2N = 0.5;
const REF_YOU = 200, REF_FRIEND = 100, MIN_PAYOUT = 500;
const PROMO = { "GHARSEWA200": 200, "WELCOME100": 100, "DASHAIN150": 150, "RENT500": 500, "VILLA1000": 1000 };
const SERVICES = [
    { id: "plumbing", icon: "🔧", label: "Plumbing Repair", labelNe: "धारा/पाइप मर्मत", group: "water", pF: 500, pt: "job" },
    { id: "bathroom", icon: "🚿", label: "Bathroom Fitting", labelNe: "बाथरुम फिटिङ", group: "water", pF: 1500, pt: "job" },
    { id: "tankcleaning", icon: "🪣", label: "Water Tank Cleaning", labelNe: "ट्याङ्की सफाई", group: "water", pF: 1000, pt: "tank" },
    { id: "tanker", icon: "🚚", label: "Water Tanker Delivery", labelNe: "ट्याङ्कर डेलिभरी", group: "water", pF: 800, pt: "trip" },
    { id: "drain", icon: "🌊", label: "Drain Unblocking", labelNe: "ढल सफाई", group: "water", pF: 500, pt: "job" },
    { id: "geyser", icon: "♨️", label: "Geyser/Water Heater", labelNe: "गिजर मर्मत", group: "water", pF: 500, pt: "job" },
    { id: "electrical", icon: "⚡", label: "Electrical Wiring", labelNe: "बिजुली तार जडान", group: "electrical", pF: 500, pt: "job" },
    { id: "switch", icon: "🔌", label: "Switch/Socket Repair", labelNe: "स्विच/सकेट मर्मत", group: "electrical", pF: 300, pt: "pt" },
    { id: "lighting", icon: "💡", label: "Light/Fan Installation", labelNe: "बत्ती/पंखा जडान", group: "electrical", pF: 300, pt: "item" },
    { id: "inverter", icon: "🔋", label: "Inverter/UPS Service", labelNe: "इन्भर्टर मर्मत", group: "electrical", pF: 500, pt: "job" },
    { id: "solar", icon: "☀️", label: "Solar Panel Service", labelNe: "सोलार प्यानल", group: "electrical", pF: 1000, pt: "job" },
    { id: "generator", icon: "⚙️", label: "Generator Repair", labelNe: "जेनेरेटर मर्मत", group: "electrical", pF: 1000, pt: "job" },
    { id: "furniture", icon: "🪑", label: "Furniture Repair", labelNe: "फर्निचर मर्मत", group: "furniture", pF: 500, pt: "item" },
    { id: "assembly", icon: "📦", label: "Furniture Assembly", labelNe: "फर्निचर जोड्ने", group: "furniture", pF: 500, pt: "item" },
    { id: "doorwindow", icon: "🚪", label: "Door/Window Repair", labelNe: "ढोका/झ्याल मर्मत", group: "furniture", pF: 500, pt: "job" },
    { id: "carpentry", icon: "🪚", label: "Carpentry/Woodwork", labelNe: "काठको काम", group: "furniture", pF: 800, pt: "job" },
    { id: "lockkey", icon: "🔐", label: "Lock/Key Service", labelNe: "ताला/साँचो सर्भिस", group: "furniture", pF: 300, pt: "job" },
    { id: "cleaning", icon: "🧹", label: "Home Deep Cleaning", labelNe: "घर सफाई (डिप)", group: "cleaning", pF: 2000, pt: "session" },
    { id: "bathclean", icon: "🛁", label: "Bathroom Deep Clean", labelNe: "बाथरुम सफाई", group: "cleaning", pF: 800, pt: "bathroom" },
    { id: "pestcontrol", icon: "🪲", label: "Pest Control", labelNe: "कीरा नियन्त्रण", group: "cleaning", pF: 1500, pt: "home" },
    { id: "carpet", icon: "🧺", label: "Carpet/Sofa Shampooing", labelNe: "कार्पेट धुलाई", group: "cleaning", pF: 500, pt: "item" },
    { id: "disinfect", icon: "🧴", label: "Disinfection", labelNe: "कीटाणु नाश", group: "cleaning", pF: 1500, pt: "home" },
    { id: "carwash", icon: "🚗", label: "Car Wash at Home", labelNe: "घरमै गाडी धुलाई", group: "cleaning", pF: 300, pt: "car" },
    { id: "ac", icon: "❄️", label: "AC Repair/Service", labelNe: "एसी मर्मत/सर्भिस", group: "appliance", pF: 800, pt: "job" },
    { id: "fridge", icon: "🧊", label: "Refrigerator Repair", labelNe: "फ्रिज मर्मत", group: "appliance", pF: 500, pt: "job" },
    { id: "washing", icon: "👕", label: "Washing Machine Repair", labelNe: "वासिङ मेसिन मर्मत", group: "appliance", pF: 500, pt: "job" },
    { id: "tv", icon: "📺", label: "TV/Electronics Repair", labelNe: "टिभी मर्मत", group: "appliance", pF: 500, pt: "job" },
    { id: "computer", icon: "💻", label: "Computer/Laptop Repair", labelNe: "कम्प्युटर मर्मत", group: "appliance", pF: 500, pt: "job" },
    { id: "wifi", icon: "🌐", label: "WiFi/Networking Setup", labelNe: "वाइफाइ सेटअप", group: "appliance", pF: 500, pt: "job" },
    { id: "painting", icon: "🎨", label: "Wall Painting", labelNe: "रंगरोगन", group: "construction", pF: 1500, pt: "sqft" },
    { id: "tiling", icon: "🪨", label: "Tile/Flooring Work", labelNe: "टाइल/भुइँ काम", group: "construction", pF: 1200, pt: "sqft" },
    { id: "waterproof", icon: "🌧️", label: "Waterproofing", labelNe: "पानी चुहावट ठीक", group: "construction", pF: 1000, pt: "sqft" },
    { id: "masonry", icon: "🧱", label: "Masonry/Cement Work", labelNe: "ढलान/मसला काम", group: "construction", pF: 800, pt: "day" },
    { id: "cctv", icon: "📹", label: "CCTV Installation", labelNe: "क्यामेरा जडान", group: "security", pF: 2000, pt: "setup" },
    { id: "smartlock", icon: "🔏", label: "Smart Lock Install", labelNe: "स्मार्ट लक जडान", group: "security", pF: 1500, pt: "lock" },
    { id: "alarm", icon: "🚨", label: "Home Alarm System", labelNe: "अलार्म सिस्टम", group: "security", pF: 3000, pt: "setup" },
    { id: "automation", icon: "🤖", label: "Home Automation", labelNe: "स्मार्ट होम सेटअप", group: "security", pF: 5000, pt: "job" },
    { id: "gardening", icon: "🌿", label: "Gardening/Landscaping", labelNe: "बगैचा मर्मत", group: "outdoor", pF: 500, pt: "session" },
    { id: "roofrepair", icon: "🏚️", label: "Roof Repair/Cleaning", labelNe: "छाना मर्मत/सफाई", group: "outdoor", pF: 1500, pt: "job" },
    { id: "moving", icon: "🚛", label: "Home Shifting/Moving", labelNe: "सामान सार्ने सेवा", group: "outdoor", pF: 2500, pt: "move" },
    { id: "grill", icon: "⛓️", label: "Iron Grill/Gate Work", labelNe: "फलाम ग्रिल काम", group: "outdoor", pF: 1500, pt: "job" },
];
const GROUPS = [
    { id: "water", label: "Water & Plumbing", icon: "💧", color: "#1565C0" },
    { id: "electrical", label: "Electrical", icon: "⚡", color: "#F57F17" },
    { id: "furniture", label: "Furniture & Wood", icon: "🪑", color: "#5D4037" },
    { id: "cleaning", label: "Cleaning", icon: "🧹", color: "#2D6A4F" },
    { id: "appliance", label: "Appliance Repair", icon: "🔧", color: "#6A1B9A" },
    { id: "construction", label: "Construction", icon: "🏗️", color: "#E65100" },
    { id: "security", label: "Security", icon: "🔒", color: "#C62828" },
    { id: "outdoor", label: "Outdoor & Moving", icon: "🌿", color: "#1B5E20" },
];
const AREAS = [
    { id: "thamel", name: "Thamel", ne: "थमेल" },
    { id: "baneshwor", name: "Baneshwor", ne: "बानेश्वर" },
    { id: "newroad", name: "New Road", ne: "नयाँ सडक" },
    { id: "lalitpur", name: "Lalitpur", ne: "ललितपुर" },
    { id: "bhaktapur", name: "Bhaktapur", ne: "भक्तपुर" },
    { id: "patan", name: "Patan", ne: "पाटन" },
    { id: "koteshwor", name: "Koteshwor", ne: "कोटेश्वर" },
    { id: "balaju", name: "Balaju", ne: "बालाजु" },
    { id: "chabahil", name: "Chabahil", ne: "चाबहिल" },
    { id: "kirtipur", name: "Kirtipur", ne: "कीर्तिपुर" },
];
const PLANS = [
    { id: "basic", name: "Basic", price: 500, color: "#6B7280", features: ["Profile listing", "10 bookings/mo", "Email support", "Verified badge"] },
    { id: "standard", name: "Standard", price: 1000, color: "#1565C0", rec: true, features: ["Priority listing", "Unlimited bookings", "SMS+Email", "Pro badge", "Analytics"] },
    { id: "premium", name: "Premium", price: 2000, color: "#7B1FA2", features: ["Top of search", "Unlimited bookings", "24/7 support", "Elite badge", "Featured"] },
];
const planInfo = id => PLANS.find(p => p.id === id) || PLANS[1];
const addDaysISO = days => new Date(Date.now() + days * 86400000).toISOString().slice(0,10);
const daysLeft = date => Math.max(0, Math.ceil((new Date(date) - new Date()) / 86400000));
const PROVIDERS = [
    { id: 1, name: "Ram Bahadur Tamang", ne: "राम बहादुर तामाङ", service: "plumbing", rating: 4.8, reviews: 47, jobs: 234, price: 800, area: "thamel", avail: true, img: "🔧", badge: "elite", exp: 8, bio: "Plumbing and bathroom fitting specialist with 8 years of experience.", skills: ["Pipe Repair", "Bathroom Fitting", "Drain Unblocking"], days: [1, 2, 3, 4, 5, 6], hrs: { s: "7:00", e: "18:00" } },
    { id: 2, name: "Sita Sharma", ne: "सीता शर्मा", service: "cleaning", rating: 4.9, reviews: 89, jobs: 456, price: 600, area: "baneshwor", avail: true, img: "🧹", badge: "elite", exp: 5, bio: "Deep cleaning and eco-friendly products specialist.", skills: ["Deep Cleaning", "Carpet Shampooing", "Disinfection"], days: [1, 2, 3, 4, 5], hrs: { s: "8:00", e: "17:00" } },
    { id: 3, name: "Dinesh Maharjan", ne: "दिनेश महर्जन", service: "ac", rating: 4.7, reviews: 62, jobs: 312, price: 2000, area: "koteshwor", avail: true, img: "❄️", badge: "elite", exp: 9, bio: "AC installation and repair expert. All brands serviced.", skills: ["AC Install", "AC Repair", "Gas Refill"], days: [0, 1, 2, 3, 4, 5, 6], hrs: { s: "8:00", e: "20:00" } },
    { id: 4, name: "Rajan Poudel", ne: "राजन पौडेल", service: "solar", rating: 4.9, reviews: 55, jobs: 203, price: 2000, area: "lalitpur", avail: true, img: "☀️", badge: "elite", exp: 9, bio: "Solar panel installation and maintenance expert.", skills: ["Solar Install", "Maintenance", "Inverter Setup"], days: [1, 2, 3, 4, 5, 6], hrs: { s: "8:00", e: "18:00" } },
    
    { id: 101, name: "CCTV Nepal Pro", ne: "सिसिटिभी नेपाल प्रो", service: "security", rating: 4.9, reviews: 88, jobs: 420, price: 1800, area: "baneshwor", avail: true, img: "📹", badge: "elite", exp: 8, bio: "CCTV installation, DVR/NVR setup and remote monitoring specialist.", skills: ["CCTV Install","IP Camera","DVR Setup"] },
    { id: 102, name: "Nirajan Network", ne: "निराजन नेटवर्क", service: "security", rating: 4.8, reviews: 64, jobs: 310, price: 1500, area: "koteshwor", avail: true, img: "🌐", badge: "pro", exp: 7, bio: "WiFi, router and office networking expert.", skills: ["WiFi Setup","Router Config","LAN Network"] },
    { id: 103, name: "Kathmandu Security Guards", ne: "काठमाडौं सेक्युरिटी", service: "security", rating: 4.7, reviews: 95, jobs: 500, price: 2500, area: "thamel", avail: true, img: "👮", badge: "elite", exp: 12, bio: "Professional residential and commercial security guards.", skills: ["Guard Service","Night Patrol","Event Security"] },
    { id: 104, name: "Smart Home Nepal", ne: "स्मार्ट होम नेपाल", service: "security", rating: 4.9, reviews: 52, jobs: 180, price: 2200, area: "lalitpur", avail: true, img: "🏠", badge: "pro", exp: 6, bio: "Smart locks, doorbells and home automation systems.", skills: ["Smart Lock","Alexa Setup","Home Automation"] },

{ id: 5, name: "Bikash Rai", ne: "विकाश राई", service: "electrical", rating: 4.7, reviews: 38, jobs: 189, price: 1200, area: "bhaktapur", avail: false, img: "⚡", badge: "pro", exp: 10, bio: "Licensed electrician. Solar, inverter and wiring specialist.", skills: ["Wiring", "Solar Panel", "Inverter"], days: [1, 2, 3, 4, 5, 6], hrs: { s: "9:00", e: "19:00" } },
    { id: 6, name: "Suresh KC", ne: "सुरेश के.सी.", service: "carpentry", rating: 4.8, reviews: 19, jobs: 87, price: 1500, area: "patan", avail: true, img: "🪚", badge: "pro", exp: 12, bio: "Custom furniture and woodwork. 12 years of experience.", skills: ["Furniture Repair", "Door/Window", "Carpentry"], days: [1, 2, 3, 4, 5], hrs: { s: "7:00", e: "16:00" } },
    { id: 7, name: "Kamala Gurung", ne: "कमला गुरुङ", service: "painting", rating: 4.6, reviews: 24, jobs: 123, price: 2500, area: "lalitpur", avail: true, img: "🎨", badge: "basic", exp: 6, bio: "Interior and exterior painting specialist.", skills: ["Interior Paint", "Exterior Paint", "Texture"], days: [1, 2, 3, 4, 5, 6], hrs: { s: "8:00", e: "17:00" } },
    { id: 8, name: "Sunita Basnet", ne: "सुनिता बस्नेत", service: "cleaning", rating: 4.5, reviews: 31, jobs: 98, price: 700, area: "chabahil", avail: true, img: "🧴", badge: "basic", exp: 3, bio: "Home cleaning and pest control services.", skills: ["Deep Cleaning", "Pest Control", "Disinfection"], days: [1, 2, 3, 4, 5], hrs: { s: "8:00", e: "16:00" } },
    { id: 9, name: "Gopal Thapa", ne: "गोपाल थापा", service: "plumbing", rating: 4.4, reviews: 15, jobs: 67, price: 600, area: "kirtipur", avail: true, img: "🔩", badge: "basic", exp: 4, bio: "Plumbing and drain unblocking at affordable rates.", skills: ["Plumbing", "Drain Unblocking", "Pipe Work"], days: [1, 2, 3, 4, 5, 6], hrs: { s: "8:00", e: "17:00" } },
    { id: 10, name: "Hari Prasad Oli", ne: "हरि प्रसाद ओली", service: "tiling", rating: 4.8, reviews: 41, jobs: 167, price: 1800, area: "baneshwor", avail: true, img: "🪨", badge: "elite", exp: 11, bio: "Floor and wall tiling, marble work specialist.", skills: ["Floor Tiling", "Wall Tiling", "Marble Work"], days: [1, 2, 3, 4, 5], hrs: { s: "8:00", e: "17:00" } },
];
const RENTALS = [
    { id: "R01", type: "room", title: "Cozy Single Room", area: "thamel", addr: "Thamel Marg, Ward 16", bd: 1, ba: 1, sqft: 180, dR: 700, wR: 4000, mR: 12000, rat: 4.7, rv: 34, avail: true, img: "🛏️", amen: ["WiFi", "Furnished", "Hot Water", "Water 24/7"], desc: "Bright furnished room near Thamel restaurants.", host: "Bikash Shrestha", vrf: true, rules: ["No smoking", "No pets", "Quiet after 9PM"] },
    { id: "R02", type: "apartment", title: "Modern 2BHK Apartment", area: "baneshwor", addr: "Baneshwor Height, Ward 34", bd: 2, ba: 2, sqft: 850, dR: 3500, wR: 20000, mR: 55000, rat: 4.8, rv: 28, avail: true, img: "🏢", amen: ["WiFi", "Parking", "Furnished", "AC", "Generator", "CCTV", "Lift"], desc: "Spacious 2BHK with city views.", host: "Sunita Maharjan", vrf: true, rules: ["No smoking", "Max 4 guests"] },
    { id: "R03", type: "villa", title: "Luxury Nagarkot Villa", area: "bhaktapur", addr: "Nagarkot View Road, Bhaktapur", bd: 4, ba: 3, sqft: 2800, dR: 15000, wR: 90000, mR: 250000, rat: 4.9, rv: 67, avail: true, img: "🏡", amen: ["WiFi", "Parking", "AC", "Garden", "CCTV", "Swimming Pool"], desc: "Breathtaking Himalayan-view villa.", host: "Rajendra Tamang", vrf: true, rules: ["No loud parties"] },
    { id: "R04", type: "house", title: "3BHK Family Home — Jawalakhel", area: "lalitpur", addr: "Jawalakhel, Lalitpur", bd: 3, ba: 2, sqft: 1800, dR: 6000, wR: 35000, mR: 90000, rat: 4.7, rv: 19, avail: true, img: "🏠", amen: ["WiFi", "Parking", "Water 24/7", "Kitchen", "Garden"], desc: "Traditional Newari-style home modernised.", host: "Kamala Pradhan", vrf: true, rules: ["Family preferred"] },
    { id: "R05", type: "pg", title: "Premium PG for Professionals", area: "chabahil", addr: "Chabahil Chowk, Ward 7", bd: 1, ba: 1, sqft: 120, dR: 500, wR: 2800, mR: 9000, rat: 4.5, rv: 52, avail: true, img: "🛋️", amen: ["WiFi", "Furnished", "Hot Water", "Generator", "CCTV"], desc: "Safe affordable PG near bus stop.", host: "Hari Koirala", vrf: true, rules: ["Single occupancy", "Gate 10PM"] },
    { id: "R06", type: "cottage", title: "Hillside Cottage — Kirtipur", area: "kirtipur", addr: "Kirtipur Hills, KTM Valley", bd: 2, ba: 1, sqft: 600, dR: 4500, wR: 26000, mR: 65000, rat: 4.9, rv: 43, avail: true, img: "🌲", amen: ["WiFi", "Parking", "Hot Water", "Kitchen", "Garden"], desc: "Charming hillside cottage with valley views.", host: "Mina Sthapit", vrf: true, rules: ["No loud music after 9PM"] },
    { id: "R07", type: "apartment", title: "Studio Apartment — New Road", area: "newroad", addr: "Indra Chowk, New Road", bd: 1, ba: 1, sqft: 400, dR: 2000, wR: 11000, mR: 28000, rat: 4.6, rv: 15, avail: false, img: "🏢", amen: ["WiFi", "Furnished", "AC", "Hot Water", "CCTV", "Lift"], desc: "Modern studio in Kathmandu centre.", host: "Deepak Shrestha", vrf: true, rules: ["No smoking", "2 guests max"] },
    { id: "R08", type: "house", title: "5BHK House — Koteshwor", area: "koteshwor", addr: "Koteshwor Marg, Ring Road", bd: 5, ba: 3, sqft: 3200, dR: 10000, wR: 55000, mR: 130000, rat: 4.6, rv: 11, avail: true, img: "🏠", amen: ["WiFi", "Parking", "Kitchen", "Garden", "CCTV", "Generator"], desc: "Large 5BR house, private compound.", host: "Gopal Bhandari", vrf: true, rules: ["No commercial use"] },
    { id: "R09", type: "villa", title: "Poolside Villa — Budhanilkantha", area: "balaju", addr: "Budhanilkantha Road, North KTM", bd: 6, ba: 4, sqft: 4500, dR: 30000, wR: 180000, mR: 450000, rat: 5.0, rv: 29, avail: true, img: "🏡", amen: ["WiFi", "Parking", "AC", "Swimming Pool", "Gym", "Chef"], desc: "Premium 6BR poolside villa. Private pool and gym.", host: "Prem Thapa", vrf: true, rules: ["Events need approval"] },
    { id: "R10", type: "office", title: "Shared Office — Thamel", area: "thamel", addr: "Thamel North, Business Zone", bd: 0, ba: 2, sqft: 500, dR: 1500, wR: 8000, mR: 22000, rat: 4.7, rv: 18, avail: true, img: "🏗️", amen: ["WiFi", "AC", "CCTV", "Lift", "Parking", "Generator"], desc: "Professional co-working space. High-speed fiber.", host: "Nirmal Joshi", vrf: true, rules: ["Business use only"] },
];
const RTYPES = [
    { id: "all", label: "All", icon: "🏘️" }, { id: "room", label: "Room", icon: "🛏️" },
    { id: "apartment", label: "Apt", icon: "🏢" }, { id: "house", label: "House", icon: "🏠" },
    { id: "villa", label: "Villa", icon: "🏡" }, { id: "pg", label: "PG", icon: "🛋️" },
    { id: "cottage", label: "Cottage", icon: "🌲" }, { id: "office", label: "Office", icon: "🏗️" },
];
const RDURS = [
    { id: "daily", label: "Per Day", icon: "📅" },
    { id: "weekly", label: "Per Week", icon: "📆" },
    { id: "monthly", label: "Per Month", icon: "🗓️" },
];
const LEVELS = [
    { name: "Bronze", min: 0, color: "#CD7F32", icon: "🥉" },
    { name: "Silver", min: 500, color: "#9E9E9E", icon: "🥈" },
    { name: "Gold", min: 1500, color: "#F4A636", icon: "🥇" },
    { name: "Platinum", min: 3000, color: "#1565C0", icon: "💎" },
];
const S_LBL = { upcoming: "Upcoming", confirmed: "Confirmed", in_progress: "In Progress", completed: "Completed", cancelled: "Cancelled" };
const S_ICN = { upcoming: "📋", confirmed: "✅", in_progress: "🔧", completed: "🎉", cancelled: "❌" };
const S_COL = { upcoming: ["#E3F2FD", "#1565C0"], confirmed: ["#E8F5E9", "#2D6A4F"], in_progress: ["#FFF3E0", "#E65100"], completed: ["#E8F5E9", "#2D6A4F"], cancelled: ["#FFEBEE", "#C62828"] };
const CANCEL_R = [{ id: "schedule", l: "Schedule changed" }, { id: "found", l: "Found another provider" }, { id: "expensive", l: "Too expensive" }, { id: "emergency", l: "Personal emergency" }, { id: "mistake", l: "Booked by mistake" }, { id: "other", l: "Other" }];
const SUPP_C = [{ id: "booking", l: "Booking Issue", i: "📅" }, { id: "payment", l: "Payment Problem", i: "💳" }, { id: "provider", l: "Provider Complaint", i: "👷" }, { id: "refund", l: "Refund Request", i: "💰" }, { id: "rental", l: "Rental Issue", i: "🏠" }, { id: "other", l: "Other", i: "💬" }];
const getLv = p => [...LEVELS].reverse().find(l => p >= l.min) || LEVELS[0];
const getNextLv = p => LEVELS.find(l => l.min > p);
const genCode = ph => "GS" + (ph || "0000").slice(-4).toUpperCase() + Math.floor(Math.random() * 90 + 10);
const fmt = n => "NPR " + (n || 0).toLocaleString();
const svcLbl = id => { var _a; return ((_a = SERVICES.find(s => s.id === id)) === null || _a === void 0 ? void 0 : _a.label) || id; };
const aName = id => { var _a; return ((_a = AREAS.find(a => a.id === id)) === null || _a === void 0 ? void 0 : _a.name) || id; };
const getRef = date => { const h = (new Date(date) - new Date()) / 3600000; if (h >= 24)
    return { pct: 100, label: "Full Refund" }; if (h >= 6)
    return { pct: 50, label: "50% Refund" }; return { pct: 0, label: "No Refund" }; };
function BookingTracker({ status, reviewed }) {
    const steps = ["upcoming", "confirmed", "in_progress", "completed", "review"];
    const labels = ["Pending", "Confirmed", "In Progress", "Completed", "Review"];
    const idx = reviewed ? 4 : Math.max(0, steps.indexOf(status));
    return React.createElement("div", { style: { display: "flex", gap: 4, margin: "10px 0 8px" } }, steps.map((st, i) => React.createElement("div", { key: st, style: { flex: 1, textAlign: "center" } },
        React.createElement("div", { style: { height: 7, borderRadius: 8, background: i <= idx ? C.green : "#E5E7EB", marginBottom: 4 } }),
        React.createElement("div", { style: { fontSize: 8, color: i <= idx ? C.green : C.muted, fontWeight: 800 } }, labels[i]))));
}
const rRateV = (r, dt) => dt === "daily" ? r.dR : dt === "weekly" ? r.wR : r.mR;
const rRateL = (r, dt) => dt === "daily" ? fmt(r.dR) + "/night" : dt === "weekly" ? fmt(r.wR) + "/week" : fmt(r.mR) + "/month";
const C = {
    red: "#B71C1C", redL: "#E53935", orange: "#E8660A",
    green: "#2D6A4F", gbg: "#E8F5E9", gbr: "#C8E6C9",
    cream: "#FDF8F3", border: "#EDE0D4", text: "#2C1810",
    muted: "#888", surface: "#FAF4EE", blue: "#1565C0",
    purple: "#7B1FA2", pbg: "#F3E5F5", gold: "#F4A636", white: "#FFFFFF",
    wg: "#1B4332", wl: "#2D6A4F", ad: "#0D47A1", al: "#E3F2FD", abr: "#BBDEFB",
};
// ── ADMIN SHELL ───────────────────────────────────────────────────
function AdminShell({ onLogout }) {
    const [sc, setSc] = useState("dashboard");
    const [pending, setPending] = useState([
        { id: "P01", name: "Bikash KC", svc: "plumbing", area: "thamel", ph: "9841111111", date: "2025-01-15" },
        { id: "P02", name: "Suman Rai", svc: "electrical", area: "baneshwor", ph: "9852222222", date: "2025-01-16" },
        { id: "P03", name: "Gita Tamang", svc: "cleaning", area: "lalitpur", ph: "9863333333", date: "2025-01-17" },
        { id: "P04", name: "Rohan Shrestha", svc: "painting", area: "patan", ph: "9874444444", date: "2025-01-18" },
        { id: "P05", name: "Maya Gurung", svc: "ac", area: "koteshwor", ph: "9885555555", date: "2025-01-19" },
    ]);
    const [disputes, setDisputes] = useState([
        { id: "D01", bkId: "GS-1198", cust: "Anita Rai", custPh: "9847001111", prov: "Ram B. Tamang", provPh: "9863333333", service: "Plumbing Repair", reason: "Work not completed", custIssue: "Customer says the pipe is still leaking after payment.", workerReply: "Worker says a replacement part is needed and was not included in the first price.", requestedAction: "Partial refund or free revisit", priority: "high", evidence: "2 photos uploaded", amt: 1800, status: "open" },
        { id: "D02", bkId: "GS-1175", cust: "Suresh KC", custPh: "9857002222", prov: "Sita Sharma", provPh: "9874444444", service: "Home Deep Cleaning", reason: "Provider arrived late", custIssue: "Customer says worker arrived 2 hours late without notice.", workerReply: "Worker says traffic delay and customer was informed by phone.", requestedAction: "Discount on booking", priority: "medium", evidence: "Call log available", amt: 2500, status: "open" },
        { id: "D03", bkId: "GS-1102", cust: "Bikram Rai", custPh: "9867003333", prov: "Hari P. Oli", provPh: "9817004444", service: "Tile/Flooring", reason: "Quality was poor", custIssue: "Customer reported uneven finishing.", workerReply: "Worker accepted minor finishing issue.", requestedAction: "Refund", priority: "low", evidence: "Before/after photos", amt: 4500, status: "resolved", note: "Partial refund issued" },
    ]);
    const [promos, setPromos] = useState([
        { code: "GHARSEWA200", val: 200, used: 47, limit: 200, exp: "2025-03-31", active: true },
        { code: "WELCOME100", val: 100, used: 189, limit: 500, exp: "2025-06-30", active: true },
        { code: "RENT500", val: 500, used: 23, limit: 100, exp: "2025-04-30", active: true },
    ]);
    const [selBk, setSelBk] = useState(null);
    const [selDsp, setSelDsp] = useState(null);
    const [resNote, setResNote] = useState("");
    const [newPromo, setNewPromo] = useState({ code: "", val: "", limit: "", exp: "" });
    const [promoOk, setPromoOk] = useState(false);
    const [bcMsg, setBcMsg] = useState("");
    const [bcTarget, setBcTarget] = useState("all");
    const [bcSent, setBcSent] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [subSearch, setSubSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([
        { id: "U01", name: "Rajesh Maharjan", ph: "9841111111", role: "customer", bks: 12, joined: "2024-10-15", status: "active" },
        { id: "U02", name: "Sunita Thapa", ph: "9852222222", role: "customer", bks: 5, joined: "2024-11-20", status: "active" },
        { id: "U03", name: "Ram B. Tamang", ph: "9863333333", role: "provider", bks: 234, plan: "premium", subStatus: "active", subExpires: addDaysISO(18), joined: "2024-08-01", status: "active" },
        { id: "U04", name: "Sita Sharma", ph: "9874444444", role: "provider", bks: 456, plan: "standard", subStatus: "active", subExpires: addDaysISO(5), joined: "2024-07-15", status: "active" },
    ]);
    useEffect(() => {
        try {
            const apps = JSON.parse(localStorage.getItem("g8_worker_apps") || "[]");
            const mapped = apps.filter(a => a.status === "pending").map(a => ({ id: a.id, name: a.name, svc: a.service, area: a.area, ph: a.phone, email: a.email, price: a.price, exp: a.exp, plan: a.plan, date: a.date || new Date().toISOString().slice(0,10), app: true }));
            setPending(prev => [...mapped.filter(a => !prev.some(p => p.id === a.id)), ...prev]);
            const approvedUsers = apps.filter(a => a.status === "approved").map(a => ({ id: "U-" + a.id, name: a.name, ph: a.phone, email: a.email, role: "provider", bks: 0, plan: a.plan || "standard", joined: a.date || new Date().toISOString().slice(0,10), status: "active" }));
            const customers = JSON.parse(localStorage.getItem("g8_admin_customers") || "[]").map(c => ({ id: "C-" + c.id, name: c.name, ph: c.phone, role: "customer", bks: c.bks || 0, joined: c.joined || new Date().toISOString().slice(0,10), status: c.status || "active", address: c.address || "Kathmandu, Nepal" }));
            const liveBks = JSON.parse(localStorage.getItem("g8_admin_bookings") || "[]");
            const liveRentals = JSON.parse(localStorage.getItem("g8_admin_rentals") || "[]");
            const liveSubs = JSON.parse(localStorage.getItem("g8_admin_customer_subscriptions") || "[]");
            setUsers(prev => {
                const merged = [...customers, ...approvedUsers, ...prev];
                return merged.filter((u, i, arr) => arr.findIndex(x => x.id === u.id || (x.ph && u.ph && x.ph === u.ph && x.role === u.role)) === i);
            });
            setAdminBks(prev => {
                const merged = [...liveBks, ...liveRentals, ...prev];
                return merged.filter((b, i, arr) => arr.findIndex(x => x.id === b.id) === i);
            });
            if (liveSubs.length) {
                setUsers(prev => liveSubs.reduce((list, sub) => list.map(u => u.ph === sub.phone ? Object.assign({}, u, { plan: sub.plan, subStatus: sub.status || "active", subExpires: sub.expires || addDaysISO(30) }) : u), prev));
            }
        } catch(e) {}
    }, []);
    const approveWorker = (p) => {
        const apps = JSON.parse(localStorage.getItem("g8_worker_apps") || "[]");
        const updated = apps.map(a => a.id === p.id ? Object.assign({}, a, { status: "approved", approvedAt: new Date().toISOString() }) : a);
        localStorage.setItem("g8_worker_apps", JSON.stringify(updated));
        const app = updated.find(a => a.id === p.id) || p;
        setPending(list => list.filter(x => x.id !== p.id));
        setUsers(list => [{ id: "U-" + p.id, name: app.name, ph: app.phone || p.ph, email: app.email || p.email, role: "provider", bks: 0, plan: app.plan || "standard", joined: new Date().toISOString().slice(0,10), status: "active" }, ...list]);
        alert("Worker approved. They can now login with email and password.");
    };
    const rejectWorker = (p) => {
        const apps = JSON.parse(localStorage.getItem("g8_worker_apps") || "[]");
        localStorage.setItem("g8_worker_apps", JSON.stringify(apps.map(a => a.id === p.id ? Object.assign({}, a, { status: "rejected" }) : a)));
        setPending(list => list.filter(x => x.id !== p.id));
    };
    const [adminBks, setAdminBks] = useState([
        { id: "GS-1247", cust: "Rajesh M.", prov: "Ram B. Tamang", svc: "Plumbing Repair", amt: 1200, comm: 120, status: "completed", type: "service" },
        { id: "GS-1246", cust: "Sunita T.", prov: "Sita Sharma", svc: "Home Deep Cleaning", amt: 3500, comm: 350, status: "confirmed", type: "service" },
        { id: "GS-1245", cust: "Bikram R.", prov: "Dinesh Maharjan", svc: "AC Repair", amt: 2000, comm: 200, status: "in_progress", type: "service" },
        { id: "GS-1244", cust: "Kamala S.", prov: "Hari P. Oli", svc: "Tile/Flooring", amt: 4500, comm: 450, status: "upcoming", type: "service" },
        { id: "GS-1243", cust: "Deepak J.", prov: "Rajan Poudel", svc: "Solar Panel", amt: 3000, comm: 300, status: "completed", type: "service" },
        { id: "GS-1242", cust: "Anita R.", prov: "Bikash Rai", svc: "Electrical Wiring", amt: 1800, comm: 0, status: "cancelled", type: "service" },
    ]);
    const [adminReqs, setAdminReqs] = useState(() => readLS("g8_requirements", []));
    useEffect(() => { const t=setInterval(()=>setAdminReqs(readLS("g8_requirements", [])), 1200); return () => clearInterval(t); }, []);
    const revenue = [
        { m: "Aug", gmv: 45000, comm: 4500 }, { m: "Sep", gmv: 67000, comm: 6700 },
        { m: "Oct", gmv: 89000, comm: 8900 }, { m: "Nov", gmv: 134000, comm: 13400 },
        { m: "Dec", gmv: 178000, comm: 17800 }, { m: "Jan", gmv: 234000, comm: 23400 },
    ];
    const chip = (bg, col, txt) => React.createElement("span", { style: { display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 12, fontSize: 10, fontWeight: 700, background: bg, color: col } }, txt);
    const inp = { width: "100%", border: `1px solid ${C.abr}`, borderRadius: 11, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", outline: "none", color: C.text, boxSizing: "border-box" };
    const card = { background: C.white, borderRadius: 16, padding: 14, marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.05)", border: `1px solid ${C.abr}` };
    const btnP = { background: C.ad, border: "none", color: C.white, padding: "10px 0", borderRadius: 11, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 };
    const btnG = { background: C.green, border: "none", color: C.white, padding: "10px 0", borderRadius: 11, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 };
    const btnR = { background: "#FFEBEE", border: "1px solid #FFCDD2", color: C.red, padding: "10px 0", borderRadius: 11, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 };
    const nav = [
        { id: "dashboard", icon: "📊", l: "Overview" },
        { id: "verify", icon: "👤", l: "Verify", badge: pending.length },
        { id: "bookings", icon: "📋", l: "Bookings" },
        { id: "requirements", icon: "📢", l: "Reqs", badge: adminReqs.length },
        { id: "disputes", icon: "⚖️", l: "Disputes", badge: disputes.filter(d => d.status === "open").length },
        { id: "revenue", icon: "💰", l: "Finance" },
        { id: "subs", icon: "💳", l: "Subs" },
        { id: "users", icon: "👥", l: "Users" },
        { id: "tools", icon: "⚙️", l: "Tools" },
    ];
    const renderUserModal = () => {
        if (!selectedUser) return null;
        const email = selectedUser.name.toLowerCase().replaceAll(" ", ".") + "@gharsewa.com";
        const isProvider = selectedUser.role === "provider";
        const history = (isProvider
            ? adminBks.filter(b => b.prov === selectedUser.name).concat([{ id: "GS-1199", cust: "Anita R.", prov: selectedUser.name, svc: selectedUser.name.includes("Ram") ? "Drain Unblocking" : "Bathroom Deep Clean", amt: 1800, status: "completed" }])
            : adminBks.filter(b => b.cust.startsWith(selectedUser.name.split(" ")[0])).concat([{ id: "GS-1188", cust: selectedUser.name, prov: "Ram B. Tamang", svc: "Electrical Wiring", amt: 1500, status: "completed" }])
        ).slice(0, 4);
        const detailRows = [["Phone", selectedUser.ph], ["Email", email], ["Role", selectedUser.role], ["Joined", selectedUser.joined], ["Status", selectedUser.status], ["Address", isProvider ? "Kathmandu service area" : "Kathmandu, Nepal"]];
        const extraRows = isProvider
            ? [["Plan", selectedUser.plan || "basic"], ["Verification", "ID verified ✅"], ["Main Service", selectedUser.name.includes("Ram") ? "Plumbing Repair" : "Home Deep Cleaning"], ["Experience", selectedUser.name.includes("Ram") ? "5 years" : "7 years"], ["Completed Jobs", Math.max(0, selectedUser.bks - 8)], ["Earnings", fmt(selectedUser.bks * 850)], ["Rating", "4.8 ⭐"]]
            : [["Total Spent", fmt(selectedUser.bks * 1200)], ["Requirements Posted", selectedUser.id === "U01" ? 3 : 1], ["Completed Bookings", Math.max(0, selectedUser.bks - 1)], ["Cancelled", selectedUser.id === "U01" ? 1 : 0], ["Loyalty Points", selectedUser.bks * 12], ["Preferred Payment", "eSewa / Khalti"], ["Rating", "4.6 ⭐"]];
        const row = ([a, b]) => React.createElement("div", { key: a, style: { display: "flex", justifyContent: "space-between", gap: 10, borderBottom: "1px solid " + C.al, padding: "8px 0", fontSize: 11 } }, React.createElement("span", { style: { color: C.muted, fontWeight: 700 } }, a), React.createElement("span", { style: { color: C.text, fontWeight: 800, textAlign: "right" } }, b));
        return React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 999, display: "flex", alignItems: "flex-end", justifyContent: "center" }, onClick: () => setSelectedUser(null) },
            React.createElement("div", { style: { width: "100%", maxWidth: 430, maxHeight: "88vh", overflowY: "auto", background: "#F0F4FF", borderRadius: "22px 22px 0 0", padding: 16, boxSizing: "border-box" }, onClick: e => e.stopPropagation() },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
                    React.createElement("div", null, React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: C.text } }, selectedUser.name), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, isProvider ? "Provider full history" : "Customer full history")),
                    React.createElement("button", { style: { border: "none", background: C.white, color: C.red, borderRadius: 12, padding: "8px 12px", fontWeight: 800, cursor: "pointer" }, onClick: () => setSelectedUser(null) }, "✕")),
                React.createElement("div", { style: card },
                    React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 8 } },
                        React.createElement("div", { style: { width: 54, height: 54, borderRadius: 27, background: isProvider ? C.gbg : C.al, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 } }, isProvider ? "👷" : "👤"),
                        React.createElement("div", null, React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: C.text } }, selectedUser.name), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, selectedUser.bks + " bookings"), chip(selectedUser.status === "active" ? C.gbg : "#FFEBEE", selectedUser.status === "active" ? C.green : C.red, selectedUser.status))),
                    detailRows.map(row)),
                React.createElement("div", { style: card }, React.createElement("div", { style: { fontSize: 13, fontWeight: 900, color: C.text, marginBottom: 6 } }, isProvider ? "Provider Details" : "Customer Details"), extraRows.map(row)),
                React.createElement("div", { style: card },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 900, color: C.text, marginBottom: 6 } }, "Booking History"),
                    history.map(b => React.createElement("div", { key: b.id, style: { padding: "9px 0", borderBottom: "1px solid " + C.al } }, React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800, color: C.text } }, React.createElement("span", null, b.id + " · " + b.svc), React.createElement("span", null, fmt(b.amt))), React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 2 } }, "Customer: " + b.cust + " · Provider: " + b.prov + " · " + b.status))),
                    React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { width: "100%", marginTop: 10 }), onClick: () => alert("Full report opened") }, "Generate Full Report")),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } }, React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { fontSize: 11 }), onClick: () => alert("Message option opened") }, "Message User"), React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }), onClick: () => { setUsers(us => us.map(x => x.id === selectedUser.id ? Object.assign(Object.assign({}, x), { status: x.status === "active" ? "banned" : "active" }) : x)); setSelectedUser(Object.assign(Object.assign({}, selectedUser), { status: selectedUser.status === "active" ? "banned" : "active" })); } }, selectedUser.status === "active" ? "Ban User" : "Unban User"))));
    };
    return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", background: "#F0F4FF", minHeight: "100vh", maxWidth: 430, margin: "0 auto" } },
        React.createElement("div", { style: { background: `linear-gradient(135deg,${C.ad},#1976D2)`, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 400 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                React.createElement("span", { style: { fontSize: 22 } }, "\uD83D\uDEE1\uFE0F"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: C.white } }, "GharSewa Admin"),
                    React.createElement("div", { style: { fontSize: 9, color: "rgba(255,255,255,.7)" } }, "Control Panel"))),
            pending.length > 0 && React.createElement("div", { style: { background: "rgba(255,165,0,.9)", borderRadius: 10, padding: "3px 10px", fontSize: 11, fontWeight: 800, color: C.white } }, "⚠️ " + pending.length)),
        React.createElement("div", { style: { paddingBottom: 82 } },
            sc === "dashboard" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 } }, [
                    [23, "Today Bookings", "📅", "#1565C0"],
                    [1247, "Total Bookings", "📋", "#2D6A4F"],
                    [pending.length, "Pending Verify", "⚠️", "#E65100"],
                    [67, "Active Providers", "👷", "#7B1FA2"],
                    [fmt(2340000), "Total GMV", "💸", "#0D47A1"],
                    [fmt(234000), "Commission", "✂️", "#1B5E20"],
                ].map(([v, l, i, col]) => (React.createElement("div", { key: l, style: { background: C.white, borderRadius: 14, padding: "12px 14px", border: "1px solid " + col + "22" } },
                    React.createElement("div", { style: { fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 } }, i + " " + l),
                    React.createElement("div", { style: { fontSize: v.toString().length > 7 ? 12 : 16, fontWeight: 800, color: col } }, v))))),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 } }, "Top Services"),
                [["Plumbing Repair", "🔧", 347], ["Home Deep Cleaning", "🧹", 289], ["AC Repair", "❄️", 234], ["Electrical Wiring", "⚡", 198], ["Tile/Flooring", "🪨", 167]].map(([name, ic, cnt]) => (React.createElement("div", { key: name, style: Object.assign(Object.assign({}, card), { padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }) },
                    React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                        React.createElement("span", { style: { fontSize: 18 } }, ic),
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, name)),
                    React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                        React.createElement("div", { style: { width: 50, height: 5, background: "#EEE", borderRadius: 3, overflow: "hidden" } },
                            React.createElement("div", { style: { width: (cnt / 347 * 100) + "%", height: "100%", background: C.ad, borderRadius: 3 } })),
                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: C.ad } }, cnt))))))),
            sc === "verify" && (React.createElement("div", { style: { padding: "12px 14px 0" } }, pending.length === 0
                ? React.createElement("div", { style: { textAlign: "center", padding: "48px 0", color: C.muted } },
                    React.createElement("div", { style: { fontSize: 48 } }, "\u2705"),
                    React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginTop: 10 } }, "All Clear!"))
                : pending.map(p => (React.createElement("div", { key: p.id, style: card },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } },
                        chip("#FFF3E0", "#E65100", "⏳ Pending"),
                        React.createElement("span", { style: { fontSize: 10, color: C.muted } }, p.date)),
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: C.text } }, p.name),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 8 } }, "📞 " + p.ph + (p.email ? " · ✉️ " + p.email : "")),
                    React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 10 } },
                        chip(C.al, C.ad, "🔧 " + svcLbl(p.svc)),
                        chip(C.al, C.ad, "📍 " + aName(p.area))),
                    React.createElement("div", { style: { background: "#F5F5F5", borderRadius: 10, padding: "8px 12px", fontSize: 11, color: C.muted, marginBottom: 10 } }, "\uD83D\uDCC4 Citizenship Card + Selfie submitted"),
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("button", { style: btnR, onClick: () => rejectWorker(p) }, "\u2715 Reject"),
                        React.createElement("button", { style: btnG, onClick: () => approveWorker(p) }, "\u2705 Approve Login"))))))),
            sc === "bookings" && (React.createElement("div", { style: { padding: "12px 14px 0" } }, adminBks.map(b => {
                const sc2 = S_COL[b.status] || ["#F3F4F6", "#6B7280"];
                const open = (selBk === null || selBk === void 0 ? void 0 : selBk.id) === b.id;
                return (React.createElement("div", { key: b.id, style: card, onClick: () => setSelBk(open ? null : b) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                        React.createElement("span", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, b.id),
                        chip(sc2[0], sc2[1], (S_ICN[b.status] || "📋") + " " + (S_LBL[b.status] || b.status))),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text } }, b.svc),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "👤 " + b.cust + " · 👷 " + b.prov),
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 6 } },
                        React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: C.ad } }, fmt(b.amt)),
                        React.createElement("span", { style: { fontSize: 11, color: C.green } }, fmt(b.comm) + " comm")),
                    open && React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid " + C.al, display: "flex", gap: 8 } },
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { fontSize: 11 }) }, "Force Complete"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }) }, "Flag Issue"))));
            }))),
            sc === "requirements" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 10 } }, "Customer Requirements"),
                adminReqs.length === 0 ? React.createElement("div", { style: Object.assign(Object.assign({}, card), { textAlign: "center", color: C.muted, padding: 30 }) }, "No posted requirements yet.") : adminReqs.map(r => React.createElement("div", { key: r.id || r.createdAt, style: card },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, React.createElement("b", { style: { color: C.text } }, r.id || "REQ"), chip(C.gbg, C.green, r.status || "open")),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 900, color: C.text } }, "🔧 " + (r.service || "service")),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 4 } }, "👤 " + (r.customer || "Customer") + " · 📍 " + (r.location || "Kathmandu") + " · 💰 " + fmt(Number(r.budget || 0))),
                    React.createElement("p", { style: { fontSize: 12, color: C.text, lineHeight: 1.45 } }, r.description || "No description"),
                    (r.offers && r.offers.length > 0) && React.createElement("div", { style: { background: "#F9FAFB", borderRadius: 10, padding: 9, fontSize: 11, color: C.text, marginBottom: 8 } }, "💬 " + r.offers.length + " worker offer(s) received" + (r.assignedWorker ? " · Assigned to " + r.assignedWorker : "")),
                    r.image && React.createElement("img", { src: r.image, style: { width: "100%", maxHeight: 170, objectFit: "cover", borderRadius: 12, border: "1px solid " + C.abr, marginBottom: 8 } }),
                    React.createElement("div", { style: { display: "flex", gap: 8 } }, React.createElement("button", { style: btnP, onClick: () => alert("Customer: " + (r.customer || "Customer")) }, "View Customer"), React.createElement("button", { style: btnR, onClick: () => { const next = adminReqs.map(x => x.id === r.id ? Object.assign({}, x, { status: "closed" }) : x); setAdminReqs(next); writeLS("g8_requirements", next); } }, "Close"))
                )))),
            sc === "disputes" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: Object.assign(Object.assign({}, card), { background: "#FFF8E1", border: "1px solid #FFE0B2" }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: C.text } }, "⚖️ Dispute Center"),
                            React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 3 } }, "Directly review customer vs worker problems and take action.")),
                        chip("#FFEBEE", C.red, disputes.filter(d => d.status === "open").length + " open"))),
                disputes.map(d => (React.createElement("div", { key: d.id, style: Object.assign(Object.assign({}, card), { border: "1px solid " + (d.status === "open" ? "#FFCDD2" : C.gbr) }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } },
                        React.createElement("span", { style: { fontSize: 10, color: C.muted, fontWeight: 800 } }, d.id + " · " + d.bkId),
                        chip(d.status === "open" ? "#FFEBEE" : C.gbg, d.status === "open" ? C.red : C.green, d.status === "open" ? "⚠️ Open" : "✅ Resolved")),
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 900, color: C.text, marginBottom: 8 } }, d.reason),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 } },
                        React.createElement("div", { style: { background: C.al, borderRadius: 12, padding: 10 } },
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 800 } }, "CUSTOMER"),
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 900, color: C.text } }, "👤 " + d.cust),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📞 " + (d.custPh || "9840000000"))),
                        React.createElement("div", { style: { background: C.gbg, borderRadius: 12, padding: 10 } },
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 800 } }, "WORKER"),
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 900, color: C.text } }, "👷 " + d.prov),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📞 " + (d.provPh || "9850000000")))),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted, lineHeight: 1.5 } },
                        React.createElement("b", null, "Service: "), d.service || "Service Booking", " · ", React.createElement("b", null, "Amount: "), fmt(d.amt), " · ", React.createElement("b", null, "Priority: "), d.priority || "medium"),
                    React.createElement("div", { style: { marginTop: 8, background: "#F9FAFB", borderRadius: 12, padding: 10, fontSize: 11, color: C.text } },
                        React.createElement("div", null, React.createElement("b", null, "Customer says: "), d.custIssue || d.reason),
                        React.createElement("div", { style: { marginTop: 5 } }, React.createElement("b", null, "Worker says: "), d.workerReply || "No reply yet"),
                        React.createElement("div", { style: { marginTop: 5 } }, React.createElement("b", null, "Requested action: "), d.requestedAction || "Admin review"),
                        React.createElement("div", { style: { marginTop: 5 } }, React.createElement("b", null, "Evidence: "), d.evidence || "No evidence uploaded")),
                    d.note && React.createElement("div", { style: { fontSize: 11, color: C.green, marginTop: 8, fontWeight: 800 } }, "✅ Admin Decision: " + d.note),
                    d.status === "open" && (selDsp === null || selDsp === void 0 ? void 0 : selDsp.id) !== d.id && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 } },
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { fontSize: 11 }), onClick: () => alert("Calling customer: " + (d.custPh || "9840000000")) }, "Call Customer"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { fontSize: 11 }), onClick: () => alert("Calling worker: " + (d.provPh || "9850000000")) }, "Call Worker"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnG), { fontSize: 11 }), onClick: () => alert("Message thread opened for " + d.cust + " and " + d.prov) }, "Message Both"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }), onClick: () => setSelDsp(d) }, "Resolve Case")),
                    d.status === "open" && (selDsp === null || selDsp === void 0 ? void 0 : selDsp.id) === d.id && React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid " + C.al } },
                        React.createElement("textarea", { style: Object.assign(Object.assign({}, inp), { minHeight: 70, resize: "vertical", marginBottom: 8 }), placeholder: "Write admin decision, refund note, warning, or next action...", value: resNote, onChange: e => setResNote(e.target.value) }),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }), onClick: () => { setSelDsp(null); setResNote(""); } }, "Cancel"),
                            React.createElement("button", { style: Object.assign(Object.assign({}, btnG), { fontSize: 11 }), onClick: () => { setDisputes(ds => ds.map(x => x.id === d.id ? Object.assign(Object.assign({}, x), { status: "resolved", note: resNote || "Resolved by admin after contacting customer and worker" }) : x)); setSelDsp(null); setResNote(""); } }, "Mark Resolved")))))))),
            sc === "revenue" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, [[fmt(2340000), "GMV", "#0D47A1"], [fmt(234000), "Commission", "#1B5E20"], [fmt(89000), "Subscriptions", "#7B1FA2"]].map(([v, l, col]) => (React.createElement("div", { key: l, style: { flex: 1, background: C.white, borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid " + col + "33" } },
                    React.createElement("div", { style: { fontSize: 8, color: C.muted, fontWeight: 700, textTransform: "uppercase" } }, l),
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 800, color: col, marginTop: 3 } }, v))))),
                React.createElement("div", { style: card },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 } }, "Monthly GMV"),
                    revenue.map(r => (React.createElement("div", { key: r.m, style: { marginBottom: 10 } },
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 } },
                            React.createElement("span", { style: { fontWeight: 700, color: C.text, width: 30 } }, r.m),
                            React.createElement("span", { style: { color: C.ad, fontWeight: 700 } }, fmt(r.gmv))),
                        React.createElement("div", { style: { height: 8, background: "#EEE", borderRadius: 4, overflow: "hidden" } },
                            React.createElement("div", { style: { width: (r.gmv / 234000 * 100) + "%", height: "100%", background: C.ad, borderRadius: 4 } })))))),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Disputes"),
                disputes.map(d => (React.createElement("div", { key: d.id, style: Object.assign(Object.assign({}, card), { border: "1px solid " + (d.status === "open" ? "#FFCDD2" : C.gbr) }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                        React.createElement("span", { style: { fontSize: 10, color: C.muted } }, d.bkId),
                        chip(d.status === "open" ? "#FFEBEE" : C.gbg, d.status === "open" ? C.red : C.green, d.status === "open" ? "⚠️ Open" : "✅ Resolved")),
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, d.reason),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "👤 " + d.cust + " vs 👷 " + d.prov + " · " + fmt(d.amt)),
                    d.note && React.createElement("div", { style: { fontSize: 11, color: C.green, marginTop: 4 } }, "✅ " + d.note),
                    d.status === "open" && (selDsp === null || selDsp === void 0 ? void 0 : selDsp.id) === d.id && (React.createElement("div", { style: { marginTop: 8 } },
                        React.createElement("textarea", { style: Object.assign(Object.assign({}, inp), { minHeight: 55, resize: "vertical", marginBottom: 6 }), placeholder: "Resolution note...", value: resNote, onChange: e => setResNote(e.target.value) }),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }), onClick: () => { setSelDsp(null); setResNote(""); } }, "Cancel"),
                            React.createElement("button", { style: Object.assign(Object.assign({}, btnG), { fontSize: 11 }), onClick: () => { setDisputes(ds => ds.map(x => x.id === d.id ? Object.assign(Object.assign({}, x), { status: "resolved", note: resNote }) : x)); setSelDsp(null); setResNote(""); } }, "Resolve")))),
                    d.status === "open" && (selDsp === null || selDsp === void 0 ? void 0 : selDsp.id) !== d.id && React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { width: "100%", marginTop: 8, fontSize: 11 }), onClick: () => setSelDsp(d) }, "Resolve Dispute")))))),
            sc === "subs" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { fontSize: 17, fontWeight: 900, color: C.text, marginBottom: 4 } }, "Admin Subscriptions"),
                React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 12 } }, "See every worker plan, expiry date and subscription revenue."),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 } },
                    React.createElement("div", { style: Object.assign(Object.assign({}, card), { textAlign: "center", background: C.al }) },
                        React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: C.ad } }, users.filter(u => u.role === "provider" && (u.subStatus || "active") === "active").length),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, "Active Subs")),
                    React.createElement("div", { style: Object.assign(Object.assign({}, card), { textAlign: "center", background: C.pbg }) },
                        React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: C.purple } }, fmt(users.filter(u => u.role === "provider").reduce((sum,u)=> sum + planInfo(u.plan).price, 0))),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, "Monthly Sub Revenue"))),
                React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } },
                    React.createElement("input", { style: Object.assign(Object.assign({}, inp), { flex: 1, marginBottom: 0 }), placeholder: "Search subscription by name or phone...", value: subSearch, onChange: e => setSubSearch(e.target.value) }),
                    subSearch && React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { width: 74, fontSize: 10 }), onClick: () => setSubSearch("") }, "Clear")),
                users.filter(u => u.role === "provider" && (!subSearch || (u.name || "").toLowerCase().includes(subSearch.toLowerCase()) || String(u.ph || "").includes(subSearch))).length === 0 && React.createElement("div", { style: Object.assign(Object.assign({}, card), { textAlign: "center", color: C.muted, fontSize: 12 }) }, "No subscription found for this name or phone."),
                users.filter(u => u.role === "provider" && (!subSearch || (u.name || "").toLowerCase().includes(subSearch.toLowerCase()) || String(u.ph || "").includes(subSearch))).map(u => { const pi = planInfo(u.plan); const dl = daysLeft(u.subExpires || addDaysISO(30)); return React.createElement("div", { key: u.id, style: card },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 14, fontWeight: 900, color: C.text } }, u.name),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📞 " + u.ph + " · " + u.bks + " bookings"),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 3 } }, "Expires: " + (u.subExpires || "—") + " · " + dl + " days left")),
                        React.createElement("div", { style: { textAlign: "right" } },
                            chip(C.al, C.ad, pi.name + " · " + fmt(pi.price)),
                            React.createElement("div", { style: { marginTop: 5 } }, chip(dl <= 0 ? "#FFEBEE" : C.gbg, dl <= 0 ? C.red : C.green, dl <= 0 ? "Expired" : "Active")))),
                    React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 10 } }, PLANS.map(pl => React.createElement("button", { key: pl.id, style: { flex: 1, border: "1px solid " + (u.plan === pl.id ? pl.color : C.abr), background: u.plan === pl.id ? pl.color : C.white, color: u.plan === pl.id ? C.white : C.text, borderRadius: 9, padding: "7px 4px", fontSize: 9, fontWeight: 800, cursor: "pointer" }, onClick: () => setUsers(us => us.map(x => x.id === u.id ? Object.assign(Object.assign({}, x), { plan: pl.id, subStatus: "active", subExpires: addDaysISO(30) }) : x)) }, pl.name)))); }))),
            sc === "users" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("input", { style: Object.assign(Object.assign({}, inp), { marginBottom: 12 }), placeholder: "Search by name or phone...", value: userSearch, onChange: e => setUserSearch(e.target.value) }),
                users.filter(u => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.ph.includes(userSearch)).map(u => (React.createElement("div", { key: u.id, style: Object.assign(Object.assign({}, card), { border: "1px solid " + (u.status === "banned" ? "#FFCDD2" : C.abr) }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
                        React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } },
                            React.createElement("div", { style: { width: 38, height: 38, borderRadius: 19, background: u.role === "provider" ? C.gbg : C.al, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, u.role === "provider" ? "👷" : "👤"),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, u.name),
                                React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📞 " + u.ph + " · " + u.role),
                                u.plan && chip(C.al, C.ad, u.plan))),
                        React.createElement("div", { style: { textAlign: "right" } },
                            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.ad } }, u.bks + " bookings"),
                            chip(u.status === "active" ? C.gbg : "#FFEBEE", u.status === "active" ? C.green : C.red, u.status))),
                    React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { fontSize: 11 }), onClick: () => setSelectedUser(u) }, "View History"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, btnR), { fontSize: 11 }), onClick: () => setUsers(us => us.map(x => x.id === u.id ? Object.assign(Object.assign({}, x), { status: x.status === "active" ? "banned" : "active" }) : x)) }, u.status === "active" ? "Ban User" : "Unban"))))),
                renderUserModal())),
            sc === "tools" && (React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Promo Codes"),
                promos.map(p => (React.createElement("div", { key: p.code, style: Object.assign(Object.assign({}, card), { padding: "10px 14px" }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: C.ad } }, p.code),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, fmt(p.val) + " off · " + p.used + "/" + p.limit + " used · " + p.exp)),
                        chip(p.active ? C.gbg : "#F5F5F5", p.active ? C.green : C.muted, p.active ? "Active" : "Expired"))))),
                React.createElement("div", { style: Object.assign(Object.assign({}, card), { background: C.al, marginBottom: 16 }) },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.ad, marginBottom: 10 } }, "Create Promo Code"),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 } },
                        React.createElement("input", { style: inp, placeholder: "Code e.g. SAVE200", value: newPromo.code, onChange: e => setNewPromo(n => (Object.assign(Object.assign({}, n), { code: e.target.value.toUpperCase() }))) }),
                        React.createElement("input", { style: inp, placeholder: "Discount NPR", type: "number", value: newPromo.val, onChange: e => setNewPromo(n => (Object.assign(Object.assign({}, n), { val: e.target.value }))) }),
                        React.createElement("input", { style: inp, placeholder: "Usage Limit", type: "number", value: newPromo.limit, onChange: e => setNewPromo(n => (Object.assign(Object.assign({}, n), { limit: e.target.value }))) }),
                        React.createElement("input", { style: inp, placeholder: "Expiry Date", type: "date", value: newPromo.exp, onChange: e => setNewPromo(n => (Object.assign(Object.assign({}, n), { exp: e.target.value }))) })),
                    React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { width: "100%", padding: 10, borderRadius: 11 }), onClick: () => { if (!newPromo.code || !newPromo.val)
                            return; setPromos(p => [...p, { code: newPromo.code, val: parseInt(newPromo.val), limit: parseInt(newPromo.limit) || 999, used: 0, exp: newPromo.exp, active: true }]); setNewPromo({ code: "", val: "", limit: "", exp: "" }); setPromoOk(true); setTimeout(() => setPromoOk(false), 2000); } }, promoOk ? "✅ Created!" : "Create Promo Code")),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "SMS Broadcast"),
                React.createElement("div", { style: card },
                    React.createElement("div", { style: { display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" } }, [["all", "All Users"], ["providers", "Providers"], ["customers", "Customers"], ["expiring", "Expiring Subs"]].map(([id, l]) => (React.createElement("button", { key: id, style: { flex: 1, minWidth: 70, padding: "6px 4px", borderRadius: 10, border: "1px solid " + (bcTarget === id ? C.ad : C.abr), background: bcTarget === id ? C.ad : C.white, color: bcTarget === id ? C.white : C.muted, fontWeight: 700, fontSize: 9, cursor: "pointer", fontFamily: "inherit" }, onClick: () => setBcTarget(id) }, l)))),
                    React.createElement("textarea", { style: Object.assign(Object.assign({}, inp), { minHeight: 70, resize: "vertical", marginBottom: 8 }), placeholder: "Type SMS message...", value: bcMsg, onChange: e => setBcMsg(e.target.value) }),
                    React.createElement("button", { style: Object.assign(Object.assign({}, btnP), { width: "100%", padding: 10, borderRadius: 11, opacity: bcMsg.trim() ? 1 : 0.4 }), onClick: () => { if (bcMsg.trim()) {
                            setBcSent(true);
                            setTimeout(() => { setBcSent(false); setBcMsg(""); }, 2500);
                        } } }, bcSent ? "✅ Sent to " + bcTarget + "!" : "Send SMS Broadcast")),
                React.createElement("div", { style: { background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: 16, padding: 14, marginTop: 8 } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.red } }, "Sign Out Admin"),
                        React.createElement("button", { style: { background: C.red, border: "none", color: C.white, padding: "8px 16px", borderRadius: 10, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }, onClick: onLogout }, "Logout"))))),
            React.createElement("div", { style: { height: 80 } })),
        React.createElement("div", { style: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.white, borderTop: "1px solid " + C.abr, display: "flex", zIndex: 500 } }, nav.map(item => (React.createElement("button", { key: item.id, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0", cursor: "pointer", border: "none", background: "none", color: sc === item.id ? C.ad : C.muted, position: "relative" }, onClick: () => setSc(item.id) },
            React.createElement("span", { style: { fontSize: 18 } }, item.icon),
            item.badge > 0 && React.createElement("span", { style: { position: "absolute", top: 5, left: "50%", transform: "translateX(4px)", background: C.red, color: C.white, fontSize: 8, fontWeight: 800, borderRadius: 10, padding: "1px 5px" } }, item.badge),
            React.createElement("span", { style: { fontSize: 8, fontWeight: 600 } }, item.l)))))));
}
// ── WORKER SHELL ──────────────────────────────────────────────────
function WorkerShell({ workerData, onLogout, lang, setLang }) {
  const [sc, setSc] = useState("dashboard");
  const demoBookings = [
    { id:"GS-W01", cust:"Rajesh M.", ph:"9841234567", addr:"Thamel", svc:"plumbing", date:new Date(Date.now()+7200000).toLocaleString(), amt:1200, status:"pending", note:"Leaking bathroom pipe" },
    { id:"GS-W02", cust:"Sunita T.", ph:"9851234567", addr:"Baneshwor", svc:"electrical", date:new Date(Date.now()+18000000).toLocaleString(), amt:800, status:"confirmed", note:"Switch repair in kitchen" },
    { id:"GS-W03", cust:"Bikram R.", ph:"9861234567", addr:"Lalitpur", svc:"cleaning", date:new Date(Date.now()-86400000).toLocaleString(), amt:3500, status:"completed", note:"Deep cleaning", review:{rating:5,text:"Excellent work and polite behaviour."} }
  ];
  const loadWorkerBookings = () => {
    const live = readLS("g8_admin_bookings", []).filter(b => sameWorker(b, workerData));
    const mapped = live.map(b => ({ id:b.id, cust:b.cust || "Customer", ph:b.custPh || "", addr:b.addr || "Kathmandu", svc:b.svcId || b.svc || "service", date:b.date || b.createdAt || new Date().toLocaleString(), amt:b.amt || 0, status:b.status === "upcoming" ? "pending" : b.status, note:b.note || "Customer booking" }));
    return mapped.length ? mapped : demoBookings;
  };
  const [bookings, setBookings] = useState(loadWorkerBookings);
  const [requirements, setRequirements] = useState(() => { try { return JSON.parse(localStorage.getItem("g8_requirements") || "[]"); } catch(e){ return []; } });
  const [notifs, setNotifs] = useState([{id:1,icon:"🆕",title:"New booking",body:"Rajesh M. booked Plumbing Repair",read:false,time:"Now"}]);
  const [pendingPay, setPendingPay] = useState(2975);
  const [avail, setAvail] = useState({0:true,1:true,2:true,3:true,4:true,5:true,6:false});
  const [replyTxt, setReplyTxt] = useState({});
  const [selChatBk, setSelChatBk] = useState(null);
  const [sub, setSub] = useState(() => { try { return JSON.parse(localStorage.getItem("g8_worker_sub") || "null") || { plan:(workerData && workerData.plan) || "standard", status:"active", expires:addDaysISO(30), paidBy:"Demo"}; } catch(e){ return {plan:"standard",status:"active",expires:addDaysISO(30),paidBy:"Demo"}; } });
  const [workerSettings, setWorkerSettings] = useState({
    name:(workerData && workerData.name) || "Worker",
    phone:(workerData && workerData.phone) || "9811111111",
    service:(workerData && workerData.service) || "plumbing",
    area:(workerData && workerData.area) || "thamel",
    price:(workerData && workerData.price) || "800",
    exp:(workerData && workerData.exp) || "3",
    bio:(workerData && workerData.bio) || "Verified GharSewa service worker.",
    status:"Online"
  });
  useEffect(() => {
    const t=setInterval(()=>{ try { setRequirements(JSON.parse(localStorage.getItem("g8_requirements") || "[]")); setBookings(loadWorkerBookings()); } catch(e){} },1500);
    return () => clearInterval(t);
  }, []);
  const unread = notifs.filter(n=>!n.read).length;
  const completed = bookings.filter(b=>b.status==="completed");
  const newReqs = bookings.filter(b=>b.status==="pending").length;
  const push = (icon,title,body) => setNotifs(p => [{id:Date.now(), icon, title, body, read:false, time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}, ...p].slice(0,20));
  const updateBooking = (id,status) => { const b=bookings.find(x=>x.id===id); setBookings(bs=>bs.map(x=>x.id===id?Object.assign({},x,{status}):x)); try { const ab=readLS("g8_admin_bookings", []); const adminStatus = status === "pending" ? "upcoming" : status; writeLS("g8_admin_bookings", ab.map(x=>x.id===id?Object.assign({},x,{status:adminStatus, workerActionAt:new Date().toISOString()}):x)); const cb=readLS("g8_bks", []); writeLS("g8_bks", cb.map(x=>x.id===id?Object.assign({},x,{status:adminStatus}):x)); } catch(e){} if(status==="confirmed" && b){ push("💬","Chat unlocked", "You can now message "+b.cust+" for booking "+b.id); } if(status==="completed" && b){ setPendingPay(p=>p+Math.round(b.amt*0.885)); push("✅","Job completed", b.id+" marked completed"); }};
  const sendRequirementOffer = (r, kind) => { const amt=Number(r.budget||workerSettings.price||0); const offer={id:"OFF-"+Date.now(), workerName:workerSettings.name, workerPhone:workerSettings.phone, workerEmail:(workerData&&workerData.email)||"", service:workerSettings.service, price:amt, kind, status:"sent", createdAt:new Date().toISOString()}; const all=readLS("g8_requirements", []); const next=all.map(x=>x.id===r.id?Object.assign({},x,{status:"quoted",offers:[offer,...(x.offers||[])]}):x); writeLS("g8_requirements", next); setRequirements(next); push(kind==="quote"?"💬":"📞", kind==="quote"?"Quote sent":"Interest sent", "Customer can now assign you from requirement "+(r.id||"")); };
  const saveSub = (planId, gateway) => { const n={plan:planId,status:"active",expires:addDaysISO(30),paidBy:gateway,paidAt:new Date().toLocaleString()}; setSub(n); localStorage.setItem("g8_worker_sub", JSON.stringify(n)); push("💳","Plan updated", planInfo(planId).name+" paid by "+gateway); };
  const saveSettings = () => { try { localStorage.setItem("g8_worker", JSON.stringify(Object.assign({}, workerData||{}, workerSettings))); } catch(e){} push("⚙️","Settings saved","Worker profile updated"); };
  const card={background:C.white,border:"1px solid "+C.gbr,borderRadius:16,padding:14,marginBottom:12};
  const btn={border:"none",borderRadius:12,padding:"11px 12px",fontWeight:800,fontFamily:"inherit",cursor:"pointer",background:C.wg,color:C.white};
  const btn2={border:"1px solid "+C.gbr,borderRadius:12,padding:"11px 12px",fontWeight:800,fontFamily:"inherit",cursor:"pointer",background:C.white,color:C.wg};
  const input={width:"100%",border:"1px solid "+C.gbr,borderRadius:13,padding:"12px 14px",fontSize:14,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10};
  const chip=(txt,bg,col)=>React.createElement("span",{style:{display:"inline-flex",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:800,background:bg,color:col}},txt);
  const statusChip = st => st==="completed"?chip("Completed",C.gbg,C.green):st==="in_progress"?chip("In Progress","#FFF3E0","#E65100"):st==="confirmed"?chip("Confirmed",C.gbg,C.green):chip("Pending","#E3F2FD","#1565C0");
  const svcName = id => { const s=SERVICES.find(x=>x.id===id); return s ? (s.icon+" "+s.label) : id; };
  const areaName = id => { const a=AREAS.find(x=>x.id===id); return a ? a.name : id; };
  const header = React.createElement("div",{style:{background:"linear-gradient(135deg,"+C.wg+","+C.wl+")",padding:"18px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}},
    React.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},React.createElement("div",{style:{fontSize:31}},"🏠"),React.createElement("div",null,React.createElement("div",{style:{fontSize:21,fontWeight:900,color:C.white,lineHeight:1.1}},"GharSewa Worker"),React.createElement("div",{style:{fontSize:12,color:"rgba(255,255,255,.8)"}},workerSettings.name))),
    React.createElement("div",{style:{display:"flex",gap:8,alignItems:"center"}},newReqs>0&&React.createElement("div",{style:{background:"#F4A636",color:C.white,borderRadius:22,padding:"7px 11px",fontWeight:900,fontSize:12}},newReqs+" new"),React.createElement(LanguageToggle,{lang,setLang}),React.createElement("button",{style:{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.25)",color:C.white,borderRadius:13,padding:"8px 10px",fontSize:16},onClick:()=>setSc("settings")},"🛠️"))
  );
  const home = React.createElement(React.Fragment,null,
    React.createElement("div",{style:{background:"linear-gradient(150deg,"+C.wg+","+C.wl+",#40916C)",padding:"22px 18px"}},
      React.createElement("div",{style:{fontSize:25,fontWeight:900,color:C.white,marginBottom:14}},"Namaste, "+(workerSettings.name||"Worker").split(" ")[0]+"! 👋"),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}},[[newReqs,"New","🆕"],[bookings.filter(b=>b.status==="in_progress").length,"Active","🔧"],[completed.length,"Done","✅"],[fmt(pendingPay),"Payout","💰"]].map(x=>React.createElement("div",{key:x[1],style:{background:"rgba(255,255,255,.22)",borderRadius:14,padding:"10px 4px",textAlign:"center",color:C.white}},React.createElement("div",{style:{fontWeight:900,fontSize:13}},x[2]+" "+x[0]),React.createElement("div",{style:{fontSize:10,opacity:.85}},x[1]))))
    ),
    React.createElement("div",{style:{padding:"16px 14px 0"}},bookings.map(b=>React.createElement("div",{key:b.id,style:card},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}},React.createElement("b",{style:{fontSize:13,color:C.muted}},b.id),statusChip(b.status)),
      React.createElement("div",{style:{display:"flex",gap:12}},React.createElement("div",{style:{fontSize:30,background:C.gbg,borderRadius:14,width:58,height:58,display:"flex",alignItems:"center",justifyContent:"center"}},(SERVICES.find(s=>s.id===b.svc)||{}).icon||"🔧"),React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontSize:18,fontWeight:900,color:C.text}},svcName(b.svc).replace(/^. /,"")),React.createElement("div",{style:{fontSize:13,color:C.muted}},"👤 "+b.cust+" · 📞 "+maskPhoneNumbers(b.ph)),React.createElement("div",{style:{fontSize:13,color:C.muted}},"📍 "+b.addr+" · 🗓️ "+b.date),React.createElement("div",{style:{background:C.gbg,borderRadius:10,padding:"8px 10px",fontSize:13,marginTop:7}},b.note))),
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid "+C.gbr,marginTop:12,paddingTop:12}},React.createElement("div",{style:{fontSize:20,fontWeight:900,color:C.wg}},fmt(b.amt)),React.createElement("div",{style:{fontSize:12,color:C.muted}},"Net: "+fmt(Math.round(b.amt*.885)))),
      React.createElement("div",{style:{display:"flex",gap:8,marginTop:12}},b.status==="pending"&&React.createElement(React.Fragment,null,React.createElement("button",{style:Object.assign({},btn,{flex:1}),onClick:()=>updateBooking(b.id,"confirmed")},"Accept"),React.createElement("button",{style:Object.assign({},btn2,{flex:1,color:C.red}),onClick:()=>updateBooking(b.id,"cancelled")},"Decline")),b.status==="confirmed"&&React.createElement("button",{style:Object.assign({},btn,{width:"100%"}),onClick:()=>updateBooking(b.id,"in_progress")},"Start Job"),b.status==="in_progress"&&React.createElement("button",{style:Object.assign({},btn,{width:"100%"}),onClick:()=>updateBooking(b.id,"completed")},"Mark Completed"),b.status==="completed"&&React.createElement("button",{style:Object.assign({},btn2,{flex:1}),onClick:()=>setSc("reviews")},"View Review"),(b.status==="confirmed"||b.status==="in_progress"||b.status==="completed")&&React.createElement("button",{style:Object.assign({},btn,{flex:1}),onClick:()=>{setSelChatBk(b);setSc("chat");}},"Chat"))
    )))
  );
  const feed = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("h2",{style:{margin:"0 0 6px",fontSize:22,color:C.text}},"Customer Requirement Feed"),React.createElement("p",{style:{margin:"0 0 14px",color:C.muted,fontSize:13}},"Customer posts will appear here."),React.createElement("button",{style:Object.assign({},btn,{width:"100%",marginBottom:14}),onClick:()=>{try{setRequirements(JSON.parse(localStorage.getItem("g8_requirements")||"[]"))}catch(e){}}},"Refresh Feed"),requirements.length===0?React.createElement("div",{style:Object.assign({},card,{textAlign:"center",padding:"50px 10px",color:C.muted})},React.createElement("div",{style:{fontSize:44}},"📭"),React.createElement("b",null,"No customer requirements yet.")):requirements.map(r=>React.createElement("div",{key:r.id||r.createdAt,style:card},React.createElement("div",{style:{fontSize:17,fontWeight:900,color:C.text}},svcName(r.service)),React.createElement("div",{style:{fontSize:13,color:C.muted}},"📍 "+(r.location||"Kathmandu")+" · Budget: "+fmt(Number(r.budget||0))),React.createElement("p",{style:{fontSize:13,color:C.text}},r.description||"No description"),r.image&&React.createElement("img",{src:r.image,style:{width:"100%",maxHeight:150,objectFit:"cover",borderRadius:12,marginBottom:10,border:"1px solid "+C.gbr}}),React.createElement("div",{style:{display:"flex",gap:8}},React.createElement("button",{style:Object.assign({},btn,{flex:1}),onClick:()=>sendRequirementOffer(r,"interest")},"I am interested"),React.createElement("button",{style:Object.assign({},btn2,{flex:1}),onClick:()=>sendRequirementOffer(r,"quote")},"Send Quote")))));
  const earnings = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("div",{style:{background:"linear-gradient(135deg,"+C.wg+","+C.wl+")",borderRadius:18,padding:18,color:C.white,marginBottom:14}},React.createElement("div",{style:{fontSize:21,fontWeight:900,marginBottom:10}},"Earnings Overview"),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}},[[fmt(pendingPay),"Pending"],[completed.length+" jobs","Completed"],[fmt(Math.round(pendingPay*.885)),"Net"]].map(x=>React.createElement("div",{key:x[1],style:{background:"rgba(255,255,255,.2)",borderRadius:12,padding:10,textAlign:"center"}},React.createElement("b",null,x[0]),React.createElement("div",{style:{fontSize:10,opacity:.8}},x[1]))))),React.createElement("div",{style:card},[["Pending Gross",fmt(pendingPay)],["Commission 10%","-"+fmt(Math.round(pendingPay*.10))],["TDS 1.5%","-"+fmt(Math.round(pendingPay*.015))],["Net Payout",fmt(Math.round(pendingPay*.885))]].map(row=>React.createElement("div",{key:row[0],style:{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid "+C.gbr}},React.createElement("span",{style:{color:C.muted}},row[0]),React.createElement("b",{style:{color:C.wg}},row[1])))),React.createElement("button",{style:Object.assign({},btn,{width:"100%"}),onClick:()=>{push("💸","Payout requested","Admin will process your payout.");}},"Request Payout"));
  const planScreen = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("div",{style:card},React.createElement("h2",{style:{margin:"0 0 4px",fontSize:22,color:C.text}},"Subscription Status"),React.createElement("div",{style:{color:C.muted,fontSize:13,marginBottom:10}},"Current Plan: "+planInfo(sub.plan).name+" · Expires: "+sub.expires+" · Days left: "+daysLeft(sub.expires))),PLANS.map(pl=>React.createElement("div",{key:pl.id,style:Object.assign({},card,{border:"2px solid "+(sub.plan===pl.id?pl.color:C.gbr)})},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}},React.createElement("div",null,React.createElement("div",{style:{fontSize:18,fontWeight:900,color:pl.color}},pl.name),React.createElement("div",{style:{fontSize:21,fontWeight:900,color:C.text}},fmt(pl.price)+"/month"),React.createElement("div",{style:{fontSize:12,color:C.muted}},pl.features.join(" · "))),sub.plan===pl.id&&chip("Active",C.gbg,C.green)),React.createElement("div",{style:{display:"flex",gap:8,marginTop:12}},React.createElement("button",{style:Object.assign({},btn,{flex:1}),onClick:()=>saveSub(pl.id,"eSewa")},sub.plan===pl.id?"Renew Plan":"Pay eSewa"),React.createElement("button",{style:Object.assign({},btn2,{flex:1}),onClick:()=>saveSub(pl.id,"Khalti")},sub.plan===pl.id?"Renew Khalti":"Pay Khalti")))));
  const schedule = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("div",{style:card},React.createElement("h2",{style:{margin:"0 0 12px",fontSize:22,color:C.text}},"Availability Calendar"),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>React.createElement("button",{key:d,style:{border:"1px solid "+C.gbr,borderRadius:13,padding:12,background:avail[i]?C.gbg:C.white,color:avail[i]?C.green:C.muted,fontWeight:900},onClick:()=>setAvail(a=>Object.assign({},a,{[i]:!a[i]}))},d+" · "+(avail[i]?"Available":"Off")))),React.createElement("button",{style:Object.assign({},btn,{width:"100%",marginTop:14}),onClick:()=>push("📅","Schedule saved","Availability updated.")},"Save Schedule")));
  const reviews = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("h2",{style:{margin:"0 0 12px",fontSize:22,color:C.text}},"Reviews"),completed.filter(b=>b.review).length===0?React.createElement("div",{style:Object.assign({},card,{textAlign:"center",padding:45,color:C.muted})},"⭐ No reviews yet"):completed.filter(b=>b.review).map(b=>React.createElement("div",{key:b.id,style:card},React.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},React.createElement("b",null,b.cust),React.createElement("div",null,[1,2,3,4,5].map(n=>React.createElement("span",{key:n,style:{opacity:n<=b.review.rating?1:.25}},"⭐")))),React.createElement("p",{style:{color:C.muted,fontStyle:"italic"}},"\""+b.review.text+"\""),b.review.reply?React.createElement("div",{style:{background:C.gbg,borderRadius:10,padding:10}},React.createElement("b",{style:{color:C.green}},"Your Reply: "),b.review.reply):React.createElement("div",null,React.createElement("textarea",{style:input,placeholder:"Write a public reply...",value:replyTxt[b.id]||"",onChange:e=>setReplyTxt(r=>Object.assign({},r,{[b.id]:e.target.value}))}),React.createElement("button",{style:Object.assign({},btn,{width:"100%"}),onClick:()=>{const text=(replyTxt[b.id]||"").trim(); if(text){setBookings(bs=>bs.map(x=>x.id===b.id?Object.assign({},x,{review:Object.assign({},x.review,{reply:text})}):x));}}},"Post Reply")))));
  const tools = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("div",{style:card},React.createElement("div",{style:{display:"flex",gap:13,alignItems:"center"}},React.createElement("div",{style:{fontSize:34,background:C.gbg,borderRadius:16,width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center"}},"👷"),React.createElement("div",null,React.createElement("div",{style:{fontSize:21,fontWeight:900,color:C.text}},workerSettings.name),React.createElement("div",{style:{fontSize:13,color:C.muted}},workerSettings.phone),React.createElement("div",{style:{display:"flex",gap:6,marginTop:6}},chip(workerSettings.status,C.gbg,C.green),chip(planInfo(sub.plan).name+" Plan",C.surface,C.wg))))),React.createElement("div",{style:card},React.createElement("h2",{style:{margin:"0 0 10px",fontSize:20,color:C.text}},"Profile & Service Settings"),React.createElement("input",{style:input,value:workerSettings.name,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{name:e.target.value}))}),React.createElement("input",{style:input,value:workerSettings.phone,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{phone:e.target.value}))}),React.createElement("select",{style:input,value:workerSettings.service,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{service:e.target.value}))},SERVICES.map(s=>React.createElement("option",{key:s.id,value:s.id},s.icon+" "+s.label))),React.createElement("select",{style:input,value:workerSettings.area,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{area:e.target.value}))},AREAS.map(a=>React.createElement("option",{key:a.id,value:a.id},a.name))),React.createElement("input",{style:input,placeholder:"Base price",value:workerSettings.price,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{price:e.target.value}))}),React.createElement("input",{style:input,placeholder:"Experience",value:workerSettings.exp,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{exp:e.target.value}))}),React.createElement("textarea",{style:Object.assign({},input,{minHeight:80}),placeholder:"Short bio / skills",value:workerSettings.bio,onChange:e=>setWorkerSettings(v=>Object.assign({},v,{bio:e.target.value}))}),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}},["Online","Busy","Away"].map(st=>React.createElement("button",{key:st,style:workerSettings.status===st?btn:btn2,onClick:()=>setWorkerSettings(v=>Object.assign({},v,{status:st}))},st))),React.createElement("button",{style:Object.assign({},btn,{width:"100%",marginTop:12}),onClick:saveSettings},"Save Changes")),React.createElement("div",{style:card},React.createElement("h3",null,"📄 Upload Documents"),["Citizenship Front","Citizenship Back","Face Photo / Selfie","Work Certificate","Portfolio Photos"].map(x=>React.createElement("label",{key:x,style:{display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid "+C.gbr,borderRadius:12,padding:10,marginBottom:8,fontWeight:800}},React.createElement("span",null,x),React.createElement("input",{type:"file",style:{maxWidth:120}})))),React.createElement("div",{style:card},React.createElement("h3",null,"🎧 Customer Support"),React.createElement("select",{style:input},["Booking Problem","Payment / Payout","Verification","Customer Complaint","Other"].map(x=>React.createElement("option",{key:x},x))),React.createElement("textarea",{style:Object.assign({},input,{minHeight:70}),placeholder:"Write your issue..."}),React.createElement("button",{style:Object.assign({},btn,{width:"100%"}),onClick:()=>push("🎧","Support ticket sent","Admin will contact you soon.")},"Send Support Ticket")),React.createElement("div",{style:card},React.createElement("h3",null,"❓ FAQ"),[["How do I get approved?","Upload citizenship and selfie. Admin will approve your profile."],["How do I receive bookings?","Keep profile active and accept requests from Home or Feed."],["How is commission calculated?","GharSewa deducts 10% platform commission."]].map(q=>React.createElement("div",{key:q[0],style:{borderTop:"1px solid "+C.gbr,padding:"10px 0"}},React.createElement("b",null,q[0]),React.createElement("div",{style:{fontSize:12,color:C.muted}},q[1])))),React.createElement("div",{style:card},React.createElement("h3",null,"ℹ️ About and Contact"),React.createElement("p",{style:{color:C.muted,fontSize:13}},"GharSewa connects verified workers with customers across Kathmandu Valley."),React.createElement("div",{style:{fontSize:13,lineHeight:1.8}},"📞 9800000000",React.createElement("br"),"📧 support@gharsewa.demo",React.createElement("br"),"📍 Kathmandu Valley, Nepal")),React.createElement("div",{style:Object.assign({},card,{background:"#FFEBEE",border:"1px solid #FFCDD2"})},React.createElement("h3",{style:{color:C.red}},"Sign Out"),React.createElement("button",{style:Object.assign({},btn,{width:"100%",background:C.red}),onClick:onLogout},"Sign Out")));
  const alerts = React.createElement("div",{style:{padding:"18px 14px 0"}},React.createElement("h2",{style:{margin:"0 0 12px",fontSize:22,color:C.text}},"Alerts"),notifs.map(n=>React.createElement("div",{key:n.id,style:Object.assign({},card,{background:n.read?C.white:C.gbg}),onClick:()=>setNotifs(ns=>ns.map(x=>x.id===n.id?Object.assign({},x,{read:true}):x))},React.createElement("div",{style:{display:"flex",gap:10}},React.createElement("span",{style:{fontSize:25}},n.icon),React.createElement("div",null,React.createElement("b",null,n.title),React.createElement("div",{style:{fontSize:13,color:C.muted}},n.body))))));
  const body = sc==="dashboard"?home:sc==="feed"?feed:sc==="earnings"?earnings:sc==="subscription"?planScreen:sc==="schedule"?schedule:sc==="reviews"?reviews:sc==="settings"?tools:sc==="chat"&&selChatBk?React.createElement(ChatPanel,{bookingId:selChatBk.id,role:"worker",title:"Chat with "+selChatBk.cust,onBack:()=>setSc("dashboard")}):alerts;
  const nav=[{id:"dashboard",icon:"🏠",l:"Home"},{id:"feed",icon:"📢",l:"Feed",badge:requirements.length},{id:"earnings",icon:"💰",l:"Earnings"},{id:"subscription",icon:"💳",l:"Plan"},{id:"schedule",icon:"📅",l:"Schedule"},{id:"reviews",icon:"⭐",l:"Reviews"},{id:"settings",icon:"🛠️",l:"Tools"},{id:"notifs",icon:"🔔",l:"Alerts",badge:unread}];
  return React.createElement("div",{style:{fontFamily:"system-ui,sans-serif",background:"#F0FBF5",minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:86}},header,body,React.createElement("div",{style:{height:88}}),React.createElement("div",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.white,borderTop:"1px solid "+C.gbr,display:"flex",zIndex:50}},nav.map(item=>React.createElement("button",{key:item.id,onClick:()=>setSc(item.id),style:{flex:1,border:"none",background:"none",padding:"8px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:sc===item.id?C.wg:C.muted,fontWeight:800,position:"relative",cursor:"pointer"}},React.createElement("span",{style:{fontSize:20}},item.icon),item.badge>0&&React.createElement("span",{style:{position:"absolute",top:5,left:"50%",background:C.red,color:C.white,borderRadius:10,fontSize:9,padding:"1px 5px"}},item.badge),React.createElement("span",{style:{fontSize:9}},item.l)))));
}
// ── MAIN CUSTOMER APP ─────────────────────────────────────────────
function GharSewa() {
    const [appState, setAppState] = useState("loading");
    const [lang, setLang] = useState(localStorage.getItem("g8_lang") || "en");
    useLanguageAutoTranslate(lang);
    useEffect(() => { localStorage.setItem("g8_lang", lang); }, [lang]);
    const [user, setUser] = useState(null);
    const [workerData, setWorkerData] = useState(null);
    const [obStep, setObStep] = useState(1);
    const [role, setRole] = useState(null);
    const [authMode, setAuthMode] = useState("signup");
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", otp: "", otpSent: false });
    const [wForm, setWForm] = useState({ svcs: [], area: "", price: "", exp: "", bio: "", plan: "standard", docs: false, step: 1 });
    // Nav
    const [screen, setScreen] = useState("home");
    const [homeTab, setHomeTab] = useState("services");
    // Filters
    const [fGroup, setFGroup] = useState("all");
    const [fArea, setFArea] = useState("all");
    const [fMax, setFMax] = useState(20000);
    const [fRat, setFRat] = useState(0);
    const [query, setQuery] = useState("");
    const [browseQ, setBrowseQ] = useState("");
    // Booking
    const [selP, setSelP] = useState(null);
    const [bkStep, setBkStep] = useState(1);
    const [bkDate, setBkDate] = useState("");
    const [bkAddr, setBkAddr] = useState("Home - Lalitpur");
    const [bkPay, setBkPay] = useState("esewa");
    const [bkNote, setBkNote] = useState("");
    const [usePoints, setUsePoints] = useState(false);
    const [promoIn, setPromoIn] = useState("");
    const [promoDisc, setPromoDisc] = useState(0);
    const [promoMsg, setPromoMsg] = useState("");
    // Data
    const [bookings, setBookings] = useState([]);
    const [saved, setSaved] = useState([]);
    const [dashTab, setDashTab] = useState("bookings");
    const [selBk, setSelBk] = useState(null);
    const [cancelStep, setCancelStep] = useState(1);
    const [cancelR, setCancelR] = useState(null);
    const [revBk, setRevBk] = useState(null);
    const [revRat, setRevRat] = useState(5);
    const [revTxt, setRevTxt] = useState("");
    const [points, setPoints] = useState(0);
    const [pHist, setPHist] = useState([]);
    const [notifs, setNotifs] = useState([]);
    const [myCode, setMyCode] = useState("");
    const [refs, setRefs] = useState([]);
    const [refCr, setRefCr] = useState(0);
    const [codeIn, setCodeIn] = useState("");
    const [codeMsg, setCodeMsg] = useState("");
    const [tickets, setTickets] = useState([]);
    const [suppTab, setSuppTab] = useState("new");
    const [tickCat, setTickCat] = useState(null);
    const [tickDesc, setTickDesc] = useState("");
    const [tickSent, setTickSent] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);
    const [disputes, setDisputes] = useState([]);
    const [dspBk, setDspBk] = useState(null);
    const [dspR, setDspR] = useState("");
    const [dspOk, setDspOk] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", msg: "" });
    const [contactSent, setContactSent] = useState(false);
    // Rental
    const [rtFilter, setRtFilter] = useState("all");
    const [raFilter, setRaFilter] = useState("all");
    const [rdur, setRdur] = useState("daily");
    const [rMax, setRMax] = useState(50000);
    const [rQuery, setRQuery] = useState("");
    const [selR, setSelR] = useState(null);
    const [rbStep, setRbStep] = useState(1);
    const [rbQty, setRbQty] = useState(1);
    const [rbIn, setRbIn] = useState("");
    const [rbOut, setRbOut] = useState("");
    const [rbDur, setRbDur] = useState("daily");
    const [rbPay, setRbPay] = useState("esewa");
    const [rbNote, setRbNote] = useState("");
    const [rPromo, setRPromo] = useState("");
    const [rPromoDisc, setRPromoDisc] = useState(0);
    const [rPromoMsg, setRPromoMsg] = useState("");
    const [savedR, setSavedR] = useState([]);
    const [rentalBks, setRentalBks] = useState([]);
    // Extra screens
    const [calMonth, setCalMonth] = useState(new Date());
    const [selDates, setSelDates] = useState({});
    const [pickedArea, setPickedArea] = useState(null);
    const [customAddr, setCustomAddr] = useState("");
    const [uploadedDocs, setUploadedDocs] = useState({ citizenship: false, selfie: false, portfolio: [] });
    const [requirements, setRequirements] = useState([]);
    const [reqForm, setReqForm] = useState({ service: "plumbing", location: "", budget: "", description: "", image: "" });
    const [selChatBk, setSelChatBk] = useState(null);
    const [reqPosted, setReqPosted] = useState(false);
    const [settingsEdit, setSettingsEdit] = useState({ name: "", phone: "", address: "" });
    const [settingsMode, setSettingsMode] = useState(false);
    const [notifFilter, setNotifFilter] = useState("all");
    const [selPlan, setSelPlan] = useState(null);
    const lv = getLv(points);
    const nextLv = getNextLv(points);
    const prog = nextLv ? Math.min(100, ((points - lv.min) / (nextLv.min - lv.min)) * 100) : 100;
    const unread = notifs.filter(n => !n.read).length;
    const ps = async (k, v) => { try {
        await window.storage.set(k, JSON.stringify(v));
    }
    catch (_a) { } };
    const loadData = async () => {
        const load = async (k, s) => { try {
            const r = await window.storage.get(k);
            if (r)
                s(JSON.parse(r.value));
        }
        catch (_a) { } };
        await Promise.all([
            load("g8_bks", setBookings), load("g8_saved", setSaved),
            load("g8_pts", setPoints), load("g8_ph", setPHist),
            load("g8_notifs", setNotifs), load("g8_refs", setRefs),
            load("g8_refcr", setRefCr), load("g8_tix", setTickets),
            load("g8_dsp", setDisputes), load("g8_savedR", setSavedR),
            load("g8_rbks", setRentalBks), load("g8_requirements", setRequirements),
        ]);
        try {
            const r = await window.storage.get("g8_mycode");
            if (r)
                setMyCode(r.value);
        }
        catch (_a) { }
        try {
            const r = await window.storage.get("g8_user");
            if (r) {
                const u = JSON.parse(r.value);
                setSettingsEdit({ name: u.name || "", phone: u.phone || "", address: u.address || "Home - Lalitpur" });
            }
        }
        catch (_b) { }
    };
    useEffect(() => {
        (async () => {
            try {
                const ar = await window.storage.get("g8_admin");
                if ((ar === null || ar === void 0 ? void 0 : ar.value) === "true") {
                    setAppState("admin");
                    return;
                }
                const sr = await window.storage.get("g8_state");
                const ur = await window.storage.get("g8_user");
                const wr = await window.storage.get("g8_worker");
                if (sr && ur) {
                    const u = JSON.parse(ur.value);
                    if (sr.value === "customer") {
                        setUser(u);
                        setAppState("customer");
                        await loadData();
                    }
                    else if (sr.value === "worker" && wr) {
                        setWorkerData(JSON.parse(wr.value));
                        setAppState("worker");
                    }
                    else
                        setAppState("onboarding");
                }
                else
                    setAppState("onboarding");
            }
            catch (_a) {
                setAppState("onboarding");
            }
        })();
    }, []);
    const push = (icon, title, body) => {
        const n = { id: Date.now(), icon, title, body, read: false, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
        setNotifs(p => { const next = [n, ...p].slice(0, 30); ps("g8_notifs", next); return next; });
    };
    const doCustomer = () => {
        const code = genCode(form.phone);
        const u = { phone: form.phone, name: form.name || "Customer", id: Date.now(), role: "customer", address: "Home - Lalitpur", joined: new Date().toISOString().slice(0,10), status: "active" };
        try {
            const customers = JSON.parse(localStorage.getItem("g8_admin_customers") || "[]");
            const existing = customers.find(c => c.phone === u.phone);
            const saved = existing ? customers.map(c => c.phone === u.phone ? Object.assign({}, c, { name: u.name, lastLogin: new Date().toISOString() }) : c) : [Object.assign({}, u, { bks: 0, createdAt: new Date().toISOString() }), ...customers];
            localStorage.setItem("g8_admin_customers", JSON.stringify(saved));
        } catch(e) {}
        setUser(u);
        ps("g8_user", u);
        setMyCode(code);
        ps("g8_mycode", code);
        setSettingsEdit({ name: u.name, phone: u.phone, address: u.address });
        ps("g8_state", "customer");
        setAppState("customer");
        setScreen("home");
        push("🏠", "Welcome to GharSewa!", "Browse 41 services and 10 rentals.");
    };
    const doWorker = () => {
        const w = { phone: form.phone, email: form.email, password: form.password, name: form.name || "Worker", id: "APP" + Date.now(), service: wForm.svcs[0], services: wForm.svcs, area: wForm.area, price: wForm.price, exp: wForm.exp, bio: wForm.bio, plan: wForm.plan, status: "pending", date: new Date().toISOString().slice(0,10) };
        const apps = JSON.parse(localStorage.getItem("g8_worker_apps") || "[]");
        localStorage.setItem("g8_worker_apps", JSON.stringify([w, ...apps.filter(a => a.email !== w.email)]));
        alert("Application submitted. Admin must approve this worker before login is allowed.");
    };
    const doWorkerLogin = () => {
        const apps = JSON.parse(localStorage.getItem("g8_worker_apps") || "[]");
        const w = apps.find(a => (a.email || "").toLowerCase() === (form.email || "").toLowerCase() && a.password === form.password);
        if (!w) { alert("Invalid email or password."); return; }
        if (w.status !== "approved") { alert("Your worker account is not approved yet. Please wait for admin approval."); return; }
        setWorkerData(w);
        ps("g8_worker", w);
        ps("g8_state", "worker");
        setAppState("worker");
    };
    const doAdmin = () => { ps("g8_admin", "true"); setAppState("admin"); };
    const doLogout = async () => {
        try {
            await window.storage.set("g8_state", "onboarding");
            await window.storage.set("g8_admin", "false");
        }
        catch (_a) { }
        setUser(null);
        setWorkerData(null);
        setObStep(1);
        setRole(null);
        setForm({ name: "", phone: "", email: "", password: "", otp: "", otpSent: false });
        setBookings([]);
        setSaved([]);
        setPoints(0);
        setNotifs([]);
        setRefs([]);
        setRefCr(0);
        setTickets([]);
        setDisputes([]);
        setRentalBks([]);
        setSavedR([]);
        setAppState("onboarding");
    };
    const toggleSave = p => { const n = saved.find(s => s.id === p.id) ? saved.filter(s => s.id !== p.id) : [...saved, p]; setSaved(n); ps("g8_saved", n); };
    const toggleSaveR = r => { const n = savedR.find(s => s.id === r.id) ? savedR.filter(s => s.id !== r.id) : [...savedR, r]; setSavedR(n); ps("g8_savedR", n); };
    const awardPts = (amt, reason) => {
        const earned = Math.floor(amt * PPR);
        setPoints(prev => {
            const np = prev + earned;
            const e = { id: Date.now(), earned, reason, date: new Date().toLocaleDateString(), balance: np };
            setPHist(h => { const n = [e, ...h].slice(0, 20); ps("g8_ph", n); return n; });
            ps("g8_pts", np);
            return np;
        });
    };
    const applyPromo = () => { const c = promoIn.trim().toUpperCase(); if (PROMO[c]) {
        setPromoDisc(PROMO[c]);
        setPromoMsg("✅ " + fmt(PROMO[c]) + " off!");
    }
    else {
        setPromoDisc(0);
        setPromoMsg("❌ Invalid code");
    } };
    const applyRPromo = () => { const c = rPromo.trim().toUpperCase(); if (PROMO[c]) {
        setRPromoDisc(PROMO[c]);
        setRPromoMsg("✅ " + fmt(PROMO[c]) + " off!");
    }
    else {
        setRPromoDisc(0);
        setRPromoMsg("❌ Invalid code");
    } };
    const confirmBk = () => {
        const price = selP.price;
        const ptD = usePoints ? Math.floor(Math.min(points * P2N, price * 0.2)) : 0;
        const refD = refCr >= REF_YOU ? REF_YOU : 0;
        const final = Math.max(0, price - ptD - refD - promoDisc);
        if (usePoints && ptD > 0)
            setPoints(prev => { const np = prev - Math.ceil(ptD / P2N); ps("g8_pts", np); return np; });
        if (refD > 0) {
            const cr2 = refCr - refD;
            setRefCr(cr2);
            ps("g8_refcr", cr2);
        }
        const b = { id: "GS-" + Date.now(), provider: selP, date: bkDate, addr: bkAddr, payment: bkPay, note: bkNote, amount: final, orig: price, ptD, refD, promoDisc, status: "upcoming", createdAt: new Date().toISOString() };
        const nxt = [b, ...bookings];
        setBookings(nxt);
        ps("g8_bks", nxt);
        try {
            const adminBookings = JSON.parse(localStorage.getItem("g8_admin_bookings") || "[]");
            const adminBooking = { id: b.id, cust: (user && user.name) || form.name || "Customer", custPh: (user && user.phone) || form.phone, prov: selP.name, provEmail: selP.email || selP.workerEmail || "", workerEmail: selP.email || selP.workerEmail || "", svc: selP.label || selP.service || selP.name, svcId: selP.service || selP.id || "", addr: bkAddr, date: bkDate, note: bkNote, amt: final, comm: Math.round(final * 0.10), status: b.status, type: "service", payment: bkPay, createdAt: b.createdAt };
            localStorage.setItem("g8_admin_bookings", JSON.stringify([adminBooking, ...adminBookings.filter(x => x.id !== b.id)]));
            const customers = JSON.parse(localStorage.getItem("g8_admin_customers") || "[]");
            localStorage.setItem("g8_admin_customers", JSON.stringify(customers.map(c => c.phone === adminBooking.custPh ? Object.assign({}, c, { bks: (c.bks || 0) + 1, lastBooking: b.id }) : c)));
        } catch(e) {}
        awardPts(final, "Booking #" + b.id.slice(-6));
        push("✅", "Booking Confirmed!", selP.name + " booked for " + new Date(bkDate).toLocaleDateString());
        setTimeout(() => setBookings(p => { const u = p.map(x => x.id === b.id ? Object.assign(Object.assign({}, x), { status: "confirmed" }) : x); ps("g8_bks", u); try { const ab = JSON.parse(localStorage.getItem("g8_admin_bookings") || "[]"); localStorage.setItem("g8_admin_bookings", JSON.stringify(ab.map(x => x.id === b.id ? Object.assign({}, x, { status: "confirmed" }) : x))); } catch(e) {} return u; }), 2000);
        setScreen("bkStatus");
        setBkStep(1);
        setBkDate("");
        setBkNote("");
        setUsePoints(false);
        setPromoDisc(0);
        setPromoIn("");
        setPromoMsg("");
    };
    const confirmRental = () => {
        const base = rRateV(selR, rbDur) * rbQty;
        const final = Math.max(0, base - rPromoDisc);
        const rb = { id: "RNT-" + Date.now(), rental: selR, checkIn: rbIn, checkOut: rbOut, durType: rbDur, qty: rbQty, payment: rbPay, note: rbNote, amount: final, status: "confirmed", createdAt: new Date().toISOString() };
        const nxt = [rb, ...rentalBks];
        setRentalBks(nxt);
        ps("g8_rbks", nxt);
        try {
            const adminRentals = JSON.parse(localStorage.getItem("g8_admin_rentals") || "[]");
            const adminRental = { id: rb.id, cust: (user && user.name) || form.name || "Customer", custPh: (user && user.phone) || form.phone, prov: "Rental Owner", svc: selR.title || "Rental Booking", amt: final, comm: Math.round(final * 0.10), status: rb.status, type: "rental", payment: rbPay, createdAt: rb.createdAt };
            localStorage.setItem("g8_admin_rentals", JSON.stringify([adminRental, ...adminRentals.filter(x => x.id !== rb.id)]));
            const customers = JSON.parse(localStorage.getItem("g8_admin_customers") || "[]");
            localStorage.setItem("g8_admin_customers", JSON.stringify(customers.map(c => c.phone === adminRental.custPh ? Object.assign({}, c, { bks: (c.bks || 0) + 1, lastBooking: rb.id }) : c)));
        } catch(e) {}
        awardPts(final, "Rental #" + rb.id.slice(-6));
        push("🏠", "Rental Confirmed!", selR.title + " reserved!");
        setScreen("rentalOk");
        setRbStep(1);
        setRbIn("");
        setRbOut("");
        setRbQty(1);
        setRbNote("");
        setRPromo("");
        setRPromoDisc(0);
        setRPromoMsg("");
        setTimeout(() => setScreen("dashboard"), 3000);
    };
    const confirmCancel = () => {
        const ref = getRef(selBk.date);
        const nxt = bookings.map(b => b.id === selBk.id ? Object.assign(Object.assign({}, b), { status: "cancelled", cancelR, cancelledAt: new Date().toISOString() }) : b);
        setBookings(nxt);
        ps("g8_bks", nxt);
        try { const ab = JSON.parse(localStorage.getItem("g8_admin_bookings") || "[]"); localStorage.setItem("g8_admin_bookings", JSON.stringify(ab.map(x => x.id === selBk.id ? Object.assign({}, x, { status: "cancelled", cancelR }) : x))); } catch(e) {}
        setCancelStep(3);
        if (ref.pct > 0)
            push("💰", "Refund Initiated", fmt(Math.round(selBk.amount * ref.pct / 100)) + " in 3-5 days.");
    };
    const submitReview = () => {
        if (!revBk || !revTxt.trim())
            return;
        const nxt = bookings.map(b => b.id === revBk.id ? Object.assign(Object.assign({}, b), { reviewed: true, review: { rating: revRat, text: revTxt } }) : b);
        setBookings(nxt);
        ps("g8_bks", nxt);
        try { const ab = JSON.parse(localStorage.getItem("g8_admin_bookings") || "[]"); localStorage.setItem("g8_admin_bookings", JSON.stringify(ab.map(x => x.id === revBk.id ? Object.assign({}, x, { reviewed: true, rating: revRat, review: revTxt }) : x))); } catch(e) {}
        push("⭐", "Review Submitted!", "Thanks for rating " + revBk.provider.name);
        setRevBk(null);
        setRevTxt("");
        setRevRat(5);
        setScreen("dashboard");
    };
    const submitDispute = () => {
        if (!dspBk || !dspR.trim())
            return;
        const d = { id: "D-" + Date.now(), bookingId: dspBk.id, reason: dspR, status: "open", createdAt: new Date().toISOString() };
        const nxt = [d, ...disputes];
        setDisputes(nxt);
        ps("g8_dsp", nxt);
        push("⚖️", "Dispute Raised", "Response within 24 hours.");
        setDspOk(true);
        setTimeout(() => { setDspOk(false); setDspBk(null); setDspR(""); setScreen("dashboard"); }, 2000);
    };
    const submitTicket = () => {
        if (!tickCat || !tickDesc.trim())
            return;
        const tk = { id: "TK-" + Date.now(), category: tickCat, description: tickDesc, status: "open", createdAt: new Date().toISOString() };
        const nxt = [tk, ...tickets];
        setTickets(nxt);
        ps("g8_tix", nxt);
        setTickSent(true);
        setTickCat(null);
        setTickDesc("");
        setTimeout(() => setTickSent(false), 3000);
        push("🎧", "Ticket Submitted", "Response within 2 hours via SMS.");
    };
    const applyRef = () => {
        const c = codeIn.trim().toUpperCase();
        if (!c)
            return;
        if (c === myCode) {
            setCodeMsg("❌ Can't use your own code!");
            return;
        }
        if (refs.find(r => r.code === c)) {
            setCodeMsg("❌ Already used.");
            return;
        }
        const e = { id: Date.now(), code: c, status: "rewarded", date: new Date().toLocaleDateString() };
        const nxt = [...refs, e];
        setRefs(nxt);
        ps("g8_refs", nxt);
        const cr2 = refCr + REF_FRIEND;
        setRefCr(cr2);
        ps("g8_refcr", cr2);
        setCodeMsg("✅ " + fmt(REF_FRIEND) + " credit added!");
        setCodeIn("");
        push("🎁", "Referral Bonus!", fmt(REF_FRIEND) + " credit added!");
    };
    const badgeOrd = { elite: 0, pro: 1, basic: 2 };
    const filteredP = PROVIDERS
        .filter(p => {
        const s = SERVICES.find(x => x.id === p.service);
        const qM = !query.trim() || [p.name, p.ne, s === null || s === void 0 ? void 0 : s.label, s === null || s === void 0 ? void 0 : s.labelNe, aName(p.area), ...(p.skills || [])].some(x => x === null || x === void 0 ? void 0 : x.toLowerCase().includes(query.toLowerCase()));
        const group = s === null || s === void 0 ? void 0 : s.group;
        const tabM = homeTab === "security" ? group === "security" : group !== "security";
        return qM && tabM && (fGroup === "all" || group === fGroup) && p.price <= fMax && p.rating >= fRat;
    })
        .sort((a, b) => (badgeOrd[a.badge] || 2) - (badgeOrd[b.badge] || 2));
    const filteredR = RENTALS.filter(r => {
        const rv = rRateV(r, rdur);
        const qM = !rQuery.trim() || [r.title, r.addr, r.desc, ...r.amen].some(x => x === null || x === void 0 ? void 0 : x.toLowerCase().includes(rQuery.toLowerCase()));
        return (rtFilter === "all" || r.type === rtFilter) && (raFilter === "all" || r.area === raFilter) && rv <= rMax && qM;
    });
    // ── STYLE ATOMS ──
    const S = {
        app: { fontFamily: "system-ui,sans-serif", background: C.cream, minHeight: "100vh", maxWidth: 430, margin: "0 auto" },
        hdr: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 400 },
        card: { margin: "0 14px 12px", background: C.white, borderRadius: 18, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,.05)", border: "1px solid " + C.border },
        sc: { margin: "12px 14px", background: C.white, borderRadius: 18, padding: 18, border: "1px solid " + C.border },
        lbl: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 7, textTransform: "uppercase" },
        inp: { width: "100%", border: "1px solid " + C.border, borderRadius: 11, padding: "11px 13px", fontSize: 14, fontFamily: "inherit", outline: "none", color: C.text, boxSizing: "border-box" },
        btnR: { background: C.red, border: "none", color: C.white, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 },
        btnB: { background: C.ad, border: "none", color: C.white, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 },
        btnG: { background: C.green, border: "none", color: C.white, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 },
        btnS: { background: C.surface, border: "1px solid " + C.border, color: C.red, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 },
        chip: (bg, col, txt) => React.createElement("span", { style: { display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 700, background: bg, color: col } }, txt),
        row: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + C.surface, fontSize: 13 },
        oi: a => ({ padding: "12px 14px", borderRadius: 13, border: a ? "2px solid " + C.red : "1px solid " + C.border, marginBottom: 8, cursor: "pointer", fontSize: 14, color: C.text, background: a ? "#FFF8F8" : C.white, display: "flex", justifyContent: "space-between", alignItems: "center" }),
        ob: a => ({ padding: "12px 14px", borderRadius: 13, border: a ? "2px solid " + C.ad : "1px solid " + C.border, marginBottom: 8, cursor: "pointer", fontSize: 14, color: C.text, background: a ? C.al : C.white, display: "flex", justifyContent: "space-between", alignItems: "center" }),
        fhdr: { padding: "13px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid " + C.border, background: C.white, position: "sticky", top: 0, zIndex: 300 },
        back: { background: "none", border: "none", fontSize: 22, cursor: "pointer", padding: 0, color: C.text },
        tab: (a, col) => ({ padding: "8px 14px", borderRadius: 20, border: "none", background: a ? (col || C.red) : C.surface, color: a ? C.white : C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }),
        catC: (a, col) => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 54, padding: "9px 5px", borderRadius: 13, background: a ? (col || C.red) : C.white, border: "1px solid " + (a ? (col || C.red) : C.border), cursor: "pointer", flexShrink: 0 }),
        catL: a => ({ fontSize: 9, color: a ? C.white : C.muted, textAlign: "center", fontWeight: 600 }),
        step: a => ({ flex: 1, height: 4, borderRadius: 2, background: a ? C.red : C.border }),
        bstep: a => ({ flex: 1, height: 4, borderRadius: 2, background: a ? C.ad : C.border }),
        tog: (on, col) => ({ width: 42, height: 22, borderRadius: 11, background: on ? (col || C.green) : "#D1D5DB", cursor: "pointer", position: "relative", transition: "background .2s" }),
        togK: on => ({ width: 18, height: 18, borderRadius: 9, background: C.white, position: "absolute", top: 2, left: on ? 22 : 2, transition: "left .2s" }),
    };
    const BC = ({ badge }) => {
        const m = { elite: { l: "Elite", bg: "#E8F5E9", c: "#2D6A4F" }, pro: { l: "Pro", bg: "#E3F2FD", c: "#1565C0" }, basic: { l: "Verified", bg: "#F3F4F6", c: "#6B7280" } };
        const b = m[badge] || m.basic;
        return React.createElement("span", { style: { fontSize: 9, fontWeight: 700, background: b.bg, color: b.c, border: "1px solid " + b.c + "33", padding: "2px 7px", borderRadius: 10 } }, b.l);
    };
    // ═══ SCREENS ═══
    const renderHome = () => {
        var _a;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { background: "linear-gradient(150deg," + (homeTab === "rentals" ? C.ad + ",#1976D2,#1565C0" : homeTab === "security" ? "#7F1D1D,#B91C1C,#DC2626" : C.red + "," + C.redL + "," + C.orange) + ")", padding: "18px 16px 22px" } },
                React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.7)", marginBottom: 5 } }, "📍 Kathmandu Valley · " + (((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || "")),
                points > 0 && React.createElement("div", { style: { background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "4px 12px", marginBottom: 8, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }, onClick: () => setScreen("loyalty") },
                    React.createElement("span", null, lv.icon),
                    React.createElement("span", { style: { fontSize: 11, color: C.white, fontWeight: 700 } }, points + " pts · " + lv.name)),
                React.createElement("div", { style: { fontSize: 19, fontWeight: 800, color: C.white, lineHeight: 1.3, marginBottom: 12 } }, homeTab === "rentals" ? "Find your perfect space" : homeTab === "security" ? "Find trusted security workers" : "Find trusted home workers"),
                React.createElement("div", { style: { display: "flex", background: "rgba(255,255,255,.18)", borderRadius: 13, padding: 3, marginBottom: 12 } }, [["services", "Services"], ["security", "Security"], ["rentals", "Rent a Space"]].map(([id, l]) => (React.createElement("button", { key: id, style: { flex: 1, background: homeTab === id ? "rgba(255,255,255,.95)" : "transparent", color: homeTab === id ? (id === "rentals" ? C.ad : C.red) : C.white, border: "none", padding: "8px 0", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }, onClick: () => { setHomeTab(id); setFGroup("all"); } }, l)))),
                React.createElement("div", { style: { background: C.white, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 } },
                    React.createElement("span", null, "\uD83D\uDD0D"),
                    React.createElement("input", { style: { flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", color: C.text, background: "transparent" }, placeholder: homeTab === "rentals" ? "Search rooms, villas..." : homeTab === "security" ? "Search CCTV, smart locks or security workers..." : "Search services or providers...", value: homeTab === "rentals" ? rQuery : query, onChange: e => homeTab === "rentals" ? setRQuery(e.target.value) : setQuery(e.target.value) }),
                    (homeTab === "rentals" ? rQuery : query) && React.createElement("span", { style: { cursor: "pointer", color: C.muted, fontSize: 12 }, onClick: () => homeTab === "rentals" ? setRQuery("") : setQuery("") }, "\u2715"))),
            (homeTab === "services" || homeTab === "security") && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" } },
                    React.createElement("div", { style: S.catC(fGroup === "all"), onClick: () => setFGroup("all") },
                        React.createElement("span", { style: { fontSize: 15 } }, "\uD83C\uDFE0"),
                        React.createElement("span", { style: S.catL(fGroup === "all") }, "All")),
                    GROUPS.filter(g => homeTab === "security" ? g.id === "security" : g.id !== "security").map(g => React.createElement("div", { key: g.id, style: S.catC(fGroup === g.id, g.color), onClick: () => setFGroup(g.id) },
                        React.createElement("span", { style: { fontSize: 15 } }, g.icon),
                        React.createElement("span", { style: S.catL(fGroup === g.id) }, g.label.split(" ")[0])))),
                React.createElement("div", { style: { padding: "0 14px 10px", display: "flex", gap: 10, flexWrap: "wrap" } },
                    React.createElement("div", { style: { flex: 1, minWidth: 140 } },
                        React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 4 } },
                            "MAX: ",
                            fmt(fMax)),
                        React.createElement("input", { type: "range", min: 300, max: 20000, step: 100, value: fMax, onChange: e => setFMax(Number(e.target.value)), style: { width: "100%", accentColor: C.red } })),
                    React.createElement("div", { style: { flex: 1, minWidth: 140 } },
                        React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 4 } },
                            "RATING: ",
                            fRat > 0 ? fRat + "★" : "Any"),
                        React.createElement("div", { style: { display: "flex", gap: 4 } }, [0, 4, 4.5, 4.8].map(r => React.createElement("button", { key: r, style: Object.assign(Object.assign({}, S.tab(fRat === r)), { padding: "5px 8px", fontSize: 10 }), onClick: () => setFRat(r) }, r === 0 ? "All" : r + "★"))))),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, padding: "4px 16px 8px" } }, filteredP.length + " providers"),
                filteredP.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: C.muted } },
                        React.createElement("div", { style: { fontSize: 44, marginBottom: 10 } }, "\uD83D\uDD0D"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 8 } }, "No providers found"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { padding: "10px 20px", borderRadius: 10 }), onClick: () => { setQuery(""); setFGroup("all"); setFArea("all"); setFMax(20000); setFRat(0); } }, "Show All"))
                    : filteredP.map(p => {
                        const svc = SERVICES.find(s => s.id === p.service);
                        const area = AREAS.find(a => a.id === p.area);
                        const isSaved = !!saved.find(s => s.id === p.id);
                        return (React.createElement("div", { key: p.id, style: S.card },
                            p.badge === "elite" && React.createElement("div", { style: { background: "linear-gradient(90deg,#F4A636,#FFC107)", borderRadius: "14px 14px 0 0", margin: "-16px -16px 10px", padding: "3px 14px", fontSize: 10, fontWeight: 800, color: C.white } }, "FEATURED \u2014 ELITE PROVIDER"),
                            React.createElement("div", { style: { display: "flex", gap: 12 } },
                                React.createElement("div", { style: { width: 50, height: 50, background: C.surface, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 } }, p.img),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text } }, p.name),
                                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, p.ne + " · " + (svc === null || svc === void 0 ? void 0 : svc.label)),
                                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "📍 " + (area === null || area === void 0 ? void 0 : area.name) + " · " + p.exp + " yrs"),
                                    React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 } },
                                        React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: C.gold } }, "⭐ " + p.rating),
                                        React.createElement("span", { style: { fontSize: 11, color: C.muted } }, "(" + p.reviews + ") · " + p.jobs + " jobs"),
                                        S.chip(p.avail ? C.gbg : "#FFF3E0", p.avail ? C.green : C.orange, p.avail ? "Available" : "Busy"),
                                        React.createElement(BC, { badge: p.badge })),
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.red, marginTop: 4 } }, "from " + fmt(p.price) + "/" + (svc === null || svc === void 0 ? void 0 : svc.pt))),
                                React.createElement("button", { style: { background: "none", border: "none", fontSize: 18, cursor: "pointer", alignSelf: "flex-start" }, onClick: () => toggleSave(p) }, isSaved ? "❤️" : "🤍")),
                            React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
                                React.createElement("button", { style: S.btnS, onClick: () => { setSelP(p); setScreen("profile"); } }, "View Profile"),
                                React.createElement("button", { style: S.btnR, onClick: () => { setSelP(p); setBkStep(1); setScreen("booking"); } }, "Book Now"))));
                    }))),
            homeTab === "rentals" && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { padding: "10px 16px 8px" } },
                    React.createElement("div", { style: { display: "flex", gap: 6 } }, RDURS.map(d => React.createElement("button", { key: d.id, style: { flex: 1, background: rdur === d.id ? C.ad : C.white, color: rdur === d.id ? C.white : C.muted, border: "1px solid " + (rdur === d.id ? C.ad : C.border), borderRadius: 11, padding: "8px 4px", fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }, onClick: () => setRdur(d.id) }, d.label)))),
                React.createElement("div", { style: { display: "flex", gap: 8, padding: "0 16px 10px", overflowX: "auto", scrollbarWidth: "none" } }, RTYPES.map(rt => React.createElement("div", { key: rt.id, style: S.catC(rtFilter === rt.id, C.ad), onClick: () => setRtFilter(rt.id) },
                    React.createElement("span", { style: { fontSize: 15 } }, rt.icon),
                    React.createElement("span", { style: S.catL(rtFilter === rt.id) }, rt.label)))),
                React.createElement("div", { style: { display: "flex", gap: 8, padding: "0 16px 10px", overflowX: "auto", scrollbarWidth: "none" } },
                    React.createElement("div", { style: S.catC(raFilter === "all", C.ad), onClick: () => setRaFilter("all") },
                        React.createElement("span", null, "\uD83D\uDDFA\uFE0F"),
                        React.createElement("span", { style: S.catL(raFilter === "all") }, "All")),
                    AREAS.map(a => React.createElement("div", { key: a.id, style: S.catC(raFilter === a.id, C.ad), onClick: () => setRaFilter(a.id) },
                        React.createElement("span", null, "\uD83D\uDCCD"),
                        React.createElement("span", { style: S.catL(raFilter === a.id) }, a.name)))),
                React.createElement("div", { style: { padding: "0 16px 8px" } },
                    React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 4 } },
                        "MAX: ",
                        rRateL({ dR: rMax, wR: rMax, mR: rMax }, rdur)),
                    React.createElement("input", { type: "range", min: 500, max: 500000, step: 500, value: rMax, onChange: e => setRMax(Number(e.target.value)), style: { width: "100%", accentColor: C.ad } })),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, padding: "4px 16px 8px" } }, filteredR.length + " properties"),
                filteredR.map(r => {
                    const area = AREAS.find(a => a.id === r.area);
                    const rtype = RTYPES.find(t => t.id === r.type);
                    const isSaved = !!savedR.find(s => s.id === r.id);
                    return (React.createElement("div", { key: r.id, style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.al + ",#BBDEFB)", borderRadius: 12, height: 80, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative" } },
                            React.createElement("span", { style: { fontSize: 44 } }, r.img),
                            !r.avail && React.createElement("div", { style: { position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,.6)", color: C.white, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 16 } }, "UNAVAILABLE"),
                            r.rat >= 4.8 && r.avail && React.createElement("div", { style: { position: "absolute", top: 6, left: 6, background: C.gold, color: C.white, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 16 } }, "TOP RATED")),
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
                            React.createElement("div", { style: { flex: 1 } },
                                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 2 } }, r.title),
                                React.createElement("div", { style: { fontSize: 10, color: C.muted } }, ((rtype === null || rtype === void 0 ? void 0 : rtype.label) || "") + " · 📍 " + (area === null || area === void 0 ? void 0 : area.name)),
                                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 } },
                                    r.bd > 0 && S.chip("#E3F2FD", C.ad, "🛏️ " + r.bd + "BR"),
                                    S.chip("#E3F2FD", C.ad, "🛁 " + r.ba + "BA"),
                                    S.chip("#E3F2FD", C.ad, r.sqft + " sqft"),
                                    S.chip(r.avail ? C.gbg : "#FFF3E0", r.avail ? C.green : C.orange, r.avail ? "Available" : "Occupied")),
                                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 } },
                                    r.amen.slice(0, 3).map(a => React.createElement("span", { key: a, style: { fontSize: 9, background: "#F0F4FF", color: C.ad, padding: "1px 6px", borderRadius: 8, fontWeight: 600 } }, a)),
                                    r.amen.length > 3 && React.createElement("span", { style: { fontSize: 9, color: C.muted } }, "+" + (r.amen.length - 3) + " more"))),
                            React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 } },
                                React.createElement("button", { style: { background: "none", border: "none", fontSize: 18, cursor: "pointer" }, onClick: () => toggleSaveR(r) }, isSaved ? "❤️" : "🤍"),
                                React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: C.ad } }, rRateL(r, rdur)),
                                React.createElement("div", { style: { fontSize: 9, color: C.muted } }, "⭐ " + r.rat + " (" + r.rv + ")"))),
                        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
                            React.createElement("button", { style: S.btnS, onClick: () => { setSelR(r); setRbDur(rdur); setScreen("rentalDetail"); } }, "View Details"),
                            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { opacity: r.avail ? 1 : 0.5 }), onClick: () => { if (r.avail) {
                                    setSelR(r);
                                    setRbDur(rdur);
                                    setRbStep(1);
                                    setScreen("rentalBook");
                                } } }, "Reserve Now"))));
                }))),
            React.createElement("div", { style: { height: 100 } })));
    };
    const renderBrowse = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px 18px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.white } }, "Browse All Services"),
            React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.7)" } }, "41 services \u00B7 8 categories")),
        React.createElement("div", { style: { padding: "12px 14px 0" } },
            React.createElement("div", { style: { background: C.white, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: "1px solid " + C.border, marginBottom: 12 } },
                React.createElement("span", null, "\uD83D\uDD0D"),
                React.createElement("input", { style: { flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", color: C.text, background: "transparent" }, placeholder: "Search services...", value: browseQ, onChange: e => setBrowseQ(e.target.value) }),
                browseQ && React.createElement("span", { style: { cursor: "pointer", color: C.muted, fontSize: 12 }, onClick: () => setBrowseQ("") }, "\u2715")),
            GROUPS.map(g => {
                const svcs = SERVICES.filter(s => s.group === g.id && (!browseQ || s.label.toLowerCase().includes(browseQ.toLowerCase())));
                if (!svcs.length)
                    return null;
                return (React.createElement("div", { key: g.id, style: { marginBottom: 18 } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "2px solid " + g.color + "33" } },
                        React.createElement("span", { style: { fontSize: 18 } }, g.icon),
                        g.label,
                        React.createElement("span", { style: { fontSize: 10, color: C.muted, fontWeight: 400 } }, "(" + svcs.length + ")")),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, svcs.map(s => (React.createElement("div", { key: s.id, style: { background: C.white, border: "1px solid " + C.border, borderRadius: 12, padding: "10px 12px", cursor: "pointer", display: "flex", gap: 10, alignItems: "center" }, onClick: () => { setFGroup(g.id); setQuery(s.label); setHomeTab("services"); setScreen("home"); } },
                        React.createElement("span", { style: { fontSize: 22, flexShrink: 0 } }, s.icon),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3 } }, s.label),
                            React.createElement("div", { style: { fontSize: 9, color: C.muted } }, s.labelNe),
                            React.createElement("div", { style: { fontSize: 10, color: C.green, fontWeight: 700, marginTop: 2 } }, "from " + fmt(s.pF) + "/" + s.pt))))))));
            })),
        React.createElement("div", { style: { height: 100 } })));
    const renderProfile = () => {
        var _a, _b;
        if (!selP)
            return null;
        const svc = SERVICES.find(s => s.id === selP.service);
        const area = AREAS.find(a => a.id === selP.area);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("home") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Provider Profile"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 18, cursor: "pointer" }, onClick: () => toggleSave(selP) }, saved.find(s => s.id === selP.id) ? "❤️" : "🤍")),
            React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "22px 16px 38px", textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 50, marginBottom: 8 } }, selP.img),
                React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.white } }, selP.name),
                React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.8)", marginBottom: 8 } }, selP.ne + " · " + (svc === null || svc === void 0 ? void 0 : svc.label) + " · " + selP.exp + " yrs · 📍 " + (area === null || area === void 0 ? void 0 : area.name)),
                React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 8 } },
                    React.createElement(BC, { badge: selP.badge }),
                    S.chip(selP.avail ? C.gbg : "#FFF3E0", selP.avail ? C.green : C.orange, selP.avail ? "Available" : "Busy"))),
            React.createElement("div", { style: { margin: "-18px 14px 12px", background: C.white, borderRadius: 18, padding: 16, boxShadow: "0 4px 20px rgba(0,0,0,.1)", border: "1px solid " + C.border, display: "flex", justifyContent: "space-around" } }, [[selP.rating + "★", "Rating"], [selP.reviews + "", "Reviews"], [selP.jobs + "", "Jobs"], [fmt(selP.price) + "/" + (svc === null || svc === void 0 ? void 0 : svc.pt), "Rate"]].map(([v, l]) => (React.createElement("div", { key: l, style: { textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.red } }, v),
                React.createElement("div", { style: { fontSize: 10, color: C.muted } }, l))))),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 6 } }, "Hours: " + ((_a = selP.hrs) === null || _a === void 0 ? void 0 : _a.s) + "–" + ((_b = selP.hrs) === null || _b === void 0 ? void 0 : _b.e)),
                React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => { var _a; const a = (_a = selP.days) === null || _a === void 0 ? void 0 : _a.includes(i); return React.createElement("span", { key: d, style: { padding: "3px 9px", borderRadius: 18, fontSize: 10, fontWeight: 700, background: a ? C.gbg : "#FFF3E0", color: a ? C.green : C.orange } }, d); }))),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.7 } }, selP.bio)),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 } }, "Skills"),
                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, selP.skills.map(sk => React.createElement("span", { key: sk, style: { background: C.surface, border: "1px solid " + C.border, borderRadius: 18, padding: "3px 11px", fontSize: 11, color: C.text } }, sk)))),
            React.createElement("div", { style: { padding: "0 14px 100px" } },
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: "13px 0", borderRadius: 12, fontSize: 14 }), onClick: () => { setBkStep(1); setScreen("booking"); } }, "Book Now"))));
    };
    const renderBooking = () => {
        const price = (selP === null || selP === void 0 ? void 0 : selP.price) || 0;
        const ptD = usePoints ? Math.floor(Math.min(points * P2N, price * 0.2)) : 0;
        const refD = refCr >= REF_YOU ? REF_YOU : 0;
        const final = Math.max(0, price - ptD - refD - promoDisc);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("home") }, "\u2190"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Book Service"),
                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, selP === null || selP === void 0 ? void 0 : selP.name))),
            React.createElement("div", { style: { display: "flex", gap: 5, padding: "10px 16px 0" } }, [1, 2, 3, 4].map(n => React.createElement("div", { key: n, style: S.step(n <= bkStep) }))),
            bkStep === 1 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Select Date and Time"),
                React.createElement("input", { type: "datetime-local", style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), value: bkDate, onChange: e => setBkDate(e.target.value), min: new Date().toISOString().slice(0, 16) }),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { width: "100%", marginBottom: 10, padding: 10, borderRadius: 10, fontSize: 12, color: C.text }), onClick: () => setScreen("avCal") }, "Or pick from Calendar"),
                React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 65, resize: "vertical", marginBottom: 10 }), placeholder: "Describe the issue in detail...", value: bkNote, onChange: e => setBkNote(e.target.value) }),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 11, opacity: bkDate ? 1 : 0.4 }), onClick: () => bkDate && setBkStep(2) }, "Next"))),
            bkStep === 2 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Service Address"),
                ["Home - Lalitpur", "Office - Kathmandu", "Thamel", "Baneshwor", "Patan", "Bhaktapur"].map(a => (React.createElement("div", { key: a, style: S.oi(bkAddr === a), onClick: () => setBkAddr(a) },
                    React.createElement("span", null, "📍 " + a),
                    bkAddr === a && React.createElement("span", { style: { color: C.red } }, "\u2713")))),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { width: "100%", marginBottom: 10, padding: 10, borderRadius: 10, fontSize: 12, color: C.text }), onClick: () => setScreen("addrPick") }, "Pick on Map"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setBkStep(1) }, "\u2190"),
                    React.createElement("button", { style: S.btnR, onClick: () => setBkStep(3) }, "Next")))),
            bkStep === 3 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Payment Method"),
                [["esewa", "eSewa", "🟢"], ["khalti", "Khalti", "🟣"], ["cash", "Cash on Day", "💵"]].map(([id, l, ic]) => (React.createElement("div", { key: id, style: S.oi(bkPay === id), onClick: () => setBkPay(id) },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("span", null, ic),
                        React.createElement("span", { style: { fontWeight: 600 } }, l)),
                    bkPay === id && React.createElement("span", { style: { color: C.red } }, "\u2713")))),
                points >= 100 && (React.createElement("div", { style: { background: "#FFFDE7", border: "1px solid #FFE082", borderRadius: 11, padding: 10, marginTop: 4 } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.orange } }, "Use " + points + " Points"),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "Save " + fmt(Math.floor(Math.min(points * P2N, price * 0.2))))),
                        React.createElement("div", { style: S.tog(usePoints, C.green), onClick: () => setUsePoints(v => !v) },
                            React.createElement("div", { style: S.togK(usePoints) }))))),
                React.createElement("div", { style: { background: C.gbg, border: "1px solid " + C.gbr, borderRadius: 11, padding: 10, marginTop: 8 } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 6 } }, "Promo Code"),
                    React.createElement("div", { style: { display: "flex", gap: 6 } },
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { flex: 1, fontSize: 12, padding: "7px 10px" }), placeholder: "e.g. GHARSEWA200", value: promoIn, onChange: e => setPromoIn(e.target.value.toUpperCase()) }),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnG), { flex: "0 0 auto", padding: "7px 12px", borderRadius: 9, fontSize: 11 }), onClick: applyPromo }, "Apply")),
                    promoMsg && React.createElement("div", { style: { marginTop: 5, fontSize: 11, color: promoMsg.startsWith("✅") ? C.green : C.red, fontWeight: 600 } }, promoMsg)),
                React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setBkStep(2) }, "\u2190"),
                    React.createElement("button", { style: S.btnR, onClick: () => setBkStep(4) }, "Next")))),
            bkStep === 4 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Confirm Booking"),
                [
                    ["Provider", selP === null || selP === void 0 ? void 0 : selP.name],
                    ["Service", svcLbl(selP === null || selP === void 0 ? void 0 : selP.service)],
                    ["Date", new Date(bkDate).toLocaleString()],
                    ["Address", bkAddr],
                    ["Payment", bkPay.toUpperCase()],
                    ["Rate", fmt(price)],
                    ...(ptD > 0 ? [["Points Disc", "-" + fmt(ptD)]] : []),
                    ...(refD > 0 ? [["Referral", "-" + fmt(refD)]] : []),
                    ...(promoDisc > 0 ? [["Promo", "-" + fmt(promoDisc)]] : []),
                    ["Total", fmt(final)],
                ].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                    React.createElement("span", { style: { color: C.muted } }, k),
                    React.createElement("span", { style: { fontWeight: k === "Total" ? 800 : 600, color: k === "Total" ? C.red : ["Points Disc", "Promo", "Referral"].includes(k) ? C.green : C.text } }, v)))),
                React.createElement("div", { style: { background: "#F0FFF4", borderRadius: 9, padding: "7px 11px", fontSize: 11, color: C.green, margin: "8px 0" } }, "Earn " + Math.floor(final * PPR) + " loyalty points!"),
                React.createElement("div", { style: { background: "#FFF8F0", borderRadius: 9, padding: "7px 11px", fontSize: 11, color: C.orange, marginBottom: 12 } }, "Free cancellation 24h+ before service"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setBkStep(3) }, "\u2190"),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { flex: 2, padding: 11 }), onClick: confirmBk }, "Confirm and Pay")))),
            React.createElement("div", { style: { height: 100 } })));
    };
    const renderAvCal = () => {
        const y = calMonth.getFullYear(), m = calMonth.getMonth();
        const firstDay = new Date(y, m, 1).getDay();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const today = new Date();
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("booking") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Pick Date")),
            React.createElement("div", { style: { padding: "14px 14px 0" } },
                React.createElement("div", { style: { background: C.white, borderRadius: 18, border: "1px solid " + C.border, overflow: "hidden", marginBottom: 14 } },
                    React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
                        React.createElement("button", { style: { background: "rgba(255,255,255,.2)", border: "none", color: C.white, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 16 }, onClick: () => setCalMonth(new Date(y, m - 1, 1)) }, "<"),
                        React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: C.white } }, calMonth.toLocaleString("default", { month: "long", year: "numeric" })),
                        React.createElement("button", { style: { background: "rgba(255,255,255,.2)", border: "none", color: C.white, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 16 }, onClick: () => setCalMonth(new Date(y, m + 1, 1)) }, ">")),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "10px 8px 0" } }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => React.createElement("div", { key: i, style: { textAlign: "center", fontSize: 11, fontWeight: 700, color: C.muted, padding: "4px 0" } }, d))),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "4px 8px 12px", gap: 2 } },
                        Array(firstDay).fill(null).map((_, i) => React.createElement("div", { key: "e" + i })),
                        Array(daysInMonth).fill(null).map((_, i) => {
                            const day = i + 1;
                            const dk = y + "-" + (m + 1) + "-" + day;
                            const isPast = new Date(y, m, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            const isToday = day === today.getDate() && m === today.getMonth() && y === today.getFullYear();
                            const isSel = !!selDates[dk];
                            return (React.createElement("div", { key: day, style: { textAlign: "center", padding: "6px 0", borderRadius: 8, cursor: isPast ? "default" : "pointer", background: isSel ? C.red : isToday ? "#FFF3F3" : "transparent", color: isSel ? C.white : isPast ? C.border : isToday ? C.red : C.text, fontSize: 13, fontWeight: isSel || isToday ? 800 : 400, opacity: isPast ? 0.35 : 1 }, onClick: () => { if (!isPast)
                                    setSelDates(d => (Object.assign(Object.assign({}, d), { [dk]: !d[dk] }))); } }, day));
                        }))),
                React.createElement("div", { style: { background: "#F0FFF4", borderRadius: 12, padding: 12, marginBottom: 14, border: "1px solid " + C.gbr } },
                    React.createElement("div", { style: { fontSize: 12, color: C.green, fontWeight: 700 } }, Object.values(selDates).filter(Boolean).length + " date(s) selected")),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 13, borderRadius: 12, fontSize: 14, opacity: Object.values(selDates).filter(Boolean).length > 0 ? 1 : 0.4 }), onClick: () => {
                        const entries = Object.entries(selDates).filter(([, v]) => v);
                        if (entries.length > 0) {
                            const [dk] = entries[0];
                            const [yr, mo, dy] = dk.split("-");
                            setBkDate(yr + "-" + mo.padStart(2, "0") + "-" + dy.padStart(2, "0") + "T09:00");
                            setScreen("booking");
                        }
                    } }, "Confirm Date")),
            React.createElement("div", { style: { height: 80 } })));
    };
    const renderAddrPick = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: S.fhdr },
            React.createElement("button", { style: S.back, onClick: () => setScreen("booking") }, "\u2190"),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Select Location")),
        React.createElement("div", { style: { padding: "14px 14px 0" } },
            React.createElement("div", { style: { background: C.white, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: "1px solid " + C.border, marginBottom: 14 } },
                React.createElement("span", null, "\uD83D\uDD0D"),
                React.createElement("input", { style: { flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", color: C.text, background: "transparent" }, placeholder: "Type your address...", value: customAddr, onChange: e => setCustomAddr(e.target.value) })),
            React.createElement("div", { style: { background: "#E8F5E9", borderRadius: 16, height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: "1px solid " + C.gbr, position: "relative", overflow: "hidden" } },
                React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,100,0,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,100,0,.05) 1px,transparent 1px)", backgroundSize: "22px 22px" } }),
                React.createElement("div", { style: { textAlign: "center", position: "relative" } },
                    React.createElement("div", { style: { fontSize: 34, marginBottom: 6 } }, "\uD83D\uDCCD"),
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.wg } }, pickedArea ? aName(pickedArea) : "Select area below"))),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 } }, AREAS.map(a => (React.createElement("div", { key: a.id, style: { background: pickedArea === a.id ? "#FFF8F8" : C.white, border: (pickedArea === a.id ? "2px" : "1px") + " solid " + (pickedArea === a.id ? C.red : C.border), borderRadius: 12, padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }, onClick: () => setPickedArea(a.id) },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, a.name),
                    React.createElement("div", { style: { fontSize: 9, color: C.muted } }, a.ne)),
                pickedArea === a.id && React.createElement("span", null, "\uD83D\uDCCD"))))),
            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 13, borderRadius: 12, fontSize: 14, opacity: (pickedArea || customAddr) ? 1 : 0.4 }), onClick: () => { if (pickedArea || customAddr) {
                    setBkAddr(customAddr || aName(pickedArea));
                    setScreen("booking");
                } } }, "Confirm Location")),
        React.createElement("div", { style: { height: 80 } })));
    const renderBkStatus = () => {
        var _a;
        const b = bookings[0];
        const steps = ["upcoming", "confirmed", "in_progress", "completed"];
        const sL = ["Booking Placed", "Provider Confirmed", "Job In Progress", "Completed"];
        const sI = ["📋", "✅", "🔧", "🎉"];
        const cur = b ? steps.indexOf(b.status) : 0;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "20px 16px 28px", textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 48, marginBottom: 8 } }, "\u2705"),
                React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.white } }, "Booking Confirmed!"),
                React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 4 } }, b === null || b === void 0 ? void 0 : b.id)),
            React.createElement("div", { style: { margin: "-16px 14px 12px", background: C.white, borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,.1)", border: "1px solid " + C.border } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 } }, "Live Status Tracker"),
                steps.map((st, i) => {
                    const done = i <= cur;
                    const active = i === cur;
                    return (React.createElement("div", { key: st, style: { display: "flex", gap: 12, marginBottom: i < steps.length - 1 ? 14 : 0 } },
                        React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
                            React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: done ? C.green : C.surface, border: "2px solid " + (done ? C.green : C.border), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 } }, done ? sI[i] : i + 1),
                            i < steps.length - 1 && React.createElement("div", { style: { width: 2, height: 18, background: done ? C.green : C.border, marginTop: 3 } })),
                        React.createElement("div", { style: { paddingTop: 5 } },
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: done ? C.text : C.muted } }, sL[i]),
                            active && React.createElement("div", { style: { fontSize: 10, color: C.green, fontWeight: 700, marginTop: 1 } }, "Current status"))));
                })),
            b && (React.createElement("div", { style: S.card }, [["Provider", (_a = b.provider) === null || _a === void 0 ? void 0 : _a.name], ["Date", new Date(b.date).toLocaleString()], ["Address", b.addr], ["Total", fmt(b.amount)]].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                React.createElement("span", { style: { color: C.muted } }, k),
                React.createElement("span", { style: { fontWeight: k === "Total" ? 800 : 600, color: k === "Total" ? C.red : C.text } }, v)))))),
            React.createElement("div", { style: { padding: "0 14px 100px", display: "flex", gap: 8 } },
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 12 }), onClick: () => { setDashTab("bookings"); setScreen("dashboard"); } }, "My Bookings"),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { fontSize: 12 }), onClick: () => setScreen("home") }, "Book More"))));
    };
    const renderBookingConfirm = () => {
        var _a, _b, _c;
        if (!selBk)
            return null;
        const sc2 = S_COL[selBk.status] || ["#E3F2FD", "#1565C0"];
        const code = selBk.id.replace("GS-", "").slice(-6);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("dashboard") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Booking Details")),
            React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "20px 16px 36px", textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 48, marginBottom: 8 } }, S_ICN[selBk.status] || "📋"),
                React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.white } }, S_LBL[selBk.status]),
                React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 4 } }, selBk.id)),
            React.createElement("div", { style: { margin: "-18px 14px 14px", background: C.white, borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,.1)", border: "1px solid " + C.border } },
                React.createElement("div", { style: { textAlign: "center", marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 4 } }, "Confirmation Code"),
                    React.createElement("div", { style: { fontFamily: "monospace", fontSize: 28, fontWeight: 800, color: C.red, letterSpacing: 6 } }, code),
                    React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 2 } }, "Show this to your provider on arrival")),
                React.createElement(BookingTracker, { status: selBk.status, reviewed: selBk.reviewed }),
                React.createElement("div", { style: { borderTop: "1px solid " + C.border, paddingTop: 14 } }, [["Provider", ((_a = selBk.provider) === null || _a === void 0 ? void 0 : _a.name) || "—"], ["Service", svcLbl((_b = selBk.provider) === null || _b === void 0 ? void 0 : _b.service)], ["Date", new Date(selBk.date).toLocaleString()], ["Address", selBk.addr || "—"], ["Payment", ((_c = selBk.payment) === null || _c === void 0 ? void 0 : _c.toUpperCase()) || "—"], ["Amount", fmt(selBk.amount)]].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                    React.createElement("span", { style: { color: C.muted } }, k),
                    React.createElement("span", { style: { fontWeight: 600, color: k === "Amount" ? C.red : C.text } }, v)))))),
            React.createElement("div", { style: { padding: "0 14px 100px", display: "flex", flexDirection: "column", gap: 10 } },
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12 }), onClick: () => { var _a; try {
                        (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText("GharSewa Booking " + selBk.id + " | Code: " + code);
                    }
                    catch (_b) { } push("✅", "Copied!", "Booking details copied."); } }, "Copy Booking Details"),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { width: "100%", padding: 12, borderRadius: 12, color: C.text }), onClick: () => setScreen("invoice") }, "View Tax Invoice"),
                selBk.status === "completed" && !selBk.reviewed && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12 }), onClick: () => { setRevBk(selBk); setScreen("review"); } }, "Write Review"),
                (selBk.status === "completed" || selBk.status === "in_progress") && !disputes.find(d => d.bookingId === selBk.id) && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { width: "100%", padding: 12, borderRadius: 12, color: C.orange, border: "1px solid " + C.orange }), onClick: () => { setDspBk(selBk); setScreen("dispute"); } }, "Raise Dispute"))));
    };
    const postRequirement = () => {
        if (!reqForm.service || !reqForm.location.trim() || !reqForm.description.trim())
            return;
        const item = {
            id: "REQ-" + Date.now().toString().slice(-6),
            service: reqForm.service,
            location: reqForm.location.trim(),
            budget: reqForm.budget || "0",
            description: reqForm.description.trim(),
            image: reqForm.image || "",
            customer: (user === null || user === void 0 ? void 0 : user.name) || "Customer",
            createdAt: new Date().toISOString(),
            status: "open"
        };
        const next = [item, ...requirements];
        setRequirements(next);
        ps("g8_requirements", next);
        setReqForm({ service: "plumbing", location: "", budget: "", description: "", image: "" });
        setReqPosted(true);
        push("📢", "Requirement posted", "Service workers can now see your requirement.");
        setTimeout(() => setReqPosted(false), 2500);
    };
    const assignRequirementOffer = (req, offer) => {
        if (!req || !offer) return;
        const amount = Number(offer.price || req.budget || 0);
        const provider = { name: offer.workerName || "Worker", phone: offer.workerPhone || "", email: offer.workerEmail || "", service: offer.service || req.service, label: svcLbl(offer.service || req.service) };
        const b = { id: "GS-REQ-" + Date.now(), provider, date: new Date().toISOString(), addr: req.location, payment: "cash", note: "Requirement booking: " + (req.description || ""), amount, orig: amount, ptD: 0, refD: 0, promoDisc: 0, status: "confirmed", requirementId: req.id, createdAt: new Date().toISOString() };
        const nb = [b, ...bookings];
        setBookings(nb); ps("g8_bks", nb);
        const nextReqs = requirements.map(x => x.id === req.id ? Object.assign({}, x, { status: "assigned", assignedWorker: provider.name, assignedOfferId: offer.id }) : x);
        setRequirements(nextReqs); ps("g8_requirements", nextReqs); writeLS("g8_requirements", nextReqs);
        try { const ab = readLS("g8_admin_bookings", []); const adminBooking = { id:b.id, cust:(user && user.name) || form.name || "Customer", custPh:(user && user.phone) || form.phone, prov:provider.name, provEmail:provider.email, workerEmail:provider.email, svc:provider.label || provider.service, svcId:provider.service, addr:req.location, date:b.date, note:b.note, amt:amount, comm:Math.round(amount*0.10), status:"confirmed", type:"requirement", payment:"cash", requirementId:req.id, createdAt:b.createdAt }; writeLS("g8_admin_bookings", [adminBooking, ...ab.filter(x=>x.id!==b.id)]); } catch(e) {}
        push("✅", "Worker assigned", provider.name + " assigned for " + req.id + ". Chat is now available in My Bookings.");
        setDashTab("bookings");
    };
    const renderDashboard = () => {
        var _a;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px 18px" } },
                React.createElement("div", { style: { fontSize: 19, fontWeight: 800, color: C.white } }, (((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || "") + "'s Space")),
            React.createElement("div", { style: { padding: "12px 14px 0" } },
                React.createElement("div", { style: { display: "flex", gap: 7, marginBottom: 12, flexWrap: "wrap" } }, [["bookings", "Services (" + bookings.length + ")"], ["requirements", "Post Requirement (" + requirements.length + ")"], ["rentals", "Rentals (" + rentalBks.length + ")"], ["disputes", "Disputes (" + disputes.length + ")"], ["saved", "Saved (" + (saved.length + savedR.length) + ")"]].map(([id, l]) => (React.createElement("button", { key: id, style: S.tab(dashTab === id, id === "rentals" ? C.ad : id === "disputes" ? C.orange : C.red), onClick: () => setDashTab(id) }, l)))),
                dashTab === "bookings" && (bookings.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0", color: C.muted } },
                        React.createElement("div", { style: { fontSize: 42 } }, "\uD83D\uDCCB"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, margin: "10px 0" } }, "No bookings yet."),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { padding: "10px 20px", borderRadius: 10 }), onClick: () => setScreen("home") }, "Browse Services"))
                    : bookings.map(b => {
                        var _a;
                        const sc2 = S_COL[b.status] || ["#E3F2FD", "#1565C0"];
                        return (React.createElement("div", { key: b.id, style: S.card },
                            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                                React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, b.id),
                                S.chip(sc2[0], sc2[1], (S_ICN[b.status] || "") + " " + (S_LBL[b.status] || b.status))),
                            React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text } }, (_a = b.provider) === null || _a === void 0 ? void 0 : _a.name),
                            React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "📅 " + new Date(b.date).toLocaleString() + " · 📍 " + (b.addr || b.address)),
                            React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.red, marginTop: 5 } }, fmt(b.amount)),
                            React.createElement("div", { style: { display: "flex", gap: 7, marginTop: 9, flexWrap: "wrap" } },
                                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 11 }), onClick: () => { setSelBk(b); setScreen("bookConfirm"); } }, "Details"),
                                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 11 }), onClick: () => { setSelBk(b); setScreen("invoice"); } }, "Invoice"),
                                (b.status === "confirmed" || b.status === "in_progress" || b.status === "completed") && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { fontSize: 11 }), onClick: () => { setSelChatBk(b); setScreen("chat"); } }, "Chat"),
                                b.status === "upcoming" && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 11, color: C.red }), onClick: () => { setSelBk(b); setCancelStep(1); setCancelR(null); setScreen("cancel"); } }, "Cancel"),
                                b.status === "completed" && !b.reviewed && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { fontSize: 11 }), onClick: () => { setRevBk(b); setScreen("review"); } }, "Review"),
                                b.status === "completed" && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 11, color: C.green }), onClick: () => { setSelP(b.provider); setBkStep(1); setScreen("booking"); } }, "Re-book"),
                                (b.status === "completed" || b.status === "in_progress") && !disputes.find(d => d.bookingId === b.id) && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { fontSize: 11, color: C.orange }), onClick: () => { setDspBk(b); setScreen("dispute"); } }, "Dispute"))));
                    })),
                dashTab === "requirements" && (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: S.card },
                        React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 } }, "Post Your Requirement"),
                        React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 12 } }, "Describe what you need. Service workers will see it in their feed."),
                        React.createElement("div", { style: S.lbl }, "Service Needed"),
                        React.createElement("select", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), value: reqForm.service, onChange: e => setReqForm(Object.assign(Object.assign({}, reqForm), { service: e.target.value })) }, SERVICES.map(sv => React.createElement("option", { key: sv.id, value: sv.id }, sv.icon + " " + sv.label))),
                        React.createElement("div", { style: S.lbl }, "Location"),
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), placeholder: "Example: Baneshwor, Kathmandu", value: reqForm.location, onChange: e => setReqForm(Object.assign(Object.assign({}, reqForm), { location: e.target.value })) }),
                        React.createElement("div", { style: S.lbl }, "Budget (NPR)"),
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), type: "number", placeholder: "Example: 1500", value: reqForm.budget, onChange: e => setReqForm(Object.assign(Object.assign({}, reqForm), { budget: e.target.value })) }),
                        React.createElement("div", { style: S.lbl }, "Description"),
                        React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 90, resize: "vertical", marginBottom: 10 }), placeholder: "Write details about the work, time, problem, or photo notes...", value: reqForm.description, onChange: e => setReqForm(Object.assign(Object.assign({}, reqForm), { description: e.target.value })) }),
                        React.createElement("div", { style: S.lbl }, "Issue Photo (optional)"),
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 8 }), type: "file", accept: "image/*", onChange: e => { const f=e.target.files && e.target.files[0]; if(!f) return; const rd=new FileReader(); rd.onload=ev=>setReqForm(Object.assign(Object.assign({}, reqForm), { image: ev.target.result })); rd.readAsDataURL(f); } }),
                        reqForm.image && React.createElement("img", { src: reqForm.image, style: { width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 12, marginBottom: 12, border: "1px solid " + C.border } }),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12, opacity: (reqForm.location.trim() && reqForm.description.trim()) ? 1 : 0.45 }), onClick: postRequirement }, reqPosted ? "✅ Posted to Worker Feed" : "Post Requirement")),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.text, margin: "4px 14px 10px" } }, "My Posted Requirements"),
                    requirements.length === 0
                        ? React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { textAlign: "center", color: C.muted, padding: 28 }) }, "No requirements posted yet.")
                        : requirements.map(r => {
                            const sv = SERVICES.find(x => x.id === r.service);
                            return React.createElement("div", { key: r.id, style: S.card },
                                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                                    React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, r.id),
                                    S.chip(r.status === "assigned" ? C.al : C.gbg, r.status === "assigned" ? C.ad : C.green, r.status === "assigned" ? "Assigned" : (r.status === "quoted" ? "Offers" : "Open"))),
                                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.text } }, ((sv === null || sv === void 0 ? void 0 : sv.icon) || "🔧") + " " + ((sv === null || sv === void 0 ? void 0 : sv.label) || r.service)),
                                React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 4 } }, "📍 " + r.location + " · 💰 " + fmt(Number(r.budget || 0))),
                                React.createElement("div", { style: { fontSize: 12, color: C.text, marginTop: 7, lineHeight: 1.45 } }, r.description),
                                r.image && React.createElement("img", { src: r.image, style: { width: "100%", maxHeight: 150, objectFit: "cover", borderRadius: 12, marginTop: 8, border: "1px solid " + C.border } }),
                                (r.offers && r.offers.length > 0) && React.createElement("div", { style: { marginTop: 10, background: "#F9FAFB", border: "1px solid " + C.border, borderRadius: 12, padding: 10 } },
                                    React.createElement("div", { style: { fontSize: 12, fontWeight: 900, color: C.text, marginBottom: 6 } }, "Worker Offers (" + r.offers.length + ")"),
                                    r.offers.map(o => React.createElement("div", { key: o.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, borderTop: "1px solid " + C.border, paddingTop: 8, marginTop: 8 } },
                                        React.createElement("div", null, React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: C.text } }, "👷 " + (o.workerName || "Worker")), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "💰 " + fmt(Number(o.price || 0)) + " · " + (o.kind || "offer"))),
                                        r.status !== "assigned" && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { fontSize: 11, padding: "7px 10px" }), onClick: () => assignRequirementOffer(r, o) }, "Assign")))) ,
                                React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 8 } }, "Posted " + new Date(r.createdAt).toLocaleString()));
                        }))),
                dashTab === "rentals" && (rentalBks.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0", color: C.muted } },
                        React.createElement("div", { style: { fontSize: 42 } }, "\uD83C\uDFE0"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, margin: "10px 0" } }, "No rental bookings yet."),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { padding: "10px 20px", borderRadius: 10 }), onClick: () => { setHomeTab("rentals"); setScreen("home"); } }, "Browse Rentals"))
                    : rentalBks.map(rb => {
                        var _a, _b, _c;
                        return (React.createElement("div", { key: rb.id, style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                                React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, rb.id),
                                S.chip(C.al, C.ad, "Confirmed")),
                            React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } },
                                React.createElement("span", { style: { fontSize: 30 } }, (_a = rb.rental) === null || _a === void 0 ? void 0 : _a.img),
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, (_b = rb.rental) === null || _b === void 0 ? void 0 : _b.title),
                                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "📍 " + aName((_c = rb.rental) === null || _c === void 0 ? void 0 : _c.area) + " · " + rb.qty + " " + (rb.durType === "daily" ? "night(s)" : rb.durType === "weekly" ? "week(s)" : "month(s)")))),
                            React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.ad, marginTop: 7 } }, fmt(rb.amount))));
                    })),
                dashTab === "disputes" && (disputes.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0", color: C.muted } },
                        React.createElement("div", { style: { fontSize: 42 } }, "\u2696\uFE0F"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, margin: "10px 0" } }, "No disputes raised."))
                    : disputes.map(d => (React.createElement("div", { key: d.id, style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + (d.status === "open" ? "#FFCDD2" : C.gbr) }) },
                        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, fontWeight: 700 } }, d.bookingId),
                            S.chip(d.status === "open" ? "#FFEBEE" : C.gbg, d.status === "open" ? C.red : C.green, d.status === "open" ? "Open" : "Resolved")),
                        React.createElement("div", { style: { fontSize: 13, color: C.text } }, d.reason),
                        d.status === "open" && React.createElement("div", { style: { fontSize: 10, color: C.orange, marginTop: 4, fontWeight: 700 } }, "Response within 24 hours"))))),
                dashTab === "saved" && (saved.length === 0 && savedR.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0", color: C.muted } },
                        React.createElement("div", { style: { fontSize: 42 } }, "\uD83D\uDC94"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, margin: "10px 0" } }, "No saved items yet."))
                    : React.createElement(React.Fragment, null,
                        saved.map(p => (React.createElement("div", { key: p.id, style: S.card },
                            React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } },
                                React.createElement("div", { style: { width: 42, height: 42, background: C.surface, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 } }, p.img),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, p.name),
                                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "⭐ " + p.rating + " · " + fmt(p.price))),
                                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { padding: "7px 12px", fontSize: 11 }), onClick: () => { setSelP(p); setBkStep(1); setScreen("booking"); } }, "Book"))))),
                        savedR.map(r => (React.createElement("div", { key: r.id, style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                            React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } },
                                React.createElement("div", { style: { width: 42, height: 42, background: C.al, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 } }, r.img),
                                React.createElement("div", { style: { flex: 1 } },
                                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, r.title),
                                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📍 " + aName(r.area) + " · from " + fmt(r.dR) + "/night")),
                                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { padding: "7px 12px", fontSize: 11 }), onClick: () => { setSelR(r); setScreen("rentalDetail"); } }, "View")))))))),
            React.createElement("div", { style: { height: 100 } })));
    };
    const renderCancel = () => {
        if (!selBk)
            return null;
        const ref = getRef(selBk.date);
        const refAmt = Math.round(selBk.amount * ref.pct / 100);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => { setScreen("dashboard"); setCancelStep(1); } }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Cancel Booking")),
            React.createElement("div", { style: { padding: "12px 14px 0" } },
                cancelStep === 1 && (React.createElement(React.Fragment, null,
                    CANCEL_R.map(r => React.createElement("div", { key: r.id, style: S.oi(cancelR === r.id), onClick: () => setCancelR(r.id) },
                        React.createElement("span", null, r.l),
                        cancelR === r.id && React.createElement("span", { style: { color: C.red } }, "\u2713"))),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12, marginTop: 4, opacity: cancelR ? 1 : 0.4 }), onClick: () => cancelR && setCancelStep(2) }, "Next"))),
                cancelStep === 2 && (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { background: refAmt > 0 ? C.gbg : "#FFF5F5", border: "1px solid " + (refAmt > 0 ? C.gbr : "#FFCDD2"), borderRadius: 16, padding: 18, textAlign: "center", marginBottom: 12 } },
                        React.createElement("div", { style: { fontSize: 34, fontWeight: 800, color: refAmt > 0 ? C.green : C.red } }, fmt(refAmt)),
                        React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "Refund amount (" + ref.label + ")")),
                    React.createElement("div", { style: { display: "flex", gap: 8 } },
                        React.createElement("button", { style: S.btnS, onClick: () => setCancelStep(1) }, "Back"),
                        React.createElement("button", { style: { flex: 2, background: C.red, border: "none", color: C.white, padding: "12px 0", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }, onClick: confirmCancel }, "Confirm Cancel")))),
                cancelStep === 3 && (React.createElement("div", { style: { textAlign: "center", padding: "30px 0" } },
                    React.createElement("div", { style: { fontSize: 58, marginBottom: 12 } }, "\u2705"),
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.text } }, "Booking Cancelled"),
                    React.createElement("div", { style: { fontSize: 13, color: C.muted, margin: "8px 0 20px" } }, refAmt > 0 ? fmt(refAmt) + " refund in 3-5 days." : "No refund applicable."),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12 }), onClick: () => { setScreen("dashboard"); setCancelStep(1); } }, "Back to Dashboard")))),
            React.createElement("div", { style: { height: 80 } })));
    };
    const renderReview = () => {
        var _a, _b;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("dashboard") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Write Review")),
            React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { textAlign: "center", marginBottom: 14 } },
                    React.createElement("div", { style: { fontSize: 38, marginBottom: 6 } }, ((_a = revBk === null || revBk === void 0 ? void 0 : revBk.provider) === null || _a === void 0 ? void 0 : _a.img) || "🔧"),
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, (_b = revBk === null || revBk === void 0 ? void 0 : revBk.provider) === null || _b === void 0 ? void 0 : _b.name)),
                React.createElement("div", { style: S.lbl }, "Rating"),
                React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 14 } }, [1, 2, 3, 4, 5].map(s => React.createElement("span", { key: s, style: { fontSize: 26, cursor: "pointer", opacity: s <= revRat ? 1 : 0.3 }, onClick: () => setRevRat(s) }, "\u2B50"))),
                React.createElement("div", { style: S.lbl }, "Review"),
                React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 90, resize: "vertical", marginBottom: 12 }), placeholder: "Share your experience...", value: revTxt, onChange: e => setRevTxt(e.target.value) }),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12, opacity: revTxt.trim() ? 1 : 0.4 }), onClick: submitReview }, "Submit Review"))));
    };
    const renderDispute = () => {
        var _a;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("dashboard") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Raise Dispute")),
            React.createElement("div", { style: S.sc }, dspOk
                ? React.createElement("div", { style: { textAlign: "center", padding: "30px 0" } },
                    React.createElement("div", { style: { fontSize: 58, marginBottom: 12 } }, "\u2705"),
                    React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.text } }, "Dispute Submitted!"),
                    React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 6 } }, "Response within 24 hours via SMS."))
                : React.createElement(React.Fragment, null,
                    dspBk && React.createElement("div", { style: { background: C.surface, borderRadius: 12, padding: "10px 14px", marginBottom: 14 } },
                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, "Booking: " + dspBk.id),
                        React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Provider: " + ((_a = dspBk.provider) === null || _a === void 0 ? void 0 : _a.name) + " · " + fmt(dspBk.amount))),
                    [["quality", "Poor quality of work"], ["incomplete", "Work not completed"], ["late", "Provider arrived very late"], ["overcharge", "Overcharged / wrong price"], ["damaged", "Property damaged"], ["other", "Other issue"]].map(([id, l]) => (React.createElement("div", { key: id, style: S.oi(dspR === l), onClick: () => setDspR(l) },
                        React.createElement("span", null, l),
                        dspR === l && React.createElement("span", { style: { color: C.red } }, "\u2713")))),
                    React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 80, resize: "vertical", marginBottom: 14 }), placeholder: "Additional details...", value: dspR.length > 20 ? dspR : "", onChange: e => setDspR(e.target.value) }),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12, opacity: dspR.trim() ? 1 : 0.4 }), onClick: submitDispute }, "Submit Dispute")))));
    };
    const renderInvoice = () => {
        var _a, _b, _c;
        if (!selBk)
            return null;
        const tax = Math.round(selBk.amount * VAT);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("dashboard") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Tax Invoice")),
            React.createElement("div", { style: { margin: 14, background: C.white, borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,.07)", border: "1px solid " + C.border } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 16 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.red } }, "GharSewa"),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "PAN: 123456789 \u00B7 Kathmandu, Nepal")),
                    React.createElement("div", { style: { textAlign: "right" } },
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.red } }, selBk.id),
                        React.createElement("div", { style: { fontSize: 9, color: C.muted } }, new Date().toLocaleDateString()))),
                [["Provider", (_a = selBk.provider) === null || _a === void 0 ? void 0 : _a.name], ["Service", svcLbl((_b = selBk.provider) === null || _b === void 0 ? void 0 : _b.service)], ["Date", new Date(selBk.date).toLocaleString()], ["Address", selBk.addr || selBk.address], ["Payment", (_c = selBk.payment) === null || _c === void 0 ? void 0 : _c.toUpperCase()], ["Sub-total", fmt(selBk.amount)], ["VAT (13%)", fmt(tax)], ["Total Due", fmt(selBk.amount + tax)]].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                    React.createElement("span", { style: { color: C.muted } }, k),
                    React.createElement("span", { style: { fontWeight: k === "Total Due" ? 800 : 600, color: k === "Total Due" ? C.red : C.text } }, v)))),
                React.createElement("div", { style: { marginTop: 14, paddingTop: 10, borderTop: "1px solid " + C.border, fontSize: 10, color: C.muted, textAlign: "center" } }, "Computer-generated invoice \u00B7 hello@gharsewa.com.np"))));
    };
    const renderNotifs = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px 18px" } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.white } }, "Notifications"),
                    React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.7)" } }, unread + " unread")),
                unread > 0 && React.createElement("button", { style: { background: "rgba(255,255,255,.2)", border: "none", color: C.white, padding: "4px 10px", borderRadius: 18, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }, onClick: () => { const u = notifs.map(n => (Object.assign(Object.assign({}, n), { read: true }))); setNotifs(u); ps("g8_notifs", u); } }, "Mark all read"))),
        React.createElement("div", { style: { padding: "12px 14px 0" } },
            React.createElement("div", { style: { display: "flex", gap: 7, marginBottom: 12 } }, [["all", "All"], ["unread", "Unread"]].map(([id, l]) => (React.createElement("button", { key: id, style: S.tab(notifFilter === id), onClick: () => setNotifFilter(id) }, l)))),
            notifs.filter(n => notifFilter === "all" || !n.read).length === 0
                ? React.createElement("div", { style: { textAlign: "center", padding: "48px 0", color: C.muted } },
                    React.createElement("div", { style: { fontSize: 48 } }, "\uD83D\uDD14"),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 600, marginTop: 10 } }, "No notifications"))
                : notifs.filter(n => notifFilter === "all" || !n.read).map(n => (React.createElement("div", { key: n.id, style: Object.assign(Object.assign({}, S.card), { margin: "0 0 10px", cursor: "pointer", background: n.read ? C.white : "#FFF8F8" }), onClick: () => { const u = notifs.map(x => x.id === n.id ? Object.assign(Object.assign({}, x), { read: true }) : x); setNotifs(u); ps("g8_notifs", u); } },
                    React.createElement("div", { style: { display: "flex", gap: 10 } },
                        React.createElement("span", { style: { fontSize: 22 } }, n.icon),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, n.title),
                            React.createElement("div", { style: { fontSize: 12, color: C.muted } }, n.body),
                            React.createElement("div", { style: { fontSize: 9, color: C.muted, marginTop: 2 } }, n.time)),
                        !n.read && React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: C.red, flexShrink: 0, marginTop: 4 } })))))),
        React.createElement("div", { style: { height: 80 } })));
    const renderLoyalty = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + lv.color + "," + lv.color + "CC)", padding: "18px 16px 22px" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } },
                React.createElement("span", { style: { fontSize: 38 } }, lv.icon),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.white } }, lv.name + " Member"),
                    React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.8)" } }, points.toLocaleString() + " pts"))),
            nextLv && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { background: "rgba(255,255,255,.2)", borderRadius: 8, height: 7, overflow: "hidden" } },
                    React.createElement("div", { style: { width: prog + "%", height: "100%", background: C.white, borderRadius: 8 } })),
                React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.8)", marginTop: 4 } }, (nextLv.min - points) + " pts to " + nextLv.name + " " + nextLv.icon))),
        React.createElement("div", { style: { padding: "12px 14px 100px" } },
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { margin: "0 0 12px", background: "#FFFDE7", border: "1px solid #FFE082" }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 6 } }, "How Points Work"),
                React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.8 } }, "• Earn 1 pt per NPR 10 spent\n• Redeem 2 pts = NPR 1 off\n• Max 20% of booking value\n• Works on services and rentals")),
            pHist.length === 0
                ? React.createElement("div", { style: { textAlign: "center", padding: "30px 0", color: C.muted } }, "No points history yet. Book a service to start earning!")
                : pHist.map(h => (React.createElement("div", { key: h.id, style: Object.assign(Object.assign({}, S.card), { margin: "0 0 8px" }) },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: C.text } }, h.reason),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted } }, h.date)),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.green } }, "+" + h.earned + " pts"))))))));
    const renderReferral = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.purple + ",#9C27B0)", padding: "16px 16px 20px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.white } }, "Refer and Earn"),
            React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.8)" } }, "You earn " + fmt(REF_YOU) + " · Friend earns " + fmt(REF_FRIEND))),
        React.createElement("div", { style: { padding: "14px 14px 100px" } },
            myCode && (React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { margin: "0 0 14px", background: C.pbg, border: "1px solid " + C.purple + "33" }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.purple, marginBottom: 8 } }, "Your Referral Code"),
                React.createElement("div", { style: { background: C.white, borderRadius: 10, padding: "10px 16px", fontFamily: "monospace", fontSize: 24, fontWeight: 800, color: C.purple, letterSpacing: 4, textAlign: "center", marginBottom: 8 } }, myCode),
                React.createElement("div", { style: { fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 10 } }, "Share with friends. Both get discount credit!"),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", background: C.purple, padding: 10, borderRadius: 10, fontSize: 12 }), onClick: () => { var _a; try {
                        (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(myCode);
                    }
                    catch (_b) { } push("✅", "Copied!", "Share code with friends!"); } }, "Copy Code"))),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Enter a Friend's Code"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { flex: 1 }), placeholder: "e.g. GS8821", value: codeIn, onChange: e => setCodeIn(e.target.value.toUpperCase()) }),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { flex: "0 0 auto", padding: "10px 14px", borderRadius: 10, fontSize: 12 }), onClick: applyRef }, "Apply")),
                codeMsg && React.createElement("div", { style: { marginTop: 7, fontSize: 12, color: codeMsg.startsWith("✅") ? C.green : C.red, fontWeight: 600 } }, codeMsg)),
            refCr > 0 && React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { margin: "10px 0 0", background: C.pbg, border: "1px solid " + C.purple + "33" }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.purple } }, "Available Credit: " + fmt(refCr)),
                React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 3 } }, "Applied automatically at checkout")))));
    const renderSupport = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px 18px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.white } }, "Customer Support"),
            React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.7)" } }, "Response within 2 hours via SMS")),
        React.createElement("div", { style: { padding: "12px 14px 0" } },
            React.createElement("div", { style: { display: "flex", gap: 7, marginBottom: 12 } }, [["new", "New Ticket"], ["mine", "My Tickets (" + tickets.length + ")"]].map(([id, l]) => (React.createElement("button", { key: id, style: S.tab(suppTab === id), onClick: () => setSuppTab(id) }, l)))),
            suppTab === "new" && (tickSent
                ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0" } },
                    React.createElement("div", { style: { fontSize: 58, marginBottom: 12 } }, "\u2705"),
                    React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.text } }, "Ticket Submitted!"),
                    React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 6 } }, "Response within 2 hours."))
                : React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 } }, SUPP_C.map(c => (React.createElement("div", { key: c.id, style: { padding: 12, border: (tickCat === c.id ? "2px" : "1px") + " solid " + (tickCat === c.id ? C.red : C.border), borderRadius: 12, cursor: "pointer", background: tickCat === c.id ? "#FFF8F8" : C.white, textAlign: "center" }, onClick: () => setTickCat(c.id) },
                        React.createElement("div", { style: { fontSize: 22, marginBottom: 4 } }, c.i),
                        React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: tickCat === c.id ? C.red : C.text } }, c.l))))),
                    React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 80, resize: "vertical", marginBottom: 10 }), placeholder: "Describe your issue...", value: tickDesc, onChange: e => setTickDesc(e.target.value) }),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 11, borderRadius: 12, opacity: tickCat && tickDesc.trim() ? 1 : 0.4 }), onClick: submitTicket }, "Submit Ticket"))),
            suppTab === "mine" && tickets.map(tk => {
                const cat = SUPP_C.find(c => c.id === tk.category);
                return (React.createElement("div", { key: tk.id, style: S.card },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                            React.createElement("span", null, cat === null || cat === void 0 ? void 0 : cat.i),
                            React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, cat === null || cat === void 0 ? void 0 : cat.l)),
                        S.chip(C.al, C.ad, tk.status)),
                    React.createElement("div", { style: { fontSize: 12, color: C.muted } }, tk.description)));
            })),
        React.createElement("div", { style: { height: 80 } })));
    const renderFAQ = () => {
        const faqs = [
            { q: "How do I book a service?", a: "Browse → choose a provider → Book Now → select date/time → enter address → payment → confirm. Done in under 2 minutes!" },
            { q: "Are all providers verified?", a: "Yes! Every provider submits their Citizenship Card and a selfie. Our team manually verifies each one before they go live." },
            { q: "What payment methods are accepted?", a: "We accept eSewa, Khalti, and Cash on Service Day. All digital payments are fully secured." },
            { q: "Can I cancel a booking?", a: "Yes. Cancel 24+ hours before service for a full refund. 6-24 hours: 50% refund. Less than 6 hours: no refund." },
            { q: "How do rentals work?", a: "Tap Rent a Space → browse properties → choose daily/weekly/monthly → select dates → confirm. The host contacts you within 2 hours." },
            { q: "How do loyalty points work?", a: "Earn 1 point per NPR 10 spent. Redeem 2 points = NPR 1 off your next booking. Max 20% discount per booking." },
            { q: "What is the referral program?", a: "Share your referral code. When a friend books their first service, you get NPR 200 credit and they get NPR 100." },
            { q: "How do I raise a dispute?", a: "Go to My Bookings → tap Dispute on a completed booking → describe the issue. Our team reviews within 24 hours." },
            { q: "What areas does GharSewa cover?", a: "Thamel, Baneshwor, New Road, Lalitpur, Bhaktapur, Patan, Koteshwor, Balaju, Chabahil, and Kirtipur. Expanding soon!" },
            { q: "Is there a mobile app?", a: "Open GharSewa in Chrome and tap Add to Home Screen to install it as a PWA app. Android and iOS apps coming soon!" },
        ];
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("more") }, "\u2190"),
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "FAQ")),
            React.createElement("div", { style: { padding: "12px 14px 100px" } }, faqs.map((f, i) => (React.createElement("div", { key: i, style: { background: C.white, borderRadius: 13, marginBottom: 8, border: "1px solid " + (faqOpen === i ? C.red : C.border), overflow: "hidden" } },
                React.createElement("div", { style: { padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }, onClick: () => setFaqOpen(faqOpen === i ? null : i) },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, flex: 1, paddingRight: 10 } }, f.q),
                    React.createElement("span", { style: { fontSize: 14, color: C.red, flexShrink: 0, transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform .2s" } }, "\u25BC")),
                faqOpen === i && React.createElement("div", { style: { padding: "0 16px 13px", fontSize: 12, color: C.muted, lineHeight: 1.7, borderTop: "1px solid " + C.surface } }, f.a)))))));
    };
    const renderSettings = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: S.fhdr },
            React.createElement("button", { style: S.back, onClick: () => setScreen("more") }, "\u2190"),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Settings")),
        React.createElement("div", { style: { padding: "14px 14px 100px" } },
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { margin: "0 0 14px" }) },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, "Profile"),
                    React.createElement("button", { style: { background: "none", border: "1px solid " + C.border, color: C.red, padding: "4px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }, onClick: () => setSettingsMode(v => !v) }, settingsMode ? "Save" : "Edit")),
                [["Full Name", "name"], ["Phone", "phone"], ["Home Address", "address"]].map(([l, k]) => (React.createElement("div", { key: k, style: { marginBottom: 10 } },
                    React.createElement("div", { style: S.lbl }, l),
                    settingsMode
                        ? React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { fontSize: 13 }), value: settingsEdit[k] || "", onChange: e => setSettingsEdit(p => (Object.assign(Object.assign({}, p), { [k]: e.target.value }))) })
                        : React.createElement("div", { style: { fontSize: 13, color: C.text, padding: "8px 0", borderBottom: "1px solid " + C.surface } }, settingsEdit[k] || "Not set")))),
                settingsMode && React.createElement("button", { style: Object.assign(Object.assign({}, S.btnG), { width: "100%", padding: 10, borderRadius: 11, fontSize: 13 }), onClick: () => { setSettingsMode(false); const u = Object.assign(Object.assign({}, user), settingsEdit); setUser(u); ps("g8_user", u); push("✅", "Profile Updated", "Your details have been saved."); } }, "Save Changes")),
            React.createElement("div", { style: { background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: 15, padding: 13 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.red } }, "Sign Out"),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted } }, user === null || user === void 0 ? void 0 : user.name)),
                    React.createElement("button", { style: { background: C.red, border: "none", color: C.white, padding: "7px 14px", borderRadius: 9, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }, onClick: doLogout }, "Logout"))))));
    const renderAbout = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: S.fhdr },
            React.createElement("button", { style: S.back, onClick: () => setScreen("more") }, "\u2190"),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "About GharSewa")),
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "24px 16px 32px", textAlign: "center" } },
            React.createElement("div", { style: { fontSize: 52, marginBottom: 8 } }, "\uD83C\uDFE0"),
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: C.white } }, "GharSewa"),
            React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.75)", marginTop: 6, fontStyle: "italic" } }, "घरको काम, अब एक क्लिकमा")),
        React.createElement("div", { style: { padding: "14px 14px 0" } },
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "About Us"),
                React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.8 } }, "GharSewa is Kathmandu Valley's first verified home services marketplace. We connect homeowners with trusted, ID-verified local service workers — plumbers, electricians, cleaners, and more.")),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Contact"),
                contactSent
                    ? React.createElement("div", { style: { textAlign: "center", padding: "16px 0" } },
                        React.createElement("div", { style: { fontSize: 36, marginBottom: 8 } }, "\u2705"),
                        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text } }, "Message Sent!"))
                    : React.createElement(React.Fragment, null,
                        ["name", "email", "phone"].map(field => (React.createElement("div", { key: field, style: { marginBottom: 10 } },
                            React.createElement("div", { style: S.lbl }, field.charAt(0).toUpperCase() + field.slice(1)),
                            React.createElement("input", { style: S.inp, placeholder: field === "name" ? "Your full name" : field === "email" ? "your@email.com" : "+977 9XXXXXXXXX", value: contactForm[field], onChange: e => setContactForm(f => (Object.assign(Object.assign({}, f), { [field]: e.target.value }))) })))),
                        React.createElement("div", { style: { marginBottom: 12 } },
                            React.createElement("div", { style: S.lbl }, "Message"),
                            React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 80, resize: "vertical" }), placeholder: "How can we help?", value: contactForm.msg, onChange: e => setContactForm(f => (Object.assign(Object.assign({}, f), { msg: e.target.value }))) })),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnR), { width: "100%", padding: 12, borderRadius: 12 }), onClick: () => { setContactSent(true); push("✅", "Message Received", "We will reply within 24 hours."); } }, "Send Message")),
                React.createElement("div", { style: { marginTop: 14, display: "flex", flexDirection: "column", gap: 7 } }, [["📍", "Office", "Thamel, Kathmandu, Nepal"], ["📞", "Phone", "+977 01-XXXXXXX"], ["📧", "Email", "hello@gharsewa.com.np"]].map(([i, l, v]) => (React.createElement("div", { key: l, style: { display: "flex", gap: 8, fontSize: 12 } },
                    React.createElement("span", null, i),
                    React.createElement("span", { style: { color: C.muted, width: 50, flexShrink: 0 } }, l + ":"),
                    React.createElement("span", { style: { color: C.text, fontWeight: 600 } }, v))))))),
        React.createElement("div", { style: { height: 80 } })));
    const renderPlans = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: S.fhdr },
            React.createElement("button", { style: S.back, onClick: () => setScreen("more") }, "\u2190"),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Subscription Plans")),
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.wg + "," + C.wl + ")", padding: "20px 16px 28px", textAlign: "center" } },
            React.createElement("div", { style: { fontSize: 48, marginBottom: 8 } }, "\uD83C\uDFC6"),
            React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.white } }, "Provider Plans"),
            React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 4 } }, "First 3 months FREE for founding providers")),
        React.createElement("div", { style: { padding: "14px 14px 100px" } }, PLANS.map(p => (React.createElement("div", { key: p.id, style: { background: C.white, border: (p.rec ? "2" : "1") + "px solid " + (p.rec ? p.color : C.border), borderRadius: 18, padding: 20, marginBottom: 14, position: "relative" } },
            p.rec && React.createElement("div", { style: { position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: p.color, color: C.white, fontSize: 11, fontWeight: 800, padding: "3px 16px", borderRadius: 20 } }, "MOST POPULAR"),
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: p.color } }, p.name)),
                React.createElement("div", { style: { textAlign: "right" } },
                    React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: C.text } }, fmt(p.price)),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "/month"))),
            React.createElement("div", { style: { borderTop: "1px solid " + C.border, paddingTop: 12, marginBottom: 14 } }, p.features.map(f => (React.createElement("div", { key: f, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13, color: C.text } },
                React.createElement("span", { style: { color: C.green, fontWeight: 800 } }, "✓"),
                f)))),
            (selPlan === null || selPlan === void 0 ? void 0 : selPlan.id) === p.id
                ? React.createElement("div", { style: { background: "#F0FFF4", borderRadius: 12, padding: 12, border: "1px solid " + C.gbr } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 10 } }, "Pay via:"),
                    React.createElement("div", { style: { display: "flex", gap: 8 } }, [["eSewa", "#3E7D44"], ["Khalti", "#5C2D91"]].map(([l, col]) => (React.createElement("button", { key: l, style: { flex: 1, background: col, border: "none", color: C.white, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }, onClick: () => { try { const subs = JSON.parse(localStorage.getItem("g8_admin_customer_subscriptions") || "[]"); const sub = { id: "SUB-" + Date.now(), customer: (user && user.name) || form.name || "Customer", phone: (user && user.phone) || form.phone, plan: p.id, planName: p.name, amount: p.price, gateway: l, status: "active", expires: addDaysISO(30), createdAt: new Date().toISOString() }; localStorage.setItem("g8_admin_customer_subscriptions", JSON.stringify([sub, ...subs.filter(x => x.phone !== sub.phone)])); } catch(e) {} setSelPlan(null); push("✅", "Plan Activated!", p.name + " plan is now active."); } }, "Pay " + l)))))
                : React.createElement("button", { style: { background: p.color, border: "none", color: C.white, width: "100%", padding: "13px 0", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }, onClick: () => setSelPlan(p) }, "Get " + p.name + " — " + fmt(p.price) + "/mo")))))));
    const renderDocUpload = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: S.fhdr },
            React.createElement("button", { style: S.back, onClick: () => setScreen("more") }, "\u2190"),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text } }, "Document Upload")),
        React.createElement("div", { style: { padding: "14px 14px 0" } },
            React.createElement("div", { style: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 12, padding: 12, marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 4 } }, "Verification Required"),
                React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Documents securely stored. Verification takes 24-48 hours. SMS notification on approval.")),
            [{ key: "citizenship", icon: "🪪", title: "Citizenship Card", sub: "Front + Back photo required" }, { key: "selfie", icon: "🤳", title: "Selfie / Face Photo", sub: "Clear photo holding your ID" }].map(doc => (React.createElement("div", { key: doc.key, style: { background: uploadedDocs[doc.key] ? "#F0FFF4" : C.white, border: (uploadedDocs[doc.key] ? "2" : "1") + "px solid " + (uploadedDocs[doc.key] ? C.green : C.border), borderRadius: 16, padding: 16, marginBottom: 12 } },
                React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 10 } },
                    React.createElement("div", { style: { width: 48, height: 48, background: uploadedDocs[doc.key] ? C.gbg : C.surface, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 } }, uploadedDocs[doc.key] ? "✅" : doc.icon),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, doc.title),
                        React.createElement("div", { style: { fontSize: 11, color: C.muted } }, doc.sub))),
                React.createElement("div", { style: { border: "2px dashed " + (uploadedDocs[doc.key] ? C.green : C.border), borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", background: uploadedDocs[doc.key] ? "#F0FFF4" : "#FAFAFA" }, onClick: () => setUploadedDocs(d => (Object.assign(Object.assign({}, d), { [doc.key]: true }))) }, uploadedDocs[doc.key]
                    ? React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 24, marginBottom: 4 } }, "\u2705"),
                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.green } }, "Uploaded Successfully"))
                    : React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 24, marginBottom: 4 } }, "\uD83D\uDCE4"),
                        React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "Tap to upload"),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 2 } }, "JPG, PNG \u2014 max 5MB")))))),
            React.createElement("div", { style: { background: C.white, border: "1px solid " + C.border, borderRadius: 16, padding: 16, marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 } }, "Portfolio Photos (Optional)"),
                React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 } },
                    uploadedDocs.portfolio.map((_, i) => (React.createElement("div", { key: i, style: { width: 64, height: 64, background: C.gbg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, position: "relative" } },
                        "🖼️",
                        React.createElement("button", { style: { position: "absolute", top: -4, right: -4, background: C.red, border: "none", color: C.white, width: 18, height: 18, borderRadius: 9, fontSize: 10, cursor: "pointer" }, onClick: () => setUploadedDocs(d => (Object.assign(Object.assign({}, d), { portfolio: d.portfolio.filter((_, j) => j !== i) }))) }, "✕")))),
                    uploadedDocs.portfolio.length < 6 && (React.createElement("div", { style: { width: 64, height: 64, border: "2px dashed " + C.border, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 24, color: C.muted }, onClick: () => setUploadedDocs(d => (Object.assign(Object.assign({}, d), { portfolio: [...d.portfolio, "photo"] }))) }, "+")))),
            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnG), { width: "100%", padding: 13, borderRadius: 12, fontSize: 14, opacity: uploadedDocs.citizenship && uploadedDocs.selfie ? 1 : 0.4 }), onClick: () => { if (uploadedDocs.citizenship && uploadedDocs.selfie) {
                    push("📄", "Documents Submitted", "Under review — expect SMS in 24 hrs.");
                    setScreen("more");
                } } }, uploadedDocs.citizenship && uploadedDocs.selfie ? "Submit for Verification" : "Upload Required Documents First")),
        React.createElement("div", { style: { height: 80 } })));
    const renderMore = () => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "14px 16px 18px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.white } }, "More")),
        React.createElement("div", { style: { padding: 14 } },
            [
                { icon: "🌟", l: "Rewards and Points", sub: points + " pts · " + lv.name + " " + lv.icon, sc: "loyalty", col: lv.color },
                { icon: "🎁", l: "Refer and Earn", sub: "Earn " + fmt(REF_YOU) + " per referral", sc: "referral", col: C.purple },
                { icon: "⚙️", l: "Settings", sub: "Profile, notifications, language", sc: "settings", col: C.blue },
                { icon: "📋", l: "Subscription Plans", sub: "For service providers", sc: "plans", col: C.wg },
                { icon: "📄", l: "Upload Documents", sub: "For provider verification", sc: "docupload", col: C.blue },
                { icon: "🎧", l: "Customer Support", sub: tickets.length + " open ticket(s)", sc: "support", col: C.red },
                { icon: "❓", l: "FAQ", sub: "Help and frequently asked questions", sc: "faq", col: C.purple },
                { icon: "ℹ️", l: "About and Contact", sub: "GharSewa info and contact us", sc: "about", col: C.red },
            ].map(item => (React.createElement("div", { key: item.sc, style: { background: C.white, borderRadius: 15, padding: 13, marginBottom: 8, border: "1px solid " + C.border, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }, onClick: () => setScreen(item.sc) },
                React.createElement("div", { style: { width: 42, height: 42, borderRadius: 12, background: item.col + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 } }, item.icon),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, item.l),
                    React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 1 } }, item.sub)),
                React.createElement("span", { style: { color: C.muted, fontSize: 18 } }, "›")))),
            React.createElement("div", { style: { background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: 15, padding: 13 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.red } }, "Sign Out"),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted } }, (user === null || user === void 0 ? void 0 : user.name) + " · " + (user === null || user === void 0 ? void 0 : user.phone))),
                    React.createElement("button", { style: { background: C.red, border: "none", color: C.white, padding: "7px 14px", borderRadius: 9, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }, onClick: doLogout }, "Logout")))),
        React.createElement("div", { style: { height: 80 } })));
    const renderRentalDetail = () => {
        if (!selR)
            return null;
        const area = AREAS.find(a => a.id === selR.area);
        const rtype = RTYPES.find(t => t.id === selR.type);
        const isSaved = !!savedR.find(s => s.id === selR.id);
        const amenCount = selR.amen ? selR.amen.length : 0;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("home") }, "\u2190"),
                React.createElement("div", { style: { flex: 1, fontSize: 14, fontWeight: 700, color: C.text } }, "Property Details"),
                React.createElement("button", { style: { background: "none", border: "none", fontSize: 20, cursor: "pointer" }, onClick: () => toggleSaveR(selR) }, isSaved ? "❤️" : "🤍")),
            React.createElement("div", { style: { background: "linear-gradient(135deg," + C.ad + ",#1976D2)", height: 150, display: "flex", alignItems: "center", justifyContent: "center" } },
                React.createElement("span", { style: { fontSize: 70 } }, selR.img)),
            React.createElement("div", { style: { margin: "-18px 14px 12px", background: C.white, borderRadius: 18, padding: 18, boxShadow: "0 4px 20px rgba(0,0,0,.1)", border: "1px solid " + C.abr } },
                React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 } }, selR.title),
                React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 10 } }, "📍 " + selR.addr),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-around", borderTop: "1px solid " + C.surface, paddingTop: 12 } }, [[selR.bd > 0 ? selR.bd + " BHK" : "Studio", "Beds"], [selR.ba + " Bath", "Bathrooms"], [selR.sqft + " sqft", "Area"]].map(([v, l]) => (React.createElement("div", { key: l, style: { textAlign: "center" } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.ad } }, v),
                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, l)))))),
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Pricing"),
                [["Per Night", fmt(selR.dR)], ["Per Week", fmt(selR.wR)], ["Per Month", fmt(selR.mR)]].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                    React.createElement("span", { style: { color: C.muted } }, k),
                    React.createElement("span", { style: { fontWeight: 700, color: C.ad } }, v))))),
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 } }, "About"),
                React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.7 } }, selR.desc)),
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10 } }, "Amenities (" + amenCount + ")"),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 } }, selR.amen.map(a => (React.createElement("div", { key: a, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.text } },
                    React.createElement("span", { style: { color: C.green, fontWeight: 800 } }, "✓"),
                    a))))),
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 } }, "House Rules"),
                selR.rules.map((rule, i) => (React.createElement("div", { key: i, style: { fontSize: 11, color: C.muted, marginBottom: 5, display: "flex", gap: 7 } },
                    React.createElement("span", { style: { color: C.orange } }, "•"),
                    rule)))),
            React.createElement("div", { style: Object.assign(Object.assign({}, S.card), { border: "1px solid " + C.abr }) },
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 } }, "Host"),
                React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } },
                    React.createElement("div", { style: { width: 40, height: 40, background: C.al, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 } }, "\uD83D\uDC64"),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, selR.host),
                        selR.vrf && React.createElement("span", { style: { fontSize: 9, background: C.gbg, color: C.green, fontWeight: 700, padding: "1px 7px", borderRadius: 8 } }, "✓ Verified Host")))),
            React.createElement("div", { style: { padding: "0 14px 100px" } },
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { width: "100%", padding: "13px 0", borderRadius: 12, fontSize: 14, opacity: selR.avail ? 1 : 0.5 }), onClick: () => { if (selR.avail) {
                        setRbStep(1);
                        setRbDur(rdur);
                        setScreen("rentalBook");
                    } } }, selR.avail ? "Reserve This Property" : "Currently Unavailable"))));
    };
    const renderRentalBook = () => {
        if (!selR)
            return null;
        const rv = rRateV(selR, rbDur);
        const base = rv * rbQty;
        const final = Math.max(0, base - rPromoDisc);
        const durL = rbDur === "daily" ? "night(s)" : rbDur === "weekly" ? "week(s)" : "month(s)";
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: S.fhdr },
                React.createElement("button", { style: S.back, onClick: () => setScreen("rentalDetail") }, "\u2190"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text } }, "Reserve Property"),
                    React.createElement("div", { style: { fontSize: 10, color: C.muted } }, selR.title))),
            React.createElement("div", { style: { display: "flex", gap: 5, padding: "10px 16px 0" } }, [1, 2, 3, 4].map(n => React.createElement("div", { key: n, style: S.bstep(n <= rbStep) }))),
            rbStep === 1 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.ad, marginBottom: 12 } }, "Duration"),
                RDURS.map(d => (React.createElement("div", { key: d.id, style: S.ob(rbDur === d.id), onClick: () => setRbDur(d.id) },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, d.label),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted } }, rRateL(selR, d.id))),
                    rbDur === d.id && React.createElement("span", { style: { color: C.ad, fontWeight: 800 } }, "✓")))),
                React.createElement("div", { style: { background: C.al, borderRadius: 13, padding: 13, border: "1px solid " + C.abr, marginTop: 4 } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.ad, marginBottom: 10 } }, "How many " + (rbDur === "daily" ? "nights" : rbDur === "weekly" ? "weeks" : "months") + "?"),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, justifyContent: "center" } },
                        React.createElement("button", { style: { width: 38, height: 38, borderRadius: 19, background: C.ad, border: "none", color: C.white, fontSize: 18, cursor: "pointer" }, onClick: () => setRbQty(q => Math.max(1, q - 1)) }, "−"),
                        React.createElement("div", { style: { fontSize: 26, fontWeight: 800, color: C.ad, minWidth: 48, textAlign: "center" } }, rbQty),
                        React.createElement("button", { style: { width: 38, height: 38, borderRadius: 19, background: C.ad, border: "none", color: C.white, fontSize: 18, cursor: "pointer" }, onClick: () => setRbQty(q => q + 1) }, "+")),
                    React.createElement("div", { style: { textAlign: "center", fontSize: 11, color: C.muted, marginTop: 6 } }, rbQty + " " + durL + " · " + fmt(base) + " total")),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 } },
                    React.createElement("div", null,
                        React.createElement("div", { style: S.lbl }, "Check-In"),
                        React.createElement("input", { type: "date", style: S.inp, value: rbIn, onChange: e => setRbIn(e.target.value), min: new Date().toISOString().split("T")[0] })),
                    React.createElement("div", null,
                        React.createElement("div", { style: S.lbl }, "Check-Out"),
                        React.createElement("input", { type: "date", style: S.inp, value: rbOut, onChange: e => setRbOut(e.target.value), min: rbIn || new Date().toISOString().split("T")[0] }))),
                React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { width: "100%", padding: 11, borderRadius: 12, marginTop: 12, opacity: rbIn && rbQty > 0 ? 1 : 0.5 }), onClick: () => rbIn && rbQty > 0 && setRbStep(2) }, "Next"))),
            rbStep === 2 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.ad, marginBottom: 12 } }, "Your Information"),
                React.createElement("div", { style: S.lbl }, "Full Name"),
                React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), value: (user === null || user === void 0 ? void 0 : user.name) || "", readOnly: true }),
                React.createElement("div", { style: S.lbl }, "Phone"),
                React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), value: "+977-" + ((user === null || user === void 0 ? void 0 : user.phone) || ""), readOnly: true }),
                React.createElement("div", { style: S.lbl }, "Special Requests"),
                React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 70, resize: "vertical", marginBottom: 12 }), placeholder: "Early check-in, parking...", value: rbNote, onChange: e => setRbNote(e.target.value) }),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setRbStep(1) }, "←"),
                    React.createElement("button", { style: S.btnB, onClick: () => setRbStep(3) }, "Next")))),
            rbStep === 3 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.ad, marginBottom: 12 } }, "Payment"),
                [["esewa", "eSewa", "🟢"], ["khalti", "Khalti", "🟣"], ["cash", "Cash / Bank Transfer", "💵"]].map(([id, l, ic]) => (React.createElement("div", { key: id, style: S.ob(rbPay === id), onClick: () => setRbPay(id) },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("span", null, ic),
                        React.createElement("span", { style: { fontWeight: 600 } }, l)),
                    rbPay === id && React.createElement("span", { style: { color: C.ad } }, "✓")))),
                React.createElement("div", { style: { background: C.al, border: "1px solid " + C.abr, borderRadius: 11, padding: 10, marginTop: 4 } },
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.ad, marginBottom: 7 } }, "Promo Code"),
                    React.createElement("div", { style: { display: "flex", gap: 7 } },
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { flex: 1, fontSize: 12, padding: "7px 10px" }), placeholder: "RENT500, VILLA1000, WELCOME100", value: rPromo, onChange: e => setRPromo(e.target.value.toUpperCase()) }),
                        React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { flex: "0 0 auto", padding: "7px 12px", borderRadius: 9, fontSize: 11 }), onClick: applyRPromo }, "Apply")),
                    rPromoMsg && React.createElement("div", { style: { marginTop: 5, fontSize: 11, color: rPromoMsg.startsWith("✅") ? C.green : C.red, fontWeight: 600 } }, rPromoMsg)),
                React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setRbStep(2) }, "←"),
                    React.createElement("button", { style: S.btnB, onClick: () => setRbStep(4) }, "Next")))),
            rbStep === 4 && (React.createElement("div", { style: S.sc },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.ad, marginBottom: 12 } }, "Confirm Reservation"),
                React.createElement("div", { style: { background: C.al, borderRadius: 12, padding: 12, marginBottom: 12, border: "1px solid " + C.abr, display: "flex", gap: 12, alignItems: "center" } },
                    React.createElement("span", { style: { fontSize: 34 } }, selR.img),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.text } }, selR.title),
                        React.createElement("div", { style: { fontSize: 10, color: C.muted } }, "📍 " + aName(selR.area)))),
                [["Check-In", rbIn || "—"], ["Check-Out", rbOut || "—"], ["Duration", rbQty + " " + durL], ["Payment", rbPay.toUpperCase()], ["Base Rate", fmt(rv) + " x " + rbQty], ...(rPromoDisc > 0 ? [["Promo", "-" + fmt(rPromoDisc)]] : []), ["Total", fmt(final)]].map(([k, v]) => (React.createElement("div", { key: k, style: S.row },
                    React.createElement("span", { style: { color: C.muted } }, k),
                    React.createElement("span", { style: { fontWeight: k === "Total" ? 800 : 600, color: k === "Total" ? C.ad : k === "Promo" ? C.green : C.text } }, v)))),
                React.createElement("div", { style: { background: "#F0F7FF", borderRadius: 9, padding: "7px 11px", fontSize: 11, color: C.ad, margin: "8px 0" } }, "Earn " + Math.floor(final * PPR) + " loyalty points!"),
                React.createElement("div", { style: { background: "#FFF8F0", borderRadius: 9, padding: "7px 11px", fontSize: 11, color: C.orange, marginBottom: 12 } }, "Full refund if cancelled 48h+ before check-in"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { style: S.btnS, onClick: () => setRbStep(3) }, "←"),
                    React.createElement("button", { style: Object.assign(Object.assign({}, S.btnB), { flex: 2, padding: 11, borderRadius: 11 }), onClick: confirmRental }, "Confirm and Pay")))),
            React.createElement("div", { style: { height: 100 } })));
    };
    const renderRentalOk = () => {
        var _a;
        return (React.createElement("div", { style: { textAlign: "center", padding: "60px 24px" } },
            React.createElement("div", { style: { fontSize: 68, marginBottom: 14 } }, "\uD83C\uDFE0"),
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8 } }, "Reservation Confirmed!"),
            React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 22 } }, "SMS sent. Host will contact you within 2 hours."),
            React.createElement("div", { style: { background: C.al, border: "1px solid " + C.abr, borderRadius: 18, padding: 18, marginBottom: 20, display: "inline-block" } },
                React.createElement("div", { style: { fontSize: 32, fontWeight: 800, color: C.ad } }, "+" + Math.floor((((_a = rentalBks[0]) === null || _a === void 0 ? void 0 : _a.amount) || 0) * PPR) + " pts"),
                React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Loyalty points earned!")),
            React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Redirecting to dashboard...")));
    };
    // ── ONBOARDING ──────────────────────────────────────────────────
    if (appState === "admin")
        return React.createElement(AdminShell, { onLogout: doLogout });
    if (appState === "worker")
        return React.createElement(WorkerShell, { workerData: workerData, onLogout: doLogout, lang: lang, setLang: setLang });
    if (appState === "loading")
        return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } },
            React.createElement("div", { style: { fontSize: 62, marginBottom: 14 } }, "\uD83C\uDFE0"),
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: C.white } }, "GharSewa"),
            React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 5 } }, "Loading...")));
    if (appState === "onboarding") {
        const authAccent = role === "worker" ? "#16A34A" : role === "admin" ? "#5B3FD6" : C.orange;
        const authSoft = role === "worker" ? "#ECFDF3" : role === "admin" ? "#F3F0FF" : "#FFF4EC";
        const inputWrap = { display: "flex", alignItems: "center", gap: 10, border: "1px solid #E5E7EB", background: C.white, borderRadius: 12, padding: "0 12px", height: 46, marginBottom: 12 };
        const cleanInput = { border: "none", outline: "none", flex: 1, fontSize: 14, fontFamily: "inherit", background: "transparent", color: C.text };
        const authBtn = { width: "100%", border: "none", borderRadius: 13, padding: "14px 0", background: "linear-gradient(135deg,#FF6A00,#F04B16)", color: C.white, fontWeight: 900, fontSize: 15, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 10px 22px rgba(255,88,20,.22)" };
        const roleTabs = () => React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 18, background: C.white } },
            [["customer", "👤", "Customer", C.orange], ["worker", "👷", "Worker", "#16A34A"], ["admin", "🛡️", "Admin", "#5B3FD6"]].map(([id, ic, label, col]) => React.createElement("button", { key: id, style: { border: "none", borderRight: id !== "admin" ? "1px solid #E5E7EB" : "none", background: role === id ? (id === "customer" ? "#FFF4EC" : id === "worker" ? "#ECFDF3" : "#F3F0FF") : C.white, padding: "12px 4px", color: role === id ? col : C.text, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }, onClick: () => { setRole(id); setForm(f => (Object.assign(Object.assign({}, f), { otpSent: false, otp: "" }))); } },
                React.createElement("div", { style: { fontSize: 18, marginBottom: 3 } }, ic), label)));
        const openAuth = (r, mode) => { setRole(r); setAuthMode(mode); setObStep(3); setForm(f => (Object.assign(Object.assign({}, f), { otpSent: false, otp: "" }))); };
        if (obStep === 1)
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "linear-gradient(150deg," + C.red + "," + C.redL + "," + C.orange + ")", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" } },
                React.createElement("div", { style: { position: "absolute", top: 16, right: 16 } }, React.createElement(LanguageToggle, { lang: lang, setLang: setLang })),
                React.createElement("div", { style: { fontSize: 78, marginBottom: 18 } }, "\uD83C\uDFE0"),
                React.createElement("div", { style: { fontSize: 34, fontWeight: 800, color: C.white, lineHeight: 1.2, marginBottom: 8 } }, "GharSewa"),
                React.createElement("div", { style: { fontSize: 16, color: "rgba(255,255,255,.9)", fontWeight: 700, marginBottom: 4 } }, "घरसेवा"),
                React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.7)", marginBottom: 30 } }, "41 Services \u00B7 10 Rentals \u00B7 Kathmandu Valley"),
                React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" } }, [["41", "Services"], ["10", "Rentals"], ["10+", "Workers"], ["4.8★", "Rating"]].map(([v, l]) => (React.createElement("div", { key: l, style: { background: "rgba(255,255,255,.2)", borderRadius: 13, padding: "9px 15px", textAlign: "center", minWidth: 68 } },
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: C.white } }, v),
                    React.createElement("div", { style: { fontSize: 9, color: "rgba(255,255,255,.75)" } }, l))))),
                React.createElement("button", { style: { background: C.white, border: "none", color: C.red, padding: "14px 48px", borderRadius: 15, fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", width: "100%", maxWidth: 340 }, onClick: () => setObStep(2) }, "Get Started")));
        if (obStep === 2)
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.cream } },
                React.createElement("div", { style: { background: "linear-gradient(135deg," + C.red + "," + C.redL + ")", padding: "22px 20px 26px" } },
                    React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.7)", marginBottom: 7, fontWeight: 600, textTransform: "uppercase" } }, "Step 1 of 3"),
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 } },
                        React.createElement("div", { style: { fontSize: 21, fontWeight: 800, color: C.white } }, "Who are you?"),
                        React.createElement(LanguageToggle, { lang: lang, setLang: setLang }))),
                React.createElement("div", { style: { padding: "20px 20px 0" } },
                    [
                        ["customer", "🏠", "Customer", "Book 47 services, rent homes, earn rewards.", ["Book instantly", "Rent rooms/villas", "Pay eSewa/Khalti", "Earn loyalty pts"], "#B71C1C"],
                        ["worker", "👷", "Service Worker", "Offer services, receive bookings, earn money.", ["Get ID-verified", "Unlimited bookings", "Earnings dashboard", "3 months FREE"], "#2D6A4F"],
                        ["admin", "🛡️", "Admin", "Manage the entire GharSewa platform.", ["Verify providers", "All bookings", "Revenue dashboard", "Disputes and promo"], "#0D47A1"],
                    ].map(([id, ic, title, desc, feats, col]) => (React.createElement("div", { key: id, style: { background: role === id ? "#FFF8F8" : C.white, border: (role === id ? "2" : "1") + "px solid " + (role === id ? col : C.border), borderRadius: 18, padding: 16, marginBottom: 12, cursor: "pointer" }, onClick: () => setRole(id) },
                        React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" } },
                            React.createElement("div", { style: { width: 48, height: 48, background: col + "18", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 } }, ic),
                            React.createElement("div", { style: { flex: 1 } },
                                React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 3 } }, title),
                                React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 8 } }, desc),
                                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4 } }, feats.map(f => React.createElement("span", { key: f, style: { fontSize: 9, background: col + "18", color: col, border: "1px solid " + col + "33", padding: "2px 7px", borderRadius: 9, fontWeight: 600 } }, f)))),
                            React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", border: "2px solid " + (role === id ? col : C.border), background: role === id ? col : "transparent", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" } }, role === id && React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: C.white } })))))),
                    React.createElement("button", { style: { background: role ? C.red : "#D1D5DB", border: "none", color: C.white, padding: "13px 0", borderRadius: 13, fontSize: 15, fontWeight: 800, cursor: role ? "pointer" : "not-allowed", fontFamily: "inherit", width: "100%" }, onClick: () => { if(role){ setAuthMode("signup"); setObStep(3); } } }, "Continue"),
                    React.createElement("button", { style: { marginTop: 10, background: C.white, border: "1px solid " + C.border, color: C.wg, padding: "12px 0", borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", width: "100%" }, onClick: () => { setRole("worker"); setAuthMode("login"); setObStep(3); } }, "Approved Worker? Login with Email"))));
        if (obStep === 3)
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#FAFAFA", padding: "20px 18px", boxSizing: "border-box" } },
                React.createElement("button", { style: { border: "none", background: "transparent", fontSize: 28, cursor: "pointer", marginBottom: 20, color: C.text }, onClick: () => setObStep(1) }, "‹"),
                React.createElement("div", { style: { background: C.white, border: "1px solid #ECECEC", borderRadius: 22, padding: "24px 22px", boxShadow: "0 10px 32px rgba(0,0,0,.06)" } },
                    React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } },
                        React.createElement("div", { style: { fontSize: 28, fontWeight: 950, color: C.text } }, role === "admin" ? "Admin Access" : authMode === "login" ? "Welcome Back!" : "Create Account"),
                        React.createElement("div", { style: { fontSize: 13, color: C.muted, marginTop: 5 } }, role === "admin" ? "Manage the GharSewa platform" : authMode === "login" ? "Login to your GharSewa account" : "Join GharSewa today")),
                    roleTabs(),
                    role !== "admin" && React.createElement("div", { style: { display: "flex", background: "#F5F5F5", borderRadius: 12, padding: 4, marginBottom: 16 } },
                        React.createElement("button", { style: { flex: 1, border: "none", borderRadius: 9, padding: "10px 0", background: authMode === "login" ? C.white : "transparent", color: authMode === "login" ? authAccent : C.muted, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", boxShadow: authMode === "login" ? "0 3px 12px rgba(0,0,0,.06)" : "none" }, onClick: () => setAuthMode("login") }, "Login"),
                        React.createElement("button", { style: { flex: 1, border: "none", borderRadius: 9, padding: "10px 0", background: authMode === "signup" ? C.white : "transparent", color: authMode === "signup" ? authAccent : C.muted, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", boxShadow: authMode === "signup" ? "0 3px 12px rgba(0,0,0,.06)" : "none" }, onClick: () => setAuthMode("signup") }, "Sign up")),
                    role === "admin" ? React.createElement("div", null,
                        React.createElement("div", { style: { textAlign: "center", fontSize: 44, marginBottom: 12 } }, "🛡️"),
                        React.createElement("div", { style: inputWrap }, React.createElement("span", null, "🔐"), React.createElement("input", { style: Object.assign(Object.assign({}, cleanInput), { textAlign: "center", letterSpacing: 5, fontWeight: 900 }), placeholder: "ADMIN123", type: "password", value: form.otp, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { otp: e.target.value }))) })),
                        React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 14, textAlign: "center" } }, "Demo code: ADMIN123"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, authBtn), { background: form.otp === "ADMIN123" ? "linear-gradient(135deg,#6554F0,#5B3FD6)" : "#D1D5DB" }), onClick: () => form.otp === "ADMIN123" && doAdmin() }, "Enter Admin Panel")) : role === "worker" && authMode === "login" ? React.createElement("div", null,
                        React.createElement("div", { style: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 12, padding: 11, color: C.orange, fontSize: 12, marginBottom: 14, lineHeight: 1.45 } }, "Only admin-approved workers can login."),
                        React.createElement("label", { style: S.lbl }, "Email Address"),
                        React.createElement("div", { style: inputWrap }, React.createElement("span", null, "✉️"), React.createElement("input", { style: cleanInput, type: "email", placeholder: "worker@email.com", value: form.email, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { email: e.target.value }))) })),
                        React.createElement("label", { style: S.lbl }, "Password"),
                        React.createElement("div", { style: inputWrap }, React.createElement("span", null, "🔒"), React.createElement("input", { style: cleanInput, type: "password", placeholder: "Password", value: form.password, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { password: e.target.value }))) }), React.createElement("span", { style: { color: C.muted } }, "👁")),
                        React.createElement("button", { style: Object.assign(Object.assign({}, authBtn), { background: form.email && form.password ? "linear-gradient(135deg,#22C55E,#16A34A)" : "#D1D5DB" }), onClick: () => form.email && form.password && doWorkerLogin() }, "Login"),
                        React.createElement("div", { style: { textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted } }, "Don’t have an account? ", React.createElement("button", { style: { border: "none", background: "transparent", color: "#16A34A", fontWeight: 900, cursor: "pointer" }, onClick: () => setAuthMode("signup") }, "Sign up"))) : React.createElement("div", null,
                        authMode === "signup" && React.createElement(React.Fragment, null,
                            React.createElement("label", { style: S.lbl }, "Full Name"),
                            React.createElement("div", { style: inputWrap }, React.createElement("span", null, "👤"), React.createElement("input", { style: cleanInput, placeholder: "Your full name", value: form.name, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { name: e.target.value }))) }))),
                        React.createElement("label", { style: S.lbl }, role === "worker" ? "Phone Number" : "Phone Number"),
                        React.createElement("div", { style: inputWrap }, React.createElement("span", null, "📞"), React.createElement("input", { style: cleanInput, placeholder: "98XXXXXXXX", value: form.phone, maxLength: 10, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { phone: e.target.value }))) })),
                        role === "worker" && React.createElement(React.Fragment, null,
                            React.createElement("label", { style: S.lbl }, "Email Address"),
                            React.createElement("div", { style: inputWrap }, React.createElement("span", null, "✉️"), React.createElement("input", { style: cleanInput, type: "email", placeholder: "worker@email.com", value: form.email, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { email: e.target.value }))) }))),
                        authMode === "signup" && role === "customer" && React.createElement(React.Fragment, null,
                            React.createElement("label", { style: S.lbl }, "Location"),
                            React.createElement("div", { style: inputWrap }, React.createElement("span", null, "📍"), React.createElement("select", { style: cleanInput, defaultValue: "Kathmandu Valley" }, React.createElement("option", null, "Kathmandu Valley"), React.createElement("option", null, "Lalitpur"), React.createElement("option", null, "Bhaktapur"), React.createElement("option", null, "Pokhara"))))),
                        React.createElement("label", { style: S.lbl }, authMode === "signup" ? "Password" : "Password"),
                        React.createElement("div", { style: inputWrap }, React.createElement("span", null, "🔒"), React.createElement("input", { style: cleanInput, type: "password", placeholder: authMode === "signup" ? "Create a password" : "••••••••", value: form.password, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { password: e.target.value }))) }), React.createElement("span", { style: { color: C.muted } }, "👁")),
                        authMode === "signup" && React.createElement(React.Fragment, null,
                            React.createElement("label", { style: S.lbl }, "Confirm Password"),
                            React.createElement("div", { style: inputWrap }, React.createElement("span", null, "🔒"), React.createElement("input", { style: cleanInput, type: "password", placeholder: "Confirm your password" }))),
                        role === "worker" && authMode === "signup" && React.createElement("div", { style: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 12, padding: 11, color: C.orange, fontSize: 12, marginBottom: 14, lineHeight: 1.45 } }, "After signup, admin must approve your account. Only approved workers can login."),
                        authMode === "login" && role === "customer" && React.createElement("button", { style: { border: "none", background: "transparent", color: C.orange, fontWeight: 800, fontSize: 12, margin: "-3px 0 14px auto", display: "block", cursor: "pointer" } }, "Forgot password?"),
                        React.createElement("button", { style: Object.assign(Object.assign({}, authBtn), { background: ((authMode === "login" || form.name) && form.phone.length >= 8 && (role !== "worker" || (form.email && form.password.length >= 6))) ? (role === "worker" ? "linear-gradient(135deg,#22C55E,#16A34A)" : "linear-gradient(135deg,#FF6A00,#F04B16)") : "#D1D5DB" }), onClick: () => { if (!((authMode === "login" || form.name) && form.phone.length >= 8 && (role !== "worker" || (form.email && form.password.length >= 6)))) return; if (role === "worker") { authMode === "signup" ? setObStep(4) : doWorkerLogin(); } else { authMode === "login" ? doCustomer() : setObStep(5); } } }, authMode === "login" ? "Login" : "Sign Up"),
                        role === "customer" && React.createElement(React.Fragment, null,
                            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, margin: "18px 0 14px" } }, React.createElement("div", { style: { height: 1, background: "#E5E7EB", flex: 1 } }), React.createElement("span", { style: { color: C.muted, fontSize: 13 } }, "or"), React.createElement("div", { style: { height: 1, background: "#E5E7EB", flex: 1 } })),
                            React.createElement("button", { style: { width: "100%", border: "1px solid #E5E7EB", background: C.white, borderRadius: 12, padding: "12px 0", fontWeight: 800, color: C.text, fontFamily: "inherit" } }, "🌐  Continue with Google")),
                        React.createElement("div", { style: { textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted } }, authMode === "login" ? "Don’t have an account? " : "Already have an account? ", React.createElement("button", { style: { border: "none", background: "transparent", color: authAccent, fontWeight: 900, cursor: "pointer" }, onClick: () => setAuthMode(authMode === "login" ? "signup" : "login") }, authMode === "login" ? "Sign up" : "Login")))));
        if (obStep === 4 && role === "worker") {
            const ws = wForm.step;
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.cream } },
                React.createElement("div", { style: { background: "linear-gradient(135deg," + C.wg + "," + C.wl + ")", padding: "18px 20px 22px" } },
                    React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.7)", marginBottom: 7, fontWeight: 600, textTransform: "uppercase" } }, "Step 3 of 4 \u2014 Worker Setup"),
                    React.createElement("div", { style: { display: "flex", gap: 5, marginBottom: 8 } }, [1, 2, 3, 4].map(n => React.createElement("div", { key: n, style: { flex: 1, height: 4, borderRadius: 2, background: n <= ws ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.3)" } }))),
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 } },
                        React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: C.white } }, ws === 1 ? "Choose Service" : ws === 2 ? "Area and Rate" : ws === 3 ? "Upload Docs" : "Choose Plan"),
                        React.createElement(LanguageToggle, { lang: lang, setLang: setLang }))),
                React.createElement("div", { style: { padding: "16px 20px 0" } },
                    ws === 1 && (React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 6 } }, "Select one or more services you can offer:"),
                        React.createElement("div", { style: { background: "#F0FFF4", border: "1px solid " + C.gbr, borderRadius: 10, padding: "7px 12px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" } },
                            React.createElement("span", { style: { fontSize: 12, color: C.wg, fontWeight: 700 } }, wForm.svcs.length === 0 ? "No services selected yet" : wForm.svcs.length + " service(s) selected"),
                            wForm.svcs.length > 0 && React.createElement("button", { style: { background: "none", border: "none", color: C.muted, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }, onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { svcs: [] }))) }, "Clear all")),
                        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, maxHeight: 360, overflowY: "auto", marginBottom: 12 } }, SERVICES.map(s => {
                            const selected = wForm.svcs.includes(s.id);
                            return (React.createElement("div", { key: s.id, style: { background: selected ? "#EFF8F3" : C.white, border: (selected ? "2" : "1") + "px solid " + (selected ? C.wl : C.border), borderRadius: 11, padding: 9, cursor: "pointer", textAlign: "center", position: "relative" }, onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { svcs: selected ? f.svcs.filter(x => x !== s.id) : [...f.svcs, s.id] }))) },
                                selected && React.createElement("div", { style: { position: "absolute", top: 4, right: 6, fontSize: 11, fontWeight: 800, color: C.wl } }, "✓"),
                                React.createElement("div", { style: { fontSize: 18, marginBottom: 2 } }, s.icon),
                                React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: C.text, lineHeight: 1.3 } }, s.label),
                                React.createElement("div", { style: { fontSize: 9, color: C.muted } }, s.labelNe)));
                        })),
                        React.createElement("button", { style: { background: wForm.svcs.length > 0 ? C.wg : "#D1D5DB", border: "none", color: C.white, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: wForm.svcs.length > 0 ? "pointer" : "not-allowed", fontFamily: "inherit", width: "100%" }, onClick: () => wForm.svcs.length > 0 && setWForm(f => (Object.assign(Object.assign({}, f), { step: 2 }))) }, "Next — " + wForm.svcs.length + " service(s) selected"))),
                    ws === 2 && (React.createElement(React.Fragment, null,
                        React.createElement("div", { style: S.lbl }, "Service Area"),
                        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 } }, AREAS.map(a => (React.createElement("div", { key: a.id, style: { background: wForm.area === a.id ? "#EFF8F3" : C.white, border: (wForm.area === a.id ? "2" : "1") + "px solid " + (wForm.area === a.id ? C.wl : C.border), borderRadius: 11, padding: "9px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between" }, onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { area: a.id }))) },
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.text } }, a.name),
                                React.createElement("div", { style: { fontSize: 9, color: C.muted } }, a.ne)),
                            wForm.area === a.id && React.createElement("span", { style: { color: C.wl, fontWeight: 800 } }, "✓"))))),
                        React.createElement("div", { style: S.lbl }, "Rate (NPR)"),
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), type: "number", placeholder: "e.g. 800", value: wForm.price, onChange: e => setWForm(f => (Object.assign(Object.assign({}, f), { price: e.target.value }))) }),
                        React.createElement("div", { style: S.lbl }, "Years of Experience"),
                        React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 10 }), type: "number", placeholder: "e.g. 5", value: wForm.exp, onChange: e => setWForm(f => (Object.assign(Object.assign({}, f), { exp: e.target.value }))) }),
                        React.createElement("div", { style: S.lbl }, "Short Bio"),
                        React.createElement("textarea", { style: Object.assign(Object.assign({}, S.inp), { minHeight: 60, resize: "vertical", marginBottom: 12 }), placeholder: "Brief description...", value: wForm.bio, onChange: e => setWForm(f => (Object.assign(Object.assign({}, f), { bio: e.target.value }))) }),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { flex: "0 0 auto", padding: "11px 16px", borderRadius: 11 }), onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { step: 1 }))) }, "←"),
                            React.createElement("button", { style: { background: wForm.area && wForm.price ? C.wg : "#D1D5DB", border: "none", color: C.white, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 800, cursor: wForm.area && wForm.price ? "pointer" : "not-allowed", fontFamily: "inherit", flex: 1 }, onClick: () => wForm.area && wForm.price && setWForm(f => (Object.assign(Object.assign({}, f), { step: 3 }))) }, "Next")))),
                    ws === 3 && (React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { border: "2px dashed " + (wForm.docs ? C.wl : C.border), borderRadius: 13, padding: 18, textAlign: "center", cursor: "pointer", background: wForm.docs ? "#EFF8F3" : "#FAFAFA", marginBottom: 12 }, onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { docs: true }))) },
                            React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, wForm.docs ? "✅" : "📤"),
                            React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: wForm.docs ? C.wl : C.muted } }, wForm.docs ? "Documents Uploaded" : "Tap to Upload Documents"),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 4 } }, "Citizenship Card + Selfie Photo")),
                        React.createElement("div", { style: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 11, padding: "10px 13px", marginBottom: 12 } },
                            React.createElement("div", { style: { fontSize: 11, color: C.orange, fontWeight: 700 } }, "Verification Process"),
                            React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 4, lineHeight: 1.7 } }, "Documents reviewed within 24 hours\nBackground check 1-2 business days\nApproval SMS sent to your number")),
                        React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { flex: "0 0 auto", padding: "11px 16px", borderRadius: 11 }), onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { step: 2 }))) }, "←"),
                            React.createElement("button", { style: { background: wForm.docs ? C.wg : "#D1D5DB", border: "none", color: C.white, padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 800, cursor: wForm.docs ? "pointer" : "not-allowed", fontFamily: "inherit", flex: 1 }, onClick: () => wForm.docs && setWForm(f => (Object.assign(Object.assign({}, f), { step: 4 }))) }, "Next")))),
                    ws === 4 && (React.createElement(React.Fragment, null,
                        React.createElement("div", { style: { fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 12 } }, "First 3 months FREE for founding providers!"),
                        PLANS.map(p => (React.createElement("div", { key: p.id, style: { background: wForm.plan === p.id ? "#EFF8F3" : C.white, border: (wForm.plan === p.id ? "2" : "1") + "px solid " + (wForm.plan === p.id ? C.wl : C.border), borderRadius: 15, padding: 13, marginBottom: 8, cursor: "pointer" }, onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { plan: p.id }))) },
                            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 } },
                                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: p.color } },
                                    p.name,
                                    p.rec && React.createElement("span", { style: { fontSize: 9, background: p.color, color: C.white, padding: "2px 6px", borderRadius: 8, marginLeft: 5 } }, "Best")),
                                wForm.plan === p.id && React.createElement("span", { style: { fontSize: 16, color: p.color } }, "✓")),
                            React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: C.text } },
                                fmt(p.price),
                                React.createElement("span", { style: { fontSize: 9, color: C.muted, fontWeight: 400 } }, "/month")),
                            p.features.map(f => React.createElement("div", { key: f, style: { fontSize: 10, color: C.muted, marginTop: 2 } }, "• " + f))))),
                        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 4 } },
                            React.createElement("button", { style: Object.assign(Object.assign({}, S.btnS), { flex: "0 0 auto", padding: "11px 16px", borderRadius: 11 }), onClick: () => setWForm(f => (Object.assign(Object.assign({}, f), { step: 3 }))) }, "←"),
                            React.createElement("button", { style: { background: C.wg, border: "none", color: C.white, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", flex: 1 }, onClick: () => setObStep(5) }, "Submit Application"))))),
                React.createElement("div", { style: { height: 40 } })));
        }
        if (obStep === 6)
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.cream } },
                React.createElement("div", { style: { background: "linear-gradient(135deg," + C.wg + "," + C.wl + ")", padding: "22px 20px 26px" } },
                    React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.7)", marginBottom: 7, fontWeight: 600, textTransform: "uppercase" } }, "Worker Login"),
                    React.createElement("div", { style: { fontSize: 21, fontWeight: 800, color: C.white } }, "Login with Email and Password")),
                React.createElement("div", { style: { padding: "20px 20px 0" } },
                    React.createElement("div", { style: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 12, padding: 12, fontSize: 12, color: C.orange, marginBottom: 14, lineHeight: 1.5 } }, "Only admin-approved workers can access the Worker Portal."),
                    React.createElement("div", { style: S.lbl }, "Email Address"),
                    React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 12 }), type: "email", placeholder: "worker@email.com", value: form.email, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { email: e.target.value }))) }),
                    React.createElement("div", { style: S.lbl }, "Password"),
                    React.createElement("input", { style: Object.assign(Object.assign({}, S.inp), { marginBottom: 12 }), type: "password", placeholder: "Password", value: form.password, onChange: e => setForm(f => (Object.assign(Object.assign({}, f), { password: e.target.value }))) }),
                    React.createElement("button", { style: { background: form.email && form.password ? C.wg : "#D1D5DB", border: "none", color: C.white, padding: "13px 0", borderRadius: 13, fontSize: 15, fontWeight: 800, cursor: form.email && form.password ? "pointer" : "not-allowed", fontFamily: "inherit", width: "100%" }, onClick: () => form.email && form.password && doWorkerLogin() }, "Login to Worker Portal"),
                    React.createElement("button", { style: { marginTop: 10, background: C.white, border: "1px solid " + C.border, color: C.wg, padding: "12px 0", borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", width: "100%" }, onClick: () => { setRole("worker"); setAuthMode("signup"); setObStep(3); } }, "New Worker? Create Account"),
                    React.createElement("button", { style: { marginTop: 10, background: "none", border: "none", color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", width: "100%" }, onClick: () => setObStep(2) }, "Back"))));
        if (obStep === 5)
            return (React.createElement("div", { style: { fontFamily: "system-ui,sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.cream, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" } },
                React.createElement("div", { style: { position: "absolute", top: 16, right: 16 } }, React.createElement(LanguageToggle, { lang: lang, setLang: setLang, dark: true })),
                React.createElement("div", { style: { fontSize: 78, marginBottom: 14 } }, role === "worker" ? "📋" : "🎉"),
                React.createElement("div", { style: { fontSize: 23, fontWeight: 800, color: C.text, marginBottom: 8 } }, role === "worker" ? "Application Submitted!" : "Welcome to GharSewa!"),
                React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 28, maxWidth: 310 } }, role === "worker" ? "Your documents are being reviewed. You will receive an SMS within 24 hours once approved." : "Hi " + form.name + "! Browse 41 services and 10 rental properties across Kathmandu Valley."),
                React.createElement("button", { style: { background: role === "worker" ? C.wg : C.red, border: "none", color: C.white, padding: "13px 40px", borderRadius: 13, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", width: "100%", maxWidth: 330 }, onClick: role === "worker" ? () => { doWorker(); setAuthMode("login"); setObStep(3); } : doCustomer }, role === "worker" ? "Go to Worker Login" : "Explore GharSewa")));
        return null;
    }
    // ── CUSTOMER APP RENDER ──────────────────────────────────────────
    const moreScreens = ["more", "loyalty", "referral", "support", "faq", "about", "settings", "plans", "docupload"];
    const navItems = [
        { id: "home", icon: "🏠", l: "Home" },
        { id: "browse", icon: "🔍", l: "Browse" },
        { id: "dashboard", icon: "📋", l: "My Space" },
        { id: "notifs", icon: "🔔", l: "Alerts", badge: unread },
        { id: "more", icon: "⚙️", l: "More" },
    ];
    const navActive = id => {
        if (id === "home")
            return ["home", "profile", "booking", "bkStatus", "rentalDetail", "rentalBook", "rentalOk", "avCal", "addrPick"].includes(screen);
        if (id === "browse")
            return screen === "browse";
        if (id === "dashboard")
            return ["dashboard", "invoice", "cancel", "review", "dispute", "bookConfirm", "chat"].includes(screen);
        if (id === "notifs")
            return screen === "notifs";
        if (id === "more")
            return moreScreens.includes(screen);
        return false;
    };
    const hdrBg = ["rentalDetail", "rentalBook", "rentalOk"].includes(screen) || (screen === "home" && homeTab === "rentals")
        ? "linear-gradient(135deg," + C.ad + ",#1976D2)"
        : "linear-gradient(135deg," + C.red + "," + C.redL + ")";
    return (React.createElement("div", { style: S.app },
        React.createElement("div", { style: Object.assign(Object.assign({}, S.hdr), { background: hdrBg }) },
            React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: C.white, cursor: "pointer" }, onClick: () => setScreen("home") }, "GharSewa \uD83C\uDFE0"),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.8)" } }, "घरको काम, एक क्लिकमा"),
                React.createElement(LanguageToggle, { lang: lang, setLang: setLang }))),
        React.createElement("div", { style: { paddingBottom: 82 } },
            screen === "home" && renderHome(),
            screen === "browse" && renderBrowse(),
            screen === "profile" && renderProfile(),
            screen === "booking" && renderBooking(),
            screen === "avCal" && renderAvCal(),
            screen === "addrPick" && renderAddrPick(),
            screen === "bkStatus" && renderBkStatus(),
            screen === "bookConfirm" && renderBookingConfirm(),
            screen === "chat" && selChatBk && React.createElement(ChatPanel, { bookingId: selChatBk.id, role: "customer", title: "Chat with " + ((selChatBk.provider && selChatBk.provider.name) || selChatBk.prov || "Worker"), onBack: () => setScreen("dashboard") }),
            screen === "dashboard" && renderDashboard(),
            screen === "cancel" && renderCancel(),
            screen === "review" && renderReview(),
            screen === "dispute" && renderDispute(),
            screen === "invoice" && renderInvoice(),
            screen === "notifs" && renderNotifs(),
            screen === "loyalty" && renderLoyalty(),
            screen === "referral" && renderReferral(),
            screen === "support" && renderSupport(),
            screen === "faq" && renderFAQ(),
            screen === "settings" && renderSettings(),
            screen === "about" && renderAbout(),
            screen === "plans" && renderPlans(),
            screen === "docupload" && renderDocUpload(),
            screen === "more" && renderMore(),
            screen === "rentalDetail" && renderRentalDetail(),
            screen === "rentalBook" && renderRentalBook(),
            screen === "rentalOk" && renderRentalOk()),
        React.createElement("div", { style: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.white, borderTop: "1px solid " + C.border, display: "flex", zIndex: 500 } }, navItems.map(item => {
            const active = navActive(item.id);
            return (React.createElement("button", { key: item.id, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "9px 0", cursor: "pointer", border: "none", background: "none", color: active ? C.red : C.muted, position: "relative" }, onClick: () => {
                    if (item.id === "home") {
                        setScreen("home");
                        setHomeTab("services");
                    }
                    if (item.id === "browse")
                        setScreen("browse");
                    if (item.id === "dashboard") {
                        setDashTab("bookings");
                        setScreen("dashboard");
                    }
                    if (item.id === "notifs")
                        setScreen("notifs");
                    if (item.id === "more")
                        setScreen("more");
                } },
                React.createElement("span", { style: { fontSize: 20 } }, item.icon),
                item.badge > 0 && React.createElement("span", { style: { position: "absolute", top: 6, left: "50%", transform: "translateX(4px)", background: C.red, color: C.white, fontSize: 9, fontWeight: 800, borderRadius: 10, padding: "1px 5px", minWidth: 16, textAlign: "center" } }, item.badge),
                React.createElement("span", { style: { fontSize: 9, fontWeight: 600 } }, item.l)));
        }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(GharSewa));
