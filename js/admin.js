// ========================================
// BRIAN LOGÍSTICA Y RECREACIÓN
// Administración - Login y Mensajes
// ========================================

// Credenciales de acceso
const ADMIN_CREDENTIALS = {
    username: 'Brian Garcia',
    password: 'Brianrecreacion2026'
};

// Elementos del DOM
const loginSection = document.getElementById('loginSection');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const messagesList = document.getElementById('messagesList');
const messageCount = document.getElementById('messageCount');
const logoutBtn = document.getElementById('logoutBtn');
const adminName = document.getElementById('adminName');

// Verificar si ya hay sesión iniciada
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
});

// Verificar sesión
function checkSession() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminPanel();
    } else {
        showLogin();
    }
}

// Mostrar login
function showLogin() {
    loginSection.style.display = 'flex';
    adminPanel.style.display = 'none';
}

// Mostrar panel de administración
function showAdminPanel() {
    loginSection.style.display = 'none';
    adminPanel.style.display = 'block';
    loadMessages();
}

// Manejar el login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Verificar credenciales
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login exitoso
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        
        errorMessage.style.display = 'none';
        showAdminPanel();
        
        // Limpiar formulario
        loginForm.reset();
    } else {
        // Login fallido
        errorMessage.textContent = '❌ Usuario o contraseña incorrectos';
        errorMessage.style.display = 'block';
        
        // Animación de error
        loginForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
});

// Manejar logout
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    showLogin();
});

// Cargar mensajes
function loadMessages() {
    const messages = getMessages();
    
    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div class="no-messages">
                <div class="no-messages-icon">📭</div>
                <h3>No hay mensajes aún</h3>
                <p>Los mensajes del formulario de contacto aparecerán aquí</p>
            </div>
        `;
        messageCount.textContent = '0 mensajes';
        return;
    }
    
    // Actualizar contador
    const unreadCount = messages.filter(m => !m.read).length;
    messageCount.textContent = `${messages.length} mensajes (${unreadCount} nuevos)`;
    
    // Renderizar mensajes
    messagesList.innerHTML = messages.map((message, index) => createMessageCard(message, index)).join('');
}

// Crear tarjeta de mensaje
function createMessageCard(message, index) {
    const date = new Date(message.timestamp);
    const formattedDate = date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const whatsappNumber = message.telefono ? message.telefono.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = whatsappNumber ? `https://wa.me/57${whatsappNumber}` : '#';
    
    return `
        <div class="message-card ${message.read ? '' : 'unread'}" data-index="${index}">
            <div class="message-header">
                <span class="message-sender">
                    ${message.read ? '📧' : '🔔'} ${message.nombre}
                    ${!message.read ? '<span style="background: var(--amarillo); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; margin-left: 0.5rem;">NUEVO</span>' : ''}
                </span>
                <span class="message-date">${formattedDate}</span>
            </div>
            
            <div class="message-contact">
                <span><strong>📧 Email:</strong> ${message.email}</span>
                ${message.telefono ? `<span><strong>📱 Teléfono:</strong> ${message.telefono}</span>` : ''}
            </div>
            
            <div class="message-body">
                ${message.mensaje}
            </div>
            
            <div class="message-actions">
                ${whatsappNumber ? `
                    <a href="${whatsappUrl}" target="_blank" class="btn-action btn-whatsapp">
                        💬 WhatsApp
                    </a>
                ` : ''}
                <a href="mailto:${message.email}" class="btn-action btn-email">
                    ✉️ Enviar Email
                </a>
                ${!message.read ? `
                    <button onclick="markAsRead(${index})" class="btn-action btn-mark-read">
                        ✓ Marcar como leído
                    </button>
                ` : ''}
                <button onclick="deleteMessage(${index})" class="btn-action btn-delete">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `;
}

// Obtener mensajes del localStorage
function getMessages() {
    const messages = localStorage.getItem('contactMessages');
    return messages ? JSON.parse(messages) : [];
}

// Guardar mensajes en localStorage
function saveMessages(messages) {
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

// Marcar mensaje como leído
window.markAsRead = function(index) {
    const messages = getMessages();
    if (messages[index]) {
        messages[index].read = true;
        saveMessages(messages);
        loadMessages();
    }
};

// Eliminar mensaje
window.deleteMessage = function(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
        const messages = getMessages();
        messages.splice(index, 1);
        saveMessages(messages);
        loadMessages();
    }
};

// Función para guardar mensaje desde el formulario de contacto
function saveContactMessage(messageData) {
    const messages = getMessages();
    messages.unshift({
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false
    });
    saveMessages(messages);
}

// Agregar animación shake al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
