# One Medical — Admissions Board
## Case study source package (extracted from `OM_Product_design_case_studies_presentation.pptx`)

This file has three parts:

1. **Case study narrative** — the deck's story rewritten as portfolio-ready sections, with each section mapped to its images.
2. **Image manifest** — every meaningful image, renamed and grouped by story beat (files in `images/`).
3. **Verbatim extraction** — all on-slide text and speaker notes, slide by slide, untouched.

The zip also includes `slide-renders/` (every slide as a 150 dpi PNG, for reference when rebuilding layouts) and `originals/` (all 74 raw media files exactly as stored in the deck, duplicates included).

> **Note carried from the deck:** all patient data shown in the UI is fictionalized for demonstration. Keep a line saying so on the portfolio page.

---

# Part 1 — Case study narrative

### Snapshot

| | |
|---|---|
| **Company** | One Medical (technology-enabled primary care, expanding into senior / Medicare populations) |
| **Product** | Admissions Board — an integrated tool inside the EHR for tracking hospitalized patients |
| **Role** | Lead designer, end-to-end; also managing the Practice Management design team (Scheduling, Billing, Workflow squads) as a player-coach with one design direct report |
| **Partners** | Product managers, engineering, clinical stakeholders, a UX researcher, Analytics; stakeholders across Senior Health, Clinical Operations, Clinical Tech & leadership |
| **Users** | Health Navigators (primary), office managers, PCPs, RNs, front desk, virtual care support, clinical operations |
| **Scope** | Journeys, wireframes, mocks, prototypes, agile sprints, shipped features; contributed to the data model |
| **One-liner** | Replaced a copy-paste spreadsheet with a real-time admissions dashboard built into the chart. |

**Hero image:** `01-problem-context/hero-spreadsheet-to-admissions-board.png` (the spreadsheet → board transformation in one frame)

---

### 1. The problem

When a patient is admitted to a hospital or other care facility, they're at their most vulnerable and care is at its most expensive. One Medical's high-risk patients — especially seniors — do get hospitalized, and the 7–10 days after discharge are when readmission risk peaks. Readmissions are bad for patients and expensive for the business.

Despite that, the team was managing this high-stakes work with manual tools. Health Navigators tracked admissions in a spreadsheet, copying and pasting data out of the chart. Every handoff was a chance for miscommunication, mistakes, and worse outcomes.

**Key terms (useful as a sidebar or glossary):**
- **Admission** — significant care at an outside facility for a serious health event: ED visit, outpatient surgery, skilled nursing facility.
- **ADT** — Admission, Discharge, Transfer: the three state changes facilities report through interop channels. One Medical used Bamboo Health, CMT, and other sources.
- **Health Navigator** — a non-clinician care team member supporting a panel of value-based patients, especially when they're outside the One Medical ecosystem.

**Images:** `01-problem-context/legacy-admissions-tracking-spreadsheet.png`

---

### 2. Vision and goals

**Vision**
1. Provide high-value, timely care to our most vulnerable patients.
2. Enable care teams and offices to coordinate daily activities around the needs of these high-risk patients.

| User goal | Business goal | Measures |
|---|---|---|
| Improve how we manage and engage hospitalized patients, so care teams give high-need patients the right level of attention and avoid costly readmissions. | Enable Health Navigators and other care team members to give admitted patients attentive care that improves outcomes and reduces costs. | Reduce manual effort; decrease time spent navigating the chart looking for information. |

**Metrics tracked (from notes):** time on task, task completion, time spent navigating the chart, and % of admissions that are readmissions within 30 days of discharge.

**Images:** `03-illustrations/care-team-collaboration-illustration.png`, `03-illustrations/goals-banner-illustration.png`, plus the three preview screens in `02-final-ui-preview/*-alt.png` (these sat above the goal columns on the slide).

---

### 3. Why this was hard

The obvious answer — "just move the spreadsheet into the chart" — didn't work. Shipping this meant going through multiple teams: Charting, Ordering (Amazon Pharmacy), Care Insights, Scheduling, Billing, and Workflow. The chart ran on a monolithic stack; practice management tools were a separate microservices app, sometimes owned by entirely different teams. The board had to pull from a shared service and update in real time across both.

**Starting assumptions / requirements:**
1. Users can create, edit, and update an admission's details.
2. Users (primarily Health Navigators) can view pre-admit, active, and discharged stays at inpatient facilities.
3. Users can filter and modify views to focus on admissions relevant to their team.
4. Analytics can assess admission frequency, duration, and resolution, cut by region and patient cohort — important for value-based care reimbursement.

**Images:** `04-research-process/design-challenge-system-map-7-teams.png`

---

