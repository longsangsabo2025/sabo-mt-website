$ErrorActionPreference = "Stop"
$svc = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmb3V1cWtsa29zenBkYWVsb3dyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzQ0ODUzNiwiZXhwIjoyMDkzMDI0NTM2fQ.ih560g16fdsjCYKLdP_k0UV5_iibN39oDMakbu5nA9M"
$h = @{ apikey = $svc; Authorization = "Bearer $svc" }
$rows = Invoke-RestMethod -Uri "https://ffouuqklkoszpdaelowr.supabase.co/rest/v1/leads?select=id,name,email,message,source,created_at,user_agent,ip_hash&order=created_at.desc&limit=5" -Headers $h
"COUNT_LATEST: $($rows.Count)"
$rows | ForEach-Object { "ROW id=$($_.id) name=$($_.name) email=$($_.email) source=$($_.source) ip_hash=$($_.ip_hash.Substring(0,16))... ua=$($_.user_agent)" }
$markers = $rows | Where-Object { $_.message -like "*DEVMGR_*" }
if ($markers) {
  "FOUND_E2E: $($markers.Count) row(s)"
  foreach ($m in $markers) {
    $del = Invoke-RestMethod -Method Delete -Uri "https://ffouuqklkoszpdaelowr.supabase.co/rest/v1/leads?id=eq.$($m.id)" -Headers $h
    "DELETED id=$($m.id)"
  }
} else { "NO_E2E_MARKER" }
