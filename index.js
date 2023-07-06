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
            
            for (let l=0; l<lifts; l++) {
                LiftFunc(i, 1, l);
                let liftBtn = document.getElementsByClassName('floor')[i].getElementsByClassName('lift_up')[l];
                liftBtn.classList.add('btn_active');
            }
            
        })

        floor_down.addEventListener('click', () => {
            
            for (let l=0; l<lifts; l++) {
                LiftFunc(i+1, -1, l);
                let liftBtn = document.getElementsByClassName('floor')[i+1].getElementsByClassName('lift_down')[l];
                liftBtn.classList.add('btn_active');
            }
            
})

        const LiftFunc = async (floorNum, dir, j=j) => {
            let curFloor = JSON.parse(localStorage.getItem(`lift${j+1}CurFloor`).trim());
            let isMove = false;

            if(dir === 1) {
                if ((curFloor[0] === floorNum) && (curFloor[1] >= 0)) {
                
                console.log(`lift is on same floor, opening the doors`);
                // MoveLift(j, floorNum, dir);
                
            }
                
                    console.log(`lift is on different floor, adding to queue`);
                    const liftQueue =  JSON.parse(localStorage.getItem(`lift${j+1}Queue`));

                    if((liftQueue.up.length === 0)&&(liftQueue.down.length === 0)) {
                        console.log(`Queue is empty, adding to queue, and moving lift`)
                        isMove = true;}
                    

                    const t = floorNum

                    if (!(liftQueue.up.includes(t))) {

                        liftQueue.up.push(t);
                        console.log(`New Up Queue for lift${j+1}  is ${liftQueue.up}`);
                        localStorage.setItem(`lift${j+1}Queue`, JSON.stringify(liftQueue));
                        console.log(`lift ${j+1} up queue is ${liftQueue.up}`);
                        // console.log(`lift ${j+1} priority  is ${preferDictGenUp(liftQueue.up, curFloor[0])[0]}`);
                    
                
                        // Call Move Lift Function
                        if(isMove) {
                            MoveLift(j, floorNum, dir);
                                
                            }



                        }


                
            }
             else if(dir === -1) {
                if ((curFloor[0] === floorNum) && (curFloor[1] <= 0)) {
                
                console.log(`lift is on same floor, opening the doors`)
                MoveLift(j, floorNum, dir);

            }
            
                    console.log(`lift is on different floor, adding to queue`);
                    const liftQueue =  JSON.parse(localStorage.getItem(`lift${j+1}Queue`));

                    if((liftQueue.up.length === 0)&&(liftQueue.down.length === 0)) {
                        console.log(`Queue is empty, adding to queue, and moving lift`)
                        isMove = true;}
                    

                    const t = floorNum

                    if (!(liftQueue.down.includes(t))) {

                        liftQueue.down.push(t);
                        console.log(`New Down Queue for lift${j+1}  is ${liftQueue.down}`);
                        localStorage.setItem(`lift${j+1}Queue`, JSON.stringify(liftQueue));
                        console.log(`lift ${j+1} down queue is ${liftQueue.down}`);
                        // console.log(`lift ${j+1} priority  is ${preferDictGenUp(liftQueue.up, curFloor[0])[0]}`);
                    
                
                        // Call Move Lift Function
                        if(isMove) {
                            MoveLift(j, floorNum, dir);
                                
                            }



                        }


                
        }

            
                

                
                
                    
                    
                    
                }


        lift_up.addEventListener('click', () => {LiftFunc(i, 1, j); lift_up.classList.add('btn_active');} )

        lift_down.addEventListener('click', () => {LiftFunc(i+1, -1, j); lift_down.classList.add('btn_active');} )



}
}
}