### 4. Research and alignment

Under time pressure, I ran a rapid ideation phase with workshops to align cross-functional teams on core priorities, then scoped an MVP that cut manual work immediately while leaving room to scale.

- **Stakeholder alignment & vision workshop** with PMs, engineers, and clinical leads across Senior Health, Clinical Ops, and Clinical Tech leadership. Captured each team's needs and pain points, and documented decisions in a **DACI** framework.
- **Research** with a UX researcher: surveys, interviews, observational studies with Health Navigators, and data analysis.
- **Synthesis** into JTBD, journey maps, and prioritized user stories with stakeholder sign-off.

**What we learned:** the highest-value need was giving office managers a practice-wide view of patient care against service standards — next steps and actions at a glance, available in the patient chart. Research also surfaced multiple roles and handoffs that varied with patient complexity, and a recurring need to **clarify ownership: who is responsible for doing what.**

> "Office managers need to see how we're doing as a practice."
> "The service standards are clearly outlined and I know if they are being met."

**Core jobs:**
1. Note a patient's admission status.
2. Let care teams and offices coordinate daily activities.
3. Maintain visibility and accountability while reducing risk.

**Example user story:** *As a care navigator doing weekly panel management, I want to get in touch with patients my care team hasn't recently interacted with, so that patients receive necessary follow-up care.*

**Collaboration beats:** helped define the data model with engineering and product during sprints; ran regular stakeholder check-ins; kept senior health leadership informed through targeted sessions; set measurable outcomes around admissions tracking, discharge planning, and readmission risk.

**Images:** `04-research-process/stakeholder-workshop-photo.png`, `journey-map-roles-and-handoffs.png`, `coordination-map-office-vs-supporting-teams.png`, `research-synthesis-user-stories-sheet.png`

---

### 5. Exploring the options

**Decision 1 — Where does it live?**

| | Option A: Integrated into Panel Management | Option B: Standalone dashboard ✅ |
|---|---|---|
| **Why it was attractive** | PCPs already used it; one familiar place; lower learning curve | Built for Health Navigators and office managers who need practice-wide visibility |
| **Tradeoffs** | Optimized for individual patients, not clinic-wide views; couldn't flex to navigator and office manager workflows | A separate surface to maintain |
| **Other upside** | — | Room for admissions-specific features (automated ADT streams); less cognitive load for PCPs |

**Outcome:** user and stakeholder feedback made it clear the standalone board served more roles and scaled better, while staying connected to the chart.

**Decision 2 — What goes in the expanded row?**

| Layout | Pros | Cons |
|---|---|---|
| 1. Two columns: Admissions + Service Standards | Clean, core info only | No place for next steps — the thing users kept asking for |
| **2. Three columns: + Next Steps ✅** | Actionable items right beside status; serves navigators and office managers | Slightly more visual complexity |
| 3. Three columns: + Recent Tasks | Useful history context | Buried next steps; recent tasks were already available elsewhere |

**Outcome:** office managers were emphatic that clear next steps were what made coordination work. Option 2 balanced completeness with actionability.

**Images:** `05-exploration/flow-and-wireframe-explorations.png`, `board-iteration-a…d.png`, `option-A-integrated-into-panel-management.png`, `option-B-standalone-dashboard.png`, `layout-option-1/2/3-*.png`, `layout-selected-full-board.png`

---

### 6. The solution

After several iterations I delivered high-fidelity designs for an interface that lets care teams and offices coordinate daily around their highest-risk patients. The UI met strict accessibility standards, with typography and layout tuned so information stays digestible during high-stress coordination.

**Feature beats (one image + one line each works well on a portfolio page):**

1. **Eliminated spreadsheet dependency** — Health Navigators view and update admissions directly in the EHR. Filters preserve the sort/filter/organize power they relied on in the spreadsheet.
   `06-final-design/final-admissions-board.png`, `filters-panel.png`
2. **Clarified ownership** — care team and next steps are explicit on every admission.
   `06-final-design/board-ownership-and-next-steps.png`, `07-ui-detail-crops/next-steps-and-review-date.png`, `care-team-column.png`
3. **Improved workflow and visibility** — views by status (pre-admit, active, discharged); service standards visible at a glance; no more hunting the chart for a discharge summary.
   `06-final-design/board-workflow-and-visibility.png`, `07-ui-detail-crops/service-standards.png`, `last-interaction-next-appt.png`
4. **Reduced time-to-action** — admissions tracking consolidated in the EHR for Health Navigators, PCPs, and office managers, including an admission panel in the patient chart.
   `06-final-design/board-time-to-action.png`, `patient-chart-admission-sidebar-final.png`, `07-ui-detail-crops/patient-story-summary.png`
