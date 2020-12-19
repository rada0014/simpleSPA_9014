const SEARCH = {
  apiKey: `47bef60ec30c0c24bef8331cca476134`,
  allData:[],
  knownForArray:[],
  knownForImageLinks:[],
  faceImageLinks:[],
  cards: [],
  // start:()=>{
  //   window.addEventListener('hashchange', SEARCH.makeURLWork);
  // },
  init:() => {
    document.querySelector('#btnSearch').addEventListener('click', SEARCH.fetchData, true);
    //onlick of sort from HTML
  },
  fixHistory:()=>{
    var newURL = NAV.historyFunc();
    document.location.href = newURL;
    console.log("fixHistory value: "+SEARCH.fixHistory);
  },
  fetchData:(ev) => {
    document.querySelector('#search').addEventListener('click', ACTORS.refresh);
    ev.preventDefault();
    let input = document.querySelector('input');
    let value = input.value;
    var URL = `https://api.themoviedb.org/3/search/person?api_key=${SEARCH.apiKey}&page=1&language=en-US&query=${value}`;
    ev.target.value;
    fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const str = JSON.parse(JSON.stringify(data,null,"\t"));
    //  console.log("FETCH STR");
    //  console.log(str);
      for (i=0; i<str.results.length; i++) {
        SEARCH.allData[i] = str.results[i];
        SEARCH.faceImageLinks[i]=`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SEARCH.allData[i].profile_path}`;
        for (j=0; j < SEARCH.allData[i].known_for.length; j++)
        {
          SEARCH.knownForArray[i,j] = SEARCH.allData[i].known_for[j];
          SEARCH.knownForImageLinks[i,j] = `https://image.tmdb.org/t/p/original${SEARCH.knownForArray[j].backdrop_path}`;
        }
        console.log("allData["+i+"]");
        console.log(SEARCH.allData[i]);
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
      STORAGE.toLS(value);
    })
    .catch(err => {
      console.error(err)
    })
    NAV.historyFunc(URL);
  }
};

// actors is for changes connected to content in the actors section
const ACTORS = {
  refresh:() => {
    let content = document.querySelector('.contentActor');
    content.innerHTML = '';
    console.log("Empty Content: "+ content);
    //window.location.reload();  
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
      knf += "<p><b>Release Date: </b>"+SEARCH.allData[e1].known_for[k].release_date+"</p>";       
    }
    let span2 = document.createElement('span');
    span2.className = "knownForPage"
    let mainDiv = document.querySelector('.contentMedia');
    mainDiv.appendChild(span2);
    span2.innerHTML = `<p>${knf}</p>`
    let closeBtn = document.createElement('button');
    span2.appendChild(closeBtn);
    closeBtn.className = 'closeBtn';
    closeBtn.innerHTML = `CLOSE`
    closeBtn.onclick = function () {
      span2.className = 'off';
      span2.innerHTML = ``;
    }
  }
};

//storage is for working with localStorage
const STORAGE = {
  keyRandom: "010e00d",
    toLS:(value) => {
      console.log("toLS Function");
      console.log("allData.length: "+SEARCH.allData.length);
      let searchLogData ="";
      for (i=0; i < SEARCH.allData.length; i++) {
        //localStorage.clear();
        searchLogData += "Start of Record#: "+i+" ";
        searchLogData += "Id: "+SEARCH.allData[i].id+" ";
        searchLogData += "Name: "+SEARCH.allData[i].name+" ";
        searchLogData += "Popularity: "+SEARCH.allData[i].popularity+" ";
        searchLogData += " End of Record#"+i+"           ";        
      }
      localStorage.setItem(value, searchLogData);
}
}
//nav is for anything connected to the history api and location
const NAV = {
  historyFunc: (url) => {
    console.log("historyFunc url: "+url);
    let input = document.querySelector('input');
    let value = input.value;
    if (value){
      var newURL = `./results.ActorShows#${STORAGE.keyRandom}/${value}/${SEARCH.apiKey}`;
      history.pushState({}, '', newURL);
    }
    window.onpopstate = ACTORS.refresh;
  }
};


const SORT = {
  compareByName: (a, b) => {
    var splitA = a.name.split(" ");
    var splitB = b.name.split(" ");
    var lastA = splitA[splitA.length - 1];
    var lastB = splitB[splitB.length - 1];  
    if (lastA < lastB) return -1;
    if (lastA > lastB) return 1;
    return 0;
  },
  compareByPopularity: (a, b) => {
    return b.popularity - a.popularity;
  },

  sortByNameFunc: () => {
    console.log('sortByNameFunc allDataLength: '+SEARCH.allData.length); 
    SEARCH.allData.sort(SORT.compareByName);

    // Update the faceImageLinks, knownForArray, and the knownForImageLinks arrays
    for (i=0; i<SEARCH.allData.length; i++) {
      SEARCH.faceImageLinks[i]=`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SEARCH.allData[i].profile_path}`;
      for (j=0; j < SEARCH.allData[i].known_for.length; j++)
      {
        SEARCH.knownForArray[i,j] = SEARCH.allData[i].known_for[j];
        SEARCH.knownForImageLinks[i,j] = `https://image.tmdb.org/t/p/original${SEARCH.knownForArray[j].backdrop_path}`;
      }
    document.querySelector('.contentActor').innerHTML = "";
    for (i=0; i<SEARCH.allData.length; i++){
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
  }
},

  sortByPopularityFunc: () => {
    console.log('sortByNameFunc allDataLength: '+SEARCH.allData.length); 
    SEARCH.allData.sort(SORT.compareByPopularity);

    // Update the faceImageLinks, knownForArray, and the knownForImageLinks arrays
    for (i=0; i<SEARCH.allData.length; i++) {
      SEARCH.faceImageLinks[i]=`https://image.tmdb.org/t/p/w600_and_h900_bestv2${SEARCH.allData[i].profile_path}`;
      for (j=0; j < SEARCH.allData[i].known_for.length; j++)
      {
        SEARCH.knownForArray[i,j] = SEARCH.allData[i].known_for[j];
        SEARCH.knownForImageLinks[i,j] = `https://image.tmdb.org/t/p/original${SEARCH.knownForArray[j].backdrop_path}`;
      }
    document.querySelector('.contentActor').innerHTML = "";
    for (i=0; i<SEARCH.allData.length; i++){
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
  }
  }
}

//Start everything running
document.addEventListener('DOMContentLoaded', SEARCH.init);