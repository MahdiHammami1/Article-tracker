# 🧠 ResearchFlow — Scientific Article Lifecycle Tracking Platform

ResearchFlow is a  web application designed to track the complete lifecycle of scientific articles — including state transitions, version history, reviewer interactions, timelines, statistics, and exports.  
It implements a fully auditable workflow similar to real academic publishing systems (journal or conference submission pipelines).

This project follows clean modular architecture principles and enforces strict role-based permissions for Authors, Reviewers, and Editors.

---

# 🚀 Features Overview

## ✔ Article Lifecycle Tracking
- Draft → Submitted → Under Review → Accepted/Rejected → Published  
- Each transition is validated according to user role  
- Automatic recording of lifecycle events

## ✔ Version Management
- Multiple article versions (v1, v2, v3…)  
- PDF uploads  
- Associated files  
- Change summaries  
- Diff view between any two versions  

## ✔ Reviewer Workflow
- Submit evaluations  
- Upload reports  
- Request minor/major revisions  
- Recommend acceptance or rejection  

## ✔ Editor Workflow
- Assign reviewers  
- Approve or reject decisions  
- Finalize acceptance  
- Publish article  

## ✔ Dashboard Analytics
- Average time spent per state  
- Number of revisions per article  
- Article lifecycle timeline visualization  
- Reviewer decision distribution  
- Table of longest review cycles  

## ✔ Export Tools
- Export lifecycle as PDF  
- Export statistics as Excel (.xlsx)

---

# 🧱 Technologies Used

## Frontend
- **React** or **Next.js**
- **TailwindCSS**
- **Recharts** or **Chart.js**
- PDF viewer support
- Clean UI with sidebar layout



---

# 📌 Domain Model

## 📝 Article
| Field | Description |
|-------|-------------|
| id | unique identifier |
| title | article title |
| abstract | summary |
| keywords | array of tags |
| authors | list of authors (name + role) |
| createdAt | creation timestamp |
| updatedAt | update timestamp |
| currentVersionNumber | latest version index |
| currentStatus | DRAFT, SUBMITTED, etc. |

---

## 📝 ArticleVersion
| Field | Description |
|-------|-------------|
| id | unique identifier |
| articleId | reference to Article |
| versionNumber | v1, v2… |
| submittedAt | timestamp |
| contentFile | PDF file |
| associatedFiles | supplementary files |
| changeSummary | explanation of changes |
| diffWithPreviousVersion | visual/text diff |

---

## 📝 LifecycleEvent
| Field | Description |
|-------|-------------|
| id | event id |
| articleId | target article |
| versionNumber | version involved |
| oldState | previous lifecycle state |
| newState | new lifecycle state |
| changedBy | user performing the action |
| reason | justification |
| timestamp | event time |
| changedFiles | updated files list |

---

# 🔄 Lifecycle Rules

The application enforces strict workflow transitions:

| Transition | Role Allowed |
|-----------|--------------|
| DRAFT → SUBMITTED | Author |
| SUBMITTED → UNDER_REVIEW | Editor |
| UNDER_REVIEW → REVISION_REQUIRED | Reviewer |
| UNDER_REVIEW → ACCEPTED | Editor |
| UNDER_REVIEW → REJECTED | Editor |
| REVISION_REQUIRED → SUBMITTED | Author |
| ACCEPTED → PUBLISHED | Editor |

Each transition triggers a **LifecycleEvent** entry.

---

# 👥 User Roles (RBAC)

### 🧑‍💻 Author
- Create articles  
- Edit metadata  
- Upload new versions  
- Submit articles  
- View reviewer feedback  

### 🕵️ Reviewer
- Evaluate assigned articles  
- Upload review files  
- Request revisions  
- Recommend acceptance/rejection  

### 🧑‍🏫 Editor
- Assign reviewers  
- Validate submissions  
- Approve or reject decisions  
- Publish articles  

---

# 🌐 UI Pages

### Authentication
- Login  
- Register  
- Role selection  

### Article Management
- List articles  
- Article details view  
- Metadata editor  
- File upload section  
- Version manager  
- Timeline viewer  
- Diff viewer  

### Reviewer Workflow
- Reviewer dashboard  
- Evaluation submission  

### Editor Workflow
- Reviewer assignment  
- Decision UI  
- Publication page  

### Admin Dashboard
- Metrics overview  
- Charts  
- Export buttons  

---

# 🏗 Project Structure


