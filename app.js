/* ═══════════════════════════════════════════════════
   ORÁCULO — app.js
   Vanilla JS, sin dependencias
═══════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════
// BASE DE FRASES (rotación diaria)
// ══════════════════════════════════════════════════

const QUOTES = [
  {
    id: 'seneca-brevitas',
    advisor: 'Séneca',
    source: 'De brevitate vitae',
    original: 'Dum differtur vita transcurrit.',
    translation: 'Mientras se difiere, la vida transcurre.'
  },
  {
    id: 'marco-retiro',
    advisor: 'Marco Aurelio',
    source: 'Meditaciones, IV.3',
    original: 'Εἰς ἑαυτὸν ἀναχωρεῖν ἀεὶ δύναται.',
    translation: 'Siempre puede uno retirarse hacia sí mismo.'
  },
  {
    id: 'gracian-senorio',
    advisor: 'Baltasar Gracián',
    source: 'Oráculo manual, §8',
    original: 'No hay mayor señorío que el de sí mismo, de los propios afectos.',
    translation: 'No hay mayor señorío que el de sí mismo, de los propios afectos.'
  },
  {
    id: 'suntzu-conoce',
    advisor: 'Sun Tzu',
    source: 'El arte de la guerra, III',
    original: '知彼知己，百戰不殆。',
    translation: 'Conoce al enemigo y conócete a ti mismo; en cien batallas, nunca estarás en peligro.'
  },
  {
    id: 'epicteto-eph',
    advisor: 'Epicteto',
    source: 'Enquiridión, I',
    original: 'Τῶν ὄντων τὰ μέν ἐστιν ἐφ᾽ ἡμῖν, τὰ δὲ οὐκ ἐφ᾽ ἡμῖν.',
    translation: 'De las cosas, unas dependen de nosotros; otras, no.'
  },
  {
    id: 'montaigne-forme',
    advisor: 'Montaigne',
    source: 'Essais, III.2',
    original: 'Chaque homme porte la forme entière de l\'humaine condition.',
    translation: 'Todo hombre lleva en sí la forma entera de la condición humana.'
  },
  {
    id: 'laotzu-zhiren',
    advisor: 'Lao Tzu',
    source: 'Tao Te Ching, §33',
    original: '知人者智，自知者明。勝人者有力，自勝者強。',
    translation: 'Conocer a los otros es inteligencia; conocerse a uno mismo es iluminación. Vencer a otros requiere fuerza; vencerse a uno mismo es verdadera fortaleza.'
  },
  {
    id: 'nietzsche-umbringt',
    advisor: 'Nietzsche',
    source: 'Crepúsculo de los ídolos, Máximas, §8',
    original: 'Was mich nicht umbringt, macht mich stärker.',
    translation: 'Lo que no me mata me hace más fuerte.'
  },
  {
    id: 'pascal-coeur',
    advisor: 'Pascal',
    source: 'Pensamientos, §277',
    original: 'Le cœur a ses raisons que la raison ne connaît point.',
    translation: 'El corazón tiene razones que la razón desconoce.'
  },
  {
    id: 'confucio-sanxing',
    advisor: 'Confucio',
    source: 'Analectas, I.4',
    original: '吾日三省吾身：為人謀而不忠乎？與朋友交而不信乎？傳不習乎？',
    translation: 'Cada día me examino en tres puntos: ¿Fui leal al actuar por otros? ¿Fui sincero con mis amigos? ¿Practiqué lo que me enseñaron?'
  },
  {
    id: 'cicero-spero',
    advisor: 'Cicerón',
    source: 'Epístolas, IX.10',
    original: 'Dum anima est, spes esse dicitur.',
    translation: 'Mientras hay aliento, se dice que hay esperanza.'
  },
  {
    id: 'marco-mente',
    advisor: 'Marco Aurelio',
    source: 'Meditaciones, IX.3',
    original: 'Ἄνθρωπος ἐπὶ πρᾶξιν γεγονώς.',
    translation: 'El hombre nació para la acción.'
  },
  {
    id: 'seneca-recede',
    advisor: 'Séneca',
    source: 'Epístolas morales, VII',
    original: 'Recede in te ipse quantum potes; cum his versare qui te meliorem acturi sunt.',
    translation: 'Retírate hacia ti mismo cuanto puedas; frecuenta a quienes puedan hacerte mejor.'
  },
  {
    id: 'gracian-vivir',
    advisor: 'Baltasar Gracián',
    source: 'Oráculo manual, §247',
    original: 'Vivir mucho y vivir bien son concordancias del sabio.',
    translation: 'Vivir mucho y vivir bien son concordancias del sabio.'
  },
  {
    id: 'epicteto-gelou',
    advisor: 'Epicteto',
    source: 'Discursos, II.5',
    original: 'Ζήτει μὴ τὰ γινόμενα γίνεσθαι ὡς θέλεις, ἀλλὰ θέλε τὰ γινόμενα ὡς γίνεται, καὶ εὐροήσεις.',
    translation: 'No busques que las cosas ocurran como quieres, sino quiere las cosas tal como ocurren, y fluirás con ellas.'
  },
  {
    id: 'laotzu-weixue',
    advisor: 'Lao Tzu',
    source: 'Tao Te Ching, §48',
    original: '為學日益，為道日損。損之又損，以至於無為。',
    translation: 'El que estudia gana cada día; el que sigue el Tao pierde cada día. Perdiendo y perdiendo, llega al no-actuar.'
  },
  {
    id: 'montaigne-essai',
    advisor: 'Montaigne',
    source: 'Essais, II.6',
    original: 'Il ne faut pas se forcer; trop bander et roidir notre âme lui fait perdre sa souplesse.',
    translation: 'No hay que forzarse; tensar demasiado el alma la priva de su flexibilidad.'
  },
  {
    id: 'marco-present',
    advisor: 'Marco Aurelio',
    source: 'Meditaciones, VIII.7',
    original: 'Οὐδεὶς ἄλλος αἴτιος τοῦ σε ταράσσειν.',
    translation: 'Nadie más es responsable de tu perturbación.'
  },
  {
    id: 'heraclito-flux',
    advisor: 'Heráclito',
    source: 'Fragmentos, DK22 B91',
    original: 'Ποταμοῖς τοῖς αὐτοῖς ἐμβαίνομέν τε καὶ οὐκ ἐμβαίνομεν.',
    translation: 'Entramos y no entramos en los mismos ríos; somos y no somos.'
  },
  {
    id: 'gracian-disimulo',
    advisor: 'Baltasar Gracián',
    source: 'Oráculo manual, §98',
    original: 'Cifrar la voluntad. No se explique tanto el que manda; que es señal de flaqueza.',
    translation: 'Cifra tu voluntad. Que el que manda no se explique demasiado; eso es señal de flaqueza.'
  },
  {
    id: 'seneca-otium',
    advisor: 'Séneca',
    source: 'De otio, V',
    original: 'Nusquam est qui ubique est.',
    translation: 'Quien está en todas partes, no está en ninguna.'
  },
  {
    id: 'suntzu-victory',
    advisor: 'Sun Tzu',
    source: 'El arte de la guerra, IV',
    original: '勝兵先勝而後求戰，敗兵先戰而後求勝。',
    translation: 'El ejército victorioso primero gana y luego busca la batalla; el ejército derrotado primero lucha y luego busca la victoria.'
  },
];

// ══════════════════════════════════════════════════
// ESTADO
// ══════════════════════════════════════════════════

const state = {
  saved:           JSON.parse(localStorage.getItem('oraculo_saved') || '[]'),
  dailyQuote:      null,   // frase del día actual
  activeQuote:     null,   // frase activa (diaria u oráculo)
  oracleQuote:     null,   // respuesta del oráculo en pantalla
  recognition:     null,
};

// ══════════════════════════════════════════════════
// REFS DOM
// ══════════════════════════════════════════════════

const $  = id => document.getElementById(id);
const sc = $('scroll-container');

// Pantalla diaria
const quoteScrollArea  = $('quote-scroll-area');
const oracleCard       = $('oracle-card');
const quoteDivider     = $('quote-divider');
const dailyCard        = $('daily-card');
const respAdvisor      = $('resp-advisor');
const respPresentation = $('resp-presentation');
const respOriginal     = $('resp-quote-original');
const respTranslation  = $('resp-quote-translation');
const dailyLabel       = $('daily-label');
const dailySource      = $('daily-source');
const dailyOriginal    = $('daily-original');
const dailyTranslation = $('daily-translation');
const btnDismiss       = $('btn-dismiss');
const btnSave          = $('btn-save');

// Pantalla consulta
const consultIdle   = $('consult-idle');
const consultForm   = $('consult-form');
const consultLoading = $('consult-loading');
const oracleOrb     = $('oracle-orb');
const feelingInput  = $('feeling-input');
const btnCancel     = $('btn-cancel-consult');
const btnSubmit     = $('btn-submit-consult');

// Historial
const historyList  = $('history-list');
const historyEmpty = $('history-empty');

// UI global
const headerCount  = $('header-count');
const flyingPhrase = $('flying-phrase');
const toastEl      = $('toast');

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════

function init() {
  loadDailyQuote();

  // Scroll inicial: posicionar en pantalla diaria (índice 1)
  // History está arriba, así que offsetTop = 100vh
  requestAnimationFrame(() => {
    sc.scrollTop = $('screen-daily').offsetTop;
  });

  updateHeaderCount();
  renderHistory();
  setupListeners();
  registerSW();
}

// ══════════════════════════════════════════════════
// FRASE DEL DÍA
// ══════════════════════════════════════════════════

function loadDailyQuote() {
  const today  = new Date();
  const start  = new Date(today.getFullYear(), 0, 0);
  const dayNum = Math.floor((today - start) / 86_400_000);
  state.dailyQuote = QUOTES[dayNum % QUOTES.length];
  state.activeQuote = state.dailyQuote;
  renderDailyQuote(state.dailyQuote);
}

function renderDailyQuote(q) {
  dailySource.textContent    = q.advisor + (q.source ? ' · ' + q.source : '');
  dailyOriginal.textContent  = q.original;
  dailyTranslation.textContent = q.translation;
  refreshSaveBtn();
}

// ══════════════════════════════════════════════════
// LISTENERS
// ══════════════════════════════════════════════════

function setupListeners() {
  // Consulta
  oracleOrb.addEventListener('click', openForm);
  oracleOrb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openForm(); });
  btnCancel.addEventListener('click', closeForm);
  btnSubmit.addEventListener('click', submitConsult);
  feelingInput.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submitConsult();
  });

  // Acciones frase
  btnDismiss.addEventListener('click', handleDismiss);
  btnSave.addEventListener('click', handleSave);

  // Header clickeable → historial
  $('app-header').style.pointerEvents = 'all';
  $('app-header').style.cursor = 'default';
  $('header-count').style.cursor = 'pointer';
  $('header-count').addEventListener('click', () => {
    $('screen-history').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ══════════════════════════════════════════════════
// CONSULTA AL ORÁCULO
// ══════════════════════════════════════════════════

function openForm() {
  consultIdle.classList.add('hidden');
  consultForm.classList.remove('hidden');
  setTimeout(() => feelingInput.focus(), 80);
}

function closeForm() {
  consultForm.classList.add('hidden');
  consultIdle.classList.remove('hidden');
  feelingInput.value = '';
}

async function submitConsult() {
  const feeling = feelingInput.value.trim();
  if (!feeling) { feelingInput.focus(); return; }

  btnSubmit.disabled = true;
  consultForm.classList.add('hidden');
  consultLoading.classList.remove('hidden');

  try {
    const data = await callOracle(feeling);
    showOracleResponse(data);

    // Desplazar a pantalla diaria
    $('screen-daily').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Resetear pantalla consulta
    setTimeout(() => {
      consultLoading.classList.add('hidden');
      consultIdle.classList.remove('hidden');
      feelingInput.value = '';
      btnSubmit.disabled = false;
    }, 600);

  } catch (err) {
    consultLoading.classList.add('hidden');
    consultIdle.classList.remove('hidden');
    btnSubmit.disabled = false;
    feelingInput.value = '';
    showToast('El oráculo no puede responder ahora. Inténtalo de nuevo.');
    console.error('[Oráculo]', err);
  }
}

async function callOracle(feeling) {
  const res = await fetch('/.netlify/functions/oracle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeling: feeling.slice(0, 600) }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function showOracleResponse(data) {
  // Construir quote object
  state.oracleQuote = {
    id:           'oracle-' + Date.now(),
    advisor:      data.advisor        || 'El oráculo',
    source:       'Consulta al oráculo',
    presentation: data.presentation   || '',
    original:     data.quote_original || '',
    translation:  data.quote_translation || '',
  };
  state.activeQuote = state.oracleQuote;

  // Rellenar DOM
  respAdvisor.textContent      = data.advisor        || '';
  respPresentation.textContent = data.presentation   || '';
  respOriginal.textContent     = data.quote_original || '';
  respTranslation.textContent  = data.quote_translation || '';

  // Mostrar card + divisor
  oracleCard.classList.remove('hidden');
  quoteDivider.classList.remove('hidden');

  // Cambiar etiqueta de la frase del día
  dailyLabel.textContent = 'Frase del día';

  // Scroll interno al inicio
  quoteScrollArea.scrollTop = 0;

  refreshSaveBtn();
}

// ══════════════════════════════════════════════════
// ACCIONES FRASE (dismiss / save)
// ══════════════════════════════════════════════════

function handleDismiss() {
  if (state.oracleQuote && state.activeQuote === state.oracleQuote) {
    // Descartar respuesta del oráculo → volver a frase del día
    oracleCard.classList.add('hidden');
    quoteDivider.classList.add('hidden');
    state.oracleQuote  = null;
    state.activeQuote  = state.dailyQuote;
    refreshSaveBtn();
  } else {
    // Descartar frase del día → avanzar a siguiente
    const idx = QUOTES.indexOf(state.dailyQuote);
    state.dailyQuote  = QUOTES[(idx + 1) % QUOTES.length];
    state.activeQuote = state.dailyQuote;
    renderDailyQuote(state.dailyQuote);
    // Pequeña animación de cambio
    dailyCard.style.opacity = '0';
    dailyCard.style.transform = 'translateY(8px)';
    dailyCard.style.transition = 'opacity 0.25s, transform 0.25s';
    requestAnimationFrame(() => {
      dailyCard.style.opacity = '1';
      dailyCard.style.transform = 'translateY(0)';
    });
  }
}

function handleSave() {
  if (!state.activeQuote) return;

  const q = state.activeQuote;
  const savedIdx = state.saved.findIndex(s => s.id === q.id);

  if (savedIdx !== -1) {
    // Ya guardada → deseleccionar
    state.saved.splice(savedIdx, 1);
    persist();
    refreshSaveBtn();
    updateHeaderCount();
    renderHistory();
    return;
  }

  // Guardar
  state.saved.unshift({ ...q, savedAt: Date.now(), reflection: '' });
  persist();
  refreshSaveBtn();
  updateHeaderCount();
  renderHistory();
  animateFly();
}

// ══════════════════════════════════════════════════
// ANIMACIÓN DE VUELO AL HEADER
// ══════════════════════════════════════════════════

function animateFly() {
  const q      = state.activeQuote;
  const srcEl  = (q === state.oracleQuote) ? respOriginal : dailyOriginal;
  const srcRect = srcEl.getBoundingClientRect();
  const hdrRect = $('app-header').getBoundingClientRect();

  const text = q.original.length > 50 ? q.original.slice(0, 47) + '…' : q.original;
  flyingPhrase.textContent = text;

  // Posición inicial
  Object.assign(flyingPhrase.style, {
    left:      srcRect.left + 'px',
    top:       srcRect.top  + 'px',
    width:     srcRect.width + 'px',
    opacity:   '1',
    transform: 'scale(1)',
  });

  // Centro destino
  const dstX = hdrRect.left + hdrRect.width  / 2 - srcRect.width / 2;
  const dstY = hdrRect.top  + hdrRect.height / 2 - 8;
  const dx   = dstX - srcRect.left;
  const dy   = dstY - srcRect.top;

  flyingPhrase.animate([
    { opacity: 1, transform: 'translate(0, 0) scale(1)' },
    { opacity: 0.6, transform: `translate(${dx * 0.6}px, ${dy * 0.6}px) scale(0.6)`, offset: 0.55 },
    { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.15)` },
  ], { duration: 720, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });

  // Pulso en el contador
  setTimeout(() => {
    headerCount.animate([
      { transform: 'scale(1.5)', color: '#c4a35a' },
      { transform: 'scale(1)',   color: '#c4a35a' },
    ], { duration: 350, easing: 'ease-out' });
  }, 580);
}

// ══════════════════════════════════════════════════
// HISTORIAL
// ══════════════════════════════════════════════════

function renderHistory() {
  // Limpiar items previos (no el empty state)
  historyList.querySelectorAll('.history-item').forEach(el => el.remove());

  if (state.saved.length === 0) {
    historyEmpty.classList.remove('hidden');
    return;
  }
  historyEmpty.classList.add('hidden');

  state.saved.forEach(q => historyList.appendChild(buildHistoryItem(q)));
}

function buildHistoryItem(q) {
  const div = document.createElement('div');
  div.className = 'history-item';
  div.dataset.id = q.id;

  div.innerHTML = `
    <div class="item-header">
      <div class="item-text">
        <div class="item-advisor">${esc(q.advisor)}</div>
        <div class="item-quote">${esc(q.original)}</div>
      </div>
      <div class="item-chevron">⌄</div>
    </div>
    <div class="item-body">
      <div class="item-translation">${esc(q.translation)}</div>
      <div class="reflection-wrap">
        <div class="reflection-label">Mi reflexión</div>
        <textarea
          class="reflection-area"
          placeholder="Escribe tu reflexión…"
          rows="3"
        >${esc(q.reflection || '')}</textarea>
        <div class="reflection-actions">
          <button class="btn-voice" title="Dictar por voz" aria-label="Dictar por voz">🎙</button>
          <div style="display:flex;gap:10px;align-items:center">
            <button class="btn-delete-item">Eliminar</button>
            <button class="btn-save-note">Guardar nota</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Expandir/colapsar
  div.querySelector('.item-header').addEventListener('click', () => {
    div.classList.toggle('expanded');
  });

  // Guardar reflexión
  const textarea  = div.querySelector('.reflection-area');
  const saveNoteBtn = div.querySelector('.btn-save-note');
  saveNoteBtn.addEventListener('click', () => {
    const idx = state.saved.findIndex(s => s.id === q.id);
    if (idx !== -1) {
      state.saved[idx].reflection = textarea.value;
      persist();
      saveNoteBtn.textContent = '✓ Guardado';
      saveNoteBtn.classList.add('saved-ok');
      setTimeout(() => {
        saveNoteBtn.textContent = 'Guardar nota';
        saveNoteBtn.classList.remove('saved-ok');
      }, 1800);
    }
  });

  // Voz
  const voiceBtn = div.querySelector('.btn-voice');
  voiceBtn.addEventListener('click', () => startVoice(textarea, voiceBtn));

  // Eliminar
  div.querySelector('.btn-delete-item').addEventListener('click', e => {
    e.stopPropagation();
    state.saved = state.saved.filter(s => s.id !== q.id);
    persist();
    updateHeaderCount();
    renderHistory();
    // Si la frase eliminada era la activa, refrescar botón guardar
    if (state.activeQuote && state.activeQuote.id === q.id) {
      refreshSaveBtn();
    }
  });

  return div;
}

// ══════════════════════════════════════════════════
// VOZ
// ══════════════════════════════════════════════════

function startVoice(textarea, btn) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Tu navegador no soporta entrada por voz.'); return; }

  if (state.recognition) {
    state.recognition.stop();
    return;
  }

  const rec = new SR();
  rec.lang = 'es-ES';
  rec.interimResults = true;

  state.recognition = rec;
  btn.classList.add('recording');

  rec.onresult = e => {
    textarea.value = Array.from(e.results).map(r => r[0].transcript).join('');
  };
  rec.onend = () => {
    btn.classList.remove('recording');
    state.recognition = null;
  };
  rec.onerror = () => {
    btn.classList.remove('recording');
    state.recognition = null;
  };

  rec.start();
}

// ══════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════

function refreshSaveBtn() {
  if (!state.activeQuote) return;
  const saved = state.saved.some(s => s.id === state.activeQuote.id);
  btnSave.classList.toggle('saved', saved);
  btnSave.querySelector('.btn-icon').textContent = saved ? '♥' : '♡';
  btnSave.setAttribute('aria-label', saved ? 'Frase guardada' : 'Guardar frase');
}

function updateHeaderCount() {
  const n = state.saved.length;
  headerCount.textContent = n;
  headerCount.classList.toggle('visible', n > 0);
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════════════
// PERSISTENCIA
// ══════════════════════════════════════════════════

function persist() {
  try {
    localStorage.setItem('oraculo_saved', JSON.stringify(state.saved));
  } catch {}
}

// ══════════════════════════════════════════════════
// SERVICE WORKER
// ══════════════════════════════════════════════════

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ══════════════════════════════════════════════════
// UTIL
// ══════════════════════════════════════════════════

function esc(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════════════
// ARRANCAR
// ══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', init);
