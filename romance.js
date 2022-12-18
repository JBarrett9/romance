/**
 * Utilizes a Markov Chain to produce a poem base on input text.
 * 
 * @param {string} wordCorpus
 * @param {number} lines 
 * @param {number} lineLen - Number of words in each line
 * @returns 
 */
function generatePoem(wordCorpus, lines, lineLen) {
    if (!lineLen) lineLen = Math.floor(Math.random() * 10);
    if (!lines) lines = Math.floor(Math.random() * 10);
    let words = parseText(wordCorpus);
    let mChain = generateWordPairs(words);
    let poem = "";
    for (let i = 0; i < lines; i++) {
        poem += "\n" + writeLine(mChain, lineLen);
    }
    return poem;
}

/**
 * Generates a random title
 * @param {string} text 
 * @returns {string}
 */
const generateTitle = (text) => {
    let words = parseText(text);
    let mChain = generateWordPairs(words);
    return writeLine(mChain, Math.floor(Math.random() * 5));
}

/**
 * Returns a markov chain for the given set of words
 *
 *  @param {[]} arr 
 * @returns {{}}
 */
const generateWordPairs = (arr) => {
    let mChain = {};
    let n = arr.length - 1;
    for (let i = 0; i < n; i++) {
        let currWord = arr[i];
        if (mChain[currWord]) mChain[currWord].push(arr[i + 1]);
        else mChain[currWord] = [arr[i + 1]];
    }

    return mChain;
} 

/**
 * 
 * @param {number} selection 
 * @returns {string} selected song
 */
const getSong = (selection) => {
    let songs = {
        0: example,
        1: firework,
        2: fox,
    }
    return songs[selection];
}

/**
 * Returns a random word from the given mMrkov chain
 * 
 * @param {{}} mChain 
 * @returns {string}
 */
const getStartWord = (mChain) => {
    let words = Object.keys(mChain);
    return words[ Math.floor(Math.random() * words.length)];
}

/**
 * Get a random word from input Markov chain base on input word
 * 
 * @param {{}} mChain 
 * @param {string} word 
 * @returns string
 */
const getWord = (mChain, word) => { 
    let currWord = mChain[word];
    let res = "";
    if (currWord) {
        res = currWord[ Math.floor(Math.random() * currWord.length)];
    } else {
        res = getStartWord(mChain);
    }
    
    return res;
}

/**
 * Returns an array of words from in iput string
 * 
 * @param {string} str 
 * @returns {[]}
 */