5. **Data-driven decisions** — worked with Analytics to expose admissions data in Snowflake for frequency, duration, and reimbursement reporting.

**Images:** `03-illustrations/design-outcomes-photo-collage.png` (section opener)

---

### 7. Results

- **Increased efficiency** — less manual data entry and navigation by bringing admissions data into the EHR.
- **Improved patient outcomes** — better discharge planning and follow-up supported lower readmission rates.
- **User satisfaction** — Health Navigators and clinical staff reported the new system was more reliable and easier to use.
- **Foundation for automation** — structured fields ready for ADT integration from sources like Bamboo Health.

**By role:** Health Navigators could follow up better; PCPs could give better care at the point of care; office managers could confirm service standards were met in their clinics.

**Images:** `03-illustrations/results-photo-collage.png`

---

### 8. Learnings and what's next

1. **User-centered iteration mattered** — early workshops and testing revealed the multi-role need and led to a standalone experience connected to the chart.
2. **Cross-functional communication** — regular updates minimized scope changes and kept departments aligned.
3. **Build for scale** — I partnered with engineering so the MVP could absorb ADT feeds and reporting later.

**What I'd change:** bring automated data feeds in earlier; the MVP's impact would have been larger.

**Future roadmap (out of MVP/v1 scope):**
- Automatic inbound data from vendors like Redox and Bamboo Health (HL7 ADT → FHIR, reconciled to the CDP)
- Automatic de-duping and less manual entry (e.g. copy/paste from Particle or Redox feeds into a reviewer experience)
- Prioritization using worry score and complexity
- Tasks integration, structured admission reasons with ICD-10 codes, a med reconciliation field

**Images:** `03-illustrations/learnings-split-illustration.png`

---

### Things to fix before this goes live

These came up during extraction; they're worth resolving because a hiring manager will notice them.

| Issue | Where | Suggestion |
|---|---|---|
| **Results have no numbers.** "Reduced time," "lower readmission rates," "higher satisfaction" are all qualitative. The notes list specific measures (time on task, 30-day readmission %) but no values. | Slides 21, 24 | Add even one or two real figures, or an honest proxy ("pilot across N clinics," "retired the spreadsheet for X navigators"). If you can't share numbers, say that and describe the signal you saw. |
| **"Seven teams" but six are listed.** | Slide 8 notes | Find the seventh (Interop? Analytics? Senior Health?) or say "six." |
| **Dates don't line up.** Notes say "in 2024"; mock data is dated 2023. | Slides 1, 4, 12 | Fine since the data is fictional, but pick a project timeframe and state it in the snapshot. |
| **Three slides are blank.** Slide 3 ("My Role"), Slide 15 (between layout options and outcomes), and Slide 22 (final dashboard) have only a black background; any video or embedded content didn't survive the export. | Slides 3, 15, 22 | Slide 22's notes describe the finished dashboard, so it probably held a demo video or prototype walkthrough. Worth recovering from the original source. |
| **The ownership story is buried.** "Clarify ownership — who is responsible for doing what" is the sharpest insight in the deck but appears only as a slide caption. | Slides 10, 19 | Consider making it the headline insight that drives the design. |

---

# Part 2 — Image manifest

All paths are relative to `images/`. Slide numbers show where each image appeared in the deck.

