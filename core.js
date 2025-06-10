(function () {
    const options = {
        botNick: "*args",
        targetNick: "**kwargs",
        qPlayEnabled: true
    };

    let followInterval = null;
    let qPlayInterval = null;

    function log(message) {
        return;
    }

    function moveTo(xRatio, yRatio) {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            log("Canvas bulunamadı.");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const moveX = rect.left + xRatio * rect.width;
        const moveY = rect.top + yRatio * rect.height;

        const moveEvent = new MouseEvent("mousemove", {
            clientX: moveX,
            clientY: moveY,
            bubbles: true
        });

        canvas.dispatchEvent(moveEvent);
        log(`Fare taşındı → xRatio: ${xRatio.toFixed(2)}, yRatio: ${yRatio.toFixed(2)}`);
    }

    function pressQAndClickPlay() {
        if (!options.qPlayEnabled) return;

        log("'Q' tuşuna basılıyor ve Play tıklanıyor...");

        const qDown = new KeyboardEvent("keydown", {
            key: "q", code: "KeyQ", keyCode: 81, bubbles: true
        });
        const qUp = new KeyboardEvent("keyup", {
            key: "q", code: "KeyQ", keyCode: 81, bubbles: true
        });

        document.dispatchEvent(qDown);
        document.dispatchEvent(qUp);

        const playButton = document.querySelector("#overlays > div > div.TabContainer.flex.grow.contain.vertical.tabs-container-b.items-stretch.flex-col > div.flex.grow.items-start.h-full.self-start.flex-row > div > div > div > div > div.col.p-0.h100.fcols > div.mx-1 > div.flex.flex-col.gap-0\\.5 > div:nth-child(1) > div > div");

        if (playButton) {
            playButton.click();
            log("Play tuşuna tıklandı.");
        } else {
            log("Play tuşu bulunamadı.");
        }
    }

    function startFollowing() {
        log(`Takip başlatıldı → Bot: ${options.botNick}, Hedef: ${options.targetNick}`);

        followInterval = setInterval(() => {
            const ghostCells = app?.clients?.player?.[0]?.ghostCells;
            if (!ghostCells || !Array.isArray(ghostCells)) return;

            let botX = null, botY = null;
            let targetX = null, targetY = null;

            for (let ghostCell of ghostCells) {
                const player = ghostCell?.player;
                if (!player?.name) continue;

                if (player.name === options.botNick) {
                    botX = player.x;
                    botY = player.y;
                } else if (player.name === options.targetNick) {
                    targetX = player.x;
                    targetY = player.y;
                }
            }

            if (botX === null || targetX === null) return;

            const dx = targetX - botX;
            const dy = targetY - botY;
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            if (magnitude === 0) return;

            const xRatio = (dx / magnitude + 1) / 2;
            const yRatio = (dy / magnitude + 1) / 2;

            moveTo(xRatio, yRatio);
        }, 100);

        if (options.qPlayEnabled) {
            qPlayInterval = setInterval(pressQAndClickPlay, 3000);
        }
    }

    function stopFollowing() {
        log("Takip durduruldu.");
        clearInterval(followInterval);
        clearInterval(qPlayInterval);
        moveTo(0.5, 0.5);
    }

    startFollowing();

    window.addEventListener("beforeunload", () => stopFollowing());
})();
