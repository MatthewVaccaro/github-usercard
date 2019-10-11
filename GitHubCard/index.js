/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/MatthewVaccaro
*/
// const fakeObject = [
//   {
//     login: "MatthewVaccaro",
//     id: 53841280,
//     node_id: "MDQ6VXNlcjUzODQxMjgw",
//     avatar_url: "https://avatars3.githubusercontent.com/u/53841280?v=4",
//     gravatar_id: "",
//     url: "https://api.github.com/users/MatthewVaccaro",
//     html_url: "https://github.com/MatthewVaccaro",
//     followers_url: "https://api.github.com/users/MatthewVaccaro/followers",
//     following_url:
//       "https://api.github.com/users/MatthewVaccaro/following{/other_user}",
//     gists_url: "https://api.github.com/users/MatthewVaccaro/gists{/gist_id}",
//     starred_url:
//       "https://api.github.com/users/MatthewVaccaro/starred{/owner}{/repo}",
//     subscriptions_url:
//       "https://api.github.com/users/MatthewVaccaro/subscriptions",
//     organizations_url: "https://api.github.com/users/MatthewVaccaro/orgs",
//     repos_url: "https://api.github.com/users/MatthewVaccaro/repos",
//     events_url: "https://api.github.com/users/MatthewVaccaro/events{/privacy}",
//     received_events_url:
//       "https://api.github.com/users/MatthewVaccaro/received_events",
//     type: "User",
//     site_admin: false,
//     name: "Matthew Vaccaro",
//     company: null,
//     blog: "",
//     location: null,
//     email: null,
//     hireable: null,
//     bio: null,
//     public_repos: 19,
//     public_gists: 0,
//     followers: 1,
//     following: 0,
//     created_at: "2019-08-06T23:04:45Z",
//     updated_at: "2019-08-06T23:19:13Z"
//   }
// ];

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

//Single Request
// axios
//   .get("https://api.github.com/users/MatthewVaccaro")
//   .then(function(response) {
//     console.log(response.data);
//     selectCards.appendChild(GitUserCreator(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

//Multi Request on Following
axios
  .get("https://api.github.com/users/MatthewVaccaro/following")
  .then(function(response) {
    response.data.forEach(cv => {
      axios
        .get(`https://api.github.com/users/${cv.login}`)
        .then(function(response) {
          console.log(response.data);
          selectCards.appendChild(new GitUserCreator(response.data));
          //selectCards.appendChild(GitUserCreator(cv));
        });
    });
  })
  .catch(function(error) {
    console.log(error);
  });

const selectCards = document.querySelector(".cards");

function GitUserCreator(dataPassing) {
  console.log(dataPassing);
  //Create Elements
  const masterContainer = document.createElement("div");
  const userProfilePhoto = document.createElement("img");
  const cardInfo = document.createElement("div");
  const userName = document.createElement("h3");
  const realName = document.createElement("p");
  const userLocation = document.createElement("p");
  const userProfile = document.createElement("p");
  const userProfileLink = document.createElement("a");
  const userFolowers = document.createElement("p");
  const userFollowing = document.createElement("p");
  const userBio = document.createElement("p");

  //Add Content
  userProfilePhoto.src = dataPassing.avatar_url;
  userName.textContent = dataPassing.login;
  realName.textContent = dataPassing.name;
  userLocation.textContent = dataPassing.location;
  userProfile.textContent = "Profile:";
  userProfileLink.textContent = dataPassing.html_url;
  userProfileLink.href = dataPassing.html_url;
  userFolowers.textContent = `Followers ${dataPassing.followers}`;
  userFollowing.textContent = `Following ${dataPassing.following}`;
  userBio.textContent = dataPassing.bio;
  console.log(userFollowing);

  //Create Structure (Appendings)
  masterContainer.appendChild(userProfilePhoto);
  masterContainer.appendChild(cardInfo);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(realName);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(userProfile);
  cardInfo.appendChild(userProfileLink);
  cardInfo.appendChild(userFolowers);
  cardInfo.appendChild(userFollowing);
  cardInfo.appendChild(userBio);

  //Add Styling
  masterContainer.classList.add("card");
  cardInfo.classList.add("card-info");
  userName.classList.add("name");
  realName.classList.add("username");
  userProfileLink.classList.add("a");

  //Event Listener

  masterContainer.addEventListener("mouseenter", attr => {
    attr.target.style.transform = "scale(1.1)";
    attr.target.style.transition = "transform 0.6s";
  });

  masterContainer.addEventListener("mouseleave", attr => {
    attr.target.style.transform = "scale(1.0)";
    attr.target.style.transition = "transform 0.3s";
  });

  return masterContainer;
}

//Where the Function Will Be appended

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
