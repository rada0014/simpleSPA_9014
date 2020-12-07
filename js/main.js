const SEARCH = {
  apiKey: `47bef60ec30c0c24bef8331cca476134`,
  init:() => {
    document.querySelector('#btnSearch').addEventListener('click', SEARCH.fetchData);
    // document.querySelector('#btnSearch').addEventListener('click', ACTORS.refresh, true);
  },
  allData:[],
  knownForArray:[,],
  knownForImageLinks:[,],
  faceImageLinks:[],
  cards: [],
  fetchData:(ev) => {
    ev.preventDefault();
    let input = document.querySelector('input');
    let value = input.value;
    let URL = `https://api.themoviedb.org/3/search/person?api_key=${SEARCH.apiKey}&page=1&language=en-US&query=${value}`;
    ev.target.value;
    fetch(URL)
    .then(response => {
    return response.json()
    })
    .then(data => {
      const str = JSON.parse(JSON.stringify(data,null,"\t"))
    //  console.log(str);
      for (i=0; i<str.results.length; i++) {
        SEARCH.allData[i] = str.results[i];
        SEARCH.faceImageLinks[i]=`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SEARCH.allData[i].profile_path}`;
        for (j=0; j < SEARCH.allData[i].known_for.length; j++)
        {
          SEARCH.knownForArray[i,j] = SEARCH.allData[i].known_for[j]
          SEARCH.knownForImageLinks[i,j] = `https://image.tmdb.org/t/p/original${SEARCH.knownForArray[j].backdrop_path}`
        }

        document.querySelector('.contentActor').innerHTML +=         
          `
          <span onclick="MEDIA.knFunc(${i})" class="cards" id=${SEARCH.allData[i].id}>
          <div>
          <p class="cardFont">
          ${SEARCH.allData[i].name}
          </p>
          <p class="cardFont">
          ${SEARCH.allData[i].popularity}
          </p>
          <img src="${SEARCH.faceImageLinks[i]}" alt="image not found :(">
          </div>
          </span>
          `
      }
      document.querySelector('#search').addEventListener('click', ACTORS.refresh);
    })

    .catch(err => {
      console.error(err)
    })
  }
};

// actors is for changes connected to content in the actors section
const ACTORS = {
  refresh:() => {
    location.reload();
    return false;
  }
};

const MEDIA = {
  knFunc:(e1) => {
    let knf;
    knf += "<p><b>Name: </b>" + SEARCH.allData[e1].name + " (<b>Id: " + SEARCH.allData[e1].id + ")</b></p>";
    for (k=0; k<SEARCH.allData[e1].known_for.length;k++){
      let mn = k+1;
      let link_k = "https://image.tmdb.org/t/p/original"+ SEARCH.allData[e1].known_for[k].poster_path; 
      knf += "<p><b>Movie #:" + mn +"</b></p>";
      knf += "<img src="+link_k+"></img>";
      
      knf += "<p><b>Original Title: </b>"+SEARCH.allData[e1].known_for[k].original_title+"</p>";
      knf += "<p><b>Overview: </b>"+SEARCH.allData[e1].known_for[k].overview+"</p>";       
    }
    let span2 = document.createElement('span');
    span2.className = "knownForPage"
    let mainDiv = document.querySelector('.contentMedia');
    mainDiv.appendChild(span2);
    span2.innerHTML = `<p>${knf}</p>`
    //closebtn
    let closeBtn = document.createElement('button');
    span2.appendChild(closeBtn);
    closeBtn.className = 'buttonClose';
    closeBtn.style.width = '40%';
    closeBtn.style.height = '40%';
    //not working (z-index)
    closeBtn.style.color = 'red';
    closeBtn.style.content = 'x';
    closeBtn.style.transform = 'translate(420px, -820px)';

    closeBtn.onclick = function () {
      span2.className = 'off';
      span2.innerHTML = ``;
    }
  }
};

//storage is for working with localStorage
const STORAGE = {
  //this will be used in Assign 4
};

//nav is for anything connected to the history api and location
const NAV = {
  //this will be used in Assign 4
};

//Start everything running
document.addEventListener('DOMContentLoaded', SEARCH.init);