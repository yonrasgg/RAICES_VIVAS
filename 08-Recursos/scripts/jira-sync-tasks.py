#!/usr/bin/env python3
"""
Jira Sync: Create missing task issues and update vault frontmatter keys.
Reads credentials from .obsidian/plugins/jira-sync/data.json
"""
import json, base64, urllib.request, urllib.error, os, re, sys, time

# --- Config ---
VAULT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLUGIN_CONFIG = os.path.join(VAULT, ".obsidian/plugins/jira-sync/data.json")

PRIORITY_MAP = {
    "must": "Highest",
    "should": "High",
    "could": "Medium",
    "won't": "Low",
    "wont": "Low",
}

ASSIGNEE_MAP = {
    "Geovanny": "712020:a59de532-a419-407b-9bb6-522827344a19",
    "Elkin":    "712020:a62afc0d-02d4-4fd4-a563-3ccb76614cc0",
    "Santiago": "712020:2bae5eaa-d946-4896-8647-0939ea9af9d9",
}

SPRINT_MAP = {
    "Sprint-01": 1,
    "Sprint-02": 34,
    "Sprint-03": 67,
    "Sprint-04": 68,
    "Sprint-05": 69,
}

STATUS_TRANSITIONS = {}  # Will be discovered dynamically

# --- Helpers ---
def load_creds():
    with open(PLUGIN_CONFIG) as f:
        d = json.load(f)
    conn = d["connection"]
    return conn["jiraUrl"].rstrip("/"), conn["email"], conn["apiToken"]

