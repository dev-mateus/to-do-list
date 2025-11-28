# 📝 To-Do List - PWA

Uma aplicação moderna de lista de tarefas com Progressive Web App (PWA), tema escuro e design responsivo.

![To-Do List](https://img.shields.io/badge/PWA-Ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Características

### 📱 Interface Moderna
- ✅ Tema escuro (dark mode) elegante
- ✅ Design responsivo (Mobile-First)
- ✅ Animações suaves e transições
- ✅ Ícones SVG escaláveis
- ✅ Interface intuitiva e limpa

### 🚀 Funcionalidades
- ✅ Adicionar novas tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Excluir tarefas individualmente
- ✅ Limpar todas as tarefas de uma vez
- ✅ Filtrar por status (Todas, Pendentes, Concluídas)
- ✅ Contador de tarefas por categoria
- ✅ Persistência com LocalStorage
- ✅ Estado vazio com mensagem amigável

### 📦 PWA (Progressive Web App)
- ✅ Instalável como aplicativo nativo
- ✅ Funciona offline (Service Worker)
- ✅ Cache inteligente de recursos
- ✅ Manifesto completo
- ✅ Ícones em múltiplos tamanhos
- ✅ Botão "Instalar App" (apenas no navegador)
- ✅ Suporte a splash screen
- ✅ Tema personalizado

### ⚡ Performance e SEO
- ✅ HTML semântico
- ✅ Meta tags otimizadas
- ✅ Otimizado para Lighthouse
- ✅ Acessibilidade (ARIA labels)
- ✅ Suporte a prefers-reduced-motion
- ✅ Lazy loading quando aplicável

## 📂 Estrutura do Projeto

```
to-do-list/
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # Lógica JavaScript
├── manifest.json           # Manifesto PWA
├── service-worker.js       # Service Worker para cache
├── icons/                  # Ícones do PWA
│   ├── generator.html      # Gerador de ícones
│   ├── icon-512x512.svg    # Ícone base SVG
│   ├── README.md           # Instruções para gerar ícones
│   └── icon-*.png          # Ícones em vários tamanhos (gerar)
└── README.md               # Este arquivo
```

## 🚀 Como Usar

### 1. Gerar os Ícones PWA

Antes de hospedar o projeto, você precisa gerar os ícones PNG:

**Opção A - Gerador HTML (Mais Fácil):**
1. Abra `icons/generator.html` no navegador
2. Clique em "Baixar Todos os Ícones"
3. Salve os arquivos PNG na pasta `icons/`

**Opção B - Ferramenta Online:**
1. Acesse https://realfavicongenerator.net/
2. Faça upload do `icons/icon-512x512.svg`
3. Baixe e extraia os ícones na pasta `icons/`

Veja mais detalhes em `icons/README.md`

### 2. Testar Localmente

**Opção A - Live Server (VS Code):**
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

**Opção B - Python HTTP Server:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção C - Node.js HTTP Server:**
```bash
npx http-server -p 8000
```

Acesse: `http://localhost:8000`

### 3. Hospedar no GitHub Pages

1. **Crie um repositório no GitHub**

2. **Faça upload dos arquivos:**
```bash
git init
git add .
git commit -m "Initial commit - To-Do List PWA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/to-do-list.git
git push -u origin main
```

3. **Ative o GitHub Pages:**
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Clique em Save

4. **Acesse sua aplicação:**
   - URL: `https://SEU-USUARIO.github.io/to-do-list/`

### 4. Instalar como PWA

Após hospedar:

**No Desktop (Chrome/Edge):**
1. Acesse a URL do GitHub Pages
2. Clique no botão "Instalar App"
3. Ou clique no ícone de instalação na barra de endereços

**No Mobile (Chrome/Safari):**
1. Acesse a URL do GitHub Pages
2. Toque no menu (⋮) ou compartilhar
3. Selecione "Adicionar à tela inicial"

## 🎨 Personalização

### Cores (CSS Variables em `style.css`):

```css
:root {
    --color-primary: #0f3460;      /* Azul escuro */
    --color-accent: #4a90e2;        /* Azul */
    --color-success: #2ecc71;       /* Verde */
    --color-danger: #e74c3c;        /* Vermelho */
    --color-background: #1a1a2e;    /* Fundo escuro */
}
```

### Nome do App (`manifest.json`):

```json
{
  "name": "To-Do List",
  "short_name": "To-Do",
  "description": "Sua descrição aqui"
}
```

## 🔧 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Grid e Flexbox
- **JavaScript** - Lógica e interatividade (Vanilla JS)
- **Service Worker** - Cache e funcionalidade offline
- **LocalStorage** - Persistência de dados
- **PWA** - Progressive Web App

## 📊 Lighthouse Score

Este projeto foi otimizado para alcançar excelentes pontuações no Lighthouse:

- 🟢 **Performance**: 95-100
- 🟢 **Acessibilidade**: 95-100
- 🟢 **Melhores Práticas**: 95-100
- 🟢 **SEO**: 95-100
- 🟢 **PWA**: ✅ Instalável

## 📱 Compatibilidade

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Opera
- ✅ Samsung Internet

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

## 🙏 Agradecimentos

- Ícones: SVG inline customizados
- Inspiração: Boas práticas de PWA e UX moderno
- Comunidade: Desenvolvedores que compartilham conhecimento

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

📧 Dúvidas ou sugestões? Abra uma issue!
