import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ecru:    #EEECE8;
    --sand:    #E3DED7;
    --greige:  #D0CBC3;
    --olive:   #4A5C47;
    --olive-l: #6B7D68;
    --mocha:   #7A6558;
    --charcoal:#2E2E2C;
    --white:   #FAFAF8;
    --muted:   #9E9890;
  }

  .app {
    font-family: 'Jost', sans-serif;
    background: var(--ecru);
    min-height: 100vh;
    color: var(--charcoal);
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px 24px 12px;
    background: var(--white);
    border-bottom: 1px solid var(--sand);
    position: sticky; top: 0; z-index: 100;
  }

  .logo {
    font-family: 'Jost', sans-serif;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: var(--charcoal);
    text-transform: uppercase;
    padding-right: 0.3em;
  }

  .nav-tabs {
    display: flex;
    gap: 2px;
    background: var(--ecru);
    padding: 3px;
  }

  .tab-btn {
    padding: 7px 20px;
    border: none;
    background: transparent;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn.active {
    background: var(--charcoal);
    color: var(--ecru);
  }

  .nav-right {
    display: none;
  }

  .banner {
    background: var(--olive);
    padding: 30px 36px 26px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .banner-title {
    font-family: 'Crimson Pro', serif;
    font-size: 40px;
    font-weight: 300;
    font-style: italic;
    color: var(--ecru);
    line-height: 1;
  }

  .banner-sub {
    font-size: 9px;
    letter-spacing: 0.22em;
    color: rgba(238,236,232,0.5);
    text-transform: uppercase;
    font-weight: 300;
    margin-top: 6px;
  }

  .banner-date {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(238,236,232,0.45);
    text-transform: uppercase;
    font-weight: 300;
    text-align: right;
  }

  .main {
    max-width: 1080px;
    margin: 0 auto;
    padding: 36px 36px 64px;
  }

  .sec-label {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }

  .sec-label h2 {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 400;
    color: var(--charcoal);
    white-space: nowrap;
  }

  .sec-label span {
    font-size: 10px;
    color: var(--muted);
    font-weight: 300;
    white-space: nowrap;
  }

  .line { flex:1; height:1px; background: var(--sand); }

  .filters {
    display: flex;
    gap: 5px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }

  .pill {
    padding: 5px 14px;
    border: 1px solid var(--greige);
    background: transparent;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.18s;
    font-weight: 300;
  }

  .pill.active { background: var(--charcoal); border-color: var(--charcoal); color: var(--ecru); }
  .pill:hover:not(.active) { border-color: var(--olive); color: var(--olive); }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
    gap: 14px;
    margin-bottom: 50px;
  }

  .vc {
    background: var(--white);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .vc:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,46,44,0.1); }

  .vthumb {
    aspect-ratio: 16/9;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vthumb.yoga       { background: linear-gradient(150deg,#D0CBC3,#9E9890); }
  .vthumb.meditation { background: linear-gradient(150deg,#C5CEC1,#4A5C47 200%); }
  .vthumb.fitness    { background: linear-gradient(150deg,#D6CEC5,#7A6558 200%); }

  .play-ring {
    width: 38px; height: 38px;
    border: 1.5px solid rgba(250,250,248,0.75);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .vdur {
    position: absolute; bottom:10px; right:12px;
    font-size: 9px; letter-spacing: 0.1em;
    color: rgba(250,250,248,0.8);
    font-weight: 300;
  }

  .vinfo { padding: 15px 17px 17px; }

  .vcat {
    font-size: 8px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--olive);
    font-weight: 400;
    margin-bottom: 7px;
  }

  .vtitle {
    font-family: 'Crimson Pro', serif;
    font-size: 17px;
    font-weight: 300;
    color: var(--charcoal);
    line-height: 1.3;
    margin-bottom: 10px;
  }

  .vmeta {
    font-size: 9px;
    letter-spacing: 0.1em;
    color: var(--muted);
    display: flex;
    gap: 12px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 12px;
    margin-bottom: 50px;
  }

  .rc {
    background: var(--white);
    padding: 19px 21px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border-top: 2px solid transparent;
  }

  .rc.morning { border-top-color: #C4A96A; }
  .rc.lunch   { border-top-color: var(--olive); }
  .rc.dinner  { border-top-color: var(--mocha); }
  .rc.snack   { border-top-color: var(--greige); }
  .rc:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(46,46,44,0.08); }

  .rtime {
    font-size: 8px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 9px;
  }

  .rtime.morning { color: #A8882A; }
  .rtime.lunch   { color: var(--olive); }
  .rtime.dinner  { color: var(--mocha); }
  .rtime.snack   { color: var(--muted); }

  .rtitle {
    font-family: 'Crimson Pro', serif;
    font-size: 18px;
    font-weight: 300;
    color: var(--charcoal);
    line-height: 1.3;
    margin-bottom: 8px;
  }

  .rdesc {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 13px;
    font-weight: 300;
  }

  .rpills { display:flex; gap:4px; flex-wrap:wrap; }

  .rpill {
    font-size: 8px;
    padding: 3px 9px;
    border: 1px solid var(--sand);
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 300;
  }

  /* HABIT */
  .hbox {
    background: var(--white);
    padding: 28px 30px;
    margin-bottom: 50px;
  }

  .htop {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 26px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--ecru);
  }

  .htop-l h2 {
    font-family: 'Crimson Pro', serif;
    font-size: 26px;
    font-weight: 300;
    font-style: italic;
    color: var(--charcoal);
    margin-bottom: 3px;
  }

  .htop-l p {
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 300;
  }

  .streak-n {
    font-family: 'Crimson Pro', serif;
    font-size: 38px;
    font-weight: 300;
    color: var(--olive);
    line-height: 1;
    font-style: italic;
    text-align: right;
  }

  .streak-l {
    font-size: 8px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 300;
    text-align: right;
  }

  .week {
    display: flex;
    gap: 5px;
    margin-bottom: 24px;
  }

  .dc { flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; }

  .dlbl {
    font-size: 8px;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
  }

  .ddot {
    width: 26px; height: 26px;
    border: 1px solid var(--sand);
    display: flex; align-items: center; justify-content: center;
    font-size: 9px;
    color: var(--muted);
    transition: all 0.2s;
  }

  .ddot.done  { background: var(--olive); border-color: var(--olive); color: var(--ecru); }
  .ddot.today { border-color: var(--charcoal); color: var(--charcoal); }

  .prog {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    background: var(--ecru);
    margin-bottom: 18px;
  }

  .prog-t {
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
    font-weight: 300;
  }

  .prog-bar { flex:1; height:2px; background:var(--sand); }
  .prog-fill { height:2px; background:var(--olive); transition:width 0.4s; }

  .hlist { display:flex; flex-direction:column; gap:2px; }

  .hrow {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 13px;
    background: var(--ecru);
    cursor: pointer;
    transition: background 0.15s;
  }

  .hrow:hover { background: var(--sand); }

  .hcheck {
    width: 17px; height: 17px;
    border: 1.5px solid var(--greige);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .hcheck.on { background: var(--olive); border-color: var(--olive); }

  .hemoji { font-size: 15px; flex-shrink: 0; }

  .hname {
    flex: 1;
    font-size: 12px;
    font-weight: 300;
    color: var(--charcoal);
    letter-spacing: 0.02em;
  }

  .hname.done { color: var(--muted); text-decoration: line-through; text-decoration-color: var(--greige); }

  .hst { font-size: 9px; letter-spacing: 0.1em; color: var(--olive-l); font-weight: 300; }

  .add-btn {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    border: 1px dashed var(--greige);
    background: transparent;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 300;
  }

  .add-btn:hover { border-color: var(--olive); color: var(--olive); }

  .add-row { margin-top:10px; display:flex; gap:6px; }

  .add-input {
    flex: 1;
    padding: 9px 13px;
    border: 1px solid var(--greige);
    background: var(--ecru);
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: var(--charcoal);
    outline: none;
    letter-spacing: 0.04em;
  }

  .add-input:focus { border-color: var(--olive); }

  .cancel {
    padding: 9px 13px;
    border: 1px solid var(--sand);
    background: transparent;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    font-weight: 300;
  }

  /* HISTORY */
  .hist-wrap { margin-bottom: 50px; }

  .cal-strip {
    background: var(--white);
    padding: 16px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cal-row {
    display: flex;
    gap: 4px;
  }

  .cal-cell {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .cal-lbl {
    font-size: 9px;
    letter-spacing: 0.1em;
    color: var(--muted);
    text-transform: uppercase;
  }

  .cal-num {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: var(--charcoal);
    font-weight: 300;
    position: relative;
    border-radius: 50%;
  }

  .cal-num.today {
    background: var(--charcoal);
    color: var(--ecru);
    font-weight: 400;
  }

  .cal-num.has-log::after {
    content: '';
    position: absolute;
    bottom: 2px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--olive);
  }

  .cal-num.today.has-log::after {
    background: var(--ecru);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tl-date-header {
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--olive);
    font-weight: 400;
    padding: 16px 0 8px;
    border-bottom: 1px solid var(--sand);
    margin-bottom: 8px;
  }

  .tl-entry {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    background: var(--white);
    margin-bottom: 2px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .tl-entry:hover { background: var(--sand); }

  .tl-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tl-dot.yoga { background: var(--greige); }
  .tl-dot.fitness { background: var(--mocha); }
  .tl-dot.meditation { background: var(--olive); }

  .tl-info { flex: 1; }

  .tl-title {
    font-family: 'Crimson Pro', serif;
    font-size: 16px;
    font-weight: 300;
    color: var(--charcoal);
    margin-bottom: 2px;
  }

  .tl-meta {
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 300;
  }

  .tl-check {
    font-size: 11px;
    color: var(--olive);
    letter-spacing: 0.06em;
    font-weight: 300;
  }

  .log-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: var(--olive);
    border: none;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ecru);
    cursor: pointer;
    transition: opacity 0.2s;
    font-weight: 400;
    flex-shrink: 0;
  }

  .log-btn:hover { opacity: 0.85; }
  .log-btn.logged { background: var(--greige); color: var(--muted); }

  .empty-hist {
    padding: 32px 16px;
    text-align: center;
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
    letter-spacing: 0.06em;
  }
`;

const videos = [
  {id:1,cat:"yoga",      title:"Morning Flow — Open the Spine",    duration:"18 min",level:"All levels"},
  {id:2,cat:"yoga",      title:"Evening Wind-Down Yin",             duration:"32 min",level:"Beginner"},
  {id:3,cat:"yoga",      title:"Strong Foundation — Hip & Glute",   duration:"24 min",level:"Intermediate"},
  {id:4,cat:"fitness",   title:"Pilates Core Activation",           duration:"20 min",level:"All levels"},
  {id:5,cat:"fitness",   title:"Full Body Sculpt — Low Impact",     duration:"35 min",level:"Intermediate"},
  {id:6,cat:"meditation",title:"Morning Presence",                  duration:"10 min",level:"All levels"},
  {id:7,cat:"meditation",title:"Body Scan for Deep Rest",           duration:"22 min",level:"All levels"},
  {id:8,cat:"yoga",      title:"Breathwork — Expand Your Capacity", duration:"15 min",level:"All levels"},
];

const recipes = [
  {id:1,time:"morning",title:"Turmeric Oat Bowl",          desc:"Warming oats with golden milk, banana, and toasted seeds.",  tags:["Gluten-free","5 min"]},
  {id:2,time:"morning",title:"Green Protein Smoothie",     desc:"Spinach, avocado, pea protein, and matcha.",                 tags:["Vegan","Quick"]},
  {id:3,time:"lunch",  title:"Miso Grain Bowl",            desc:"Brown rice, roasted vegetables, sesame-miso dressing.",      tags:["Vegan","Meal-prep"]},
  {id:4,time:"lunch",  title:"Salmon & Avocado Wrap",      desc:"Omega-rich salmon with pickled cucumber and tahini.",        tags:["High protein","30 min"]},
  {id:5,time:"dinner", title:"Lemon Herb Baked Cod",       desc:"Light white fish with capers, dill, and roasted zucchini.",  tags:["Low-carb","Easy"]},
  {id:6,time:"dinner", title:"Black Bean Sweet Potato Curry",desc:"Warming plant-based curry with coconut milk.",             tags:["Vegan","Meal-prep"]},
  {id:7,time:"snack",  title:"Almond Date Bites",          desc:"Medjool dates, almond butter, and a pinch of sea salt.",    tags:["No-bake","5 min"]},
];

const initHabits = [
  {id:1,name:"Morning movement",   emoji:"🧘",checked:true, streak:7},
  {id:2,name:"Hydrate — 2L water", emoji:"💧",checked:true, streak:5},
  {id:3,name:"10 min meditation",  emoji:"🌿",checked:false,streak:3},
  {id:4,name:"Read / journal",     emoji:"📖",checked:false,streak:2},
  {id:5,name:"No screen after 9pm",emoji:"🌙",checked:false,streak:1},
];

const DAYS=["M","T","W","T","F","S","S"];
const DONE=[true,true,true,true,false,false,false];

export default function App() {
  const [tab,      setTab]      = useState("movement");
  const [vf,       setVf]       = useState("all");
  const [rf,       setRf]       = useState("all");
  const [habits,   setHabits]   = useState(initHabits);
  const [adding,   setAdding]   = useState(false);
  const [newH,     setNewH]     = useState("");

  const toggle = id => setHabits(h=>h.map(x=>x.id===id?{...x,checked:!x.checked}:x));

  const [logged, setLogged] = useState(() => {
    try {
      const saved = localStorage.getItem('innate_logs');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [];
  });

  const logWorkout = (video) => {
    const today = new Date().toISOString().split('T')[0];
    const alreadyLogged = logged.some(l => l.date === today && l.videoId === video.id);
    if (alreadyLogged) return;
    const newEntry = {
      id: Date.now().toString(),
      date: today,
      videoId: video.id,
      cat: video.cat,
      title: video.title,
      duration: video.duration
    };
    setLogged(prev => {
      const updated = [newEntry, ...prev];
      try { localStorage.setItem('innate_logs', JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  };

  const isLoggedToday = (videoId) => {
    const today = new Date().toISOString().split('T')[0];
    return logged.some(l => l.date === today && l.videoId === videoId);
  };

  // Group logs by date
  const groupedLogs = logged.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  // Get dates with logs for calendar dots
  const logDates = new Set(logged.map(l => l.date));

  // Build week days
  const getWeekDays = () => {
    const days = [];
    const t = new Date();
    const dayOfWeek = t.getDay();
    const monday = new Date(t);
    monday.setDate(t.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayLabels = ['M','T','W','T','F','S','S'];
  const todayStr = new Date().toISOString().split('T')[0];

  const addHabit = () => {
    if (!newH.trim()) return;
    setHabits(h=>[...h,{id:Date.now(),name:newH.trim(),emoji:"✦",checked:false,streak:0}]);
    setNewH(""); setAdding(false);
  };

  const fv = vf==="all"?videos:videos.filter(v=>v.cat===vf);
  const fr = rf==="all"?recipes:recipes.filter(r=>r.time===rf);
  const done = habits.filter(h=>h.checked).length;
  const pct = Math.round(done/habits.length*100);
  const topS = Math.max(...habits.map(h=>h.streak));
  const today = new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        <nav className="nav">
          <div className="logo">INNATE</div>
          <div className="nav-tabs">
            {[["movement","Move"],["nourish","Nourish"],["habits","Habits"],["history","History"]].map(([k,l])=>(
              <button key={k} className={`tab-btn ${tab===k?"active":""}`} onClick={()=>setTab(k)}>{l}</button>
            ))}
          </div>
        </nav>

        <div className="banner">
          <div>
            <div className="banner-title">
              {tab==="movement"&&"Move with intention."}
              {tab==="nourish"&&"Nourish from within."}
              {tab==="habits"&&"Design your daily self."}
              {tab==="history"&&"Your journey, recorded."}
            </div>
            <div className="banner-sub">INNATE Membership</div>
          </div>
          <div className="banner-date">{today}</div>
        </div>

        <div className="main">

          {tab==="movement"&&<>
            <div className="sec-label">
              <h2>Video Library</h2>
              <span>{fv.length} sessions</span>
              <div className="line"/>
            </div>
            <div className="filters">
              {[["all","All"],["yoga","Yoga"],["fitness","Fitness"],["meditation","Meditation"]].map(([k,l])=>(
                <button key={k} className={`pill ${vf===k?"active":""}`} onClick={()=>setVf(k)}>{l}</button>
              ))}
            </div>
            <div className="video-grid">
              {fv.map(v=>(
                <div className="vc" key={v.id}>
                  <div className={`vthumb ${v.cat}`}>
                    <div className="play-ring">
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                        <path d="M1 1L10 6.5L1 12V1Z" fill="rgba(250,250,248,0.85)"/>
                      </svg>
                    </div>
                    <div className="vdur">{v.duration}</div>
                  </div>
                  <div className="vinfo" style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <div style={{flex:1}}>
                      <div className="vcat">{v.cat}</div>
                      <div className="vtitle">{v.title}</div>
                      <div className="vmeta"><span>{v.level}</span><span>{v.duration}</span></div>
                    </div>
                    <button
                      className={`log-btn ${isLoggedToday(v.id)?'logged':''}`}
                      onClick={()=>logWorkout(v)}
                    >{isLoggedToday(v.id)?'✓ Done':'Log'}</button>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {tab==="nourish"&&<>
            <div className="sec-label">
              <h2>Recipe Collection</h2>
              <span>{fr.length} recipes</span>
              <div className="line"/>
            </div>
            <div className="filters">
              {[["all","All"],["morning","Morning"],["lunch","Lunch"],["dinner","Dinner"],["snack","Snack"]].map(([k,l])=>(
                <button key={k} className={`pill ${rf===k?"active":""}`} onClick={()=>setRf(k)}>{l}</button>
              ))}
            </div>
            <div className="recipe-grid">
              {fr.map(r=>(
                <div className={`rc ${r.time}`} key={r.id}>
                  <div className={`rtime ${r.time}`}>{r.time}</div>
                  <div className="rtitle">{r.title}</div>
                  <div className="rdesc">{r.desc}</div>
                  <div className="rpills">{r.tags.map(t=><span className="rpill" key={t}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </>}

          {tab==="habits"&&<>
            <div className="hbox">
              <div className="htop">
                <div className="htop-l">
                  <h2>Daily Rituals</h2>
                  <p>{today}</p>
                </div>
                <div>
                  <div className="streak-n">{topS}</div>
                  <div className="streak-l">day streak</div>
                </div>
              </div>

              <div className="week">
                {DAYS.map((d,i)=>(
                  <div className="dc" key={i}>
                    <div className="dlbl">{d}</div>
                    <div className={`ddot ${DONE[i]?"done":""} ${i===4?"today":""}`}>{DONE[i]?"✓":""}</div>
                  </div>
                ))}
              </div>

              <div className="prog">
                <div className="prog-t">{done} / {habits.length}</div>
                <div className="prog-bar"><div className="prog-fill" style={{width:`${pct}%`}}/></div>
                <div className="prog-t">{pct}%</div>
              </div>

              <div className="hlist">
                {habits.map(h=>(
                  <div className="hrow" key={h.id} onClick={()=>toggle(h.id)}>
                    <div className={`hcheck ${h.checked?"on":""}`}>
                      {h.checked&&<svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <div className="hemoji">{h.emoji}</div>
                    <div className={`hname ${h.checked?"done":""}`}>{h.name}</div>
                    <div className="hst">{h.streak}d</div>
                  </div>
                ))}
              </div>

              {adding?(
                <div className="add-row">
                  <input className="add-input" autoFocus value={newH} onChange={e=>setNewH(e.target.value)}
                    placeholder="New habit..."
                    onKeyDown={e=>{if(e.key==="Enter")addHabit();if(e.key==="Escape")setAdding(false);}}
                  />
                  <button className="cancel" onClick={()=>setAdding(false)}>Cancel</button>
                </div>
              ):(
                <button className="add-btn" onClick={()=>setAdding(true)}>+ Add Habit</button>
              )}
            </div>
          </>}

          {tab==="history"&&<>
            <div className="hist-wrap">
              <div className="cal-strip">
                <div className="cal-row">
                  {weekDays.map((d,i)=>{
                    const ds = d.toISOString().split('T')[0];
                    const isToday = ds === todayStr;
                    const hasLog = logDates.has(ds);
                    return (
                      <div className="cal-cell" key={i}>
                        <div className="cal-lbl">{dayLabels[i]}</div>
                        <div className={`cal-num ${isToday?'today':''} ${hasLog?'has-log':''}`}>{d.getDate()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sec-label">
                <h2>This Week</h2>
                <span>{logged.length} sessions</span>
                <div className="line"/>
              </div>
              <div className="timeline">
                {weekDays.slice().reverse().map((d)=>{
                  const ds = d.toISOString().split('T')[0];
                  const isToday = ds === todayStr;
                  const entries = groupedLogs[ds] || [];
                  const label = isToday ? 'Today' : d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
                  return (
                    <div key={ds} style={{marginBottom:'4px'}}>
                      <div className="tl-date-header" style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span>{label}</span>
                        {entries.length > 0 && <span style={{color:'var(--olive)',fontSize:'8px',letterSpacing:'0.1em'}}>{entries.length} session{entries.length>1?'s':''}</span>}
                      </div>
                      {entries.length === 0 ? (
                        <div style={{padding:'10px 16px',background:'var(--white)',marginBottom:'2px'}}>
                          <span style={{fontSize:'11px',color:'var(--greige)',fontWeight:300,letterSpacing:'0.04em'}}>— Rest day</span>
                        </div>
                      ) : entries.map(entry=>(
                        <div className="tl-entry" key={entry.id}>
                          <div className={`tl-dot ${entry.cat}`}/>
                          <div className="tl-info">
                            <div className="tl-title">{entry.title}</div>
                            <div className="tl-meta">{entry.cat} · {entry.duration}</div>
                          </div>
                          <div className="tl-check">✓</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </>}

        </div>
      </div>
    </>
  );
}
