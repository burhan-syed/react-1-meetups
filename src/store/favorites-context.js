import { createContext, useState} from "react";

const FavoritesContext = createContext({
  meetups: [],
  setMeetups: (allMeetups) => {},
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  isFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [meetups, setMeetups] = useState([]);
  const context = {
    meetups: meetups,
    setMeetups: setMeetupsHandler,
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: itemIsFavoriteHandler
  };

  function setMeetupsHandler(allMeetups){
    setMeetups((allMeetups) => {
      return allMeetups;
    });
  }

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      fetch("https://react-cc21-default-rtdb.firebaseio.com/favorites.json", {
        method: "POST",
        body: JSON.stringify(favoriteMeetup),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        console.log(res);

      });
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      const removedID = context.favorites.find(favorite => favorite.id === meetupId).id;
      console.log(removedID);
      fetch(`https://react-cc21-default-rtdb.firebaseio.com/favorites/${removedID}.json`, {
        method: "DELETE",
        //body: JSON.stringify(context.favorites.find(favorite => favorite.id === meetupId)),
        headers: {
          "Content-Type": "application/json",
        }
      });
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;