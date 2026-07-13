$basePath = $PSScriptRoot
if ([string]::IsNullOrEmpty($basePath)) { $basePath = "." }

$galeriaPath = Join-Path $basePath 'images\galeria'
$jsPath = Join-Path $basePath 'js\datos-galeria-completa.js'

$data = @()
$carpetasIgnoradas = @("n", "youtube")

$folders = Get-ChildItem -Path $galeriaPath -Directory | Where-Object { $_.Name -notin $carpetasIgnoradas }

foreach ($folder in $folders) {
    $folderName = $folder.Name
    $files = @(Get-ChildItem -Path $folder.FullName -File -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG -Recurse | Select-Object -ExpandProperty Name)
    
    # Capitalizar el nombre (ej. "eventos" -> "Eventos")
    $nombre = (Get-Culture).TextInfo.ToTitleCase($folderName.ToLower())
    
    $data += [ordered]@{
        id = $folderName
        nombre = $nombre
        carpeta = $folderName
        imagenes = $files
    }
}

# Convertir a JSON
$json = $data | ConvertTo-Json -Depth 3

# Crear el contenido JS
$jsContent = "const categoriasGaleria = $json;"

# Guardar el archivo
Set-Content -Path $jsPath -Value $jsContent -Encoding UTF8

Write-Host "¡El archivo js/datos-galeria-completa.js ha sido actualizado con éxito!"
