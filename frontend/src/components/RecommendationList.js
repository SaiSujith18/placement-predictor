import React, { useEffect, useState } from "react";

/*
  recommendationList.js
  - Reads 'placements' from localStorage and generates simple recommendations:
      * Top packages
      * Companies to target based on package thresholds
  - Allows marking a recommendation as "applied" (persisted in localStorage)
*/
export default function RecommendationList() {
  const [placements, setPlacements] = useState([]);
  const [applied, setApplied] = useState(JSON.parse(localStorage.getItem("appliedRecommendations") || "[]"));

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("placements") || "[]");
    setPlacements(p);
  }, []);

  const topPackages = [...placements].sort((a,b)=>b.package - a.package).slice(0,5);

  // Example simple recommendation engine:
  const recommendations = (() => {
    const avg = placements.length ? placements.reduce((s,p)=>s+p.package,0)/placements.length : 0;
    const recs = [
      { id: "rec_high", title: "Aim for FAANG/BigTech roles", reason: `Average package among entries: ${avg ? avg.toFixed(2) : "N/A"} LPA. If you have > 12 LPA, target top tech.` },
      { id: "rec_startup", title: "Apply to fast-growing startups", reason: "Startups often hire across many roles — good fit for 4 - 12 LPA candidates." },
      { id: "rec_intern", title: "Consider internships for domain experience", reason: "Internships boost chances for higher packages later." },
      { id: "rec_skills", title: "Upskill: System Design / DS & Algo", reason: "Improves interview success rate for product roles." }
    ];
    return recs;
  })();

  function markApplied(id) {
    const arr = JSON.parse(localStorage.getItem("appliedRecommendations") || "[]");
    if (!arr.includes(id)) arr.push(id);
    localStorage.setItem("appliedRecommendations", JSON.stringify(arr));
    setApplied(arr);
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p className="small">Automated suggestions based on saved placement entries in your browser.</p>

      <div className="card" style={{marginTop:12}}>
        <h3>Top reported packages</h3>
        {topPackages.length === 0 && <div className="small">No placement entries yet.</div>}
        <div className="list">
          {topPackages.map(p => (
            <div key={p.id} className="list-item">
              <div><strong>{p.name}</strong> — {p.college}</div>
              <div className="small">{p.package} LPA</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Actionable recommendations</h3>
        <div className="list">
          {recommendations.map(r => (
            <div className="list-item" key={r.id}>
              <div>
                <div><strong>{r.title}</strong></div>
                <div className="small">{r.reason}</div>
              </div>
              <div className="row">
                <button className="btn" onClick={()=>markApplied(r.id)} disabled={applied.includes(r.id)}>
                  {applied.includes(r.id) ? "Applied" : "Mark as applied"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
