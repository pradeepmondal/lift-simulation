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


    // creating floors
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

        floor.innerHTML = `<div class="floor_ctrl">${ctrBtn.innerHTML}<div class="floor_number"> ${(i==0)?'Floor G':'Floor '+i}</div></div>`;
        container.appendChild(floor);
    }
    // creating lifts & lift spaces
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
                lift_space.innerHTML = `<div class="lift_unit" id="#lift+${i}" >Lift ${i+1}</div>`
                
            }

            document.getElementsByClassName('floor')[j].appendChild(lift_space);
            
        }
        
        
        
        
    }
    //function to create lift doors
    const LiftDoors = () => {
        for (let i=0; i<lifts; i++) {
        lift_unit = document.getElementsByClassName('lift_unit')[i];
        lift_unit.innerHTML = `<div class = "lift_doors"><div class="lift_door_left"></div><div class="lift_door_right"></div></div>`
    
    }
    }

    // creating lift doors
    LiftDoors();

    document.getElementsByClassName('lift_up')[0].addEventListener('click', () => {
        OpenDoors(0);
    });

    
};

const OpenDoors = (lift) => {
    const lift_door_left = document.getElementsByClassName('lift_doors')[lift].getElementsByClassName('lift_door_left')[0];
    const lift_door_right = document.getElementsByClassName('lift_doors')[lift].getElementsByClassName('lift_door_right')[0];
    lift_door_left.classList.add('lift_door_open_left');
    lift_door_left.classList.remove('lift_door_closed_left');
    lift_door_right.classList.add('lift_door_open_right');
    lift_door_right.classList.remove('lift_door_closed_right');
    setTimeout(() => {
        CloseDoors(lift);
    }, 5000);
}

const CloseDoors = (lift) => {
    const lift_door_left = document.getElementsByClassName('lift_doors')[lift].getElementsByClassName('lift_door_left')[0];
    const lift_door_right = document.getElementsByClassName('lift_doors')[lift].getElementsByClassName('lift_door_right')[0];
    lift_door_left.classList.remove('lift_door_open_left');
    lift_door_left.classList.add('lift_door_closed_left');
    lift_door_right.classList.remove('lift_door_open_right');
    lift_door_right.classList.add('lift_door_closed_right');
    
}






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





