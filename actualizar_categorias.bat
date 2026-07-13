@echo off
echo Generando datos de las categorias de la galeria...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0generar_datos_galeria.ps1"
echo.
echo ¡Listo! Los datos han sido actualizados con las fotos que agregaste.
pause
