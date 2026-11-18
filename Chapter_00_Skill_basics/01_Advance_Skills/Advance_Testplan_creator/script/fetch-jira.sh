#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: %s <JIRA-KEY>\n' "${0##*/}" >&2
  printf 'Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_TOKEN, or configure them in .env.\n' >&2
}

if [[ $# -ne 1 || ! $1 =~ ^[A-Za-z][A-Za-z0-9_]*-[0-9]+$ ]]; then
  usage
  exit 2
fi

trim() {
  local value=$1
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
env_file="${JIRA_ENV_FILE:-${script_dir}/../../../../.env}"
if [[ -f "$env_file" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# || "$line" != *=* ]] && continue
    name="$(trim "${line%%=*}")"
    value="$(trim "${line#*=}")"
    case "$name" in
      JIRA_BASE_URL|JIRA_EMAIL|JIRA_TOKEN|JIRA_API_TOKEN)
        if [[ -z "${!name:-}" ]]; then
          if [[ "$value" == \"*\" || "$value" == \'*\' ]]; then
            value="${value:1:-1}"
          fi
          printf -v "$name" '%s' "$value"
          export "$name"
        fi
        ;;
    esac
  done < "$env_file"
fi

if [[ -z "${JIRA_TOKEN:-}" && -n "${JIRA_API_TOKEN:-}" ]]; then
  JIRA_TOKEN=$JIRA_API_TOKEN
fi

: "${JIRA_BASE_URL:?Set JIRA_BASE_URL to your Jira site URL (for example, https://company.atlassian.net)}"
: "${JIRA_EMAIL:?Set JIRA_EMAIL to your Atlassian account email}"
: "${JIRA_TOKEN:?Set JIRA_TOKEN to your Jira API token}"

if [[ ! $JIRA_BASE_URL =~ ^https:// ]]; then
  printf 'JIRA_BASE_URL must use HTTPS.\n' >&2
  exit 2
fi

if ! command -v curl >/dev/null 2>&1; then
  printf 'curl is required but was not found in PATH.\n' >&2
  exit 127
fi

base_url="${JIRA_BASE_URL%/}"
response="$(curl --request GET \
  --url "${base_url}/rest/api/3/issue/$1" \
  --user "${JIRA_EMAIL}:${JIRA_TOKEN}" \
  --header 'Accept: application/json' \
  --fail --silent --show-error)"

if [[ -z "$response" ]]; then
  printf 'Jira returned an empty response for %s.\n' "$1" >&2
  exit 1
fi

printf '%s\n' "$response"
