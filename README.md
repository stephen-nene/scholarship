[1](https://fullyfundedpostgraduatescholarships.com/)
[2](https://africanscholarshiphub.org/)
[3](https://www.gradcracker.com/)


Here’s an **exaggerated schema** for a scholarship website database table that focuses on scholarships for African countries. This table includes a range of columns to cover a variety of scholarship-related information and incorporates items like user details, scholarship requirements, eligibility, and country-specific details.

### **Scholarships Table Schema**

| **Column Name**              | **Description**                                                                                       |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `id`                          | Primary key, unique identifier for each scholarship entry.                                            |
| `scholarship_name`            | Name of the scholarship.                                                                               |
| `scholarship_code`            | Unique code for the scholarship, e.g., "AFR1001".                                                     |
| `description`                 | Detailed description of the scholarship, including objectives and benefits.                           |
| `award_amount`                | Monetary value of the scholarship. Can be in a specific currency (USD, EUR, etc.).                   |
| `currency`                    | Currency of the scholarship award amount (e.g., USD, EUR, KES).                                      |
| `application_deadline`        | Deadline for submitting scholarship applications (date).                                              |
| `start_date`                  | Date when the scholarship program starts.                                                             |
| `end_date`                    | Date when the scholarship program ends.                                                               |
| `eligibility_requirements`    | Textual description of the eligibility requirements for applying.                                    |
| `country_of_origin`           | Country that offers the scholarship (can be an African country, e.g., Kenya, Nigeria, Egypt, etc.).   |
| `region`                      | Region within Africa, e.g., East Africa, West Africa, North Africa, etc.                             |
| `field_of_study`              | Specific field of study or academic program the scholarship is for (e.g., Engineering, Medicine).     |
| `degree_level`                | Level of study covered (e.g., Undergraduate, Masters, PhD, Diploma).                                  |
| `institution_name`            | Name of the university or institution offering the scholarship.                                       |
| `institution_type`            | Type of institution (e.g., public, private, international).                                           |
| `scholarship_type`            | Type of scholarship (e.g., full-ride, partial, tuition-only, living stipend).                         |
| `target_audience`             | Targeted applicants (e.g., women, students from rural areas, students with disabilities).             |
| `academic_requirements`       | Minimum academic qualifications required (e.g., GPA, test scores, etc.).                             |
| `contact_email`               | Email address for scholarship inquiries or applications.                                              |
| `contact_phone`               | Contact phone number for scholarship inquiries.                                                      |
| `application_url`             | URL to the scholarship application page or form.                                                     |
| `scholarship_status`          | Current status of the scholarship (e.g., Open, Closed, Upcoming).                                    |
| `number_of_awards`            | Total number of scholarship awards available for each academic cycle.                                 |
| `terms_and_conditions`        | Link or detailed information about the terms and conditions of the scholarship.                       |
| `created_at`                  | Timestamp for when the scholarship record was created.                                                |
| `updated_at`                  | Timestamp for when the scholarship record was last updated.                                          |
| `created_by_user_id`          | Foreign key linking to the user (admin or staff) who created the scholarship record.                 |
| `updated_by_user_id`          | Foreign key linking to the user (admin or staff) who last updated the scholarship record.            |
| `associated_programs`         | Programs or initiatives that the scholarship is associated with (e.g., mentorship programs, internships). |
| `required_documents`          | List of documents required to apply (e.g., Transcripts, Recommendation Letters).                      |
| `host_organization_name`      | The organization hosting the scholarship (if different from the institution).                          |
| `funding_partner`             | Name of any funding partners or sponsors (if applicable).                                             |
| `user_applications_count`     | Number of applications submitted by users for this scholarship.                                       |
| `selection_criteria`          | Selection process or criteria (e.g., interviews, essay submission, portfolio review).                 |
| `scholarship_restrictions`    | Any restrictions on who can apply (e.g., only residents of a specific country).                       |

Kanban cards can be designed and structured in various ways, depending on your workflow and how you want to break down tasks. Since you're building a scholarship website, I’ll guide you through three approaches to designing your cards: **(1) by functional areas, (2) by frontend/backend split, and (3) component-based.** I'll also provide a detailed way to flesh out cards for each stage from start to finish.

---

## **1. Functional Area-Based Cards**  
This approach divides tasks based on features or functionalities of your website. Each card represents a feature or functionality.

### **Example Kanban Columns (Functional Area-Based)**  
- **To Be Done**: Tasks waiting to be picked up.  
- **Design**: Planning and prototyping phase.  
- **Development**: Active coding phase.  
- **Testing**: QA or user testing phase.  
- **Completed**: Fully finished tasks.

### **Card Examples**  
#### **Card: Scholarship Application Form**
- **Title**: Build Scholarship Application Form  
- **Description**: Create a form for users to fill out their scholarship applications.  
- **Checklist**:  
  - Design form layout in Figma.  
  - Develop form fields (name, email, essay, etc.).  
  - Validate inputs (e.g., required fields, file uploads).  
  - Integrate backend API to save form data.  
  - Add tests for validation.  
- **Labels**: Frontend, Backend, High Priority.  
- **Deadline**: Dec 15, 2024.  

#### **Card: Notification System**  
- **Title**: Build Deadline Notification System  
- **Description**: Notify users via email before scholarship deadlines.  
- **Checklist**:  
  - Design email templates.  
  - Write backend service for scheduling notifications.  
  - Test emails for formatting.  
  - Deploy and test in production.  
- **Labels**: Backend, Medium Priority.  

---

## **2. Frontend/Backend Split**  
This approach divides tasks based on whether they pertain to the **frontend** (React) or **backend** (Rails).  

### **Example Kanban Columns (Frontend/Backend Split)**  
- **To Be Done**  
- **Frontend**: Tasks for React components, UI, and client-side logic.  
- **Backend**: Tasks for APIs, database models, and server-side logic.  
- **Integration**: Tasks where frontend and backend meet.  
- **Completed**  

### **Card Examples**  
#### **Frontend Card: Scholarship Listing Page**  
- **Title**: Build Scholarship Listing Page  
- **Description**: Display a list of available scholarships with pagination and search functionality.  
- **Checklist**:  
  - Create React component for scholarship cards.  
  - Add a search bar and filters.  
  - Style the page with CSS/Material UI.  
  - Test responsiveness on mobile and desktop.  
- **Labels**: Frontend, Medium Priority.  
- **Deadline**: Dec 20, 2024.  

#### **Backend Card: Scholarship Data API**  
- **Title**: Build API for Scholarship Data  
- **Description**: Create an API endpoint to fetch scholarship data with filters and pagination.  
- **Checklist**:  
  - Define database schema for scholarships.  
  - Write API endpoint (`/api/scholarships`).  
  - Add query parameters for filtering (e.g., category, location).  
  - Write RSpec tests for API.  
- **Labels**: Backend, High Priority.  
- **Deadline**: Dec 18, 2024.  

---

## **3. Component-Based Cards**  
This approach breaks tasks into React components, backend models, or specific features.  

### **Example Kanban Columns (Component-Based)**  
- **Planning**: Define the scope of each component.  
- **Development**: Code individual components or features.  
- **Integration**: Combine components and test functionality.  
- **Testing**: Ensure everything works as intended.  
- **Completed**  

### **Card Examples**  
#### **Component: Scholarship Card Component**  
- **Title**: Build Scholarship Card Component  
- **Description**: A reusable card component for displaying scholarship details.  
- **Checklist**:  
  - Design the card layout (title, deadline, description).  
  - Add a button for "Apply Now."  
  - Style the card using CSS/Material UI.  
  - Test the card with dummy data.  
- **Labels**: Frontend, Low Priority.  
- **Deadline**: Dec 10, 2024.  

#### **Component: User Authentication API**  
- **Title**: Build User Authentication API  
- **Description**: Allow users to sign up, log in, and manage their accounts.  
- **Checklist**:  
  - Set up Devise in Rails.  
  - Add JWT token support for API authentication.  
  - Create endpoints for login/logout.  
  - Write tests for authentication flow.  
- **Labels**: Backend, High Priority.  

---

## **Comparison of Approaches**
| **Approach**             | **When to Use**                                             | **Pros**                                            | **Cons**                                               |
|---------------------------|-----------------------------------------------------------|----------------------------------------------------|-------------------------------------------------------|
| **Functional Area-Based** | When you think in terms of features or deliverables.       | Keeps tasks focused on user outcomes.              | Tasks may span both frontend and backend.             |
| **Frontend/Backend Split**| When you have distinct teams or are more code-focused.     | Clear separation of concerns for developers.       | Can cause disconnect between frontend and backend.    |
| **Component-Based**       | When building a modular, reusable architecture.            | Encourages modular and testable code.              | May lose sight of the big picture (features).         |

---

## **Recommendation for You**
- Start with **Functional Area-Based** cards for broader features.  
- As you work on each feature, create **Frontend/Backend** or **Component-Based** cards to break them into smaller tasks.  

For example:  
1. Create a card for **Scholarship Application Workflow** under functional areas.  
2. Break it into smaller **Frontend** and **Backend** tasks (e.g., "Build Application Form UI," "Write API for Submitting Applications").  
3. Inside the smaller tasks, add **component-based subtasks** (e.g., "Design Submit Button Component").

Let me know if you need help setting this up in GitHub or further refining your workflow!


# rogress
- initialised the backend
- started designing the tables
- Having a structure
- Getting some ideas on how the frontend will look like (blockers)

# Blockers
- Frontend look and feel
- what a scholarshi entails