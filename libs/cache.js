const RandomGen = require('random-seed');

function seedKey(key) {
    const rand = RandomGen.create(key);
    return rand.string(30);
}



export function save(key, value) {
    const data = {
        key: key,
        name: seedKey(key),
        time: Date.now(),
        expires: Date.now() + 1000 * 60 * 60 * 24,
        value: value
    }
    console.log(data);
}