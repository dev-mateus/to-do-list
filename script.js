// ===== Constants =====
const STORAGE_KEY = 'todoListTasks';
const CACHE_VERSION = 'v1';

// ===== DOM Elements =====
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filters__btn');
const clearAllBtn = document.getElementById('clearAllBtn');
const installBtn = document.getElementById('installBtn');
const countAll = document.getElementById('countAll');
const countPending = document.getElementById('countPending');
const countCompleted = document.getElementById('countCompleted');

// ===== State =====
let tasks = [];
let currentFilter = 'all';
let deferredPrompt = null;

// ===== Initialize App =====
function init() {
    loadTasks();
    renderTasks();
    updateCounts();
    setupEventListeners();
    setupPWA();
    checkStandaloneMode();
}

// ===== LocalStorage Functions =====
function loadTasks() {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

// ===== Task Functions =====
function addTask(text) {
    if (!text.trim()) return;
    
    const task = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    updateCounts();
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Announce to screen readers
    announceToScreenReader(`Tarefa "${task.text}" adicionada`);
    
    // Animate new task
    setTimeout(() => {
        const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
        if (taskElement) {
            taskElement.style.animation = 'slideIn 0.3s ease';
        }
    }, 0);
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateCounts();
        
        // Announce to screen readers
        const status = task.completed ? 'concluída' : 'pendente';
        announceToScreenReader(`Tarefa marcada como ${status}`);
    }
}

function deleteTask(id) {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);
    
    if (taskElement) {
        // Animate removal
        taskElement.style.animation = 'slideOut 0.3s ease';
        taskElement.style.transformOrigin = 'left';
        
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
            updateCounts();
        }, 300);
    }
}

function clearAllTasks() {
    if (tasks.length === 0) return;
    
    const confirmMessage = `Deseja realmente excluir todas as ${tasks.length} tarefa(s)?`;
    
    if (confirm(confirmMessage)) {
        tasks = [];
        saveTasks();
        renderTasks();
        updateCounts();
    }
}

// ===== Render Functions =====
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '';
        taskList.setAttribute('aria-busy', 'false');
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    taskList.setAttribute('aria-busy', 'true');
    
    taskList.innerHTML = filteredTasks.map(task => `
        <article class="task ${task.completed ? 'task--completed' : ''}" data-task-id="${task.id}" role="listitem">
            <input 
                type="checkbox" 
                class="task__checkbox" 
                ${task.completed ? 'checked' : ''}
                aria-label="Marcar tarefa como ${task.completed ? 'pendente' : 'concluída'}"
                aria-describedby="task-text-${task.id}"
                onchange="toggleTask(${task.id})"
            >
            <p class="task__text" id="task-text-${task.id}">${escapeHtml(task.text)}</p>
            <button 
                class="task__delete" 
                aria-label="Excluir tarefa: ${escapeHtml(task.text)}"
                onclick="deleteTask(${task.id})"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </article>
    `).join('');
    
    // Update aria-busy after render
    requestAnimationFrame(() => {
        taskList.setAttribute('aria-busy', 'false');
    });
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(t => t.completed);
        case 'pending':
            return tasks.filter(t => !t.completed);
        default:
            return tasks;
    }
}

function updateCounts() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    countAll.textContent = total;
    countPending.textContent = pending;
    countCompleted.textContent = completed;
    
    // Enable/disable clear all button
    clearAllBtn.disabled = total === 0;
}

// ===== Filter Functions =====
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('filters__btn--active');
        } else {
            btn.classList.remove('filters__btn--active');
        }
    });
    
    renderTasks();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });
    
    // Clear all button
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Install button
    installBtn.addEventListener('click', installPWA);
}

// ===== PWA Functions =====
function setupPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show install button
        installBtn.classList.remove('hidden');
    });
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully');
        deferredPrompt = null;
        installBtn.classList.add('hidden');
    });
}

function installPWA() {
    if (!deferredPrompt) {
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
}

function checkStandaloneMode() {
    // Check if app is running in standalone mode (installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                        || window.navigator.standalone 
                        || document.referrer.includes('android-app://');
    
    if (isStandalone) {
        // Hide install button if running as PWA
        installBtn.classList.add('hidden');
    }
}

// ===== Utility Functions =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add CSS animation for slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
`;
document.head.appendChild(style);

// ===== Performance Optimization =====
// Use requestIdleCallback for non-critical updates
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload resources or perform non-critical tasks
        console.log('App initialized successfully');
    });
}

// ===== Initialize App on Load =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== Export functions for inline event handlers =====
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
