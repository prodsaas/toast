if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    class Toast {
        constructor() {
            this.container = document.getElementById('prodsaas-toast-container');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'prodsaas-toast-container';
                document.body.appendChild(this.container);
            }
            this.injectStyles();
        }

        injectStyles() {
            if (document.getElementById('prodsaas-toast-style')) return;

            const styleEl = document.createElement('style');
            styleEl.id = 'prodsaas-toast-style';
            styleEl.textContent = toastStyles;
            document.head.appendChild(styleEl);
        }

        show(action, message) {
            const toastEl = document.createElement('div');
            toastEl.className = `prodsaas-toast ${action}`;
            const isPersistent = action === 'load';

            toastEl.innerHTML = `
                <div class="toast-content">
                    <div class="toast-action">
                        <p>${['warn', 'load'].includes(action) ? action + 'ing' : action}</p>
                        ${!isPersistent ? `
                            <button aria-label="Close" class="toast-close-btn">Close</button>
                        ` : '<div class="toast-spinner"></div>'}
                    </div>
                    <p class="toast-message">${message}</p>
                </div>
            `;

            toastEl.addEventListener('animationend', (e) => {
                if (e.animationName === 'toast-out' || e.animationName === 'toast-close') {
                    toastEl.remove();
                }
            });

            if (!isPersistent) {
                const closeBtn = toastEl.querySelector('.toast-close-btn');
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    toastEl.classList.add('close');
                };
            }

            this.container.appendChild(toastEl);
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
            this.container.querySelectorAll('.prodsaas-toast').forEach(toast => toast.classList.add('close'));
        }
    }

    const toastStyles = `
        #prodsaas-toast-container {
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .prodsaas-toast {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        @keyframes toast-in {
            from {
                opacity: 0;
                transform: translateY(14px) scale(.99);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes toast-out {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(10px) scale(.99);
            }
        }

        @keyframes toast-close {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(10px) scale(.99);
            }
        }

        .prodsaas-toast .toast-content {
            padding: 14px 16px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 4px;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
            animation: toast-in .25s ease forwards;
        }

        .prodsaas-toast.success .toast-content,
        .prodsaas-toast.error .toast-content,
        .prodsaas-toast.warn .toast-content,
        .prodsaas-toast.info .toast-content {
            animation:
                toast-in .25s ease,
                toast-out .25s ease 4.5s forwards;
        }

        .prodsaas-toast.load .toast-content {
            animation: toast-in .25s ease forwards;
        }

        .prodsaas-toast.close .toast-content {
            animation: toast-close .25s ease forwards;
        }

        .prodsaas-toast .toast-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .prodsaas-toast .toast-action p {
            margin: 0;
            color: #111827;
            font-size: 0.95rem;
            font-weight: 500;
            text-transform: capitalize;
        }

        .prodsaas-toast .toast-message {
            margin: 0;
            color: #29292f;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .prodsaas-toast .toast-action button {
            color: #6b7280;
            background-color: transparent;
            border: 0;
            cursor: pointer;
        }

        .prodsaas-toast.success .toast-action p {
            color: #166534;
        }

        .prodsaas-toast.error .toast-action p {
            color: #991b1b;
        }

        .prodsaas-toast.warn .toast-action p {
            color: #92400e;
        }

        .prodsaas-toast.info .toast-action p,
        .prodsaas-toast.load .toast-action p {
            color: #1e3a8a;
        }

        @keyframes toast-spin {
            100% {
                transform: rotate(1turn)
            }
        }

        .prodsaas-toast .toast-spinner {
            flex-shrink: 0;
            width: 15px;
            aspect-ratio: 1;
            display: grid;
            border-radius: 50%;
            background:
                linear-gradient(0deg, rgb(0 0 0/50%) 30%, #0000 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%,
                linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%;
            background-repeat: no-repeat;
            animation: toast-spin 1s infinite steps(12);
        }

        .prodsaas-toast .toast-spinner::before,
        .prodsaas-toast .toast-spinner::after {
            content: "";
            grid-area: 1/1;
            border-radius: 50%;
            background: inherit;
            opacity: 0.915;
            transform: rotate(30deg);
        }

        .prodsaas-toast .toast-spinner::after {
            opacity: 0.83;
            transform: rotate(60deg);
        }

        @media (width >= 480px) {
            #prodsaas-toast-container {
                top: 1rem;
                bottom: unset;
                left: unset;
                right: 1rem;
                align-items: flex-end;
            }

            .prodsaas-toast .toast-content {
                width: 350px;
            }

            @keyframes toast-in {
                from {
                    opacity: 0;
                    transform: translateY(-14px) scale(.99);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes toast-out {
                to {
                    opacity: 0;
                    transform: translateY(-10px) scale(.99);
                }
            }

            @keyframes toast-close {
                to {
                    opacity: 0;
                    transform: translateY(-10px) scale(.99);
                }
            }
        }
    `;

    if (!window.toast) window.toast = new Toast();
}

export default typeof window !== 'undefined' ? window.toast : null;