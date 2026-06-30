(function () {
    if (window.toast) return;

    class Toast {
        constructor() {
            this.container = document.createElement('div');
            this.container.id = 'toast';
            this.shadow = this.container.attachShadow({ mode: 'open' });

            this.mountNode = document.createElement('div');
            this.shadow.appendChild(this.mountNode);

            let scriptUrl = '';
            if (document.currentScript) {
                scriptUrl = document.currentScript.src;
            }
            else if (typeof import.meta !== 'undefined' && import.meta.url) {
                scriptUrl = import.meta.url;
            }

            this.cssUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1) + 'toast.css';

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.cssUrl;
            this.shadow.appendChild(link);

            document.body.appendChild(this.container);
        }

        show(action, message) {
            this.mountNode.innerHTML = '';

            const toastEl = document.createElement('div');
            toastEl.className = `toast ${action}`;
            const isPersistent = action === 'load';

            toastEl.innerHTML = `
                <div class="content">
                    <div class="action">
                        <p>${['warn', 'load'].includes(action) ? action + 'ing' : action}</p>
                        ${!isPersistent ? `
                            <button aria-label="Close" class="close-btn">Close</button>
                        ` : '<div class="spinner"></div>'}
                    </div>
                    <p class="message">${message}</p>
                </div>
            `;

            toastEl.addEventListener('animationend', (e) => {
                if (e.animationName === 'toast-out' || e.animationName === 'toast-close') {
                    toastEl.remove();
                }
            });

            if (!isPersistent) {
                const closeBtn = toastEl.querySelector('.close-btn');
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    toastEl.classList.add('close');
                };
            }

            this.mountNode.appendChild(toastEl);
        }

        success(msg) {
            this.show('success', msg);
        }
        error(msg) {
            this.show('error', msg);
        }
        warn(msg) {
            this.show('warn', msg);
        }
        info(msg) {
            this.show('info', msg);
        }
        load(msg) {
            this.show('load', msg);
        }
        hide() {
            this.mountNode.querySelectorAll('.toast').forEach(toast => toast.classList.add('close'));
        }
    }

    const init = () => window.toast = new Toast();

    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init);
})();