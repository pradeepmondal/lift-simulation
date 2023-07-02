// Description: Entry point for the lift simulation

// function to start the simulation
const StartSimulation = () => {
    const btn = document.getElementById('start');
    btn.addEventListener('click', () => {
        const floors = document.getElementById('floors').value;
        const lifts = document.getElementById('lifts').value;
        if ((floors>0) && (lifts>0)) {

            localStorage.setItem('floors', floors);
            localStorage.setItem('lifts', lifts);
            document.querySelector('.intro').remove();
            CreateUI();

        }

    });
}

const CreateUI = () => {
    const floors = localStorage.getItem('floors');
    const lifts = localStorage.getItem('lifts');
    const root = document.getElementById('#root');
    const container = document.createElement('div');
    container.classList.add('container');
    root.appendChild(container);

    for (let i=0; i<floors; i++) {
        const floor = document.createElement('div');
        floor.classList.add('floor');
        floor.innerHTML = `<div class="floor_number">${i+1}</div>`;
        container.appendChild(floor);
    }
    
};


const Intro = () => {


    // Intro Section appears after 1 second
    setTimeout(() => {
        const intro = document.createElement('div');
        intro.classList.add('intro');
        document.getElementById('#root').appendChild(intro)
        intro.innerHTML = `<h1>Welcome to Lift Simulation</h1>
        <div class="intro_input"><div><label>Enter number of floors</label><input type="number" id="floors" min="1" max="10" value="5" /></div>
        <div><label>Enter number of lifts</label><input type="number" id="lifts" min="1" max="10" value="2" /></div>
        <button id="start">Start Simulation</button></div>`
        StartSimulation();

    }, 1000);

    
};





Intro();





