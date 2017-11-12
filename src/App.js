import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import MainContent from "./MainContent";

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [],
  };

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  toggleGuestPropertyAt = (property, id) =>
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            // spread operator... transfers keys & values from one object to another
            ...guest,
            // this line overrides the previous spread operator key/value for isConfirmed
            [property]: !guest[property]
          }
        }

        return guest;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id);

  setNameAt = (name, id) =>
    this.setState({
      guests: this.state.guests.map(guest => {
        if (guest.id === id) {
          return {
            // spread operator... transfers keys & values from one object to another
            ...guest,
            // this line overrides the previous spread operator key/value for isConfirmed
            // since the property name is the same as the key, es6 allows the following simplicity
            name
          }
        }

        return guest;
      })
    });

  toggleFilter = () =>
    this.setState({isFiltered: !this.state.isFiltered});

  handleNameInput = e =>
    this.setState({pendingGuest: e.target.value});

  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id,
        },
        // use spread operator to fill new guests object with other key/values
        ...this.state.guests
      ],
      pendingGuest: "",
    });
  };

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    // use reduce to get counts
    // accumulator, currentValue
    this.state.guests.reduce((total, guest) => {
      return guest.isConfirmed ? total + 1 : total;
    // initialized as 0
    }, 0);

  // getUnconfirmedGuests = () =>

  render() {

    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">

        <Header
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          pendingGuest={this.state.pendingGuest}
          handleNameInput={this.handleNameInput} />

        <MainContent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest} />

      </div>
    );
  }
}

export default App;