| File | Slide | What it shows |
|---|---|---|
| `01-problem-context/hero-spreadsheet-to-admissions-board.png` | 1 | Spreadsheet on the left, arrow, new Admissions board on the right |
| `01-problem-context/legacy-admissions-tracking-spreadsheet.png` | 2 | The shared spreadsheet navigators used before |
| `02-final-ui-preview/admissions-board-expanded-row.png` | 4 | Board with an expanded admission row |
| `02-final-ui-preview/patient-chart-admission-sidebar.png` | 4 | Admission panel inside the patient chart |
| `02-final-ui-preview/admission-details-edit-form.png` | 4 | Create/edit admission form |
| `02-final-ui-preview/*-alt.png` (3 files) | 7 | Smaller variants of the same three screens |
| `03-illustrations/care-team-collaboration-illustration.png` | 6 | Illustration: care team around a table |
| `03-illustrations/goals-banner-illustration.png` | 7 | Illustration banner behind the goals slide |
| `03-illustrations/decor-plant-left/right.png` | 7 | Decorative plant cutouts |
| `03-illustrations/design-outcomes-photo-collage.png` | 16 | Photo + UI collage, "Design Outcomes" opener |
| `03-illustrations/results-photo-collage.png` | 24 | Photo collage behind Results |
| `03-illustrations/learnings-split-illustration.png` | 25 | Illustration: two people at desks |
| `04-research-process/design-challenge-system-map-7-teams.png` | 8 | System/org map of the teams and services involved |
| `04-research-process/stakeholder-workshop-photo.png` | 9 | Photo of the stakeholder workshop at the sticky-note wall |
| `04-research-process/journey-map-roles-and-handoffs.png` | 10 | Journey scenarios with roles and handoffs |
| `04-research-process/coordination-map-office-vs-supporting-teams.png` | 10 | Bubble map: in-office roles vs. supporting teams |
| `04-research-process/research-synthesis-user-stories-sheet.png` | 11 | Spreadsheet of synthesized user stories/JTBD |
| `05-exploration/flow-and-wireframe-explorations.png` | 12 | Flow and wireframe canvas |
| `05-exploration/board-iteration-a…d.png` (4 files) | 12 | Board iterations |
| `05-exploration/option-A-integrated-into-panel-management.png` | 13 | Option A |
| `05-exploration/option-B-standalone-dashboard.png` | 13 | Option B (chosen) |
| `05-exploration/layout-option-1-two-column.png` | 14 | Layout option 1 |
| `05-exploration/layout-option-2-three-column-next-steps.png` | 14 | Layout option 2 (chosen) |
| `05-exploration/layout-option-3-three-column-recent-tasks.png` | 14 | Layout option 3 |
| `05-exploration/layout-selected-full-board.png` | 14 | Full-board view of the chosen layout |
| `06-final-design/final-admissions-board.png` | 17 | Final board |
| `06-final-design/filters-panel.png` | 18 | Filter side panel |
| `06-final-design/board-ownership-and-next-steps.png` | 19 | Board, framed for ownership |
| `06-final-design/board-workflow-and-visibility.png` | 20 | Board, framed for visibility |
| `06-final-design/board-time-to-action.png` | 21 | Board, framed for time-to-action |
| `06-final-design/patient-chart-admission-sidebar-final.png` | 21 | Final in-chart admission panel |
| `07-ui-detail-crops/next-steps-and-review-date.png` | 19 | Callout: Next Steps + review date |
| `07-ui-detail-crops/service-standards.png` | 20 | Callout: service standards with status |
| `07-ui-detail-crops/last-interaction-next-appt.png` | 20 | Callout: last interaction / next appointment |
| `07-ui-detail-crops/add-admission-and-filter-buttons.png` | 20 | Callout: Add admission + filter controls |
| `07-ui-detail-crops/patient-story-summary.png` | 21 | Callout: patient story text block |
| `07-ui-detail-crops/care-team-column.png` | 21 | Callout: care team column |
| `07-ui-detail-crops/*-small.png` (2 files) | 4 | Smaller versions of two callouts |

**Left out of `images/`** (still in `originals/`): duplicates, icons and UI chrome under ~5 KB (arrows, chevrons, avatars), a checkerboard mask, and four solid-color slide backgrounds.

**Heads up on resolution:** most UI screenshots are 600–1,400 px wide. That's fine inline but soft at full-bleed on retina. For hero-size shots, re-export from Figma at 2x if you still have access.

---

# Part 3 — Verbatim extraction (all slide text and speaker notes)

### Slide 1

**On-slide text**

> One Medical
> Improving the care for hospitalized patients
>
> Admissions board

**Speaker notes**

One Medical is a technology enabled health clinic

expand to senior & medicare population

High risk One Medical Patients get hospitalized.

Said simply, readmissions are bad for patients

& expensive for the business.

Why does this matter?

We know that Patients are most at risk for readmissions within 7-10 days after discharge.

You would hope in 2024 there would be excellent tools for managing follow up care

unfortunately...

Tools that previously were missing.

That's where I came in...

This project is aimed at providing tools for managing this within the EHR.

This is a highly regulated space so all of the data has been fictionalized for the purposes of demonstration

### Slide 2

**On-slide text**

> When a patient is admitted to a hospital or other care facility, they are often at their most vulnerable and care is often at its most expensive.

**Speaker notes**

The Problem

Our team members are looking at Admissions everyday

These admissions require careful management and attention

Our Health Navigators to manually track data, to copy and paste it from the chart

Handoffs can lead to miscommunication, mistakes and possible worse outcomes for patients.

In short we’re attempting to manage one of our most important and high-risk areas of

care, hospital admissions, with manual, error-prone tools

Definitions

1. “Admission” - When a patient receives significant care at an outside facility, usually

for a more severe health event, such as a visit to the Emergency Department,

outpatient surgery, or skilled nursing facility.

2. “ADT” - Admission, Discharge, and Transfer. The three major state-changes that a

patient can go through at one of these facilities. It’s common for a facility to report

