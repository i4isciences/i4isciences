# Careers page edits and form spec
**PREPARED: Fri, Nov 13, 2026, 7:53 PM CST (v3)** | I4I Sciences LLC | Page: https://www.i4isciences.com/careers

Facts observed on the live page on Nov 13, 2026 (7:50 PM CST):
- Roles section says "There are no open roles right now" and the "See open roles" button points to a #roles section with no listings.
- Four hiring areas are described (India: core team and program operations; United States: partnerships and education strategy; Canada: program management). None covers science or computational work.
- The "Introduce yourself" form asks: full name, email, career interest (dropdown), role of interest (dropdown), optional message. Submissions are kept on file for up to 24 months, and the team replies within 5 business days. A test submission on Nov 13 reached an inbox from "i4iSciences Careers".
- There is no equal-opportunity statement. There is a link to the Applicant Privacy Notice (contents not reviewed here).

## A. Replace the "no open roles" text (roles section)
Remove: "There are no open roles right now" (and the line that says new openings are infrequent).
Use:
> **Open and upcoming roles**
> We have one role in our candidate pipeline, listed below. It is contingent on funding. Other roles open infrequently; you can always introduce yourself through the form at the bottom of this page.

Then place the posting from 02_posting_snippet.html directly below it, inside #roles.

## B. New hiring-area card (optional but recommended)
Title: **Science & Technology (United States)**
Text: "Computational and scientific roles that support our research and product work. Currently one role is in our pipeline, contingent on funding."
Link: scroll to #computational-biology-ml-lead.

## C. Form changes
1. **Role of interest dropdown:** add the option  
   `Computational Biology / ML Lead (Contingent on Funding)`
2. **Career interest dropdown:** add `Science & Technology` if it does not exist.
3. **Optional CV link field (recommended):** add an optional text field  
   Label: "Link to your CV or profile (LinkedIn, ORCID, Google Scholar, or personal site)"  
   Do NOT add a file-upload button without Ran's approval.
4. **Helper text under the form:** "To apply for the Computational Biology / ML Lead role, please email your CV to hr@i4isciences.com. This form cannot take file attachments."
5. **Notification routing:** send form submissions to hr@i4isciences.com as well as the current recipient, so none are missed. Tell Ran which mailbox gets them now.
6. Keep the existing warning not to include date of birth, photo, ID numbers or health details.

## D. Equal opportunity
Add this line to the footer of the Careers page so it matches the posting: "I4I Sciences LLC is an equal opportunity employer."

## E. Apply route summary
| Route | Carries CV? | Use |
|---|---|---|
| Email to hr@i4isciences.com | Yes | Primary for this role |
| Careers "Introduce yourself" form | No (optional CV link only) | Secondary |

## F. Not now
- No JobPosting structured data (schema.org) while the role is contingent on funding. Ran will say when to add it.
- No pay figures. No screening-task details on the site.