// split with regex for alphanumeric characters and ' then filter to remove empty strings.
const parseText = (str) => str.split(/[^a-z0-9']/i).filter(element => element);

/**
 * Generate a line of poetry from input Markov chain
 * @param {{}} mChain 
 * @param {number} n number of words in the line
 * @returns 
 */
const writeLine = (mChain, n) => {
    let word = getStartWord(mChain);
    let line = word.charAt(0).toUpperCase() + word.slice(1);
    for (let i = 0; i < n; i++) {
        word = getWord(mChain, word);
        line += " " + word.toLowerCase();
    }
    return line;
}



  ///////////////////////
 // Handling the page //
///////////////////////

let form = document.getElementById('control');
let poem = document.getElementById('poem');
let title = document.getElementById('title')

const handleSubmit = (e) => {
    let song = getSong(form.elements['song'].value);
    let lines = form.elements['lines'].value;
    let words = form.elements['words'].value;
    console.log(song)
    if (song) {
        title.textContent = generateTitle(song);
        if (lines && words) {
            poem.textContent = generatePoem(song, lines, words);
        } else if (lines) {
            poem.textContent = generatePoem(song, lines);
        } else {
            poem.textContent = generatePoem(song);
        }
    } else {
        title.textContent = generateTitle(firework);
        poem.textContent = generatePoem(firework);
    }
};

  //////////////////
 // Test Strings //
//////////////////

const example = "Ever since I left the city, you, you, you You and me we just don't get along";

const firework = `Do you ever feel like a plastic bag
                Drifting through the wind, wanting to start again?
                Do you ever feel, feel so paper thin
                Like a house of cards, one blow from cavin' in?
                Do you ever feel already buried deep?
                Six feet under screams, but no one seems to hear a thing
                Do you know that there's still a chance for you?
                'Cause there's a spark in you
                You just gotta ignite the light
                And let it shine
                Just own the night
                Like the Fourth of July
                'Cause baby, you're a firework
                Come on, show 'em what you're worth
                Make 'em go, "Oh, oh, oh"
                As you shoot across the sky
                Baby, you're a firework
                Come on, let your colors burst
                Make 'em go, "Oh, oh, oh"
                You're gonna leave 'em all in awe, awe, awe
                You don't have to feel like a waste of space
                You're original, cannot be replaced
                If you only knew what the future holds
                After a hurricane comes a rainbow
                Maybe a reason why all the doors are closed
                So you could open one that leads you to the perfect road
                Like a lightning bolt, your heart will glow
                And when it's time, you'll know
                You just gotta ignite the light
                And let it shine
                Just own the night
                Like the Fourth of July
                'Cause baby, you're a firework
                Come on, show 'em what you're worth
                Make 'em go, "Oh, oh, oh"
                As you shoot across the sky
                Baby, you're a firework
                Come on, let your colors burst
                Make 'em go, "Oh, oh, oh"
                You're gonna leave 'em all in awe, awe, awe
                Boom, boom, boom
                Even brighter than the moon, moon, moon
                It's always been inside of you, you, you
                And now it's time to let it through
                'Cause baby, you're a firework
                Come on, show 'em what you're worth
                Make 'em go, "Oh, oh, oh"
                As you shoot across the sky
                Baby, you're a firework
                Come on, let your colors burst
                Make 'em go, "Oh, oh, oh"
                You're gonna leave 'em all in awe, awe, awe
                Boom, boom, boom
                Even brighter than the moon, moon, moon
                Boom, boom, boom
                Even brighter than the moon, moon, moon`

const fox = `Dog goes "woof"
                    Cat goes "meow"
                    Bird goes "tweet"
                    And mouse goes "squeek"
                    Cow goes "moo"
                    Frog goes "croak"
                    And the elephant goes "toot"
                    Ducks say "quack"
                    And fish go "blub"
                    And the seal goes "ow ow ow"
                    But there's one sound
                    That no one knows
                    What does the fox say?
                    "Ring-ding-ding-ding-dingeringeding!
                    Gering-ding-ding-ding-dingeringeding!
                    Gering-ding-ding-ding-dingeringeding!"
                    What the fox say?
                    "Wa-pa-pa-pa-pa-pa-pow!
                    Wa-pa-pa-pa-pa-pa-pow!
                    Wa-pa-pa-pa-pa-pa-pow!"
                    What the fox say?
                    "Hatee-hatee-hatee-ho!
                    Hatee-hatee-hatee-ho!
                    Hatee-hatee-hatee-ho!"
                    What the fox say?
                    "Joff-tchoff-tchoffo-tchoffo-tchoff!
                    Tchoff-tchoff-tchoffo-tchoffo-tchoff!
                    Joff-tchoff-tchoffo-tchoffo-tchoff!"
                    What the fox say?
                    Big blue eyes
                    Pointy nose
                    Chasing mice
                    And digging holes
                    Tiny paws
                    Up the hill
                    Suddenly you're standing still
                    Your fur is red
                    So beautiful
                    Like an angel in disguise
                    But if you meet
                    A friendly horse
                    Will you communicate by
                    Mo-o-o-o-orse?
                    Mo-o-o-o-orse?
                    Mo-o-o-o-orse?
                    How will you speak to that
                    Ho-o-o-o-orse?
                    Ho-o-o-o-orse?
                    Ho-o-o-o-orse?
                    What does the fox say?
                    "Jacha-chacha-chacha-chow!
                    Chacha-chacha-chacha-chow!
                    Chacha-chacha-chacha-chow!"
                    What the fox say?
                    "Fraka-kaka-kaka-kaka-kow!
                    Fraka-kaka-kaka-kaka-kow!
                    Fraka-kaka-kaka-kaka-kow!"
                    What the fox say?
                    "A-hee-ahee ha-hee!
                    A-hee-ahee ha-hee!
                    A-hee-ahee ha-hee!"
                    What the fox say?
                    "A-oo-oo-oo-ooo!
                    Woo-oo-oo-ooo!"
                    What does the fox say?
                    The secret of the fox
                    Ancient mystery
                    Somewhere deep in the woods
                    I know you're hiding
                    What is your sound?
                    Will we ever know?
                    Will always be a mystery
                    What do you say?
                    You're my guardian angel
                    Hiding in the woods
                    What is your sound?
                    (Wa-wa-way-do, wub-wid-bid-dum-way-do, wa-wa-way-do)
                    Will we ever know? (Bay-budabud-dum-bam)
                    I want to (Mama-dum-day-do) I want to, I want to know!
                    (Abay-ba-da bum-bum bay-do)`
