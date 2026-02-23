# Specification

## Summary
**Goal:** Debug and fix errors in quote submission form and admin dashboard contact details retrieval.

**Planned changes:**
- Add comprehensive error logging in ACSubmissionForm.tsx to capture and display specific error messages (network, validation, backend rejection) in the browser console and UI
- Add detailed error logging in backend submitAC function to log validation failures, duplicate checks, and storage errors with descriptive messages
- Fix Admin.tsx getAllSubmissions query error by adding error handling in useQueries.ts to catch authentication, canister, and network errors with actionable messages
- Add error boundary and try-catch blocks in Admin.tsx to catch rendering and data transformation errors with full stack trace logging
- Verify and fix backend getAllCustomerContacts function to correctly retrieve customer contact details and handle authentication checks without rejecting legitimate principals
- Add network error handling in useActor.ts to detect canister communication failures (timeouts, connection refused, invalid canister ID) with user-friendly messages

**User-visible outcome:** Users will see specific, actionable error messages when quote submission fails or when viewing customer contacts in the admin dashboard, making it easier to identify and resolve issues.
