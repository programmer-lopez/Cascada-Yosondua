@echo off
echo Actualizando la galeria de imagenes...
powershell.exe -ExecutionPolicy Bypass -Command "$basePath = '%~dp0'; $carouselPath = Join-Path $basePath 'images\inicio\carousel'; $jsPath = Join-Path $basePath 'js\datos-galeria.js'; $data = @(); $folders = Get-ChildItem -Path $carouselPath -Directory | Select-Object -ExpandProperty Name; foreach ($folder in $folders) { $files = @(Get-ChildItem -Path (Join-Path $carouselPath $folder) -File | Select-Object -ExpandProperty Name); $data += @{ carpeta = $folder; titulo = $folder.ToUpper(); imagenes = $files } }; $json = $data | ConvertTo-Json -Depth 3; Set-Content -Path $jsPath -Value \"const galeriaDatos = $json;\" -Encoding UTF8"
echo.
echo ¡Listo! La galeria ha sido actualizada con todas las fotos de las carpetas.
pause