these via interop channels. One Medical uses Bamboo Health, CMT, and other data

sources to track these.

3. “Health Navigator” - a non-clinician care team member responsible for supporting a

panel of value-based patients, particularly when they are outside of the One Medical

ecosystem.

### Slide 3

**On-slide text**

_(none — visual only)_

**Speaker notes**

My Role

As the lead designer, I drove the end-to-end design process, collaborating with product managers, engineers, and clinical stakeholders to create a scalable, user-centered solution.

### Slide 4

**On-slide text**

> Admitted for management of chronic heart failure and hypertension following an ER visit.
>
> Unplanned
>
> Health Navigator to coordinate follow-up with cardiology and schedule a post-discharge PCP visit.
>
> Patient is a 73-year-old with a history of COPD and diabetes, recently experiencing shortness of breath and elevated blood pressure.
> UCSF Parnassus
>
> 03/05/2023
>
> Patient has a DNR in place and prefers conservative treatment
>
> Chris F, HN
>
> chronic heart failure and hypertension
>
>
> Patient has a DNR in place and prefers conservative treatment; designated healthcare proxy is spouse.
>
>
>
>
>
>
>
>
>
>
>
>

**Speaker notes**

We went from spreadsheet to full on power user dashboard

Hang in there, because I'm about to tell you exactly how I got here

### Slide 5

**On-slide text**

> 01
> 02
> Provide high-value, timely care to our most vulnerable patients
> Enable the care teams and offices to coordinate daily activities around addressing the needs of these high risk patients
> Vision

**Speaker notes**

The vision is simple

Provide high-value, timely care to our most vulnerable patients

Enable the care teams and offices to coordinate daily activities around addressing the needs of these high risk patients

### Slide 6

**On-slide text**

> Enabling Better Health Outcomes

**Speaker notes**

My role was to lead the design of an integrated Admissions Board within the One Medical's Electronic H..., based on users’ pain points.

I worked on this while managing the Practice Management team. This team was made up of 3 squads.

Scheduling

Billing

Workflow

We were under resourced

1 design direct report

Player coach

Journeys

Wireframes

Mocks

Prototypes

Agile sprints

Shipped features

### Slide 7

**On-slide text**

> User Goal
> Business Goal
> Measures
> Improve how we manage and engage hospitalized patients, so care teams provide the right level of attention to high-need patients and avoid costly readmissions.
> Enable Health Navigators and other care team members to give our patients admitted to hospitals (and other facilities) attentive care that will improve outcomes and reduce costs.
> Reduce the manual effort to help care teams be more efficient and decrease time spent navigating around the chart looking for information.

**Speaker notes**

The goal was to eliminate the spreadsheet reliance and enable Health Navigators to efficiently manage and track patient admissions, ensure timely follow-ups post-discharge, and improve patient outcomes, especially for high-risk and senior patients.

Make it easier to assess and document patient risk, so patients receive appropriate level of support and we get the proper funding for their care.

which required deep knowledge of regulatory guidelines.

Make care gaps and proactive care actions visible, so providers can more easily address chronic conditions at the point of care.

Reduce the manual burden to help care teams to be more efficient and free bandwidth for other tasks.

-time spent on tasks

-task completion

-Decrease time spent navigating around the chart looking for

information

-What % of the admissions are readmissions within 30 days of discharge

### Slide 8

**On-slide text**

> Design Challenges

**Speaker notes**

Just copy the spreadsheet into the chart right?

Wrong, I wish I could tell you it was that easy

I had to be very intentional about how to solve this

To implement a solution this design had to go through seven different teams

Charting

Ordering (Amazon Pharmacy)

Care insights

Scheduling

Billing

Workflow

The Chart was written on a monolithic tech stack, while the practice management tools were a separate application made up of micro-services

For this project to be successful it had to pull data from a shared service and update in real time across the chart and practice management platform

In some cases the tech stacks were owned by completely different teams

Assumptions:

1. Allow users to create, edit, and update the details of an admission

2. Allow users (primarily Health Navigators) to view active, pre-admit, and discharged

stays at hospitals and other ‘in-patient’ facilities

3. Allow users to filter and modify the views so they can focus on the admissions

relevant to their team

4. Allow analytics teams to assess:

a. Admission frequency, duration, and resolutions

b. Typical data cuts (region, pt cohorts, etc)

c. Important for VBC reimbursement

### Slide 9

**On-slide text**

_(none — visual only)_

**Speaker notes**

To address the urgency, I led a rapid ideation phase using workshops to align cross-functional teams on core priorities. We prioritized an MVP that delivered immediate impact by reducing manual processes while designing for future scalability.

1. Stakeholder Alignment and Vision Workshop:

