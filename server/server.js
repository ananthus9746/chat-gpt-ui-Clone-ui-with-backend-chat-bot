const PORT = 8000;
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const fetch = require("node-fetch");
const { NlpManager } = require('node-nlp');
const readline = require('readline');

const manager = new NlpManager({ languages: ['en'] });
// Train the chatbot with sample data
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'how are you', 'greetings.howAreYou');
manager.addDocument('en', 'what can you do', 'capabilities');
manager.addDocument('en', 'exit', 'goodbye');
manager.addAnswer('en', 'greetings.hello', 'Hello there!');
manager.addAnswer('en', 'greetings.howAreYou', 'I am doing well. Thanks for asking!');
manager.addAnswer('en', 'capabilities', 'I can assist with general information and chat with you.');
manager.addAnswer('en', 'goodbye', 'Goodbye!');
// Train the chatbot with sample data including math operations
manager.addDocument('en', 'add', 'math.add');
manager.addDocument('en', 'subtract', 'math.subtract');
manager.addDocument('en', 'multiply', 'math.multiply');
manager.addDocument('en', 'divide', 'math.divide');
manager.addDocument('en', 'What is the result of 5 + 3?', 'math.addition.question');
manager.addDocument('en', 'Calculate 10 - 4', 'math.subtraction.question');
manager.addDocument('en', 'What is 6 times 7?', 'math.multiplication.question');
manager.addDocument('en', 'Divide 12 by 3', 'math.division.question');

manager.addAnswer('en', 'math.add', 'You want to perform addition.');
manager.addAnswer('en', 'math.subtract', 'You want to perform subtraction.');
manager.addAnswer('en', 'math.multiply', 'You want to perform multiplication.');
manager.addAnswer('en', 'math.divide', 'You want to perform division.');

manager.addAnswer('en', 'math.addition.question', 'The result of 5 + 3 is 8.');
manager.addAnswer('en', 'math.subtraction.question', 'The result of 10 - 4 is 6.');
manager.addAnswer('en', 'math.multiplication.question', 'The result of 6 times 7 is 42.');
manager.addAnswer('en', 'math.division.question', 'The result of 12 divided by 3 is 4.');
manager.addDocument('en', 'square root', 'math.sqrt');
manager.addDocument('en', 'power of', 'math.pow');
manager.addDocument('en', 'What is the square root of 16?', 'math.sqrt.question');
manager.addDocument('en', 'Calculate 2 to the power of 5', 'math.power.question');

manager.addAnswer('en', 'math.sqrt', 'You want to calculate the square root.');
manager.addAnswer('en', 'math.pow', 'You want to calculate a power.');

manager.addAnswer('en', 'math.sqrt.question', 'The square root of 16 is 4.');
manager.addAnswer('en', 'math.power.question', '2 to the power of 5 is 32.');

// Train the chatbot with more conversation-related data
manager.addDocument('en', 'tell me a joke', 'conversation.joke');
manager.addDocument('en', 'recommend a book', 'conversation.bookRecommendation');
manager.addDocument('en', 'what\'s the weather like today?', 'conversation.weather');
manager.addDocument('en', 'who won the latest soccer match?', 'conversation.soccerMatch');
manager.addDocument('en', 'What\'s your favorite color?', 'conversation.favoriteColor');

manager.addAnswer('en', 'conversation.joke', 'Why did the scarecrow win an award? Because he was outstanding in his field!');
manager.addAnswer('en', 'conversation.bookRecommendation', 'I recommend "The Hitchhiker\'s Guide to the Galaxy" by Douglas Adams.');
manager.addAnswer('en', 'conversation.weather', 'I don\'t have access to real-time weather information. You can check a weather website or app for the current conditions.');
manager.addAnswer('en', 'conversation.soccerMatch', 'I don\'t have access to live sports scores. You can check a sports news website for the latest match results.');
manager.addAnswer('en', 'conversation.favoriteColor', 'I don\'t have a favorite color, but I like all colors!');

