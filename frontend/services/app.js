// ===================================
// Claude Chat Exporter - Main Application
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize app navigation
    initAppNavigation();
    
    // Initialize import functionality
    initImport();
    
    // Initialize editor toolbar
    initEditor();
    
    // Initialize preview controls
    initPreview();
    
    // Initialize export actions
    initExport();
    
    // Load history
    loadHistory();
});

// ===================================
// Theme Management
// ===================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const appThemeToggle = document.getElementById('appThemeToggle');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => toggleTheme());
    }
    
    if (appThemeToggle) {
        appThemeToggle.addEventListener('click', () => toggleTheme());
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===================================
// FAQ Accordion
// ===================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===================================
// App Navigation
// ===================================
function initAppNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = ['import-view', 'edit-view', 'preview-view', 'history-view'];
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view + '-view';
            
            // Update active button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show selected view
            views.forEach(view => {
                const element = document.getElementById(view);
                if (element) {
                    element.classList.toggle('hidden', view !== viewName);
                }
            });
        });
    });
}

function scrollToApp() {
    const appInterface = document.getElementById('app-interface');
    if (appInterface) {
        appInterface.classList.remove('hidden');
        appInterface.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===================================
// Import Functionality
// ===================================
function initImport() {
    const pasteBtn = document.getElementById('pasteBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const urlInput = document.getElementById('claudeUrl');
    
    if (pasteBtn) {
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                urlInput.value = text;
            } catch (err) {
                console.error('Failed to read clipboard:', err);
                showStatus('error', 'Impossible de lire le presse-papiers');
            }
        });
    }
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            
            if (!url) {
                showStatus('error', 'Veuillez entrer une URL');
                return;
            }
            
            if (!validateClaudeUrl(url)) {
                showStatus('error', 'URL Claude invalide. Format attendu: https://claude.ai/chat/...');
                return;
            }
            
            analyzeConversation(url);
        });
    }
    
    // Load recent links
    loadRecentLinks();
}

function validateClaudeUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.hostname.includes('claude.ai') && parsed.pathname.includes('/chat/');
    } catch {
        return false;
    }
}

function showStatus(type, message) {
    const statusContainer = document.getElementById('statusMessages');
    if (!statusContainer) return;
    
    // Hide all status messages
    statusContainer.querySelectorAll('.status-item').forEach(item => {
        item.classList.add('hidden');
    });
    
    // Show appropriate message
    const statusItem = statusContainer.querySelector(`.status-item.${type}`);
    if (statusItem) {
        statusItem.classList.remove('hidden');
        if (type === 'error') {
            statusContainer.querySelector('#errorMessage').textContent = message;
        }
        statusContainer.classList.remove('hidden');
    }
    
    // Auto-hide success message after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusItem.classList.add('hidden');
        }, 3000);
    }
}

async function analyzeConversation(url) {
    // Show loading state
    showStatus('loading', 'Analyse en cours...');
    
    try {
        // In a real implementation, this would call the backend API
        // For demo purposes, we'll simulate the extraction
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful extraction
        const conversationData = {
            title: 'Conversation Claude',
            date: new Date().toISOString(),
            messages: [
                {
                    role: 'user',
                    content: 'Bonjour Claude, peux-tu m\'aider à créer un site web ?',
                    timestamp: new Date().toISOString()
                },
                {
                    role: 'assistant',
                    content: 'Bien sûr ! Je serais ravi de t\'aider à créer un site web. Peux-tu me donner plus de détails sur le type de site que tu souhaites créer ?',
                    timestamp: new Date().toISOString()
                }
            ]
        };
        
        // Save to recent links
        saveRecentLink(url, conversationData.title);
        
        // Populate editor with conversation
        populateEditor(conversationData);
        
        // Show success
        showStatus('success', 'Conversation extraite avec succès !');
        
        // Switch to edit view after short delay
        setTimeout(() => {
            const editBtn = document.querySelector('[data-view="edit"]');
            if (editBtn) editBtn.click();
        }, 1500);
        
    } catch (error) {
        console.error('Extraction error:', error);
        showStatus('error', 'Erreur lors de l\'extraction de la conversation');
    }
}

function populateEditor(data) {
    const editor = document.getElementById('conversationEditor');
    if (!editor) return;
    
    let html = `<div class="conversation-header">
        <h1>${data.title}</h1>
        <p class="conversation-date">${new Date(data.date).toLocaleDateString('fr-FR')}</p>
    </div>`;
    
    data.messages.forEach(msg => {
        const isUser = msg.role === 'user';
        html += `
            <div class="message ${msg.role}">
                <div class="message-header">
                    <strong>${isUser ? 'Utilisateur' : 'Claude'}</strong>
                    <span class="timestamp">${new Date(msg.timestamp).toLocaleTimeString('fr-FR')}</span>
                </div>
                <div class="message-content">${formatMessageContent(msg.content)}</div>
            </div>
        `;
    });
    
    editor.innerHTML = html;
    
    // Store conversation data for later use
    window.currentConversation = data;
}

