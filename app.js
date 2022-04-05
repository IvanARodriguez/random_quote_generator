const text = document.getElementById("text");
const author = document.getElementById("author")
const btn = document.getElementById("btn")
const authors = document.getElementById("authors")



//if the quote text is empty change the button text to display GenerateRandomNumber
text.innerHTML.length === 0 ? btn.innerText = "Generate Random Quote" : btn.innerText = "Show Another Quote";



//get data from the API
const generateQuote = async ()=>{
    const url = "https://type.fit/api/quotes";
    try{
        let response = await fetch(url, {method:"GET"})
            if(response.ok){
                const responseJson = await response.json();
                const quote = responseJson;
                //return data gotten as json
                return quote;
            }
    } catch(err){
        console.error(err);
    }
}



const setOptions = async ()=>{
    //get the quotes object
    const rndQuote = await generateQuote();
    for (let i = 0; i < rndQuote.length; i++) {
        let options = document.createElement("option");
        options.text = rndQuote[i].author;
        options.value = rndQuote[i].author;
        authors.appendChild(options);
    } 
}

setOptions();

async function getAuthorQuote(){
    const selectedAuthor = authors.value;
    const rndQuote = await generateQuote();
    rndQuote.forEach(element => {
        if(element.author === selectedAuthor){
            text.innerHTML = `" ${element.text} "`;
            author.innerText = element.author;
        }
    });
}


//function to display a random quote
const showRandomQuote = async ()=>{
    //get the quotes object
    const rndQuote = await generateQuote(); 
    const randomizeNum =  Math.floor(Math.random() * rndQuote.length);
    text.innerHTML = `" ${rndQuote[randomizeNum].text} "`;
    author.innerText = rndQuote[randomizeNum].author;
    text.innerHTML.length === 0 ? btn.innerText = "Generate Random Quote" : btn.innerText = "Show Another Quote";
}


