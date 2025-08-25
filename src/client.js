// TODO (priority-ordered checklist):
// 1) Display at least five content creators on the homepage (implement `ShowCreators` and render a list of >=5 items).
// 2) Each creator item must include: name, a link to their channel/page (open in new tab), and a short description.
// 3) All API calls must use async/await (use `fetch` or `axios`); centralize API calls in a data layer or use `src/client.js`.
// 4) Clicking a creator navigates to a detail page with a unique URL (`/creators/:id`) showing name, url, and description (implement `ViewCreator`).
// 5) Provide edit functionality (`EditCreator`) to change name, url, or description; persist changes via API and reflect updates in the list.
// 6) Provide delete functionality with confirmation; after delete, remove the creator from the list and navigate appropriately.
// 7) Add new creators via `AddCreator` (name, url, description); after successful add, ensure the new creator appears in the homepage list.
// 8) Use optimistic UI updates or re-fetch the list after create/edit/delete to keep the UI in sync.
// 9) Move sensitive keys (Supabase or other) to environment variables and never commit them; use `src/client.js` as a lightweight wrapper.
// 10) Add loading, error, and empty states for all list/detail pages and form submissions; add client-side validation for forms.
// 11) Ensure pages are accessible (keyboard focus, ARIA labels) and add `prefers-reduced-motion` support.
// 12) Add tests for the CRUD flows (unit + integration) once the routes and API layer are implemented.

import { createClient } from '@supabase/supabase-js';

// TODO client.js next steps:
// - Move Supabase URL and API key into environment variables (.env) and do not commit keys
// - Use a server-side function to securely handle admin operations if needed
// - Add simple error handling or wrapper for supabase client

const URL = 'https://bbcynobyfcxdukdbnhyp.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiY3lub2J5ZmN4ZHVrZGJuaHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NjQ0NDksImV4cCI6MjA3MTA0MDQ0OX0.yAacI0w2MJBRnd5ZetRE7GFRd9CjfNQe5trG9_UF63I';

export const supabase = createClient(URL, API_KEY);