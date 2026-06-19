# Beray Gece Scale

A reusable triangular/barycentric survey scale interface for gender perception and compositional response studies.

This repository shares the response interface and visual measurement structure. It does **not** include the full study questionnaire, participant-level responses, identifiable data, private backend URLs, API keys, or unpublished research materials.

The public demo includes only 10 example occupations.

## What is included

- `index.html`: Minimal page shell.
- `assets/css/styles.css`: Visual styling for the triangular scale.
- `assets/js/triangle-survey.js`: Reusable triangular-scale survey engine.
- `content/survey-content.template.js`: Public demo content with 10 example occupations.
- `content/preamble.template.md`: Placeholder pre-survey information text.
- `content/debrief.template.md`: Placeholder post-survey information text.
- `content/demographics.template.json`: Placeholder demographic fields.
- `content/triangle-items.template.json`: Placeholder triangular-scale items.
- `content/open-ended.template.json`: Placeholder open-ended questions.

## What is not included

This repository does not include:

- participant-level responses,
- identifiable data,
- private backend URLs,
- API keys,
- full study-specific survey questions or full occupation lists,
- private ethics documents,
- unpublished analysis data.

## How to adapt

1. Copy `content/survey-content.template.js`.
2. Replace placeholders and example items with your own approved study content.
3. Set `apiUrl` only in a private deployment file, not in a public template.
4. Review all demographic and logging fields against your ethics/privacy protocol.
5. Deploy the static front-end and connect it to your own approved backend.

## Local testing

Open `index.html` in a browser. If no submission endpoint is configured, the response payload is printed to the browser console for local testing.

## License

MIT License.
