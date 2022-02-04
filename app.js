const YEARS = 22
const PAPER_AMOUNT = 80
const COLORS = [
    '#ab47bc',
    '#5c6bc0',
    '#29b6f6',
    '#66bb6a',
    '#ffee58',
    '#ffa726',
    '#ef5350',
]

function getOrdinalIndicator(num) {
    switch (num) {
        case 1:
        case 21:
            return 'st'
        case 2:
        case 22:
            return 'nd'
        case 3:
        case 23:
            return 'rd'
    }

    return 'th'
}

function generatePapers(container) {
    const maxPaperSize = container.offsetWidth / 40
    const minPaperSize = maxPaperSize / 2

    for (let i = 0; i < PAPER_AMOUNT; i++) {
        const p = document.createElement('div')

        p.style.position = 'absolute'
        p.style.top = `-${maxPaperSize}px`
        p.style.left = `${anime.random(-5, container.offsetWidth + 5)}px`
        p.style.width = `${anime.random(minPaperSize, maxPaperSize)}px`
        p.style.height = `${anime.random(minPaperSize, maxPaperSize)}px`
        p.style.backgroundColor = COLORS[i % COLORS.length]

        container.appendChild(p)
        animatePaper(p, container)
    }
}

function animatePaper(p, container) {
    anime({
        targets: p,
        delay: anime.random(0, 7000),
        duration: anime.random(5000, 7000),
        easing: 'linear',
        loop: true,
        translateX: `${anime.random(-20, 20)}px`,
        translateY: `${container.offsetHeight * 2 / 3}px`,
        skewX: `${anime.random(-45, 45)}deg`,
        skewY: `${anime.random(-45, 45)}deg`,
        rotate: `${anime.random(-1.5, 1.5)}turn`,
        opacity: [0.8, 0],
    })
}

var app = new Vue({
    el: '#popup',
    data: {
        yearCounter: 0,
        ord: getOrdinalIndicator(YEARS),
    },
    mounted() {
        anime.timeline({
            loop: false
        }).add([{
                targets: '#popup',
                scale: [0, 1],
                duration: 1500,
                delay: 500,
            },
            {
                targets: '#table',
                translateY: ['180px', 0],
                duration: 2000,
            },
            {
                targets: '#dish',
                translateY: ['200px', 0],
                duration: 2000,
                offset: '-=1950',
            },
            {
                targets: '#cake',
                translateY: ['200px', 0],
                duration: 2000,
                offset: '-=1950',
            },
            {
                targets: '#text h1',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 2000,
                delay: (el, i) => i * 100,
                offset: '-=500',
            },
            {
                targets: this,
                yearCounter: [0, YEARS],
                duration: 1000,
                round: 1,
                offset: '-=2000',
                easing: 'easeInOutQuart',
                begin: () => generatePapers(document.getElementById('popup')),
            },
            {
                targets: '#ord',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 1000,
                offset: '-=500',
            },
        ])
    },
})