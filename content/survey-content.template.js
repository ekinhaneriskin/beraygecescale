/* Survey Content Template
   Public demo version with 10 example triangular-scale items.
   Replace placeholders with your own study content before deployment.
   Do not commit participant data, private endpoints, API keys, or identifiable personal information.
*/

window.SURVEY_CONTENT = {
  language: "en",
  title: "Beray Gece Scale — Triangular Survey Demo",

  config: {
    apiUrl: "[SUBMISSION_ENDPOINT]", // Replace with your backend endpoint. Do not commit private URLs, tokens, or API keys.
    requiredAllTriangleItems: true,
    minRequiredTriangleItems: 1,
    pageSize: 10,
    saveKey: "beray_gece_scale_demo_state_v1",
    storeUserAgent: false, // Set true only if approved and disclosed in your ethics/privacy text.
    storeTimestamp: true
  },

  components: {
    masculine: {
      label: "Masculine / Male",
      cornerLabel: "Masculine / Male"
    },
    feminine: {
      label: "Feminine / Female",
      cornerLabel: "Feminine / Female"
    },
    androgynous: {
      label: "Cyber / Androgynous",
      cornerLabel: "Cyber / Androgynous"
    }
  },

  preambleHtml: `
    <p><strong>Purpose:</strong> This public demo shows a reusable triangular/barycentric response interface.</p>
    <p>This demo does not contain the full study questionnaire, participant data, private contact information, or a real submission endpoint.</p>
    <p>Replace this section with your own participant information text, ethics statement, privacy statement, and public contact information before deployment.</p>
  `,

  consentText: "I have read the information above and agree to continue with this demo.",

  demographicsTitle: "Example Demographic Fields",
  demographics: [
    {
      name: "age",
      type: "number",
      label: "Age",
      min: 0,
      max: 120,
      required: false
    },
    {
      name: "field_or_department",
      type: "text",
      label: "Field / Department",
      maxlength: 120,
      required: false
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      required: false,
      options: [
        { value: "woman", label: "Woman" },
        { value: "man", label: "Man" },
        { value: "other_or_prefer_not_to_say", label: "Other / Prefer not to say" }
      ]
    }
  ],

  triangleTitle: "Example Triangular-Scale Items",
  triangleInstructions: "For each example occupation, select one point inside the triangle. The selected point represents a three-component composition.",

  triangleItems: [
    { id: "teacher", label: "Teacher" },
    { id: "engineer", label: "Engineer" },
    { id: "physician", label: "Physician" },
    { id: "nurse", label: "Nurse" },
    { id: "software_developer", label: "Software Developer" },
    { id: "lawyer", label: "Lawyer" },
    { id: "architect", label: "Architect" },
    { id: "police_officer", label: "Police Officer" },
    { id: "artist", label: "Artist" },
    { id: "data_analyst", label: "Data Analyst" }
  ],

  openEndedTitle: "Example Open-Ended Questions",
  openEnded: [
    {
      name: "general_feedback",
      label: "What do you think about using a triangular scale for this type of perception measurement?",
      rows: 3,
      required: false
    },
    {
      name: "term_feedback",
      label: "Would you suggest another term for the third component?",
      rows: 3,
      required: false
    }
  ],

  tutorialTitle: "How to Use the Triangular Scale",
  tutorialHtml: `
    <h3>Three corners represent three components</h3>
    <p>The top corner represents the feminine/female component, the bottom-left corner represents the masculine/male component, and the bottom-right corner represents the cyber/androgynous component.</p>
    <ul>
      <li>Select one point for each item.</li>
      <li>The selected point is converted into three percentages.</li>
      <li>The bar chart below each triangle shows the selected composition.</li>
    </ul>
  `,

  debriefHtml: `
    <p>Thank you for testing this public demo.</p>
    <p>This template is intended to demonstrate the triangular response interface only. Replace this text with your own post-participation information before real data collection.</p>
  `
};
