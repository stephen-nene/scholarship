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

### **Explanation of Columns**

- **Basic Scholarship Info**: Columns like `scholarship_name`, `scholarship_code`, and `description` describe the scholarship and give basic details.
  
- **Dates and Deadlines**: The `application_deadline`, `start_date`, and `end_date` columns help track important dates related to the scholarship.

- **Eligibility and Requirements**: The `eligibility_requirements`, `academic_requirements`, and `required_documents` columns help filter who can apply for the scholarship.

- **Target Audience**: The `target_audience` column lets the scholarship specify groups that are encouraged to apply.

- **Financials and Awards**: `award_amount`, `currency`, `number_of_awards`, and `scholarship_type` help define how the scholarship is awarded.

- **Institution and Region**: Columns like `country_of_origin`, `region`, `institution_name`, and `institution_type` provide information about where the scholarship is available.

- **User Interaction**: The `created_by_user_id` and `updated_by_user_id` columns are foreign keys that link to users, helping track who added or modified a scholarship.

- **Application Process and Selection**: The `user_applications_count`, `application_url`, `selection_criteria`, and `terms_and_conditions` track how the scholarship is being applied to and how the selection is handled.

- **Admin and Status Info**: `scholarship_status`, `created_at`, `updated_at` are useful for maintaining the state of the scholarship and tracking when it was created or updated.

### **Schema Usage**

This table can be used to store a wealth of information about scholarships available to African students, and by using the various columns, admins can add and manage scholarship opportunities effectively. You can also join it with a `users` table to keep track of who applied, who created scholarships, and who updated the information.

---

Let me know if you'd like to generate the Django models for this table or need more help with the database design!