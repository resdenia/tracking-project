(function () {
    let url = location.href;
    const domainName = window.location.hostname;

    let isExiting = false;

    function writeCookie(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(
                date.getTime() + days * 24 * 60 * 60 * 1000,
            );
            expires = '; expires=' + date.toGMTString();
        } else {
            expires = '';
        }
        document.cookie =
            name + '=' + value + expires + '; path=/';
    }
    function readCookie(name) {
        var i,
            c,
            ca,
            nameEQ = name + '=';
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return '';
    }

    const sessionId = readCookie('sessionId');
    const setEvent = (body) => {
        fetch('http://localhost:4010/tracker', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
                domain: domainName,
            }),
        });
    };

    if (sessionId === '') {
        writeCookie('sessionId', Date.now().toString(), 3);
    }

    const adBanners = document.currentScript
        .getAttribute('data-banners')
        .split(',');

    const setListeners = (url) => {
        this.setTimeout(() => {
            const adElements = adBanners.map((banner) =>
                document.getElementById(banner),
            );

            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setEvent({
                            session_id: sessionId,
                            url,
                            kind: 'view',
                            target_id: entries[0].target.id,
                            target_class: 'event',
                        });
                    }
                },
            );

            adElements.forEach((adElem) => {
                try {
                    adElem.addEventListener('click', () => {
                        setEvent({
                            session_id: sessionId,
                            url,

                            kind: 'click',
                            target_id:
                                adElem.getAttribute('id'),
                            target_class: 'event',
                        });
                    });
                    observer.observe(adElem);
                } catch (e) {
                    console.warn(
                        'something went wrong: ',
                        e,
                    );
                }
            });
        }, 1000);
    };

    document.body.addEventListener(
        'click',
        () => {
            requestAnimationFrame(() => {
                if (url !== location.href) {
                    url = location.href;
                    collectData(url);
                    setListeners(url);
                }
            });
        },
        true,
    );

    const collectData = (url) => {
        const currentUrl = url;

        let timeToSpent;

        window.addEventListener('load', function () {
            setListeners(url);
        });

        const startTime = Date.now();

        window.addEventListener('beforeunload', () => {
            const endTime = Date.now();
            timeToSpent = endTime - startTime;
            setEvent({
                session_id: sessionId,
                url: currentUrl,
                kind: 'timeSpent',
                target_id: currentUrl,

                target_class: 'page',
                meta: {
                    timeSpent: timeToSpent,
                },
            });
            if (isExiting) {
                setEvent({
                    session_id: sessionId,
                    url: currentUrl,
                    kind: 'userLeft',
                    target_id: currentUrl,

                    target_class: 'page',
                    meta: {
                        reason: 'left from top bar',
                    },
                });
            }
        });
    };
    collectData(url);

    document.addEventListener(
        'mousemove',
        function (event) {
            if (event.clientY < 10 && !isExiting) {
                isExiting = true;
            }
        },
    );

    // Reset the exit flag when user moves away from the top of the page
    document.addEventListener('mouseout', function (event) {
        if (event.clientY > 10 && isExiting) {
            isExiting = false;
        }
    });
})();
