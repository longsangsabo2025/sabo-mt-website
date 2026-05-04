# Copilot Instructions — SABO M&T Website

## MANDATORY: Cross-project → Read ECOSYSTEM_CONTRACTS first
If your task touches domain, SSO, showcase.json, or shared Supabase:
**Read `D:\0.PROJECTS\02-SABO-ECOSYSTEM\ECOSYSTEM_CONTRACTS.md` before doing anything.**
Update it after if any interface changed.

## MANDATORY: Read AGENTS.md first
Before touching any code, read [AGENTS.md](../AGENTS.md). It contains:
- Design system rules (forbidden tokens, Tailwind-only, no arbitrary values)
- Available primitives (`src/components/ui/*`, `src/hooks/*`)
- TypeScript strict rules (no `any`, no `@ts-ignore`)
- EN ↔ VI parity rules

## MANDATORY: Update DEVLOG.md at end of every session
**This is non-negotiable. Every session must end with a DEVLOG entry.**

### Rules
1. **Prepend** — new entry goes at the **TOP** of [DEVLOG.md](../DEVLOG.md), below the `# DEVLOG` heading
2. **Increment session number** — read the current highest session number, add 1
3. **Use today's date** — format `YYYY-MM-DD`
4. **Fill all 4 sections** — Trigger · Delivered · Verification · Pending

### Entry template
```markdown
## Session N — YYYY-MM-DD (short description)

**Trigger:** [what the user asked for]

### Delivered
- **`path/to/file.tsx`** — [what changed and why]

### Verification
- `npx tsc --noEmit` ✅ / ❌
- `npm run build` ✅ / ❌
- `npm run design-check` ✅ / ❌

### Pending
- ⏳ [anything not done yet]
```

### Common mistakes to avoid
- ❌ Appending to the bottom instead of prepending to the top
- ❌ Skipping the entry because "changes were small"
- ❌ Merging two separate sessions into one block without a `---` separator
- ❌ Getting the session number wrong (always check the current highest number in the file first)

## Before declaring done
Run all three, all must exit 0:
```bash
npx tsc --noEmit
npm run build
npm run design-check
```
