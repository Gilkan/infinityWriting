function infinityWriting(
    id,
    {
        fullscreen = false,
        speed = 16,
        charsPerFrame = 2,
        backgroundColor = 'black',
        fontColor = 'green',
        mode = 'self', // 'self' | 'matrix'
    } = {}
) {
    const container = document.getElementById(id);

    // Base styles
    Object.assign(container.style, {
        background: backgroundColor,
        color: fontColor,
        fontFamily: 'monospace',
        overflow: 'auto'
    });

    if (fullscreen) {
        Object.assign(container.style, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999999
        });
    }

    // Content sources
    const sources = {
        self: infinityWriting.toString(),
        matrix: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]();<>/$#@!%^&*+-="
    };

    let sourceText = sources[mode] || sources.self;
    let running = true;
    let lastFrameTime = 0;

    function writeText(element, text, charsPerRun) {
        const currentLength = element.textContent.length;
        let chunk = "";

        for (let i = 0; i < charsPerRun; i++) {
            chunk += text[(currentLength + i) % text.length];
        }

        element.textContent += chunk;
        element.scrollTop = element.scrollHeight;
    }

    function maybeGlitch(element) {
        if (Math.random() < 0.02) {
            element.textContent += "\nSegmentation fault (core dumped)";
        }
        if (Math.random() < 0.01) {
            element.textContent += "\n> sudo rm -rf / --no-preserve-root";
        }
    }

    function maybeBackspace(element) {
        if (Math.random() < 0.05) {
            const removeCount = Math.floor(Math.random() * 10);
            element.textContent = element.textContent.slice(0, -removeCount);
        }
    }

    function loop(timestamp) {
        if (!running) return;

        // throttle using "speed"
        if (timestamp - lastFrameTime >= speed) {
            writeText(container, sourceText, charsPerFrame);
            maybeGlitch(container);
            maybeBackspace(container);

            lastFrameTime = timestamp;
        }

        requestAnimationFrame(loop);
    }

    function handleKeydown(e) {
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            running = false;
            document.removeEventListener('keydown', handleKeydown);

            if (fullscreen) {
                container.remove();
            }
        }
    }

    document.addEventListener('keydown', handleKeydown);

    requestAnimationFrame(loop);
}