def jira_request(url, method="GET", data=None):
    base_url, email, token = load_creds()
    auth = base64.b64encode(f"{email}:{token}".encode()).decode()
    full_url = f"{base_url}{url}" if url.startswith("/") else url
    req = urllib.request.Request(
        full_url,
        data=json.dumps(data).encode() if data else None,
        headers={
            "Authorization": f"Basic {auth}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method=method,
    )
    try:
        resp = urllib.request.urlopen(req)
        body = resp.read().decode()
        return json.loads(body) if body.strip() else {}
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ERROR {e.code}: {body[:300]}")
        return None

def parse_frontmatter(filepath):
    """Parse YAML frontmatter from a markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if not content.startswith("---"):
        return {}
    end = content.index("---", 3)
    fm_text = content[3:end]
    fm = {}
    for line in fm_text.strip().split("\n"):
        if ":" in line and not line.strip().startswith("-"):
            k, v = line.split(":", 1)
            v = v.strip().strip('"').strip("'")
            fm[k.strip()] = v
    return fm

def update_frontmatter_key(filepath, jira_key):
    """Update the key: and link: fields in the frontmatter."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    base_url, _, _ = load_creds()

    # Update key: field
    content = re.sub(
        r'^(key:\s*)"?"?.*"?"?\s*$',
        f'key: "{jira_key}"',
        content,
        count=1,
        flags=re.MULTILINE,
    )

    # Update or add link: field
    link_url = f"{base_url}/browse/{jira_key}"
    if re.search(r"^link:", content, re.MULTILINE):
        content = re.sub(
            r'^(link:\s*).*$',
            f'link: "{link_url}"',
            content,
            count=1,
            flags=re.MULTILINE,
        )
    else:
        # Add link after key
        content = re.sub(
            rf'^(key: "{jira_key}")$',
            rf'\1\nlink: "{link_url}"',
            content,
            count=1,
            flags=re.MULTILINE,
        )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def get_transitions(issue_key):
    """Get available transitions for an issue."""
    result = jira_request(f"/rest/api/3/issue/{issue_key}/transitions")
    if result:
        return {t["name"]: t["id"] for t in result.get("transitions", [])}
    return {}

def transition_issue(issue_key, target_status):
    """Transition an issue to target status (done/in-progress)."""
    transitions = get_transitions(issue_key)
    print(f"    Available transitions: {list(transitions.keys())}")

    if target_status == "done":
        for name in ["Done", "Listo", "Terminado"]:
            if name in transitions:
                jira_request(
                    f"/rest/api/3/issue/{issue_key}/transitions",
                    method="POST",
                    data={"transition": {"id": transitions[name]}},
                )
                print(f"    -> Transitioned to {name}")
                return True
    elif target_status == "in-progress":
        for name in ["In Progress", "En curso", "En progreso"]:
            if name in transitions:
                jira_request(
                    f"/rest/api/3/issue/{issue_key}/transitions",
                    method="POST",
                    data={"transition": {"id": transitions[name]}},
                )
                print(f"    -> Transitioned to {name}")
                return True

    print(f"    WARNING: No matching transition for '{target_status}'")
    return False

def assign_to_sprint(issue_key, sprint_name):
    """Move issue to a sprint using the Agile API."""
    sprint_id = SPRINT_MAP.get(sprint_name)
    if not sprint_id:
        print(f"    WARNING: Unknown sprint {sprint_name}")
        return False
    result = jira_request(
        f"/rest/agile/1.0/sprint/{sprint_id}/issue",
        method="POST",
        data={"issues": [issue_key]},
    )
    if result is not None:
        print(f"    -> Assigned to {sprint_name} (id={sprint_id})")
        return True
    return False


# --- Main ---
def main():
    # Discover all task files without Jira keys
    tasks = []
    for sprint_dir in ["Sprint-02", "Sprint-03"]:
        sprint_path = os.path.join(VAULT, "05-Sprints", sprint_dir)
        for fname in sorted(os.listdir(sprint_path)):
            if not fname.startswith("T-") or not fname.endswith(".md"):
                continue
            fpath = os.path.join(sprint_path, fname)
            fm = parse_frontmatter(fpath)
            key = fm.get("key", "").strip('"')
            if key:
                continue  # Already has a Jira key
            tasks.append({
                "file": fpath,
                "sprint_dir": sprint_dir,
                "task_id": fm.get("id", fname.replace(".md", "")),
                "summary": fm.get("summary", ""),
                "issuetype": fm.get("issuetype", "Task"),
                "parent": fm.get("parent", "").strip('"'),
                "priority": fm.get("priority", "must"),
                "assignee": fm.get("assignee", "").strip('"'),
                "effort": fm.get("effort", "").strip('"'),
                "status": fm.get("status", ""),
                "sprint": fm.get("sprint", sprint_dir),
            })

    print(f"\n{'='*60}")
    print(f"  JIRA SYNC: {len(tasks)} tasks to create")
    print(f"{'='*60}\n")

    if not tasks:
        print("No tasks need syncing!")
        return

    created = 0
    errors = 0

    for i, task in enumerate(tasks, 1):
        print(f"[{i}/{len(tasks)}] {task['task_id']}: {task['summary'][:50]}...")

        # Build issue payload
        priority_name = PRIORITY_MAP.get(task["priority"], "Medium")
        assignee_id = ASSIGNEE_MAP.get(task["assignee"])

        # Determine parent relationship
        parent_key = task["parent"]
        issue_type_id = "10001"  # Task

        # Check if parent is a Story (not Epic) — then create as Subtask
        # Epics: RV-1, RV-2, RV-3, RV-47
        # Stories: everything else
        epic_keys = {"RV-1", "RV-2", "RV-3", "RV-47"}
        if parent_key and parent_key not in epic_keys:
            issue_type_id = "10005"  # Subtask

        fields = {
            "project": {"key": "RV"},
            "summary": task["summary"],
            "issuetype": {"id": issue_type_id},
            "priority": {"name": priority_name},
        }

        # Set parent
        if parent_key:
            fields["parent"] = {"key": parent_key}

        # Set assignee
        if assignee_id:
            fields["assignee"] = {"accountId": assignee_id}

        # Set time estimate
        effort = task["effort"].replace("h", "").strip()
        if effort.isdigit():
            fields["timetracking"] = {"originalEstimate": f"{effort}h"}

        # Create the issue
        result = jira_request("/rest/api/3/issue", method="POST", data={"fields": fields})

        if result and "key" in result:
            jira_key = result["key"]
            print(f"  CREATED: {jira_key}")
            created += 1

            # Update vault frontmatter
            update_frontmatter_key(task["file"], jira_key)
            print(f"  Updated vault: {os.path.basename(task['file'])}")

            # Assign to sprint
            assign_to_sprint(jira_key, task["sprint"])

            # Transition status if needed
            if task["status"] == "done":
                transition_issue(jira_key, "done")
            elif task["status"] == "in-progress":
                transition_issue(jira_key, "in-progress")

            # Rate limit: brief pause
            time.sleep(0.3)
        else:
            print(f"  FAILED to create issue")
            errors += 1

    print(f"\n{'='*60}")
    print(f"  RESULTS: {created} created, {errors} errors")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
