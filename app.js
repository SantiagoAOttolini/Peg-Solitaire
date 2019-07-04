const initialState= [
    [undefined, undefined,1,1,1, undefined, undefined],
    [undefined, undefined,1,1,1, undefined, undefined],
    [1,1,1,1,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,1,1,1,1],
    [undefined, undefined,1,1,1, undefined, undefined],
    [undefined, undefined,1,1,1, undefined, undefined],
    
];

for (let i = 0; i < initialState.length; i++) {
    console.log('ROW');
    for (let j = 0; j < initialState[i].length; j++) {
        console.log(initialState[i][j]);
        
    }
    
}   