• Engaged Product Managers, engineers, and clinical leads to define a shared vision, capturing insights into each team’s needs, priorities, and pain points.

Stakeholders across

Senior health

Clinical operations

Clinical tech & leadership

We kicked off with a rigorous research phase, involving user surveys, interviews, and extensive data analysis.

We learned the most important value was to give office managers an overview of patient care for their practice that aligned with service standards.

They needed to know next steps and actions for patient care at a glance, and it needed to be available in the patient chart.

I documented these in a DACI framework to clarify accountability and feedback channels.

### Slide 10

**On-slide text**

> Coordination, visibility

**Speaker notes**

JTBD and Journey Mapping

These insights uncovered multiple roles & handoffs depending on patient complexity

Mapped the primary user tasks and journeys.

This allowed the team to understand critical workflows and identify high-impact areas for the new Admissions Board.

Clarify ownership - who is responsible for doing what

Workshop insights:

Office managers need to see how we’re doing as a practice.

The service standards are clearly outlined and I know if they are being met.

Health navigators, PCPs, RNs, front desk staff, virtual care support, clinical operations

1. Note a patient’s admission status

2. Allow care teams and offices to coordinate daily activities

3. Maintain visibility and accountability while reducing risk

### Slide 11

**On-slide text**

> As a care navigator conducting panel management (weekly panel mgmt tasks)
> I want to get in touch with patients whom my care team hasn't recently interacted
> So that patients receive necessary follow up care

**Speaker notes**

Iterative Design and User Testing:

Alongside a UX researcher, drafted & revised research questions, conducted user interviews & observational studies while gathering insights directly from Health Navigators.

Insights became JTBD, and user stories

prioritized, acquired stakeholder agreement

Assisted in defining the data model in close partnership with engineering and product teams during agile sprints, ensuring design feasibility and efficient development.

• Established regular check-ins with stakeholders and cross-functional teams to ensure alignment, provide updates, and address any new issues in real-time.

• Kept senior health leadership informed, facilitating targeted sessions to manage expectations and maintain project momentum.

• Established measurable outcomes, particularly around tracking admissions, facilitating discharge planning, and reducing the risk of readmission.

### Slide 12

**On-slide text**

> Health Navigator to coordinate follow-up with cardiology and schedule a post-discharge PCP visit.
>
> UCSF Parnassus
>
> Admitted for management of chronic heart failure and hypertension following an ER visit.
>
> Patient is a 73-year-old with a history of COPD and diabetes, recently experiencing shortness of breath and elevated blood pressure.
> 03/05/2023
>
> Patient has a DNR in place and prefers conservative treatment; designated healthcare proxy is spouse.
>
> Chris F, HN
>
> Exploring
> The Options

**Speaker notes**

As I developed the Admissions Board solution

I explored several directions, let's take a look at the options that performed best

### Slide 13

**On-slide text**

> Option A
> Option B
> Integrated into Panel Management
> Standalone dashboard

**Speaker notes**

integrating the Admissions Board within the existing Panel Management experience

(Option A) and creating a standalone dashboard specifically for admissions

(Option B). Each approach had its advantages and potential tradeoffs, leading me to evaluate which solution would best meet the diverse needs of our users, from PCPs to health navigators and office managers.

Option A: Integrated with Panel Management

• Initial Assumptions:

The Panel Management experience was primarily used by PCPs to manage patient panels, making it an initially attractive option to incorporate admissions tracking.

• Advantages:

• Centralized location for PCPs managing their patient panel and monitoring admissions, potentially reducing navigation time.

• Consistency within a familiar interface, reducing learning curve.

• Tradeoffs:

• Panel Management was optimized for individual patient monitoring rather than clinic- or practice-wide visibility.

• Limited flexibility to support the specific workflows of health navigators and office managers.

• Stakeholder feedback revealed that office managers needed a broader, clinic-level view for daily operations, something that Panel Management could not easily accommodate.

Option B: Standalone Admissions Dashboard

• Discovery through User and Stakeholder Feedback:

Discussions with health navigators, office managers, and PCPs highlighted a distinct set of use cases for admissions that extended beyond individual patient management.

• Advantages:

• Tailored specifically to the needs of health navigators and office managers, who required practice-wide visibility into patient admissions status.

• Flexibility to incorporate additional admissions-specific features in the future, such as automated ADT data streams.

• Reduced cognitive load for PCPs, as admissions tracking was separate from their primary panel management tasks.

• Decision:

After user feedback and review with stakeholders, it became clear that the standalone dashboard (Option B) would better serve the needs of a wider range of users, allowing us to prioritize visibility and functionality specific to the admissions process.

Outcome:

