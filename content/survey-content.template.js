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
    <div class="tut-grid">
      <div>
        <h3>Three corners represent three components</h3>
        <p>This scale uses a triangular/barycentric response format. Each point inside the triangle represents a composition of three components.</p>
        <ul>
          <li><strong>Top corner:</strong> Feminine / Female component</li>
          <li><strong>Bottom-left corner:</strong> Masculine / Male component</li>
          <li><strong>Bottom-right corner:</strong> Cyber / Androgynous component</li>
        </ul>
        <p><strong>Cyber / Androgynous</strong> refers to a non-biological, technology-oriented, robotic, artificial-intelligence-related, or gender-transcending perception component.</p>
      </div>

      <div>
        <h3>How to select a point</h3>
        <ul>
          <li>For each item, select exactly <strong>one</strong> of the 28 points.</li>
          <li>The selected point is automatically converted into three percentages.</li>
          <li>The bars below the triangle show the selected composition.</li>
          <li>You can change your selection before submission.</li>
        </ul>
      </div>
    </div>

    <div class="tut-tip">
      <h3>How to interpret locations inside the triangle</h3>
      <ul>
        <li>A point closer to a corner means that the corresponding component is stronger.</li>
        <li>A point near the center means a more balanced three-component perception.</li>
        <li>A point on an edge means that one of the three components is zero.</li>
      </ul>
    </div>

    <div class="tut-tip">
      <h3>Edge rules</h3>
      <ul>
        <li><strong>Left edge:</strong> Cyber / Androgynous = 0%. The response varies only between Feminine / Female and Masculine / Male.</li>
        <li><strong>Bottom edge:</strong> Feminine / Female = 0%. The response varies only between Masculine / Male and Cyber / Androgynous.</li>
        <li><strong>Right edge:</strong> Masculine / Male = 0%. The response varies only between Feminine / Female and Cyber / Androgynous.</li>
      </ul>
      <p>If one component is completely absent in your perception, choose a point on the corresponding edge. If an item is perceived as entirely one component, choose the relevant corner.</p>
    </div>

    <div class="tut-tip">
      <h3>Example interpretation</h3>
      <p>A point close to the bottom-right corner indicates a high Cyber / Androgynous component with a smaller Masculine / Male component and little or no Feminine / Female component. A point near the center indicates that all three components are perceived as relatively balanced.</p>
    </div>
  `,

  debriefHtml: `
    <p>Thank you for testing this public demo.</p>
    <p>This template is intended to demonstrate the triangular response interface only. Replace this text with your own post-participation information before real data collection.</p>
  `
};
