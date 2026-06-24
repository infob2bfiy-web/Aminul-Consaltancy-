# Security Specification for Aminul Consultancy & Engineers

This specification outlines the data access policies, invariants, and security rules testing parameters for our Firestore database.

## 1. Data Invariants
*   **Settings Collection**: Can only be read by anyone (public), but can ONLY be updated by authenticated administrators. There should be only one document: `/settings/config`.
*   **Public Content Collections** (`services`, `projects`, `gallery`, `testimonials`, `blogs`, `faqs`, `team`): Readable by the public (unauthenticated users). Modifiable (create, update, delete) ONLY by authenticated administrators.
*   **Messages Collection**: Writeable by anyone (public) to allow prospect clients to submit contact forms. Read/write access for list/update/delete operations is strictly restricted to authenticated administrators.
*   **Admin Authentication**: Administrators must be logged in via Firebase Auth. The rules will look up whether a user's UID is listed in the `admins` collection or matches our designated bootstrap admin.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)
Below are 12 malicious payload attempts targeting different endpoints that our rules MUST block with `PERMISSION_DENIED`.

1.  **Identity Spoofing on Settings Update**: Attempting to overwrite `/settings/config` with a client-supplied payload when the user is unauthenticated.
2.  **Rogue Blog Creation**: Creating a document in `/blogs` as an unauthenticated or standard authenticated user.
3.  **Rogue Project Modification**: Attempting to update a project in `/projects` as a non-admin client.
4.  **Malicious Admin Escalation**: Attempting to write a document into `/admins/{userId}` to self-promote.
5.  **Illegal Message Reading**: An unauthenticated user attempting to list or read document items from the `/messages` collection.
6.  **Illegal Message Hijacking**: An authenticated non-admin attempting to delete or alter a submitted client message in `/messages`.
7.  **Resource Poisoning on Message ID**: Attempting to submit a contact message with a massive 2KB junk document ID.
8.  **Empty Contact Message Submission**: Creating a `/messages` document missing the mandatory fields: `name` and `phone`.
9.  **Type Poisoning on Testimonial Rating**: Attempting to write a testimonial with `rating` equal to `"five stars"` (string instead of number) or `rating` equal to `100` (exceeding maximum 5-star boundary).
10. **Immortal Fields Violation**: Attempting to modify `createdAt` or `originalAuthor` when updating static elements.
11. **Injecting System Ghost Fields**: Adding custom privilege properties (like `role: "owner"`) to settings when updating.
12. **Null/Spoofed Auth Tokens on Message Reads**: Attempting to fetch/get a specific message payload by spoofing a header without a verified email token.

## 3. The Rules Schema and Implementation Plan
Our ruleset will enforce:
*   Verified authentications for writes.
*   Schema checking functions (`isValidService`, `isValidProject`, `isValidMessage`).
*   Default deny catch-all at the database root.