function formatMessageContent(content) {
    // Basic formatting - in production, this would be more sophisticated
    return content
        .replace(/\n/g, '<br>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function saveRecentLink(url, title) {
    let recentLinks = JSON.parse(localStorage.getItem('recentLinks') || '[]');
    
    // Add to beginning of array
    recentLinks.unshift({
        url: url,
        title: title,
        date: new Date().toISOString()
    });
    
    // Keep only last 10 links
    recentLinks = recentLinks.slice(0, 10);
    
    localStorage.setItem('recentLinks', JSON.stringify(recentLinks));
    loadRecentLinks();
}

function loadRecentLinks() {
    const historyList = document.getElementById('recentLinks');
    if (!historyList) return;
    
    const recentLinks = JSON.parse(localStorage.getItem('recentLinks') || '[]');
    
    if (recentLinks.length === 0) {
        historyList.innerHTML = '<li class="text-muted">Aucun lien récent</li>';
        return;
    }
    
    historyList.innerHTML = recentLinks.map(link => `
        <li data-url="${link.url}">
            <span>📄</span>
            <span class="link-title">${link.title}</span>
            <span class="link-date">${new Date(link.date).toLocaleDateString('fr-FR')}</span>
        </li>
    `).join('');
    
    // Add click handlers
    historyList.querySelectorAll('li[data-url]').forEach(li => {
        li.addEventListener('click', () => {
            document.getElementById('claudeUrl').value = li.dataset.url;
        });
    });
}

// ===================================
// Editor Toolbar
// ===================================
function initEditor() {
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    toolbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const command = btn.dataset.command;
            const value = btn.dataset.value || null;
            
            if (command && value) {
                document.execCommand(command, false, value);
            } else if (command) {
                document.execCommand(command, false, null);
            }
            
            // Focus back on editor
            const editor = document.getElementById('conversationEditor');
            if (editor) editor.focus();
        });
    });
    
    // Font size slider
    const fontSizeSlider = document.getElementById('fontSize');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', (e) => {
            const editor = document.getElementById('conversationEditor');
            if (editor) {
                editor.style.fontSize = e.target.value + 'px';
            }
        });
    }
    
    // Font family selector
    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', (e) => {
            const editor = document.getElementById('conversationEditor');
            if (editor) {
                editor.style.fontFamily = e.target.value;
            }
        });
    }
    
    // Format style selector
    const formatStyleSelect = document.getElementById('formatStyle');
    if (formatStyleSelect) {
        formatStyleSelect.addEventListener('change', (e) => {
            applyFormatStyle(e.target.value);
        });
    }
}

function applyFormatStyle(style) {
    const editor = document.getElementById('conversationEditor');
    if (!editor) return;
    
    // Remove all style classes
    editor.className = editor.className.replace(/style-\w+/g, '');
    
    // Add new style class
    editor.classList.add(`style-${style}`);
    
    // Apply specific styles based on selection
    switch(style) {
        case 'ebook':
            editor.style.lineHeight = '1.8';
            editor.style.columnCount = '1';
            break;
        case 'report':
            editor.style.lineHeight = '1.6';
            editor.style.textAlign = 'justify';
            break;
        case 'conversation':
            editor.style.lineHeight = '1.5';
            break;
        case 'professional':
            editor.style.lineHeight = '1.7';
            editor.style.textAlign = 'left';
            break;
    }
}

// ===================================
// Preview Controls
// ===================================
function initPreview() {
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const fullscreen = document.getElementById('fullscreen');
    const zoomLevelDisplay = document.getElementById('zoomLevel');
    
    let zoomLevel = 100;
    
    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            zoomLevel = Math.min(zoomLevel + 10, 200);
            updateZoom(zoomLevel, zoomLevelDisplay);
        });
    }
    
    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            zoomLevel = Math.max(zoomLevel - 10, 50);
            updateZoom(zoomLevel, zoomLevelDisplay);
        });
    }
    
    if (fullscreen) {
        fullscreen.addEventListener('click', toggleFullscreen);
    }
}

function updateZoom(level, display) {
    const previewContainer = document.getElementById('pdfPreview');
    if (previewContainer) {
        previewContainer.style.transform = `scale(${level / 100})`;
        previewContainer.style.transformOrigin = 'top center';
    }
    
    if (display) {
        display.textContent = level + '%';
    }
}

