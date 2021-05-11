const cli = [];

cli.input = _ => { return document.getElementById('input') };
cli.output = _ => { return document.getElementById('output') };

// New line
class Line {
    constructor(content, html) {
        this.content = content;
        const line = document.createElement('p');
        
        if (html) { line.appendChild(content) }
        else { line.innerHTML = content };
        cli.output().appendChild(line);
    };
};

// New progress bar
class ProgressBar {
    constructor(tasks, name) {
        this.tasks = parseInt(tasks);
        this.done = 0;
        this.id = Date.now()

        // Progress bar
        const bar = document.createElement('span');
        bar.setAttribute('id', `bar-${this.id}`)
        bar.innerText = '|▯▯▯▯▯▯▯▯▯▯|';

        // Percentage display
        const percentage = document.createElement('span');
        percentage.setAttribute('id', `percentage-${this.id}`)
        percentage.innerText = 0;

        const container = document.createElement('p');
        if (name !== undefined) { container.innerText = name}
        container.appendChild(bar);
        container.innerHTML += ' ';
        container.appendChild(percentage);
        container.innerHTML += '%';

        cli.output().appendChild(container)
    };

    update() {
        this.done++;
        
        const percentage = (this.done / this.tasks) * 100;

        const filled = Math.round(percentage / 10);
        let newBar = '|'
        for (let i = 0; i < filled; i++) { newBar += '▮' };
        for (let i = 0; i < (10 - filled); i++) { newBar += '▯' };
        newBar += '|';

        document.getElementById(`bar-${this.id}`).innerText = newBar;
        document.getElementById(`percentage-${this.id}`).innerText = Math.round(percentage);
    };
};

cli.init = function() {
    const input = cli.input()
    cli.input().addEventListener('keypress', evt => {
        if (evt.key !== 'Enter' || input.value === '') { return };
        // Input handling
        new Line(`β ${evt.target.value}`);
        
        // Do something with the input here
        // Like:
        console.log(cli.input().value)

        input.value = '';
    })

    // Auto focus on input
    document.addEventListener('keypress', _ => {
        input.focus();
    });
};

window.onload = cli.init