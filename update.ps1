$files = Get-ChildItem -Path . -Include *.html, *.css, *.scss -Recurse -File
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $changed = $false
    
    # Comunes
    $newContent = $content -ireplace 'images/(icon_cascada\.(jpg|png)|icono\.svg|logo.*?\.svg|logocascadaprincipal\.svg|fondo-.*?\.(jpg|JPG)|FONDO-.*?\.(jpg|JPG)|mundo.*?\.svg|agencia\.svg|cascadaParqueNatural\.svg)', 'images/comunes/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    # Inicio
    $newContent = $content -ireplace 'images/(tirolesa101\.(jpg|JPG)|plaza\.(jpg|JPG)|sector-[1-4]\.(jpg|JPG)|MUNICIPIO\.(jpg|JPG))', 'images/inicio/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    # Servicios
    $newContent = $content -ireplace 'images/(servicio-[1-6]\.svg|proyecto[1-6]\.jpg)', 'images/servicios/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    # Galeria
    $newContent = $content -ireplace 'images/(viacrucis.*?\.jpg|n/)', 'images/galeria/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    # Nosotros
    $newContent = $content -ireplace 'images/(nosotros\.svg|imagen-cascada\.(jpg|JPG))', 'images/nosotros/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    # Encargados
    $newContent = $content -ireplace 'images/(snoop\.jpg|jobs\.jpg|lennon\.jpg|will\.jpg|varios\.jpg|nose\.jpg)', 'images/encargados/$1'
    if ($newContent -ne $content) { $content = $newContent; $changed = $true }
    
    if ($changed) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