The standalone Admissions Board offered a more scalable solution for monitoring patient admissions across multiple roles, ensuring that all team members—PCPs, health navigators, and office managers—had the tools and visibility needed to provide coordinated, high-quality care. This approach also set the foundation for future admissions-focused improvements, such as streamlined data entry and 3rd party integration.

### Slide 14

**On-slide text**

> Option 1
>
> 2-Column Design
> Admissions & Service Standards
>
> Option 2
> 3-Column Design
> Admissions, Service Standards, & Next Steps
> Option 3
>
> 3-Column Design with Recent Tasks
> Admissions, Service Standards, & Recent Tasks

**Speaker notes**

balance key information and support diverse user needs.

The goal was to provide clarity on admissions, service standards, and actionable next steps to ensure office managers and health navigators had all the critical information at a glance.

I ultimately selected a 3-column design with admissions details, service standards, and next steps based on user feedback, particularly from office managers who emphasized the importance of clear next steps.

Layout Options Explored:

Option 1: 2-Column Design (Admissions & Service Standards)

• Pros:

• Focuses on core information without overwhelming the user.

• Simplifies the layout, making admissions and service standards immediately visible.

• Cons:

• Lacks a dedicated space for next steps, which users identified as crucial in follow-up discussions.

• Tradeoffs:

• While this option provided an uncluttered experience, it didn’t offer direct visibility of next steps, an essential aspect for office managers coordinating daily tasks.

Option 2: 3-Column Design (Admissions, Service Standards, & Next Steps)

• Pros:

• Elevates next steps alongside admissions and service standards, giving office managers immediate access to actionable items.

• Supports multi-role use cases, as both health navigators and office managers needed next steps for daily decision-making.

• Cons:

• Adds more visual complexity compared to the 2-column design.

• Decision Factors:

• User feedback highlighted the importance of next steps for team coordination and service standards, especially when working with high-risk patients. After testing, this layout provided the best balance of essential information without redundancy.

Option 3: 3-Column Design with Recent Tasks (Admissions, Service Standards, & Recent Tasks)

• Pros:

• Recent tasks add valuable context to the admissions process, helping users understand recent actions taken on a case.

• Aligns well with task-tracking needs for users who frequently monitor patient history.

• Cons:

• Potentially overwhelming, with less emphasis on next steps.

• Tradeoffs:

• While recent tasks add context, users indicated that having immediate visibility of actionable next steps was more critical, as recent tasks could be accessed elsewhere on the dashboard.

Final Decision: 3-Column Design (Admissions, Service Standards, & Next Steps)

Based on user testing and feedback, I selected the 3-column layout focusing on admissions, service standards, and next steps. This layout achieved a balance between providing comprehensive patient information and actionable insights. Users, particularly office managers, emphasized that having clear next steps was essential to ensure timely and coordinated patient care, while recent tasks, though valuable, could be accessed in other dashboard sections.

Outcome:

This layout decision enhanced usability, allowing health navigators and office managers to prioritize actions directly from the Admissions Board. The design supports real-time decision-making and facilitates a streamlined workflow for high-impact admissions management across teams.

### Slide 15

**On-slide text**

_(none — visual only)_

**Speaker notes**

_(none)_

### Slide 16

**On-slide text**

> Design Outcomes

**Speaker notes**

Outcome
Following several iterations, I delivered high-fidelity designs for an interface that

allows care teams and offices to coordinate daily activities around

addressing the needs of these high risk patients.

The final UI adhered to strict accessibility standards, with thoughtful use of typography and layout to ensure information was digestible during high-stress care coordination.

Okay, let's dive deep

### Slide 17

**On-slide text**

> Eliminated spreadsheet dependency to perform active daily management of admissions

**Speaker notes**

Outcome

Allow care teams and offices to coordinate daily activities around addressing the needs of these high risk patients.

### Slide 18

**On-slide text**

> Eliminated spreadsheet dependency to perform active daily management of admissions

**Speaker notes**

Outcome

Allow care teams and offices to coordinate daily activities around addressing the needs of these high risk patients.

1. Eliminated Spreadsheet Dependency:

• Allowed Health Navigators to view and update admissions information directly within the EHR, reducing time spent on manual tracking and minimizing errors.

Filters preserved the ability to sort, filter, and organize data

### Slide 19

**On-slide text**

> Clarify ownership - who is responsible for doing what

**Speaker notes**

Something that came up during interviews

Clarify ownership and next steps

### Slide 20

**On-slide text**

> Improved Workflow and Visibility

**Speaker notes**

Improved Workflow and Visibility:

• Provided Health Navigators with intuitive filters and views to manage admissions by patient status (e.g., pre-admit, active, discharged) efficiently.