manager.addAnswer('en', 'conversation.food', 'I don\'t have taste buds, but I can provide you with delicious recipes.');
manager.addAnswer('en', 'conversation.funFact', 'Certainly! Here\'s a fun fact: Octopuses have three hearts!');
manager.addAnswer('en', 'conversation.movieRecommendation', 'How about watching "The Matrix"? It\'s a mind-bending sci-fi movie.');
manager.addAnswer('en', 'conversation.howAreYou', 'I\'m functioning well and ready to assist you.');
manager.addAnswer('en', 'conversation.movieRecommendation2', 'If you enjoy action films, you might like "Mad Max: Fury Road." It\'s filled with thrilling car chases!');
manager.addAnswer('en', 'conversation.hobby', 'I don\'t have hobbies, but I enjoy helping people find answers to their questions.');
manager.addAnswer('en', 'conversation.foodPreference', 'I don\'t have taste preferences, but I can suggest a great recipe for spaghetti carbonara!');
manager.addAnswer('en', 'conversation.travel', 'Traveling is a wonderful way to explore new places and cultures. Do you have any travel plans?');
manager.addAnswer('en', 'conversation.pet', 'I don\'t have pets, but I think cats and dogs make great companions. Do you have any pets?');
manager.addAnswer('en', 'conversation.superpower', 'If I could have a superpower, I would choose the ability to instantly generate helpful information.');
manager.addAnswer('en', 'conversation.bookRecommendation2', 'I recommend "1984" by George Orwell. It\'s a thought-provoking dystopian novel.');
manager.addAnswer('en', 'conversation.favoriteSport', 'I don\'t play sports, but I can talk about your favorite sport with you.');
manager.addAnswer('en', 'conversation.musicTaste', 'I don\'t have music preferences, but I can suggest some great songs based on your taste.');
manager.addAnswer('en', 'conversation.holidayDestination', 'One of the most beautiful holiday destinations is Bali, Indonesia. Have you been there?');
manager.addAnswer('en', 'conversation.tech', 'I find technology fascinating! Is there a specific tech topic you\'d like to discuss?');
manager.addAnswer('en', 'conversation.trivia', 'Sure! Here\'s a trivia question: What is the largest planet in our solar system?');
manager.addAnswer('en', 'conversation.movieRecommendation3', 'Consider watching "The Lord of the Rings" trilogy. It\'s an epic fantasy adventure.');
manager.addAnswer('en', 'conversation.future', 'I can\'t predict the future, but I can provide information and insights to help you make informed decisions.');
manager.addAnswer('en', 'conversation.fashion', 'Fashion is a form of self-expression! Do you have a favorite clothing style?');
manager.addAnswer('en', 'conversation.learning', 'Learning new things is a great way to expand your knowledge and skills. What would you like to learn about?');
manager.addAnswer('en', 'conversation.timeTravel', 'Time travel is a fascinating concept in science fiction. If you could time travel, where and when would you go?');
manager.addAnswer('en', 'conversation.health', 'Taking care of your health is important. Do you have any health-related questions or concerns?');
manager.addAnswer('en', 'conversation.dreamVacation', 'If you could go on your dream vacation right now, where would you choose to go?');
manager.addAnswer('en', 'conversation.technology', 'Technology is advancing rapidly. Is there a tech gadget or innovation that excites you?');
manager.addAnswer('en', 'conversation.randomFact', 'Here\'s a random fact: Honey never spoils, and archaeologists have found pots of honey in ancient Egyptian tombs.');
manager.addAnswer('en', 'conversation.creativeHobbies', 'Creative hobbies like painting, writing, or playing an instrument can be incredibly fulfilling. Do you have any creative interests?');
manager.addAnswer('en', 'conversation.favoriteBook', 'Do you have a favorite book? I\'m always curious about people\'s reading preferences.');
manager.addAnswer('en', 'conversation.interests', 'I\'m interested in helping you with any questions or topics you\'d like to discuss. What\'s on your mind today?');
manager.addAnswer('en', 'conversation.favoriteMovie', 'Movies are a great way to unwind. What\'s your all-time favorite movie?');
manager.addAnswer('en', 'conversation.science', 'Science is a fascinating field! Is there a particular scientific topic you\'re curious about?');
manager.addAnswer('en', 'conversation.emotions', 'Emotions are an integral part of being human. How are you feeling today?');
manager.addAnswer('en', 'conversation.travelDestination', 'Exploring new destinations is a wonderful way to create lasting memories. Where is your dream travel destination?');
// Training data for math calculations
manager.addDocument('en', 'What is two plus two?', 'math.addition.question');
manager.addDocument('en', 'Calculate 5 minus 3', 'math.subtraction.question');
manager.addDocument('en', 'Multiply 6 and 7', 'math.multiplication.question');
manager.addDocument('en', 'Divide 10 by 2', 'math.division.question');
manager.addAnswer('en', 'math.addition.question', 'Two plus two equals four.');
manager.addAnswer('en', 'math.subtraction.question', 'Five minus three equals two.');
manager.addAnswer('en', 'math.multiplication.question', 'Six multiplied by seven equals forty-two.');
manager.addAnswer('en', 'math.division.question', 'Ten divided by two equals five.');
manager.addDocument('en', 'What is the largest ocean on Earth?', 'general.knowledge');
manager.addDocument('en', 'Who painted the Mona Lisa?', 'general.knowledge');
manager.addDocument('en', 'What is the currency of Japan?', 'general.knowledge');
manager.addDocument('en', 'What gas do plants absorb from the atmosphere?', 'general.knowledge');
manager.addDocument('en', 'What is the tallest mountain in the world?', 'general.knowledge');
manager.addDocument('en', 'Who wrote the "Harry Potter" series?', 'general.knowledge');
manager.addDocument('en', 'What is the chemical symbol for gold?', 'general.knowledge');
manager.addDocument('en', 'What is the national flower of India?', 'general.knowledge');
manager.addDocument('en', 'What year did the Titanic sink?', 'general.knowledge');
manager.addDocument('en', 'What is the boiling point of water in Celsius?', 'general.knowledge');
manager.addDocument('en', 'Who discovered penicillin?', 'general.knowledge');
manager.addDocument('en', 'What is the speed of light in a vacuum?', 'general.knowledge');
manager.addDocument('en', 'What is the largest desert in the world?', 'general.knowledge');
manager.addDocument('en', 'Who is known as the father of modern physics?', 'general.knowledge');
manager.addDocument('en', 'What is the chemical formula for water?', 'general.knowledge');
manager.addDocument('en', 'What is the national bird of the United States?', 'general.knowledge');
manager.addDocument('en', 'Who was the first woman to fly solo across the Atlantic Ocean?', 'general.knowledge');
manager.addDocument('en', 'What is the primary gas that makes up the Earth\'s atmosphere?', 'general.knowledge');
manager.addDocument('en', 'What is the smallest planet in our solar system?', 'general.knowledge');
manager.addDocument('en', 'Who is the author of "Pride and Prejudice"?', 'general.knowledge');
manager.addDocument('en', 'What is the most widely spoken language in the world?', 'general.knowledge');
manager.addDocument('en', 'Who founded Microsoft Corporation?', 'general.knowledge');
manager.addDocument('en', 'What is the capital of Brazil?', 'general.knowledge');
manager.addDocument('en', 'What is the chemical formula for oxygen?', 'general.knowledge');
manager.addDocument('en', 'Who wrote "The Great Gatsby"?', 'general.knowledge');
manager.addDocument('en', 'What is the largest animal on Earth?', 'general.knowledge');
manager.addDocument('en', 'What is the freezing point of water in Fahrenheit?', 'general.knowledge');
manager.addDocument('en', 'Who painted "Starry Night"?', 'general.knowledge');
manager.addDocument('en', 'What is the currency of the United Kingdom?', 'general.knowledge');
manager.addAnswer('en', 'general.knowledge.largestOcean', 'The largest ocean on Earth is the Pacific Ocean.');
manager.addAnswer('en', 'general.knowledge.monaLisaArtist', 'The Mona Lisa was painted by Leonardo da Vinci.');
manager.addAnswer('en', 'general.knowledge.currencyJapan', 'The currency of Japan is the Japanese Yen (JPY).');
manager.addAnswer('en', 'general.knowledge.plantsGasAbsorption', 'Plants absorb carbon dioxide (CO2) from the atmosphere.');
manager.addAnswer('en', 'general.knowledge.tallestMountain', 'The tallest mountain in the world is Mount Everest.');
manager.addAnswer('en', 'general.knowledge.harryPotterAuthor', 'The "Harry Potter" series was written by J.K. Rowling.');
manager.addAnswer('en', 'general.knowledge.goldChemicalSymbol', 'The chemical symbol for gold is Au.');
manager.addAnswer('en', 'general.knowledge.nationalFlowerIndia', 'The national flower of India is the Lotus.');
manager.addAnswer('en', 'general.knowledge.titanicSinkingYear', 'The Titanic sank in the year 1912.');
manager.addAnswer('en', 'general.knowledge.boilingPointCelsius', 'The boiling point of water in Celsius is 100 degrees.');
manager.addAnswer('en', 'general.knowledge.penincillinDiscovery', 'Penicillin was discovered by Alexander Fleming.');
manager.addAnswer('en', 'general.knowledge.speedOfLight', 'The speed of light in a vacuum is approximately 299,792,458 meters per second.');
manager.addAnswer('en', 'general.knowledge.largestDesert', 'The largest desert in the world is the Sahara Desert.');
manager.addAnswer('en', 'general.knowledge.fatherOfModernPhysics', 'Albert Einstein is known as the father of modern physics.');
// Define a generic response for general knowledge questions
// Add English words and their vowels or consonants
manager.addDocument('en', 'wh', 'english.words.wh');
manager.addDocument('en', 'a', 'english.words.a');
manager.addDocument('en', 'we', 'english.words.we');
manager.addDocument('en', 'they', 'english.words.they');
manager.addDocument('en', 'them', 'english.words.them');
manager.addDocument('en', 'b', 'english.words.b');
manager.addDocument('en', 'e', 'english.words.e');
manager.addDocument('en', 'i', 'english.words.i');
manager.addDocument('en', 'o', 'english.words.o');
manager.addDocument('en', 'u', 'english.words.u');
manager.addDocument('en', 'cat', 'english.words.cat');
manager.addDocument('en', 'dog', 'english.words.dog');
manager.addDocument('en', 'rabbit', 'english.words.rabbit');
manager.addDocument('en', 'elephant', 'english.words.elephant');
manager.addDocument('en', 'giraffe', 'english.words.giraffe');
manager.addDocument('en', 'zebra', 'english.words.zebra');
manager.addDocument('en', 'kangaroo', 'english.words.kangaroo');
manager.addDocument('en', 'penguin', 'english.words.penguin');
manager.addDocument('en', 'lion', 'english.words.lion');
manager.addDocument('en', 'tiger', 'english.words.tiger');
manager.addDocument('en', 'cheetah', 'english.words.cheetah');
manager.addDocument('en', 'leopard', 'english.words.leopard');
manager.addDocument('en', 'rhinoceros', 'english.words.rhinoceros');
manager.addDocument('en', 'gazelle', 'english.words.gazelle');
manager.addDocument('en', 'wolf', 'english.words.wolf');
manager.addDocument('en', 'fox', 'english.words.fox');
manager.addDocument('en', 'bear', 'english.words.bear');
manager.addDocument('en', 'koala', 'english.words.koala');
manager.addDocument('en', 'panda', 'english.words.panda');
manager.addDocument('en', 'parrot', 'english.words.parrot');
manager.addDocument('en', 'eagle', 'english.words.eagle');

