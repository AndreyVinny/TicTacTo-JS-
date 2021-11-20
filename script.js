const cells = document.querySelectorAll('.cell'),
    massage = document.querySelector('.massage');

let currentTurn = 'Player 1';

const wins = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6], 
];

let wonArr;

cells.forEach(cell => {
    cell.addEventListener('mouseenter', hoverIn);
    cell.addEventListener('mouseleave', hoverOut);
    cell.addEventListener('click', action, {once: true});
});

function action() {
    let currentClass = currentTurn === 'Player 1' ? 'cross' : 'circle'; 
        this.classList.remove(`${currentClass}-hover`);
        this.classList.add(currentClass);

        const isWinner = wins.some((win) => {
            const res = win.every((i) => cells[i].classList.contains(currentClass));
            if(res) {
                wonArr = win;
            }
            return res;
        })

        if(isWinner) {
            massage.innerText = `${currentTurn} Won!!!`;
            wonArr.forEach(i => {cells[i].classList.add('higlight')})
            cells.forEach(cell => {
                cell.removeEventListener('mouseenter', hoverIn);
                cell.removeEventListener('mouseleave', hoverOut);
                cell.removeEventListener('click', action);
                cell.style.cursor = 'not-allowed';
            })
            return;  
        }

        currentTurn === 'Player 1' ? (currentTurn = 'Player 2') : (currentTurn = 'Player 1');
        massage.innerText = `${currentTurn}'s  Turn`;
}

function hoverIn (){
    let currentClass = currentTurn === 'Player 1' ? 'cross-hover' : 'circle-hover'; 
    if(this.classList.contains('cross') || this.classList.contains('circle')){
        this.style.cursor = 'not-allowed'}
    else {
        this.classList.add(currentClass) 
    }
}


function hoverOut (){
    if(this.classList.contains('cross-hover') || this.classList.contains('circle-hover')) {
        this.classList.remove('cross-hover');
        this.classList.remove('circle-hover');
    }  
}