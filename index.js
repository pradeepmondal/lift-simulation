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


// function to create the UI
const CreateUI = () => {
    const floors = localStorage.getItem('floors');
    const lifts = localStorage.getItem('lifts');
    const root = document.getElementById('#root');
    const container = document.createElement('div');
    container.classList.add('container');
    root.appendChild(container);

    for (let i=0; i<=floors; i++) {
        const floor = document.createElement('div');
        floor.classList.add('floor');
        ctrBtn = document.createElement('div');
        if (i==0) {
            ctrBtn.innerHTML = `<div class="floor_btn"><button class="floor_up" >^</button></div>`;
        }
        else if (i==floors) {
            ctrBtn.innerHTML = `<div class="floor_btn"><button class="floor_down">v</button></div>`;
        }
        else {
            ctrBtn.innerHTML = `<div class="floor_btn"><button class="floor_up">^</button><button class="floor_down">v</button></div>`;
        }

        floor.innerHTML = `<div class="floor_ctrl">${ctrBtn.innerHTML}<div class="floor_number"> ${(i==0)?'G Floor':'Floor '+i}</div></div>`;
        container.appendChild(floor);
    }

    for (let i=0; i<lifts; i++) {
        const lift = document.createElement('div');
        lift.classList.add('lift_space');
        for (let j=0; j<=floors; j++) {
            lift_ctrl = document.createElement('div');
            lift_ctrl.classList.add('lift_ctrl');
            if(j==0) {

                lift_ctrl.innerHTML = `<div class="lift_btn"><button class="lift_up">^</button></div>`
            }
            else if (j==floors) {
                lift_ctrl.innerHTML = `<div class="lift_btn"><button class="lift_down">v</button></div>`
            }
            else {
            lift_ctrl.innerHTML = `<div class="lift_btn"><button class="lift_up">^</button><button class="lift_down">v</button></div>`
            }
            document.getElementsByClassName('floor')[j].appendChild(lift_ctrl);

            lift_space = document.createElement('div');
            lift_space.classList.add('lift_space');
            lift_space.innerText = `lift space ${i+1}`;

            if(j==0) {
                lift_space.innerHTML = `<div class="lift_unit">Lift ${i+1}</div>`
            }

            document.getElementsByClassName('floor')[j].appendChild(lift_space);
            
        }
        
        
        
        
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