• Enhanced visibility into patient care steps, improving Health Navigators’ ability to coordinate and manage high-risk patients’ transitions smoothly.

The service standards are clearly outlined and I know if they are being met.

Users no longer need to search the chart for a discharge summary.

### Slide 21

**On-slide text**

> Reduced Time-to-Action

**Speaker notes**

3. Reduced Time-to-Action:

• By consolidating admissions tracking within the EHR, team members could spend more time actively managing care rather than navigating multiple tools. Early results showed increased efficiency, with a noticeable decrease in time spent updating patient status.

Health Navigators

PCPs

Office Managers

4. Supported Data-Driven Decision Making:

• Worked with Analytics team to make admissions data accessible via Snowflake,

analytics teams could assess admission frequency, duration, and other metrics, enabling continuous improvement in patient care management. Important for reimbursement

### Slide 22

**On-slide text**

_(none — visual only)_

**Speaker notes**

Transformed the admissions tracking process from spreadsheets to a seamless, integrated EHR tool.

The final dashboard transformed a fragmented process into an elegant, intuitive platform. It allowed Health Navigators and office managers to monitor admissions, prioritize actions, and improve care outcomes.

### Slide 23

**On-slide text**

> Results

**Speaker notes**

_(none)_

### Slide 24

**On-slide text**

> 01
> Increased Efficiency: The Admissions Board reduced time spent on manual data entry and navigation by integrating admissions data directly into the EHR
> 02
> Improved Patient Outcomes: By enabling Health Navigators to better manage discharge planning and follow-ups, the tool supported lower readmission rates and improved overall patient care.
> 03
>
> User Satisfaction: Health Navigators and clinical staff reported higher satisfaction with the new system, as it was more reliable and easy to use, aligning with their workflows seamlessly.
> Results

**Speaker notes**

Result

• Increased Efficiency: The Admissions Board reduced time spent on manual data entry and navigation by integrating admissions data directly into the EHR.

• Improved Patient Outcomes: By enabling Health Navigators to better manage discharge planning and follow-ups, the tool supported lower readmission rates and improved overall patient care.

• Enhanced User Satisfaction: Health Navigators and clinical staff reported higher satisfaction with the new system, as it was more reliable and easy to use, aligning with their workflows seamlessly.

Health Navigators could facilitate better patient follow up care

PCPs were enabled to provide better care at the point of care

Office managers could ensure service standards were met within their clinics

• Foundation for Future Automation: The board’s design included structured fields for future ADT integration, setting up the infrastructure for automated admission data input from sources like Bamboo Health.

### Slide 25

**On-slide text**

> Importance of User-Centered Iteration: Early-stage workshops and user testing were critical in uncovering pain points and refining features that fit the Health Navigators’ workflows
> Cross-Functional Communication: Regular updates and clear communication helped manage expectations and maintain stakeholder engagement.
> Building for Scalability: By designing the board to support future automation and reporting needs, we created a scalable foundation that would reduce manual work further as ADT integration evolves.
>
> Learnings

**Speaker notes**

Learnings

1. Importance of User-Centered Iteration: Early-stage workshops and user testing were critical in uncovering pain points and refining features that fit the Health Navigators’ workflows, demonstrating the impact of incorporating end-user feedback throughout.

This lead to insights for supporting multiple roles, and connecting a standalone experience connected to the chart

helped to align efforts across multiple teams and stakeholders

2. Cross-Functional Communication: Regular updates and clear communication helped manage expectations and maintain stakeholder engagement. This also minimized scope changes and ensured alignment on goals across departments.

While the MVP delivered quick wins, I partnered with engineering to ensure the platform was adaptable for future automation and integrations, like ADT (Admission, Discharge, Transfer) data feeds. This foresight ensured the product would grow with evolving care models and workflows.

3. Building for Scalability: By designing the board to support future automation and reporting needs, we created a scalable foundation that would reduce manual work further as ADT integration evolves.

What I Would Change: Incorporating automated data feeds earlier could have enhanced the MVP’s impact.

Out of scope for MVP and v1, likely future features we should anticipate and

support

1. Automation

a. Automatic inbound data streams from vendors like Redox and Bamboo Health.

Interop will handle getting this HL7 ADT data into FHIR for reconciliation to the

CDP.

b. Automatic de-duping; fewer manual entry requirement:

Today all data is hand-entered.

We should explore improving the reviewer experience

for example can we copy and paste data from the Particle or Redox feed?

2. Improvements

a. Leveraging other data (e.g. worry score, complexity) for prioritization

b.integrate with Tasks and other systems

i. Structured reason for admission with ICD-10s

a. Med reconciliation field
