import React, { useState, useEffect } from "react";

// Prediction function — keep it separate
export async function getPrediction(userFeatures, userSkills, userRole) {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      features: userFeatures,
      skills: userSkills,
      role: userRole
    })
  });

  const data = await response.json();
  return data;
}

export default function PlacementForm({ user }) {
  const [name, setName] = useState(user ? user.name : "");
  const [college, setCollege] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [resume, setResume] = useState("");
  const [iq, setIq] = useState("");
  const [internship, setInternship] = useState("No");
  const [projects, setProjects] = useState("");
  const [training, setTraining] = useState("No");
  const [technical, setTechnical] = useState("No");
  const [communication, setCommunication] = useState("");
  const [msg, setMsg] = useState("");
  const [entries, setEntries] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("placements") || "[]");
    setEntries(saved.reverse());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!name || !college || !packageValue) {
      setMsg("Please fill name, college and package.");
      return;
    }
    if (iq && (iq < 0 || iq > 250)) {
      setMsg("IQ must be between 0 and 250.");
      return;
    }
    if (projects && (projects < 0 || projects > 5)) {
      setMsg("Projects completed must be between 0 and 5.");
      return;
    }
    if (communication && (communication < 0 || communication > 10)) {
      setMsg("Communication skills rating must be between 0 and 10.");
      return;
    }

    const entry = {
      id: Date.now(),
      name,
      college,
      package: parseFloat(packageValue),
      resume,
      iq,
      internship,
      projects,
      training,
      technical,
      communication,
      createdAt: new Date().toISOString(),
    };

    const list = JSON.parse(localStorage.getItem("placements") || "[]");
    list.push(entry);
    localStorage.setItem("placements", JSON.stringify(list));
    setEntries([entry, ...entries]);
    setMsg("Placement entry saved.");

    // Clear form fields except name
    setCollege("");
    setPackageValue("");
    setResume("");
    setIq("");
    setInternship("No");
    setProjects("");
    setTraining("No");
    setTechnical("No");
    setCommunication("");

    // ✅ Call ML prediction
    try {
      const prediction = await getPrediction(
        {
          cgpa: parseFloat(packageValue),
          communication: parseFloat(communication || 0),
          internship: internship === "Yes" ? 1 : 0,
          iq: parseFloat(iq || 0),
          projects: parseFloat(projects || 0),
          training: training === "Yes" ? 1 : 0,
          technical: technical === "Yes" ? 1 : 0,
        },
        ["python", "react"], // Replace with dynamic skills if desired
        "developer"
      );

      setPredictionResult(prediction);
      setMsg("Prediction received!");
      console.log("Prediction:", prediction);

    } catch (err) {
      console.error("Prediction error:", err);
      setMsg("Error getting prediction.");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Placement Form</h2>
        <p className="error">
          You must be logged in to submit placement entries. Please login or register.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Placement Form</h2>

      <p style={{ color: "red", fontStyle: "italic" }}>
        ⚠ All entered details must be in strictly <strong>lowercase</strong> only.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="College / Institution"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Cgpa / Package"
          type="number"
          value={packageValue}
          onChange={(e) => setPackageValue(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="IQ Score"
          type="number"
          min="0"
          max="250"
          value={iq}
          onChange={(e) => setIq(e.target.value)}
        />
        <label>Internship Completed?</label>
        <select
          className="input"
          value={internship}
          onChange={(e) => setInternship(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input
          className="input"
          placeholder="Projects Completed (0–5)"
          type="number"
          min="0"
          max="5"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />
        <label>Training Completed?</label>
        <select
          className="input"
          value={training}
          onChange={(e) => setTraining(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input
          className="input"
          placeholder="Communication Skills Rating (0–10)"
          type="number"
          min="0"
          max="10"
          value={communication}
          onChange={(e) => setCommunication(e.target.value)}
        />
        <input
          className="input"
          placeholder="Resume Link"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        {msg && <div className="success">{msg}</div>}
        <div className="row">
          <button className="btn glow" type="submit">
            Save placement
          </button>
        </div>
      </form>

      {predictionResult && (
        <div style={{ marginTop: "20px", background: "#eef", padding: "10px" }}>
          <h4>Prediction Result:</h4>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h3>Recent placements</h3>
        <div className="list">
          {entries.length === 0 && <div className="small">No entries yet.</div>}
          {entries.slice(0, 10).map((e) => (
            <div className="list-item" key={e.id}>
              <div>
                <div>
                  <strong>{e.name}</strong> —{" "}
                  <span className="small">{e.college}</span>
                </div>
                <div className="small">
                  Package: <strong>{e.package} LPA</strong> &nbsp; • &nbsp;{" "}
                  {new Date(e.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="small">
                {e.resume ? (
                  <a
                    className="small"
                    href={e.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                ) : (
                  <span className="small">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
