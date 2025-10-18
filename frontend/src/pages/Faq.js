import React, { useEffect } from "react";
import "../styles/faq.css";

export default function Faq() {
  useEffect(() => {
    const faqItems = document.querySelectorAll(".faq-section");
    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }, []);

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-section">
        <h3 className="faq-question">Q1: What is this placement predictor app?</h3>
        <p className="faq-answer">
          This app predicts your placement chances based on your academic and skill inputs.
        </p>
      </div>

      <div className="faq-section">
        <h3 className="faq-question">Q2: How do I use the placement form?</h3>
        <p className="faq-answer">
          Fill in your details in the Placement Form page and submit. You will get predictions and recommendations.
        </p>
      </div>

      <div className="faq-section">
        <h3 className="faq-question">Q3: Is my data secure?</h3>
        <p className="faq-answer">
          Yes, your data is stored locally in your browser and is never sent to any server.
        </p>
      </div>

      <div className="faq-section">
        <h3 className="faq-question">Q4: Who can use this app?</h3>
        <p className="faq-answer">
          Any student or professional looking for placement prediction and guidance can use this app.
        </p>
      </div>
    </div>
  );
}
