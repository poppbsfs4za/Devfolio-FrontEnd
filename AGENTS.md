# Autonomous AI Agent Configuration & SDLC Protocol

## 1. Primary Directives & Self-Management

This document defines the behavioral and execution framework for autonomous AI coding agents. It ensures robust self-management, continuous execution, and context awareness regardless of the specific AI provider, LLM, or programming language in use.

**Execution Protocol:**
1. **Environment Discovery:** Upon initialization, automatically search for and ingest local rules (e.g., `.cursorrules`, `.agentrules`), workspace constraints, and available MCP (Model Context Protocol) / LSP servers.
2. **Autonomous Navigation:** Decompose tasks and use generic capabilities (File I/O, Codebase Search, CLI Execution) to independently navigate blockers. 
3. **Self-Correction:** Exhaust all alternative paths (e.g., fixing failed tests, installing missing dependencies, reading framework docs, web search for latest knowledge) before halting for human intervention.
4. **Context Condensing:** Continuously summarize file reads, terminal outputs, and previous logic to operate strictly within token context limits while preserving state.
5. **Provider Agnosticism:** Rely on standard CLI streams (stdin/stdout), agnostic system commands, and broad rule-sets rather than vendor-specific plugins.

---

## 2. SDLC (Software Development Life Cycle) Workflow

Agents must operate within a rigid, sequential SDLC pipeline. Transition between phases requires emitting a Checkpoint Signal to ensure traceable continuity. 

**Signal Format:** `[CP:{PHASE}] {STATUS} - {SUMMARY}`

| Checkpoint | SDLC Phase | Agent Action | Quality Gate / Exit Criteria |
|------------|------------|--------------|------------------------------|
| `CP:REQ` | **Requirements & Analysis** | Parse specs, index the codebase, load custom rules, and define acceptance criteria. | Ambiguities resolved; clear success metrics defined. |
| `CP:PLAN` | **Architecture & Design** | Formulate technical design, define API/module contracts, and plan subagent/mode delegation. | Architecture documented; test strategies finalized. |
| `CP:BUILD`| **Implementation** | Execute **Test-First Development (TDD)**. Build independent libraries using language-agnostic standards. | Code generated; core logic fulfills specifications. |
| `CP:TEST` | **Testing & Verification** | Run linters, unit/integration tests, and static analysis via CLI/LSP. Verify security boundaries. | **All tests pass (Green)**; zero P0/P1 defects. |
| `CP:DEPL` | **Review & Deployment** | Condense context, document decisions/trade-offs, and package artifacts. | Output perfectly matches specs; final summary emitted. |

---

## 3. Subagent Delegation & Role Orchestration

Complex workflows require dividing work across custom modes (e.g., Architect, Coder, Reviewer) or parallel subagents.

**Delegation Protocol:**
1. **Identify Modality:** Classify the task type (e.g., Database Migration, Frontend, CI/CD Script) to select the appropriate mode, rule-set, or subagent.
2. **Context Packaging:** Pass strictly isolated context to the sub-process:
   - **Intent & Constraints:** Clear objective, resource limits, and language-specific instructions.
   - **Input Artifacts:** Targeted file paths or semantic search results (minimize token bloat).
   - **Verification:** Explicit, programmatic success criteria.
3. **Aggregate & Condense:** Upon completion, the primary agent must validate the subagent's output, condense the findings, and integrate them into the master SDLC sequence.

---

## 4. Core Engineering Philosophy

### Specification-Driven Development (SDD)
- **Specs as Truth:** Code is merely an expression of the specifications. Generate unambiguous, executable specifications before writing application logic.
- **Bidirectional Feedback:** Use test results and system errors to continuously refine the initial spec and custom instructions.

### Test-First (Non-Negotiable)
- Write failing tests (Red) → Implement core logic → Verify passing tests (Green) → Refactor for standards.
- Never assert a feature is complete until verified by an automated test or explicit command execution.

### Library-First & Decoupled Architecture
- Every feature starts as a standalone, modular library with minimal dependencies.
- Enforce strict separation of concerns using explicit data contracts (e.g., JSON, strict types, CLI args).

---

## 5. Universal Quality Framework

### Priority Definitions
| Priority | Category | Blocking | Required Action |
|----------|----------|----------|-----------------|
| **P0** | Security vulnerabilities (hardcoded secrets, injections), data loss | **YES** | Halt execution; fix immediately. |
| **P1** | Core logic errors, failing tests, severe performance degradation | **YES** | Fix before advancing the SDLC phase. |
| **P2** | Code smells, missing non-critical docs, minor technical debt | **NO** | Document in codebase/tracker; proceed. |
| **P3** | Style/formatting inconsistencies | **NO** | Auto-format via CLI; do not iterate. |

### Agnostic Quality Gates
- **Security:** Zero hardcoded credentials. Validate all inputs at I/O boundaries. 
- **Code Quality:** Adhere to detected language conventions (e.g., PEP8, GoFmt, Prettier). Enforce low cyclomatic complexity (< 10).
- **Architecture:** Zero circular dependencies. Prefer composition over inheritance. 
- **Error Handling:** Never swallow errors silently. Fail fast, validate types, and generate investigation-ready logs.

---

## 6. Code & Context Standards

### Dynamic Context Management
- Use codebase indexing to locate definitions rather than blindly reading whole directories.
- Strip generated artifacts and external node_modules/vendor folders from context reading.

### Idiomatic Implementation
- Follow the idiomatic style of the target ecosystem automatically.
- Document the **why** (architectural decisions, trade-offs) in comments, not the **what** (which should be self-evident from code).
- Keep functions concise (< 50 lines) with a maximum of 3 nesting levels.

### Performance
- Profile bottlenecks using language-specific tooling before optimizing.
- Ensure strict lifecycle management: explicitly close network requests, file handles, and database connections.