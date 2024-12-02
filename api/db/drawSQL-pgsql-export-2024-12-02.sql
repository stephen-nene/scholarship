CREATE TABLE "scholarships"(
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSON NOT NULL,
    "eligibility_criteria" TEXT NOT NULL,
    "funding_amount" FLOAT(53) NOT NULL,
    "deadline" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" INTEGER CHECK
        (
            "status" IN(
                'active',
                'archived',
                'due',
                'deactivated'
            )
        ) NOT NULL,
        "contact_email" TEXT NOT NULL,
        "application_link" TEXT NOT NULL,
        "country" TEXT NOT NULL
        "major" INTEGER NOT NULL 
);
ALTER TABLE
    "scholarships" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone-number" INTEGER NOT NULL,
    "profilepic" TEXT NULL,
    "address" JSON NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "reset_token" BIGINT NOT NULL,
    "reset_expiry" TIME(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "scholarship_tags"(
    "tag_id" TEXT NOT NULL,
    "scholarship_id" TEXT NOT NULL
);
CREATE TABLE "meetings"(
    "id" TEXT NOT NULL,
    "admin_id" TEXT NULL,
    "scholarship_id" TEXT NULL,
    "status" VARCHAR(255) CHECK
        (
            "status" IN(
                'pending',
                'approved',
                'completed',
                'cancelled'
            )
        ) NOT NULL,
        "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "type" VARCHAR(255)
    CHECK
        ("type" IN('group', 'personal')) NOT NULL,
        "meeting_link" TEXT NULL
);
ALTER TABLE
    "meetings" ADD PRIMARY KEY("id");
CREATE TABLE "tags_types_categories"(
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "tags_types_categories" ADD PRIMARY KEY("id");
CREATE TABLE "applications"(
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scholarship_id" TEXT NOT NULL,
    "tracking_number" TEXT NOT NULL
);
ALTER TABLE
    "applications" ADD PRIMARY KEY("user_id");
CREATE TABLE "meeting_participants"(
    "user_id" TEXT NOT NULL,
    "meeting_id" TEXT NOT NULL
);
ALTER TABLE
    "meeting_participants" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "scholarship_tags" ADD CONSTRAINT "scholarship_tags_scholarship_id_foreign" FOREIGN KEY("scholarship_id") REFERENCES "scholarships"("id");
ALTER TABLE
    "meeting_participants" ADD CONSTRAINT "meeting_participants_meeting_id_foreign" FOREIGN KEY("meeting_id") REFERENCES "meetings"("id");
ALTER TABLE
    "meetings" ADD CONSTRAINT "meetings_admin_id_foreign" FOREIGN KEY("admin_id") REFERENCES "users"("id");
ALTER TABLE
    "meetings" ADD CONSTRAINT "meetings_scholarship_id_foreign" FOREIGN KEY("scholarship_id") REFERENCES "scholarships"("id");
ALTER TABLE
    "applications" ADD CONSTRAINT "applications_scholarship_id_foreign" FOREIGN KEY("scholarship_id") REFERENCES "scholarships"("id");
ALTER TABLE
    "scholarship_tags" ADD CONSTRAINT "scholarship_tags_tag_id_foreign" FOREIGN KEY("tag_id") REFERENCES "tags_types_categories"("id");
ALTER TABLE
    "applications" ADD CONSTRAINT "applications_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "meeting_participants" ADD CONSTRAINT "meeting_participants_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");