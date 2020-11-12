let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = '818cb1b03cd77c899a6cf2c08e9eb2df6180a944';
let params = {
    method: 'GET',
    headers: {
        'Authorization': 'Token ' + '818cb1b03cd77c899a6cf2c08e9eb2df6180a944'
    }
}
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clear data 
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // Get input data
    let word = input.value;
    // call API get data
    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})


async function getData(word) {
    loading.style.display = 'block';
    // Ajax call 
    const response = await fetch(`https://owlbot.info/api/v4/dictionary/${word}`,params);
    const data = await response.json();
    console.log(data);
    console.log(data['definitions'].length);
    // if empty result 
    if (!data['definitions'].length) {
        loading.style.display = 'none';
        notFound.innerText = ' No result found';
        return;
    }

    // If result is suggetions
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
            
        })
        return;
    }

    // Result found 
    const myNode = document.getElementById("chat-messages-list");
	  while (myNode.lastElementChild) {
	    myNode.removeChild(myNode.lastElementChild);
	  }
    for(let i=0;i<data['definitions'].length;i++){
    	let newMessage=$('<li>');
    	loading.style.display = 'none';
    	newMessage.append($('<span>',{
                'html':data['definitions'][i].definition
            }));
        $('#chat-messages-list').append(newMessage);
    }
}