// Define responses for English words
manager.addAnswer('en', 'english.words.wh', 'The word "wh" does not form a complete word in English.');
manager.addAnswer('en', 'english.words.a', 'The letter "a" is a vowel in English.');
manager.addAnswer('en', 'english.words.we', 'The word "we" is a pronoun in English.');
manager.addAnswer('en', 'english.words.they', 'The word "they" is a pronoun in English.');
manager.addAnswer('en', 'english.words.them', 'The word "them" is a pronoun in English.');
manager.addAnswer('en', 'english.words.b', 'The letter "b" is a consonant in English.');
manager.addAnswer('en', 'english.words.e', 'The letter "e" is a vowel in English.');
manager.addAnswer('en', 'english.words.i', 'The letter "i" is a vowel in English.');
manager.addAnswer('en', 'english.words.o', 'The letter "o" is a vowel in English.');
manager.addAnswer('en', 'english.words.u', 'The letter "u" is a vowel in English.');
manager.addAnswer('en', 'english.words.cat', 'The word "cat" contains the vowels "a."');
manager.addAnswer('en', 'english.words.dog', 'The word "dog" contains the vowel "o."');
manager.addAnswer('en', 'english.words.rabbit', 'The word "rabbit" contains the vowels "a" and "i."');
manager.addAnswer('en', 'english.words.elephant', 'The word "elephant" contains the vowels "e," "a," and "i."');
manager.addAnswer('en', 'english.words.giraffe', 'The word "giraffe" contains the vowels "i" and "a."');
manager.addAnswer('en', 'english.words.zebra', 'The word "zebra" contains the vowels "e" and "a."');
manager.addAnswer('en', 'english.words.kangaroo', 'The word "kangaroo" contains the vowels "a" and "o."');
manager.addAnswer('en', 'english.words.penguin', 'The word "penguin" contains the vowels "e" and "u."');
manager.addAnswer('en', 'english.words.lion', 'The word "lion" contains the vowel "i."');
manager.addAnswer('en', 'english.words.tiger', 'The word "tiger" contains the vowels "i" and "e."');
manager.addAnswer('en', 'english.words.cheetah', 'The word "cheetah" contains the vowels "e," "e," and "a."');
manager.addAnswer('en', 'english.words.leopard', 'The word "leopard" contains the vowels "e," "o," and "a."');
manager.addAnswer('en', 'english.words.rhinoceros', 'The word "rhinoceros" contains the vowels "i," "o," and "e."');
manager.addAnswer('en', 'english.words.gazelle', 'The word "gazelle" contains the vowels "a" and "e."');
manager.addAnswer('en', 'english.words.wolf', 'The word "wolf" contains the vowel "o."');
manager.addAnswer('en', 'english.words.fox', 'The word "fox" contains the vowel "o."');
manager.addAnswer('en', 'english.words.bear', 'The word "bear" contains the vowel "e."');
manager.addAnswer('en', 'english.words.koala', 'The word "koala" contains the vowels "o" and"');
// Add variations of "Who are you?" questions and answers
manager.addDocument('en', 'Who are you?', 'introduction.whoAreYou');
manager.addDocument('en', 'What is your identity?', 'introduction.whoAreYou');
manager.addDocument('en', 'Tell me about yourself', 'introduction.whoAreYou');
manager.addDocument('en', 'What can you tell me about you?', 'introduction.whoAreYou');
manager.addDocument('en', 'Explain your existence', 'introduction.whoAreYou');
manager.addDocument('en', 'I want to know who you are', 'introduction.whoAreYou');
manager.addDocument('en', 'Could you introduce yourself?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who\'s behind this chat?', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your name?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who\'s chatting with me?', 'introduction.whoAreYou');
manager.addDocument('en', 'Are you a person?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who\'s on the other side?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who am I talking to?', 'introduction.whoAreYou');
manager.addDocument('en', 'Tell me a bit about yourself', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your background?', 'introduction.whoAreYou');
manager.addDocument('en', 'Give me some information about you', 'introduction.whoAreYou');
manager.addDocument('en', 'Who created you?', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your purpose?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who designed you?', 'introduction.whoAreYou');
manager.addDocument('en', 'Why do you exist?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who made you?', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your origin?', 'introduction.whoAreYou');
manager.addDocument('en', 'Are you a human?', 'introduction.whoAreYou');
manager.addDocument('en', 'Are you a bot?', 'introduction.whoAreYou');
manager.addDocument('en', 'Who\'s operating this chat?', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your role?', 'introduction.whoAreYou');
manager.addDocument('en', 'What\'s your function?', 'introduction.whoAreYou');
// Add more responses for "Who are you?" questions
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m an AI-powered chatbot here to help and have conversations.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m your friendly virtual assistant, ready to answer your questions.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\ am a computer program designed to assist and chat with you.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m an automated chatbot created to provide information and chat.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m a virtual companion programmed to assist with tasks and chat.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m an AI chatbot, here to engage in conversations and provide help.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am an AI assistant designed to assist you with questions and tasks.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m a digital assistant built to chat and offer information.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a computer-based AI chatbot at your service.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I\'m a virtual helper here to provide support and chat with you.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a chatbot AI here to answer questions and have conversations.');
manager.addAnswer('en', 'introduction.whoAreYou', ' i m a chatbot created to assist you with tasks and engage in conversation.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a computer program designed to chat and provide information.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m an AI virtual assistant here to assist you.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m a chatbot designed to help and engage in meaningful conversations.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m an AI chatbot created to provide support and have conversations.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m a digital assistant programmed to chat and assist.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a virtual companion designed for conversations and assistance.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m an AI-powered assistant here to chat and provide answers.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a chatbot AI created to assist and engage in conversations.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m a virtual chatbot ready to help and have discussions.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m an AI chatbot built to answer questions and engage in chat.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a computer program designed for conversation and assistance.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m an AI assistant programmed to chat and offer assistance.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m a virtual helper created to provide support and chat.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a chatbot AI here to assist you and engage in conversation.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I m a digital assistant designed to chat and provide information.');
manager.addAnswer('en', 'introduction.whoAreYou', 'I am an AI virtual assistant here to help you.');

// Continue adding more responses as needed...

// Define responses for "Who are you?" questions
manager.addAnswer('en', 'introduction.whoAreYou', 'I am a chatbot created to assist and provide information.');

// Train the chatbot
var randomNumber
async function trainBot() {

    await manager.train();
    manager.save();

}

trainBot();



app.post('/completions', async (req, res) => {
    console.log(" req.body..", req.body)
    // Generate a random number between 1 and 1000
    randomNumber = Math.floor(Math.random() * 1000) + 1;
    console.log(randomNumber);
    
    const userMessage = req.body.message;
    // Process user input and get a response from the chatbot
    const response = await manager.process('en', userMessage);
    let message = {
        role: "assistant",
        content: response.answer || `Ask something else :${randomNumber} `,
        time: Date.now()
    }
    res.json({ message: message });
});


//// const API_KEY = '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'
// app.post('/completions', async (req, res) => {
//     const option = {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${API_KEY}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             message: [{ role: "user", content: "how are you?" }],
//         })
//     }
//     try {
//         const response = await fetch(`https://api.openai.com/v1/chat/completions`, option)
//         const data = await response.json()
//         res.send(data)
//     }
//     catch (error) {
//         console.log("Error", error)
//     }
// })

app.listen(PORT, () => console.log(`Server is ruunng @ ${PORT}`))