// create a function to move the lift 
    async function MoveLift (lift, k, dir) {
        let con = false;
        let con2 = false; 
        let lifts = localStorage.getItem('lifts');

        function getOffset(el) {
            const rect = el.getBoundingClientRect();
            return {
              left: rect.left + window.scrollX,
              top: rect.top 
            };
          }

          let dir_ = 0;
        
        
        if(dir === 1) {
        await new Promise((resolve, reject) => {

            const lifts = localStorage.getItem('lifts');  
            let curFloor = JSON.parse(localStorage.getItem(`lift${lift+1}CurFloor`).trim());
            let liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));

            if ((curFloor[0] === k ) && (curFloor[1] >= 0)) {
                console.log(`lift is on same floor, opening doors`)
                OpenDoors((k*lifts)+lift);
                dir_ = 1;
                con = true;
                
                setTimeout(() => {resolve();}, 7500);     
            }
            else {

            
            let lift_unit = document.getElementsByClassName('lift_unit')[lift];
            const lift_space_g = document.getElementsByClassName('floor')[0].getElementsByClassName('lift_space')[0];
            const lift_space_f = document.getElementsByClassName('floor')[1].getElementsByClassName('lift_space')[0];
            const lift_space_diff = getOffset(lift_space_f).top - getOffset(lift_space_g).top;

        console.log(getOffset(lift_space_f).top, getOffset(lift_space_g).top ,lift_space_diff);
    
        lift_unit.style.transition = `all ${Math.abs(curFloor[0]-k)*2}s `;

        const diff = (k-curFloor[0]);

        console.log(`current position of lift is ${getOffset(lift_unit).top}`)

        console.log(`value of next floor is ${k} and value of current floor is ${curFloor[0]} lift would move ${ getOffset(lift_unit).top + ((k-curFloor[0])*lift_space_diff)}px `)
    
        lift_unit.style.transform += `translate(0px, ${ ((k-curFloor[0])*lift_space_diff)}px)`;

        let temp = curFloor[0];

         dir_ = (curFloor[0]<k) ? 1 : -1;
        curFloor[0], curFloor[1] = k, dir_;
        localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([k, dir_]));


        setTimeout(() => {OpenDoors((k*lifts)+lift);console.log(`lift ${lift+1} reached to ${k}`);
    
    
        
        
        
   
        setTimeout(() => {
            liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
            const idx = liftQueue.up.indexOf(k);
            liftQueue.up.splice(idx, 1);
            localStorage.setItem(`lift${lift+1}Queue`, JSON.stringify(liftQueue));
            let lift_up = document.getElementsByClassName('floor')[k].getElementsByClassName('lift_up')[lift];
            lift_up.classList.remove('btn_active');

            resolve(); console.log('Resolved');}, 7500); 
                
    }, Math.abs(temp-k)*2000);

        for (let i=0; i<Math.abs(temp-k)-1; i++) {
            setTimeout(() => {temp += (diff/Math.abs(diff)); console.log(`lift ${lift+1} is at ${temp}`);}, (i+1)*2000);
        }
      
            
        setTimeout(() => {console.log(`lift ${lift+1} is at ${temp+(diff/Math.abs(diff))}`)}, Math.abs(diff)*2000);    
            console.log(temp);
        //     localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify(curFloor));
        //     console.log(`lift ${lift+1} is at ${curFloor[0]}`);
        //     // setTimeout( () => {}, 2000);
        
    }
        
        });
        if(con) {
        let liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
        const idx = liftQueue.up.indexOf(k);
        liftQueue.up.splice(idx, 1);
        localStorage.setItem(`lift${lift+1}Queue`, JSON.stringify(liftQueue));
        let lift_up = document.getElementsByClassName('floor')[k].getElementsByClassName('lift_up')[lift];
            lift_up.classList.remove('btn_active');
        


        
    
    }

    }
    else if(dir === -1) {
        await new Promise((resolve, reject) => {

            const lifts = localStorage.getItem('lifts');  
            let curFloor = JSON.parse(localStorage.getItem(`lift${lift+1}CurFloor`).trim());
            let liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));

            if ((curFloor[0] === k ) && (curFloor[1] <= 0)) {
                console.log(`lift is on same floor, opening doors`)
                OpenDoors((k*lifts)+lift);
                dir_ = -1;
                con2 = true;
                
                setTimeout(() => {resolve();}, 7500);

            }
            else {

            
            let lift_unit = document.getElementsByClassName('lift_unit')[lift];
            const lift_space_g = document.getElementsByClassName('floor')[0].getElementsByClassName('lift_space')[0];
            const lift_space_f = document.getElementsByClassName('floor')[1].getElementsByClassName('lift_space')[0];
            const lift_space_diff = getOffset(lift_space_f).top - getOffset(lift_space_g).top;

        console.log(getOffset(lift_space_f).top, getOffset(lift_space_g).top ,lift_space_diff);
    
        lift_unit.style.transition = `all ${Math.abs(curFloor[0]-k)*2}s `;

        const diff = (k-curFloor[0]);

        console.log(`current position of lift is ${getOffset(lift_unit).top}`)

        console.log(`value of next floor is ${k} and value of current floor is ${curFloor[0]} lift would move ${ getOffset(lift_unit).top + ((k-curFloor[0])*lift_space_diff)}px `)
    
        lift_unit.style.transform += `translate(0px, ${ ((k-curFloor[0])*lift_space_diff)}px)`;

        let temp = curFloor[0];

        dir_ = (curFloor[0]<k) ? 1 : -1;
        curFloor[0], curFloor[1] = k, dir_;
        localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([k, dir_]));


        setTimeout(() => {OpenDoors((k*lifts)+lift);console.log(`lift ${lift+1} reached to ${k}`);
    
    
        
        
        
   
        setTimeout(() => {
            liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
            const idx = liftQueue.down.indexOf(k);
            liftQueue.down.splice(idx, 1);
            localStorage.setItem(`lift${lift+1}Queue`, JSON.stringify(liftQueue));
            let lift_down = document.getElementsByClassName('floor')[k].getElementsByClassName('lift_down')[lift];
            lift_down.classList.remove('btn_active');

            resolve(); console.log('Resolved Down');}, 7500); 
                
    }, Math.abs(temp-k)*2000);

        for (let i=0; i<Math.abs(temp-k)-1; i++) {
            setTimeout(() => {temp += (diff/Math.abs(diff)); console.log(`lift ${lift+1} is at ${temp}`);}, (i+1)*2000);
        }
      
            
        setTimeout(() => {console.log(`lift ${lift+1} is at ${temp+(diff/Math.abs(diff))}`)}, Math.abs(diff)*2000);    
            console.log(temp);
        //     localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify(curFloor));
        //     console.log(`lift ${lift+1} is at ${curFloor[0]}`);
        //     // setTimeout( () => {}, 2000);
        
    }
        
        });
        if(con2) {
            let liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
            const idx = liftQueue.down.indexOf(k);
            liftQueue.down.splice(idx, 1);
            localStorage.setItem(`lift${lift+1}Queue`, JSON.stringify(liftQueue));
            let lift_down = document.getElementsByClassName('floor')[k].getElementsByClassName('lift_down')[lift];
            lift_down.classList.remove('btn_active');

        }

    }

        
        console.log(`current lift direction is ${dir_}`);
        let liftQueue =  JSON.parse(localStorage.getItem(`lift${lift+1}Queue`));
        let curFloor = JSON.parse(localStorage.getItem(`lift${lift+1}CurFloor`).trim());
        if (!((liftQueue.up.length === 0)&&(liftQueue.down.length === 0))) {
            if ((dir_ === 1) && (liftQueue.up.length === 0)) {
                dir_ = -1;
                localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([curFloor[0], dir_]));
            }
            else if ((dir_ === 1) && ((liftQueue.up.length !== 0) && Math.max(liftQueue.up)<curFloor[0])) {
                dir_ = -1;
                localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([curFloor[0], dir_]));
            }
            else if ((dir_ === -1) && (liftQueue.down.length === 0)) {
                dir_ = 1;
                localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([curFloor[0], dir_]));
            }
            else if ((dir_ === -1) && ((liftQueue.down.length !== 0) && Math.min(liftQueue.down)>curFloor[0])) {
                dir_ = 1;
                localStorage.setItem(`lift${lift+1}CurFloor`, JSON.stringify([curFloor[0], dir_]));
            }
            if(dir_ === 1) {
                if (liftQueue.up.length !== 0) {
            const preferDict = preferDictGenUp(liftQueue.up, curFloor[0]);
            console.log(`after conditions, current lift direction is ${dir_}`);
            console.log(`Next floor is ${preferDict[0]}`);
            MoveLift(lift, preferDict[0], 1);}
            else {
                const preferDict = preferDictGenDown(liftQueue.down, curFloor[0]);
                console.log(`after conditions, current lift direction is ${dir_}`);
                console.log(`Next floor is ${preferDict[0]}`);
                MoveLift(lift, preferDict[0], -1 );

            }
        }
            else if(dir_ === -1) {
                if (liftQueue.down.length !== 0) {
                const preferDict = preferDictGenDown(liftQueue.down, curFloor[0]);
                console.log(`after conditions, current lift direction is ${dir_}`);
                console.log(`Next floor is ${preferDict[0]}`);
                MoveLift(lift, preferDict[0], -1 );}
                else {

                const preferDict = preferDictGenUp(liftQueue.up, curFloor[0]);
                console.log(`after conditions, current lift direction is ${dir_}`);
                console.log(`Next floor is ${preferDict[0]}`);
                MoveLift(lift, preferDict[0], 1 );

                }
            }
        }
        
        
       
    }

    const preferDictGenUp = (list, k) => {
        const preferDict = {};
            let key = 0;
            list.sort();
            list.forEach((item) => {if(item>=k)  {preferDict[key] = item; key++;} });
            list.forEach((item) => {if(item<k)  {preferDict[key] = item; key++;} });

            return preferDict;
    }

    const preferDictGenDown = (list, k) => {
        const preferDict = {};
            let key = 0;
            list.sort();
            list.reverse();
            list.forEach((item) => {if(item<=k)  {preferDict[key] = item; key++;} });
            list.forEach((item) => {if(item>k)  {preferDict[key] = item; key++;} });

            return preferDict;
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





