# download-images.ps1
# Downloads Wix images at full resolution, deduplicating by media hash.
# Run from project root: .\scripts\download-images.ps1

$UrlFile = Join-Path $PSScriptRoot "..\..\crawler\crawled\image-urls.txt"
$OutDir  = Join-Path $PSScriptRoot "..\public\images\wix-downloads"

if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force $OutDir | Out-Null
}

$urls = Get-Content $UrlFile | Where-Object { $_ -match 'wixstatic\.com' }
Write-Host "Found $($urls.Count) URLs — downloading unique images..."

$downloaded = @{}
$created = 0
$skipped = 0

foreach ($url in $urls) {
    # Extract the hash-based filename from /media/{hash~mv2.ext}
    if ($url -notmatch '/media/([^/]+)') { continue }
    $mediaFile = $Matches[1]

    if ($downloaded.ContainsKey($mediaFile)) {
        $skipped++
        continue
    }
    $downloaded[$mediaFile] = $true

    # Download the original file (strip /v1/fill/... transform params)
    $baseUrl = 'https://static.wixstatic.com/media/' + $mediaFile

    # Try to use the human-readable filename at the end of the URL
    $saveName = $mediaFile
    if ($url -match '/([^/?]+\.(png|jpg|jpeg|gif|webp|svg))') {
        $humanName = [System.Uri]::UnescapeDataString($Matches[1])
        # Sanitise for the filesystem
        $humanName = $humanName -replace '[\\/:*?"<>|]', '_'
        if ($humanName.Length -gt 3) { $saveName = $humanName }
    }

    $outPath = Join-Path $OutDir $saveName
    # Avoid collisions from different hashes with the same human name
    if ((Test-Path $outPath) -and ($saveName -ne $mediaFile)) {
        $ext  = [System.IO.Path]::GetExtension($saveName)
        $base = [System.IO.Path]::GetFileNameWithoutExtension($saveName)
        $saveName = $base + '_' + $mediaFile.Substring(0, 8) + $ext
        $outPath  = Join-Path $OutDir $saveName
    }

    try {
        Invoke-WebRequest -Uri $baseUrl -OutFile $outPath -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
        Write-Host "  OK  $saveName"
        $created++
        Start-Sleep -Milliseconds 300
    } catch {
        Write-Host "  FAIL  $saveName  ($($_.Exception.Message))"
    }
}

Write-Host ""
Write-Host "Done. $created downloaded, $skipped duplicates skipped."
Write-Host "Files in: $OutDir"
Write-Host ""
Write-Host "Next: copy key images into public\images\ :"
Write-Host "  promote-waipu-logo.png / promote-waipu-logo-white.png"
Write-Host "  hero-waipu-cove.jpg  /  og-default.jpg  /  favicon.png"
