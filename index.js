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
            // lift_space.innerText = `lift space ${i+1}`;

            if(j==0) {
                lift_unit = document.createElement('div');
                lift_unit.classList.add('lift_unit');
                lift_unit.style.display = 'absolute';
                lift_unit.innerText = `Lift ${i+1}`;
                lift_space.appendChild(lift_unit);
                
                
            }

            document.getElementsByClassName('floor')[j].appendChild(lift_space);
            
        }
        
        
        
        
    }
    //function to create lift doors
    const LiftDoors = () => {
        const l_spaces = document.getElementsByClassName('lift_space');
        for (let i=0; i<l_spaces.length; i++) {
        const lift_space = l_spaces[i];
        const door_container = document.createElement('div');
        door_container.classList.add('door_container');
        const doors = document.createElement('div');
        doors.innerHTML = `<div class = "lift_doors"><div class="lift_door_left"></div><div class="lift_door_right"></div></div>`
        door_container.appendChild(doors);
        lift_space.appendChild(door_container);
    
    }
    }

    // creating lift doors
    LiftDoors();

    // document.getElementsByClassName('lift_up')[0].addEventListener('click', () => {
    //     OpenDoors(0);
    // });

    createLiftsQueue();

    addBtnFunc();


    
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

// function to create lifts queue
const createLiftsQueue = () => {
    const lifts = localStorage.getItem('lifts');
    for (let i=0; i<lifts; i++) {
        localStorage.setItem(`lift${i+1}Queue`, JSON.stringify({'up': [], 'down': []}));
        localStorage.setItem(`lift${i+1}CurFloor`, JSON.stringify([0,0]));
    }
}

// function to add button functionality
const addBtnFunc =  () => {
    const floors = localStorage.getItem('floors');
    const lifts = localStorage.getItem('lifts');

    for (let i=0; i<floors; i++) {
        for (let j=0; j<lifts; j++) {   
        const floor_up = document.getElementsByClassName('floor_up')[i];
        const floor_down = document.getElementsByClassName('floor_down')[i];
        const lift_up = document.getElementsByClassName('lift_up')[(i*lifts)+j];
        const lift_down = document.getElementsByClassName('lift_down')[(i*lifts)+j];
        floor_up.addEventListener('click', () => {
            
        })

        floor_down.addEventListener('click', () => {
            
})

        const LiftUpFunc = async (i=i) => {
            curFloor = JSON.parse(localStorage.getItem(`lift${j+1}CurFloor`).trim());
            let isMove = true;
                if ((curFloor[0] === i ) && (curFloor[1] >= 0)) {
                    OpenDoors(j);    
                }

                else if (curFloor[0] < i ){
                
                    console.log(`lift is inside func`)
                    const liftQueue =  JSON.parse(localStorage.getItem(`lift${j+1}Queue`));
                    

                    const t = i

                    if (!(liftQueue.up.includes(t))) {

                        liftQueue.up.push(t);
                        console.log(liftQueue.up)
                        localStorage.setItem(`lift${j+1}Queue`, JSON.stringify(liftQueue))
                    
                
                        // Call Move Lift Function
                        if(isMove) {
                            liftQueue.up.pop(t);
                            localStorage.setItem(`lift${j+1}Queue`, JSON.stringify(liftQueue));
                            await new Promise((resolve, reject) => { MoveLift(j, i-curFloor[0]);
                                setTimeout(() => {
                                    console.log(`lift reached floor ${Math.abs(i)}`);
                                    localStorage.setItem(`lift${j+1}CurFloor`, JSON.stringify([i, 1]));
                                    console.log(`Now Current floor is  ${Math.abs(i)}`);
                                    resolve();
                                }, 5000+Math.abs(curFloor[0]-i)*2000);} );

                                
                            const liftQueue1 =  JSON.parse(localStorage.getItem(`lift${j+1}Queue`));
                            console.log(`Current Queue is   ${liftQueue1.up}`);
                            if(liftQueue1.up.length !== 0) {
                                const arg = (liftQueue1.up.filter((item) => item >= i).sort())[0];
                            console.log(`Next in Queue is   ${arg}`);
                                LiftUpFunc(arg);
                                
                            }



                        }
                    }
                }
}

        lift_up.addEventListener('click', () => {LiftUpFunc(i)} )

        lift_down.addEventListener('click', () => {
            curFloor = JSON.parse(localStorage.getItem(`lift${j+1}CurFloor`).trim());
            let isMove = false;
                if ((curFloor[0] === i ) && (curFloor[1] <= 0)) {
                OpenDoors(j);    
                }
                else {
                const liftQueue =  JSON.parse(localStorage.getItem(`lift${j+1}Queue`));
                if(liftQueue.down.length === 0) {
                    isMove = true;
                }

                const t = i
                if (!(liftQueue.down.includes(t))) {
                liftQueue.down.push(t);
                console.log(liftQueue.down)
                localStorage.setItem(`lift${j+1}Queue`, JSON.stringify(liftQueue))
                
                // Call Move Lift Function
                if(isMove) {
                    MoveLift(j, -i);
                }
        }
    }



        })



}
}
}



// create a function to move the lift
const MoveLift = 
    (lift, k) => {

        function getOffset(el) {
            const rect = el.getBoundingClientRect();
            return {
              left: rect.left + window.scrollX,
              top: rect.top 
            };
          }
        
        const lifts = localStorage.getItem('lifts');  
        const curFloor = JSON.parse(localStorage.getItem(`lift${lift+1}CurFloor`).trim());
        const liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
        const lift_unit = document.getElementsByClassName('lift_unit')[lift];
        const lift_space_g = document.getElementsByClassName('floor')[0].getElementsByClassName('lift_space')[0];
        const lift_space_f = document.getElementsByClassName('floor')[1].getElementsByClassName('lift_space')[0];
        const lift_space_diff = getOffset(lift_space_f).top - getOffset(lift_space_g).top;
        console.log(getOffset(lift_space_f).top, getOffset(lift_space_g).top ,lift_space_diff);
    
        lift_unit.style.transition = `all ${Math.abs(curFloor[0]-k)*2}s `;
    
        lift_unit.style.transform = `translate(0px, ${ (k*lift_space_diff)}px)`;
        setTimeout(() => {OpenDoors((k*lifts)+lift);}, Math.abs(curFloor[0]-k)*2000);
        
        
       
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




// Starting the Intro part
Intro();