function toggleFullscreen() {
    const previewContainer = document.getElementById('pdfPreview');
    
    if (!document.fullscreenElement) {
        if (previewContainer.requestFullscreen) {
            previewContainer.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ===================================
// Export Functionality
// ===================================
function initExport() {
    const generateBtn = document.getElementById('generatePdf');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyClipboard');
    const emailBtn = document.getElementById('emailBtn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePDF);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadFile);
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', sendEmail);
    }
}

async function generatePDF() {
    const editor = document.getElementById('conversationEditor');
    if (!editor) return;
    
    // Get export settings
    const format = document.getElementById('exportFormat')?.value || 'pdf';
    const paperSize = document.getElementById('paperSize')?.value || 'A4';
    const orientation = document.getElementById('orientation')?.value || 'portrait';
    const quality = document.getElementById('quality')?.value || 'high';
    
    // Show generating state
    const generateBtn = document.getElementById('generatePdf');
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Génération en cours...';
    generateBtn.disabled = true;
    
    try {
        // In production, this would call the backend PDF generation API
        // For demo, we'll simulate the process
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create a mock PDF blob
        const content = editor.innerHTML;
        const blob = new Blob([`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    .message { margin-bottom: 20px; padding: 15px; border-left: 3px solid #6366f1; }
                    .message.user { border-left-color: #10b981; }
                    .message-header { font-weight: bold; margin-bottom: 5px; }
                    .timestamp { color: #64748b; font-size: 0.875rem; }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `], { type: 'text/html' });
        
        window.generatedPDF = blob;
        
        // Update preview
        updatePDFPreview(content);
        
        // Save to history
        saveToHistory('conversation_export.pdf', blob.size, format);
        
        // Switch to preview view
        const previewBtn = document.querySelector('[data-view="preview"]');
        if (previewBtn) previewBtn.click();
        
        alert('PDF généré avec succès !');
        
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Erreur lors de la génération du PDF');
    } finally {
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
    }
}

function updatePDFPreview(content) {
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.innerHTML = content;
    }
}

function downloadFile() {
    if (!window.generatedPDF) {
        alert('Veuillez d\'abord générer le PDF');
        return;
    }
    
    const format = document.getElementById('exportFormat')?.value || 'pdf';
    const extension = format === 'pdf' ? 'pdf' : format === 'docx' ? 'docx' : format === 'md' ? 'md' : 'txt';
    const filename = `conversation_export_${Date.now()}.${extension}`;
    
    const url = URL.createObjectURL(window.generatedPDF);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function copyToClipboard() {
    const editor = document.getElementById('conversationEditor');
    if (!editor) return;
    
    try {
        await navigator.clipboard.writeText(editor.innerText);
        alert('Contenu copié dans le presse-papiers !');
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Erreur lors de la copie');
    }
}

function sendEmail() {
    const subject = encodeURIComponent('Export Conversation Claude');
    const body = encodeURIComponent('Veuillez trouver ci-joint l\'export de ma conversation Claude.');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// ===================================
// History Management
// ===================================
function loadHistory() {
    const tableBody = document.getElementById('historyTableBody');
    if (!tableBody) return;
    
    const history = JSON.parse(localStorage.getItem('exportHistory') || '[]');
    
    if (history.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-muted" style="text-align: center;">Aucun export récent</td></tr>';
        return;
    }
    
    tableBody.innerHTML = history.map(item => `
        <tr>
            <td>${item.filename}</td>
            <td>${new Date(item.date).toLocaleDateString('fr-FR')}</td>
            <td>${formatFileSize(item.size)}</td>
            <td>${item.format.toUpperCase()}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="reDownload('${item.id}')">⬇️</button>
                <button class="btn btn-secondary btn-sm" onclick="deleteFromHistory('${item.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function saveToHistory(filename, size, format) {
    let history = JSON.parse(localStorage.getItem('exportHistory') || '[]');
    
    history.unshift({
        id: Date.now().toString(),
        filename: filename,
        date: new Date().toISOString(),
        size: size,
        format: format
    });
    
    // Keep only last 50 exports
    history = history.slice(0, 50);
    
    localStorage.setItem('exportHistory', JSON.stringify(history));
    loadHistory();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function reDownload(id) {
    // In production, this would retrieve the file from storage
    alert('Fonctionnalité de re-téléchargement à implémenter');
}

function deleteFromHistory(id) {
    let history = JSON.parse(localStorage.getItem('exportHistory') || '[]');
    history = history.filter(item => item.id !== id);
    localStorage.setItem('exportHistory', JSON.stringify(history));
    loadHistory();
}

// Search history
const searchInput = document.getElementById('searchHistory');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#historyTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}
