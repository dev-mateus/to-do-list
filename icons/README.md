const fs = require('fs');
const path = require('path');

// Instruções para gerar os ícones PWA
console.log(`
═══════════════════════════════════════════════════════════════
  🎨 GERADOR DE ÍCONES PWA - TO-DO LIST
═══════════════════════════════════════════════════════════════

📋 OPÇÕES PARA GERAR OS ÍCONES:

1️⃣  OPÇÃO 1 - Usar o Gerador HTML (Recomendado):
   
   • Abra o arquivo: icons/generator.html no navegador
   • Clique em "Baixar Todos os Ícones"
   • Salve os arquivos PNG na pasta icons/
   • Pronto! ✅

2️⃣  OPÇÃO 2 - Usar Ferramentas Online:
   
   • Acesse: https://realfavicongenerator.net/
   • Faça upload do arquivo icons/icon-512x512.svg
   • Ou use: https://www.pwabuilder.com/
   • Gere todos os tamanhos necessários
   
3️⃣  OPÇÃO 3 - Usar ImageMagick (CLI):
   
   Se você tem ImageMagick instalado:
   
   magick convert icons/icon-512x512.svg -resize 72x72 icons/icon-72x72.png
   magick convert icons/icon-512x512.svg -resize 96x96 icons/icon-96x96.png
   magick convert icons/icon-512x512.svg -resize 128x128 icons/icon-128x128.png
   magick convert icons/icon-512x512.svg -resize 144x144 icons/icon-144x144.png
   magick convert icons/icon-512x512.svg -resize 152x152 icons/icon-152x152.png
   magick convert icons/icon-512x512.svg -resize 192x192 icons/icon-192x192.png
   magick convert icons/icon-512x512.svg -resize 384x384 icons/icon-384x384.png
   magick convert icons/icon-512x512.svg -resize 512x512 icons/icon-512x512.png

4️⃣  OPÇÃO 4 - Usar Sharp (Node.js):
   
   npm install sharp
   
   Depois execute o script abaixo:
   
   const sharp = require('sharp');
   const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
   
   sizes.forEach(async (size) => {
     await sharp('icons/icon-512x512.svg')
       .resize(size, size)
       .png()
       .toFile(\`icons/icon-\${size}x\${size}.png\`);
     console.log(\`✅ icon-\${size}x\${size}.png gerado\`);
   });

═══════════════════════════════════════════════════════════════
  ✨ TAMANHOS NECESSÁRIOS:
═══════════════════════════════════════════════════════════════

  ✓ 72x72    - Pequeno
  ✓ 96x96    - Pequeno
  ✓ 128x128  - Médio
  ✓ 144x144  - Médio
  ✓ 152x152  - Médio
  ✓ 192x192  - Grande (Android)
  ✓ 384x384  - Extra Grande
  ✓ 512x512  - Máximo (Splash Screen)

═══════════════════════════════════════════════════════════════

💡 DICA: A forma mais fácil é usar a OPÇÃO 1 (generator.html)!

`);
